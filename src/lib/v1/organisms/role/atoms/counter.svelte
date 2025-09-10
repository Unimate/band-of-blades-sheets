<script lang="ts">
  import { isItDigit, isItServiceKey } from "src/utils";
  import { foundryAdapter } from "src/foundry/foundry.adapter";

  let { value = $bindable(), limit = 0 } = $props();


  const onInput = (e: any) => {
    if (!(isItServiceKey(e) || isItDigit(e.key))) {
      e.preventDefault();
      return false;
    }
  }

  const moveCounter = (direction: 'up' | 'down') => {
    update(direction === 'up' ? value + 1 : value - 1);
  }

  const update = (next: number | string) => {
    const number = Number(next);
    const update = Number.isNaN(number) ? 0 : number;
    if (limit !== 0 && update > limit) return;
    value = update < 0 ? 0 : update;
  }
</script>

<div class="counter">
  <button class="button control-button" onclick={() => moveCounter("down")}>-</button>
  <input class="control-input" type="text" pattern="^-?\d+$" onkeydown={onInput} onblur={() => update(value)} bind:value={value}/>
  <button class="button control-button" onclick={() => moveCounter("up")}>+</button>

  {#if limit > 0}
    <div class="control-limit">
      {foundryAdapter.localize(`counter.limit`)}
      {limit}
    </div>
  {/if}
</div>

<style lang="scss">
  .counter {
    position: relative;
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

    .control-limit {
      position: absolute;
      bottom: -50%;
      left: 0;
      width: 100%;

      display: flex;
      align-items: center;
      justify-content: flex-start;

      font-size: 1rem;
      color: var(--band-of-blades-sheets-font-primary-color);
    }
  }
</style>