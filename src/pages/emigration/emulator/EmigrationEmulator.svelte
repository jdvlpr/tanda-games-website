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

    const source = selectedSlot ? 'layout' : (selectedStash ? 'stash' : null);
    const params = {
      ...selectedSlot,
      ...selectedStash,
      source,
      targetPlayerIdx: selectedSlot?.playerIdx ?? selectedStash?.playerIdx,
      stashIdx: selectedStash?.itemIdx,
    };

    if (actionType === 'graduate' || actionType === 'sell') {
      engine.executeOptionalAction(actionType, params);
    } else {
      engine.executeRequiredAction(actionType, params);
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

<div class="bg-emi-bg-dark text-slate-50 font-emi-ui min-h-screen p-6 box-border *:box-border">
  {#if isSetup}
    <div class="max-w-[800px] mx-auto">
      <h1 class="font-emi-heading text-emi-accent text-center mb-10 text-4xl mt-0">Emigration Emulator</h1>
      
      {#if showTestRunner}
        <button class="block mx-auto mb-5 bg-white/5 border border-white/10 text-slate-400 py-2 px-4 rounded-md cursor-pointer" onclick={runEngineTests}>Run Engine Unit Tests</button>
        {#if testResults}
          <div class="bg-black p-4 rounded-lg mb-6 font-emi-mono text-xs max-h-[200px] overflow-y-auto">
            {#each testResults as res}
              <div class="mb-1 {res.pass ? 'text-[#a3e635]' : 'text-[#ef4444]'}">
                {res.pass ? '✅' : '❌'} {res.description}
              </div>
            {/each}
          </div>
        {/if}
      {/if}

      <div class="bg-emi-bg-panel p-8 rounded-xl border border-white/10">
        <div class="mb-6">
          <label class="block mb-2 text-slate-400">Game Mode</label>
          <div class="flex gap-3">
            <button class="flex-1 p-3 bg-black/30 border text-white rounded-md cursor-pointer text-base transition-all duration-200 {mode === 'competitive' ? 'bg-[rgba(85,183,176,0.2)] border-emi-accent text-emi-accent' : 'border-white/10'}" onclick={() => mode = 'competitive'}>Competitive</button>
            <button class="flex-1 p-3 bg-black/30 border text-white rounded-md cursor-pointer text-base transition-all duration-200 {mode === 'cooperative' ? 'bg-[rgba(85,183,176,0.2)] border-emi-accent text-emi-accent' : 'border-white/10'}" onclick={() => mode = 'cooperative'}>Cooperative</button>
          </div>
        </div>

        <div class="mb-6">
          <label class="block mb-2 text-slate-400">Player Count: {playerCount}</label>
          <input class="w-full accent-emi-accent" type="range" min="2" max="6" bind:value={playerCount} />
        </div>

        <div class="flex flex-col gap-3 mb-8">
          {#each activeSetup as p, i}
            <div class="flex gap-3 items-center">
              <input class="flex-1 bg-black/30 border border-white/10 text-white p-2.5 rounded-md font-inherit text-sm" type="text" bind:value={p.name} placeholder="Player Name" />
              <select class="flex-[1.5] bg-black/30 border border-white/10 text-white p-2.5 rounded-md font-inherit text-sm" bind:value={p.nationality}>
                {#each NATIONALITIES as nat}
                  <option value={nat.name}>{nat.name} (Fund: ${nat.fund})</option>
                {/each}
              </select>
              <span class="text-slate-400">→</span>
              <select class="flex-[1.5] bg-black/30 border border-white/10 text-white p-2.5 rounded-md font-inherit text-sm" bind:value={p.destination}>
                {#each DESTINATIONS as dest}
                  <option value={dest.name}>{dest.name}</option>
                {/each}
              </select>
            </div>
          {/each}
        </div>

        <div class="flex gap-4">
          <button class="flex-1 p-3.5 border-none rounded-lg text-lg font-bold cursor-pointer transition-transform duration-200 hover:-translate-y-0.5 bg-emi-accent text-black" onclick={() => startGame(false)}>Start Manual Playtest</button>
          <button class="flex-1 p-3.5 rounded-lg text-lg font-bold cursor-pointer transition-transform duration-200 hover:-translate-y-0.5 bg-white/10 text-white border border-white/20" onclick={() => startGame(true)}>Start Automated Playtest</button>
        </div>
      </div>
    </div>
  {:else if snapshot}
    <div>
      <div class="flex justify-between items-center mb-5">
        <h2 class="m-0 font-emi-heading text-emi-accent text-2xl">Emigration — Phase: {snapshot.phase.toUpperCase()}</h2>
        <div>
          <button class="bg-white/10 border border-white/20 text-white py-1.5 px-3 rounded cursor-pointer transition-colors hover:bg-white/20" onclick={() => isSetup = true}>Restart / Setup</button>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-[2fr_350px] gap-6 items-start">
        <div class="flex flex-col gap-6 max-lg:pb-[45vh]">
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
        
        <div class="lg:sticky lg:top-6 max-lg:fixed max-lg:bottom-0 max-lg:left-0 max-lg:right-0 max-lg:top-auto max-lg:z-[100] max-lg:h-[40vh] max-lg:rounded-t-[20px] max-lg:shadow-[0_-10px_30px_rgba(0,0,0,0.5)] max-lg:bg-emi-bg-dark">
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
