<script lang="ts">
  import Clock from "src/lib/v1/atoms/clock.svelte";
  import { onMount } from "svelte";

  const { project, onProjectChanged } = $props();

  const steps = [2, 3, 4, 5, 6, 8, 10, 12];

  let stepsForProject = $state(2);

  onMount(() => {
    stepsForProject = project.steps;
  });

  $effect(() => {
    if (stepsForProject !== project.steps) {
      onProjectChanged('steps', stepsForProject);
    }
  });

  const changeName = (event: FocusEvent) => {
    const value = (event.target as HTMLInputElement).value;
    onProjectChanged('name', value);

  }

  const changeDescription = (event: FocusEvent) => {
    const value = (event.target as HTMLInputElement).value;
    onProjectChanged('description', value);
  }

  const changeStep = (value: number) => {
    onProjectChanged('current', value);
  }

</script>


<div class="project">
  <div class="header-area">
    <input
        type="text"
        placeholder="Project Name"
        autocomplete="off"
        maxlength="20"
        onblur={changeName}
        value={project.name}
    />
  </div>
  <div class="description-area">
    <textarea onblur={changeDescription}>{project.description}</textarea>
  </div>
  <div class="control-area">
    <Clock size={project.steps} current={project.current} onChange={(value) => changeStep(value)}/>

    <select name="steps" class="select" bind:value={stepsForProject}>
      {#each steps as step}
        <option value={step}>{step}</option>
      {/each}
    </select>
  </div>
</div>

<style lang="scss">
  .project {
    display: grid;
    grid-template-columns: 1fr 130px;
    align-items: flex-start;
    align-content: flex-start;
    gap: 0.5rem;

    .header-area {
      padding: 0.125rem;
      border-radius: 4px;
      background-color: var(--band-of-blades-sheets-background-secondary-color);
      grid-column: 1 / 3;

      input {
        height: 42px;
        padding: 0 0.25rem;
        color: var(--band-of-blades-sheets-font-secondary-color);
        font-size: 1.125rem;
        background-color: transparent;

        &::placeholder {
          opacity: 0.5;
          color: var(--band-of-blades-sheets-font-secondary-color);
        }
      }
    }

    .control-area {
      display: grid;
      grid-template-columns: 1fr auto;
      justify-content: flex-start;
      align-items: center;
      gap: 0.5rem;
      --clock-size: 48px;
      .select {
        width: 70px;
      }
    }

    .description-area {
      textarea {
        width: 100%;
        background-color: transparent;
        border: 2px solid var(--band-of-blades-sheets-border-primary-color);
        border-radius: 4px;
        color: var(--band-of-blades-sheets-font-primary-color);
      }
    }
  }
</style>