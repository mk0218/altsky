<script lang="ts">
  import type { MouseEventHandler } from "svelte/elements";

  type Icon = "image" | "link";

  type Props = {
    icon?: Icon;
    label: string;
    variant?: "primary" | "minimal";
    size?: "full" | "small";
    type?: "button" | "submit" | "reset" | null;
    onclick?: MouseEventHandler<HTMLButtonElement>;
    loading?: boolean;
    disabled?: boolean;
    class?: string;
  };

  const {
    icon,
    label,
    variant = "primary",
    size = "full",
    type = "button",
    onclick,
    loading = false,
    disabled = false,
    ...restProps
  }: Props = $props();
</script>

<button
  {type}
  {onclick}
  {disabled}
  class={restProps.class}
  class:minimal={variant === "minimal"}
  class:small={size === "small"}
  class:disabled
>
  {#if loading}
    <div class="spinner"></div>
  {/if}

  <span class="content" class:hide={loading}>
    {#if icon}
      <img src={`/icons/${icon}${variant === "minimal" ? "-primary" : ""}.svg`} alt={icon} />
    {/if}
    {label}
  </span>
</button>

<style>
  button {
    position: relative;
    outline: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -webkit-tap-highlight-color: transparent;
    width: 100%;
    height: 50px;

    background: var(--primary);
    color: var(--white);
    border: none;
    border-radius: 16px;
    font-size: 1.12rem;
    font-weight: 500;

    display: flex;
    justify-content: center;
    align-items: center;

    transition: background var(--out);
  }

  button:active:not(.disabled) {
    background: var(--primary-active);
    transition: background var(--in);
  }

  .minimal {
    background: none;
    color: var(--primary);
    transition: background var(--out);
  }

  .minimal:active {
    background: rgba(0, 0, 0, 3%);
    transition: background var(--in);
  }

  .small {
    width: unset;
    padding: 0 12px;
    height: 36px;
  }

  .disabled {
    background: var(--primary-disabled);
    color: rgba(255, 255, 255, 0.9);
    cursor: not-allowed;
  }

  .spinner {
    position: absolute;
    top: calc(50% - 0.48em);
    left: calc(50% - 0.48em);
    width: 0.96em;
    height: 0.96em;
    border-radius: 50%;

    box-sizing: border-box;
    border: 3px solid rgba(255, 255, 255, 0.8);
    border-top: 3px solid transparent;

    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .content {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;
  }

  .hide {
    visibility: hidden;
  }
</style>
