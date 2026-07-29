<script>
  import { toast } from "../stores/toast.svelte.js";
  import ToastItem from "./Toast.svelte";
</script>

{#if toast.toasts.length}
  <div
    class="pointer-events-none flex flex-col gap-1 md:gap-2 items-end justify-center text-xs bg-white/50 dark:bg-black/50 rounded-2xl p-2 w-full"
  >
    <div class="flex gap-2 justify-between items-center w-full">
      <p>Notifications</p>
      <button
        class="btn-sm bg-neutral-50 dark:bg-neutral-950 pointer-events-auto"
        onclick={() => {
          toast.toasts = [];
        }}>X Clear</button
      >
    </div>
    {#each toast.toasts as item (item.id)}
      <ToastItem {item} />
    {/each}
  </div>
{/if}
