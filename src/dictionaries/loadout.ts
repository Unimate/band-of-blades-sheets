import { type IExtra, LegionnaireEnum, SpecialistEnum, type Specialization } from "../types/actor.type";

const heavy = {
  light: [{p: '(L) Flare Gun'}, {p: '(L) Fine Armor'}, {p: '(L) Fine Hand Weapon'}],
  normal: [{p: '(N) Fitted Heavy Plate'}, {p: '(N) Fine Shield', a: '(N) Fine Heavy Weapon'}],
  heavy: [{p: '(H) Fine Wrecking Kit'}, {p: '(H) Fine Tower Shield'}]
}

const heavyUtilities = ['(U) Hand Weapon', '(U) Heavy Weapon', '(U) Shield', '(U) Winter Clothing', '(U) Oil', '(U) Supplies', '(U) Soldier\'s Kit', '(U) Wrecking Kit', '(U) Reliquary'];

const HEAVY_VOCABULARY = new Map<string, string>([
  ['(L) Flare Gun', 'flare_gun'],
  ['(L) Fine Armor', 'fine_armor'],
  ['(L) Fine Hand Weapon', 'fine_hand_weapon'],
  ['(N) Fitted Heavy Plate', 'fitted_heavy_plate'],
  ['(N) Fine Shield', 'fine_shield'],
  ['(N) Fine Heavy Weapon', 'fine_heavy_weapon'],
  ['(H) Fine Wrecking Kit', 'fine_wrecking_kit'],
  ['(H) Fine Tower Shield', 'fine_tower_shield'],
  ['(U) Hand Weapon', 'hand_weapon'],
  ['(U) Heavy Weapon', 'heavy_weapon'],
  ['(U) Black Shot', 'black_shot'],
  ['(U) Shield', 'shield'],
  ['(U) Winter Clothing', 'winter_clothing'],
  ['(U) Oil', 'oil'],
  ['(U) Supplies', 'supplies'],
  ['(U) Soldier\'s Kit', 'soldier_kit'],
  ['(U) Wrecking Kit', 'wrecking_kit'],
  ['(U) Reliquary', 'reliquary'],
]);

const medic = {
  light: [{p: '(L) Fine Medic Kit'}, {p: '(L) Tonics'}, {p: '(L) Holy Symbol of Mercy'}, {p: '(L) Mark of the Healing God (optional)', o: true}],
  normal: [{p: '(N) Fine Pistol'}, {p: '(N) Ammo'}, {p: '(N) Armor'}, {p: '(N) More Tonics'}],
  heavy: [{p: '(H) Lots of Tonics'}],
};

const medicUtilities = ['(U) Hand Weapon', '(U) Oil', '(U) Bandoier', '(U) Shield', '(U) Winter Clothing', '(U) Black Shot', '(U) Supplies', '(U) Repair Kit', '(U) Books & Scrolls', '(U) Reliquary'];

const MEDIC_VOCABULARY = new Map<string, string>([
  ['(N) Ammo', 'ammo'],
  ['(N) Armor', 'armor'],
  ['(U) Books & Scrolls', 'books_scrolls'],
  ['(U) Black Shot', 'black_shot'],
  ['(L) Fine Medic Kit', 'fine_medic_kit'],
  ['(N) Fine Pistol', 'fine_pistol'],
  ['(U) Hand Weapon', 'hand_weapon'],
  ['(L) Holy Symbol of Mercy', 'holy_symbol_of_mercy'],
  ['(L) Mark of the Healing God (optional)', 'mark_of_the_healing_god'],
  ['(L) Tonics', 'tonics'],
  ['(U) Oil', 'oil'],
  ['(U) Reliquary', 'reliquary'],
  ['(U) Repair Kit', 'repair_kit'],
  ['(U) Shield', 'shield'],
  ['(U) Supplies', 'supplies'],
  ['(N) More Tonics', 'tonics'],
  ['(U) Winter Clothing', 'winter_clothing'],
  ['(H) Lots of Tonics', 'tonics'],
  ['(U) Bandoier', 'bandolier'],
]);

const officer = {
  light: [{p: '(L) Flare Gun'}, {p: '(L) Fine Armor'}, {p: '(L) Fine Hand Weapon'}, {p: '(L) Fine Ornate Cloak (optional)', o: true}],
  normal: [{p: '(N) Fine Luxury Item'}, {p: '(N) Fine Shield', a: '(N) Fine Pistol'}, {p: '(N) Ammo'}],
  heavy: [{p: '(H) Battlefield Banner'}, {p: '(H) Fine Heavy Armor'}],
};

const officerUtilities = ['(U) Hand Weapon', '(U) Black Shot', '(U) Shield', '(U) Winter Clothing', '(U) Oil', '(U) Supplies', '(U) Compass and Maps', '(U) Lenses', '(U) Reliquary'];

const OFFICER_VOCABULARY = new Map<string, string>([
  ['(L) Flare Gun', 'flare_gun'],
  ['(L) Fine Armor', 'fine_armor'],
  ['(L) Fine Hand Weapon', 'fine_hand_weapon'],
  ['(L) Fine Ornate Cloak (optional)', 'fine_ornate_cloak'],
  ['(N) Fine Luxury Item', 'fine_luxury_item'],
  ['(N) Fine Shield', 'fine_shield'],
  ['(N) Fine Pistol', 'fine_pistol'],
  ['(N) Ammo', 'ammo'],
  ['(H) Battlefield Banner', 'battlefield_banner'],
  ['(H) Fine Heavy Armor', 'fine_heavy_armor'],
  ['(U) Hand Weapon', 'hand_weapon'],
  ['(U) Black Shot', 'black_shot'],
  ['(U) Shield', 'shield'],
  ['(U) Winter Clothing', 'winter_clothing'],
  ['(U) Oil', 'oil'],
  ['(U) Supplies', 'supplies'],
  ['(U) Compass and Maps', 'compass_maps'],
  ['(U) Lenses', 'lenses'],
  ['(U) Reliquary', 'reliquary'],
]);

const scout = {
  light: [{p: '(L) Fine Compass and Maps'}, {p: '(L) Fine Bow and Arrows'}, {p: '(L) Black Arrows'}],
  normal: [{p: '(N) Climbing Kit',}, {p: '(N) Fine Lenses'}, {p: '(N) Fine Reliquary'}],
  heavy: [{p: '(H) Camo Gear'}, {p: '(H) Fine Armor'}],
};

const scoutUtilities = ['(U) Hand Weapon', '(U) Large Weapon', '(U) Black Shot', '(U) Pistol', '(U) Ammo', '(U) Flare Gun', '(U) Supplies', '(U) Winter Clothing', '(U) Soldier\'s Kit', '(U) Reliquary'];

const SCOUT_VOCABULARY = new Map<string, string>([
  ['(U) Ammo', 'ammo'],
  ['(L) Fine Bow and Arrows', 'fine_bow_arrows'],
  ['(L) Fine Compass and Maps', 'fine_compass_maps'],
  ['(L) Black Arrows', 'black_arrows'],
  ['(U) Black Shot', 'black_shot'],
  ['(H) Camo Gear', 'camo_gear'],
  ['(N) Climbing Kit', 'climbing_kit'],
  ['(H) Fine Armor', 'fine_armor'],
  ['(N) Fine Lenses', 'fine_lenses'],
  ['(N) Fine Reliquary', 'fine_reliquary'],
  ['(U) Flare Gun', 'flare_gun'],
  ['(U) Hand Weapon', 'hand_weapon'],
  ['(U) Large Weapon', 'large_weapon'],
  ['(U) Pistol', 'pistol'],
  ['(U) Reliquary', 'reliquary'],
  ['(U) Soldier\'s Kit', 'soldier_kit'],
  ['(U) Supplies', 'supplies'],
  ['(U) Winter Clothing', 'winter_clothing'],
]);

const sniper = {
  light: [{p: '(L) Black Shot'}, {p: '(L) Ammo'}, {p: '(L) 2 Fine Pistols', a: '(L) Fine Long Rifle'}],
  normal: [{p: '(N) Gun Maintenance Kit'}, {p: '(N) Fine Armor'}],
  heavy: [{p: '(H) 2 Fine Pistols', a: '(H) Fine Long Rifle'}],
};

const sniperUtilities = ['(U) Hand Weapon', '(L) Black Shot', '(L) Black Shot', '(U) Pistol', '(U) Ammo', '(U) Oil', '(U) Supplies', '(U) Winter Clothing', '(U) Soldier\'s Kit', '(U) Reliquary'];

const SNIPER_VOCABULARY = new Map<string, string>([
  ['(L) Ammo', 'ammo'],
  ['(L) Black Shot', 'black_shot'],
  ['(N) Fine Armor', 'fine_armor'],
  ['(H) Fine Long Rifle', 'fine_long_rifle'],
  ['(L) Fine Long Rifle', 'fine_long_rifle'],
  ['(N) Gun Maintenance Kit', 'gun_maintenance_kit'],
  ['(U) Hand Weapon', 'hand_weapon'],
  ['(U) Oil', 'oil'],
  ['(U) Pistol', 'pistol'],
  ['(U) Ammo', 'ammo'],
  ['(U) Reliquary', 'reliquary'],
  ['(U) Supplies', 'supplies'],
  ['(U) Soldier\'s Kit', 'soldier_kit'],
  ['(U) Winter Clothing', 'winter_clothing'],
  ['(L) 2 Fine Pistols', 'two_fine_pistols'],
  ['(H) 2 Fine Pistols', 'two_fine_pistols'],
]);

const rookie = {
  light: [{p: '(L) Naive Hope'}, {p: '(L) Memento of Home'}, {p: '(L) Soldier\'s Kit'}, {p: '(L) Musket'}, {p: '(L) Ammo'}],
  normal: [{p: '(N) Family Weapon'}, {p: '(N) Tents and Camping Gear', a: '(N) Cooking Kit'}, {p: '(N) Fresh Food', o: true}],
  heavy: [{p: '(H) Armor'}, {p: '(H) Shield'}],
};

const rookieUtilities = ['(U) Armor', '(U) Hand Weapon', '(U) Shield', '(U) Winter Clothing', '(U) Oil', '(U) Supplies', '(U) Medic Kit', '(U) Climbing Kit', '(U) Reliquary'];

const ROOKIE_VOCABULARY = new Map<string, string>([
  ['(L) Ammo', 'ammo'],
  ['(H) Armor', 'armor'],
  ['(U) Armor', 'armor'],
  ['(U) Black Shot', 'black_shot'],
  ['(U) Climbing Kit', 'climbing_kit'],
  ['(N) Cooking Kit', 'cooking_kit'],
  ['(N) Family Weapon', 'family_weapon'],
  ['(N) Fresh Food', 'fresh_food'],
  ['(U) Hand Weapon', 'hand_weapon'],
  ['(U) Medic Kit', 'medic_kit'],
  ['(L) Memento of Home', 'memento_of_home'],
  ['(L) Musket', 'musket'],
  ['(L) Naive Hope', 'naive_hope'],
  ['(U) Oil', 'oil'],
  ['(U) Reliquary', 'reliquary'],
  ['(H) Shield', 'shield'],
  ['(U) Shield', 'shield'],
  ['(U) Supplies', 'supplies'],
  ['(L) Soldier\'s Kit', 'soldier_kit'],
  ['(N) Tents and Camping Gear', 'tents_camping_gear'],
  ['(U) Winter Clothing', 'winter_clothing']
]);

const soldier = {
  light: [{p: '(L) Fine Armor'}, {p: '(L) Memento of Home'}, {p: '(L) Fine Hand Weapon'}, {p: '(L) Fine Kit'}],
  normal: [{p: '(N) +2 Utility'}, {p: '(N) Fine Shield', a: '(N) Fine Heavy Weapon'}],
  heavy: [{p: '(H) +1 Utility'}, {p: '(H) Fine Heavy Armor'}],
};

const soldierUtilities = ['(U) Musket', '(U) Ammo', '(U) Winter Clothing', '(U) Oil', '(U) Supplies', '(U) Medic Kit', '(U) Soldier\'s Kit', '(U) Reliquary'];

const SOLDIER_VOCABULARY = new Map<string, string>([
  ['(U) Ammo', 'ammo'],
  ['(U) Black Shot', 'black_shot'],
  ['(L) Fine Armor', 'fine_armor'],
  ['(L) Fine Hand Weapon', 'fine_hand_weapon'],
  ['(H) Fine Heavy Armor', 'fine_heavy_armor'],
  ['(N) Fine Heavy Weapon', 'fine_heavy_weapon'],
  ['(L) Fine Repair Kit', 'fine_kit'],
  ['(L) Fine Kit', 'fine_kit'],
  ['(N) Fine Shield', 'fine_shield'],
  ['(U) Medic Kit', 'medic_kit'],
  ['(L) Memento of Home', 'memento_of_home'],
  ['(U) Musket', 'musket'],
  ['(U) Oil', 'oil'],
  ['(U) Reliquary', 'reliquary'],
  ['(U) Soldier\'s Kit', 'soldier_kit'],
  ['(U) Supplies', 'supplies'],
  ['(H) +1 Utility', 'utility_mark_1'],
  ['(N) +2 Utility', 'utility_mark_2'],
  ['(U) Winter Clothing', 'winter_clothing'],
]);


export interface IItemShortcut {
  p: string;
  a?: string;
  o?: boolean;
}

export const LOADOUT = new Map<Specialization, {
  light: IItemShortcut[],
  normal: IItemShortcut[],
  heavy: IItemShortcut[]
}>([
  [SpecialistEnum.Heavy, heavy],
  [SpecialistEnum.Medic, medic],
  [SpecialistEnum.Officer, officer],
  [SpecialistEnum.Scout, scout],
  [SpecialistEnum.Sniper, sniper],
  [LegionnaireEnum.Rookie, rookie],
  [LegionnaireEnum.Soldier, soldier],
]);

export const UTILITIES = new Map<Specialization, string[]>([
  [SpecialistEnum.Heavy, heavyUtilities],
  [SpecialistEnum.Medic, medicUtilities],
  [SpecialistEnum.Officer, officerUtilities],
  [SpecialistEnum.Scout, scoutUtilities],
  [SpecialistEnum.Sniper, sniperUtilities],
  [LegionnaireEnum.Rookie, rookieUtilities],
  [LegionnaireEnum.Soldier, soldierUtilities],
]);

export const extra = new Map<keyof IExtra, string[]>([
  ['crimson', ['(U) Crimson Shot']],
  ['chemist', ['(U) Alchemical Bandolier']],
  ['grenadier', [ '(L) Grenade', '(L) Explosive Charge']],
  ['pious', ['(L) Reliquary']],
]);

const EXTRA_VOCABULARY = new Map<string, string>([
  ['(U) Crimson Shot', 'crimson_shot'],
  ['(U) Alchemical Bandolier', 'bandolier'],
  ['(L) Grenade', 'grenade'],
  ['(L) Explosive Charge', 'explosive_charge'],
  ['(L) Reliquary', 'reliquary'],
]);

export const VOCABULARY = new Map<string, Map<string, string>>([
  [SpecialistEnum.Heavy, HEAVY_VOCABULARY],
  [SpecialistEnum.Medic, MEDIC_VOCABULARY],
  [SpecialistEnum.Officer, OFFICER_VOCABULARY],
  [SpecialistEnum.Scout, SCOUT_VOCABULARY],
  [SpecialistEnum.Sniper, SNIPER_VOCABULARY],
  [LegionnaireEnum.Rookie, ROOKIE_VOCABULARY],
  [LegionnaireEnum.Soldier, SOLDIER_VOCABULARY],
  ['extra', EXTRA_VOCABULARY]
]);


