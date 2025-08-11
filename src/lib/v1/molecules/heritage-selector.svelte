<script lang="ts">
  import { foundryAdapter } from "src/foundry/foundry.adapter";
  import {
    BartanTraitEnum,
    type Heritage,
    HeritageEnum,
    OriteTraitEnum,
    PanyarTraitEnum,
    type Trait,
    ZemyatiTraitEnum,
  } from "src/types/actor.type";

  let { heritage, traits, limit = 2, isOpen = $bindable(false), onconfirm, oncancel } = $props();


  let selectedHeritage: Heritage = $state(null);
  let selectedTraits: Trait[] = $state([]);


  const heritages = [
    { name: HeritageEnum.Bartans, traits: Object.values(BartanTraitEnum) },
    { name: HeritageEnum.Orites, traits: Object.values(OriteTraitEnum) },
    { name: HeritageEnum.Panyar, traits: Object.values(PanyarTraitEnum) },
    { name: HeritageEnum.Zemyati, traits: Object.values(ZemyatiTraitEnum) },
  ];

  $effect(() => {
    if (isOpen) {
      selectedTraits = [...traits];
      selectedHeritage = heritage;
    }
  });

  const selectHeritageAndTrait = (heritage: HeritageEnum, trait: Trait) => {
    if (selectedTraits.includes(trait)) {
      selectedTraits = selectedTraits.filter((t: Trait) => t !== trait);
    } else {
      selectedTraits.push(trait);
    }

    if (selectedTraits.length > 0) {
      selectedHeritage = heritage;
    } else {
      selectedHeritage = null;
    }
  }

  const handleConfirm = () => {
    onconfirm?.(selectedHeritage, selectedTraits);
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
        <div class="modal-title">{foundryAdapter.localize('select.traits')} ({selectedTraits.length} / {limit})</div>
        <button class="close-button" onclick={handleCancel}>×</button>
      </div>

      <div class="modal-body">
        <div class="items-list">
          {#each heritages as heritage}
            <div class="group-header">{foundryAdapter.localize(`heritage.${heritage.name}.name`)}</div>
            {#each heritage.traits as trait, index}
              <div class="item">
                <input
                    type="checkbox"
                    hidden
                    disabled={selectedHeritage !== null && heritage.name !== selectedHeritage}
                    checked={selectedTraits.includes(trait)}
                    id={'item-' + trait + '-' + index}
                    onclick={() => selectHeritageAndTrait(heritage.name, trait)}
                    value={trait}
                />
                <label for={'item-' + trait + '-' + index}>
                  <span>
                    <span class="item-name">{foundryAdapter.localize(`heritage.${heritage.name}.traits.${trait}.name`)}</span>
                    <span class="item-description">{@html foundryAdapter.localize(`heritage.${heritage.name}.traits.${trait}.description`)}</span>
                  </span>
                </label>
              </div>
            {/each}
          {/each}
        </div>
      </div>

      <div class="modal-footer">
        <button class="button button--secondary" onclick={handleCancel}>
          {foundryAdapter.localize('cancel')}
        </button>
        <button class="button" onclick={handleConfirm} disabled={selectedTraits.length > limit}>
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

  .group-header {
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

  .item {
    display: flex;

    .item-name {
      font-size: 1rem;
      font-weight: bold;
    }

    .item-description {
      font-size: 0.875rem;
    }

    input[type="checkbox"]:checked + label {
      &:before {
        background-color: var(--band-of-blades-sheets-primary-highlight-color);
      }
    }

    input[type="checkbox"]:disabled + label {
      &:before {
        background-color: var(--band-of-blades-sheets-background-tertiary-color);
      }
      opacity: 0.5;
    }

    label {
      cursor: pointer;
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
      gap: 0.25rem;

      font-size: 1rem;
      color: var(--band-of-blades-sheets-font-primary-color);

      &:before {
        content: '';
        border: 2px solid var(--band-of-blades-sheets-border-primary-color);
        position: relative;
        display: flex;
        width: 12px;
        height: 12px;
        margin-top: 3px;
      }
    }
  }
</style>