<script lang="ts">
  import { foundryAdapter } from "src/foundry/foundry.adapter";
  import Indicators from "src/lib/v1/atoms/indicators.svelte";
</script>

{#snippet itemWithUsage(entity)}
  <div class="materiel-wrapper">
    <div class="materiel-icon">
      <img src="" alt="">
    </div>
    <div class="materiel-name">Food Stores</div>
  </div>
  <button class="button materiel-remove-button" aria-label="remove">
    <i class="fa-solid fa-xmark"></i>
  </button>
  <label class="materiel-control">
    <span>Usage:</span>
    <Indicators
        id={1}
        label="wounds"
        limit={3}
        total={6}
        version="secondary"
        current={0}
        onClick={(e) => console.log(e)}
    />
  </label>
{/snippet}

{#snippet itemWithCount(entity)}
  <div class="materiel-wrapper">
    <div class="materiel-icon">
      <img src="" alt="">
    </div>
    <div class="materiel-name">Food Stores</div>
  </div>
  <button class="button materiel-remove-button" aria-label="remove">
    <i class="fa-solid fa-xmark"></i>
  </button>
  <label class="materiel-control">
    <span>Usage:</span>
    <Indicators
        id={1}
        label="wounds"
        limit={3}
        total={3}
        version="primary"
        current={0}
        onClick={(e) => console.log(e)}
    />
  </label>
{/snippet}

<div class="container">
  <div class="header">
    {foundryAdapter.localize('role.Quartermaster.materiel.name')}
  </div>

  <div class="materiel-list">
    <div class="materiel-header">
      <span>Mercies</span>
      <button class="button">Add</button>
    </div>
    <div class="materiel-item">
      {@render itemWithUsage({})}
    </div>
    <div class="materiel-item">
      {@render itemWithUsage({})}
    </div>
    <div class="materiel-item">
      {@render itemWithUsage({})}
    </div>
  </div>
</div>

<style lang="scss">
  .container {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.5rem;

  }

  .header {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0 1.25rem 0 .5rem;
    border-radius: 4px;
    font-family: var(--band-of-blades-sheets-font-vinque), Arial, sans-serif;
    color: var(--band-of-blades-sheets-font-secondary-color);
    font-size: 1.125rem;
    text-transform: uppercase;
    background-color: var(--band-of-blades-sheets-background-secondary-color);
  }

  .materiel-panel {
    height: 48px;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 4px;
    padding: .5rem;
    background-color: var(--band-of-blades-sheets-background-secondary-color);
    color: var(--band-of-blades-sheets-font-secondary-color)
  }

  .materiel-list {
    padding: 0;
    margin: 0;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    align-content: flex-start;
    gap: 0.25rem;
  }

  .materiel-header {
    grid-column: 1 / 4;
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
  }

  .materiel-item {
    display: grid;
    align-items: center;
    justify-content: space-between;
    grid-template-columns: auto 1fr;
    gap: 0.25rem;
    padding: 0.5rem;
    background-color: var(--band-of-blades-sheets-background-tertiary-color);
    color: var(--band-of-blades-sheets-font-primary-color);
    margin: 0;
    border-radius: 4px;

    .materiel-wrapper {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      gap: 0.25rem;
    }

    .materiel-icon {
      width: 1.25rem;
      height: 1.25rem;
      position: relative;
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

    .materiel-name {
      color: var(--band-of-blades-sheets-font-primary-color);
      font-size: 1rem;
    }

    .materiel-indicators {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .materiel-remove-button {
      justify-self: flex-end;
      width: 1.5rem;
      height: 1.5rem;
      border: none;
      outline: none;

      i {
        transition: color 75ms ease-in-out;
      }
    }

    .materiel-control {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: .5rem;
    }
  }

</style>