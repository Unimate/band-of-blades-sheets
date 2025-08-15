import { mount, unmount } from "svelte";
import RoleSheet from '../lib/v1/organisms/role/root.svelte';
import { CoarseReactivityProvider } from "../utils/reactivity/reactivity.svelte";
import { CONSTANTS } from "../constants";
import { mapMarshal, mapRole } from "../mappers/role.mapper";
import { REMAPPED_SQUADS } from "../dictionaries/squads";
import { foundryAdapter } from "./foundry.adapter";
import { RoleSpecialization } from "../types/roles.type";
import { BandOfBladesSheetsEngagementsDialog } from "./dialog.renderer";


export class BandOfBladesSheetsRole extends foundry.applications.sheets.ActorSheetV2 {
  components: Record<string, any>[] = [];
  #context = new CoarseReactivityProvider<any>(undefined);

  get title() {
    return this.actor.name;
  }

  #actions = {
    staffTheSquad: async (name: string, staff: number) => {
      const squad = REMAPPED_SQUADS.get(name) ?? name;
      let folder = game.folders.find((folder: any) => folder.name === squad);
      if (folder === undefined) {
        folder = await Folder.create({ name: squad, type: 'Actor' })
      }

      const squads = await foundryAdapter.requestItemsFromCompendium(CONSTANTS.PACKS.SQUAD);
      const specializations = await foundryAdapter.requestItemsFromCompendium(CONSTANTS.PACKS.SPECIALIZATION);

      const specializationItem = specializations.find((s) => s.name === 'Rookie');
      const squadItem = squads.find((s) => s.name === squad);

      const newcommers = [];

      for (let i = 0; i < staff; i++) {
        const actor = {
          name: `${squad} #${i + 1}`,
          type: "character",
          folder: folder,
          system: {
            class: 'Rookie',
            squad: squad,
            "attributes.prowess.skills.maneuver.value": "1",
            "attributes.prowess.skills.skirmish.value": "1",
            "attributes.resolve.skills.consort.value": "1"
          },
          items: []
        }
        newcommers.push(actor);
      }
      const legionnaires = await CONFIG.Actor.documentClass.create(newcommers);

      legionnaires.forEach((legionnaire: any) => {
        legionnaire.createEmbeddedDocuments('Item', [specializationItem, squadItem]);
      });
      this.render();
    },
    openActorPage: async (_id: string) => {
      const actor = game.actors.get(_id);
      if (actor !== undefined) {
        actor.sheet.render(true);
      }
    },
    updateName: async (name: string) => {
      this.actor.update({ name });
    },
    updateMorale: async (value: number) => {
      await this.actor.update({ 'system.morale': value });
    },
    editNotes: async () => {
      this.actor.sheet.submit();
    },
    rollEngagements: async () => {
      new BandOfBladesSheetsEngagementsDialog({
        role: this.#context.data,
      }).render(true);
    },
  }

  static DEFAULT_OPTIONS = {
    classes: ['sheet', 'role', CONSTANTS.MODULE.ID],
    window: {
      resizable: false,
      positioned: true,
      frame: true,
    },
    position: {
      width: 750,
      height: 800,
    },
    submitOnClose: true,
  }

  _onRender(context: any, options: any) {
    super._onRender(context, options);
  }

  async _prepareContext(options = {}) {
    const documentContext = await super._prepareContext(options);

    const role = mapRole(this.actor);
    let specialization = {};
    if (role.character.specialization !== null) {
      switch (role.character.specialization) {
        case RoleSpecialization.Marshal: {
          specialization = await mapMarshal(this.actor);
          break;
        }
      }
    }

    return {
      ...role,
      ...specialization,
      actions: this.createActions(),
      ...documentContext,
    };
  }

  _renderHTML(context: any, options: any = {}) {
    this.#context.data = context;
    if (options.isFirstRender) {
      const content = this.windowContent;
      this.components.push(this._createComponent(content, this.#context));
    }
    return { context, customContents: [] }
  }

  _replaceHTML() {
  }

  async _onDrop(event: any) {
    event.preventDefault();

    let data;
    try {
      data = JSON.parse(event.dataTransfer.getData('text/plain'));
    } catch (err) {
      return false;
    }
  }

  _tearDown(options = {}) {
    this.components.forEach((c) => unmount(c));
    this.components = [];

    super._tearDown(options);
  }

  _createComponent(node: HTMLElement, context: any): Record<string, any> {
    return mount(RoleSheet, {
      target: this.element,
      context: new Map<string, any>([
        [CONSTANTS.SVELTE_CONTEXT.CONTEXT, context],
      ])
    });
  }

  async #refreshItems(toCreate: any[], toDelete: any[] = []): Promise<void> {
    if (toDelete.length > 0) {
      await this.actor.deleteEmbeddedDocuments('Item', toDelete);
    }
    await this.actor.createEmbeddedDocuments('Item', toCreate);
  }

  createActions() {
    return this.#actions;
  }
}