<script>
  let { choice, onresolve } = $props();

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
      </div>
    </div>
  </div>
{/if}
