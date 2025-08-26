<script lang="ts">
  import Clock from "../atoms/clock.svelte";

  import { foundryAdapter } from "src/foundry/foundry.adapter";
  import { getActorSheetContext } from "src/lib/v1/organisms/actor/actor.context.js";
  import { type IActor, type Specialization } from "src/types/actor.type";
  import { type IActions } from "src/types/actions.type";

  let context = $derived(getActorSheetContext() as IActor & IActions);

  const { callSelect } = $props();

  const linkEntity = (specialization: string, name: string) => {
    context.actions.linkEntityDescription(specialization as Specialization, name);
  }

</script>

<div class="wrapper">
  <div class="abilities-header">{foundryAdapter.localize('abilities.title')}</div>

  <ul class="abilities-list">
    {#each context.abilities.list as ability}
      <li class="ability">
        <span>{foundryAdapter.localize(`abilities.${ability.specialization}.${ability.name}.name`)}</span>
        <button class="control-button" onclick={() => linkEntity(ability.specialization, ability.name)} aria-label="link-to-chat">
          <i class="fas fa-comment"></i>
        </button>

        <div class="ability-tooltip">
          {@html foundryAdapter.localize(`abilities.${ability.specialization}.${ability.name}.description`)}
        </div>
      </li>
    {/each}
  </ul>

  <div class="control-panel">
    <button class="button" onclick={() => callSelect()}>{foundryAdapter.localize('manage_abilities')}</button>
  </div>

  <div class="ability-progress">
    <div class="ability-progress-container">
      <Clock size={8} current={context.abilities.progress} onChange={() => context.actions.updateAbilityProgress()}/>
    </div>
  </div>

</div>

<style lang="scss">
  .wrapper {
    position: relative;
    display: grid;
    background-color: var(--band-of-blades-sheets-background-tertiary-color);
    border-radius: 4px;

    padding: 0.5rem;

    .abilities-header {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      font-family: var(--band-of-blades-sheets-font-vinque), Arial, sans-serif;
      font-size: 1.5rem;
      color: var(--band-of-blades-sheets-font-primary-color);
    }
  }

  .abilities-list {
    margin: 0;
    padding: 3rem 0 1rem;

    list-style: none;
  }

  .ability {
    position: relative;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 0.875rem;
    gap: 0.5rem;
    color: var(--band-of-blades-sheets-font-primary-color);

    &:before {
      position: relative;
      content: '';
      width: 8px;
      height: 8px;
      background-color: var(--band-of-blades-sheets-background-primary-color);
      border: 1px solid var(--band-of-blades-sheets-border-primary-color);
      transform: rotate(45deg);
    }

    &:hover {
      .control-button {
        opacity: 1;
        visibility: visible;
      }

      .ability-tooltip {
        pointer-events: auto;
        opacity: 1;
        visibility: visible;
      }
    }

    .ability-tooltip {
      pointer-events: none;
      opacity: 0;
      position: absolute;
      bottom: 0;
      left: -220px;
      width: 200px;
      height: auto;
      background-color: var(--band-of-blades-sheets-background-tertiary-color);
      border-radius: 4px;
      padding: 0.5rem;
      border: 1px solid var(--band-of-blades-sheets-border-secondary-color);
      font-size: 0.75rem;;
      z-index: 1;
    }
  }

  .ability-progress {
    position: absolute;
    top: 0;
    right: 0.5rem;
    width: 45px;
    height: 75px;

    display: flex;
    align-items: flex-start;
    justify-content: center;

    clip-path: polygon(0 0, 100% 0, 100% 100%, 50% 75%, 0 100%);
    z-index: 2;

    &:after {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

      width: 102%;
      height: 102%;
      background-color: black;
      z-index: -1;
    }

    &-container {
      display: flex;
      align-items: flex-start;
      justify-content: center;

      margin-top: 1px;
      width: calc(100% - 2px);
      height: calc(100% - 3px);

      padding-top: 0.5rem;

      background-color: var(--band-of-blades-sheets-primary-highlight-color);
      clip-path: inherit;
    }
  }

  .control-panel {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .control-button {
    visibility: hidden;
    opacity: 0;
    cursor: pointer;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    width: 24px;
    height: 24px;
    min-height: 24px;
    background-color: transparent;

    color: var(--band-of-blades-sheets-font-primary-color);
  }

  .icon {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;


    img {
      position: absolute;
      width: 125%;
      height: 125%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
</style>