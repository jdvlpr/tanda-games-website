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

<div class="action-panel">
  {#if engine}
    <div class="public-services">
      <h3>Center Pool</h3>
      <div class="pools">
        <div class="pool ticket">
          <span class="emoji">🎟️</span>
          <span class="count">{engine.publicServices.tickets}</span>
          <span class="label">Tickets</span>
        </div>
        <div class="pool passport">
          <span class="emoji">🛂</span>
          <span class="count">{engine.publicServices.passports}</span>
          <span class="label">Passports</span>
        </div>
      </div>
    </div>

    {#if engine.phase === 'preparation'}
      <div class="actions">
        <h3>Actions for {currentPlayer.name}</h3>
        <div class="action-grid">
          {#each actions as action}
            <button 
              class="btn-action" 
              class:optional={action.optional}
              disabled={!action.enabled || engine.pendingChoice}
              onclick={() => onaction(action.type)}
            >
              {action.label}
            </button>
          {/each}
        </div>
      </div>
    {:else if engine.phase === 'crossing'}
      <div class="actions crossing-phase">
        <h3>Border Crossing</h3>
        <p class="crossing-instruction">Select a security lane for {engine.players[engine.activeCrossingIdx].name}:</p>
        <div class="lane-grid">
          {#each engine.securityLanes as lane, i}
            <button 
              class="btn-lane" 
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
      <div class="game-over">
        <h3>Game Over</h3>
        <div class="result-message">{engine.gameResult?.message}</div>
      </div>
    {/if}

    <div class="logs">
      <h3>Game Log</h3>
      <div class="log-container" bind:this={logContainer}>
        {#each engine.logs as log}
          <div class="log-entry type-{log.type}">
            <span class="turn">[{log.turn}]</span> {log.msg}
          </div>
        {/each}
      </div>
    </div>
  {/if}
</div>

<style>
  .action-panel {
    background: var(--emi-bg-panel, rgba(30, 41, 59, 0.8));
    border-radius: 12px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    height: 100%;
    max-height: calc(100vh - 40px);
    overflow: hidden;
    font-family: var(--emi-font-ui, 'Public Sans', sans-serif);
    color: var(--emi-text-main, #f8fafc);
  }

  h3 {
    margin-top: 0;
    margin-bottom: 12px;
    font-size: 1rem;
    font-family: var(--emi-font-heading, 'Marvin Round', 'Public Sans', sans-serif);
    color: var(--emi-color-accent, #55b7b0);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    padding-bottom: 8px;
  }

  /* Public Services */
  .pools {
    display: flex;
    gap: 16px;
  }

  .pool {
    flex: 1;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    padding: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid rgba(255, 255, 255, 0.05);
  }

  .emoji { font-size: 1.5rem; margin-bottom: 4px; }
  .count { font-size: 1.5rem; font-weight: bold; }
  .label { font-size: 0.8rem; color: var(--emi-text-muted, #94a3b8); text-transform: uppercase; }

  /* Actions */
  .action-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  }

  .btn-action {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: white;
    padding: 10px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.85rem;
    font-weight: 600;
    transition: all 0.2s;
    font-family: inherit;
  }

  .btn-action:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.2);
    border-color: var(--emi-color-accent, #55b7b0);
  }

  .btn-action:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  .btn-action.optional {
    background: rgba(249, 197, 82, 0.1);
    border-color: rgba(249, 197, 82, 0.3);
    color: var(--emi-color-payday, #f9c552);
  }

  /* Phase 2 Lanes */
  .crossing-instruction {
    font-size: 0.9rem;
    margin-bottom: 12px;
  }

  .lane-grid {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .btn-lane {
    display: flex;
    justify-content: space-between;
    background: rgba(103, 167, 207, 0.1);
    border: 1px solid var(--emi-color-document, #67a7cf);
    color: white;
    padding: 12px;
    border-radius: 6px;
    cursor: pointer;
  }

  .btn-lane:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  /* Game Over */
  .game-over {
    background: rgba(85, 183, 176, 0.2);
    border: 1px solid var(--emi-color-accent, #55b7b0);
    padding: 16px;
    border-radius: 8px;
    text-align: center;
  }

  .result-message {
    font-size: 1.1rem;
    font-weight: bold;
    color: var(--emi-color-accent, #55b7b0);
  }

  /* Logs */
  .logs {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    min-height: 200px;
  }

  .log-container {
    flex-grow: 1;
    overflow-y: auto;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 8px;
    padding: 12px;
    font-family: var(--emi-font-mono, 'JetBrains Mono', monospace);
    font-size: 0.8rem;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .log-entry {
    line-height: 1.4;
    padding-bottom: 4px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  }

  .log-entry:last-child {
    border-bottom: none;
  }

  .turn {
    color: var(--emi-text-muted, #94a3b8);
    font-size: 0.7rem;
  }

  .type-system { color: var(--emi-text-muted, #94a3b8); }
  .type-action { color: #fff; }
  .type-error { color: var(--emi-color-connection, #c0656f); }
  .type-roll { color: var(--emi-color-payday, #f9c552); }

  /* Scrollbar */
  .log-container::-webkit-scrollbar { width: 6px; }
  .log-container::-webkit-scrollbar-track { background: rgba(0, 0, 0, 0.1); }
  .log-container::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.2); border-radius: 3px; }
</style>
