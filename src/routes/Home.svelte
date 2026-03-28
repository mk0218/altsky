<script>
  import Title from "$lib/components/Title.svelte";
  import Menu from "./Menu.svelte";

  let showMenu = $state(false);

  const openMenu = () => (showMenu = true);
  const closeMenu = () => (showMenu = false);
</script>

<div class="home">
  <button class="menu-button" onclick={openMenu}>
    <img src="/icons/menu.svg" alt="menu" />
  </button>

  <Title />

  <div class="write">무슨 일이 일어나고 있나요?</div>

  <div class="buttons">
    <button><img src="/icons/image.svg" alt="icon" />사진 업로드</button>
    <button><img src="/icons/link.svg" alt="link" />게시물 보기</button>
  </div>
</div>

{#if showMenu}
  <Menu close={closeMenu} />
{/if}

<style>
  .home {
    width: 100%;
    height: 100%;
    padding: 20px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 16px;
  }

  .menu-button {
    position: fixed;
    left: 10px;
    top: 10px;
    background: none;
    border: none;
    padding: 2px;
  }

  .write {
    width: 100%;
    height: 120px;
    border: 1.5px solid var(--primary);
    border-radius: 16px;
    box-sizing: border-box;
    padding: 20px;
  }

  .buttons {
    width: 100%;
    height: 50px;
    display: flex;
    flex-direction: row;
    justify-content: stretch;
    align-items: stretch;
    gap: 8px;

    & > button {
      flex: 1;
      border-radius: 16px;
      font-weight: 500;
      inset: unset;
      border: none;
      background-color: var(--primary);
      color: var(--white);
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      gap: 4px;
    }
  }
</style>
