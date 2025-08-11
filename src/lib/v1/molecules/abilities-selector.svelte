<script lang="ts">
  import { foundryAdapter } from "src/foundry/foundry.adapter";
  import { CLASSIFIED_ABILITIES } from "src/dictionaries/abilities";
  import { LegionnaireEnum, SpecialistEnum } from "src/types/actor.type";

  let { specialization, abilities, isOpen = $bindable(false), onconfirm, oncancel } = $props();

  let groups: ({ name: string, abilities: string[] })[] = $state([]);
  let selectedAbilities: string[] = $state([]);

  $effect(() => {
    if (isOpen) {
      const list = [{ name: specialization, abilities: CLASSIFIED_ABILITIES.get(specialization) as string[] }];

      if (specialization !== LegionnaireEnum.Rookie) {
        list.push({ name: 'common', abilities: CLASSIFIED_ABILITIES.get('common') as string[] });
        for (const [key, value] of CLASSIFIED_ABILITIES.entries()) {
          if (key !== 'common' && key !== specialization) {
            list.push({ name: key, abilities: value });
          }
        }
      }

      groups = list;

      let calculation: { name: string, specialization: string }[] = abilities
        .map((origin: { name: string; specialization: string; }) =>
          ({ name: origin.name, specialization: origin.specialization })
        );

      if (specialization === SpecialistEnum.Medic) {
        calculation = calculation.filter((ability) => ability.name !== 'attache');
      }

      const commonAbilitiesCounter: Record<string, number> = {};

      for (let i = 0; i < calculation.length; i++) {
        const ability = calculation[i];
        if (ability.specialization === 'common') {
          if (commonAbilitiesCounter[ability.name] === undefined) {
            commonAbilitiesCounter[ability.name] = 0;
          }
          const update = `${ability.name}-${commonAbilitiesCounter[ability.name]}`;
          commonAbilitiesCounter[ability.name]++;
          calculation[i].name = update;
        }
      }

      selectedAbilities = calculation.map((c) => c.name);
    }
  });

  const handleConfirm = () => {
    if (specialization === SpecialistEnum.Medic) {
      onconfirm?.(['attache', ...selectedAbilities]);
    } else {
      onconfirm?.([...selectedAbilities]);
    }
    closeModal();
  }

  const handleCancel = () => {
    oncancel?.();
    closeModal();
  }

  const closeModal = () => {
    isOpen = false;
  }

  const selectAbility = (ability: string) => {
    if (selectedAbilities.includes(ability)) {
      selectedAbilities = selectedAbilities.filter(a => a !== ability)
    } else {
      selectedAbilities.push(ability);
    }
  }
</script>

{#if isOpen}
  <div class="modal-backdrop">
    <div class="modal-content">
      <div class="modal-header">
        <div class="modal-title">{foundryAdapter.localize('select.abilities')}</div>
        <button class="close-button" onclick={handleCancel}>×</button>
      </div>

      <div class="modal-body">
        <div class="items-list">
          {#each groups as group}
            <div class="group-header">{foundryAdapter.localize(`specialization.${group.name}.name`)}</div>
            {#if group.name === 'common'}
              {#each group.abilities as ability, index}
                <div class="item item-multiplied">
                  <input
                    type="checkbox"
                    hidden
                    checked={selectedAbilities.includes(`${ability}-0`)}
                    id={'item-' + ability + '-' + index + '-0'}
                    onclick={() => selectAbility(`${ability}-0`)}
                  />
                  <label for={'item-' + ability + '-' + index + '-0'}></label>
                  <input
                    type="checkbox"
                    hidden
                    checked={selectedAbilities.includes(`${ability}-1`)}
                    id={'item-' + ability + '-' + index + '-1'}
                    onclick={() => selectAbility(`${ability}-1`)}
                  />
                  <label for={'item-' + ability + '-' + index + '-1'}></label>
                  <span>
                    <span class="item-name">{foundryAdapter.localize(`abilities.${group.name}.${ability}.name`)}</span>
                    <span class="item-description">{@html foundryAdapter.localize(`abilities.${group.name}.${ability}.description`)}</span>
                  </span>
                </div>
              {/each}
              {:else}
              {#each group.abilities as ability, index}
                <div class="item">
                  <input
                    type="checkbox"
                    hidden
                    checked={selectedAbilities.includes(ability) || (specialization === SpecialistEnum.Medic && ability === 'attache')}
                    id={'item-' + ability + '-' + index}
                    onclick={() => selectAbility(ability)}
                    disabled={(specialization === SpecialistEnum.Medic && ability === 'attache')}
                  />
                  <label for={'item-' + ability + '-' + index}></label>
                  <span>
                    <span class="item-name">{foundryAdapter.localize(`abilities.${group.name}.${ability}.name`)}</span>
                    <span class="item-description">{@html foundryAdapter.localize(`abilities.${group.name}.${ability}.description`)}</span>
                  </span>
                </div>
              {/each}
            {/if}
          {/each}
        </div>
      </div>

      <div class="modal-footer">
        <button class="button button--secondary" onclick={handleCancel}>
          {foundryAdapter.localize('cancel')}
        </button>
        <button class="button" onclick={handleConfirm}>
          {foundryAdapter.localize('confirm')}
        </button>
      </div>
    </div>
  </div>
{/if}

<style>
  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: oklch(from var(--band-of-blades-sheets-background-secondary-color) l c h / calc(alpha - 0.5));
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }

  .modal-content {
    background: var(--band-of-blades-sheets-background-primary-color);
    border-radius: 8px;
    box-shadow: 0 10px 25px oklch(from var(--band-of-blades-sheets-background-secondary-color) l c h / calc(alpha - 0.8));;
    max-width: 650px;
    width: 90%;
    max-height: 80vh;
    display: flex;
    flex-direction: column;
  }

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.25rem 1.5rem 1rem;
    border-bottom: 1px solid var(--band-of-blades-sheets-border-secondary-color);

    .modal-title {
      margin: 0;
      padding: 0 0 0.125rem;
      font-size: 1.5rem;
      font-weight: normal;
      font-family: var(--band-of-blades-sheets-font-vinque), Arial, sans-serif;
      color: var(--band-of-blades-sheets-font-primary-color);
    }
  }

  .modal-footer {
    padding: 20px;
    border-top: 1px solid var(--band-of-blades-sheets-border-secondary-color);
    display: flex;
    gap: 12px;
    justify-content: flex-end;
  }

  .close-button {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: var(--band-of-blades-sheets-font-tertiary-color);
    padding: 0;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
  }

  .close-button:hover {
    background-color: oklch(from var(--band-of-blades-sheets-font-tertiary-color) l c h / calc(alpha - 0.8));
  }

  .modal-body {
    flex: 1;
    overflow-y: auto;
    padding: 1.25rem 1.5rem;
  }

  .items-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    overflow: hidden;
  }

  .group-header {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 0.5rem;

    padding: 0.5rem;
    background-color: var(--band-of-blades-sheets-background-secondary-color);

    color: var(--band-of-blades-sheets-font-secondary-color);
    font-family: var(--band-of-blades-sheets-font-vinque), Arial, sans-serif;
    font-size: 1.5rem;

    border-radius: 4px 4px 0 0;
  }

  .item {
    cursor: pointer;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;

    font-size: 1rem;
    color: var(--band-of-blades-sheets-font-primary-color);

    .item-name {
      font-size: 1rem;
      font-weight: bold;
    }

    .item-description {
      font-size: 0.875rem;
    }

    input[type="checkbox"]:checked + label {
      &:before {
        background-color: var(--band-of-blades-sheets-primary-highlight-color);
      }
    }

    input[type="checkbox"]:checked:disabled + label {
      &:before {
        background-color: var(--band-of-blades-sheets-background-tertiary-color);
      }
    }

    label {
      &:before {
        cursor: pointer;
        content: '';
        border: 2px solid var(--band-of-blades-sheets-border-primary-color);
        position: relative;
        display: flex;
        min-width: 12px;
        width: 12px;
        height: 12px;
        margin: 3px 0.25rem 0.25rem;
      }
    }
  }
</style>