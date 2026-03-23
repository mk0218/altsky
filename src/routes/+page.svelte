<script>
  import Home from "./Home.svelte";
  import Login from "./Login.svelte";

  let { data } = $props();

  const isAuthed = $derived(data.isAuthed);
</script>

{#if isAuthed}
  <Home />
{:else}
  <Login />
{/if}
