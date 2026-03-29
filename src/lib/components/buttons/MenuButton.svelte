<script lang="ts">
  import type { MouseEventHandler } from "svelte/elements";

  type Props = {
    label: string;
    bold?: boolean;
    variant?: "normal" | "primary";
    onclick?: MouseEventHandler<HTMLButtonElement>;
  };

  const { label, bold = false, variant = "normal", onclick }: Props = $props();
</script>

<button {onclick} class:primary={variant === "primary"} class:bold>{label}</button>

<style>
  button {
    background: none;
    border: none;
    padding: 12px 30px;
    font-size: 1.7rem;
    font-weight: 500;
    color: var(--black);
    transition: color var(--out);
  }

  button:active {
    color: var(--gray5);
    transition: color var (--in);
  }

  .bold {
    font-weight: 600;
  }

  .primary {
    color: var(--primary);
  }

  .primary:active {
    color: var(--primary-faded);
  }
</style>
