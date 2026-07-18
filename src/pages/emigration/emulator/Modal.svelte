<script>
  let { choice, onresolve, oncancel } = $props();

  function handleResolve(value) {
    if (onresolve) onresolve(value);
  }
</script>

{#if choice}
  <div class="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex justify-center items-center z-[9999]">
    <div class="bg-neutral-200 dark:bg-neutral-800 p-6 rounded-xl max-w-[500px] w-[90%] shadow-xl">
      <h2 class="mt-0 mb-5 text-xl font-semibold text-center font-emi-heading">
        {choice.title}
      </h2>
      <div class="flex flex-col gap-3 max-h-[60vh] overflow-y-auto">
        {#each choice.options as option}
          <button 
            class="btn" 
            onclick={() => handleResolve(option.value)}
          >
            {option.text}
          </button>
        {/each}
        {#if choice.cancellable !== false && oncancel}
          <button
            class="btn mt-4 bg-red-900/30 hover:bg-red-900/50 text-red-200 border-red-900"
            onclick={oncancel}
          >
            Cancel Action
          </button>
        {/if}
      </div>
    </div>
  </div>
{/if}
