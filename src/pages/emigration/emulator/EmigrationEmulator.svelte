<script>
  import EmigrationEngine, { NATIONALITIES, DESTINATIONS, PACKS_LIST, runTests } from './engine.js';
  import { createAutoPlayer } from './autoplay.js';
  
  import PlayerBoard from './PlayerBoard.svelte';
  import ActionPanel from './ActionPanel.svelte';
  import Modal from './Modal.svelte';

  // Props
  let { defaultMode = 'competitive', defaultPlayerCount = 2, showTestRunner = true } = $props();

  // Life pack defaults by player count
  const PACK_DEFAULTS = {
    2: ['Friendship', 'News'],
    3: ['Vacation', 'News', 'Downtown'],
    4: ['News', 'Sports', 'Downtown', 'Friendship'],
    5: ['High Society', 'Downtown', 'Emergency', 'Vacation', 'News'],
    6: ['High Society', 'Downtown', 'Emergency', 'Vacation', 'News', 'Charity'],
  };

  // Setup State
  let isSetup = $state(true);
  let mode = $state(defaultMode);
  let playerCount = $state(defaultPlayerCount);
  let selectedPacks = $state(PACK_DEFAULTS[playerCount]);
  
  // Initialize default players
  let playersSetup = $state(Array.from({ length: 6 }, (_, i) => ({
    name: `Player ${i + 1}`,
    nationality: NATIONALITIES[i % NATIONALITIES.length].name,
    destination: DESTINATIONS[(i + 1) % DESTINATIONS.length].name
  })));

  // Derived setup slice based on player count
  let activeSetup = $derived(playersSetup.slice(0, playerCount));

  // Auto-update selectedPacks when playerCount changes
  $effect(() => {
    selectedPacks = PACK_DEFAULTS[playerCount];
  });

  // Game State
  let engine = $state(null);
  let snapshot = $state(null); // reactive copy of engine state
  let pendingChoice = $state(null);
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
        let text = `Selected Card: <span class=" font-bold">${cardName}</span> in ${targetPlayer.name}'s layout.`;
        if (slot.card.type === 'life') {
          const desc = LIFE_CARD_DESCRIPTIONS[cardName];
          if (desc) {
            text += `<br/><span class=" font-normal text-xs mt-1.5 block">${desc}</span>`;
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
        let text = `Selected Stash Item: <span class=" font-bold">${cardName}</span> from ${targetPlayer.name}'s stash.`;
        const desc = LIFE_CARD_DESCRIPTIONS[cardName];
        if (desc) {
          text += `<br/><span class=" font-normal text-xs mt-1.5 block">${desc}</span>`;
        }
        return text;
      }
      
      return `Selected Stash Item: <span class=" font-bold">${cardName}</span> from ${targetPlayer.name}'s stash.`;
    }
    return 'Select an available layout card or stash item, then choose your action.';
  });
  
  // Tests
  let testResults = $state(null);

  function startGame(isAuto = false) {
    engine = new EmigrationEngine({
      mode,
      players: activeSetup,
      selectedPacks,
      onLog: () => {
        // Force reactivity on logs by updating snapshot reference
        if (engine) snapshot = engine.getSnapshot();
      },
      onStateChange: () => {
        if (engine) {
          snapshot = engine.getSnapshot();
          pendingChoice = engine.pendingChoice ?? null;
        }
        selectedSlot = null;
        selectedStash = null;
      }
    });

    snapshot = engine.getSnapshot();
    pendingChoice = engine.pendingChoice ?? null;
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
    if (engine) {
      pendingChoice = null;
      engine.resolveChoice(value);
    }
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

<div class="bg-neutral-100 dark:bg-neutral-900 font-emi-ui min-h-screen p-6 box-border *:box-border">
  {#if isSetup}
    <div class="max-w-[750px] mx-auto">
      <h1 class="font-emi-heading  text-center  mb-4 text-4xl">Emigration Emulator</h1>

      <div class="bg-neutral-200 dark:bg-neutral-800 p-8 rounded-md flex flex-col gap-5">
        <div class="flex flex-col gap-2">
          <p>Game Mode</p>
          <div class="flex flex-wrap gap-3 justify-center">
            <button class="btn flex-1 {mode === 'competitive' && 'bg-green-100 dark:bg-green-900'}" onclick={() => mode = 'competitive'}>Competitive</button>
            <button class=" btn flex-1 {mode === 'cooperative' && 'bg-green-100 dark:bg-green-900'}" onclick={() => mode = 'cooperative'}>Cooperative</button>
          </div>
        </div>

        <label>Player Count:
            <select class="w-fit" bind:value={playerCount}>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
            </select>
        </label>

        <div class="flex flex-col gap-2">
          {#each activeSetup as p, i}
            <div class="flex gap-3 items-center">
              <input class="flex-1" type="text" bind:value={p.name} placeholder="Player Name" />
              <select class="flex-[1.5]" bind:value={p.nationality}>
                {#each NATIONALITIES as nat}
                  <option value={nat.name}>{nat.name} (Starting Money: ${nat.fund})</option>
                {/each}
              </select>
              <span class="">→</span>
              <select class="flex-[1.5]" bind:value={p.destination}>
                {#each DESTINATIONS as dest}
                  <option value={dest.name}>{dest.name}</option>
                {/each}
              </select>
            </div>
          {/each}
        </div>

        <div class="flex flex-col gap-3">
          <p class="">Life Card Packs</p>
          <div class="flex flex-wrap gap-2">
            {#each PACKS_LIST as pack}
              <button
                class="btn flex-1 {selectedPacks.includes(pack) ? 'bg-green-100 dark:bg-green-900  ' : ''}"
                onclick={() => {
                  if (selectedPacks.includes(pack)) {
                    selectedPacks = selectedPacks.filter(p => p !== pack);
                  } else {
                    selectedPacks = [...selectedPacks, pack];
                  }
                }}
              >
                {pack}
              </button>
            {/each}
          </div>
        </div>

        <div class="flex gap-4 mt-8">
          <button class="flex-1 btn" onclick={() => startGame(false)}>Start Manual Playtest</button>
          <button class="flex-1 btn" onclick={() => startGame(true)}>Start Automated Playtest</button>
        </div>
      </div>

      {#if showTestRunner}
      <button class="my-8 cursor-pointer" onclick={runEngineTests}>Run Engine Unit Tests</button>
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
    </div>
  {:else if snapshot}
    <div>
      <div class="flex justify-between items-center mb-5">
        <h2 class="text-2xl tracking-wide">{snapshot.phase.toUpperCase()}</h2>
        <div>
          <button class="btn" onclick={() => isSetup = true}>Restart / Setup</button>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6 items-start max-w-[1600px] mx-auto w-full">
        <!-- Left Main Column: Public Pool & Player Boards -->
        <div class="flex flex-col gap-2 max-lg:pb-[45vh]">
          <!-- Public Center Pool -->
          <div class="bg-neutral-200 dark:bg-neutral-800 rounded-md p-5 backdrop-blur-md">
          <!-- Security Lanes -->
            <div class="lg:col-span-2 flex flex-col gap-2 p-1 rounded-md">
                <div class="text-sm uppercase tracking-wider ">Security Lanes</div>
                <div class="flex gap-2 overflow-x-auto pb-1">
                  {#each snapshot.securityLanes as lane, i}
                    <div class="bg-neutral-300 dark:bg-neutral-700 rounded-md gap-1 p-2 min-w-[100px] flex flex-col items-center text-center flex-1 transition-all">
                      <div class="font-bold text-xs leading-snug">{lane.name}</div>
                      <div class="text-xs mb-1 flex gap-1">
                      {#each lane.unshuffledTokens as tokenNumber}
                      <p class="bg-red-200 dark:bg-red-800 px-2 py-1 rounded-md">{tokenNumber}</p>
                      {/each}
                      </div>
                      <div class="flex gap-1 justify-center">
                        {#each lane.tokens as token}
                          <div class="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                        {/each}
                      </div>
                      {#if snapshot.phase === 'crossing'}
                        <button 
                          class="btn w-full"
                          disabled={lane.tokens.length === 0 || pendingChoice}
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
            
            <div class="pb-2 text-sm uppercase tracking-wider ">Public Services cards</div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto">
              <!-- Tickets -->
              <div class="flex  items-center gap-4 bg-neutral-200 dark:bg-neutral-800 p-3.5 rounded-md">
                <div class="text-left">
                  <div class="font-bold text-sm">Tickets</div>
                  <div class="text-xs ">Cost: $2 Money</div>
                  <div class="text-xs ">Req: 1+ Connection</div>
                </div>
                <div class="flex flex-col gap-1 ml-auto items-end">
                  <div class="text-2xl font-bold flex items-center gap-1.5">
                    <span>🎟️</span>
                    <span>{snapshot.publicServices.tickets}</span>
                  </div>
                  {#if snapshot.phase === 'preparation' && currentPlayer}
                    <div class="flex gap-1">
                      <button
                        class="btn text-sm p-2"
                        disabled={snapshot.publicServices.tickets <= 0 || currentPlayer.money < 2 || currentPlayer.stash.connections.length < 1 || pendingChoice}
                        onclick={() => handleBuyPool('ticket')}
                      >
                        Buy
                      </button>
                      <button
                        class="btn text-sm p-2"
                        disabled={snapshot.publicServices.tickets <= 0 || currentPlayer.stash.connections.length < 1 || pendingChoice}
                        onclick={() => handleStealPool('ticket')}
                      >
                        Steal
                      </button>
                    </div>
                  {/if}
                </div>
              </div>

              <!-- Passports -->
              <div class="flex items-center gap-4  bg-neutral-200 dark:bg-neutral-800 p-3.5 rounded-md border border-white/5">
                <div class="text-left">
                  <div class="font-bold text-sm">Passports</div>
                  <div class="text-xs ">Cost: $2 Money</div>
                  <div class="text-xs ">Req: 1+ Document</div>
                </div>
                <div class="flex flex-col gap-1 ml-auto items-end">
                  <div class="text-2xl font-bold flex items-center gap-1.5">
                    <span>🛂</span>
                    <span>{snapshot.publicServices.passports}</span>
                  </div>
                  {#if snapshot.phase === 'preparation' && currentPlayer}
                    <div class="flex gap-1">
                      <button
                        class="btn text-xs p-2"
                        disabled={snapshot.publicServices.passports <= 0 || currentPlayer.money < 2 || currentPlayer.stash.documents.length < 1 || pendingChoice}
                        onclick={() => handleBuyPool('passport')}
                      >
                        Buy
                      </button>
                      <button
                        class="btn text-xs p-2"
                        disabled={snapshot.publicServices.passports <= 0 || currentPlayer.stash.documents.length < 1 || pendingChoice}
                        onclick={() => handleStealPool('passport')}
                      >
                        Steal
                      </button>
                    </div>
                  {/if}
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
        <div class="lg:sticky lg:top-6 max-lg:fixed max-lg:bottom-0 max-lg:left-0 max-lg:right-0 max-lg:top-auto max-lg:z-[100] max-lg:h-[40vh] h-[calc(100vh-40px)]">
          <ActionPanel 
            {engine}
            {snapshot}
            currentPlayer={snapshot.players[snapshot.currentPlayerIdx]}
            actions={engine.getValidActions(snapshot.players[snapshot.currentPlayerIdx])}
            onaction={handleAction}
            onselectlane={handleSelectLane}
            {selectionText}
            {pendingChoice}
          />
        </div>
      </div>
      
      <Modal 
        choice={pendingChoice} 
        onresolve={handleModalResolve} 
      />
    </div>
  {/if}
</div>
