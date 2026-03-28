<script lang="ts">
  import "normalize.css";
  import favicon from "$lib/assets/favicon.svg";

  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<div class="app">
  {@render children()}
</div>

<style>
  @import "$lib/assets/css/colors";
  @import "$lib/assets/css/fonts";

  :global(body) {
    --in: 50ms ease-in;
    --out: 100ms ease-out 20ms;

    font-family: "Escoredream";
    font-weight: 400;
    background-color: var(--bg);
    color: var(--text);
  }

  :global(button) {
    cursor: pointer;
  }

  .app {
    position: absolute;
    top: 0;
    max-width: 720px;
    width: 100vw;
    height: 100vh;
    left: 0;
    right: 0;
    margin: 0 auto;
  }
</style>
