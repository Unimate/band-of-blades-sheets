import { BandOfBladesSheetsActor } from './foundry/actor.renderer';
import { BandOfBladesSheetsRole } from "./foundry/role.renderer";
import '../public/fonts/rpg-awesome/style/rpg-awesome.min.css';

Hooks.once('init', () => {
  const documentSheetConfig = foundry.applications.apps.DocumentSheetConfig;

  documentSheetConfig.registerSheet(Actor, 'band-of-blades', BandOfBladesSheetsActor, {
    label: 'Band of Blades Sheets (Actor)',
    types: ['character'],
  });
  documentSheetConfig.registerSheet(Actor, 'band-of-blades', BandOfBladesSheetsRole, {
    label: 'Band of Blades Sheets (Role)',
    types: ['role'],
  });
})

Hooks.once('ready', () => { });
