<script lang="ts">
  import BackgroundBlur from "$lib/components/BackgroundBlur.svelte";
  import Button from "$lib/components/buttons/Button.svelte";
  import type { TransitionConfig } from "svelte/transition";

  type Props = {
    close: () => void;
  };

  const { close }: Props = $props();

  let text = $state("");
  const availableChars = $derived(300 - text.length);

  $effect(() => {
    if (text.length > 300) {
      text = text.slice(0, 300);
    }
  });

  const textFull = $derived(!availableChars);

  const slide = (
    _: Element,
    { delay = 160, duration = 240 } = { delay: 160, duration: 240 }
  ): TransitionConfig => {
    return {
      delay,
      duration,
      css: (_, u) => {
        return `top: ${u * 100}%`;
      }
    };
  };
</script>

<BackgroundBlur />

<div class="bg full" transition:slide>
  <div class="content">
    <div class="actions">
      <Button variant="minimal" size="small" label="취소" onclick={close} />
      <Button variant="primary" size="small" label="게시하기" />
    </div>
    <form>
      <textarea bind:value={text} class="bg"></textarea>
      <div class="functions">
        <Button variant="minimal" size="small" label="이미지 첨부" />
        <div class="available-chars" class:textFull>{availableChars}</div>
      </div>
    </form>
  </div>
</div>

<style>
  .content {
    position: absolute;
    top: 0;
    max-width: 720px;
    width: 100vw;
    height: 100vh;
    left: 0;
    right: 0;
    margin: 0 auto;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }

  .actions {
    width: 100%;
    height: 68px;
    box-sizing: border-box;
    padding: 0 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  textarea {
    border: none;
    outline: none;
    box-sizing: border-box;
    width: 100%;
    height: 210px;
    padding: 16px 30px;
    resize: none;
    font-size: 1rem;
    caret-color: var(--primary);
  }

  .functions {
    height: 54px;
    padding: 0 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-top: 0.5px solid var(--gray3);
    border-bottom: 0.5px solid var(--gray3);
  }

  .available-chars {
    font-size: 1.2rem;
    font-weight: 500;
    color: var(--primary);
    justify-self: end;
    padding: 0 12px;
  }

  .textFull {
    color: var(--error);
  }
</style>
