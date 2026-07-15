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

  // Life Card Descriptions Dictionary
  const LIFE_CARD_DESCRIPTIONS = {
    'Stellar Reputation': 'May Keep: Gain 3 Money, OR keep this card and all Connections cost 1 Money less.',
    'Rummage Sale': 'Instant: Gain 3 Money, OR take 1 discarded Document.',
    'Island Paradise': 'Instant: Gain 1 Money. Player(s) with the fewest Documents also gain 1 Money.',
    'Swap Wallets': 'Instant: You may trade all your Money for another player\'s Money.',
    'VIP': 'Instant: Gain 1 Money for every 2 Money held by the player with the most Money.',
    'Fancy Clothes': 'May Keep: Gain 3 Money, OR keep this card and all Documents cost 1 Money less.',
    'Social Butterfly': 'Instant: Take 1 Connection OR 3 Money from another player.',
    'Identical Twin': 'Instant: Gain 1 Money and take another turn.',
    'Reward': 'Instant: Gain 1 Money and take 1 Money from every other player.',
    'Suspect': 'Instant: Lose 1 Money and lose 1 Connection or 1 Document.',
    'Salvage': 'Must Keep: Gain 1 Money, keep this card. Whenever another player discards a card, gain 1 Money.',
    'Blacklisted': 'Must Keep: Lose 1 Money, keep this card. Whenever you discard a card, lose 1 Money.',
    'Trousers Fall Down': 'Instant: Lose 3 Money, OR lose 1 Document.',
    'Keep Calm': 'Must Keep: Gain 1 Money and keep this card. You may discard a Life Card instead of taking it, then discard this card.',
    'Life Coach': 'Instant: Take 1 Assurance token.',
    'Shredder Accident': 'Instant: Lose 1 Document. If you have none, lose 1 Money.',
    'Camping': 'Instant: Gain 1 Money. Player(s) with the fewest Connections also gain 1 Money.',
    'FOMO': 'Instant: Lose 1 Money. You may trade Destinations with another player.',
    'Nostalgia': 'Instant: Replay any discarded Life Card, OR gain 2 Money.',
    'Lost & Found': 'Instant: Take 1 Document or 2 Money from another player.',
    'Pandemic / Economic Stimulus': 'Instant: First copy: Roll D6; everyone loses Money equal to roll. Second copy: Roll D6; everyone gains Money equal to roll.',
    'Mental Fog': 'Instant: Lose 1 Money. You may discard any Life Card.',
    'Insider': 'May Keep: Gain 3 Money, OR keep this card and on Paydays gain 1 Money.',
    'Philanthropy': 'Instant: Lose 1 Money. Starting with the player to your left, give 1 Money to every other player.',
    'Bailout': 'Instant: Gain 1 Money. Player(s) with the least Money also gain 1 Money.',
    'Share': 'Instant: Distribute half your Money (rounded down) to other players.',
    'Pay Cut': 'Must Keep: Lose 1 Money, keep this card. On Paydays, lose 1 Money.',
    'Productivity': 'Instant: Gain 1 Money. Decrease your Access Fee by 1 (minimum 0).',
    'Tariffs': 'Instant: Lose 1 Money. Increase your Access Fee by 1 (maximum 5).',
    'Boost': 'Instant: Gain half the Money tokens on any player\'s Nationality card (rounded down).',
    'Persuasion': 'Must Keep: Gain 1 Money and keep this card. When your Layout is targeted, you may offer this card instead. If declined, buyer pays double Access Fee.',
    'Underdog': 'Must Keep: Lose 1 Money and keep this card. After you gain a Life Card, lose 1 Money, then pass this card left.',
    'Frontrunner': 'Must Keep: Place 1 Money from the bank on this card (max 5). On Paydays, pass this card left. Money stays on this card and is only used for crossing.',
    'Penalty': 'Must Keep: Lose 1 Money and keep this card. After you gain a Document, pass this card left.',
    'Star Power': 'Must Keep: Gain 1 Money and keep this card. After any other player gains a Connection, you gain 1 Money, then give them this card.'
  };

  // Derived Values
  let currentPlayer = $derived(snapshot ? snapshot.players[snapshot.currentPlayerIdx] : null);
  let selectionText = $derived.by(() => {
    if (!snapshot) return 'Select an available layout card or stash item, then choose your action.';
    if (selectedSlot) {
      const targetPlayer = snapshot.players[selectedSlot.playerIdx];
      const slot = targetPlayer?.layout[selectedSlot.slotIdx];
      if (slot && slot.card) {
        const cardName = slot.card.name || slot.card.title || '';
        let text = `Selected Card: <span class="text-emi-accent font-bold">${cardName}</span> in ${targetPlayer.name}'s layout.`;
        if (slot.card.type === 'life') {
          const desc = LIFE_CARD_DESCRIPTIONS[cardName];
          if (desc) {
            text += `<br/><span class="text-slate-400 font-normal text-xs mt-1.5 block">${desc}</span>`;
          }
        }
        return text;
      }
    }
    if (selectedStash) {
      const targetPlayer = snapshot.players[selectedStash.playerIdx];
      let cardName = "";
      const type = selectedStash.stashType;
      const i = selectedStash.itemIdx;
      if (type === 'document') cardName = targetPlayer?.stash.documents[i]?.name || "";
      else if (type === 'connection') cardName = targetPlayer?.stash.connections[i]?.name || "";
      else if (type === 'ticket') cardName = "Ticket";
      else if (type === 'passport') cardName = "Passport";
      else if (type === 'lifeCard') {
        const card = targetPlayer?.stash.lifeCards[i];
        cardName = card?.title || "";
        let text = `Selected Stash Item: <span class="text-emi-accent font-bold">${cardName}</span> from ${targetPlayer.name}'s stash.`;
        const desc = LIFE_CARD_DESCRIPTIONS[cardName];
        if (desc) {
          text += `<br/><span class="text-slate-400 font-normal text-xs mt-1.5 block">${desc}</span>`;
        }
        return text;
      }
      
      return `Selected Stash Item: <span class="text-emi-accent font-bold">${cardName}</span> from ${targetPlayer.name}'s stash.`;
    }
    return 'Select an available layout card or stash item, then choose your action.';
  });
  
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

  function handleBuyPool(cardType) {
    if (engine) engine.executeRequiredAction('buyPool', { cardType });
  }

  function handleStealPool(cardType) {
    if (engine) engine.executeRequiredAction('steal', { cardType });
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

      <div class="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6 items-start max-w-[1600px] mx-auto w-full">
        <!-- Left Main Column: Public Pool & Player Boards -->
        <div class="flex flex-col gap-6 max-lg:pb-[45vh]">
          <!-- Public Center Pool -->
          <div class="bg-emi-bg-panel border border-white/10 rounded-xl p-5 backdrop-blur-md">
            <div class="font-emi-heading text-emi-accent text-base border-b border-white/10 pb-2 mb-4">Public Center Pool</div>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <!-- Tickets -->
              <div class="flex items-center gap-4 bg-black/20 p-3.5 rounded-lg border border-white/5">
                <div>
                  <div class="font-bold text-sm">Tickets</div>
                  <div class="text-xs text-slate-400">Cost: $2 Money</div>
                  <div class="text-[0.7rem] text-slate-400">Req: 1+ Connection</div>
                </div>
                <div class="flex flex-col gap-1 ml-auto items-end">
                  <div class="text-2xl font-bold flex items-center gap-1.5">
                    <span>🎟️</span>
                    <span>{snapshot.publicServices.tickets}</span>
                  </div>
                  {#if snapshot.phase === 'preparation' && currentPlayer}
                    <div class="flex gap-1">
                      <button
                        class="px-2 py-0.5 text-[0.65rem] font-bold bg-emi-accent text-black rounded hover:opacity-90 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                        disabled={snapshot.publicServices.tickets <= 0 || currentPlayer.money < 2 || currentPlayer.stash.connections.length < 1 || engine.pendingChoice}
                        onclick={() => handleBuyPool('ticket')}
                      >
                        Buy
                      </button>
                      <button
                        class="px-2 py-0.5 text-[0.65rem] font-bold bg-white/10 text-white border border-white/20 rounded hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                        disabled={snapshot.publicServices.tickets <= 0 || currentPlayer.stash.connections.length < 1 || engine.pendingChoice}
                        onclick={() => handleStealPool('ticket')}
                      >
                        Steal
                      </button>
                    </div>
                  {/if}
                </div>
              </div>

              <!-- Passports -->
              <div class="flex items-center gap-4 bg-black/20 p-3.5 rounded-lg border border-white/5">
                <div>
                  <div class="font-bold text-sm">Passports</div>
                  <div class="text-xs text-slate-400">Cost: $2 Money</div>
                  <div class="text-[0.7rem] text-slate-400">Req: 1+ Document</div>
                </div>
                <div class="flex flex-col gap-1 ml-auto items-end">
                  <div class="text-2xl font-bold flex items-center gap-1.5">
                    <span>🛂</span>
                    <span>{snapshot.publicServices.passports}</span>
                  </div>
                  {#if snapshot.phase === 'preparation' && currentPlayer}
                    <div class="flex gap-1">
                      <button
                        class="px-2 py-0.5 text-[0.65rem] font-bold bg-emi-accent text-black rounded hover:opacity-90 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                        disabled={snapshot.publicServices.passports <= 0 || currentPlayer.money < 2 || currentPlayer.stash.documents.length < 1 || engine.pendingChoice}
                        onclick={() => handleBuyPool('passport')}
                      >
                        Buy
                      </button>
                      <button
                        class="px-2 py-0.5 text-[0.65rem] font-bold bg-white/10 text-white border border-white/20 rounded hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                        disabled={snapshot.publicServices.passports <= 0 || currentPlayer.stash.documents.length < 1 || engine.pendingChoice}
                        onclick={() => handleStealPool('passport')}
                      >
                        Steal
                      </button>
                    </div>
                  {/if}
                </div>
              </div>

              <!-- Security Lanes -->
              <div class="lg:col-span-2 flex flex-col gap-2 bg-black/20 p-3.5 rounded-lg border border-white/5">
                <div class="font-bold text-[0.8rem] uppercase tracking-wider text-slate-400">Security Lanes (Border Crossing)</div>
                <div class="flex gap-3 overflow-x-auto pb-1">
                  {#each snapshot.securityLanes as lane, i}
                    <div class="bg-[#1e293b] border border-white/10 rounded-lg p-2.5 min-w-[125px] flex flex-col items-center text-center flex-1 transition-all">
                      <div class="font-bold text-xs leading-snug">{lane.name}</div>
                      <div class="text-[0.65rem] text-slate-400 mb-1">{lane.tokens.length} left</div>
                      <div class="flex gap-1 justify-center my-1.5">
                        {#each lane.tokens as token}
                          <div class="w-2.5 h-2.5 rounded-full bg-emi-accent border border-white/40"></div>
                        {/each}
                      </div>
                      {#if snapshot.phase === 'crossing'}
                        <button 
                          class="mt-1 bg-white/10 border border-white/20 text-white py-1 px-2 rounded text-[0.65rem] cursor-pointer hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed font-semibold w-full"
                          disabled={lane.tokens.length === 0 || engine.pendingChoice}
                          onclick={() => handleSelectLane(i)}
                        >
                          Select Lane
                        </button>
                      {/if}
                    </div>
                  {/each}
                </div>
              </div>
            </div>
          </div>

          <!-- Player Boards -->
          {#each snapshot.players as player}
            <PlayerBoard 
              {engine} 
              {player}
              isActive={(snapshot.phase === 'preparation' && snapshot.currentPlayerIdx === player.id) || (snapshot.phase === 'crossing' && snapshot.activeCrossingIdx === player.id)}
              onCardSelect={handleCardSelect}
              {selectedSlot}
              {selectedStash}
            />
          {/each}
        </div>
        
        <!-- Right Sidebar: Sticky Action Panel -->
        <div class="lg:sticky lg:top-6 max-lg:fixed max-lg:bottom-0 max-lg:left-0 max-lg:right-0 max-lg:top-auto max-lg:z-[100] max-lg:h-[40vh] max-lg:rounded-t-[20px] max-lg:shadow-[0_-10px_30px_rgba(0,0,0,0.5)] max-lg:bg-emi-bg-dark h-[calc(100vh-40px)]">
          <ActionPanel 
            {engine}
            {snapshot}
            currentPlayer={snapshot.players[snapshot.currentPlayerIdx]}
            actions={engine.getValidActions(snapshot.players[snapshot.currentPlayerIdx])}
            onaction={handleAction}
            onselectlane={handleSelectLane}
            {selectionText}
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
