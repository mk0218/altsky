<script lang="ts">
  type Props = {
    src: string;
    alt?: string;
    close: () => void;
  };

  const { src, alt = "", close }: Props = $props();
</script>

<div class="container">
  <button class="close-btn" onclick={close}>
    <img src="/icons/close-small.svg" alt="delete" />
  </button>
  <img class="thumbnail-img" {src} {alt} />
</div>

<style>
  .container {
    aspect-ratio: 1 / 1;
    max-height: 240px;
    flex: 1;
    border-radius: 4px;
    overflow: hidden;
    box-shadow: 1px 1px 10px rgba(0, 0, 0, 8%);
    position: relative;
  }

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }

  .close-btn {
    position: absolute;
    top: 6px;
    right: 6px;
    width: 20px;
    height: 20px;
    border: none;
    border-radius: 50%;
    background: var(--white);
    box-shadow: 1px 1px 6px rgba(0, 0, 0, 24%);
    box-sizing: border-box;
    padding: 2px;
  }
</style>
