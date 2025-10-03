<script lang="ts">

  import { foundryAdapter } from "src/foundry/foundry.adapter";
  import Counter from '../../atoms/counter.svelte';
  import { getRoleSheetContext } from "src/lib/v1/organisms/role/role.context";
  import type { ICommander, ICommanderActions, IRole } from "src/types/roles.type";
  import { onMount } from "svelte";

  const context = $derived(getRoleSheetContext() as IRole & ICommander & ICommanderActions);
  let pressure = $state(0);

  onMount(() => {
    pressure = context.pressure.current;
  });

  $effect(() => {
    if (pressure !== context.pressure.current) {
      context.actions.updatePressure(pressure);
    }
  });

</script>

<div class="container">
  <div class="header">
    <span>{foundryAdapter.localize(`role.Commander.pressure.name`)}</span>
    <p>{foundryAdapter.localize(`role.Commander.pressure.tip`)}</p>
  </div>

  <Counter bind:value={pressure} />

  <div class="description">
    <span>
      {@html foundryAdapter.localize('role.Commander.pressure.description')}
    </span>
  </div>
</div>

<style lang="scss">
  .container {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: flex-start;
    gap: 0.5rem 1rem;
  }

  .header {
    grid-column: 1 / 3;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.25rem .5rem;
    border-radius: 4px;
    background-color: var(--band-of-blades-sheets-background-secondary-color);

    span {
      font-family: var(--band-of-blades-sheets-font-vinque), Arial, sans-serif;
      color: var(--band-of-blades-sheets-font-secondary-color);
      font-size: 1rem;
      text-transform: uppercase;
    }
    p {
      color: var(--band-of-blades-sheets-font-secondary-color);
      font-size: 1rem;
      margin: 0;
      padding: 0;
    }
  }

  .description {
    font-family: var(--band-of-blades-sheets-font-vinque), Arial, sans-serif;
    color: var(--band-of-blades-sheets-font-primary-color);
    font-size: 1rem;
  }

</style>