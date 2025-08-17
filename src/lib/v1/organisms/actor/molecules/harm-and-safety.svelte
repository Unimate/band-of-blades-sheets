<script lang="ts">
  import Indicators from "../../../atoms/indicators.svelte";
  import { foundryAdapter } from "src/foundry/foundry.adapter";
  import { getActorSheetContext } from "src/lib/v1/organisms/actor/actor.context";
  import type { IActor, ISafety } from "src/types/actor.type";
  import type { IActions } from "src/types/actions.type";

  let context = $derived(getActorSheetContext() as IActor & IActions);

  const confirmItemsSelection = (safety: keyof ISafety) => {
    context.actions.updateSafety(safety);
  }

  const changeHealingSteps = (type: 'heavy' | 'medium' | 'light', step: number) => {
    context.actions.updateHealingSteps(type, step);
  }

  const changeHarmReason = (type: 'deadly' | 'heavy' | 'medium' | 'light', index: number, event: FocusEvent) => {
    const value = (event.target as HTMLInputElement).value;
    context.actions.updateHarmReason(type, index, value);
  }

</script>

<div class="wrapper">
  <div class="harm-container">
    <h5 class="harm-title">{foundryAdapter.localize('harm')}</h5>

    <div class="harm-table">
      <div class="harm-row">
        <div class="harm-level">4</div>
        <div class="harm-descriptions">
          {#each {length: context.harm.deadly.harmsLimit} as reason, i}
            <input
                type="text"
                class="harm-input"
                value={context.harm.deadly.descriptions[i]}
                onblur={(e) => changeHarmReason('deadly', i, e)}
            >
          {/each}
        </div>
        <div class="harm-penalty">{foundryAdapter.localize('death')}</div>
      </div>

      <div class="harm-row">
        <div class="harm-level">3</div>
        <div class="harm-descriptions">
          <Indicators
              id={context._id}
              className="harm-indicator"
              onClick={value => changeHealingSteps('heavy', value)}
              label="injuries-3"
              total={context.harm.heavy.healingSteps}
              current={context.harm.heavy.currentHeal}
          />
          {#each {length: context.harm.heavy.harmsLimit} as reason, i}
            <input
              type="text"
              class="harm-input"
              value={context.harm.heavy.descriptions[i]}
              onblur={(e) => changeHarmReason('heavy', i, e)}
            >
          {/each}
        </div>
        <div class="harm-penalty">{foundryAdapter.localize('need_help')}</div>
      </div>

      <div class="harm-row">
        <div class="harm-level">2</div>
        <div class="harm-descriptions">
          <Indicators
            id={context._id}
            className="harm-indicator"
            onClick={value => changeHealingSteps('medium', value)}
            label="injuries-2"
            total={context.harm.medium.healingSteps}
            current={context.harm.medium.currentHeal}
          />
          {#each {length: context.harm.medium.harmsLimit} as reason, i}
            <input
              type="text"
              class="harm-input"
              value={context.harm.medium.descriptions[i]}
            >
          {/each}

        </div>
        <div class="harm-penalty">-d6</div>
      </div>

      <div class="harm-row">
        <div class="harm-level">1</div>
        <div class="harm-descriptions">
          <Indicators
            id={context._id}
            className="harm-indicator"
            onClick={value => changeHealingSteps('light', value)}
            label="injuries-1"
            total={context.harm.light.healingSteps}
            current={context.harm.light.currentHeal}
          />
          {#each {length: context.harm.light.harmsLimit} as reason, i}
            <input
              type="text"
              class="harm-input"
              value={context.harm.light.descriptions[i]}
            >
          {/each}
        </div>
        <div class="harm-penalty">
          {foundryAdapter.localize('less_effect')}
        </div>
      </div>
    </div>
  </div>

  <div class="safety-container">
    <div class="safety-item">
      <input
        id={context._id + '-safety-armor'}
        hidden
        type="checkbox"
        checked={context.safety.armor}
        onclick={() => confirmItemsSelection('armor')}
      >
      <label for={context._id + '-safety-armor'}>{ foundryAdapter.localize('safety.armor') }</label>
    </div>

    <div class="safety-item">
      <input
        id={context._id + '-safety-heavy'}
        hidden
        type="checkbox"
        checked={context.safety.heavy}
        onclick={() => confirmItemsSelection('heavy')}
      >
      <label for={context._id + '-safety-heavy'}>{ foundryAdapter.localize('safety.heavy') }</label>
    </div>

    <div class="safety-item">
      <input
        id={context._id + '-safety-shield'}
        hidden
        type="checkbox"
        checked={context.safety.shield}
        onclick={() => confirmItemsSelection('shield')}
      >
      <label for={context._id + '-safety-shield'}>{ foundryAdapter.localize('safety.shield') }</label>
    </div>

    <div class="safety-item">
      <input
        id={context._id + '-safety-special'}
        hidden
        type="checkbox"
        checked={context.safety.special}
        onclick={() => confirmItemsSelection('special')}
      >
      <label for={context._id + '-safety-special'}>{ foundryAdapter.localize('safety.special') }</label>
    </div>
  </div>
</div>

<style lang="scss">
  .wrapper {
    display: grid;
    grid-template-columns: 2fr 0.75fr;
    gap: 0.5rem;
  }

  .harm-container {
    display: grid;
    gap: 0.5rem;
  }

  .harm-title {
    display: flex;

    padding: 0.5rem;
    margin: 0;

    font-size: 1.25rem;
    color: var(--band-of-blades-sheets-font-secondary-color);
    background-color: var(--band-of-blades-sheets-background-secondary-color);
  }

  .harm-table {
    display: grid;
  }

  .harm-row {
    display: grid;
    height: 32px;
    grid-template-columns: 24px auto 100px;
    border-bottom: 1px solid var(--band-of-blades-sheets-border-secondary-color);

    &:first-child {
      .harm-descriptions {
        background-color: var(--band-of-blades-sheets-background-secondary-color);
        .harm-input {
          color: var(--band-of-blades-sheets-font-secondary-color);
        }
      }

      .harm-penalty {
        background-color: var(--band-of-blades-sheets-background-secondary-color);
        color: var(--band-of-blades-sheets-font-secondary-color);
      }
    }

    .harm-level {
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--band-of-blades-sheets-font-primary-color);
      background-color: var(--band-of-blades-sheets-background-tertiary-color);
    }

    .harm-penalty {
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;

      font-size: 0.75rem;
      color: var(--band-of-blades-sheets-font-primary-color);
      background-color: var(--band-of-blades-sheets-background-tertiary-color);
    }

    .harm-descriptions {
      position: relative;

      display: flex;

      .harm-input {
        width: 100%;
        height: 100%;
        display: flex;
        padding: 0 0.5rem;

        border: none;
        color: var(--band-of-blades-sheets-font-primary-color);
        border-right: 1px solid var(--band-of-blades-sheets-background-tertiary-color);
        font-size: 0.75rem;
        overflow: hidden;
        outline: none;
        border-radius: 0;

        background-color: inherit;

        &:last-child {
          border-right-color: transparent;
        }
      }
    }
  }

  :global(.harm-indicator) {
    position: absolute;
    top: 4px;
    right: 4px;
    transform: scale(0.75);
  }

  .safety-container {
    display: grid;
    gap: 0.25rem;
  }

  .safety-item {
    display: flex;
    width: 100%;

    input[type='checkbox']:checked + label {
      &:after {
        background-color: var(--band-of-blades-sheets-primary-highlight-color);
      }
    }

    label {
      cursor: pointer;
      position: relative;
      width: 100%;
      height: 100%;

      display: flex;
      justify-content: space-between;
      align-items: center;

      padding: 0 0.5rem;
      font-size: 1rem;
      color: var(--band-of-blades-sheets-font-primary-color);

      background-color: var(--band-of-blades-sheets-background-tertiary-color);

      transition: background-color 100ms ease-in-out;

      &:hover {
        background-color: var(--band-of-blades-sheets-border-secondary-color);
      }

      &:after {
        content: '';
        position: relative;

        width: 10px;
        height: 10px;

        border-radius: 50%;

        background-color: var(--band-of-blades-sheets-background-primary-color);
        border: 1px solid var(--band-of-blades-sheets-border-primary-color);
      }
    }
  }
</style>