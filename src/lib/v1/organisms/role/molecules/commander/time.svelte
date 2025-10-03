<script lang="ts">
  import Clock from "src/lib/v1/atoms/clock.svelte";
  import { foundryAdapter } from "src/foundry/foundry.adapter";
  import { getRoleSheetContext } from "src/lib/v1/organisms/role/role.context";
  import type { IRole } from "src/types/roles.type";
  import type { ICommander } from "src/types/roles.type";
  import type { ICommanderActions } from "src/types/roles.type";

  const context = $derived(getRoleSheetContext() as IRole & ICommander & ICommanderActions);
</script>

<div class="container">
  <div class="header">
    <span>{foundryAdapter.localize(`role.Commander.time.name`)}</span>
    <p>{foundryAdapter.localize(`role.Commander.time.tip`)}</p>
  </div>

  <div class="description">
    <span>{@html foundryAdapter.localize('role.Commander.time.description')}</span>
  </div>

  <div class="time">
    <div class="clock-container">
      <div class="clock-item">
        <Clock
            size={context.timers.first.max}
            current={context.timers.first.current}
            onChange={(value) => context.actions.updateTimer('first', context.timers.first.max < value ? 0 : value)}
        />
        <div class="clock-description">
          <h3>{foundryAdapter.localize('role.Commander.time.first.title')}</h3>
          <p>{foundryAdapter.localize('role.Commander.time.first.description')}</p>
        </div>
      </div>
      <div class="clock-item">
        <Clock
            size={context.timers.second.max}
            current={context.timers.second.current}
            onChange={(value) => context.actions.updateTimer('second', context.timers.second.max < value ? 0 : value)}
        />
        <div class="clock-description">
          <h3>{foundryAdapter.localize('role.Commander.time.second.title')}</h3>
          <p>{foundryAdapter.localize('role.Commander.time.second.description')}</p>
        </div>
      </div>

      <Clock
          size={context.timers.third.max}
          current={context.timers.third.current}
          onChange={(value) => context.actions.updateTimer('third', context.timers.third.max < value ? 0 : value)}
      />

      <div class="substrate low"></div>
      <div class="substrate medium"></div>
      <div class="substrate high"></div>
    </div>
  </div>
</div>


<style lang="scss">
  .container {
    display: grid;
    align-items: flex-start;
    gap: 0.5rem 1rem;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.25rem .5rem;
    border-radius: 4px;
    background-color: var(--band-of-blades-sheets-background-secondary-color);

    span {
      font-family: var(--band-of-blades-sheets-font-vinque), Arial, sans-serif;
      color: var(--band-of-blades-sheets-font-secondary-color);
      font-size: 1rem;
      text-transform: uppercase;
    }

    p {
      color: var(--band-of-blades-sheets-font-secondary-color);
      font-size: 1rem;
      margin: 0;
      padding: 0;
    }
  }

  .description {
    font-family: var(--band-of-blades-sheets-font-vinque), Arial, sans-serif;
    color: var(--band-of-blades-sheets-font-primary-color);
    font-size: 1rem;
  }

  .time {
    position: relative;
    height: 40px;
    margin: 10px 0;
    --clock-size: 60px;
  }

  .clock-container {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
  }

  .clock-item {
    width: 100%;
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    gap: 1rem;
    z-index: 4;

    .clock-description {
      display: grid;
      gap: 0.25rem;

      h3,
      p {
        padding: 0;
        margin: 0;
        color: var(--band-of-blades-sheets-font-primary-color);
      }

      h3 {
        font-family: var(--band-of-blades-sheets-font-vinque), Arial, sans-serif;
        font-size: 1.25rem;
      }

      p {
        font-size: 1rem;
      }
    }
  }

</style>