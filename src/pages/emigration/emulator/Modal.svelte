<script>
  let { choice, onresolve } = $props();

  function handleResolve(value) {
    if (onresolve) onresolve(value);
  }
</script>

{#if choice}
  <div class="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex justify-center items-center z-[9999]">
    <div class="bg-emi-bg-panel p-6 rounded-xl max-w-[500px] w-[90%] shadow-[0_10px_25px_rgba(0,0,0,0.5)] border border-white/10 text-slate-50">
      <h2 class="mt-0 mb-5 text-xl font-semibold text-center font-emi-heading">
        {choice.title}
      </h2>
      <div class="flex flex-col gap-3 max-h-[60vh] overflow-y-auto">
        {#each choice.options as option}
          <button 
            class="bg-white/5 border border-white/10 text-white py-3 px-4 rounded-lg cursor-pointer text-left text-base transition-all duration-200 ease-in font-emi-ui hover:bg-white/10 hover:border-emi-accent hover:-translate-y-[1px]" 
            onclick={() => handleResolve(option.value)}
          >
            {option.text}
          </button>
        {/each}
      </div>
    </div>
  </div>
{/if}
