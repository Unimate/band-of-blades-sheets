<script lang="ts">
  import Item from '../organisms/actor/atoms/item.svelte';
  import { foundryAdapter } from "src/foundry/foundry.adapter";
  import { type ILoadItem } from "src/types/loadout.type";

  let { items = [], isOpen = $bindable(false), selected,  onconfirm, oncancel, limit } = $props();

  let selectedIndexes: number[] = $state([]);

  const count = $derived(
    selectedIndexes.reduce((counter: number, index: number) => counter + items[index].usesLoadSlot, 0)
  );
  const isOverLimit = $derived(limit > 0 && count > limit);
  const canConfirm = $derived(!isOverLimit);

  $effect(() => {
    if (isOpen) {
      const selectedFlat = selected.map((s: ILoadItem) => s.primary.label);
      const selectableFlat = items.map((s: ILoadItem) => s.primary.label);

      selectedIndexes = findMatchingIndexes(selectedFlat, selectableFlat);
    }
  })

   const handleConfirm = () => {
    onconfirm?.(selectedIndexes.map((index) => items[index]));
    closeModal();
  }

  const handleCancel = () => {
    oncancel?.();
    closeModal();
  }

  const closeModal = () => {
    isOpen = false;
    selectedIndexes = [];
  }

  const toggleSelection = (index: number) => {
     if (selectedIndexes.includes(index)) {
       selectedIndexes = selectedIndexes.filter((i) => i !== index);
     } else {
       selectedIndexes.push(index);
     }
  }

  const findMatchingIndexes = (a: string[], b: string[]) => {
    const counts: Record<string, number> = {};
    const result = [];

    for (const str of a) {
      counts[str] = (counts[str] || 0) + 1;
    }

    for (let i = 0; i < b.length; i++) {
      const str = b[i];
      if (counts[str] > 0) {
        result.push(i);
        counts[str]--;
      }
    }

    return result;
  }
</script>

{#if isOpen}
  <div class="modal-backdrop">
    <div class="modal-content">
      <div class="modal-header">
        <div class="modal-title">{foundryAdapter.localize('select.items')} ({count}/{limit})</div>
        <button class="close-button" onclick={handleCancel}>×</button>
      </div>

      <div class="modal-body">
        <div class="items-list">
          {#each items as item, index}
            <div class="item">
              <input
                type="checkbox"
                hidden
                checked={selectedIndexes.includes(index)}
                id={'item-' + index}
                onclick={() => toggleSelection(index)}
              />
              <label for={'item-' + index}>
                <Item item={item} selection={true} index={index} />
              </label>
            </div>
          {/each}
        </div>
      </div>

      <div class="modal-footer">
        <button class="button button--secondary" onclick={handleCancel}>
          {foundryAdapter.localize('cancel')}
        </button>
        <button
          class="button"
          onclick={handleConfirm}
          disabled={!canConfirm}
        >
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
    max-width: 500px;
    width: 90%;
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
    display: flex;

    input[type="checkbox"]:checked + label {
      &:before {
        background-color: var(--band-of-blades-sheets-primary-highlight-color);
      }
    }

    label {
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 0.25rem;

      &:before {
        content: '';
        border: 2px solid var(--band-of-blades-sheets-border-primary-color);
        position: relative;
        display: flex;
        width: 12px;
        height: 12px;

      }
    }
  }
</style>