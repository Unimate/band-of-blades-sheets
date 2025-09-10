<script lang="ts">

  import { foundryAdapter } from "src/foundry/foundry.adapter";
  import Counter from '../../atoms/counter.svelte';

</script>

<div class="container">
  <Counter />

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