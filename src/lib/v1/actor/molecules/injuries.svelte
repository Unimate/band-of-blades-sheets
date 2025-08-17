<script lang="ts">
  import Indicators from '../atoms/indicators.svelte';
  import { foundryAdapter } from 'src/foundry/foundry.adapter';
  import { getActorSheetContext } from "src/lib/v1/actor/actor.context";
  import { Condition, type IActor, Trauma } from "src/types/actor.type";
  import type { IActions } from "src/types/actions.type";

  let context = $derived(getActorSheetContext() as IActor & IActions);

  const trauma = Object.values(Trauma);
  const condition = Object.values(Condition);

  const handleInjuriesItem = (type: 'stress' | 'corruption', update: number): void => {
    context.actions.updateInjury(type, update);
  }

  const handleConditionsItem = (type: 'trauma' | 'blight', update: Trauma | Condition): void => {
    context.actions.updateCondition(type, update);
  }
</script>

<div class="wrapper">
  <div class="stress-area">
    <div class="stress-container">
      <span class="stress-header">{foundryAdapter.localize('stress')}</span>
      <Indicators
        onClick={value => handleInjuriesItem('stress', value)}
        label="stress"
        limit={context.injuries.injuries.stress.max}
        total={10}
        current={context.injuries.injuries.stress.current}
      />
    </div>

    <div class="trauma-container">
      <Indicators
        label="trauma"
        limit={context.injuries.conditions.trauma.max}
        total={4}
        version="secondary"
        current={context.injuries.conditions.trauma.types.length}
      />
      <span class="trauma-header">{foundryAdapter.localize('trauma')}</span>
    </div>

    <div class="trauma-type-container">
      <span class="trauma-type-header">{foundryAdapter.localize('trauma:')}</span>

      <div class="trauma-types">
        {#each trauma as item}
          <label class="trauma-type-selector">
            <input
              type="checkbox"
              hidden
              value={item}
              checked={context.injuries.conditions.trauma.types.includes(item)}
              onclick={() => handleConditionsItem("trauma", item)}
            >
            <span class="trauma-type">{foundryAdapter.localize(item)}</span>
          </label>
        {/each}
      </div>
    </div>
  </div>

  <div class="stress-area">
    <div class="stress-container">
      <span class="stress-header">{foundryAdapter.localize('corruption')}</span>
      <Indicators
        onClick={value => handleInjuriesItem('corruption', value)}
        label="corruption"
        total={context.injuries.injuries.corruption.max}
        current={context.injuries.injuries.corruption.current}
      />
    </div>

    <div class="trauma-container">
      <Indicators
          label="blight"
          total={context.injuries.conditions.blight.max}
          version="secondary"
          current={context.injuries.conditions.blight.types.length}
      />
      <span class="trauma-header">{foundryAdapter.localize('blight')}</span>
    </div>

    <div class="trauma-type-container">
      <span class="trauma-type-header">{foundryAdapter.localize('conditions:')}</span>
      <div class="trauma-types">
        {#each condition as item}
          <label class="trauma-type-selector">
            <input
              type="checkbox"
              hidden
              value={item}
              checked={context.injuries.conditions.blight.types.includes(item)}
              onclick={() => handleConditionsItem("blight", item)}
            >
            <span class="trauma-type">{foundryAdapter.localize(item)}</span>
          </label>
        {/each}
      </div>
    </div>
  </div>

</div>

<style lang="scss">
  .wrapper {
    display: grid;
    gap: 0.5rem;
  }

  span {
    margin: 0;
  }

  .stress-area {
    display: grid;
    grid-template-columns: 1.5fr 1fr;
  }

  .trauma-container,
  .stress-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    height: 32px;

    padding: 0 0.5rem;
  }

  .stress-container {
    background-color: var(--band-of-blades-sheets-background-tertiary-color);
    color: var(--band-of-blades-sheets-font-primary-color);
  }

  .trauma-container {
    background-color: var(--band-of-blades-sheets-background-secondary-color);
    color: var(--band-of-blades-sheets-font-secondary-color);
  }

  .stress-header {
    color: var(--band-of-blades-sheets-font-primary-color);
  }

  .trauma-header {
    color: var(--band-of-blades-sheets-font-secondary-color);
  }

  .trauma-header,
  .stress-header {
    font-size: 1.25rem;
    font-family: var(--band-of-blades-sheets-font-vinque), Arial, sans-serif;
    padding-bottom: 4px;
  }

  .trauma-type-container {
    grid-column: 1 / 3;
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    color: var(--band-of-blades-sheets-font-primary-color);
  }

  .trauma-type-header {
    font-size: 1rem;
  }

  .trauma-types {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.25rem;
  }

  .trauma-type-selector {
    cursor: pointer;

    input[type="checkbox"]:checked + .trauma-type {
      font-weight: bold;
    }

    .trauma-type {
      line-height: 1.75;
      font-size: 0.875rem;
      transition: font-weight 75ms ease;
    }
  }

</style>