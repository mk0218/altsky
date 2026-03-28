<script lang="ts">
  import { refreshAll } from "$app/navigation";
  import { blur, fly, slide } from "svelte/transition";

  const { close } = $props();

  const logout = async () => {
    try {
      await fetch("/oauth/logout", { method: "POST" });
    } catch (err) {
      console.error(err);
      return;
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
  <button
    class="close-button"
    onclick={close}
    in:blur={{ delay: 360, duration: 240 }}
    out:blur={{ duration: 200 }}
  >
    <img src="/icons/close.svg" alt="close" />
  </button>

  <div
    class="menu-contents"
    in:fly={{ delay: 400, duration: 800, y: 30 }}
    out:blur={{ duration: 200 }}
  >
    <button class="menu-button logout" onclick={logout}>로그아웃</button>
  </div>
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
    padding: 200px 55px 0;
  }

  .close-button {
    position: fixed;
    right: 10px;
    top: 10px;
    background: none;
    border: none;
    padding: 7px;
    border-radius: 50%;
    transition: background var(--out);
  }

  .close-button:active {
    background: rgba(0, 0, 0, 3%);
    transition: background var(--in);
  }

  .menu-contents {
    display: flex;
    flex-direction: column;
    justify-content: baseline;
    align-items: center;
  }

  .menu-button {
    background: none;
    border: none;
    padding: 12px 30px;
    font-size: 1.7rem;
  }

  .logout {
    font-weight: 500;
    color: var(--primary);
    transition: color var(--out);
  }

  .logout:active {
    color: var(--primary-faded);
    transition: background var(--in);
  }
</style>
