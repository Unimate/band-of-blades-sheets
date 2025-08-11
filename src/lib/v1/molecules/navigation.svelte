<script>
  const { changed } = $props();
</script>

<nav>
  <button onclick={() => changed('character')} class="navigation-button ra ra-crossed-axes" aria-label="character"></button>
  <button onclick={() => changed('notes')} class="navigation-button ra ra-book" aria-label="notes"></button>
</nav>

<style>
  nav {
    position: absolute;
    top: 25%;
    right: -34px;
    width: 34px;

    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    overflow: hidden;

    .navigation-button {
      position: relative;
      left: -2px;
      width: 34px;
      height: 32px;
      background-color: var(--band-of-blades-sheets-background-secondary-color);
      color: var(--band-of-blades-sheets-primary-highlight-color);;
      border: 1px solid var(--band-of-blades-sheets-border-tertiary-color);
      outline: none;

      &:hover {
        color: var(--band-of-blades-sheets-font-secondary-color);
      }
    }
  }
</style>