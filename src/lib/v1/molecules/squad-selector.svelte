<script lang="ts">
  import { foundryAdapter } from "src/foundry/foundry.adapter";
  import { type IActor } from "src/types/actor.type";
  import { getActorSheetContext } from "src/lib/v1/actor/actor.context";
  import type { IActions } from "src/types/actions.type";
  import type { IDictionary, ISquads } from "src/types/dictionaries.type";

  let { squad, isOpen = $bindable(false), onconfirm, oncancel } = $props();

  let context = $derived(getActorSheetContext() as IActor & IActions & IDictionary);

  let options: ISquads[] = $state([]);
  let selected: string = $state('');

  $effect(() => {
    if (isOpen) {
      selected = squad.name || '';
      options = context.dictionaries.squads;
    }
  })

  const handleConfirm = () => {
    onconfirm?.(selected);
    closeModal();
  }

  const handleCancel = () => {
    oncancel?.();
    closeModal();
  }

  const closeModal = () => {
    isOpen = false;
  }
</script>

{#if isOpen}
  <div class="modal-backdrop">
    <div class="modal-content">
      <div class="modal-header">
        <div class="modal-title">{foundryAdapter.localize('select.squad')}</div>
        <button class="close-button" onclick={handleCancel}>×</button>
      </div>

      <div class="modal-body">
        <div class="items-list">
          {#each options as option}
            <label class="item">
              <input type="radio" hidden name='squad' value={option.name} bind:group={selected} />
              <div class="item-title">
                <span class="item-icon">
                  <img src={option.image} alt="specialization name"/>
                </span>
                {
                  foundryAdapter.hasLocale(`origin_squads.${option.name}.name`)
                    ? foundryAdapter.localize(`origin_squads.${option.name}.name`)
                    : option.name
                }

              </div>
              <div class="item-description">
                <div class="item-advancement">
                  {
                    foundryAdapter.hasLocale(`origin_squads.${option.name}.description`)
                      ? foundryAdapter.localize(`origin_squads.${option.name}.description`)
                      : option.description
                  }
                </div>
              </div>
            </label>
          {/each}
        </div>
      </div>

      <div class="modal-footer">
        <button class="button button--secondary" onclick={handleCancel}>
          {foundryAdapter.localize('cancel')}
        </button>
        <button class="button" onclick={handleConfirm} disabled={selected === null}>
          {foundryAdapter.localize('confirm')}
        </button>
      </div>
    </div>
  </div>

{/if}

<style>
  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: oklch(from var(--band-of-blades-sheets-background-secondary-color) l c h / calc(alpha - 0.5));
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }

  .modal-content {
    background: var(--band-of-blades-sheets-background-primary-color);
    border-radius: 8px;
    box-shadow: 0 10px 25px oklch(from var(--band-of-blades-sheets-background-secondary-color) l c h / calc(alpha - 0.8));;
    max-width: 650px;
    width: 90%;
    max-height: 80vh;
    display: flex;
    flex-direction: column;
  }

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.25rem 1.5rem 1rem;
    border-bottom: 1px solid var(--band-of-blades-sheets-border-secondary-color);

    .modal-title {
      margin: 0;
      padding: 0 0 0.125rem;
      font-size: 1.5rem;
      font-weight: normal;
      font-family: var(--band-of-blades-sheets-font-vinque), Arial, sans-serif;
      color: var(--band-of-blades-sheets-font-primary-color);
    }
  }

  .modal-footer {
    padding: 20px;
    border-top: 1px solid var(--band-of-blades-sheets-border-secondary-color);
    display: flex;
    gap: 12px;
    justify-content: flex-end;
  }

  .close-button {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: var(--band-of-blades-sheets-font-tertiary-color);
    padding: 0;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
  }

  .close-button:hover {
    background-color: oklch(from var(--band-of-blades-sheets-font-tertiary-color) l c h / calc(alpha - 0.8));
  }

  .modal-body {
    flex: 1;
    overflow-y: auto;
    padding: 1.25rem 1.5rem;
  }

  .items-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    overflow: hidden;
  }

  .item {
    display: grid;

    .item-title {
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 0.5rem;

      padding: 0.5rem;
      background-color: var(--band-of-blades-sheets-background-secondary-color);

      color: var(--band-of-blades-sheets-font-secondary-color);
      font-family: var(--band-of-blades-sheets-font-vinque), Arial, sans-serif;
      font-size: 1.5rem;

      border-radius: 4px 4px 0 0;
    }

    .item-description {
      border: 1px solid var(--band-of-blades-sheets-border-tertiary-color);
      border-radius: 0 0 4px 4px;

      color: var(--band-of-blades-sheets-font-primary-color);

      padding: 0.25rem 0.5rem;
    }

    .item-icon {
      position: relative;
      width: 1.5rem;
      height: 1.5rem;
      border-radius: 4px;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }

    input[type="radio"]:checked + .item-title {
      color: var(--band-of-blades-sheets-primary-highlight-color);
    }
  }
</style>