<script lang="ts">
  import { foundryAdapter } from "src/foundry/foundry.adapter";
  import { getActorSheetContext } from "src/lib/v1/actor/actor.context";
  import { type IActor } from "src/types/actor.type";
  import { type IActions } from "src/types/actions.type";

  const { item = $bindable(), index, selection = false, extra = "common" } = $props();
  let context = $derived(getActorSheetContext() as IActor & IActions);
</script>

<div class="wrapper" class:selection={selection}>
  <div class="options-container">
    <div class="option" class:fine={item.primary.fine} class:alternative={item.alternative !== undefined}>
      <input hidden type="radio" name={'option-' + index} id={item.primary.label + '-' + index}>
      <label for={item.primary.label + '-' + index}>
        <span>
          {foundryAdapter.localize(`load.items.${item.primary.label}.name`)}
          {#if item.primary.description !== undefined}
            <i>{foundryAdapter.localize(`load.items.${item.primary.label}.description`)}</i>
          {/if}
        </span>
      </label>
    </div>

    {#if item.alternative !== undefined}
      <div class="option alternative" class:fine={item.alternative.fine}>
        <span class="or">{foundryAdapter.localize('or')}</span>
        <input hidden type="radio" name={'option-' + index} id={item.alternative.label + '-' + index}>
        <label for={item.alternative.label + '-' + index}>
          <span>
            {foundryAdapter.localize(`load.items.${item.alternative.label}.name`)}
            {#if item.alternative.description !== undefined}
              <i>{foundryAdapter.localize(`load.items.${item.alternative.label}.description`)}</i>
            {/if}
            </span>
        </label>
      </div>
    {/if}
  </div>

  {#if item.usages > 0}
    <div class="usages">
      {#each {length: item.usages}, usage}
        {@const ephemeral = item.usages - usage}
        <input
          type="checkbox"
          hidden
          id={context._id + '-usage-' + usage + '-' + item.primary.label + '-' + extra}
          name="usages-input"
          value={ephemeral}
          disabled={selection}
        />
        <label class="usages-point" for={context._id + '-usage-' + usage + '-' + item.primary.label  + '-' + extra}></label>
      {/each}
    </div>
  {/if}
</div>

<style lang="scss">
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 0.5rem;
    padding: 0.25rem 0.5rem;

    &.selection {
      pointer-events: none;
    }

    &:not(.selection):before {
      content: '';
      position: relative;
      width: 6px;
      height: 6px;
      background-color: var(--band-of-blades-sheets-background-secondary-color);
    }
  }

  .options-container {
    display: inline;
    gap: 0.25rem;
  }

  .option {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    gap: 0.25rem;
    color: var(--band-of-blades-sheets-font-primary-color);

    &.alternative {
      label:before {
        content: "";
      }
    }

    &.fine {
      font-weight: bold;
    }

    .or {
      font-weight: normal;
    }

    i {
      font-weight: normal;
      font-size: 0.75rem;
    }

    input[type='radio']:checked + label {
      &:before {
        background-color: var(--band-of-blades-sheets-primary-highlight-color);
      }
    }

    label {
      display: inline-flex;
      align-items: center;
      justify-content: flex-start;
      gap: 0.25rem;
      position: relative;

      span {
        display: inline-block;
      }

      &:before {
        position: relative;
        display: flex;
        min-width: 10px;
        width: 10px;
        height: 10px;
        background-color: var(--band-of-blades-sheets-background-primary-color);
        border: 2px solid var(--band-of-blades-sheets-border-primary-color);
      }
    }
  }

  .usages {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.25rem;
    margin: 0;
  }

  input[type="checkbox"]:checked + .usages-point {
    background-color: var(--band-of-blades-sheets-primary-highlight-color);
  }

  .usages-point {
    display: flex;
    width: 10px;
    height: 10px;

    border-radius: 50%;
    background-color: var(--band-of-blades-sheets-background-primary-color);
    border: 1px solid var(--band-of-blades-sheets-border-primary-color);
  }

</style>