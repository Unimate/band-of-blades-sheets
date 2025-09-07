<script lang="ts">
  const { size, current, onChange } = $props();

  const change = (e: PointerEvent) => {
    if (e.button === 0) {
      onChange(current + 1);
    }
    if (e.button === 2) {
      onChange(current - 1);
    }
  }
</script>

<div class="wrapper">
  <button class="clock" style="--size: {size}; --filled: {current}" onclick={change} oncontextmenu={change}>
    {#each { length: size }, index}
      <div class="beam" style="--index: {index}"></div>
    {/each}
  </button>
</div>

<style>

  .wrapper {
    --size: 0;
    --filled: 2;
    --height: var(--clock-size, 34px);
  }

  .clock {
    cursor: pointer;
    width: var(--height);
    height: var(--height);
    align-self: center;
    aspect-ratio: 1 / 1;
    --bean-width: 2px;
    --filled-ratio: calc(var(--filled) / var(--size) * 1turn);
    background: conic-gradient(var(--band-of-blades-sheets-primary-highlight-color) var(--filled-ratio), var(--band-of-blades-sheets-background-primary-color) var(--filled-ratio) 0.25turn);
    border-radius: 50%;
    border: var(--bean-width) solid var(--band-of-blades-sheets-border-primary-color);
    position: relative;
  }

  .beam {
    width: var(--bean-width);
    height: calc(50% + .5 * var(--bean-width));
    top: calc(-.5 * var(--bean-width));
    right: calc(50% - var(--bean-width) / 2);

    background: black;
    position: absolute;

    transform-origin: center bottom;
    transform: rotate(calc((var(--index) * 1turn) / var(--size)));
  }
</style>