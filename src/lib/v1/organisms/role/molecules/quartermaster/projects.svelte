<script lang="ts">
  import Project from "../../atoms/project.svelte";
  import { getRoleSheetContext } from "src/lib/v1/organisms/role/role.context";
  import type { IQuartermaster, IQuartermasterActions, IRole } from "src/types/roles.type";
  import type { IProject } from "src/types/roles.type.js";

  const context = $derived(getRoleSheetContext() as IRole & IQuartermaster & IQuartermasterActions);

  const onProjectChanged = (index: number, project: IProject, update: Record<string, string | number>) => {
    context.actions.updateProject({ ...project, ...update }, index);
  }
</script>

<div class="container">
  {#each context.projects as project, index}
    <Project
        onProjectChanged={(key, value) => onProjectChanged(index, project, { [key]: value })}
        project={project}
    />
  {/each}
</div>

<style>
  .container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem;
  }
</style>