<script lang="ts">
  import { foundryAdapter } from "src/foundry/foundry.adapter";
  import Clock from "src/lib/v1/atoms/clock.svelte";
  import { getRoleSheetContext } from "src/lib/v1/organisms/role/role.context";
  import type {
    IAlchemist,
    IMercy,
    IQuartermaster,
    IQuartermasterActions,
    IRole,
    PersonnelType
  } from "src/types/roles.type";

  const context = $derived(getRoleSheetContext() as IRole & IQuartermaster & IQuartermasterActions);

  const updateAlchemist = (entity: PersonnelType<IAlchemist>, usages: number) => {
    context.actions.updatePersonnel(entity, { usages });
  }

  const updateMercy = (entity: PersonnelType<IMercy>) => {
    const update = {
      wounded: !entity.conditions.trauma.wounded
    }
    context.actions.updatePersonnel(entity, update);
  }

  const addPersonnel = (type: 'Alchemist' | 'Mercy' | 'Laborer') => {
    context.actions.addPersonnel(type);
  }

  const removePersonnel = (_id: string) => {
    context.actions.removePersonnel(_id);
  }
</script>

{#snippet icon(entity)}
  <div class="personnel-icon">
    <img src={entity.image} alt={entity.name}>
  </div>
{/snippet}

{#snippet remove(entity)}
  <button class="button personnel-remove-button" aria-label="remove" onclick={() => removePersonnel(entity._id)}>
    <i class="fa-solid fa-xmark"></i>
  </button>
{/snippet}

{#snippet mercy(entity)}
  {@render icon(entity)}
  <div class="personnel-responsibility">{foundryAdapter.localize(`role.Quartermaster.personnel.Mercy.name`)}</div>
  <label class="personnel-control">
    <span>{foundryAdapter.localize(`role.Quartermaster.personnel.Mercy.wounded`)}</span>
    <input type="checkbox" hidden checked={entity.conditions.trauma.wounded} onclick={() => updateMercy(entity)}>
    <span class="personnel-checkbox-element"></span>
  </label>
  {@render remove(entity)}
{/snippet}

{#snippet alchemist(entity)}
  {@render icon(entity)}
  <div class="personnel-responsibility">{foundryAdapter.localize(`role.Quartermaster.personnel.Alchemist.name`)}</div>
  <div class="personnel-control">
    <span>{foundryAdapter.localize(`role.Quartermaster.personnel.Alchemist.corruption`)}</span>
    <Clock size={entity.injuries.corruption.max} current={entity.injuries.corruption.current} onChange={(e) => updateAlchemist(entity, e)}/>
  </div>
  {@render remove(entity)}
{/snippet}

{#snippet laborer(entity)}
  {@render icon(entity)}
  <div class="personnel-responsibility">{foundryAdapter.localize(`role.Quartermaster.personnel.Laborer.name`)}</div>
  {@render remove(entity)}
{/snippet}

<div class="container">
  <div class="header">
    {foundryAdapter.localize('role.Quartermaster.personnel.name')}
  </div>

  <div class="personnel-list">
    <div class="personnel-header">
      <span>{foundryAdapter.localize(`role.Quartermaster.personnel.Mercy.plural`)}</span>
      <button class="button" onclick={() => addPersonnel('Mercy')}>
        {foundryAdapter.localize(`actions.add`)}
      </button>
    </div>
    {#each context.personnel.mercy as item}
      <div class="personnel-item">
        {@render mercy(item)}
      </div>
    {/each}
  </div>

  <div class="personnel-list">
    <div class="personnel-header">
      <span>{foundryAdapter.localize(`role.Quartermaster.personnel.Alchemist.plural`)}</span>
      <button class="button" onclick={() => addPersonnel('Alchemist')}>
        {foundryAdapter.localize(`actions.add`)}
      </button>
    </div>
    {#each context.personnel.alchemists as item}
      <div class="personnel-item">
        {@render alchemist(item)}
      </div>
    {/each}
  </div>

  <div class="personnel-list">
    <div class="personnel-header">
      <span>{foundryAdapter.localize(`role.Quartermaster.personnel.Laborer.plural`)}</span>
      <button class="button" onclick={() => addPersonnel('Laborer')}>
        {foundryAdapter.localize(`actions.add`)}
      </button>
    </div>
    {#each context.personnel.laborers as item}
      <div class="personnel-item">
        {@render laborer(item)}
      </div>
    {/each}
  </div>
</div>

<style lang="scss">
  .container {
    display: grid;
    grid-template-columns: 1fr 1.25fr 0.75fr;
    gap: 0.5rem;

  }

  .header {
    grid-column: 1 / 4;

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

  .personnel-panel {
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

  .personnel-list {
    padding: 0;
    margin: 0;
    display: grid;
    align-content: flex-start;
    gap: 0.25rem;
  }

  .personnel-header {
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

  .personnel-item {
    height: 50px;
    display: grid;
    align-items: center;
    grid-template-columns: auto 1fr auto auto;
    gap: 0.5rem;
    padding: 0.5rem;
    background-color: var(--band-of-blades-sheets-background-tertiary-color);
    border-radius: 4px;

    .personnel-icon {
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

    .personnel-responsibility {
      color: var(--band-of-blades-sheets-font-primary-color);
      font-size: 1.125rem;
    }

    .personnel-control {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;

      color: var(--band-of-blades-sheets-font-primary-color);
      font-size: 1rem;


      input[type="checkbox"]:checked + .personnel-checkbox-element {
        &:after {
          background-color: var(--band-of-blades-sheets-primary-highlight-color);
        }
      }

      .personnel-checkbox-element {
        cursor: pointer;
        position: relative;
        width: 1.5rem;
        height: 1.5rem;

        display: flex;
        align-items: center;
        justify-content: center;

        border-radius: 4px;

        border: 2px solid var(--band-of-blades-sheets-border-primary-color);

        &:after {
          content: "";
          position: absolute;
          inset: 1px;
          background-color: transparent;
          border-radius: 2px;
        }

      }
    }

    .personnel-remove-button {
      width: 1.5rem;
      height: 1.5rem;
      border: none;
      outline: none;

      i {
        transition: color 75ms ease-in-out;
      }
    }
  }
</style>