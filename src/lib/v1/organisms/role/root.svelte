<script lang="ts">
  import Information from "./molecules/information.svelte";
  import Marshal from "./organisms/marshal.svelte";
  import Quartermaster from "./organisms/quartermaster.svelte";
  import { getRoleSheetContext } from "src/lib/v1/organisms/role/role.context";
  import { type IMarshalActions, type IRole, RoleSpecialization } from "src/types/roles.type";
  import { foundryAdapter } from "src/foundry/foundry.adapter";
  import { TABS } from "src/dictionaries/tabs";

  const context = $derived(getRoleSheetContext() as IRole & IMarshalActions);

  const openSelector = (e: string) => {
    console.log(e);
  }

  const tabs = $derived.by(() => {
    if (context.character.specialization === null) return [];
    return (TABS[context.character.specialization] as { priority: string; icon: string; }[]) ?? [];
  });

  const rollEngagements = () => {
    context.actions.rollEngagements();
  }

  let tab: number = $state(0);
</script>

<div class="flags">
  {#each tabs as element, index}
    <label class={["flag", element.priority]}>
    <span class="flag-substrate">
      <input type="radio" hidden bind:group={tab} value={index}>
      <i class={["ra", element.icon]}></i>
    </span>
    </label>
  {/each}
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
  {#if context.character.specialization === RoleSpecialization.Marshal}
    <Marshal tab={tab} />
  {/if}
  {#if context.character.specialization === RoleSpecialization.Quartermaster}
    <Quartermaster tab={tab} />
  {/if}
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