<script lang="ts">

  import { foundryAdapter } from "src/foundry/foundry.adapter";
  import Counter from '../../atoms/counter.svelte';
  import { getRoleSheetContext } from "src/lib/v1/organisms/role/role.context";
  import type {
    ICommander,
    ICommanderActions,
    IRole
  } from "src/types/roles.type";
  import { onMount } from "svelte";

  const context = $derived(getRoleSheetContext() as IRole & ICommander & ICommanderActions);
  let intel = $state(0);

  onMount(() => {
    intel = context.intel.current;
  });

  $effect(() => {
    if (intel !== context.intel.current) {
      context.actions.updateIntel(intel);
    }
  });

</script>

<div class="container">
  <div class="header">
    <span>{foundryAdapter.localize(`role.Commander.intel.name`)}</span>
    <p>{foundryAdapter.localize(`role.Commander.intel.tip`)}</p>
  </div>

  <Counter bind:value={intel} />

  <div class="description">
    <span>
      {@html foundryAdapter.localize('role.Commander.intel.description')}
    </span>
  </div>

  <div class="questions-container">
    <div class="question-item">
      <div class="question-item-header">
        {@html foundryAdapter.localize('role.Commander.intel.questions.header', { intel: 0 })}
      </div>
      <div class="question-item-list">
        {@html foundryAdapter.localize('role.Commander.intel.questions.list.zero')}
      </div>
    </div>
    <div class="question-item" class:disabled={intel < 1}>
      <div class="question-item-header">
        {@html foundryAdapter.localize('role.Commander.intel.questions.header', { intel: 1 })}
      </div>
      <div class="question-item-list">
        {@html foundryAdapter.localize('role.Commander.intel.questions.list.first')}
      </div>
    </div>
    <div class="question-item" class:disabled={intel < 2}>
      <div class="question-item-header">
        {@html foundryAdapter.localize('role.Commander.intel.questions.header', { intel: 2 })}
      </div>
      <div class="question-item-list">
        {@html foundryAdapter.localize('role.Commander.intel.questions.list.second')}
      </div>
    </div>
    <div class="question-item" class:disabled={intel < 3}>
      <div class="question-item-header">
        {@html foundryAdapter.localize('role.Commander.intel.questions.header', { intel: 3 })}
      </div>
      <div class="question-item-list">
        {@html foundryAdapter.localize('role.Commander.intel.questions.list.third')}
      </div>
    </div>
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

  .questions-container {
    grid-column: 1 / 3;
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: flex-start;
    gap: 0.5rem;
    padding-top: 1rem;
  }

  .question-item {
    color: var(--band-of-blades-sheets-font-primary-color);
    font-size: 1rem;
    &.disabled {
      color: var(--band-of-blades-sheets-font-tertiary-color) !important;
    }
  }

</style>