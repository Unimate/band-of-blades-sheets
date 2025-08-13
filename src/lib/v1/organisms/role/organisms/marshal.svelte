<script lang="ts">
  import Squads from "../molecules/marshal/squads.svelte";
</script>

<div class="main">
  <Squads />
</div>

<style>
  .main {
    position: relative;
    height: 100%;

    display: grid;
    align-items: flex-start;

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
</style>