<script lang="ts">
  import { foundryAdapter } from "src/foundry/foundry.adapter";
  import Clock from "src/lib/v1/atoms/clock.svelte";
  import { getRoleSheetContext } from "src/lib/v1/organisms/role/role.context";
  import type { IQuartermaster, IQuartermasterActions, IRole } from "src/types/roles.type";

  const context = $derived(getRoleSheetContext() as IRole & IQuartermaster & IQuartermasterActions);

  console.log(context.personnel);
</script>

{#snippet mercy(entity)}
  <div class="personnel-icon">
    <img src="" alt="">
  </div>
  <div class="personnel-responsibility">Mercy</div>
  <label class="personnel-control">
    <span>Wounded</span>
    <input type="checkbox" hidden checked={entity.conditions.trauma.wounded}>
    <span class="personnel-checkbox-element"></span>
  </label>
{/snippet}

{#snippet alchemist(entity)}
  <div class="personnel-icon">
    <img src="" alt="">
  </div>
  <div class="personnel-responsibility">Alchemist</div>
  <div class="personnel-control">
    <span>Corruption</span>
    <Clock size={entity.injuries.corruption.max} current={entity.injuries.corruption.current} onChange={(e) => console.log(e)}/>
  </div>
{/snippet}

<div class="container">
  <div class="header">
    {foundryAdapter.localize('role.Quartermaster.personnel.name')}
  </div>

  <div class="personnel-list">
    <div class="personnel-header">
      <span>Mercies</span>
      <button class="button">Add</button>
    </div>
    {#each context.personnel.mercy as item}
      <div class="personnel-item">
        {@render mercy(item)}
        <button class="button personnel-remove-button" aria-label="remove">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
    {/each}
  </div>

  <div class="personnel-list">
    <div class="personnel-header">
      <span>Alchemists</span>
      <button class="button">Add</button>
    </div>
    {#each context.personnel.alchemists as item}
      <div class="personnel-item">
        {@render alchemist(item)}
        <button class="button personnel-remove-button" aria-label="remove">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
    {/each}
  </div>
</div>

<style lang="scss">
  .container {
    display: grid;
    grid-template-columns: 1fr 1fr;
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