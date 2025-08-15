import { CONSTANTS } from "../constants";
import { mount } from "svelte";
import RollDialog from "../lib/v1/dialogs/roll.dialog.svelte";
import EngagementsDialog from '../lib/v1/dialogs/engagements.dialog.svelte'
import { CoarseReactivityProvider } from "../utils/reactivity/reactivity.svelte";
import { type IActor, type ISkill, type ISkills, SkillCategoryLabel, SkillLabel } from "../types/actor.type";
import { calculateBonuses, calculateResult, calculateSavingThrowDices } from "../mappers/actor.mapper";
import type { IRole } from "../types/roles.type";
import { calculateMarshalBonuses } from "../mappers/role.mapper";
import actor from "../lib/v1/organisms/actor/organisms/actor.svelte";

export class BandOfBladesSheetsRollDialog extends foundry.applications.api.DialogV2 {
  #actor: IActor;
  #type: 'saving-throw' | 'skill-check' = 'skill-check';
  #dices: { basic: number; bonus: number } = { basic: 0, bonus: 0 };
  #attribute: ISkills | ISkill;

  constructor(param: { actor: IActor, attribute: ISkills | ISkill }) {
    super();
    this.#actor = param.actor;
    this.#attribute = param.attribute;

    if (Object.values(SkillCategoryLabel).includes(param.attribute.label as SkillCategoryLabel)) {
      this.#dices = calculateSavingThrowDices(param.attribute as ISkills);
      this.#type = 'saving-throw';
    } else if (Object.values(SkillLabel).includes(param.attribute.label as SkillLabel)) {
      this.#dices = { basic: (param.attribute as ISkill).value, bonus: 0 };
      this.#type = 'skill-check';
    }
  }

  components: Record<string, any>[] = [];
  #context = new CoarseReactivityProvider<any>(undefined);

  static DEFAULT_OPTIONS = {
    classes: [CONSTANTS.MODULE.ID, 'sheet', 'roll-dialog'],
    window: {
      resizable: false,
      positioned: true,
      frame: true,
    },
    position: {
      width: 410,
    },
    buttons: BandOfBladesSheetsRollDialog.buttons()
  }

  _onRender(context: any, options: any) {
    super._onRender(context, options);
  }

  async _prepareContext(options = {}) {
    const documentContext = await super._prepareContext(options);
    return {
      dices: this.#dices,
      attribute: this.#attribute,
      bonuses: calculateBonuses(this.#actor, this.#attribute),
      actions: this.createActions(),
      ...documentContext
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

  _createComponent(node: HTMLElement, context: any): Record<string, any> {
    return mount(RollDialog, {
      target: this.element,
      context: new Map<string, any>([
        [CONSTANTS.SVELTE_CONTEXT.DIALOG, context],
      ])
    });
  }

  createActions() {
    return {
      confirm: async (total: number, position: string, effect: string) => {
        const result = await calculateResult(total);
        let template;

        if (this.#type === 'saving-throw') {
          template = await foundry.applications.handlebars.renderTemplate('modules/band-of-blades-sheets/templates/saving-throw.message.hbs', {
            attribute: this.#attribute,
            result: { ...result, dice: 6 - result.dice },
          });
        }

        if (this.#type === 'skill-check') {
          template = await foundry.applications.handlebars.renderTemplate('modules/band-of-blades-sheets/templates/skill-check.message.hbs', {
            attribute: this.#attribute,
            result: { ...result, position, effect },
          });
        }

        if (template !== undefined) {
          await ChatMessage.create({ user: game.user, content: template, rolls: [result.roll] });
        }

        this.close();
      }
    }
  }

  static buttons() {
    return [{
      action: "all",
      label: "Roll",
    }]
  }
}

export class BandOfBladesSheetsEngagementsDialog extends foundry.applications.api.DialogV2 {
  #role: IRole;
  #dices: { basic: number; bonus: number } = { basic: 0, bonus: 0 };

  constructor(param: { role: IRole }) {
    super();
    this.#role = param.role;
  }

  components: Record<string, any>[] = [];
  #context = new CoarseReactivityProvider<any>(undefined);

  static DEFAULT_OPTIONS = {
    classes: [CONSTANTS.MODULE.ID, 'sheet', 'engagement-dialog'],
    window: {
      resizable: false,
      positioned: true,
      frame: true,
    },
    position: {
      width: 500,
    },
    buttons: BandOfBladesSheetsRollDialog.buttons()
  }

  _onRender(context: any, options: any) {
    super._onRender(context, options);
  }

  async _prepareContext(options = {}) {
    const documentContext = await super._prepareContext(options);
    return {
      dices: this.#dices,
      bonuses: calculateMarshalBonuses(),
      actions: this.createActions(),
      ...documentContext
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

  _createComponent(node: HTMLElement, context: any): Record<string, any> {
    return mount(EngagementsDialog, {
      target: this.element,
      context: new Map<string, any>([
        [CONSTANTS.SVELTE_CONTEXT.DIALOG, context],
      ])
    });
  }

  createActions() {
    return {
      confirm: async (total: number) => {
        const result = await calculateResult(total);
        let template;

        console.log(result);

        // if (this.#type === 'saving-throw') {
        //   template = await foundry.applications.handlebars.renderTemplate('modules/band-of-blades-sheets/templates/saving-throw.message.hbs', {
        //     attribute: this.#attribute,
        //     result: { ...result, dice: 6 - result.dice },
        //   });
        // }
        //
        // if (this.#type === 'skill-check') {
        //   template = await foundry.applications.handlebars.renderTemplate('modules/band-of-blades-sheets/templates/skill-check.message.hbs', {
        //     attribute: this.#attribute,
        //     result: { ...result, position, effect },
        //   });
        // }
        //
        // if (template !== undefined) {
        //   await ChatMessage.create({ user: game.user, content: template, rolls: [result.roll] });
        // }

        this.close();
      }
    }
  }

  static buttons() {
    return [{
      action: "all",
      label: "Roll",
    }]
  }
}