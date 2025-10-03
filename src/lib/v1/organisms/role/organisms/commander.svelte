<script lang="ts">
  import Pressure from "../molecules/commander/pressure.svelte";
  import Intel from "../molecules/commander/intel.svelte";
  import Time from "../molecules/commander/time.svelte";
  import Notes from "src/lib/v1/molecules/notes.svelte";
  import { getRoleSheetContext } from "src/lib/v1/organisms/role/role.context";
  import { type IMarshalActions, type IRole } from "src/types/roles.type";

  const context = $derived(getRoleSheetContext() as IRole & IMarshalActions);
  const { tab } = $props();

  let enrichedPromise = $derived(
    foundry.applications.ux.TextEditor.enrichHTML()
  );
</script>

<div class="main">
  {#if tab === 0}
    <Time />
    <Pressure />
    <Intel />
  {/if}
  {#if tab === 1}
    {#await enrichedPromise then enriched}
      <Notes
          documentUuid={context._id}
          content={context.notes}
          editorOptions={{ toggled: false }}
          manageSecrets={true}
          field="system.notes"
          onSave={() => context.actions.editNotes()}
          {enriched}
      />
    {/await}
  {/if}
</div>

<style lang="scss">
  .main {
    position: relative;
    height: 100%;

    display: grid;
    grid-template-rows: auto 1fr;
    align-items: flex-start;

    gap: 1rem;
    padding: 1rem;

    &:after,
    &:before {
      border-radius: inherit;
      content: '';
      position: absolute;
      z-index: -1;
    }
  }
</style>