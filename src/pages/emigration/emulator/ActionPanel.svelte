<script>
  let { engine, currentPlayer, actions, onaction, onselectlane } = $props();

  let logContainer = null;

  // Auto-scroll logs
  $effect(() => {
    // When engine.logs changes, scroll to bottom
    if (engine && engine.logs && logContainer) {
      setTimeout(() => {
        if (logContainer) {
          logContainer.scrollTop = logContainer.scrollHeight;
        }
      }, 50);
    }
  });
</script>

<div class="bg-emi-bg-panel rounded-xl p-5 flex flex-col gap-5 h-full max-h-[calc(100vh-40px)] overflow-hidden font-emi-ui text-slate-50">
  {#if engine}
    <div>
      <h3 class="mt-0 mb-3 text-base font-emi-heading text-emi-accent border-b border-white/10 pb-2">Center Pool</h3>
      <div class="flex gap-4">
        <div class="flex-1 bg-black/20 rounded-lg p-3 flex flex-col items-center border border-white/5">
          <span class="text-2xl mb-1">🎟️</span>
          <span class="text-2xl font-bold">{engine.publicServices.tickets}</span>
          <span class="text-xs text-slate-400 uppercase">Tickets</span>
        </div>
        <div class="flex-1 bg-black/20 rounded-lg p-3 flex flex-col items-center border border-white/5">
          <span class="text-2xl mb-1">🛂</span>
          <span class="text-2xl font-bold">{engine.publicServices.passports}</span>
          <span class="text-xs text-slate-400 uppercase">Passports</span>
        </div>
      </div>
    </div>

    {#if engine.phase === 'preparation'}
      <div>
        <h3 class="mt-0 mb-3 text-base font-emi-heading text-emi-accent border-b border-white/10 pb-2">Actions for {currentPlayer.name}</h3>
        <div class="grid grid-cols-2 gap-2">
          {#each actions as action}
            <button 
              class="bg-white/10 border border-white/10 text-white p-2.5 rounded-md cursor-pointer text-sm font-semibold transition-all duration-200 hover:not(:disabled):bg-white/20 hover:not(:disabled):border-emi-accent disabled:opacity-40 disabled:cursor-not-allowed {action.optional ? 'bg-[rgba(249,197,82,0.1)] border-[rgba(249,197,82,0.3)] text-emi-payday' : ''}" 
              disabled={!action.enabled || engine.pendingChoice}
              onclick={() => onaction(action.type)}
            >
              {action.label}
            </button>
          {/each}
        </div>
      </div>
    {:else if engine.phase === 'crossing'}
      <div>
        <h3 class="mt-0 mb-3 text-base font-emi-heading text-emi-accent border-b border-white/10 pb-2">Border Crossing</h3>
        <p class="text-sm mb-3">Select a security lane for {engine.players[engine.activeCrossingIdx].name}:</p>
        <div class="flex flex-col gap-2">
          {#each engine.securityLanes as lane, i}
            <button 
              class="flex justify-between bg-[rgba(103,167,207,0.1)] border border-emi-document text-white p-3 rounded-md cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed" 
              disabled={lane.tokens.length === 0 || engine.pendingChoice}
              onclick={() => onselectlane(i)}
            >
              <strong>{lane.name}</strong>
              <span>{lane.tokens.length} tokens left</span>
            </button>
          {/each}
        </div>
      </div>
    {:else if engine.phase === 'game_over'}
      <div class="bg-[rgba(85,183,176,0.2)] border border-emi-accent p-4 rounded-lg text-center">
        <h3 class="mt-0 mb-3 text-base font-emi-heading text-emi-accent border-b border-white/10 pb-2">Game Over</h3>
        <div class="text-lg font-bold text-emi-accent">{engine.gameResult?.message}</div>
      </div>
    {/if}

    <div class="flex-grow flex flex-col min-h-[200px]">
      <h3 class="mt-0 mb-3 text-base font-emi-heading text-emi-accent border-b border-white/10 pb-2">Game Log</h3>
      <div class="flex-grow overflow-y-auto bg-black/30 rounded-lg p-3 font-emi-mono text-xs flex flex-col gap-1.5 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-black/10 [&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-thumb]:rounded-sm" bind:this={logContainer}>
        {#each engine.logs as log}
          <div class="leading-snug pb-1 border-b border-white/5 last:border-none {log.type === 'system' ? 'text-slate-400' : log.type === 'action' ? 'text-white' : log.type === 'error' ? 'text-emi-connection' : log.type === 'roll' ? 'text-emi-payday' : ''}">
            <span class="text-slate-400 text-[0.7rem]">[{log.turn}]</span> {log.msg}
          </div>
        {/each}
      </div>
    </div>
  {/if}
</div>
