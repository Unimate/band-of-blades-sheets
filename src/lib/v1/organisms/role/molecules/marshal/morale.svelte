<script lang="ts">
  import { getMarshalSheetContext } from "src/lib/v1/organisms/role/role.context";
  import type { IMarshal, IMarshalActions, IRole } from "src/types/roles.type";
  import { foundryAdapter } from "src/foundry/foundry.adapter";

  const context = $derived(getMarshalSheetContext() as IRole & IMarshal & IMarshalActions);

  const updateMorale = (value: number) => {
    context.actions.updateMorale(value);
  }
</script>

<div class="container">
  <div class="title">{foundryAdapter.localize(`role.Marshal.morale.name`)}</div>
  <div class="steps">
    {#each {length: 10}, steps}
      {@const ephemeral = 10 - steps}
      {ephemeral}
      <input
          type="checkbox"
          hidden
          id={'morale-' + steps + '-' + context._id}
          value={ephemeral}
          checked={ephemeral === context.morale}
          onclick={() => updateMorale(ephemeral)}
      />
      <label class="point" for={'morale-' + steps + '-' + context._id}></label>
    {/each}

    <div class="substrate low"></div>
    <div class="substrate medium"></div>
    <div class="substrate high"></div>
  </div>
</div>

<style>

  .container {
    display: grid;
    grid-template-columns: auto 1fr;
  }

  .title {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0 1.25rem 0 .5rem;

    border-radius: 4px 0 0 4px;

    font-family: var(--band-of-blades-sheets-font-vinque), Arial, sans-serif;
    color: var(--band-of-blades-sheets-font-secondary-color);
    font-size: 1.125rem;
    text-transform: uppercase;

    background-color: var(--band-of-blades-sheets-background-secondary-color);
  }

  .steps {
    position: relative;
    display: flex;
    justify-content: space-around;
    flex-direction: row-reverse;
    gap: 0.5rem;

    padding: 0.75rem 0;

    input[type="checkbox"] {
      z-index: 2;
    }

    input[type="checkbox"]:checked ~ .point {
      background-color: var(--band-of-blades-sheets-primary-highlight-color);
      border-color: var(--band-of-blades-sheets-border-primary-color);
    }

    .point {
      cursor: pointer;
      display: flex;
      width: 16px;
      height: 16px;
      background-color: var(--band-of-blades-sheets-background-primary-color);
      border: 2px solid var(--band-of-blades-sheets-border-secondary-color);
      transform: rotate(45deg);
      z-index: 4;
    }

    .substrate {
      position: absolute;
      top: 0;
      height: 100%;

      &:after {
        content: "";
        position: absolute;
        top: 0;
        width: 40px;
        height: 100%;
        right: -10px;
        background-color: inherit;
        clip-path: polygon(0 0, 75% 0%, 100% 50%, 75% 100%, 0 100%);
      }

      &.low {
        left: 0;
        width: 27.5%;
        background-color: var(--band-of-blades-sheets-background-secondary-color);
        z-index: 3;
      }

      &.medium {
        left: 27.5%;
        width: 40%;
        background-color: var(--band-of-blades-sheets-background-quaternary-color);
        z-index: 2;
      }

      &.high {
        border-radius: 0 4px 4px 0;
        left: 67.5%;
        width: 32.5%;
        background-color: var(--band-of-blades-sheets-background-tertiary-color);
        z-index: 1;
        &:after {
          display: none;
        }
      }
    }
  }
</style>