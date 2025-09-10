<script lang="ts">

  import { foundryAdapter } from "src/foundry/foundry.adapter";
  import Counter from '../../atoms/counter.svelte';
  import { getRoleSheetContext } from "src/lib/v1/organisms/role/role.context";
  import type { IQuartermaster, IQuartermasterActions, IRole } from "src/types/roles.type";
  import { onMount } from "svelte";

  const context = $derived(getRoleSheetContext() as IRole & IQuartermaster & IQuartermasterActions);
  let supply = $state(0);

  onMount(() => {
    supply = context.supply.current;
  });

  $effect(() => {
    if (supply !== context.supply.current) {
      context.actions.updateSupply(supply);
    }
  })

</script>

<div class="container">
  <Counter bind:value={supply} limit={context.supply.max} />

  <div class="description">
    <span>
      {@html foundryAdapter.localize('role.Quartermaster.supplies.description')}
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

  .description {
    font-family: var(--band-of-blades-sheets-font-vinque), Arial, sans-serif;
    color: var(--band-of-blades-sheets-font-primary-color);
    font-size: 1rem;
  }


</style>