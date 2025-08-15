<script lang="ts">
  import Indicators from "src/lib/v1/atoms/indicators.svelte";
  import { foundryAdapter } from "src/foundry/foundry.adapter";
  import { getMarshalSheetContext } from "src/lib/v1/organisms/role/role.context";
  import type { IDictionary } from "src/types/dictionaries.type";
  import type { IMarshal, IMarshalActions } from "src/types/roles.type";
  import { SpecialistEnum } from "src/types/actor.type";

  const context = $derived(getMarshalSheetContext() as IDictionary & IMarshal & IMarshalActions);

  const specialties = Object.values(SpecialistEnum);

  const openSpecialistPage = (_id: string) => {
    context.actions.openActorPage(_id);
  }
</script>

<div class="container">

  {#snippet renderSpecialist(specialist)}
    <li class="squad-mate">
      <div class="squad-mate-information">
        <div class="squad-mate-icon">
          <img src={specialist.character.image} alt="specialization name"/>
        </div>
        <button class="squad-mate-link" onclick={() => openSpecialistPage(specialist._id)}>
          {specialist.character.name}
        </button>
      </div>
      <div class="squad-mate-state">
        <span>Wounds:</span>
        <Indicators
            id={specialist._id}
            label="wounds"
            limit={specialist.injuries.conditions.trauma.max}
            total={4}
            version="secondary"
            current={specialist.injuries.conditions.trauma.types.length}
        />
      </div>
      <div class="squad-mate-state">
        <span>Stress:</span>
        <Indicators
            id={specialist._id}
            label="stress"
            limit={specialist.injuries.injuries.stress.max}
            total={10}
            current={specialist.injuries.injuries.stress.current}
        />
      </div>
    </li>
  {/snippet}

  {#each specialties as specialty}
    <div class="squad-item">
      <div class="squad-panel">
        <div class="squad-information">
          <span class="squad-icon">
            <img src={'systems/band-of-blades/styles/assets/icons/' + specialty + '.svg'} alt="specialization name"/>
          </span>
          <span class="squad-name">
            {foundryAdapter.localize(`specialization.${specialty}.name`)}
          </span>
        </div>
        <div class="squad-control-panel"></div>
      </div>
      {#if context.specialists[specialty] !== undefined}
        {@const specialists = context.specialists[specialty]}
        <div class="squad-container">
          <ul class="squad-list">
            {#each specialists as specialist}
              {@render renderSpecialist(specialist)}
            {/each}
          </ul>
        </div>
      {/if}
    </div>
  {/each}
</div>

<style lang="scss">
  .container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem;
  }

  .squad-information {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    gap: 0.25rem;
  }

  .squad-item {
    display: grid;
    gap: 0.5rem;
  }

  .squad-name {
    font-family: var(--band-of-blades-sheets-font-vinque), Arial, sans-serif;
    padding-bottom: 2px;
    font-size: 1.25rem;
  }

  .squad-panel {
    height: 48px;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 4px;
    padding: 0.5rem;
    background-color: var(--band-of-blades-sheets-background-secondary-color);

    color: var(--band-of-blades-sheets-font-secondary-color);
  }

  .squad-container {
    display: grid;
    gap: 1rem;
  }

  .squad-list {
    padding: 0;
    margin: 0;
  }

  .squad-mate,
  .squad {
    &-icon {
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
  }

  .squad-icon {
    width: 1.5rem;
    min-width: 1.5rem;
    height: 1.5rem;
  }

  .squad-mate-icon {
    width: 1rem;
    min-width: 1rem;
    height: 1rem;
  }

  .squad-mate {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 0.25rem;
    padding: 0.5rem;
    background-color: var(--band-of-blades-sheets-background-tertiary-color);
    color: var(--band-of-blades-sheets-font-primary-color);

    border-radius: 4px;


    &-information {
      grid-column: 1 / 3;
      display: flex;
      gap: 0.5rem;
      justify-content: flex-start;
      align-items: center;
    }

    &-link {
      justify-content: flex-start;

      cursor: pointer;
      width: 100%;
      border: none;
      color: var(--band-of-blades-sheets-font-primary-color);
      outline: none;
      background-color: transparent;

      padding: 0 0.25rem;
      margin: unset;

      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;

      &:hover {
        color: var(--band-of-blades-sheets-primary-highlight-color);
      }
    }

    &-state {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.5rem;
    }
  }
</style>