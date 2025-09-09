<script lang="ts">

  import { foundryAdapter } from "src/foundry/foundry.adapter";
  import Counter from '../../atoms/counter.svelte';

</script>

<div class="container">
  <div class="header">{foundryAdapter.localize('role.Quartermaster.supplies.name')}</div>
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
    gap: 0.5rem;
  }

  .header {
    grid-column: 1 / 3;

    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0 1.25rem 0 .5rem;
    border-radius: 4px;
    font-family: var(--band-of-blades-sheets-font-vinque), Arial, sans-serif;
    color: var(--band-of-blades-sheets-font-secondary-color);
    font-size: 1.125rem;
    text-transform: uppercase;
    background-color: var(--band-of-blades-sheets-background-secondary-color)
  }

  .description {
    font-family: var(--band-of-blades-sheets-font-vinque), Arial, sans-serif;
    color: var(--band-of-blades-sheets-font-primary-color);
    font-size: 1rem;
  }


</style>