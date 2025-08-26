import { SQUADS } from "../dictionaries/squads";
import {
  CONSTANTS,
  DEFAULT_ABILITIES,
  DEFAULT_CHARACTER,
  DEFAULT_HARM,
  DEFAULT_INJURIES,
  DEFAULT_SAFETY,
} from "../constants";
import {
  BartanTraitEnum,
  Condition,
  Heritage,
  type IActor,
  type IExtra,
  type ISkill,
  type ISkills,
  LegionnaireEnum, OriteTraitEnum, PanyarTraitEnum,
  SkillCategoryLabel,
  SkillLabel,
  SpecialistEnum,
  type Specialization,
  type Trait,
  type Trauma, ZemyatiTraitEnum,
} from "../types/actor.type";
import { extra as EXTRA, type IItemShortcut, LOADOUT, UTILITIES, VOCABULARY } from "../dictionaries/loadout";
import type { ILoadItem } from "../types/loadout.type";
import { ABILITIES, REMAPPED_ABILITIES } from "../dictionaries/abilities";
import type { IBonus, ICalculation } from "../types/dices.type";
import { GROUP, HERITAGE, PERSONAL } from "../dictionaries/bonuses";
import { foundryAdapter } from "../foundry/foundry.adapter";

export const mapCharacter = async (data: any): Promise<IActor> => {
  const { system } = data;

  let actor: IActor = {
    _id: '0',
    character: { ...DEFAULT_CHARACTER, traits: [] },
    abilities: { ...DEFAULT_ABILITIES, list: [] },
    injuries: {
      conditions: { ...DEFAULT_INJURIES.conditions },
      injuries: { ...DEFAULT_INJURIES.injuries }
    },
    skills: [],
    harm: {
      light: { ...DEFAULT_HARM.light },
      medium: { ...DEFAULT_HARM.medium },
      heavy: { ...DEFAULT_HARM.heavy },
    },
    safety: { ...DEFAULT_SAFETY },
    load: {
      type: 'Light',
      items: [],
      selectable: [],
      limit: 2,
      selected: [],
    },
    extra: { crimson: false, chemist: false, grenadier: false, pious: false },
    notes: '',
  };

  if (!data) {
    return actor;
  }

  const items = data.items.values();
  const selectedUtility: string[] = [];

  for (let item of items) {
    if (item.type === 'trait') {
      actor.character.traits.push(String(item.name).toLowerCase() as Trait);
    }

    if (item.type === 'class') {
      actor.character.specialization = String(item.name).toLowerCase() as Specialization;
    }

    if (item.type === 'heritage') {
      actor.character.heritage = String(item.name).toLowerCase() as Heritage;
    }

    if (item.type === 'ability') {
      const ability = ABILITIES.get(item.name);
      if (ability !== undefined) {
        actor.abilities.list.push(ability);
      }
    }

    if (item.type === 'squad') {
      actor.character.squad = { name: String(SQUADS.get(item.name) ?? item.name), image: item.img };
    }

    if (item.type === 'item') {
      if (item.name.startsWith('(U)')) {
        selectedUtility.push(item.name);
      }
    }
  }

  if (data.system.experience !== undefined) {
    actor.abilities.progress = Number(data.system.experience);
  }

  if (data.name !== undefined) {
    actor.character.name = String(data.name);
  }

  if (data.img !== undefined) {
    actor.character.image = String(data.img);
  }

  const injuries = {
    stress: {
      current: Number(system.stress.value),
      max: Number(system.stress.max)
    },
    corruption: {
      current: Number(system.corruption.value),
      max: Number(system.corruption.max)
    },
  }

  const conditions = {
    trauma: {
      max: system.trauma.max,
      types: Object.keys(system.trauma.list).filter((key: string) => system.trauma.list[key]) as Trauma[]
    },
    blight: {
      max: system.blight.max,
      types: Object.keys(system.blight.list).filter((key: string) => system.blight.list[key]) as Condition[]
    },
  }

  actor.injuries = { conditions, injuries }

  const attributes = Object.keys(system.attributes);

  const attributeLimit = actor.abilities.list.find(({ name }) => name === "elite") ? 1 : 0;

  for (const key of attributes) {
    const attribute = system.attributes[key];
    const skills: ISkill[] = Object.keys(attribute.skills).map((skill: string) => ({
      label: skill as SkillLabel,
      value: Number(attribute.skills[skill].value),
      limit:Number(attribute.skills[skill].max) + attributeLimit,
    }));


    actor.skills.push({
      label: key as SkillCategoryLabel,
      bonus: Number(attribute.bonus),
      skills: skills,
      progress: Number(attribute.exp)
    });
  }

  actor.harm = {
    light: {
      harmsLimit: 2,
      descriptions: [system.harm.light.one, system.harm.light.two],
      healingSteps: 1,
      currentHeal: Number(system.harm.light.heal_one), // boolean to numbers. JS <3
    },
    medium: {
      harmsLimit: 2,
      descriptions: [system.harm.medium.one, system.harm.medium.two],
      healingSteps: 2,
      currentHeal: Number(system.harm.medium.heal_one) + Number(system.harm.medium.heal_one), // boolean to numbers. JS <3
    },
    heavy: {
      harmsLimit: 1,
      descriptions: [system.harm.heavy.one],
      healingSteps: 3,
      currentHeal: Number(system.harm.heavy.heal_one) + Number(system.harm.heavy.heal_two) + Number(system.harm.heavy.heal_three), // boolean to numbers. JS <3
    },
    deadly: {
      harmsLimit: 1,
      descriptions: [system.harm.deadly.one],
      healingSteps: 0,
      currentHeal: 0
    }
  }

  actor.safety = { ...system['armor-uses'] };

  if (system.item_triggers.chemist) {
    actor.extra.chemist = true;
  }

  if (system.item_triggers.crimson) {
    actor.extra.crimson = true;
  }

  if (system.item_triggers.grenadier) {
    actor.extra.grenadier = true;
  }

  if (system.item_triggers.pious) {
    actor.extra.pious = true;
  }

  const loadType = system.loadout.selected_load_level.split('.')[1];
  const loadItems = await updateLoad({
    load: loadType,
    specialization: actor.character.specialization,
    selected: selectedUtility,
    extra: actor.extra,
  });

  actor.load = {
    type: loadType,
    limit: system.loadout.utility,
    ...loadItems
  }

  actor.notes = system.notes;

  actor._id = data._id;

  return actor;
}

const updateLoad =
  async (options: {
    load: 'Light' | 'Normal' | 'Heavy',
    specialization: Specialization | null,
    selected: string[],
    extra: IExtra,
  }):
    Promise<{ items: ILoadItem[], selectable: ILoadItem[], selected: ILoadItem[] }> => {
    const { specialization, extra, load, selected } = options;
    if (specialization === null) return { items: [], selectable: [], selected: [] };

    const loadout = LOADOUT.get(specialization);
    const utilities = (UTILITIES.get(specialization) || []).map(u => ({ p: u }));
    const selectedUtilities = selected.map(u => ({ p: u }));

    let list: IItemShortcut[] = [];

    if (loadout !== undefined) {
      switch (load) {
        case 'Light': {
          list = [...loadout.light];
          break;
        }
        case 'Normal': {
          list = [...loadout.light, ...loadout.normal];
          break;
        }
        case 'Heavy': {
          list = [...loadout.light, ...loadout.normal, ...loadout.heavy];
        }
      }
    }

    const pack = game.packs.get(CONSTANTS.PACKS.ITEMS);
    const compendium = await pack.getDocuments();
    const vocabulary = VOCABULARY.get(specialization) as Map<string, string>;

    if (extra.crimson) {
      (EXTRA.get('crimson') as string[]).forEach((item: string) => utilities.push({ p: item }));
    }

    if (extra.chemist) {
      (EXTRA.get('chemist') as string[]).forEach((item: string) => utilities.push({ p: item }));
    }

    if (extra.grenadier) {
      const [p, a] = EXTRA.get('grenadier') as string[];
      list.push({ p, a });
    }

    if (extra.pious) {
      (EXTRA.get('pious') as string[]).forEach((item: string) => list.push({ p: item }));
    }

    const filtered: Map<string, any> = compendium
      .reduce((a: Map<string, any>, b: any) => {
        a.set(b.name, b);
        return a;
      }, new Map());

    return {
      items: assembleItems(list, filtered, vocabulary),
      selectable: assembleItems(utilities, filtered, vocabulary),
      selected: assembleItems(selectedUtilities, filtered, vocabulary)
    };
  }

const assembleItems = (list: IItemShortcut[], compendium: Map<string, any>, vocabulary: Map<string, string>): ILoadItem[] => {
  const items: ILoadItem[] = [];
  for (let item of list) {
    let entity: ILoadItem = {
      primary: { label: '', fine: false },
      usages: 0,
      usesLoadSlot: 0,
    }

    const extraVocabulary: Map<string, string> = VOCABULARY.get('extra')!;

    const primary = compendium.get(item.p) ?? { name: item.p };
    entity.primary.label = vocabulary.get(primary.name) ?? extraVocabulary.get(primary.name) ?? primary.name;
    entity.primary.fine = entity.primary.label.toLowerCase().includes('fine');

    if (item.a !== undefined) {
      const alternative = compendium.get(item.a);
      entity.alternative = { label: '', fine: false };
      entity.alternative.label = vocabulary.get(alternative.name) ?? extraVocabulary.get(alternative.name) ?? alternative.name;
      entity.alternative.fine = entity.alternative.label.toLowerCase().includes('fine');
    }

    entity.usages = Number(primary.system?.uses || 0);

    entity.usesLoadSlot = Number(primary.system?.load);

    items.push(entity);
  }
  return items;
}

export const disassembleItems = async (items: ILoadItem[], specialization: Specialization) => {
  if (specialization === null) return [];

  const pack = game.packs.get(CONSTANTS.PACKS.ITEMS);
  const compendium = await pack.getDocuments();
  const vocabulary = VOCABULARY.get(specialization) as Map<string, string>;
  const extra = VOCABULARY.get('extra') as Map<string, string>;

  const flat = items.map((item: ILoadItem) => item.primary.label);
  const keys: string[] = [];
  const extraKeys: string[] = [];

  for (let item of flat) {
    for (const [key, value] of vocabulary.entries()) {
      if (key.startsWith('(U)') && value === item) {
        keys.push(key);
        break;
      }
    }
    for (const [key, value] of extra.entries()) {
      if (value === item) {
        extraKeys.push(key);
        break;
      }
    }
  }

  return compendium.filter(
    (item: any) => extraKeys.includes(item.name) || item.system.class.toLowerCase() === specialization && keys.includes(item.name)
  );
}

export const itemsToDelete = (data: any) => {
  const items = data.items.values();
  return [...items].filter((item: any) => item.type === 'item' && item.name.startsWith('(U)'));
}

export const searchItemByType = (types: string[], data: any) => {
  const items = data.items.values();
  return [...items].filter((item: any) => types.includes(item.type));
}

export const assembleAbilities = (abilities: string[]): string[] => {
  const toAdd: string[] = [];
  abilities.forEach((ability: string) => {
    // multiple abilities
    if (ability.includes('-')) {
      const [name, index] = ability.split('-');
      const abilities: string[] = REMAPPED_ABILITIES.get(name) || [];
      const origin = abilities[Number(index)];
      toAdd.push(origin);
    } else {
      const abilities: string[] = REMAPPED_ABILITIES.get(ability) || [];
      abilities.forEach((origin: string) => toAdd.push(origin));
    }
  });
  return toAdd;
}

export const requestSquads = async () => {
  const squads = await foundryAdapter.requestItemsFromCompendium(CONSTANTS.PACKS.SQUAD);

  return squads.map((squad: any) => {
    const name = SQUADS.get(squad.name) || squad.name;
    return { name, image: squad.img, description: squad.system.description };
  });
}

export const calculateSavingThrowDices = (entity: ISkills) => {
  let maximum = 0;
  entity.skills.forEach((skill: ISkill) => {
    maximum = Math.max(maximum, skill.value);
  });
  return { basic: maximum, bonus: entity.bonus };
}

export const calculateResult = async (amount: number): Promise<ICalculation> => {
  amount = Math.max(amount, 0);
  let worst = false;
  let value = `${amount}d6`;

  if (amount === 0) {
    value = `${2}d6`;
    worst = true;
  }

  let roll = new Roll(value, {});
  await roll.evaluate();
  const [{ results }] = roll.terms;

  //  controlled, risky, and desperate.
  const dices = results.map(({ result }: { result: number }) => result).sort();
  if (worst) {
    return calculateWorst(dices, roll);
  }
  return calculateBest(dices, roll);
}

const calculateWorst = (dices: number[], roll: any): ICalculation => {
  let min = 6;
  for (let dice of dices) {
    min = Math.min(min, dice);
    if (min < 4) {
      return { state: 'zero', dices, dice: min, roll };
    }
  }

  if (min === 6) {
    return { state: 'standard', dices, dice: min, roll };
  }

  return { state: 'limited', dices, dice: min, roll };
}

const calculateBest = (dices: number[], roll: any) => {
  let max = 0;
  for (let dice of dices) {
    if (max === 6 && dice === 6) {
      return { state: 'critical', dices, dice: max, roll };
    }
    max = Math.max(max, dice);
  }

  if (max === 6) {
    return { state: 'standard', dices, dice: max, roll };
  }
  if (max > 3) {
    return { state: 'limited', dices, dice: max, roll };
  }
  return { state: 'zero', dices, dice: max, roll };
}

export const calculateBonuses = (actor: IActor, skill: ISkill | ISkills) => {
  if (actor.character.specialization === null) return;
  const personal = PERSONAL[actor.character.specialization as (SpecialistEnum & LegionnaireEnum)];

  const personalBonuses: Map<string, IBonus> = new Map();

  if (personal !== undefined) {
    for (const ability of actor.abilities.list) {
      if (personal[ability.name] !== undefined) {
        if (personal[ability.name][skill.label] !== undefined) {
          personalBonuses.set(ability.name, {
            key: actor.character.specialization as (SpecialistEnum & LegionnaireEnum),
            ability: ability.name,
            name: skill.label,
            bonus: personal[ability.name][skill.label]
          });
        }
      }
    }
  }

  const heritageBonuses: Map<string, IBonus> = new Map();

  for (const trait of actor.character.traits) {
    if (HERITAGE[trait] !== undefined) {
      if (HERITAGE[trait][skill.label as (SkillLabel & SkillCategoryLabel)] !== undefined) {
        heritageBonuses.set(trait, {
          key: String(actor.character.heritage || ''),
          ability: trait,
          name: skill.label,
          bonus: HERITAGE[trait][skill.label as (SkillLabel & SkillCategoryLabel)],
        })
      }
    }
  }

  const groups = Object.keys(GROUP).filter((key: string) => key !== actor.character.specialization);

  const actors = game.actors.values().filter(
    (entity: any) => groups.includes(entity.type === 'character' && entity.system.class.toLowerCase())
  );

  const groupBonuses: Map<string, IBonus> = new Map();

  actors.forEach((actor: any) => {
    const specialization = actor.system.class.toLowerCase() as (SpecialistEnum & LegionnaireEnum);
    actor.items.values().forEach((item: any) => {
      if (item.type === 'ability') {
        const ability = ABILITIES.get(item.name) as { specialization: string, name: string };

        if (GROUP[specialization][ability.name] !== undefined) {
          if (GROUP[specialization][ability.name][skill.label] !== undefined) {
            groupBonuses.set(ability.name, {
              key: specialization,
              ability: ability.name,
              name: skill.label,
              bonus: GROUP[specialization][ability.name][skill.label]
            });
          }
        }
      }
    })
  });

  return { personal: personalBonuses, group: groupBonuses, heritage: heritageBonuses };
}

export const selectActorItemsByType = (data: any, type: string) => {
  return data.items.values().filter((item: any) => item.type === type);
}

export const handleTraitDrop = (item: any, actor: any) => {
  const traits = selectActorItemsByType(actor, 'trait');
  let heritage = selectActorItemsByType(actor, 'heritage')[0];

  if (heritage === undefined) {
    const name = item.name.toLowerCase();
    if (Object.values(ZemyatiTraitEnum).includes(name)) {
      heritage = { name: Heritage.Zemyati }
    }
    if (Object.values(PanyarTraitEnum).includes(name)) {
      heritage = { name: Heritage.Panyar }
    }
    if (Object.values(OriteTraitEnum).includes(name)) {
      heritage = { name: Heritage.Orites }
    }
    if (Object.values(BartanTraitEnum).includes(name)) {
      heritage = { name: Heritage.Bartans }
    }
  }

  return [heritage, ...traits, item].map((i) => i.name.toLowerCase());
}