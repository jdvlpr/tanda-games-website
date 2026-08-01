<script>
  let { choice, onresolve, oncancel, onback } = $props();

  let selectedValues = $state([]);

  $effect(() => {
    if (choice) {
      selectedValues = [];
    }
  });

  function toggleSelect(val) {
    if (selectedValues.includes(val)) {
      selectedValues = selectedValues.filter((v) => v !== val);
    } else {
      if (choice && choice.targetCount && selectedValues.length >= choice.targetCount) return;
      selectedValues = [...selectedValues, val];
    }
  }

  function handleResolve(value) {
    if (onresolve) onresolve(value);
  }
</script>

{#if choice}
  <div class="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex justify-center items-center z-[9999]">
    <div class="bg-neutral-200 dark:bg-neutral-800 p-6 rounded-xl max-w-[500px] w-[90%] shadow-xl">
      <h2 class="mt-0 mb-2 text-xl font-semibold text-center">
        {choice.title}
      </h2>

      {#if choice.targetCount && choice.targetCount > 1}
        <p class="text-sm text-center text-neutral-600 dark:text-neutral-400 mb-4">
          Select exactly {choice.targetCount} cards ({selectedValues.length}/{choice.targetCount} selected)
        </p>

        <div class="flex flex-col gap-2 max-h-[50vh] overflow-y-auto mb-4">
          {#each choice.options as option}
            {@const isSelected = selectedValues.includes(option.value)}
            {@const desc = option.description || option.card?.description}
            <button
              class="btn text-left justify-between flex items-center {isSelected ? 'bg-teal-600 text-white border-teal-500' : 'bg-neutral-100 dark:bg-neutral-700'}"
              disabled={option.disabled}
              onclick={() => toggleSelect(option.value)}
            >
              <div class="flex flex-col text-left pr-2">
                <span>{option.text}</span>
                {#if desc}
                  <span class="text-xs opacity-80 font-normal mt-0.5 line-clamp-2">{desc}</span>
                {/if}
              </div>
              {#if isSelected}
                <span class="font-bold text-xs bg-teal-800 text-white px-2 py-0.5 rounded-full shrink-0">Selected</span>
              {/if}
            </button>
          {/each}
        </div>

        <button
          class="btn w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 disabled:opacity-50"
          disabled={selectedValues.length !== choice.targetCount}
          onclick={() => handleResolve(selectedValues)}
        >
          Confirm Card Selection ({selectedValues.length}/{choice.targetCount})
        </button>
      {:else}
        <div class="flex flex-col gap-3 max-h-[60vh] overflow-y-auto">
          {#each choice.options as option}
            {@const desc = option.description || option.card?.description}
            <button
              class="btn text-left flex flex-col items-start"
              disabled={option.disabled}
              onclick={() => !option.disabled && handleResolve(option.value)}
            >
              <span>{option.text}</span>
              {#if desc}
                <span class="text-xs opacity-80 font-normal mt-0.5 line-clamp-2">{desc}</span>
              {/if}
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
      {/if}
    </div>
  </div>
{/if}
