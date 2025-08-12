<script lang="ts">
  import Information from '../molecules/information.svelte';
  import Skills from '../molecules/skills.svelte';
  import Injuries from '../molecules/injuries.svelte';
  import HarmAndSafety from '../molecules/harm-and-safety.svelte';
  import Load from '../molecules/load.svelte';
  import Abilities from '../molecules/abilities.svelte';
  import ItemsSelector from '../../molecules/items-selector.svelte';
  import SpecializationSelector from '../../molecules/specialization-selector.svelte';

  import { getActorSheetContext } from "src/lib/v1/actor/actor.context";
  import type { IActions } from "src/types/actions.type";
  import type { Heritage, IActor, Specialization, Trait } from "src/types/actor.type";
  import type { ILoadItem } from "src/types/loadout.type";
  import HeritageSelector from '../../molecules/heritage-selector.svelte';
  import AbilitiesSelector from '../../molecules/abilities-selector.svelte';
  import SquadSelector from '../../molecules/squad-selector.svelte';

  let context = $derived(getActorSheetContext() as IActor & IActions);

  let isItemSelectorOpen = $state(false);
  let isSpecializationSelectorOpen = $state(false);
  let isHeritageSelectorOpen = $state(false);
  let isAbilitiesSelectorOpen = $state(false);
  let isSquadSelectorOpen = $state(false);

  const loadLimit = $derived.by(() => {
    let value = context.load.limit;
    for (let item of context.load.items) {
      if (item.primary.label === 'utility_mark_2') {
        value += 2;
      }
      if (item.primary.label === 'utility_mark_1') {
        value += 1;
      }
    }
    return value;
  });

  const heritageLimit = $derived.by(() => {
    return context.abilities.list.find(({ name }: { name: string }) => name === 'every_inch_a') ? 4 : 2;
  })

  const confirmItemsSelection = (items: ILoadItem[]) => {
    context.actions.selectItems(items);
    isItemSelectorOpen = false;
  }

  const confirmSpecializationSelection = (value: Specialization) => {
    context.actions.selectSpecialization(value);
    isSpecializationSelectorOpen = false;
  }

  const confirmHeritageSelection = (heritage: Heritage, trait: Trait) => {
    context.actions.selectHeritage(heritage, trait);
    isHeritageSelectorOpen = false;
  }

  const confirmAbilitiesSelection = (abilities: string[]) => {
    context.actions.selectAbilities(abilities);
    isAbilitiesSelectorOpen = false;
  }

  const confirmSquadSelection = (squad: string) => {
    context.actions.selectSquad(squad);
    isSquadSelectorOpen = false;
  }

  const openSelector = (selector: 'heritage' | 'specialization' | 'items' | 'abilities' | 'squad') => {
    switch (selector) {
      case 'heritage': {
        isHeritageSelectorOpen = true;
        break;
      }
      case 'specialization': {
        isSpecializationSelectorOpen = true;
        break;
      }
      case 'items': {
        isItemSelectorOpen = true;
        break;
      }
      case 'abilities': {
        isAbilitiesSelectorOpen = true;
        break;
      }
      case 'squad': {
        isSquadSelectorOpen = true;
        break;
      }
    }
  };

  const handleDrop = (...args: any[]) => {
    args[0].preventDefault();
  }

</script>


<div class="main" ondrop={handleDrop} role="main">
  <div class="container">
    <div class="information">
      <Information
          callSelect={(e) => openSelector(e)}
          squad={context.character.squad}
          image={context.character.image}
          name={context.character.name}
          heritage={context.character.heritage}
          traits={context.character.traits}
          specialization={context.character.specialization}
      />
    </div>
    <div class="injuries-and-safety">
      <Injuries/>
      <HarmAndSafety/>
    </div>
    <div class="load">
      {#if context.character.specialization !== null}
        <Load limit={loadLimit} callSelect={() => openSelector('items')}/>
      {/if}
    </div>
  </div>

  <div class="container">
    {#each context.skills as entity}
      <Skills entity={entity}/>
    {/each}
    {#if context.character.specialization !== null}
      <Abilities callSelect={() => openSelector('abilities')}/>
    {/if}
  </div>
</div>

<ItemsSelector
    isOpen={isItemSelectorOpen}
    items={context.load.selectable}
    selected={context.load.selected}
    limit={loadLimit}
    onconfirm={(items) => confirmItemsSelection(items)}
    oncancel={() => { isItemSelectorOpen = false; }}
/>

<SpecializationSelector
    specialization={context.character.specialization}
    isOpen={isSpecializationSelectorOpen}
    onconfirm={(e) => confirmSpecializationSelection(e)}
    oncancel={() => { isSpecializationSelectorOpen = false; }}
/>

<HeritageSelector
    heritage={context.character.heritage}
    traits={context.character.traits}
    isOpen={isHeritageSelectorOpen}
    limit={heritageLimit}
    onconfirm={(heritage, traits) => confirmHeritageSelection(heritage, traits)}
    oncancel={() => { isHeritageSelectorOpen = false; }}
/>

<AbilitiesSelector
    abilities={context.abilities.list}
    specialization={context.character.specialization}
    isOpen={isAbilitiesSelectorOpen}
    onconfirm={(e) => confirmAbilitiesSelection(e)}
    oncancel={() => { isAbilitiesSelectorOpen = false; }}
/>

<SquadSelector
    squad={context.character.squad}
    isOpen={isSquadSelectorOpen}
    onconfirm={(e) => confirmSquadSelection(e)}
    oncancel={() => { isSquadSelectorOpen = false; }}
/>

<style lang="scss">
  .main {
    position: relative;
    height: 100%;

    display: grid;
    grid-template-columns: auto 220px;
    gap: 0.5rem 1rem;
    padding: 0.125rem 1rem 1rem;

    &:after,
    &:before {
      border-radius: inherit;
      content: '';
      position: absolute;
      z-index: -1;
    }
  }

  .container {
    display: grid;
    align-content: flex-start;
    gap: 0.5rem;
  }

  .injuries-and-safety {
    display: grid;
    gap: 0.5rem;
  }
</style>