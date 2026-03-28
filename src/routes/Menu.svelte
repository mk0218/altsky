<script lang="ts">
  import { refreshAll } from "$app/navigation";
  import MenuButton from "$lib/components/buttons/MenuButton.svelte";
  import NavButton from "$lib/components/buttons/NavButton.svelte";
  import { blur, fly, slide } from "svelte/transition";

  const { close } = $props();

  const logout = async () => {
    try {
      await fetch("/oauth/logout", { method: "POST" });
    } catch (err) {
      console.error(err);
    }

    refreshAll();
  };
</script>

<div
  class="full blur-background"
  in:blur={{ delay: 50, duration: 200 }}
  out:blur={{ delay: 240, duration: 200 }}
></div>

<div class="full menu" transition:slide={{ delay: 200, duration: 200, axis: "x" }}>
  <NavButton icon="close" onclick={close} position="right" />

  <div
    class="menu-contents"
    in:fly={{ delay: 400, duration: 800, y: 30 }}
    out:blur={{ duration: 200 }}
  >
    <MenuButton label="로그아웃" onclick={logout} variant="primary" bold />
  </div>
</div>

<style>
  .full {
    position: fixed;
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
    padding: 200px 55px 0;
  }

  .menu-contents {
    display: flex;
    flex-direction: column;
    justify-content: baseline;
    align-items: center;
  }
</style>
