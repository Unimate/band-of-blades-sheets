declare global {
  var $: any;
  var canvas: any;
  var ActiveEffect: any;
  var Actor: any;
  var ActorSheet: any;
  var Actors: any;
  var Application: any;
  var AudioHelper: any;
  var ChatMessage: any;
  var CONST: any;
  var DefaultSheetsConfig: any;
  var debounce: any;
  var Folder: any;
  var foundry: {
    applications: {
      api: any;
      apps: any;
      elements: any;
      handlebars: any;
      sheets: any;
      ui: any;
      ux: {
        DragDrop: {
          new (config: DragDropConfiguration): DragDrop;
          implementation: DragDrop;
        };
      } & Record<string, any>;
    };
  } & Record<string, any>;
  var fromUuid: any;
  var fromUuidSync: any;
  var game: any;
  var getDocumentClass: (className: string) => any;
  var Hooks: any;
  var ImagePopout: any;
  var Item: any;
  var Items: any;
  var ModuleManagement: any;
  var ProseMirror: any;
  var renderTemplate: any;
  var Roll: any;
  var TokenDocument: any;
  var ui: any;

  interface ArrayConstructor {
    fromRange: (n: number, min?: number) => number[];
  }

  interface Math {
    clamp: (num: number, min: number, max: number) => number;
  }

  interface NumberConstructor {
    isNumeric: (n: any) => n is number;
  }

  interface DragDropConfiguration {
    dragSelector?: string | null;
    dropSelector?: string | null;
    permissions?: Record<string, Function>;
    callbacks?: Record<string, Function>;
  }

  interface DragDrop {
    dragSelector: string;
    dropSelector: string;
    permissions: {
      dragstart?: (selector: string) => boolean;
      drop?: (selector: string) => boolean;
    };
    callbacks: {
      dragstart?: (event: DragEvent) => void;
      dragover?: (event: DragEvent) => void;
      drop?: (event: DragEvent) => void;
    };

    bind(html: HTMLElement): this;
    callback(event: DragEvent, action: string): void;
    can(action: string, selector: string): boolean;
    dropEffect: 'copy' | 'move' | 'link' | 'none';
    getPayload: (event: DragEvent) => object;
    createDragImage(
      img: HTMLImageElement,
      width: number,
      height: number
    ): HTMLElement;
  }
}

export {};
