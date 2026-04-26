<script>
  import Button from "$lib/components/buttons/Button.svelte";
  import NavButton from "$lib/components/buttons/NavButton.svelte";
  import Title from "$lib/components/Title.svelte";
  import Menu from "./Menu.svelte";
  import PostEditor from "./PostEditor.svelte";

  let showMenu = $state(false);
  const openMenu = () => (showMenu = true);
  const closeMenu = () => (showMenu = false);

  let showEditor = $state(false);
  const openEditor = () => (showEditor = true);
  const closeEditor = () => (showEditor = false);
</script>

<div class="home">
  <NavButton icon="menu" position="left" onclick={openMenu} />

  <Title />

  <button class="write" onclick={openEditor}><div>무슨 일이 일어나고 있나요?</div></button>

  <div class="buttons">
    <Button icon="image" label="사진 업로드" disabled />
    <Button icon="link" label="게시물 보기" disabled />
  </div>
</div>

{#if showMenu}
  <Menu close={closeMenu} />
{/if}

{#if showEditor}
  <PostEditor close={closeEditor} />
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

  .write {
    width: 100%;
    height: 120px;

    border: 1.5px solid var(--primary);
    border-radius: 16px;
    box-sizing: border-box;
    padding: 20px;

    background: var(--bg);
    text-align: left;
    color: var(--gray3);
    cursor: text;

    div {
      width: 100%;
      height: 100%;
    }
  }

  .buttons {
    width: 100%;
    height: 50px;
    display: flex;
    flex-direction: row;
    justify-content: stretch;
    align-items: stretch;
    gap: 8px;
  }
</style>
