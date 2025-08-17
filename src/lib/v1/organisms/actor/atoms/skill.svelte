<script lang="ts">
  import { foundryAdapter } from "src/foundry/foundry.adapter";
  import { getActorSheetContext } from "src/lib/v1/organisms/actor/actor.context";
  import type { IActor } from "src/types/actor.type";
  import type { IActions } from "src/types/actions.type";

  let { value, limit, label, onSkillRoll, onSkillUpdate, disabled } = $props();
  let context = $derived(getActorSheetContext() as IActor & IActions);

  const handleItemUpdate = (update: number) => {
    typeof onSkillUpdate === 'function' && onSkillUpdate(value === update ? 0 : update);
  }


</script>

<li class="skill-item">
  <button
    class="skill-name"
    disabled={disabled}
    onclick={() => onSkillRoll()}
  >
    {foundryAdapter.localize(label)}
  </button>
  <div class="skill-progress">
    {#each { length: 4 }, level}
      {@const ephemeral = 4 - level}
      <input
          onclick={() => handleItemUpdate(ephemeral)}
          name={label}
          id={context._id + '-' + label + '-' + level}
          type="checkbox"
          hidden
          value={ephemeral}
          checked={value === ephemeral}
          disabled={ephemeral > limit}
      >
      <label for={context._id + '-' + label + '-' + level} class="skill-point" class:last={ephemeral === 4}></label>
    {/each}
  </div>
</li>

<style>
  .skill-progress {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: row-reverse;
    gap: 0.5rem;
  }

  input[type="checkbox"]:checked ~ .skill-point {
    background-color: var(--band-of-blades-sheets-background-secondary-color);
    border-color: var(--band-of-blades-sheets-border-primary-color);
  }

  .skill-point {
    cursor: pointer;
    display: flex;
    width: 10px;
    height: 10px;
    background-color: var(--band-of-blades-sheets-background-tertiary-color);
    border: 2px solid var(--band-of-blades-sheets-background-tertiary-color);
    transform: rotate(45deg);
    &.last {
      background-color: var(--band-of-blades-sheets-background-primary-color);
    }
  }

  .skill-name {
    cursor: pointer;
    display: inline-flex;
    justify-content: flex-end;
    min-height: unset;
    height: unset;

    border: none;
    background-color: transparent;
    color: var(--band-of-blades-sheets-font-primary-color);
    font-size: 1rem;
    outline: none;
    box-shadow: unset;

    transition: color 75ms ease-in-out;
    &:hover {
      color: var(--band-of-blades-sheets-primary-highlight-color);
    }

    &:disabled {
      cursor: default;
      pointer-events: none;
    }
  }

  .skill-item {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 0.5rem;
  }
</style>