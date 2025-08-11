import {
  Condition,
  type ICharacter,
  type IHarm,
  type IInjuries,
  type ISkills,
  SkillCategoryLabel,
  SkillLabel,
  Trauma
} from "./types/actor.type";

export const CONSTANTS = {
  SVELTE_CONTEXT: {
    CONTEXT: 'context',
    DIALOG: 'dialog',
  },
  PACKS: {
    ABILITY: 'band-of-blades.ability',
    ITEMS: 'band-of-blades.item',
    SPECIALIZATION: 'band-of-blades.class',
    SQUAD: 'band-of-blades.squad',
    HERITAGE: 'band-of-blades.heritage',
    TRAIT: 'band-of-blades.trait',
  },
  MODULE: {
    ID: 'band-of-blades-sheets',
  }
} as const;


export const DEFAULT_ABILITIES = {
  progress: 0,
  list: []
}

export const DEFAULT_HARM: Record<string, IHarm> = {
  light: {descriptions: [], healingSteps: 1, harmsLimit: 2, currentHeal: 0},
  medium: {descriptions: [], healingSteps: 2, harmsLimit: 2, currentHeal: 0},
  heavy: {descriptions: [], healingSteps: 3, harmsLimit: 1, currentHeal: 0},
}

export const DEFAULT_CHARACTER: ICharacter = {
  name: '',
  specialization: null,
  heritage: null,
  traits: [],
  image: '',
  squad: {
    name: '',
    image: '',
  },
};

export const DEFAULT_INJURIES: IInjuries = {
  injuries: {
    stress: {current: 0, max: 6},
    corruption: {current: 0, max: 6},
  },
  conditions: {
    trauma: {max: 4, types: [] as Trauma[]},
    blight: {max: 4, types: [] as Condition[]},
  }
};

export const DEFAULT_SAFETY = {
  armor: false,
  heavy: false,
  shield: false,
  special: false,
};


const Insight: ISkills = {
  label: SkillCategoryLabel.Insight,
  bonus: 0,
  progress: 0,
  skills: [
    {label: SkillLabel.Research, limit: 3, value: 0},
    {label: SkillLabel.Research, limit: 3, value: 0},
    {label: SkillLabel.Scout, limit: 3, value: 0},
  ]
};

const Prowess: ISkills = {
  label: SkillCategoryLabel.Prowess,
  bonus: 0,
  progress: 0,
  skills: [
    {label: SkillLabel.Maneuver, limit: 3, value: 0},
    {label: SkillLabel.Shoot, limit: 3, value: 0},
    {label: SkillLabel.Skirmish, limit: 3, value: 0},
    {label: SkillLabel.Wreck, limit: 3, value: 0},
  ]
};

const Resolve: ISkills = {
  label: SkillCategoryLabel.Resolve,
  bonus: 0,
  progress: 0,
  skills: [
    {label: SkillLabel.Consort, limit: 3, value: 0},
    {label: SkillLabel.Discipline, limit: 3, value: 0},
    {label: SkillLabel.Marshal, limit: 3, value: 0},
    {label: SkillLabel.Sway, limit: 3, value: 0},
  ]
};

export const DEFAULT_SKILLS = [Insight, Prowess, Resolve];