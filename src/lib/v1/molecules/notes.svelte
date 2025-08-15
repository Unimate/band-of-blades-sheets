<script lang="ts">
  import { onMount } from 'svelte';
  import { foundryAdapter } from "src/foundry/foundry.adapter";

  type EditorOptions = any /*foundry.applications.elements.HTMLProseMirrorElement.ProseMirrorInputConfig*/;

  interface Props {
    field: string;
    content: string;
    enriched?: string | null;
    editorOptions?: EditorOptions;
    documentUuid: string;
    manageSecrets?: boolean;
    onSave?: () => void;

    [key: string]: any;
  }

  let {
    field,
    content,
    enriched = null,
    editorOptions = {},
    documentUuid,
    manageSecrets = false,
    onSave,
    ...rest
  }: Props = $props();

  let proseMirrorContainerEl: HTMLElement;

  let actualEditorOptions = $derived(
    foundry.utils.mergeObject(
      {
        name: field,
        collaborate: false,
        compact: false,
        documentUUID: documentUuid,
        editable: true,
        height: 200,
        toggled: true,
        value: content,
        enriched: enriched ?? content,
      },
      editorOptions,
    ) as EditorOptions,
  );

  function onEditorActivation(node: HTMLElement) {
    node.addEventListener('click', (ev: MouseEvent) => {
      if (
        ev.target instanceof HTMLElement &&
        ev.target.closest('[data-action="save"]')
      ) {
        handleSave();
      }
    });
    node.addEventListener('keydown', (event) => {
      if (
        game.keyboard.isModifierActive(foundry.helpers.interaction.KeyboardManager.MODIFIER_KEYS.CONTROL) &&
        event.key === 's'
      ) {
        handleSave();
      }
    });
  }

  function handleSave() {
    onSave?.();
    bindSecretUi();
  }

  function bindSecretUi() {
    if (!manageSecrets || !actualEditorOptions.toggled) {
      return;
    }

    const secret = new foundry.applications.ux.HTMLSecret({
      parentSelector: `prose-mirror`,
      callbacks: {
        content: (_secret: HTMLElement) => content,
        update: (secret: HTMLElement, content: string) => {
          secret.closest<HTMLElement & { value: string }>(
            'prose-mirror',
          )!.value = content;
        },
      },
    });

    queueMicrotask(() => {
      secret.bind(proseMirrorContainerEl);
    });
  }

  // Create Editor element and put it in the contents element.
  onMount(() => {
    const element =
      foundry.applications.elements.HTMLProseMirrorElement.create(
        actualEditorOptions,
      );

    proseMirrorContainerEl.innerHTML = element.outerHTML;

    proseMirrorContainerEl.firstChild?.addEventListener(
      'plugins',
      (event: any) => {
        event.detail['highlightDocumentMatches'] =
          ProseMirror.ProseMirrorHighlightMatchesPlugin.build(
            ProseMirror.defaultSchema,
          );
      },
    );

    bindSecretUi();
  });
</script>

<div class="wrapper">
  <div class="header">{foundryAdapter.localize('notes')}</div>
  <div class="holder" bind:this={proseMirrorContainerEl} use:onEditorActivation></div>
</div>

<style lang="scss">
  .wrapper {
    display: grid;
    grid-template-rows: auto 1fr;
    gap: 0.5rem;
    height: 100%;
    padding: 0.125rem 1rem 1rem;
    background-color: var(--band-of-blades-sheets-background-primary-color);
    z-index: 1;
  }

  .header {
    font-size: 1.25rem;
    font-family: var(--band-of-blades-sheets-font-vinque), Arial, sans-serif;

    color: var(--band-of-blades-sheets-font-primary-color);
  }

  .holder {
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    border: 1px solid var(--band-of-blades-sheets-border-tertiary-color);

    prose-mirror {
      flex: 1;
    }
  }
</style>
