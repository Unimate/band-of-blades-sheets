import type { IStress, ITrauma } from "./actor.type";

export interface ISquadMate {
  _id: string;
  character: {
    name: string;
    image: string;
  },
  injuries: {
    injuries: {
      stress: IStress;
    };
    conditions: {
      trauma: ITrauma;
    };
  };
}


export interface IMarshal {
  legionnaires: Record<string, ISquadMate[]>;
  specialists: Record<string, ISquadMate[]>;
}

export interface IMarshalActions {
  actions: {
    staffTheSquad: (name: string, staff: number) => Promise<void>;
    openActorPage: (_id: string) => Promise<void>;
  }
}