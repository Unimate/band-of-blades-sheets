import { LegionnaireEnum, SpecialistEnum, type Specialization, type Trauma } from "../types/actor.type";
import { SQUADS } from "../dictionaries/squads";
import type { ISquadMate } from "../types/roles.type";

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

export const getLegionnairesBySquads = (game: any) => {
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

export const getSpecialistsBySpeciality = (game: any) => {
  const specialists = getActorsBySpecialization(game, Object.values(SpecialistEnum));
  const specialities: Record<string, any[]> = {};

  specialists.forEach((specialist: any) => {
    const key = specialist.system.class.toLowerCase();
    specialities[key] ??= [];
    specialities[key].push(mapSquadMate(specialist));
  });
  return specialities;
}