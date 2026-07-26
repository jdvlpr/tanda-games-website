<script>
  let { choice, onresolve, oncancel, onback } = $props();

  function handleResolve(value) {
    if (onresolve) onresolve(value);
  }
</script>

{#if choice}
  <div class="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex justify-center items-center z-[9999]">
    <div class="bg-neutral-200 dark:bg-neutral-800 p-6 rounded-xl max-w-[500px] w-[90%] shadow-xl">
      <h2 class="mt-0 mb-5 text-xl font-semibold text-center">
        {choice.title}
      </h2>
      <div class="flex flex-col gap-3 max-h-[60vh] overflow-y-auto">
        {#each choice.options as option}
          <button 
            class="btn" 
            disabled={option.disabled}
            onclick={() => !option.disabled && handleResolve(option.value)}
          >
            {option.text}
          </button>
        {/each}
        {#if choice.canGoBack && onback}
          <button
            class="btn mt-2 bg-amber-200 dark:bg-amber-800 hover:bg-amber-300 dark:hover:bg-amber-700 border-amber-900 dark:border-amber-100"
            onclick={onback}
          >
            ← Step Back
          </button>
        {/if}
        {#if choice.cancellable !== false && oncancel}
          <button
            class="btn mt-2 bg-red-200 dark:bg-red-800 hover:bg-red-300 dark:hover:bg-red-700 border-red-900 dark:border-red-100"
            onclick={oncancel}
          >
            Cancel
          </button>
        {/if}
      </div>
    </div>
  </div>
{/if}
