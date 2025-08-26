<script lang="ts">
  import Information from "./molecules/information.svelte";
  import Marshal from "./organisms/marshal.svelte";
  import { getMarshalSheetContext } from "src/lib/v1/organisms/role/role.context";
  import { type IMarshalActions, type IRole, RoleSpecialization } from "src/types/roles.type";
  import { foundryAdapter } from "src/foundry/foundry.adapter";
  const context = $derived(getMarshalSheetContext() as IRole & IMarshalActions);

  const openSelector = (e: string) => {
    console.log(e);
  }

  const rollEngagements = () => {
    context.actions.rollEngagements();
  }

  let tab: 'squads' | 'specialists' | 'notes' = $state('squads');
</script>

<div class="flags">
  <label class="flag primary">
    <span class="flag-substrate">
      <input type="radio" hidden bind:group={tab} value="squads">
      <i class="ra ra-double-team"></i>
    </span>
  </label>
  <label class="flag secondary">
    <span class="flag-substrate">
      <input type="radio" hidden bind:group={tab} value="specialists">
      <i class="ra ra-large-hammer"></i>
    </span>
  </label>

  <label class="flag tertiary">
    <span class="flag-substrate">
      <input type="radio" hidden bind:group={tab} value="notes">
      <i class="ra ra-book"></i>
    </span>
  </label>
</div>

<main>
  <div class="information">
    <Information
        callSelect={(e) => openSelector(e)}
        image={context.character.image}
        name={context.character.name}
        heritage={context.character.heritage}
        reputation={context.character.reputation}
        specialization={context.character.specialization}
    >
      {#if context.character.specialization === RoleSpecialization.Marshal}
        <button class="button button--capital" onclick={() => rollEngagements()}>
          {foundryAdapter.localize(`role.Marshal.engagements`)}
        </button>
      {/if}
    </Information>
  </div>
  <Marshal tab={tab} />
</main>

<style lang="scss">
  @use '../../../../app';
  @use '../../styles/tabs';

  .information {
    display: grid;
    grid-template-columns: auto 220px;
    gap: 0.5rem 1rem;
    padding: 0.125rem 1rem 0;
  }

  main {
    overflow: hidden;
    display: flex;
    flex-direction: column;

    width: 100%;
    height: 800px;
    overflow-y: auto;

    padding-top: 1.5rem;
    background-color: var(--band-of-blades-sheets-background-primary-color);

    border-radius: 0 0 8px 8px;
    z-index: 1;
  }

</style>