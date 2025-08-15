<script lang="ts">
  import { type IActor, LegionnaireEnum } from "src/types/actor.type";
  import { foundryAdapter } from "src/foundry/foundry.adapter";
  import { getActorSheetContext } from "src/lib/v1/organisms/actor/actor.context";
  import type { IActions } from "src/types/actions.type";

  let context = $derived(getActorSheetContext() as IActor & IActions);
  let { name, heritage, specialization, image, reputation, callSelect, children } = $props();

  const changeName = (event: FocusEvent) => {
    const value = (event.target as HTMLInputElement).value;
    if (value.trim() === "") {
      return;
    }
    context.actions.updateName(value.trim());
  }
</script>

<div class="wrapper">

  <div class="specialization-container">
    <button class="specialization" onclick={() => callSelect('specialization')}>
      {#if specialization !== null}
        <span class="specialization-icon">
          <img src={image} alt="specialization name"/>
        </span>
        <span class="specialization-name">{foundryAdapter.localize(`role.${specialization}.name`)}</span>
      {:else}
        <span class="specialization-name">{foundryAdapter.localize(`role.select`)}</span>
      {/if}
    </button>
  </div>

  <fieldset class="name-container">
    <label for="name">{foundryAdapter.localize('name:')}</label>
    <input id="name" type="text" value={name} onblur={(e) => changeName(e)}>
  </fieldset>

  <div class="heritage-container">
    <button class="heritage" onclick={() => callSelect('heritage')}>
      {#if heritage !== null}
        {foundryAdapter.localize(`heritage.${heritage}.name`)}
        <span class="traits">({reputation})</span>
      {:else}
        {foundryAdapter.localize(`heritage.select`)}
      {/if}
    </button>
  </div>
  <div class="slot-container">
    {@render children?.()}
  </div>
</div>

<style lang="scss">

  fieldset {
    width: 100%;
    border: none;
    margin: 0;
    padding: 0;
  }

  .wrapper {
    width: 100%;
    display: grid;

    grid-template-columns: .75fr 1fr;
    gap: 0.5rem;

  }

  .squad,
  .specialization {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    height: 32px;

    border-radius: 4px;

    color: var(--band-of-blades-sheets-font-secondary-color);
    background-color: var(--band-of-blades-sheets-background-secondary-color);

    padding: 0.25rem 0.5rem;

    &-icon {
      position: relative;
      width: 1rem;
      height: 1rem;
      border: 1px solid var(--band-of-blades-sheets-border-secondary-color);
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

    &-name {
      font-size: 1.25rem;
      font-family: var(--band-of-blades-sheets-font-vinque), Arial, sans-serif;
      padding: 0 0 0.125rem;
    }
  }

  .name-container {
    display: flex;
    align-items: center;
    height: 32px;

    color: var(--band-of-blades-sheets-font-primary-color);
    padding: 0 0.5rem;

    border-radius: 4px;
    background-color: var(--band-of-blades-sheets-background-tertiary-color);

    label {
      font-size: 1.25rem;
      font-family: var(--band-of-blades-sheets-font-vinque), Arial, sans-serif;
      padding: 0 0 0.25rem;
    }

    input {
      width: 100%;
      height: 100%;

      border: none;
      overflow: hidden;
      outline: none;

      padding: 0 0.5rem;

      font-size: 1.125rem;

      background-color: inherit;
      color: inherit;
    }
  }

  .squad,
  .heritage {
    font-family: var(--band-of-blades-sheets-font-vinque), Arial, sans-serif;
    padding-bottom: 2px;
    font-size: 0.875rem;
  }

  .specialization-container,
  .squad-container,
  .heritage-container {
    display: grid;
    grid-auto-flow: column;
    align-items: center;
    gap: 0.5rem;
    border-radius: 4px;

    button {
      height: 32px;
      display: inline-flex;
      justify-content: flex-start;
      align-items: center;
      width: 100%;

      padding: 0 0.5rem;

      background-color: inherit;
      color: inherit;

      border: none;
      border-radius: 4px;
    }
  }

  .specialization-container,
  .squad-container {
    color: var(--band-of-blades-sheets-font-secondary-color);
    background-color: var(--band-of-blades-sheets-background-secondary-color);
  }

  .heritage-container {
    color: var(--band-of-blades-sheets-font-primary-color);
    background-color: var(--band-of-blades-sheets-background-tertiary-color);
  }

</style>