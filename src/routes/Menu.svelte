<script lang="ts">
  import { refreshAll } from "$app/navigation";
  import BackgroundBlur from "$lib/components/BackgroundBlur.svelte";
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

<BackgroundBlur />

<div class="full menu" transition:slide={{ delay: 200, duration: 200, axis: "x" }}>
  <NavButton icon="close" onclick={close} position="right" />

  <div
    class="menu-contents"
    in:fly={{ delay: 450, duration: 600, y: 20 }}
    out:blur={{ duration: 200 }}
  >
    <MenuButton label="로그아웃" onclick={logout} variant="primary" bold />
  </div>
</div>

<style>
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
