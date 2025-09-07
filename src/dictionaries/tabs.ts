import { RoleSpecialization } from "../types/roles.type";

export const TABS: Record<string, ({ priority: string; icon: string; })[]> = {
  [RoleSpecialization.Marshal]: [
    { priority: 'primary', icon: 'ra-double-team' },
    { priority: 'secondary', icon: 'ra-large-hammer' },
    { priority: 'tertiary', icon: 'ra-book' },
  ],
  [RoleSpecialization.Quartermaster]: [
    { priority: 'primary', icon: ' ra-tower' },
    { priority: 'secondary', icon: 'ra-anvil' },
    { priority: 'tertiary', icon: 'ra-book' },
  ]
}