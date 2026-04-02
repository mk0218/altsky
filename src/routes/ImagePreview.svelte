<script lang="ts">
  import BackgroundBlur from "$lib/components/BackgroundBlur.svelte";
  import NavButton from "$lib/components/buttons/NavButton.svelte";
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";

  type Props = {
    src: string;
    alt: string;
    onclose: () => void;
  };

  let { src, alt = $bindable(), onclose }: Props = $props();

  let textarea = $state<HTMLTextAreaElement | null>(null);

  onMount(() => {
    textarea?.focus();
  });
</script>

<BackgroundBlur />

<div class="bg full" transition:fly={{ y: "100%", opacity: 1 }} role="dialog" tabindex={-1}>
  <NavButton icon="close" position="right" onclick={onclose} />

  <div class="drawer-content">
    <img {src} alt="선택한 이미지" draggable={false} />
    <textarea bind:this={textarea} bind:value={alt} placeholder="대체 텍스트를 입력하세요."
    ></textarea>
  </div>
</div>

<style>
  .drawer-content {
    position: absolute;
    top: 66px;
    left: 0;
    right: 0;
    margin: 0 auto;
    width: 100%;
    max-width: 720px;
    padding: 0 16px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 16px;

    img {
      border-radius: 6px;
      width: 100%;
      user-select: none;
    }
  }

  textarea {
    height: 120px;
    outline: none;
    box-sizing: border-box;
    border: 2px solid var(--gray1);
    border-radius: 6px;
    resize: none;
    padding: 16px;
    font-size: 0.87rem;
  }

  textarea:focus {
    border: 2px solid var(--primary);
  }

  textarea::placeholder {
    color: var(--gray2);
  }
</style>
