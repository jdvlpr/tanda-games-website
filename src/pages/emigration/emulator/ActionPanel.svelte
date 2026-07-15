<script>
  let { engine, snapshot, currentPlayer, actions, onaction, onselectlane, selectionText, pendingChoice } = $props();

  let logContainer = null;

  // Auto-scroll logs when snapshot updates
  $effect(() => {
    if (snapshot && snapshot.logs && logContainer) {
      setTimeout(() => {
        if (logContainer) {
          logContainer.scrollTop = logContainer.scrollHeight;
        }
      }, 50);
    }
  });
</script>

<div class="bg-emi-bg-panel rounded-xl p-5 flex flex-col gap-5 h-full max-h-[calc(100vh-200px)] overflow-auto font-emi-ui text-slate-50 border border-white/10 backdrop-blur-md">
  {#if engine && snapshot}
    <!-- Action Dashboard Panel -->
    <div>
      <h3 class="mt-0 mb-3 text-base font-emi-heading text-emi-accent border-b border-white/10 pb-2">Action Dashboard</h3>
      
      <!-- Selection Hint -->
      <div class="text-sm font-semibold text-[#c084fc] bg-[#c084fc]/5 border border-[#c084fc]/10 rounded-lg p-3 mb-4 min-h-[44px] flex items-center justify-center text-center">
        <span>{@html selectionText}</span>
      </div>

      <!-- Action States -->
      {#if snapshot.phase === 'preparation'}
        <div class="grid grid-cols-2 gap-2">
          {#each actions as action}
            <button 
              class="bg-white/10 border border-white/10 text-white p-2.5 rounded-md cursor-pointer text-sm font-semibold transition-all duration-200 hover:not(:disabled):bg-white/20 hover:not(:disabled):border-emi-accent disabled:opacity-40 disabled:cursor-not-allowed {action.optional ? 'bg-[rgba(249,197,82,0.1)] border-[rgba(249,197,82,0.3)] text-emi-payday hover:not(:disabled):border-emi-payday' : ''}" 
              disabled={!action.enabled || pendingChoice}
              onclick={() => onaction(action.type)}
            >
              {action.label}
            </button>
          {/each}
        </div>
      {:else if snapshot.phase === 'crossing'}
        <div class="text-sm font-semibold text-center py-5 px-4 bg-sky-950/20 border border-sky-800/30 rounded-lg text-slate-300">
          Border Crossing Phase is active.<br/>
          <span class="text-xs text-sky-400 font-normal mt-1 block">Please click "Select Lane" on one of the Security Lanes in the Public Center Pool.</span>
        </div>
      {:else if snapshot.phase === 'game_over'}
        <div class="bg-[rgba(85,183,176,0.2)] border border-emi-accent p-4 rounded-lg text-center">
          <h3 class="mt-0 mb-2 text-base font-emi-heading text-emi-accent border-b border-white/10 pb-2">Game Over</h3>
          <div class="text-lg font-bold text-emi-accent">{snapshot.gameResult?.message}</div>
        </div>
      {/if}
    </div>

    <!-- Playtest Logs -->
    <div class="flex-grow flex flex-col min-h-[180px] overflow-hidden">
      <h3 class="mt-0 mb-3 text-base font-emi-heading text-emi-accent border-b border-white/10 pb-2">Game Playtest Logs</h3>
      <div class="flex-grow overflow-y-auto bg-black/30 rounded-lg p-3 font-emi-mono text-xs text-left flex flex-col gap-1.5 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-black/10 [&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-thumb]:rounded-sm" bind:this={logContainer}>
        {#each snapshot.logs as log}
          <div class="leading-snug pb-1 border-b border-white/5 last:border-none {log.type === 'system' ? 'text-slate-400' : log.type === 'action' ? 'text-white' : log.type === 'error' ? 'text-emi-connection' : log.type === 'roll' ? 'text-emi-payday' : ''}">
            <span class="text-slate-400 text-[0.7rem]">[{log.turn}]</span> {log.msg}
          </div>
        {/each}
      </div>
    </div>
  {/if}
</div>
