<script>
  import Icon from '@iconify/svelte';
  import ActionPanel from './ActionPanel.svelte';
  import CardActionPopover from './CardActionPopover.svelte';
  import { createAutoPlayer } from './autoplay.js';
  import EmigrationEngine, { DESTINATIONS, LIFE_CARD_DEFINITIONS, NATIONALITIES, NATIONALITY_TO_COUNTRY, PACKS_LIST, runTests, shuffleArray } from './engine.svelte.js';
  import GameLogSheet from './GameLogSheet.svelte';
  import Modal from './Modal.svelte';
  import { playPaydaySound } from '../../js/utils.svelte.js';
  import PlayerBoard from './PlayerBoard.svelte';

  // Responsive: track mobile vs desktop
  let isMobile = $state(false);
  $effect(() => {
    const mql = window.matchMedia('(max-width: 1023px)');
    isMobile = mql.matches;
    const handler = (e) => { isMobile = e.matches; };
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  });

  // Props
  let { defaultMode = 'competitive', defaultPlayerCount = 2, showTestRunner = true } = $props();

  function getRandomPacks(count) {
    return shuffleArray([...PACKS_LIST]).slice(0, count);
  }

  function getRandomPlayersSetup() {
    const shuffledNats = shuffleArray([...NATIONALITIES]);
    const shuffledDests = shuffleArray([...DESTINATIONS]);
    return Array.from({ length: 6 }, (_, i) => {
      const nat = shuffledNats[i % shuffledNats.length].name;
      const matchingCountry = NATIONALITY_TO_COUNTRY[nat];
      const validDests = shuffledDests.filter(d => d.name !== matchingCountry);
      const destObj = validDests[i % validDests.length] || shuffledDests[i % shuffledDests.length];
      return {
        name: `Player ${i + 1}`,
        nationality: nat,
        destination: destObj.name
      };
    });
  }

  // Setup State
  let isSetup = $state(true);
  let mode = $state(defaultMode);
  let playerCount = $state(defaultPlayerCount);
  let selectedPacks = $state(getRandomPacks(defaultPlayerCount));
  let aiDifficulty = $state('expert');
  
  // Initialize default players with randomized nationalities and destinations
  let playersSetup = $state(getRandomPlayersSetup());

  // Derived setup slice based on player count
  let activeSetup = $derived(playersSetup.slice(0, playerCount));

  // Game State
  let engine = $state(null);
  let snapshot = $state(null); // reactive copy of engine state
  let pendingChoice = $state(null);
  let autoplay = $state(null);

  // Solo vs AI State
  let vsComputer = $state(false);
  let aiPlayer = $state(null);
  let aiThinking = $state(false);
  let gameType = $state('vscomputer');

  // Selection State
  let selectedSlot = $state(null);
  let selectedStash = $state(null);
  let selectedAnchorRect = $state(null);

  function getLifeCardDescription(title) {
    return LIFE_CARD_DEFINITIONS.find((card) => card.title === title)?.description ?? '';
  }

  // Derived Values
  let currentPlayer = $derived(snapshot ? snapshot.players[actualActivePlayerId] : null);

  /**
   * Filter the engine's valid actions based on which card (if any) is currently selected.
   * Per the game spec:
   *  - Layout payday/life  → only Activate is applicable
   *  - Layout doc/conn     → only Buy and Discard are applicable (Activate is not)
   *  - Stash doc/conn      → only Sell (optional) and Discard are applicable
   *  - Stash ticket/pass   → only Reclaim is applicable (taking from another player's stash)
   *  - No selection        → return actions unchanged
   */
  let filteredActions = $derived.by(() => {
    if (!snapshot || !engine) return [];
    const raw = engine.getValidActions(snapshot.players[snapshot.currentPlayerIdx]);

    // Determine what card type is selected, and where it lives
    let selectionCardType = null;  // 'payday' | 'life' | 'document' | 'connection'
    let selectionSource = null;    // 'layout' | 'stash-doc' | 'stash-conn' | 'stash-ticket' | 'stash-passport'

    if (selectedSlot) {
      const targetPlayer = snapshot.players[selectedSlot.playerIdx];
      const card = targetPlayer?.layout[selectedSlot.slotIdx]?.card;
      if (card) {
        selectionCardType = card.type;
        selectionSource = 'layout';
      }
    } else if (selectedStash) {
      const t = selectedStash.stashType;
      if (t === 'document')  { selectionCardType = 'document';  selectionSource = 'stash-doc'; }
      if (t === 'connection'){ selectionCardType = 'connection'; selectionSource = 'stash-conn'; }
      if (t === 'ticket')    { selectionCardType = 'ticket';     selectionSource = 'stash-ticket'; }
      if (t === 'passport')  { selectionCardType = 'passport';   selectionSource = 'stash-passport'; }
    }

    // No selection — disable actions that require a target card
    if (!selectionSource) {
      return raw.map(action => {
        if (['activate', 'buy', 'discard', 'sell', 'reclaim', 'steal'].includes(action.type)) {
          return { ...action, enabled: false };
        }
        return action;
      });
    }

    return raw.map(action => {
      let allowed = true;

      if (selectionSource === 'layout') {
        if (selectionCardType === 'payday' || selectionCardType === 'life') {
          // Payday & Life: only Activate
          allowed = action.type === 'activate';
        } else if (selectionCardType === 'document' || selectionCardType === 'connection') {
          // Doc & Conn in layout: Buy or Discard only
          allowed = action.type === 'buy' || action.type === 'discard';
        }
      } else if (selectionSource === 'stash-doc' || selectionSource === 'stash-conn') {
        // Stash doc/conn: Sell only (Discard is only valid on layout cards)
        allowed = action.type === 'sell';
      } else if (selectionSource === 'stash-ticket' || selectionSource === 'stash-passport') {
        // Stash ticket/passport: only Reclaim (targeting another player's extra ticket/passport)
        allowed = action.type === 'reclaim';
      }

      return allowed ? action : { ...action, enabled: false };
    });
  });

  // ── Action splitting ─────────────────────────────────────────────────────
  // Card-specific actions → live in the popover
  const POPOVER_ACTION_TYPES = new Set(['buy', 'discard', 'activate', 'sell', 'reclaim']);
  // Also exclude 'steal' from the dashboard — it already has dedicated buttons in Public Resources
  const DASHBOARD_EXCLUDED_TYPES = new Set(['buy', 'discard', 'activate', 'sell', 'reclaim', 'steal']);

  let popoverActions    = $derived(filteredActions.filter(a => POPOVER_ACTION_TYPES.has(a.type)));
  let dashboardActions  = $derived(filteredActions.filter(a => !DASHBOARD_EXCLUDED_TYPES.has(a.type)));

  let popoverDescription = $derived.by(() => {
    if (!snapshot) return '';
    if (selectedSlot) {
      const p = snapshot.players[selectedSlot.playerIdx];
      const card = p?.layout[selectedSlot.slotIdx]?.card;
      if (card && card.type === 'life') {
        return getLifeCardDescription(card.name || card.title || '');
      }
    }
    if (selectedStash) {
      const p = snapshot.players[selectedStash.playerIdx];
      const { stashType: t, itemIdx: i } = selectedStash;
      if (t === 'lifeCard') {
        const card = p?.stash.lifeCards[i];
        return getLifeCardDescription(card?.title || '');
      }
    }
    return '';
  });

  let showPopover = $derived(
    !!(selectedAnchorRect && (selectedSlot || selectedStash) && snapshot?.phase === 'preparation')
  );

  let actualActivePlayerId = $derived(snapshot ? (snapshot.phase === 'preparation' ? snapshot.currentPlayerIdx : (snapshot.crossingOrder ? snapshot.crossingOrder[snapshot.activeCrossingIdx] : snapshot.activeCrossingIdx)) : 0);
  let visualActivePlayerId = $state(0);
  let previousActualPlayerId = $state(0);
  let isTransitioning = $state(false);

  $effect(() => {
    if (actualActivePlayerId !== previousActualPlayerId) {
      const prev = previousActualPlayerId;
      previousActualPlayerId = actualActivePlayerId;
      
      if (vsComputer && prev !== 0 && prev !== null) {
        isTransitioning = true;
        setTimeout(() => {
          visualActivePlayerId = actualActivePlayerId;
          isTransitioning = false;
        }, 1000);
      } else {
        visualActivePlayerId = actualActivePlayerId;
      }
    }
  });

  // In Solo vs AI mode: is it currently the human player's turn (index 0)?
  let isHumanTurn = $derived(
    !vsComputer ||
    !snapshot ||
    snapshot.phase === 'game_over' ||
    visualActivePlayerId === 0
  );

  // Drive AI turns whenever snapshot changes in Solo vs AI mode
  $effect(() => {
    if (!vsComputer || !snapshot || !aiPlayer || aiThinking || isTransitioning) return;
    if (snapshot.phase === 'game_over') return;
    
    // In vsComputer mode, player 0 is the human player.
    // If there is a pending choice specifically targeted at the human player (player 0),
    // we must pause AI turns so the human player can answer via the modal.
    if (pendingChoice && pendingChoice.playerIdx === 0) return;

    // If there is a pending choice directed at an AI player during the human's turn
    // (e.g. persuasion-offer fired when the human targets an AI's layout), resolve it
    // immediately without playing a full AI turn — then let the effect re-run.
    if (pendingChoice && pendingChoice.playerIdx !== 0) {
      aiThinking = true;
      setTimeout(() => {
        if (!engine || engine.phase === 'game_over') { aiThinking = false; return; }
        let safety = 0;
        while (engine.pendingChoice && safety < 20) {
          if (engine.pendingChoice.playerIdx === 0) break;
          aiPlayer.resolveChoice();
          safety++;
        }
        aiThinking = false;
      }, 500);
      return;
    }

    if (isHumanTurn) return;

    aiThinking = true;
    setTimeout(() => {
      if (!engine || engine.phase === 'game_over') {
        aiThinking = false;
        return;
      }
      // Resolve any pending choice for AI players
      let safety = 0;
      while (engine.pendingChoice && safety < 20) {
        if (vsComputer && engine.pendingChoice.playerIdx === 0) break;
        aiPlayer.resolveChoice();
        safety++;
      }
      // Play one AI turn if no choice is pending for the human
      if (!engine.pendingChoice || (vsComputer && engine.pendingChoice.playerIdx !== 0)) {
        aiPlayer.playTurn();
        // Resolve any resulting choices that belong to AI players
        safety = 0;
        while (engine.pendingChoice && safety < 20) {
          if (vsComputer && engine.pendingChoice.playerIdx === 0) break;
          aiPlayer.resolveChoice();
          safety++;
        }
      }
      aiThinking = false;
    }, 1000);
  });
  let selectionText = $derived.by(() => {
    if (!snapshot) return 'Select an available layout card or stash item, then choose your action.';
    if (selectedSlot) {
      const targetPlayer = snapshot.players[selectedSlot.playerIdx];
      const slot = targetPlayer?.layout[selectedSlot.slotIdx];
      if (slot && slot.card) {
        const cardName = slot.card.name || slot.card.title || '';
        return `Selected Card: <span class=" font-bold">${cardName}</span> in ${targetPlayer.name}'s layout.`;
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
      }
      
      return `Selected Stash Item: <span class=" font-bold">${cardName}</span> from ${targetPlayer.name}'s stash.`;
    }
    return 'Select an available layout card or stash item, then choose your action.';
  });
  
  // Tests
  let testResults = $state(null);

  function startGame(gameType = 'passplay') {
    engine = new EmigrationEngine({
      mode,
      players: activeSetup,
      selectedPacks,
      onLog: (entry) => {
        // Force reactivity on logs by updating snapshot reference
        if (engine) snapshot = engine.getSnapshot();
        if (entry?.msg?.includes("SALARIES:")) {
          playPaydaySound();
        }
      },
      onStateChange: () => {
        if (engine) {
          snapshot = engine.getSnapshot();
          pendingChoice = engine.pendingChoice ?? null;
        }
        selectedSlot = null;
        selectedStash = null;
        selectedAnchorRect = null;
      }
    });

    snapshot = engine.getSnapshot();
    visualActivePlayerId = snapshot.phase === 'preparation' ? snapshot.currentPlayerIdx : (snapshot.crossingOrder ? snapshot.crossingOrder[snapshot.activeCrossingIdx] : snapshot.activeCrossingIdx);
    previousActualPlayerId = visualActivePlayerId;
    isTransitioning = false;
    pendingChoice = engine.pendingChoice ?? null;
    isSetup = false;
    testResults = null;

    // Reset VS computer state
    vsComputer = false;
    aiPlayer = null;
    aiThinking = false;
    autoplay = null;
    

    if (gameType === 'auto') {
      // AI Simulation: all players AI-controlled, plays at speed
      autoplay = createAutoPlayer(engine, aiDifficulty);
      autoplay.playFullGame(100);
    } else if (gameType === 'vscomputer') {
      // Solo vs AI: Player 1 (index 0) is human, all others AI
      vsComputer = true;
      aiPlayer = createAutoPlayer(engine, aiDifficulty, { humanPlayerIdx: 0 });
    }
    // 'passplay': no AI, full manual play
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
    const { anchorEl, ...rest } = selection;

    // Toggle off if clicking the currently selected card
    const isSameSlot = selectedSlot && rest.type === 'layout' && 
      selectedSlot.playerIdx === rest.playerIdx && selectedSlot.slotIdx === rest.slotIdx;
    const isSameStash = selectedStash && rest.type === 'stash' && 
      selectedStash.playerIdx === rest.playerIdx && selectedStash.stashType === rest.stashType && selectedStash.itemIdx === rest.itemIdx;

    if (isSameSlot || isSameStash) {
      selectedSlot = null;
      selectedStash = null;
      selectedAnchorRect = null;
      return;
    }

    
    selectedAnchorRect = anchorEl ? anchorEl.getBoundingClientRect() : null;

    if (rest.type === 'layout') {
      selectedSlot = rest;
      selectedStash = null;
    } else if (rest.type === 'stash') {
      selectedStash = rest;
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


  function copyTextToClipboard(elementId) {
      const paragraphText = document.getElementById(elementId).innerText;    
      
      navigator.clipboard.writeText(paragraphText)
          .then(() => alert("Paragraph text copied!"))
          .catch(err => console.error("Failed to copy: ", err));
  }
</script>

<div class="bg-neutral-100 dark:bg-neutral-900 font-emi-ui min-h-screen p-2 box-border *:box-border mb-8">
  {#if isSetup}
    <div class="max-w-[750px] mx-auto">
      <h1 class="text-center mb-2 text-lg uppercase tracking-widest">Emigration Game Emulator</h1>
      <a href="/emigration" class="underline">← Back to the Game Page</a>
      <div class="bg-neutral-200 shadow-lg dark:bg-neutral-800 p-2 lg:p-4 rounded-md flex flex-col gap-5 mt-4">
        <div class="flex flex-col items-center gap-2">
          <p>Game Mode</p>
         
          <div class="flex justify-center">
            <button class="btn-sm rounded-r-none border-r-0 {mode === 'competitive' && 'bg-teal-100 dark:bg-teal-900'}" onclick={() => mode = 'competitive'}>Competitive</button>
            <button class=" btn-sm rounded-l-none {mode === 'cooperative' && 'bg-teal-100 dark:bg-teal-900'}" onclick={() => mode = 'cooperative'}>Cooperative</button>
          </div>
        </div>

        <label>Player Count:
            <select class="w-fit" bind:value={playerCount} onchange={() => selectedPacks = getRandomPacks(playerCount)}>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
            </select>
        </label>

        <div class="flex flex-col gap-6">
          {#each activeSetup as p, i}
          <div class="flex flex-col gap-2">
            <input class="flex-1" type="text" bind:value={p.name} placeholder="Player Name" />
              <div class="flex gap-3 items-center">
                <select class="flex-[1.5]" bind:value={p.nationality}>
                  {#each NATIONALITIES as nat}
                    <option value={nat.name}>{nat.name} (${nat.fund})</option>
                  {/each}
                </select>
                <span class="">→</span>
                <select class="flex-[1.5]" bind:value={p.destination}>
                  {#each DESTINATIONS as dest}
                    <option value={dest.name}>{dest.name}</option>
                  {/each}
                </select>
              </div>
          </div>
          {/each}
        </div>

        <div class="flex flex-col gap-3">
          <p class="">Life Card Packs</p>
          <div class="flex flex-wrap justify-center gap-2">
            {#each PACKS_LIST as pack}
              <button
                class="btn-sm {selectedPacks.includes(pack) ? 'bg-teal-100 dark:bg-teal-900  ' : ''}"
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

        
        

        <div class="flex flex-col gap-3">
          <p class="">Player Type</p>
          <div class="flex justify-center">
              <button
                class="btn-sm rounded-r-none {gameType === 'vscomputer' ? 'bg-teal-100 dark:bg-teal-900  ' : ''}"
                onclick={() => gameType = 'vscomputer'}
              >
                Solo
              </button>
              <button
                class="btn-sm border-x-0 rounded-l-none rounded-r-none {gameType === 'passplay' ? 'bg-teal-100 dark:bg-teal-900  ' : ''}"
                onclick={() => gameType = 'passplay'}
              >
                Multi
              </button>
              <button
                class="btn-sm rounded-l-none {gameType === 'auto' ? 'bg-teal-100 dark:bg-teal-900  ' : ''}"
                onclick={() => gameType = 'auto'}
              >
               AI vs AI
              </button>
          </div>
        </div>

        <div class={["flex flex-col gap-3", gameType === 'passplay' && 'hidden']}>
          <p class="">AI Difficulty</p>
          <div class="flex justify-center">
            {#each ['easy', 'normal', 'expert'] as diff, i}
              <button
                class={["btn-sm", aiDifficulty === diff && 'bg-teal-100 dark:bg-teal-900', i === 0 && 'rounded-r-none', i === 1 && 'rounded-x-none border-x-0 rounded-r-none rounded-l-none', i === 2 && 'rounded-l-none']}
                onclick={() => aiDifficulty = diff}
              >
                {diff.charAt(0).toUpperCase() + diff.slice(1)}
              </button>
            {/each}
          </div>
        </div>

        <div class="">
          <button class="btn text-2xl" onclick={() => startGame(gameType)}>Start</button>
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
      <div class="flex flex-wrap gap-2 justify-between items-center mb-5">
        <h2 class="text-2xl tracking-wide">Phase: {snapshot.phase.charAt(0).toUpperCase() + snapshot.phase.slice(1)}</h2>
        <div class="flex flex-wrap items-center gap-3">
          {#if vsComputer && aiThinking}
            <span class="text-sm text-neutral-500 dark:text-neutral-400 italic animate-pulse">Computer is thinking…</span>
          {/if}
          <button class="btn-sm" onclick={() => { playersSetup = getRandomPlayersSetup(); selectedPacks = getRandomPacks(playerCount); isSetup = true; vsComputer = false; aiPlayer = null; aiThinking = false; }}>Restart / Setup</button>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6 items-start max-w-[1600px] mx-auto w-full">
        <!-- Left Main Column: Public Pool & Player Boards -->
        <div class="flex flex-col gap-2">
          <!-- Mobile: Inline Sticky Action Dashboard (above boards, below header) -->
          {#if isMobile}
            <div class="sticky top-0 z-[100]">
              <ActionPanel 
                {engine}
                {snapshot}
                {currentPlayer}
                actions={dashboardActions}
                onaction={handleAction}
                onselectlane={handleSelectLane}
                {selectionText}
                pendingChoice={pendingChoice || (vsComputer && visualActivePlayerId !== 0)}
                computerTurn={vsComputer && visualActivePlayerId !== 0}
                autoScrollEnabled={!autoplay}
                hasSelection={!!(selectedSlot || selectedStash)}
                onclearselection={() => { selectedSlot = null; selectedStash = null; selectedAnchorRect = null; }}
              />
            </div>
          {/if}

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
                    <Icon icon="game-icons:ticket" class="size-6 shrink-0" />
                    <span>{snapshot.publicServices.tickets}</span>
                  </div>
                  {#if snapshot.phase === 'preparation' && currentPlayer}
                    <div class="flex gap-1">
                      <button
                        class="btn-sm"
                        disabled={snapshot.publicServices.tickets <= 0 || currentPlayer.money < 2 || currentPlayer.stash.connections.length < 1 || pendingChoice}
                        onclick={() => handleBuyPool('ticket')}
                      >
                        Buy
                      </button>
                      <button
                        class="btn-sm"
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
                    <Icon icon="game-icons:passport" class="size-6 shrink-0" />
                    <span>{snapshot.publicServices.passports}</span>
                  </div>
                  {#if snapshot.phase === 'preparation' && currentPlayer}
                    <div class="flex gap-1">
                      <button
                        class="btn-sm"
                        disabled={snapshot.publicServices.passports <= 0 || currentPlayer.money < 2 || currentPlayer.stash.documents.length < 1 || pendingChoice}
                        onclick={() => handleBuyPool('passport')}
                      >
                        Buy
                      </button>
                      <button
                        class="btn-sm"
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
              isActive={visualActivePlayerId === player.id}
              onCardSelect={handleCardSelect}
              {selectedSlot}
              {selectedStash}
              autoScrollEnabled={!autoplay}
            />
          {/each}
        </div>
        
        <!-- Right Sidebar: Desktop only -->
        {#if !isMobile}
          <div class="lg:sticky lg:top-6 h-[calc(100vh-40px)]">
            <ActionPanel 
              {engine}
              {snapshot}
              {currentPlayer}
              actions={dashboardActions}
              onaction={handleAction}
              onselectlane={handleSelectLane}
              {selectionText}
              pendingChoice={pendingChoice || (vsComputer && visualActivePlayerId !== 0)}
              computerTurn={vsComputer && visualActivePlayerId !== 0}
              autoScrollEnabled={!autoplay}
              hasSelection={!!(selectedSlot || selectedStash)}
              onclearselection={() => { 
                selectedSlot = null; 
                selectedStash = null; 
                selectedAnchorRect = null;
              }}
                
              {copyTextToClipboard}
            />
          </div>
        {/if}
      </div>

      <!-- Floating Log Sheet -->
    
        <GameLogSheet 
          logs={snapshot.logs}
          autoScrollEnabled={!autoplay}
          {copyTextToClipboard}
        />
      
      <Modal 
        choice={pendingChoice} 
        onresolve={handleModalResolve} 
        oncancel={() => {
          if (engine) engine.cancelPendingChoice();
        }}
        onback={() => {
          if (engine) engine.stepBackChoice();
        }}
      />

      {#if showPopover}
        <CardActionPopover
          anchorRect={selectedAnchorRect}
          actions={popoverActions}
          description={popoverDescription}
          onaction={handleAction}
          onclose={() => { selectedSlot = null; selectedStash = null; selectedAnchorRect = null; }}
        />
      {/if}
    </div>
  {/if}
  <p class="italic text-xs">The Emulator may contain mistakes. Package Version: {import.meta.env.PACKAGE_VERSION}</p>
</div>
