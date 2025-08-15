<script lang="ts">
  import Indicators from "src/lib/v1/atoms/indicators.svelte";
  import { foundryAdapter } from "src/foundry/foundry.adapter";
  import { getMarshalSheetContext } from "src/lib/v1/organisms/role/role.context";
  import type { IDictionary } from "src/types/dictionaries.type";
  import type { IMarshal, IMarshalActions } from "src/types/roles.type";

  const context = $derived(getMarshalSheetContext() as IDictionary & IMarshal & IMarshalActions);

  const staffTheSquad = (name: string) => {
    const squad = context.legionnaires[name];
    const staff = 5 - (squad ?? []).length;
    context.actions.staffTheSquad(name, staff);
  }

  const openLegionnairePage = (_id: string) => {
    context.actions.openActorPage(_id);
  }

</script>

<div class="container">

  {#snippet renderLegionnaire(legionnaire)}
    <li class="squad-mate">
      <div class="squad-mate-information">
        <div class="squad-mate-icon">
          <img src={legionnaire.character.image} alt="specialization name"/>
        </div>
        <button class="squad-mate-link" onclick={() => openLegionnairePage(legionnaire._id)}>{legionnaire.character.name}</button>
      </div>
      <div class="squad-mate-state">
        <span>Wounds:</span>
        <Indicators
            id={legionnaire._id}
            label="wounds"
            limit={legionnaire.injuries.conditions.trauma.max}
            total={4}
            version="secondary"
            current={legionnaire.injuries.conditions.trauma.types.length}
        />
      </div>
      <div class="squad-mate-state">
        <span>Stress:</span>
        <Indicators
            id={legionnaire._id}
            label="stress"
            limit={legionnaire.injuries.injuries.stress.max}
            total={10}
            current={legionnaire.injuries.injuries.stress.current}
        />
      </div>
    </li>
  {/snippet}

  {#each context.dictionaries.squads as squad}
    <div class="squad-item">
      <div class="squad-panel">
        <div class="squad-information">
          <span class="squad-icon">
            <img src={squad.image} alt={squad.name}/>
          </span>
          <span class="squad-name">
            {foundryAdapter.hasLocale(`origin_squads.${squad.name}.name`) ? foundryAdapter.localize(`origin_squads.${squad.name}.name`) : squad.name}
          </span>
        </div>
        <div class="squad-control-panel">
          {#if context.legionnaires[squad.name] === undefined ||  context.legionnaires[squad.name].length < 5}
            <button class="button" onclick={() => staffTheSquad(squad.name)}>Staff</button>
          {/if}
        </div>
      </div>
      {#if context.legionnaires[squad.name] !== undefined}
        {@const legionnaires = context.legionnaires[squad.name]}
        <div class="squad-container">
          <ul class="squad-list">
            {#each legionnaires as legionnaire}
              {@render renderLegionnaire(legionnaire)}
            {/each}
          </ul>
        </div>
      {/if}
    </div>
  {/each}

  {#if context.legionnaires['unassigned'] !== undefined}
    {@const legionnaires = context.legionnaires['unassigned']}
    <div class="squad-item">
      <div class="squad-panel">
        <div class="squad-information">
          <span class="squad-name">Unassigned</span>
        </div>
      </div>
      <div class="squad-container">
        <ul class="squad-list">
          {#each legionnaires as legionnaire}
            {@render renderLegionnaire(legionnaire)}
          {/each}
        </ul>
      </div>
    </div>
  {/if}

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