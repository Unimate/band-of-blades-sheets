<script lang="ts">
  import Squads from "../molecules/marshal/squads.svelte";
  import Specialists from "../molecules/marshal/specialists.svelte";
  import Notes from "src/lib/v1/molecules/notes.svelte";
  import Morale from "../molecules/marshal/morale.svelte";
  import { getMarshalSheetContext } from "src/lib/v1/organisms/role/role.context";
  import { type IMarshalActions, type IRole } from "src/types/roles.type";


  let tab: 'squads' | 'specialists' | 'notes' = $state('squads');
  const context = $derived(getMarshalSheetContext() as IRole & IMarshalActions);


  let enrichedPromise = $derived(
    foundry.applications.ux.TextEditor.enrichHTML()
  );
</script>

<div class="flags">
  <label class="flag squads">
    <span class="flag-substrate">
      <input type="radio" hidden bind:group={tab} value="squads">
      <i class="ra ra-double-team"></i>
    </span>
  </label>
  <label class="flag specialists">
    <span class="flag-substrate">
      <input type="radio" hidden bind:group={tab} value="specialists">
      <i class="ra ra-large-hammer"></i>
    </span>
  </label>

  <label class="flag notes">
    <span class="flag-substrate">
      <input type="radio" hidden bind:group={tab} value="notes">
      <i class="ra ra-book"></i>
    </span>
  </label>
</div>

<div class="main">
  <Morale />
<!--  <div class="tabs">-->
<!--    <label class="tab">-->
<!--      <input type="radio" hidden bind:group={tab} value="squads"/>-->
<!--      <span>Squads</span>-->
<!--    </label>-->
<!--    <label class="tab">-->
<!--      <input type="radio" hidden bind:group={tab} value="specialists"/>-->
<!--      <span>Specialists</span>-->
<!--    </label>-->
<!--  </div>-->
  {#if tab === 'specialists'}<Specialists />{/if}
  {#if tab === 'squads'}<Squads />{/if}
  {#if tab === 'notes'}
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
  @use '../../../styles/tabs';

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

  .flags {
    position: absolute;
    top: 0;
    right: 12.5%;
    display: flex;
    gap: 0.5rem;
  }

  .flag {
    cursor: pointer;
    position: relative;
    display: flex;
    width: 30px;

    transition: color 75ms ease-in-out;

    input[type="radio"]:checked + i,
    &:hover {
      color: var(--band-of-blades-sheets-font-secondary-color) !important;
    }

    i {
      transform: scale(1.25);
    }

    &:after {
      content: "";
      position: absolute;
      width: calc(100% + 4px);
      height: calc(100% + 4px);
      top: calc(50% + 2px);
      left: 50%;
      transform :translate(-50%, -50%);
      clip-path: polygon(100% 0, 100% 100%, 50% 85%, 0 100%, 0 0);
      z-index: 1;
    }

    .flag-substrate {
      width: 100%;
      height: 100%;
      z-index: 2;
      clip-path: polygon(100% 0, 100% 100%, 50% 85%, 0 100%, 0 0);
      padding-top: 0.75rem;
      display: flex;
      align-items: flex-start;
      justify-content: center;
    }

    &.squads {
      height: 40px;
      color: oklch(from var(--band-of-blades-sheets-primary-highlight-color) calc(l - 0.2) c h);

      &:after {
        background-color: oklch(from var(--band-of-blades-sheets-primary-highlight-color) calc(l - 0.2) c h);
      }

      .flag-substrate {
        background-color: var(--band-of-blades-sheets-primary-highlight-color);
      }
    }

    &.specialists {
      height: 45px;
      color: oklch(from var(--band-of-blades-sheets-secondary-highlight-color) calc(l - 0.2) c h);

      &:after {
        background-color: oklch(from var(--band-of-blades-sheets-secondary-highlight-color) calc(l - 0.2) c h);
      }

      .flag-substrate {
        background-color: var(--band-of-blades-sheets-secondary-highlight-color);
      }
    }

    &.notes {
      height: 50px;
      color: oklch(from var(--band-of-blades-sheets-tertiary-highlight-color) calc(l - 0.2) c h);

      &:after {
        background-color: oklch(from var(--band-of-blades-sheets-tertiary-highlight-color) calc(l - 0.2) c h);
      }

      .flag-substrate {
        background-color: var(--band-of-blades-sheets-tertiary-highlight-color);
      }
    }

  }
</style>