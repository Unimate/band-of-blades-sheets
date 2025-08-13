import { mount, unmount } from "svelte";
import ActorSheet from '../lib/v1/organisms/actor/root.svelte';
import { CoarseReactivityProvider } from "../utils/reactivity/reactivity.svelte";
import { CONSTANTS } from "../constants";
import {
  assembleAbilities,
  disassembleItems,
  itemsToDelete,
  requestSquads,
  mapCharacter,
  searchItemByType,
  selectActorItemsByType,
  handleTraitDrop
} from "../mappers/actor.mapper";
import {
  type Condition,
  type Heritage,
  type ISafety,
  type ISkill,
  type ISkills,
  type Specialization,
  type Trait,
  type Trauma,
  LegionnaireEnum,
  SkillCategoryLabel,
  SkillLabel,
  SpecialistEnum,
} from "../types/actor.type";
import type { ILoadItem } from "../types/loadout.type";
import { REMAPPED_SQUADS } from "../dictionaries/squads";
import { BandOfBladesSheetsRollDialog } from "./dialog.renderer";
import { foundryAdapter } from "./foundry.adapter";
import { VOCABULARY } from "../dictionaries/loadout";
import { ABILITIES } from "../dictionaries/abilities";

export class BandOfBladesSheetsActor extends foundry.applications.sheets.ActorSheetV2 {
  components: Record<string, any>[] = [];
  #context = new CoarseReactivityProvider<any>(undefined);

  get title() {
    return this.actor.name;
  }

  #actions = {
    selectAbilities: async (abilities: string[]): Promise<void> => {
      const names: string[] = assembleAbilities(abilities);
      const list = await foundryAdapter.requestItemsFromCompendium(CONSTANTS.PACKS.ABILITY);
      const toCreate = list.filter((item: any) => names.includes(item.name));
      const toDelete = searchItemByType(['ability'], this.actor).map((item: any) => item._id);
      await this.#refreshItems(toCreate, toDelete);
    },
    selectSpecialization: async (specialization: Specialization) => {
      if (specialization === null) return;

      const list = await foundryAdapter.requestItemsFromCompendium(CONSTANTS.PACKS.SPECIALIZATION);
      const toCreate = list.filter((item: any) => item.name.toLowerCase() === specialization);
      const toDelete = searchItemByType(['class'], this.actor).map((item: any) => item._id);
      await this.#refreshItems(toCreate, toDelete);
    },
    selectHeritage: async (heritage: Heritage, traits: Trait[]) => {
      if (heritage === null || traits.length === 0) return;
      const heritages = await foundryAdapter.requestItemsFromCompendium(CONSTANTS.PACKS.HERITAGE);
      const list = await foundryAdapter.requestItemsFromCompendium(CONSTANTS.PACKS.TRAIT);

      const newHeritage = heritages.filter((item: any) => item.name.toLowerCase() === heritage);
      const newTraits = list.filter((item: any) => traits.includes(item.name.toLowerCase()));

      const toDelete = searchItemByType(['heritage', 'trait'], this.actor).map((item: any) => item._id);

      await this.#refreshItems([...newHeritage, ...newTraits], toDelete);

    },
    selectItems: async (items: ILoadItem[]) => {
      const actor = this.#context.data;
      const toDelete = itemsToDelete(this.actor).map((item: any) => item._id);
      const toCreate = await disassembleItems(items, actor.character.specialization);
      await this.#refreshItems(toCreate, toDelete);
    },
    selectSquad: async (squad: string): Promise<void> => {
      const name = REMAPPED_SQUADS.get(squad) || squad;
      const list = await foundryAdapter.requestItemsFromCompendium(CONSTANTS.PACKS.SQUAD);
      const toCreate = list.filter((item: any) => name === item.name);
      const toDelete = searchItemByType(['squad'], this.actor).map((item: any) => item._id);

      await this.#refreshItems(toCreate, toDelete);
    },
    updateLoad: async (load: 'Light' | 'Normal' | 'Heavy') => {
      await this.actor.update({ 'system.loadout.selected_load_level': `BITD.${load}` });
      this.render();
    },
    updateInjury: async (type: 'stress' | 'corruption', update: number) => {
      await this.actor.update({ [`system.${type}.value`]: update });
      this.render();
    },
    updateCondition: async (type: 'trauma' | 'blight', update: Trauma | Condition) => {
      const current = this.actor.system[type].list[update];
      await this.actor.update({ [`system.${type}.list.${update}`]: !current });
      this.render();
    },
    updateSkillProgress: async (limit: number, label: SkillCategoryLabel) => {
      const current = Number(this.actor.system.attributes[label].exp);
      await this.actor.update({ [`system.attributes.${label}.exp`]: current === limit ? 0 : current + 1 })
      this.render();
    },
    updateAbilityProgress: async () => {
      const current = Number(this.actor.system.experience) + 1;
      const max = this.actor.system.experienceMax || 8;
      await this.actor.update({ [`system.experience`]: current > max ? 0 : current });
    },
    updateSkill: async (label: SkillCategoryLabel, skill: SkillLabel, value: number) => {
      await this.actor.update({ [`system.attributes.${label}.skills.${skill}.value`]: value });
      this.render();
    },
    updateSafety: async (safety: keyof ISafety) => {
      const value = this.actor.system['armor-uses'][safety];
      await this.actor.update({ [`system.armor-uses.${safety}`]: !value });
    },
    updateHealingSteps: async (type: 'heavy' | 'medium' | 'light', step: number) => {
      let update;
      switch (type) {
        case 'heavy': {
          update = { heal_one: step > 0, heal_two: step > 1, heal_three: step > 2 }
          break;
        }
        case 'medium': {
          update = { heal_one: step > 0, heal_two: step > 1 }
          break;
        }
        case 'light': {
          update = { heal_one: step > 0 }
          break;
        }
      }
      this.actor.update({ [`system.harm.${type}`]: update });
    },
    updateHarmReason: async (type: 'deadly' | 'heavy' | 'medium' | 'light', index: number, value: string) => {
      let field = index === 0 ? 'one' : index === 1 ? 'two' : 'three';
      this.actor.update({ [`system.harm.${type}.${field}`]: value });
    },
    updateName: async (name: string) => {
      this.actor.update({ name });
    },
    roll: async (attribute: ISkills | ISkill) => {
      new BandOfBladesSheetsRollDialog({
        actor: this.#context.data,
        attribute: attribute
      }).render(true);
    },
    editNotes: async () => {
      this.actor.sheet.submit();
    },
    linkEntityDescription: async (source: Specialization | Trait, name: string) => {
      let template;

      if ([...Object.values(SpecialistEnum), ...Object.values(LegionnaireEnum)].includes(source as Specialization)) {
        template = await foundry.applications.handlebars.renderTemplate('modules/band-of-blades-sheets/templates/linked.message.hbs', {
          source: foundryAdapter.localize(`specialization.${source}.name`),
          entity: foundryAdapter.localize(`abilities.${source}.${name}.name`),
          description: foundryAdapter.localize(`abilities.${source}.${name}.description`),
        });
      }

      if (template !== undefined) {
        await ChatMessage.create({ user: game.user, content: template });
      }
    }
  }

  static DEFAULT_OPTIONS = {
    classes: ['sheet', 'actor', CONSTANTS.MODULE.ID],
    window: {
      resizable: false,
      positioned: true,
      frame: true,
    },
    position: {
      width: 750,
      height: 800,
    },
    submitOnClose: true,
  }

  _onRender(context: any, options: any) {
    super._onRender(context, options);
  }

  async _prepareContext(options = {}) {
    const documentContext = await super._prepareContext(options);

    const actor = await mapCharacter(this.actor);

    const squads = await requestSquads();

    return {
      ...actor,
      actions: this.createActions(),
      dictionaries: {
        squads,
      },
      ...documentContext,
    };
  }

  _renderHTML(context: any, options: any = {}) {
    this.#context.data = context;
    if (options.isFirstRender) {
      const content = this.windowContent;
      this.components.push(this._createComponent(content, this.#context));
    }
    return { context, customContents: [] }
  }

  _replaceHTML() {
  }

  async _onDrop(event: any) {
    event.preventDefault();

    let data;
    try {
      data = JSON.parse(event.dataTransfer.getData('text/plain'));
    } catch (err) {
      return false;
    }

    const item = await Item.implementation.fromDropData(data);

    if (item.type === 'heritage') {
      return;
    }

    if (item.type === 'trait') {
      const [heritage, ...traits] = handleTraitDrop(item, this.actor);
      await this.#actions.selectHeritage(heritage, traits);
    }

    if (item.type === 'class') {
      const [specialization] = selectActorItemsByType(this.actor, 'class');
      if (specialization === undefined) {
        await this.#actions.selectSpecialization(item.name.toLowerCase());
      }
    }
    if (item.type === 'ability') {
      const abilities = [...selectActorItemsByType(this.actor, 'ability'), item].map(
        (item: any) => ABILITIES.get(item.name)
      ) as { specialization: string; name: string; }[];

      const update: string[] = [];
      for (const entity of abilities) {
        if (entity.name === 'elite') {
          if (update.includes('elite-0') && update.includes('elite-1')) {
            continue;
          }

          if (update.includes('elite-0')) {
            update.push('elite-1');
          } else {
            update.push('elite-0');
          }

        } else {
          update.push(entity.name);
        }
      }

      await this.#actions.selectAbilities(update);
    }

    if (item.type === 'squad') {
      const name = item.name.toLowerCase().split(' ').join('_');
      await this.#actions.selectSquad(name);
    }

    if (item.type === 'item' && item.name.startsWith('(U)')) {
      const [specialization] = selectActorItemsByType(this.actor, 'class');
      if (specialization !== undefined) {
        const key = VOCABULARY.get(
          specialization.name.toLowerCase()
        )?.get(item.name);

        const items = selectActorItemsByType(this.actor, 'item').map(
          (i: any) => ({ primary: { label: VOCABULARY.get(specialization.name.toLowerCase())?.get(i.name) } })
        );
        if (key !== undefined) {
          await this.#actions.selectItems([...items, { primary: { label: key } }]);
        }
      }
    }
  }

  _tearDown(options = {}) {
    this.components.forEach((c) => unmount(c));
    this.components = [];

    super._tearDown(options);
  }

  _createComponent(node: HTMLElement, context: any): Record<string, any> {
    return mount(ActorSheet, {
      target: this.element,
      context: new Map<string, any>([
        [CONSTANTS.SVELTE_CONTEXT.CONTEXT, context],
      ])
    });
  }

  async #refreshItems(toCreate: any[], toDelete: any[] = []): Promise<void> {
    if (toDelete.length > 0) {
      await this.actor.deleteEmbeddedDocuments('Item', toDelete);
    }
    await this.actor.createEmbeddedDocuments('Item', toCreate);
  }

  createActions() {
    return this.#actions;
  }
}