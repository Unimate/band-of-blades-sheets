import { type IStress, type ITrauma } from "./actor.type";

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


export enum RoleHeritage {
  Bartans = 'bartan',
  Orites = 'orite',
  Zemyati = 'zemyati',
  Panyar = 'panyar',
  Other = 'other',
}

export enum MarshalReputation {
  Callous = 'Callous',
  Fearless = 'Fearless',
  Honorable = 'Honorable',
  Proud = 'Proud',
  Protective = 'Protective'
}

export enum MarshalPersonality {
  Bold = 'Bold',
  Cold = 'Cold',
  Cautious = 'Cautious',
  Fierce = 'Fierce',
  Vengeful = 'Vengeful'
}

export enum MarshalLook {
  Grizzled = 'Grizzled',
  Stylish = 'Stylish',
  OneEyed = 'One-Eyed',
  Scarred = 'Scarred',
  Crisp = 'Crisp'
}

export enum CommanderReputation {
  Fierce = 'Fierce',
  Devious = 'Devious',
  Unstoppable = 'Unstoppable',
  Proud = 'Proud',
  Inspiring = 'Inspiring'
}

export enum CommanderPersonality {
  Bold = 'Bold',
  Cold = 'Cold',
  Calculating = 'Calculating',
  Stoic = 'Stoic',
  Prideful = 'Prideful'
}

export enum CommanderLook {
  Lithe = 'Lithe',
  Haggard = 'Haggard',
  WellKempt = 'Well-kempt',
  Scarred = 'Scarred',
  Athletic = 'Athletic'
}

export enum QuartermasterReputation {
  Precise = 'Precise',
  Clever = 'Clever',
  Prepared = 'Prepared',
  Frugal = 'Frugal',
  Cautious = 'Cautious'
}

export enum QuartermasterPersonality {
  Smart = 'Smart',
  Kind = 'Kind',
  Resourceful = 'Resourceful',
  Frugal = 'Frugal',
  Haughty = 'Haughty'
}

export enum QuartermasterLook {
  Stylish = 'Stylish',
  Opulent = 'Opulent',
  Colorful = 'Colorful',
  Tired = 'Tired',
  Grizzled = 'Grizzled'
}

export enum LorekeeperReputation {
  Wise = 'Wise',
  Friendly = 'Friendly',
  Inquisitive = 'Inquisitive',
  Dedicated = 'Dedicated',
  Famous = 'Famous'
}

export enum LorekeeperPersonality {
  Warm = 'Warm',
  Clever = 'Clever',
  Eloquent = 'Eloquent',
  Young = 'Young',
  Curious = 'Curious'
}

export enum LorekeeperLook {
  Soft = 'Soft',
  Maimed = 'Maimed',
  OneEyed = 'One-Eyed',
  InkStained = 'Ink-Stained',
  Grizzled = 'Grizzled'
}

export enum SpymasterReputation {
  Aloof = 'Aloof',
  Deadly = 'Deadly',
  Dangerous = 'Dangerous',
  Cold = 'Cold',
  Shrewd = 'Shrewd'
}

export enum SpymasterPersonality {
  Cold = 'Cold',
  Quiet = 'Quiet',
  Calculating = 'Calculating',
  Smug = 'Smug',
  Gracious = 'Gracious'
}

export enum SpymasterLook {
  Comely = 'Comely',
  Colorful = 'Colorful',
  Nondescript = 'Nondescript',
  Gaunt = 'Gaunt',
  Tattooed = 'Tattooed'
}

export type RoleReputation =
  CommanderReputation
  & MarshalReputation
  & QuartermasterReputation
  & LorekeeperReputation
  & SpymasterReputation;

export type RoleLook = CommanderLook & MarshalLook & QuartermasterLook & LorekeeperLook & SpymasterLook;

export type RolePersonality =
  CommanderPersonality
  & MarshalPersonality
  & QuartermasterPersonality
  & LorekeeperPersonality
  & SpymasterPersonality;

export enum RoleSpecialization {
  Commander = 'Commander',
  Marshal = 'Marshal',
  Quartermaster = 'Quartermaster',
  Lorekeeper = 'Lorekeeper',
  Spymaster = 'Spymaster',
}

interface IRoleCharacter {
  name: string,
  specialization: null | RoleSpecialization,
  heritage: null | RoleHeritage,
  reputation: null | RoleReputation,
  look: RoleLook[],
  personality: RolePersonality[],
  image: string,
}

export interface IRole {
  _id: string;
  character: IRoleCharacter;
  notes: string;
}

export interface IMarshal {
  morale: number;
  legionnaires: Record<string, ISquadMate[]>;
  specialists: Record<string, ISquadMate[]>;
  dictionaries: {
    squads: { name: string; image: string; description: string; }[];
  }
}

export interface IMarshalActions {
  actions: {
    staffTheSquad: (name: string, staff: number) => Promise<void>;
    openActorPage: (_id: string) => Promise<void>;
    updateMorale: (value: number) => Promise<void>;
    editNotes: () => Promise<void>;
    rollEngagements: () => Promise<void>;
  }
}