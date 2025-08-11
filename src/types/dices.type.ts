import { LegionnaireEnum, SkillCategoryLabel, SkillLabel, SpecialistEnum, type Trait } from "./actor.type";

export interface IDices {
  basic: number;
  bonus: number;
}

export interface ICalculation {
  state: string;
  dices: number[];
  dice: number;
  roll: any;
}

export interface IBonuses {
  personal: Map<string, IBonus>;
  group: Map<string, IBonus>;
  heritage: Map<string, IBonus>;
}

export interface IBonus {
  key: string,
  ability: string,
  name: string,
  bonus: IBonusAttributes
}

export interface IActions {
  confirm(total: number, position: string, effect: string): Promise<void>;
}

export type ISpecializationBonuses = {
  [key in (SpecialistEnum & LegionnaireEnum)]: ISkillBonus;
}

export type ISkillBonus = {
  [key in (SkillLabel & SkillCategoryLabel)]: IBonus
}

export type IHeritageBonus = {
  [key in (Trait)]?: ISkillBonus;
}

export interface IBonusAttributes { bonus?: number, potency?: number, minPosition?: string }