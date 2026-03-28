<script>
  import { blur } from "svelte/transition";
</script>

<div
  class="full"
  in:blur={{ delay: 50, duration: 200 }}
  out:blur={{ delay: 240, duration: 200 }}
></div>

<style>
  div {
    background: rgba(0, 0, 0, 5%);
  }
</style>
