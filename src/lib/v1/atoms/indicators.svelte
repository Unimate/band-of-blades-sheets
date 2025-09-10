<script lang="ts">
  const { id, onClick, label, total, limit = total, current, version = 'primary', className = '' } = $props();

  const handleValue = (ephemeral: number) => {
    if (typeof onClick !== 'function') return;
    let value = ephemeral;
    if (ephemeral === current) {
      value = 0;
    }
    onClick(value);
  }
</script>

<div class={['steps', version, className]}>
  {#each { length: total }, steps}
    {@const ephemeral = total - steps}
    <input
      onclick={() => handleValue(ephemeral)}
      type="checkbox"
      hidden
      id={id + '-' + label + '-' + steps}
      value={ephemeral}
      checked={current === ephemeral}
      disabled={ephemeral > limit}
    />
    <label class="point" for={id + '-' + label + '-' + steps} class:readonly={typeof onClick !== 'function'}></label>
  {/each}
</div>

<style lang="scss">
  .steps {
    display: flex;
    justify-content: flex-start;
    flex-direction: row-reverse;

    &.secondary {
      gap: 0.5rem;

      input[type="checkbox"]:disabled + .point {
        cursor: default;
        background-color: var(--band-of-blades-sheets-background-tertiary-color);
        border-color: var(--band-of-blades-sheets-border-secondary-color);
      }

      input[type="checkbox"]:read-only + .point {
        cursor: default;
        pointer-events: none;
      }

      input[type="checkbox"]:checked ~ .point {
        background-color: var(--band-of-blades-sheets-primary-highlight-color);
        border-color: var(--band-of-blades-sheets-border-primary-color);
      }

      .point {
        cursor: pointer;
        display: flex;
        width: 10px;
        height: 10px;
        background-color: var(--band-of-blades-sheets-background-primary-color);
        border: 2px solid var(--band-of-blades-sheets-border-primary-color);
        transform: rotate(45deg);

        &.readonly {
          cursor: default;
          pointer-events: none;
        }
      }

    }

    &.primary {
      gap: 0.25rem;
      input[type="checkbox"]:disabled + .point {
        cursor: default;
        border-color: var(--band-of-blades-sheets-border-secondary-color);
      }

      input[type="checkbox"]:checked ~ .point {
        background-color: var(--band-of-blades-sheets-primary-highlight-color);
        border-color: var(--band-of-blades-sheets-border-primary-color);
      }

      .point {
        cursor: pointer;
        display: flex;
        width: 12px;
        height: 12px;
        background-color: var(--band-of-blades-sheets-background-primary-color);
        border: 2px solid var(--band-of-blades-sheets-border-primary-color);

        &.readonly {
          cursor: default;
          pointer-events: none;
        }
      }
    }
  }
</style>