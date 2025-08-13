<script lang="ts">
  import Marshal from "./organisms/marshal.svelte";
  let currentRole: 'marshal' = $state('marshal');
</script>

<main>
  <Marshal />
</main>

<style lang="scss">
  @use '../../../../app';

  main {
    overflow: hidden;
    display: flex;
    flex-direction: column;

    width: 100%;
    height: 800px;
    overflow-y: auto;
    background-color: var(--band-of-blades-sheets-background-primary-color);

    border-radius: 0 0 8px 8px;
    z-index: 1;
  }

</style>