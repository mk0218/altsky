<script lang="ts">
  import { enhance } from "$app/forms";
  import BackgroundBlur from "$lib/components/BackgroundBlur.svelte";
  import Button from "$lib/components/buttons/Button.svelte";
  import Thumbnail from "$lib/components/Thumbnail.svelte";
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

  let textarea: HTMLTextAreaElement | null;

  $effect(() => {
    if (!textarea || !text) return;
    textarea.style.height = `${textarea?.scrollHeight}px`;
  });

  const textFull = $derived(!availableChars);

  let files = $state<FileList | null>(null);
  let fileInput = $state<HTMLInputElement | null>(null);

  const upload = () => {
    if (fileInput) fileInput.click();
  };

  let images = $state<{ preview: string; file: File }[]>([]);

  $effect(() => {
    if (!files || images.length + files.length > 4) return;

    [...files]
      .filter((file) => file.type.startsWith("image/"))
      .forEach((file) => {
        const preview = URL.createObjectURL(file);
        images.push({ preview, file });
      });

    files = null;
  });

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

  let loading = $state(false);
</script>

<BackgroundBlur />

<div class="bg full" transition:slide>
  <div class="content">
    <form
      method="POST"
      action="?/post"
      enctype="multipart/form-data"
      use:enhance={({ formData }) => {
        if (loading) return;
        loading = true;
        for (const image of images) {
          formData.append("images", image.file);
        }
        return async ({ update, result }) => {
          if (result.type === "success") {
            await update();
            images = [];
            loading = false;
          }
        };
      }}
    >
      <div class="actions">
        <Button variant="minimal" size="small" label="취소" onclick={close} />
        <Button variant="primary" size="small" label="게시하기" type="submit" disabled={loading} />
      </div>
      <textarea
        placeholder="무슨 일이 일어나고 있나요?"
        name="text"
        bind:this={textarea}
        bind:value={text}
        class="bg"
      ></textarea>
    </form>
    {#if images.length > 0}
      <div class="image-preview">
        {#each images as image, index (index)}
          <Thumbnail src={image.preview} close={() => images.splice(index, 1)} />
        {/each}
      </div>
    {/if}
    <div class="functions">
      <input type="file" bind:files bind:this={fileInput} multiple accept=".jpg, .jpeg, .png" />
      <Button variant="minimal" size="small" icon="image" label="사진 추가" onclick={upload} />
      <div class="available-chars" class:textFull>{availableChars}</div>
    </div>
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
    min-height: 160px;
    height: auto;
    padding: 16px 30px;
    resize: none;
    font-size: 1rem;
    line-height: 1.4rem;
    caret-color: var(--primary);
    overflow: hidden;

    &::placeholder {
      color: var(--gray3);
    }
  }

  .image-preview {
    display: flex;
    flex-direction: row;
    box-sizing: border-box;
    padding: 20px;
    gap: 3%;
  }

  .functions {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 54px;
    padding: 0 10px;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-top: 0.5px solid var(--gray3);
    border-bottom: 0.5px solid var(--gray3);
  }

  input[type="file"] {
    display: none;
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
