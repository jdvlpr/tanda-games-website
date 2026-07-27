<script>
  import { toast } from "../stores/toast.svelte.js";
  import ToastItem from "./Toast.svelte";
</script>

{#if toast.toasts.length}
  <div
    class="fixed top-0 max-lg:left-1/2 max-lg:-translate-x-1/2 lg:left-1/3 lg:-translate-x-1/3 z-200 pointer-events-none flex flex-col gap-1 md:gap-2 items-end justify-center text-xs bg-white/90 dark:bg-black/90 backdrop-blur-lg rounded-b-md p-2 shadow-md w-full max-w-lg"
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
