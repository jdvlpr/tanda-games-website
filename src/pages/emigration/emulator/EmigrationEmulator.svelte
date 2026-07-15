<script>
  import EmigrationEngine, { NATIONALITIES, DESTINATIONS, runTests } from './engine.js';
  import { createAutoPlayer } from './autoplay.js';
  
  import PlayerBoard from './PlayerBoard.svelte';
  import ActionPanel from './ActionPanel.svelte';
  import Modal from './Modal.svelte';

  // Props
  let { defaultMode = 'competitive', defaultPlayerCount = 2, showTestRunner = true } = $props();

  // Setup State
  let isSetup = $state(true);
  let mode = $state(defaultMode);
  let playerCount = $state(defaultPlayerCount);
  
  // Initialize default players
  let playersSetup = $state(Array.from({ length: 6 }, (_, i) => ({
    name: `Player ${i + 1}`,
    nationality: NATIONALITIES[i % NATIONALITIES.length].name,
    destination: DESTINATIONS[(i + 1) % DESTINATIONS.length].name
  })));

  // Derived setup slice based on player count
  let activeSetup = $derived(playersSetup.slice(0, playerCount));

  // Game State
  let engine = $state(null);
  let snapshot = $state(null); // reactive copy of engine state
  let autoplay = $state(null);
  
  // Selection State
  let selectedSlot = $state(null);
  let selectedStash = $state(null);
  
  // Tests
  let testResults = $state(null);

  function startGame(isAuto = false) {
    engine = new EmigrationEngine({
      mode,
      players: activeSetup,
      onLog: () => {
        // Force reactivity on logs by updating snapshot reference
        if (engine) snapshot = engine.getSnapshot();
      },
      onStateChange: () => {
        if (engine) snapshot = engine.getSnapshot();
        selectedSlot = null;
        selectedStash = null;
      }
    });

    snapshot = engine.getSnapshot();
    isSetup = false;
    testResults = null;

    if (isAuto) {
      autoplay = createAutoPlayer(engine);
      // Run auto test with 100ms delay per step so user can watch
      autoplay.playFullGame(100);
    }
  }

  function handleAction(actionType) {
    if (!engine) return;

    if (actionType === 'graduate' || actionType === 'sell') {
      engine.executeOptionalAction(actionType, { ...selectedStash });
    } else {
      engine.executeRequiredAction(actionType, { ...selectedSlot, ...selectedStash });
    }
  }

  function handleSelectLane(laneIdx) {
    if (engine) engine.selectLane(laneIdx);
  }

  function handleCardSelect(selection) {
    if (selection.type === 'layout') {
      selectedSlot = selection;
      selectedStash = null;
    } else if (selection.type === 'stash') {
      selectedStash = selection;
      selectedSlot = null;
    }
  }

  function handleModalResolve(value) {
    if (engine) engine.resolveChoice(value);
  }

  function runEngineTests() {
    testResults = runTests();
  }
</script>

<div class="emigration-emulator">
  {#if isSetup}
    <div class="setup-screen">
      <h1>Emigration Emulator</h1>
      
      {#if showTestRunner}
        <button class="btn-test" onclick={runEngineTests}>Run Engine Unit Tests</button>
        {#if testResults}
          <div class="test-results">
            {#each testResults as res}
              <div class="test-row" class:pass={res.pass} class:fail={!res.pass}>
                {res.pass ? '✅' : '❌'} {res.description}
              </div>
            {/each}
          </div>
        {/if}
      {/if}

      <div class="setup-form">
        <div class="form-group">
          <label>Game Mode</label>
          <div class="mode-toggles">
            <button class:active={mode === 'competitive'} onclick={() => mode = 'competitive'}>Competitive</button>
            <button class:active={mode === 'cooperative'} onclick={() => mode = 'cooperative'}>Cooperative</button>
          </div>
        </div>

        <div class="form-group">
          <label>Player Count: {playerCount}</label>
          <input type="range" min="2" max="6" bind:value={playerCount} />
        </div>

        <div class="players-list">
          {#each activeSetup as p, i}
            <div class="player-setup-row">
              <input type="text" bind:value={p.name} placeholder="Player Name" />
              <select bind:value={p.nationality}>
                {#each NATIONALITIES as nat}
                  <option value={nat.name}>{nat.name} (Fund: ${nat.fund})</option>
                {/each}
              </select>
              <span>→</span>
              <select bind:value={p.destination}>
                {#each DESTINATIONS as dest}
                  <option value={dest.name}>{dest.name}</option>
                {/each}
              </select>
            </div>
          {/each}
        </div>

        <div class="actions">
          <button class="btn-primary" onclick={() => startGame(false)}>Start Manual Playtest</button>
          <button class="btn-secondary" onclick={() => startGame(true)}>Start Automated Playtest</button>
        </div>
      </div>
    </div>
  {:else if snapshot}
    <div class="game-screen">
      <div class="game-header">
        <h2>Emigration — Phase: {snapshot.phase.toUpperCase()}</h2>
        <div class="header-controls">
          <button class="btn-sm" onclick={() => isSetup = true}>Restart / Setup</button>
        </div>
      </div>

      <div class="game-layout">
        <div class="boards-area">
          {#each snapshot.players as player}
            <PlayerBoard 
              {engine} 
              {player}
              isActive={snapshot.currentPlayerIdx === player.id && snapshot.phase !== 'game_over'}
              onCardSelect={handleCardSelect}
              {selectedSlot}
              {selectedStash}
            />
          {/each}
        </div>
        
        <div class="panel-area">
          <ActionPanel 
            {engine}
            currentPlayer={snapshot.players[snapshot.currentPlayerIdx]}
            actions={engine.getValidActions(snapshot.players[snapshot.currentPlayerIdx])}
            onaction={handleAction}
            onselectlane={handleSelectLane}
          />
        </div>
      </div>
      
      <Modal 
        choice={engine.pendingChoice} 
        onresolve={handleModalResolve} 
      />
    </div>
  {/if}
</div>

<style>
  :global(:root) {
    --emi-bg-dark: #0f172a;
    --emi-bg-panel: rgba(30, 41, 59, 0.85);
    --emi-color-document: #67a7cf;
    --emi-color-connection: #c0656f;
    --emi-color-payday: #f9c552;
    --emi-color-life: #d0a3cc;
    --emi-color-accent: #55b7b0;
    --emi-text-main: #f8fafc;
    --emi-text-muted: #94a3b8;
    --emi-font-ui: 'Public Sans', sans-serif;
    --emi-font-heading: 'Marvin Round', 'Public Sans', sans-serif;
    --emi-font-mono: 'JetBrains Mono', 'Fira Code', monospace;
  }

  .emigration-emulator {
    background-color: var(--emi-bg-dark);
    color: var(--emi-text-main);
    font-family: var(--emi-font-ui);
    min-height: 100vh;
    padding: 24px;
    box-sizing: border-box;
  }

  .emigration-emulator * {
    box-sizing: border-box;
  }

  /* Setup Screen */
  .setup-screen {
    max-width: 800px;
    margin: 0 auto;
  }

  h1 {
    font-family: var(--emi-font-heading);
    color: var(--emi-color-accent);
    text-align: center;
    margin-bottom: 40px;
  }

  .setup-form {
    background: var(--emi-bg-panel);
    padding: 32px;
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .form-group {
    margin-bottom: 24px;
  }

  label {
    display: block;
    margin-bottom: 8px;
    color: var(--emi-text-muted);
  }

  .mode-toggles {
    display: flex;
    gap: 12px;
  }

  .mode-toggles button {
    flex: 1;
    padding: 12px;
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: white;
    border-radius: 6px;
    cursor: pointer;
    font-size: 1rem;
    transition: all 0.2s;
  }

  .mode-toggles button.active {
    background: rgba(85, 183, 176, 0.2);
    border-color: var(--emi-color-accent);
    color: var(--emi-color-accent);
  }

  input[type="range"] {
    width: 100%;
    accent-color: var(--emi-color-accent);
  }

  .players-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 32px;
  }

  .player-setup-row {
    display: flex;
    gap: 12px;
    align-items: center;
  }

  .player-setup-row input, .player-setup-row select {
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: white;
    padding: 10px;
    border-radius: 6px;
    font-family: inherit;
    font-size: 0.9rem;
  }

  .player-setup-row input { flex: 1; }
  .player-setup-row select { flex: 1.5; }

  .actions {
    display: flex;
    gap: 16px;
  }

  button.btn-primary, button.btn-secondary {
    flex: 1;
    padding: 14px;
    border: none;
    border-radius: 8px;
    font-size: 1.1rem;
    font-weight: bold;
    cursor: pointer;
    transition: transform 0.2s;
  }

  button.btn-primary {
    background: var(--emi-color-accent);
    color: #000;
  }

  button.btn-secondary {
    background: rgba(255, 255, 255, 0.1);
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  button.btn-primary:hover, button.btn-secondary:hover {
    transform: translateY(-2px);
  }

  .btn-test {
    display: block;
    margin: 0 auto 20px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: var(--emi-text-muted);
    padding: 8px 16px;
    border-radius: 6px;
    cursor: pointer;
  }

  .test-results {
    background: #000;
    padding: 16px;
    border-radius: 8px;
    margin-bottom: 24px;
    font-family: var(--emi-font-mono);
    font-size: 0.8rem;
    max-height: 200px;
    overflow-y: auto;
  }

  .test-row.pass { color: #a3e635; }
  .test-row.fail { color: #ef4444; }

  /* Game Screen */
  .game-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  .game-header h2 {
    margin: 0;
    font-family: var(--emi-font-heading);
    color: var(--emi-color-accent);
  }

  .btn-sm {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: white;
    padding: 6px 12px;
    border-radius: 4px;
    cursor: pointer;
  }

  .game-layout {
    display: grid;
    grid-template-columns: 2fr 350px;
    gap: 24px;
    align-items: start;
  }

  .boards-area {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .panel-area {
    position: sticky;
    top: 24px;
  }

  @media (max-width: 1024px) {
    .game-layout {
      grid-template-columns: 1fr;
    }
    .panel-area {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      top: auto;
      z-index: 100;
      height: 40vh;
      border-top-left-radius: 20px;
      border-top-right-radius: 20px;
      box-shadow: 0 -10px 30px rgba(0,0,0,0.5);
    }
    .boards-area {
      padding-bottom: 45vh;
    }
  }
</style>
