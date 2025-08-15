import {
  CommanderLook,
  CommanderPersonality,
  CommanderReputation, LorekeeperLook, LorekeeperPersonality, LorekeeperReputation,
  MarshalLook,
  MarshalPersonality,
  MarshalReputation,
  QuartermasterLook,
  QuartermasterPersonality,
  QuartermasterReputation,
  RoleHeritage,
  RoleSpecialization, SpymasterLook, SpymasterPersonality, SpymasterReputation
} from "../types/roles.type";

const COMMANDER = Object.freeze({
  heritage: Object.values(RoleHeritage),
  reputation: Object.values(CommanderReputation),
  personality: Object.values(CommanderPersonality),
  look: Object.values(CommanderLook),
});

const MARSHAL = Object.freeze({
  heritage: Object.values(RoleHeritage),
  reputation: Object.values(MarshalReputation),
  personality: Object.values(MarshalPersonality),
  look: Object.values(MarshalLook),
});

const QUARTERMASTER = Object.freeze({
  heritage: Object.values(RoleHeritage),
  reputation: Object.values(QuartermasterReputation),
  personality: Object.values(QuartermasterPersonality),
  look: Object.values(QuartermasterLook),
});

const LOREKEEPER = Object.freeze({
  heritage: Object.values(RoleHeritage),
  reputation: Object.values(LorekeeperReputation),
  personality: Object.values(LorekeeperPersonality),
  look: Object.values(LorekeeperLook),
});

const SPYMASTER = Object.freeze({
  heritage: Object.values(RoleHeritage),
  reputation: Object.values(SpymasterReputation),
  personality: Object.values(SpymasterPersonality),
  look: Object.values(SpymasterLook),
});


export const ROLES = new Map<RoleSpecialization, Record<string, string[]>>([
  [RoleSpecialization.Commander, COMMANDER],
  [RoleSpecialization.Marshal, MARSHAL],
  [RoleSpecialization.Quartermaster, QUARTERMASTER],
  [RoleSpecialization.Lorekeeper, LOREKEEPER],
  [RoleSpecialization.Spymaster, SPYMASTER],
])