import type { ILoadItem } from "./loadout.type";

export enum SpecialistEnum {
  Heavy = 'heavy',
  Medic = 'medic',
  Officer = 'officer',
  Scout = 'scout',
  Sniper = 'sniper'
}

export enum LegionnaireEnum {
  Soldier = 'soldier',
  Rookie = 'rookie',
}

export enum HeritageEnum {
  Bartans = 'bartan',
  Orites = 'orite',
  Panyar = 'panyar',
  Zemyati = 'zemyati',
}

export enum ZemyatiTraitEnum {
  /**
   * You never take less effect from level 1 harm penalties.
   */
  Tough = "tough",

  /**
   * When you resist the consequences of desperate actions, take +1d.
   */
  Bold = "bold",

  /**
   * When you lead or participate in a group action, take +1d to your roll.
   */
  Loyal = "loyal",

  /**
   * When you resist with resolve, take +1d.
   */
  Stubborn = "stubborn"
}

export enum PanyarTraitEnum {
  /**
   * Your rig action can advance to 4.
   */
  Artisan = "artisan",

  /**
   * In normal load you’re considered fast and quiet, as if you had equipped a light load.
   * This may affect position or effect when maneuvering or scouting.
   */
  Traveler = "traveler",

  /**
   * When you resist with insight, take +1d.
   */
  Shrewd = "shrewd",

  /**
   * When you resist corruption, take +2d.
   */
  Marked = "marked"
}

export enum OriteTraitEnum {
  /**
   * When the Quartermaster declares campaign actions, you may boost
   * the effect of one action you are affected by.
   * Example: if the Quartermaster declares the Liberty campaign action,
   * your Orite may clear all their stress (though the whole Legion doesn’t get extra morale).
   */
  Noble = "noble",

  /**
   * Mark an additional rank of sway when you create the character, up to a maximum of 3.
   */
  Connected = "connected",

  /**
   * You gain potency when a harm penalty applies.
   */
  Vengeful = "vengeful",

  /**
   * Mark an additional rank of discipline when you create the character, up to a maximum of 2.
   */
  Stern = "stern"
}

export enum BartanTraitEnum {
  /**
   * Mark an additional rank of consort when you create the character, up to a maximum of 2.
   */
  Warm = "warm",

  /**
   * Whenever you go on a mission, you may equip a Reliquary in addition to anything else you take.
   */
  Pious = "pious",

  /**
   * When you resist with prowess, take +1d.
   */
  Stoic = "stoic",

  /**
   * Mark an additional rank of research when you create the character, up to a maximum of 2.
   */
  Educated = "educated"
}

export type Trait = ZemyatiTraitEnum | PanyarTraitEnum | OriteTraitEnum | BartanTraitEnum;

export type Heritage = HeritageEnum;

export type Specialization = SpecialistEnum | LegionnaireEnum;

export interface ICharacter {
  name: string,
  specialization: null | Specialization,
  heritage: null | Heritage,
  traits: Trait[],
  image: string,
  squad: {
    name: string,
    image: string,
  };
}

export interface IAbilities {
  progress: number;
  list: ({ name: string, specialization: string })[];
}

export enum Trauma {
  Cold = 'cold',
  Haunted = 'haunted',
  Obsessed = 'obsessed',
  Paranoid = 'paranoid',
  Reckless = 'reckless',
  Soft = 'soft',
  Unstable = 'unstable',
  Vicious = 'vicious',
}

export enum Condition {
  Anathema = 'anathema',
  Host = 'host',
  Hunger = 'hunger',
  Miasma = 'miasma',
  Mutated = 'mutated',
  Rage = 'rage',
  Rot = 'rot',
  Visions = 'visions',
}

export interface IStress {
  current: number;
  max: number;
}

export interface ITrauma {
  max: number;
  types: Trauma[];
}

export interface ICorruption {
  current: number;
  max: number;
}

export interface IBlight {
  max: number;
  types: Condition[];
}

export interface IInjuries {
  injuries: { stress: IStress; corruption: ICorruption; };
  conditions: { trauma: ITrauma; blight: IBlight };
}

export interface ISkill {
  label: SkillLabel;
  value: number;
  limit: number;
}

export interface ISkills {
  label: SkillCategoryLabel;
  progress: number;
  bonus: number;
  skills: ISkill[];
}

export enum SkillLabel {
  // Insight
  Rig = 'rig',
  Research = 'research',
  Scout = 'scout',
  Grit = 'grit',

  // Resolve
  Consort = 'consort',
  Discipline = 'discipline',
  Marshal = 'marshal',
  Sway = 'sway',

  // Prowess
  Maneuver = 'maneuver',
  Shoot = 'shoot',
  Skirmish = 'skirmish',
  Wreck = 'wreck',
}

export enum SkillCategoryLabel {
  Resolve = 'resolve',
  Prowess = 'prowess',
  Insight = 'insight',
}

export interface IHarm {
  descriptions: string[];
  harmsLimit: number;
  healingSteps: number;
  currentHeal: number;
}

export interface ISafety {
  armor: boolean;
  heavy: boolean;
  shield: boolean;
  special: boolean;
}

export interface IExtra {
  crimson: boolean;
  chemist: boolean;
  grenadier: boolean;
  pious: boolean
}

export interface IActor {
  _id: string;
  character: ICharacter;
  abilities: IAbilities;
  injuries: IInjuries;
  skills: ISkills[];
  harm: Record<string, IHarm>;
  safety: ISafety;
  load: {
    type: 'Light' | 'Normal' | 'Heavy';
    items: ILoadItem[];
    selectable: ILoadItem[];
    selected: ILoadItem[];
    limit: number;
  },
  extra: IExtra;
  notes: string;
}