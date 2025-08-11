<script lang="ts">
  import { foundryAdapter } from "src/foundry/foundry.adapter";
  import { getDialogContext } from "src/lib/v1/dialogs/dialog.context";
  import { type IActions, type IBonus, type IBonuses, type IDices } from "src/types/dices.type";
  import { type ISkill, type ISkills, SkillCategoryLabel } from "src/types/actor.type";

  let context = $derived(getDialogContext() as {
    dices: IDices,
    actions: IActions,
    attribute: ISkills | ISkill,
    bonuses: IBonuses
  });

  const positions = ['controlled', 'risky', 'desperate'];
  const effects = ['limited', 'standard', 'great'];

  let selected: string[] = $state([]);

  let modifier = $state(0);
  let position = $state('risky');
  let effectivity = $state('standard');

  const isNotSavingThrow = $derived.by(
    () => !Object.values(SkillCategoryLabel).includes(context.attribute.label as SkillCategoryLabel)
  );

  let total = $derived.by(() => {
    return context.dices.basic + context.dices.bonus + modifier + selected.length;
  });

  const onShow = (entity: IBonus) => {
    setTimeout(() => {
      selected.push(entity.ability);
    }, 0);
  };
  const onHide = (entity: IBonus) => {
    setTimeout(() => {
      selected = selected.filter((value: string) => value !== entity.ability);
    }, 0);
  };

  const confirmRoll = () => {
    context.actions.confirm(total, position, effectivity);
  }
</script>

<div class="band-of-blades-sheets roll-dialog">

  {#if isNotSavingThrow}
    <div class="roll-dialog-section">
      <div class="roll-dialog-section-title">{foundryAdapter.localize('position.title')}</div>
      <div class="roll-dialog-section-options">
        {#each positions as item}
          <label class="roll-dialog-section-option">
            <input hidden name="position" type="radio" value={item} bind:group={position} />
            <span>{foundryAdapter.localize(`position.${item}`)}</span>
          </label>
        {/each}
      </div>
    </div>

    <div class="roll-dialog-section">
      <div class="roll-dialog-section-title">{foundryAdapter.localize('effect.title')}</div>
      <div class="roll-dialog-section-options">
        {#each effects as item}
          <label class="roll-dialog-section-option">
            <input hidden name="effect" type="radio" value={item} bind:group={effectivity}/>
            <span>{foundryAdapter.localize(`effect.${item}`)}</span>
          </label>
        {/each}
      </div>
    </div>
  {/if}

  {#if context.bonuses.group.size > 0}
    {#each context.bonuses.group as [key, entity]}
      <div class="roll-dialog-section">
        <div class="roll-dialog-section-title">
          {foundryAdapter.localize('dialog.help.title')}
          <div class="roll-dialog-source">
            {foundryAdapter.localize(`specialization.${entity.key}.name`)}
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
    {/each}
  {/if}

  {#snippet bonusTitleRow(entity)}
    <div class="roll-dialog-section-title">
      {foundryAdapter.localize('dialog.bonus.title')}
      <div class="roll-dialog-source">
        {foundryAdapter.localize(`abilities.${entity.key}.${entity.ability}.name`)}
      </div>
    </div>
  {/snippet}

  {#snippet bonusDiceRow(entity)}
    <label class="roll-dialog-section-option">
      {onShow(entity)}
      <input hidden type="checkbox" value={entity.ability} bind:group={selected}/>
      <span>{entity.bonus.bonus}d6</span>
    </label>
  {/snippet}

  {#snippet bonusPotencyRow(entity)}
    <label class="roll-dialog-section-option">
      {onShow(entity)}
      <input hidden type="checkbox" value={entity.ability} bind:group={selected}/>
      <span>{foundryAdapter.localize('potency')}</span>
    </label>
  {/snippet}

  {#if context.bonuses.personal.size > 0}
    {#each context.bonuses.personal as [key, entity]}
      {#if entity.bonus.minPosition === undefined}
        <div class="roll-dialog-section">
          {@render bonusTitleRow(entity)}
          <div class="roll-dialog-section-options as-single">
            {#if entity.bonus.bonus !== undefined}
              {@render bonusDiceRow(entity)}
            {/if}
            {#if entity.bonus.potency !== undefined}
              {@render bonusPotencyRow(entity)}
            {/if}
          </div>
        </div>
      {:else if entity.bonus.minPosition === position}
        <div class="roll-dialog-section">
          {@render bonusTitleRow(entity)}
          <div class="roll-dialog-section-options as-single">
            {@render bonusDiceRow(entity)}
          </div>
        </div>
        {:else}
        { onHide(entity) }
      {/if}
    {/each}
  {/if}

  {#if context.bonuses.heritage.size > 0}
    {#each context.bonuses.heritage as [key, entity]}
      <div class="roll-dialog-section">
        <div class="roll-dialog-section-title">
          {foundryAdapter.localize('dialog.heritage.title')}
          <div class="roll-dialog-source">
            {foundryAdapter.localize(`heritage.${entity.key}.traits.${entity.ability}.name`)}
          </div>
        </div>
        <div class="roll-dialog-section-options as-single">
          {#if entity.bonus.bonus !== undefined}
            {@render bonusDiceRow(entity)}
          {/if}
          {#if entity.bonus.potency !== undefined}
            {@render bonusPotencyRow(entity)}
          {/if}
        </div>
      </div>
    {/each}
  {/if}

  <div class="roll-dialog-section">
    <div class="roll-dialog-section-title">{foundryAdapter.localize('dialog.roll.basic.title')}</div>
    <div class="roll-dialog-section-description">{context.dices.basic}d6</div>
  </div>

  {#if context.dices.bonus > 0}
    <div class="roll-dialog-section">
      <div class="roll-dialog-section-title">{foundryAdapter.localize('dialog.roll.bonus.title')}</div>
      <div class="roll-dialog-section-description">{context.dices.bonus}d6</div>
    </div>
  {/if}

  <div class="roll-dialog-section">
    <div class="roll-dialog-section-title">{foundryAdapter.localize('dialog.roll.modifier.title')}</div>
    <div class="roll-dialog-section-description">
      <select class="roll-dialog-select" bind:value={modifier}>
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

  .roll-dialog-section {
    display: flex;
    justify-content: space-between;
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

  .roll-dialog-select {
    width: 80px;
    background-color: var(--band-of-blades-sheets-background-primary-color);
    border: thin solid var(--band-of-blades-sheets-border-primary-color);
    border-radius: 4px;
    display: inline-block;
    font: inherit;
    padding: 0.25rem 2.75rem 0.25rem 0.5rem;
    text-align: end;

    color: var(--band-of-blades-sheets-font-primary-color);

    margin: 0;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-appearance: none;
    -moz-appearance: none;


    background-image: linear-gradient(45deg, transparent 50%, var(--band-of-blades-sheets-border-primary-color) 50%),
    linear-gradient(135deg, var(--band-of-blades-sheets-border-primary-color) 50%, transparent 50%),
    linear-gradient(to right, var(--band-of-blades-sheets-border-primary-color), var(--band-of-blades-sheets-border-primary-color));
    background-position: calc(100% - 20px) 13px,
    calc(100% - 15px) 13px,
    calc(100% - 34px) 5px;
    background-size: 5px 5px,
    5px 5px,
    1px 1.5em;
    background-repeat: no-repeat;


    &:focus {
      background-image: linear-gradient(45deg, var(--band-of-blades-sheets-primary-highlight-color) 50%, transparent 50%),
      linear-gradient(135deg, transparent 50%, var(--band-of-blades-sheets-primary-highlight-color) 50%),
      linear-gradient(to right, var(--band-of-blades-sheets-border-primary-color), var(--band-of-blades-sheets-border-primary-color));
      background-position: calc(100% - 15px) 13px,
      calc(100% - 20px) 13px,
      calc(100% - 34px) 5px;
      background-size: 5px 5px,
      5px 5px,
      1px 1.5em;
      background-repeat: no-repeat;
      border-color: var(--band-of-blades-sheets-border-primary-color);
      outline: 0;
    }


    &:-moz-focusring {
      color: transparent;
      text-shadow: 0 0 0 #000;
    }
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