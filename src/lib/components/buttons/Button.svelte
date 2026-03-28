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
    class?: string;
  };

  const {
    icon,
    label,
    variant = "primary",
    size = "full",
    type,
    onclick,
    ...restProps
  }: Props = $props();
</script>

<button
  {type}
  {onclick}
  class={restProps.class}
  class:minimal={variant === "minimal"}
  class:small={size === "small"}
>
  {#if icon}
    <img src={`/icons/${icon}.svg`} alt={icon} />
  {/if}
  {label}</button
>

<style>
  button {
    width: 100%;
    height: 50px;

    background: var(--primary);
    color: var(--white);
    border: none;
    border-radius: 16px;
    font-size: 1.12rem;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 4px;

    transition: background var(--out);
  }

  button:active {
    background: var(--primary-faded);
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
</style>
