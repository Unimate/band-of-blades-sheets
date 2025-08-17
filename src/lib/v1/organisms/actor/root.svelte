<script lang="ts">
  import Actor from "./organisms/actor.svelte";
  import Notes from "../../molecules/notes.svelte";
  import Navigation from "../../molecules/navigation.svelte";
  import { getActorSheetContext } from "src/lib/v1/organisms/actor/actor.context";

  let currentView: 'character' | 'notes' = $state('character');
  let context = $derived(getActorSheetContext());


  let enrichedPromise = $derived(
    foundry.applications.ux.TextEditor.enrichHTML()
  );

</script>

<div class="flags">
  <label class="flag primary">
    <span class="flag-substrate">
      <input type="radio" hidden bind:group={currentView} value="character">
      <i class="ra ra-double-team"></i>
    </span>
  </label>
  <label class="flag tertiary">
    <span class="flag-substrate">
      <input type="radio" hidden bind:group={currentView} value="notes">
      <i class="ra ra-book"></i>
    </span>
  </label>
</div>


<main>

  {#if currentView === 'character'}
    <Actor/>
  {/if}
  {#if currentView === 'notes'}
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
</main>

<style lang="scss">
  @use '../../../../app';

  main {
    overflow: hidden;
    display: flex;
    flex-direction: column;


    width: 100%;
    height: 800px;
    overflow-y: auto;
    background-color: var(--band-of-blades-sheets-background-primary-color);
    border-radius: 0 0 8px 8px;
    z-index: 1;
  }
</style>