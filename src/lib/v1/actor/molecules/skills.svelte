<script lang="ts">
  import Clock from '../atoms/clock.svelte';
  import Skill from '../atoms/skill.svelte'
  import { foundryAdapter } from 'src/foundry/foundry.adapter';
  import { getActorSheetContext } from "src/lib/v1/actor/actor.context";
  import type { IActor, ISkill, ISkills } from "src/types/actor.type";
  import type { IActions } from "src/types/actions.type";


  const { entity = $bindable() } = $props();
  let context = $derived(getActorSheetContext() as IActor & IActions);

  let isExpanded = $state(false);

  let [skills, expanded] = $derived.by(() => {
    let skills = [];
    let expanded = [];
    if (entity.label === 'specialist') {
      for (const skill of entity.skills) {
        if (skill.value > 0) {
          skills.push(skill);
        } else {
          expanded.push(skill);
        }
      }
    } else {
      skills = entity.skills;
    }
    return [skills, expanded];
  });

  const handleSavingThrow = (entity: ISkills) => {
    context.actions.roll(entity);
  }

  const handleSkillRoll = (item: ISkill) => {
    context.actions.roll(item);
  }

  const handleSkillUpdate = (entity: ISkills, item: ISkill, value: number) => {
    context.actions.updateSkill(entity.label, item.label, value);
  }
</script>

<div class="wrapper">
  <div class="skills-wrapper">
    <div class="skill-header">
      <button
        class="skill-header-button"
        onclick={() => handleSavingThrow(entity)}
        disabled={entity.label === 'specialist'}
      >
        {foundryAdapter.localize(entity.label)}
      </button>
      {#if expanded.length > 0}
        <button class="skill-expander" onclick={() => isExpanded = !isExpanded}>+</button>
      {/if}
    </div>
    <div class="skill-progress">
      <Clock size={6} current={entity.progress} onChange={() => context.actions.updateSkillProgress(6, entity.label)} />
    </div>
  </div>
  <div class="progress-circle"></div>

  <ul class="skill-list">
    {#each skills as item (item.label)}
      <Skill
        value={item.value}
        label={item.label}
        limit={item.limit}
        disabled={entity.label === 'specialist'}
        onSkillRoll={() => handleSkillRoll(item)}
        onSkillUpdate={(value) => handleSkillUpdate(entity, item, value)}
      />
    {/each}

    {#if isExpanded}
      {#each expanded as item (item.label)}
        <Skill
          value={item.value}
          label={item.label}
          limit={item.limit}
          onSkillUpdate={(value) => handleSkillUpdate(entity, item, value)}
        />
      {/each}
    {/if}
  </ul>
</div>

<style lang="scss">
  .wrapper {
    position: relative;
  }

  .skills-wrapper {
    position: relative;
    width: 100%;
    height: 32px;
  }

  .skill-expander {
    width: 16px;
    height: 16px;
    padding: 0;
    margin: 0;
    font-size: 0.25rem;
  }

  .skill-header {
    width: 100%;
    height: 32px;

    display: inline-flex;
    justify-content: flex-start;
    align-items: center;

    gap: 0.5rem;

    padding: 0 0 0 2rem;

    background-color: var(--band-of-blades-sheets-background-secondary-color);
    color: var(--band-of-blades-sheets-font-secondary-color);
    font-size: 1.25rem;

    border-radius: 0 4px 4px 0;

    clip-path: polygon(100% 0, 100% 100%, 0% 100%, 7.5% 50%, 0% 0%);

    span {
      font-family: var(--band-of-blades-sheets-font-vinque), Arial, sans-serif;
      padding-bottom: 4px;
    }

    .skill-header-button {
      font-size: 1.125rem;
      border: none;
      color: var(--band-of-blades-sheets-font-secondary-color);
      font-family: var(--band-of-blades-sheets-font-vinque), Arial, sans-serif;
      outline: none;
      box-shadow: unset;

      padding: 0 0 4px;
      margin: 0;

      &:disabled {
        pointer-events: none;
        cursor: default;
      }

      &:hover {
        background-color: transparent;
        color: var(--band-of-blades-sheets-primary-highlight-color);
      }
    }
  }

  .skill-progress {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: -12px;
  }

  .skill-list {
    padding: 0.5rem 0;
    margin: 0;
    color: var(--band-of-blades-sheets-font-primary-color);
    list-style: none;
  }
</style>