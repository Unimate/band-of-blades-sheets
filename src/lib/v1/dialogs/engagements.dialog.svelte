<script lang="ts">
  import { foundryAdapter } from "src/foundry/foundry.adapter";
  import { getDialogContext } from "src/lib/v1/dialogs/dialog.context";
  import { type IActions, type IBonus, type IBonusAttributes, type IBonuses, type IDices } from "src/types/dices.type";
  import { CHOSEN } from "src/dictionaries/bonuses";

  let context = $derived(getDialogContext() as {
    dices: IDices,
    actions: IActions,
    bonuses: IBonuses
  });

  const missions = ['assault', 'recon', 'religious', 'supply'];

  let isLegionLoyal = $state(false);
  let isCommanderSpendIntel = $state(false);
  let isNoRookies = $state(false);
  let isAnyRebels = $state(false);
  let isPositive = $state(false);
  let isNegative = $state(false);


  let selected: string[] = $state([]);

  let modifier = $state(0);
  let mission = $state('assault');

  let total = $derived.by(() => {
    let count = 0;

    if (isLegionLoyal) {
      count++;
    }

    if (isCommanderSpendIntel) {
      count++;
    }

    if (isNoRookies) {
      count++;
    }

    if (isAnyRebels) {
      count--;
    }

    if (isPositive) {
      count++;
    }

    if (isNegative) {
      count--;
    }

    selected.forEach((el: string) => {
      if (CHOSEN[el] !== undefined) {
        count = count + Number((CHOSEN[el] as IBonusAttributes).bonus);
      }
    })

    return count + modifier;
  });

  const onHide = (entity: IBonus) => {
    setTimeout(() => {
      selected = selected.filter((value: string) => value !== entity.ability);
    }, 0);
  };

  const confirmRoll = () => {
    console.log(total);
    // context.actions.confirm(total);
  }
</script>

<div class="band-of-blades-sheets roll-dialog">

  <div class="roll-dialog-section">
    <div class="roll-dialog-section-title">{foundryAdapter.localize('mission.title')}</div>
    <div class="roll-dialog-section-options">
      {#each missions as item}
        <label class="roll-dialog-section-option">
          <input hidden name="position" type="radio" value={item} bind:group={mission}/>
          <span>{foundryAdapter.localize(`mission.${item}.name`)}</span>
        </label>
      {/each}
    </div>
  </div>

  <div class="roll-dialog-section-header">{foundryAdapter.localize('mission.common.name')}:</div>

  <div class="roll-dialog-section">
    <div class="roll-dialog-section-title">
      <span>{@html foundryAdapter.localize('mission.common.questions.loyal')}</span>
    </div>
    <div class="roll-dialog-section-options as-single">
      <label class="roll-dialog-section-option">
        <input
            hidden
            type="checkbox"
            value={isLegionLoyal}
            onclick={() => isLegionLoyal = !isLegionLoyal}
        />
        <span>1d6</span>
      </label>
    </div>
  </div>

  <div class="roll-dialog-section">
    <div class="roll-dialog-section-title">
      <span>{@html foundryAdapter.localize('mission.common.questions.intel_spent')}</span>
    </div>
    <div class="roll-dialog-section-options as-single">
      <label class="roll-dialog-section-option">
        <input
            hidden
            type="checkbox"
            value={isCommanderSpendIntel}
            onclick={() => isCommanderSpendIntel = !isCommanderSpendIntel}
        />
        <span>1d6</span>
      </label>
    </div>
  </div>

  <div class="roll-dialog-section">
    <div class="roll-dialog-section-title">
      <span>{@html foundryAdapter.localize('mission.common.questions.no_rookies')}</span>
    </div>
    <div class="roll-dialog-section-options as-single">
      <label class="roll-dialog-section-option">
        <input
            hidden
            type="checkbox"
            onclick={() => isNoRookies = !isNoRookies}
            value={isNoRookies}
        />
        <span>1d6</span>
      </label>
    </div>
  </div>

  <div class="roll-dialog-section">
    <div class="roll-dialog-section-title">
      <span>{@html foundryAdapter.localize('mission.common.questions.any_rebels')}</span>
    </div>
    <div class="roll-dialog-section-options as-single">
      <label class="roll-dialog-section-option">
        <input
            hidden
            type="checkbox"
            value={isAnyRebels}
            onclick={() => isAnyRebels = !isAnyRebels}
        />
        <span>-1d6</span>
      </label>
    </div>
  </div>

  <hr>

  <div class="roll-dialog-section-header">{foundryAdapter.localize(`mission.${mission}.name`)}:</div>

  <div class="roll-dialog-section">
    <div class="roll-dialog-section-title">
      <span>{@html foundryAdapter.localize(`mission.${mission}.questions.positive`)}</span>
    </div>
    <div class="roll-dialog-section-options as-single">
      <label class="roll-dialog-section-option">
        <input
            hidden
            type="checkbox"
            value={isPositive}
            onclick={() => isPositive = !isPositive}
        />
        <span>1d6</span>
      </label>
    </div>
  </div>

  <div class="roll-dialog-section">
    <div class="roll-dialog-section-title">
      <span>{@html foundryAdapter.localize(`mission.${mission}.questions.negative`)}</span>
    </div>
    <div class="roll-dialog-section-options as-single">
      <label class="roll-dialog-section-option">
        <input
            hidden
            type="checkbox"
            onclick={() => isNegative = !isNegative}
            value={isNegative}
        />
        <span>-1d6</span>
      </label>
    </div>
  </div>

  {#if context.bonuses.group.size > 0}
    {#each context.bonuses.group as [key, entity]}
      {#if entity.bonus.position === undefined || entity.bonus.position === mission}
        <div class="roll-dialog-section">
          <div class="roll-dialog-section-title">
            <div class="roll-dialog-source">
              {foundryAdapter.localize(`${entity.name}.${entity.key}.name`)}
            </div>
            <div class="roll-dialog-source">
              {foundryAdapter.localize(`abilities.${entity.key}.${entity.ability}.name`)}
            </div>
          </div>
          <div class="roll-dialog-section-options as-single">
            <label class="roll-dialog-section-option">
              <input hidden type="checkbox" value={entity.ability} bind:group={selected}/>
              <span>{entity.bonus.bonus}d6</span>
            </label>
          </div>
        </div>
      {:else}
        { onHide(entity) }
      {/if}
    {/each}
  {/if}

  {#if context.dices.bonus > 0}
    <div class="roll-dialog-section">
      <div class="roll-dialog-section-title">{foundryAdapter.localize('dialog.roll.bonus.title')}</div>
      <div class="roll-dialog-section-description">{context.dices.bonus}d6</div>
    </div>
  {/if}

  <div class="roll-dialog-section">
    <div class="roll-dialog-section-title">{foundryAdapter.localize('dialog.roll.modifier.title')}</div>
    <div class="roll-dialog-section-description">
      <select class="select" bind:value={modifier}>
        <option value={-3}>-3d6</option>
        <option value={-2}>-2d6</option>
        <option value={-1}>-1d6</option>
        <option value={0} selected>0d6</option>
        <option value={1}>1d6</option>
        <option value={2}>2d6</option>
        <option value={3}>3d6</option>
      </select>
    </div>
  </div>

  <hr>

  <div class="roll-dialog-control">
    <button class="button" onclick={() => confirmRoll()}>{foundryAdapter.localize('roll')} ({total}d6)</button>
  </div>
</div>

<style lang="scss">
  @use '../../../app';

  .window-content {
    padding: 0;

    .dialog-form {
      gap: 0;
    }

    .form-footer {
      padding: 0.5rem;
      background-color: var(--band-of-blades-sheets-background-primary-color);
    }
  }

  .roll-dialog {
    min-width: 100%;
    overflow: hidden;
    display: grid;
    padding: 0.75rem 1.25rem 1rem;
    border-radius: 0 0 8px 8px;
    gap: 1rem;
    background-color: var(--band-of-blades-sheets-background-primary-color);
  }

  .roll-dialog-section-header {
    font-size: 1rem;
    font-weight: bold;
    color: var(--band-of-blades-sheets-font-primary-color);
    font-family: var(--band-of-blades-sheets-font-vinque), Arial, sans-serif;
  }

  .roll-dialog-section {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
  }

  .roll-dialog-title,
  .roll-dialog-section-title,
  .roll-dialog-section-description {
    font-family: var(--band-of-blades-sheets-font-roboto-condensed), serif;
    font-size: 0.875rem;
    color: var(--band-of-blades-sheets-font-primary-color);
  }

  .roll-dialog-section-title {
    display: inline-flex;
    gap: 0.5rem;
    justify-content: flex-start;
    align-items: center;
  }

  .roll-dialog-source {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    font-family: var(--band-of-blades-sheets-font-vinque), serif;
    font-size: 0.875rem;
    color: var(--band-of-blades-sheets-font-secondary-color);
    background-color: var(--band-of-blades-sheets-background-secondary-color);
    padding: 0.125rem 0.5rem;
  }

  .roll-dialog-section-options {
    display: inline-flex;
    justify-content: flex-end;
    align-items: center;
    gap: 0.5rem;
  }

  .roll-dialog-section-option {
    cursor: pointer;

    span {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.25rem;

      font-family: var(--band-of-blades-sheets-font-roboto-condensed), serif;
      font-size: 0.875rem;
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
    }

    input[type="checkbox"]:checked + span,
    input[type="radio"]:checked + span {
      font-weight: bold;

      &:before {
        background-color: var(--band-of-blades-sheets-primary-highlight-color);
      }
    }
  }

  .roll-dialog-section-description {
    justify-self: flex-start;
    font-weight: bold;
  }

  .roll-dialog-control {
    width: 100%;
    display: flex;

    .button {
      width: 100%;
    }
  }

  hr {
    background-color: var(--band-of-blades-sheets-background-secondary-color);
    background-image: unset;
    color: var(--band-of-blades-sheets-font-primary-color);
    width: 100%;
    align-self: center;
    justify-self: center;
    height: 1px;
    margin: 0.25rem;
  }
</style>