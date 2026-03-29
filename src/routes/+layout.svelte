<script lang="ts">
  import "normalize.css";
  import favicon from "$lib/assets/favicon.svg";

  import { dev } from "$app/environment";
  import { injectAnalytics } from "@vercel/analytics/sveltekit";

  let { children } = $props();

  injectAnalytics({ mode: dev ? "development" : "production" });
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
    font-weight: 600;
    background-color: var(--bg);
    color: var(--text);
  }

  :global(button) {
    cursor: pointer;
  }

  :global(.bg) {
    background: var(--bg);
  }

  :global(.full) {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100dvh;
  }

  .app {
    position: absolute;
    top: 0;
    max-width: 720px;
    width: 100vw;
    height: 100dvh;
    left: 0;
    right: 0;
    margin: 0 auto;
  }
</style>
