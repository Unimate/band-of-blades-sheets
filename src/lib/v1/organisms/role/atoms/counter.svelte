<script lang="ts">
  import { isItDigit, isItServiceKey } from "src/utils";

  let supply = $state(0);

  const onInput = (e: any) => {
    if (!(isItServiceKey(e) || isItDigit(e.key))) {
      e.preventDefault();
      return false;
    }
  }

  const moveSuppliesCounter = (direction: 'up' | 'down') => {
    updateSupplies(direction === 'up' ? supply + 1 : supply - 1);
  }

  const updateSupplies = (next: number | string) => {
    const number = Number(next);
    const value = Number.isNaN(number) ? 0 : number;
    supply = value < 0 ? 0 : value;
    console.log(supply);
  }
</script>

<div class="counter">
  <button class="button control-button" onclick={() => moveSuppliesCounter("down")}>-</button>
  <input class="control-input" type="text" pattern="^-?\d+$" onkeydown={onInput} onblur={() => updateSupplies(supply)} bind:value={supply}/>
  <button class="button control-button" onclick={() => moveSuppliesCounter("up")}>+</button>
</div>

<style lang="scss">
  .counter {
    min-width: 152px;
    min-height: 48px;

    display: grid;
    grid-template-columns: 44px 56px 44px;
    gap: 0.125rem;
    padding: 0.125rem;
    border-radius: 4px;
    background-color: var(--band-of-blades-sheets-background-secondary-color);

    .control-button {
      width: 44px;
      height: 44px;

      display: flex;
      padding: 0;
      margin: 0;
      align-items: center;
      justify-content: center;

      font-size: 1.25rem;

      font-family: var(--band-of-blades-sheets-font-vinque), Arial, sans-serif;
    }

    .control-input {
      width: 56px;
      height: 44px;

      display: inline-flex;
      justify-content: flex-end;
      align-items: center;
      text-align: end;

      background-color: transparent;
      color: var(--band-of-blades-sheets-font-secondary-color);

      padding: 0 1.25rem 0 0;

      font-size: 1.25rem;
      font-family: var(--band-of-blades-sheets-font-vinque), Arial, sans-serif;
    }
  }
</style>