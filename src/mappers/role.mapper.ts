import {
  LegionnaireEnum,
  SpecialistEnum,
  type Specialization,
  type Trauma
} from "../types/actor.type";
import { SQUADS } from "../dictionaries/squads";
import {
  type IMarshal,
  type IMateriel,
  type IPersonnel,
  type IProject,
  type IQuartermaster,
  type IRole,
  type ISquadMate,
  type QuartermasterEntityType,
  RoleHeritage,
  type RoleLook,
  type RolePersonality,
  type RoleReputation,
  RoleSpecialization
} from "../types/roles.type";
import { ROLES } from "../dictionaries/role";
import { requestSquads } from "./actor.mapper";
import { CHOSEN } from "../dictionaries/bonuses";
import type { IBonus } from "../types/dices.type";

export const mapRole = (data: any): IRole => {
  const { system } = data;

  const role: IRole = {
    _id: '0',
    character: {
      name: '',
      image: '',
      reputation: null,
      look: [],
      heritage: null,
      personality: [],
      specialization: null
    },
    notes: '',
  }

  role.character.name = String(data.name);
  role.character.image = data.img;

  if (system.type !== '') {
    role.character.specialization = system.type;

    const dictionary = ROLES.get(system.type as RoleSpecialization) as Record<string, string[]>;

    if (system.traits.heritage !== '0') {
      const position = Number(system.traits.heritage) - 1;
      role.character.heritage = dictionary['heritage'][position] as RoleHeritage;
    }
    if (system.traits.reputation !== '0') {
      const position = Number(system.traits.heritage) - 1;
      role.character.reputation = dictionary['reputation'][position] as RoleReputation;
    }

    const personality: boolean[] = Object.keys(system.traits.personality).map(
      key => system.traits.personality[key]
    );

    dictionary.personality.forEach((trait: string, index: number) => {
      if (personality[index]) {
        role.character.personality.push(trait as RolePersonality);
      }
    });

    const look: boolean[] = Object.keys(system.traits.look).map(
      key => system.traits.look[key]
    );

    dictionary.look.forEach((trait: string, index: number) => {
      if (look[index]) {
        role.character.look.push(trait as RoleLook);
      }
    });
  }

  role.notes = system.notes;

  role._id = data._id;

  return role;
}

export const mapMarshal = async (data: any): Promise<IMarshal> => {
  const legionnaires = getLegionnairesBySquads(game);
  const specialists = getSpecialistsBySpeciality(game);
  const squads = await requestSquads();

  const morale = Number(data.system.morale || 0);

  return {
    legionnaires: legionnaires,
    specialists: specialists,
    dictionaries: { squads },
    morale: morale,
  }
}

export const mapQuartermaster = async (data: any): Promise<IQuartermaster> => {
  return {
    projects: mapProjects(data),
    ...mapQuartermasterEntities(data)
  };
}

const getActorsBySpecialization = (game: any, specializations: Specialization[]) => {
  return game.actors.filter((actor: any) => {
    if (actor.type !== 'character') return false;
    return specializations.includes(actor.system.class.toLowerCase())
  });
}

const mapSquadMate = (data: any): ISquadMate => {
  const { system } = data;

  let actor: ISquadMate = {
    _id: '0',
    character: {
      name: '', image: '',
    },
    injuries: {
      conditions: { trauma: { max: 0, types: [] } },
      injuries: { stress: { max: 0, current: 0 } },
    },
  };

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
  }
  const conditions = {
    trauma: {
      max: system.trauma.max,
      types: Object.keys(system.trauma.list).filter((key: string) => system.trauma.list[key]) as Trauma[]
    },
  }

  actor.injuries = { injuries, conditions };

  actor._id = data._id;

  return actor;
}

const getLegionnairesBySquads = (game: any) => {
  const legionnaires = getActorsBySpecialization(game, Object.values(LegionnaireEnum));
  const squads: Record<string, any[]> = {};

  legionnaires.forEach((legionnaire: any) => {
    const { squad } = legionnaire.system;
    const key = squad && SQUADS.get(squad) || 'unassigned';

    squads[key] ??= [];
    squads[key].push(mapSquadMate(legionnaire));
  });
  return squads;
}

const getSpecialistsBySpeciality = (game: any) => {
  const specialists = getActorsBySpecialization(game, Object.values(SpecialistEnum));
  const specialities: Record<string, any[]> = {};

  specialists.forEach((specialist: any) => {
    const key = specialist.system.class.toLowerCase();
    specialities[key] ??= [];
    specialities[key].push(mapSquadMate(specialist));
  });
  return specialities;
}

export const calculateMarshalBonuses = () => {
  const entities: { officers: any[], chosen: any[] } = {
    officers: [],
    chosen: [],
  }

  for (const entity of game.actors.values()) {
    if (entity.type === 'chosen') {
      entities.chosen.push(entity);
    }


    if (entity.type === 'character') {
      if (entity.system.class.toLowerCase() === SpecialistEnum.Officer) {
        entities.officers.push(entity);
      }
    }
  }

  const groupBonuses: Map<string, IBonus> = new Map();

  entities.officers.forEach((actor: any) => {
    const strategists = [...actor.items.values()].filter(
      (item: any) => {
        return item.name === '(O) Strategist';
      }
    );
    if (strategists.length > 0) {
      groupBonuses.set('strategist', {
        key: 'officer',
        name: 'specialization',
        ability: 'strategist',
        bonus: { bonus: 1 }
      });
    }
  });

  entities.chosen.forEach((actor: any) => {
    actor.items.values().forEach((item: any) => {
      const perk = String(item.name);
      if (CHOSEN[perk] !== undefined) {
        groupBonuses.set(perk, { key: item.system.class, name: 'chosen', ability: item.name, bonus: CHOSEN[perk] });
      }
    })
  });


  return { group: groupBonuses };
}

const mapProjects = (data: any): IProject[] => {
  return Object.keys(data.system.resources.projects).map((key: string) => {
    const project = data.system.resources.projects[key];
    return {
      steps: Number(project.type),
      description: project.description,
      name: project.name,
      current: Number(project.value),
      color: project.color,
    }
  });
}

const mapQuartermasterEntities = (data: any): { personnel: IPersonnel, materiel: IMateriel } => {
  const personnel: IPersonnel = {
    laborers: [],
    alchemists: [],
    mercy: []
  };
  const materiel: IMateriel = {
    foodStores: [],
    blackShot: [],
    horses: [],
    religiousSupplies: [],

    other: [],
    supplyCart: [],
    siegeWeapons: [],
  };

  for (const item of data.items) {
    const flag = data.flags['band-of-blades'].items[item._id];

    if (item.type === 'personnel') {
      const personal = {
        _id: item._id,
        name: item.name,
        image: item.img,
      }

      if (item.name === 'Alchemist') {
        personnel.alchemists.push({
          ...personal,
          injuries: {
            corruption: { current: Number(flag.usages || 0), max: Number(flag.usagesMax || 8) },
          },
        });
      }

      if (item.name === 'Mercy') {
        personnel.mercy.push({
          ...personal,
          conditions: {
            trauma: { wounded: flag?.wounded || false },
          }
        })
      }

      if (item.name === 'Laborer') {
        personnel.laborers.push(personal);
      }
    }

    if (item.type === 'materiel') {
      const material = {
        _id: item._id,
        name: item.name,
        image: item.img,
      }
      let key = '';

      switch (item.name) {
        case 'Food Stores': {
          key = 'foodStores';
          break;
        }
        case 'Black Shot': {
          key = 'blackShot';
          break;
        }
        case 'Horses': {
          key = 'horses';
          break;
        }
        case 'Religious Supplies': {
          key = 'religiousSupplies';
          break;
        }
      }

      if (key !== '') {
        materiel[key as keyof IMateriel].push({
          ...material,
          usage: {
            current: Number(flag?.usages || 0),
            max: Number(flag?.usagesMax || 3)
          }
        });
      }

      key = '';

      switch (item.name) {
        case 'Siege Weapons': {
          key = 'siegeWeapons';
          break;
        }
        case 'Other': {
          key = 'other';
          break;
        }
        case 'Supply Cart': {
          key = 'supplyCart';
          break;
        }
      }

      if (key !== '') {
        materiel[key as keyof IMateriel].push({ ...material as QuartermasterEntityType<any> });
      }
    }
  }

  return { personnel, materiel };
}