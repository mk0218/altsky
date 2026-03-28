<script lang="ts">
  import type { MouseEventHandler } from "svelte/elements";
  import { blur } from "svelte/transition";

  type Props = {
    icon: "menu" | "close";
    alt?: string;
    position: "left" | "right";
    onclick?: MouseEventHandler<HTMLButtonElement>;
    class?: string;
  };

  const { icon, alt, position, onclick, ...restProps }: Props = $props();
</script>

<button
  {onclick}
  aria-label={alt ?? icon}
  class={restProps.class}
  class:left={position === "left"}
  class:right={position === "right"}
  in:blur={{ delay: 360, duration: 240 }}
  out:blur={{ duration: 200 }}
>
  <img src={`/icons/${icon}.svg`} alt={alt ?? icon} />
</button>

<style>
  button {
    position: fixed;
    top: 10px;
    background: none;
    border: none;
    padding: 7px;
    border-radius: 50%;
    transition: background var(--out);
  }

  .left {
    left: 10px;
  }

  .right {
    right: 10px;
  }

  button:active {
    background: rgba(0, 0, 0, 3%);
    transition: background var(--in);
  }
</style>
