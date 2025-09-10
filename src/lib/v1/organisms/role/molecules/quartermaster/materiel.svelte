<script lang="ts">
  import { foundryAdapter } from "src/foundry/foundry.adapter";
  import Indicators from "src/lib/v1/atoms/indicators.svelte";
  import { getRoleSheetContext } from "src/lib/v1/organisms/role/role.context";
  import {
    type IAlchemist,
    type IQuartermaster,
    type IQuartermasterActions,
    type IRole,
    Materiels,
    type QuartermasterEntityType
  } from "src/types/roles.type";

  const context = $derived(getRoleSheetContext() as IRole & IQuartermaster & IQuartermasterActions);

  const removeMateriel = (_id: string) => {
    context.actions.removeEntity(_id);
  }

  const addMateriel = (type: Materiels) => {
    context.actions.addMateriel(type);
  }

  const updateMateriel = (entity: QuartermasterEntityType<IAlchemist>, usages: number) => {
    context.actions.updateEntity(entity._id, { usages });
  }
</script>

{#snippet remove(entity)}
  <button class="button materiel-remove-button" aria-label="remove" onclick={() => removeMateriel(entity._id)}>
    <i class="fa-solid fa-xmark"></i>
  </button>
{/snippet}

{#snippet itemWithUsage(entity)}
  <div class="materiel-wrapper">
    <div class="materiel-icon">
      <img src={entity.image} alt={entity.name}>
    </div>
    <div class="materiel-name">
      {foundryAdapter.localize(`role.Quartermaster.materiel.${entity.name}.name`)}
    </div>
  </div>
  {@render remove(entity)}
  <label class="materiel-control">
    <span>Usage:</span>
    <Indicators
        id={entity._id}
        label={entity._id}
        total={entity.usage.max}
        limit={entity.usage.max}
        current={entity.usage.current}
        onClick={(e) => updateMateriel(entity, e)}
    />
  </label>
{/snippet}

{#snippet foodStore(entity)}
  <div class="materiel-wrapper">
    <div class="materiel-icon">
      <img src={entity.image} alt={entity.name}>
    </div>
    <div class="materiel-name">
      {foundryAdapter.localize(`role.Quartermaster.materiel.${entity.name}.name`)}
    </div>
  </div>
  {@render remove(entity)}
  <label class="materiel-control">
    <span>Usage:</span>
    <Indicators
        id={entity._id}
        label={entity._id}
        total={6}
        limit={entity.usage.max}
        current={entity.usage.current}
        onClick={(e) => updateMateriel(entity, e)}
    />
  </label>
{/snippet}

{#snippet itemWithCount(entity)}
  <div class="materiel-wrapper">
    <div class="materiel-icon">
      <img src={entity.image} alt={entity.name}>
    </div>
    <div class="materiel-name">
      {foundryAdapter.localize(`role.Quartermaster.materiel.${entity.name}.name`)}
    </div>
  </div>
  {@render remove(entity)}
{/snippet}

<div class="container">
  <div class="materiel-list">
    <div class="materiel-header">
      <span>{foundryAdapter.localize(`role.Quartermaster.materiel.Food Stores.name`)}</span>
      <button class="button" onclick={() => addMateriel(Materiels.FoodStores)}>
        {foundryAdapter.localize('actions.add')}
      </button>
    </div>
    {#each context.materiel.foodStores as item}
      <div class="materiel-item">
        {@render foodStore(item)}
      </div>
    {/each}
  </div>

  <div class="materiel-list">
    <div class="materiel-header">
      <span>{foundryAdapter.localize(`role.Quartermaster.materiel.Black Shot.name`)}</span>
      <button class="button" onclick={() => addMateriel(Materiels.BlackShot)}>
        {foundryAdapter.localize('actions.add')}
      </button>
    </div>
    {#each context.materiel.blackShot as item}
      <div class="materiel-item">
        {@render itemWithUsage(item)}
      </div>
    {/each}
  </div>

  <div class="materiel-list">
    <div class="materiel-header">
      <span>{foundryAdapter.localize(`role.Quartermaster.materiel.Horses.name`)}</span>
      <button class="button" onclick={() => addMateriel(Materiels.Horses)}>
        {foundryAdapter.localize('actions.add')}
      </button>
    </div>
    {#each context.materiel.horses as item}
      <div class="materiel-item">
        {@render itemWithUsage(item)}
      </div>
    {/each}
  </div>

  <div class="materiel-list">
    <div class="materiel-header">
      <span>{foundryAdapter.localize(`role.Quartermaster.materiel.Religious Supplies.name`)}</span>
      <button class="button" onclick={() => addMateriel(Materiels.ReligiousSupplies)}>
        {foundryAdapter.localize('actions.add')}
      </button>
    </div>
    {#each context.materiel.religiousSupplies as item}
      <div class="materiel-item">
        {@render itemWithUsage(item)}
      </div>
    {/each}
  </div>

  <div class="materiel-list">
    <div class="materiel-header">
      <span>{foundryAdapter.localize(`role.Quartermaster.materiel.Siege Weapons.name`)}</span>
      <button class="button" onclick={() => addMateriel(Materiels.SiegeWeapons)}>
        {foundryAdapter.localize('actions.add')}
      </button>
    </div>
    {#each context.materiel.siegeWeapons as item}
      <div class="materiel-item">
        {@render itemWithCount(item)}
      </div>
    {/each}
  </div>

  <div class="materiel-list">
    <div class="materiel-header">
      <span>{foundryAdapter.localize(`role.Quartermaster.materiel.Supply Cart.name`)}</span>
      <button class="button" onclick={() => addMateriel(Materiels.SupplyCart)}>
        {foundryAdapter.localize('actions.add')}
      </button>
    </div>
    {#each context.materiel.supplyCart as item}
      <div class="materiel-item">
        {@render itemWithCount(item)}
      </div>
    {/each}
  </div>

  <div class="materiel-list">
    <div class="materiel-header">
      <span>{foundryAdapter.localize(`role.Quartermaster.materiel.Other.name`)}</span>
      <button class="button" onclick={() => addMateriel(Materiels.Other)}>
        {foundryAdapter.localize('actions.add')}
      </button>
    </div>
    {#each context.materiel.other as item}
      <div class="materiel-item">
        {@render itemWithCount(item)}
      </div>
    {/each}
  </div>
</div>

<style lang="scss">
  .container {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.5rem;

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
      overflow: hidden;
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

      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
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