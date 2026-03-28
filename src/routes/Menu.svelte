<script lang="ts">
  import { blur, slide } from "svelte/transition";

  const { close } = $props();
</script>

<div
  class="full blur-background"
  in:blur={{ delay: 50, duration: 200 }}
  out:blur={{ delay: 240, duration: 200 }}
></div>

<div class="full menu" transition:slide={{ delay: 200, duration: 200, axis: "x" }}>
  <button
    class="close-button"
    onclick={close}
    in:blur={{ delay: 360, duration: 240 }}
    out:blur={{ duration: 200 }}
  >
    <img src="/icons/close.svg" alt="close" />
  </button>
</div>

<style>
  .full {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
  }

  .blur-background {
    background: rgba(0, 0, 0, 4%);
  }

  .menu {
    box-sizing: border-box;
    background: var(--bg);
    box-shadow: 1px 1px 10px rgba(0, 0, 0, 10%);
  }

  .close-button {
    position: fixed;
    right: 10px;
    top: 10px;
    background: none;
    border: none;
    padding: 2px;
  }
</style>
