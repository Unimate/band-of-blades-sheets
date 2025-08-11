import {
  BartanTraitEnum,
  LegionnaireEnum,
  OriteTraitEnum,
  PanyarTraitEnum,
  SkillCategoryLabel,
  SkillLabel,
  SpecialistEnum,
  ZemyatiTraitEnum
} from "../types/actor.type";
import { type IHeritageBonus, type ISpecializationBonuses } from "../types/dices.type";

export const PERSONAL: ISpecializationBonuses = {
  [SpecialistEnum.Scout]: {
    like_the_wind: {
      prowess: { bonus: 1 }
    },
    infiltrator: {
      scout: { potency: 1 },
      maneuver: { potency: 1 }
    },
    daredevil: {
      rig: { bonus: 1, minPosition: 'desperate' },
      research: { bonus: 1, minPosition: 'desperate' },
      scout: { bonus: 1, minPosition: 'desperate' },
      grit: { bonus: 1, minPosition: 'desperate' },
      maneuver: { bonus: 1, minPosition: 'desperate' },
      shoot: { bonus: 1, minPosition: 'desperate' },
      skirmish: { bonus: 1, minPosition: 'desperate' },
      wreck: { bonus: 1, minPosition: 'desperate' },
      consort: { bonus: 1, minPosition: 'desperate' },
      discipline: { bonus: 1, minPosition: 'desperate' },
      marshal: { bonus: 1, minPosition: 'desperate' },
      sway: { bonus: 1, minPosition: 'desperate' }
    }
  },
  [SpecialistEnum.Heavy]: {
    backup: {
      insight: { bonus: 1 },
      resolve: { bonus: 1 },
      prowess: { bonus: 1 }
    },
    against_the_darkness: {
      insight: { bonus: 1 },
      resolve: { bonus: 1 },
      prowess: { bonus: 1 }
    }
  },
  [SpecialistEnum.Officer]: {
    officer_school: {
      research: { bonus: 1 }
    },
    strategist: {
      sway: { bonus: 1 }
    }
  },
  [SpecialistEnum.Sniper]: {
    ambush: {
      shoot: { bonus: 1 },
      rig: { bonus: 1 }
    },
    akimbo: {
      shoot: { potency: 1 },
      skirmish: { potency: 1 }
    }
  },
  [LegionnaireEnum.Rookie]: {
    "devil's_own_luck": {
      insight: { bonus: 1 },
      resolve: { bonus: 1 },
      prowess: { bonus: 1 }
    }
  },
  [LegionnaireEnum.Soldier]: {
    over_the_top: {
      maneuver: { bonus: 1 }
    },
    eat_iron_shit_nails: {
      insight: { bonus: 1 },
      resolve: { bonus: 1 },
      prowess: { bonus: 1 }
    },
    cavalry: {
      maneuver: { bonus: 1 }
    }
  }
};

export const GROUP: ISpecializationBonuses = {
  [SpecialistEnum.Heavy]: {
    against_the_darkness: {
      insight: { bonus: 1 },
      resolve: { bonus: 1 },
      prowess: { bonus: 1 }
    }
  },
  [SpecialistEnum.Officer]: {
    logistical_support: {
      rig: { bonus: 1 },
      research: { bonus: 1 },
      scout: { bonus: 1 },
      grit: { bonus: 1 },
      maneuver: { bonus: 1 },
      shoot: { bonus: 1 },
      skirmish: { bonus: 1 },
      wreck: { bonus: 1 },
      consort: { bonus: 1 },
      discipline: { bonus: 1 },
      marshal: { bonus: 1 },
      sway: { bonus: 1 }
    }
  },
};

export const HERITAGE: IHeritageBonus = {
  [BartanTraitEnum.Stoic]: {
    [SkillCategoryLabel.Prowess]: { bonus: 1 },
  },
  [OriteTraitEnum.Vengeful]: {
    [SkillLabel.Rig]: { potency: 1 },
    [SkillLabel.Research]: { potency: 1 },
    [SkillLabel.Scout]: { potency: 1 },
    [SkillLabel.Grit]: { potency: 1 },
    [SkillLabel.Maneuver]: { potency: 1 },
    [SkillLabel.Shoot]: { potency: 1 },
    [SkillLabel.Skirmish]: { potency: 1 },
    [SkillLabel.Wreck]: { potency: 1 },
    [SkillLabel.Consort]: { potency: 1 },
    [SkillLabel.Discipline]: { potency: 1 },
    [SkillLabel.Marshal]: { potency: 1 },
    [SkillLabel.Sway]: { potency: 1 }
  },
  [PanyarTraitEnum.Shrewd]: {
    [SkillCategoryLabel.Insight]: { bonus: 1 },
  },
  [PanyarTraitEnum.Marked]: {
    [SkillCategoryLabel.Resolve]: { bonus: 2 }
  },
  [ZemyatiTraitEnum.Stubborn]: {
    [SkillCategoryLabel.Resolve]: { bonus: 1 }
  },
  [ZemyatiTraitEnum.Loyal]: {
    [SkillLabel.Rig]: { bonus: 1 },
    [SkillLabel.Research]: { bonus: 1 },
    [SkillLabel.Scout]: { bonus: 1 },
    [SkillLabel.Grit]: { bonus: 1 },
    [SkillLabel.Maneuver]: { bonus: 1 },
    [SkillLabel.Shoot]: { bonus: 1 },
    [SkillLabel.Skirmish]: { bonus: 1 },
    [SkillLabel.Wreck]: { bonus: 1 },
    [SkillLabel.Consort]: { bonus: 1 },
    [SkillLabel.Discipline]: { bonus: 1 },
    [SkillLabel.Marshal]: { bonus: 1 },
    [SkillLabel.Sway]: { bonus: 1 }
  },
  [ZemyatiTraitEnum.Bold]: {
    [SkillCategoryLabel.Insight]: { bonus: 1 },
    [SkillCategoryLabel.Resolve]: { bonus: 1 },
    [SkillCategoryLabel.Prowess]: { bonus: 1 },
  }
}