<script>
  let { engine, snapshot, currentPlayer, actions, onaction, onselectlane, selectionText, pendingChoice, computerTurn = false, autoScrollEnabled = true, onclearselection, hasSelection = false, showLog = true, copyTextToClipboard } = $props();

  let logContainer = null;

  
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

<div class="bg-neutral-200 dark:bg-neutral-800 rounded-md px-2 py-2 lg:px-4 flex flex-col gap-5 overflow-auto backdrop-blur-md {showLog ? 'h-full max-h-[calc(100vh-200px)]' : ''}">
  {#if engine && snapshot}
    <!-- Action Dashboard Panel -->
    <div>
      <h3 class="text-sm uppercase tracking-wider pb-2">Action Dashboard</h3>
      
      <!-- Selection Hint -->
      <div class="text-sm font-semibold bg-yellow-100 dark:bg-yellow-900 rounded-lg p-3 mb-4 min-h-[44px] flex items-center justify-center text-center gap-2 flex-wrap">
        <span class="flex-1">{@html selectionText}</span>
        {#if hasSelection && onclearselection}
          <button
            class="btn text-xs py-1 px-2 shrink-0 opacity-70 hover:opacity-100"
            onclick={onclearselection}
          >✕ Clear</button>
        {/if}
      </div>

      <!-- Action States -->
      {#if snapshot.phase === 'game_over'}
        <div class="bg-red-100 dark:bg-red-900 p-4 rounded-md text-center">
          <h3 class="mt-0 mb-2 pb-2">Game Over</h3>
          <div class="text-lg font-bold ">{snapshot.gameResult?.message}</div>
        </div>
      {:else if computerTurn}
        <div class="text-sm ">
          🤖 Computer is taking its turn…
        </div>
      {:else if snapshot.phase === 'preparation'}
        <div class="grid grid-cols-2 gap-2">
          {#each actions as action}
            <button 
              class={["btn text-sm w-full py-2 px-4", action.optional && "", !action.enabled && 'hidden' ]}
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

    <!-- Playtest Logs (hidden on mobile where GameLogSheet is used) -->
    {#if showLog}
    <div class="flex-grow flex flex-col min-h-[180px] overflow-hidden">
      <h3 class="text-sm uppercase tracking-wider pb-2">Game Playtest Logs</h3>
      <button class="text-xs p-2 cursor-pointer" onclick={() => copyTextToClipboard('game-log')}>Copy</button>
      <div id="game-log" class="flex-grow overflow-y-auto bg-neutral-50 dark:bg-neutral-950 rounded-md p-3 font-emi-mono text-xs text-left flex flex-col gap-1.5 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-black/10 [&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-thumb]:rounded-sm" bind:this={logContainer}>
        {#each snapshot.logs as log}
          <div class="leading-snug pb-1 {log.type === 'system' ? '' : log.type === 'action' ? '' : log.type === 'error' ? 'text-red-800 dark:text-red-200' : log.type === 'roll' ? '' : ''}">
            <span class=" text-xs">[{log.turn}]</span> {log.msg}
          </div>
        {/each}
      </div>
    </div>
    {/if}
  {/if}
</div>
