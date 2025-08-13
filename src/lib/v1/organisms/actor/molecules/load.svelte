<script lang="ts">
  import Item from "../atoms/item.svelte";
  import { foundryAdapter } from "src/foundry/foundry.adapter";
  import { getActorSheetContext } from "src/lib/v1/organisms/actor/actor.context";
  import type { IActor } from "src/types/actor.type";
  import type { IActions } from "src/types/actions.type";
  import type { ILoadItem } from "src/types/loadout.type";

  const { callSelect, limit } = $props();

  let context = $derived(getActorSheetContext() as IActor & IActions);

  const load = $derived(
    context.load.selected.reduce((counter: number, item: ILoadItem) => counter + item.usesLoadSlot, 0)
  );

  const handleLoad = async (load: 'Light' | 'Normal' | 'Heavy') => {
    await context.actions.updateLoad(load);
  }
</script>

<div class="wrapper">
  <div class="control-panel">
    <button class="load-title load-title-button" onclick={() => callSelect()}>{foundryAdapter.localize('load.title')}</button>
    <p class="load-description">({load} / {limit}) {foundryAdapter.localize('load.utility')}</p>
    <div class="load-selector">
      <input
        type="radio"
        hidden
        id={context._id + '-light'}
        name="load"
        value="light"
        onclick={() => handleLoad('Light')}
        checked={context.load.type === 'Light'}
      />
      <label for={context._id + '-light'}>{foundryAdapter.localize('load.light')}</label>
      <input
        type="radio"
        hidden
        id={context._id + '-normal'}
        name="load"
        value="normal"
        onclick={() => handleLoad('Normal')}
        checked={context.load.type === 'Normal'}/>
      <label for={context._id + '-normal'}>{foundryAdapter.localize('load.normal')}</label>
      <input
        type="radio"
        hidden
        id={context._id + '-heavy'}
        name="load"
        value="heavy"
        onclick={() => handleLoad('Heavy')}
        checked={context.load.type === 'Heavy'}
      />
      <label for={context._id + '-heavy'}>{foundryAdapter.localize('load.heavy')}</label>
    </div>
  </div>

  <div class="items-list">
    {#each context.load.items as item, index}
      <Item item={item} index={index} />
    {/each}
    {#each context.load.selected as item, index}
      <Item item={item} index={index} />
    {/each}
  </div>
</div>

<style>
  .control-panel {
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 0.5rem;

    font-size: 0.85rem;
    color: var(--band-of-blades-sheets-font-secondary-color);
    background-color: var(--band-of-blades-sheets-background-secondary-color);
  }

  .load-description,
  .load-title {
    margin: 0;
    padding: 0 0 0.125rem;
    font-size: 1rem;
    font-weight: normal;
    font-family: var(--band-of-blades-sheets-font-vinque), Arial, sans-serif;
    color: var(--band-of-blades-sheets-font-secondary-color);
  }

  .load-title-button {
    outline: none;
    border: none;
    box-shadow: none;
    &:hover {
      background-color: transparent;
      color: var(--band-of-blades-sheets-primary-highlight-color);
    }
  }

  .load-description {
    font-size: 1rem;
  }

  .load-selector {
    font-size: 1rem;

    input[type='radio']:checked + label {
      color: var(--band-of-blades-sheets-primary-highlight-color);
    }

    label {
      cursor: pointer;
      color: var(--band-of-blades-sheets-font-secondary-color);
      font-family: var(--band-of-blades-sheets-font-vinque), Arial, sans-serif;

      transition: color 75ms ease-in-out;
      padding: 0 0.25rem 0.125rem;
      &:hover {
        color: var(--band-of-blades-sheets-primary-highlight-color);
      }
    }
  }

  .items-list {
    display: grid;
    padding: 0.5rem 0;
  }
</style>