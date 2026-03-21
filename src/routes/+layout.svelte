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
    font-family: "Escoredream";
    font-weight: 400;
    background-color: var(--bg);
    color: var(--text);
  }

  .app {
    position: absolute;
    top: 0;
    max-width: 920px;
    width: 100vw;
    height: 100vh;
    left: 0;
    right: 0;
    margin: 0 auto;
    padding: 16px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 16px;
  }
</style>
