import {
  type Condition,
  type Heritage,
  type ISafety,
  type ISkill,
  type ISkills,
  type SkillCategoryLabel,
  SkillLabel,
  type Specialization,
  type Trait,
  type Trauma
} from "./actor.type";
import type { ILoadItem } from "./loadout.type";

export interface IActions {
  actions: {
    selectAbilities (abilities: string[]): Promise<void>;
    selectItems (items: ILoadItem[]): Promise<void>;
    selectSpecialization (specialization: Specialization): Promise<void>;
    selectHeritage (heritage: Heritage, trait: Trait): Promise<void>;
    selectSquad (squad: string): Promise<void>;
    updateLoad (load: 'Light' | 'Normal' | 'Heavy'): Promise<void>;
    updateAbilityProgress (): Promise<void>;
    updateInjury (type: 'stress' | 'corruption', update: number): Promise<void>;
    updateCondition (type: 'trauma' | 'blight', update: Trauma | Condition): Promise<void>;
    updateSkillProgress (limit: number, label: SkillCategoryLabel): Promise<void>;
    updateSkill (label: SkillCategoryLabel, skill: SkillLabel, value: number): Promise<void>;
    updateSafety (safety: keyof ISafety): Promise<void>;
    updateHealingSteps (type: 'heavy' | 'medium' | 'light', step: number): Promise<void>;
    updateHarmReason (type: 'deadly' | 'heavy' | 'medium' | 'light', index: number, value: string): Promise<void>;
    updateName (name: string): Promise<void>;
    roll (attribute: ISkills | ISkill): Promise<void>;
    editNotes (): Promise<void>;
    linkEntityDescription (source: Specialization | Trait, name: string): Promise<void>;
  }
}