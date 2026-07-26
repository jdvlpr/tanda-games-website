<script>
  let { engine, snapshot, currentPlayer, actions, onaction, onselectlane, selectionText, pendingChoice, computerTurn = false, waitingForPeer = false, waitingForName = '', autoScrollEnabled = true, onclearselection, hasSelection = false, copyTextToClipboard } = $props();

  let logContainer = $state(null);

  
  // Auto-scroll logs when snapshot updates (disabled for AI Simulation mode)
  $effect(() => {
    if (autoScrollEnabled && snapshot && snapshot.logs && logContainer) {
      setTimeout(() => {
        if (logContainer) {
          logContainer.scrollTop = logContainer.scrollHeight;
        }
      }, 50);
    }
  });
</script>

<div class="max-lg:bg-neutral-50/50 max-lg:dark:bg-neutral-950/50 rounded-md px-2 py-2 lg:px-4 flex flex-col gap-2 overflow-auto backdrop-blur-md max-lg:shadow-2xl">
  {#if engine && snapshot}
    <!-- Action Dashboard Panel -->
    <div>
      
      <!-- Selection Hint -->
      <div class="text-sm font-semibold bg-yellow-100 dark:bg-yellow-900 rounded-lg p-2 mb-2 min-h-[44px] flex items-center justify-center text-center gap-2 flex-wrap">
        <span class="flex-1">{@html selectionText}</span>
        {#if hasSelection && onclearselection}
          <button
            class="btn-sm opacity-70 hover:opacity-100"
            onclick={onclearselection}
          >✕ Clear</button>
        {/if}
      </div>

      <!-- Action States -->
      {#if snapshot.phase === 'game_over'}
        <div class="bg-orange-100 dark:bg-orange-900 p-2 rounded-md text-center">
          <h3 class="mt-0 mb-2 pb-2">Game Over</h3>
          <div class="text-lg font-bold ">{snapshot.gameResult?.message}</div>
        </div>
      {:else if computerTurn}
        <div class="text-sm ">
          🤖 Computer is taking its turn…
        </div>
      {:else if waitingForPeer}
        <div class="text-sm text-center py-2 animate-pulse">
          ⏳ Waiting for <span class="font-bold">{waitingForName || 'another player'}</span>…
        </div>
      {:else if snapshot.phase === 'preparation'}
        <div class="flex flex-wrap gap-2 items-center justify-center">
          {#each actions as action}
            <button 
              class={["btn-sm flex-1 whitespace-nowrap", action.optional && "" ]}
              disabled={!action.enabled || pendingChoice}
              onclick={() => onaction(action.type)}
            >
              {action.label}
            </button>
          {/each}
        </div>
      {:else if snapshot.phase === 'crossing'}
        <div class="text-sm font-semibold text-center py-5 px-4  rounded-md">
          Border Crossing Phase is active.<br/>
          <span class="text-xs text-sky-400 font-normal mt-1 block">Please click "Select Lane" on one of the Security Lanes in the Public Center Pool.</span>
        </div>
      {/if}
    </div>
  {/if}
</div>
