import { BandOfBladesSheetsActor } from './foundry/actor.renderer';
import '../public/fonts/rpg-awesome/style/rpg-awesome.min.css';

Hooks.once('init', () => {
  const documentSheetConfig = foundry.applications.apps.DocumentSheetConfig;

  documentSheetConfig.registerSheet(Actor, 'band-of-blades', BandOfBladesSheetsActor);
})

Hooks.once('ready', () => { });
