<script>
  import Icon from '@iconify/svelte';
  import { playPaydaySound } from '../../js/utils.svelte.js';
  import { toast } from '../../stores/toast.svelte';
  import { multiplayer, copyRoomUrl, getRoomCodeFromUrl, setRoomCodeInUrl, generateRoomCode } from '../../stores/multiplayer.svelte.js';
  import ActionPanel from './ActionPanel.svelte';
  import { createAutoPlayer } from './autoplay.js';
  import CardActionPopover from './CardActionPopover.svelte';
  import EmigrationEngine, { DESTINATIONS, LIFE_CARD_DEFINITIONS, NATIONALITIES, NATIONALITY_TO_COUNTRY, PACKS_LIST, runTests, shuffleArray } from './engine.svelte.js';
  import GameLogSheet from './GameLogSheet.svelte';
  import Modal from './Modal.svelte';
  import PlayerBoard from './PlayerBoard.svelte';
import { changelog } from "../../js/emegration-changelog.js";
  import { fade, fly } from 'svelte/transition';

  const VERSION = changelog[0].version;

  // Props
  let { defaultMode = 'competitive', defaultPlayerCount = 2 } = $props();

  // Replace dev
const isDev = import.meta.env.DEV;

let showRobotMode = $state(null);

$effect(() => {
  showRobotMode = getRobotModeFromUrl()
});

let showSettings = $state(false);

function getRobotModeFromUrl() {
  if (typeof window === "undefined") return null;
  const params = new URLSearchParams(window.location.search);
  const robotMode = params.get("showRobotMode");
  console.log(robotMode)
  return !!robotMode;
}
 

  // Responsive: track mobile vs desktop
  let isMobile = $state(false);
  $effect(() => {
    const mql = window.matchMedia('(max-width: 1023px)');
    isMobile = mql.matches;
    const handler = (e) => { isMobile = e.matches; };
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  });


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
  let localSelectedPacks = $state(getRandomPacks(defaultPlayerCount));
  let onlineSelectedPacks = $state([]);
  let activeSelectedPacks = $derived(gameType === 'online' ? onlineSelectedPacks : localSelectedPacks);
  let aiDifficulty = $state('expert');
  
  // Initialize default players with randomized nationalities and destinations
  let playersSetup = $state(getRandomPlayersSetup());

  // P2P Specific Setup State
  let joinRoomCodeInput = $state('');
  let localPlayerName = $state('Player 1');
  let p2pPlayers = $state([]); // Array of { peerId, name, isHost }
  let myP2PPlayerIdx = $state(-1); // Which player index is the local user in P2P mode
  let hostPeerId = $state(null); // Track peerId of room host

  // Derived setup slice based on player count
  let activeSetup = $derived(playersSetup.slice(0, playerCount));

  // Game State
  let engine = $state(null);
  let snapshot = $state(null); // reactive copy of engine state
  let pendingChoice = $state(null);
  let autoplay = $state(null);
  let gameType = $state('vscomputer');

  // Solo vs AI State
  let aiPlayer = $state(null);
  let aiThinking = $state(false);
  let activeBotIndices = $state([]);

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
      
      if (activeBotIndices.length > 0 && prev !== 0 && prev !== null) {
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
  let isLocalBotTurn = $derived(
    snapshot &&
    snapshot.phase !== 'game_over' &&
    activeBotIndices.includes(visualActivePlayerId)
  );

  // In P2P mode: is it currently this client's turn?
  let isMyP2PTurn = $derived(
    gameType !== 'online' ||
    myP2PPlayerIdx === -1 ||
    !snapshot ||
    snapshot.phase === 'game_over' ||
    actualActivePlayerId === myP2PPlayerIdx
  );

  // Name of the player whose turn it currently is (for the "Waiting for X" message)
  let waitingForPlayerName = $derived(
    snapshot && gameType === 'online' && !isMyP2PTurn && !activeBotIndices.includes(actualActivePlayerId)
      ? (snapshot.players?.[actualActivePlayerId]?.name ?? 'another player')
      : ''
  );

  // Drive AI turns whenever snapshot changes
  $effect(() => {
    if (!snapshot || !aiPlayer || aiThinking || isTransitioning || activeBotIndices.length === 0) return;
    if (snapshot.phase === 'game_over') return;
    
    const choiceBotIdx = pendingChoice ? activeBotIndices.includes(pendingChoice.playerIdx) : false;

    // Pause AI turns if there's a pending choice targeted at a non-bot player.
    if (pendingChoice && !choiceBotIdx) return;

    // If there is a pending choice directed at an AI player during a non-bot's turn
    if (pendingChoice && choiceBotIdx) {
      aiThinking = true;
      setTimeout(() => {
        if (!engine || engine.phase === 'game_over') { aiThinking = false; return; }
        let safety = 0;
        while (engine.pendingChoice && safety < 20) {
          if (!activeBotIndices.includes(engine.pendingChoice.playerIdx)) break;
          aiPlayer.resolveChoice();
          safety++;
        }
        aiThinking = false;
      }, 500);
      return;
    }

    if (!isLocalBotTurn) return;

    aiThinking = true;
    setTimeout(() => {
      if (!engine || engine.phase === 'game_over') {
        aiThinking = false;
        return;
      }
      // Resolve any pending choice for AI players
      let safety = 0;
      while (engine.pendingChoice && safety < 20) {
        if (!activeBotIndices.includes(engine.pendingChoice.playerIdx)) break;
        aiPlayer.resolveChoice();
        safety++;
      }
      // Play one AI turn
      if (!engine.pendingChoice || activeBotIndices.includes(engine.pendingChoice.playerIdx)) {
        aiPlayer.playTurn();
        // Resolve any resulting choices that belong to AI players
        safety = 0;
        while (engine.pendingChoice && safety < 20) {
          if (!activeBotIndices.includes(engine.pendingChoice.playerIdx)) break;
          aiPlayer.resolveChoice();
          safety++;
        }
      }
      aiThinking = false;
    }, 1000);
  });
  let selectionText = $derived.by(() => {
    if (!snapshot) return 'Select an available card, then choose your action.';
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
    return 'Select an available card, then choose your action.';
  });
  
  // Tests
  let testResults = $state(null);

  // Multiplayer State & Lifecycle
  let currentRoomCode = $state('');

  $effect(() => {
    if (typeof window !== 'undefined') {
      const code = getRoomCodeFromUrl();
      if (code && !currentRoomCode) {
        // Auto-join from URL on load
        gameType = 'online';
        joinRoomCodeInput = code;
        connectToRoom(code, false);
      }

      const unsubAction = multiplayer.onAction((data, peerId) => {
        handleRemoteAction(data, peerId);
      });
      const unsubSync = multiplayer.onSyncState((remoteSnapshot) => {
        handleRemoteSyncState(remoteSnapshot);
      });
      const unsubJoin = multiplayer.onPeerJoin(() => {
        // When any peer connects (fires on both host and peer sides),
        // broadcast our own info so everyone knows who we are.
        if (currentRoomCode) {
          multiplayer.broadcastPlayerInfo({ name: localPlayerName, isHost: multiplayer.isHost });
        }
        if (multiplayer.isHost && isSetup) {
          // Add a random pack if we can
          const availablePacks = PACKS_LIST.filter(p => !onlineSelectedPacks.includes(p));
          if (availablePacks.length > 0) {
            const randomPack = availablePacks[Math.floor(Math.random() * availablePacks.length)];
            onlineSelectedPacks = [...onlineSelectedPacks, randomPack];
            multiplayer.broadcastSetupState(p2pPlayers, onlineSelectedPacks);
          }
        }
      });
      
      const unsubLeave = multiplayer.onPeerLeave((leavingPeerId) => {
        if (!multiplayer.isHost) {
          // Peer side: check if the leaving peer is the host
          if (hostPeerId && leavingPeerId === hostPeerId) {
            exitRoomLocal('The host left the game. The room has been closed.');
            return;
          }
          const leftPlayer = p2pPlayers.find(p => p.peerId === leavingPeerId);
          if (leftPlayer?.isHost) {
            exitRoomLocal('The host left the game. The room has been closed.');
            return;
          }
          if (leftPlayer) {
            toast.warning(`${leftPlayer.name} left the room.`);
          }
        } else {
          // Host side: a peer left
          const leftPlayer = p2pPlayers.find(p => p.peerId === leavingPeerId);
          const leftName = leftPlayer?.name || 'A player';
          p2pPlayers = p2pPlayers.filter(p => p.peerId !== leavingPeerId);
          toast.warning(`${leftName} left the room.`);

          if (isSetup) {
            if (onlineSelectedPacks.length > 0) {
              onlineSelectedPacks = onlineSelectedPacks.slice(0, -1);
            }
            multiplayer.broadcastSetupState(p2pPlayers, onlineSelectedPacks);
          } else {
            multiplayer.broadcastAction('player_left', { name: leftName, peerId: leavingPeerId, p2pPlayers });
          }
        }
      });

      return () => {
        unsubAction();
        unsubSync();
        unsubJoin();
        unsubLeave();
      };
    }
  });

  function connectToRoom(code, asHost) {
    currentRoomCode = code;
    setRoomCodeInUrl(code);
    // Initialize our own slot in the player list
    p2pPlayers = [{ peerId: 'self', name: localPlayerName, isHost: asHost }];
    // Host is always player 0
    if (asHost) {
      myP2PPlayerIdx = 0;
      hostPeerId = 'self';
      onlineSelectedPacks = getRandomPacks(1);
    }
    // Connect async — onPeerJoin will broadcast our info once a peer is found
    multiplayer.connect(code, asHost);
  }

  function hostRoom() {
    const code = generateRoomCode();
    connectToRoom(code, true);
  }

  function joinExistingRoom() {
    const code = joinRoomCodeInput.trim().toUpperCase();
    if (code.length === 5) {
      connectToRoom(code, false);
    } else {
      toast.error('Please enter a valid 5-character room code.');
    }
  }

  function handleRemoteAction(data, peerId) {
    if (!data || typeof data !== 'object') return;

    try {
      // Record host peer ID if message comes from host
      if (!multiplayer.isHost && peerId) {
        hostPeerId = peerId;
      }

      if (data.type === 'room_closed') {
        exitRoomLocal(data.payload?.reason || 'The host closed the room.');
        return;
      }

      if (data.type === 'player_left') {
        if (!multiplayer.isHost) {
          if (Array.isArray(data.payload?.p2pPlayers)) {
            p2pPlayers = data.payload.p2pPlayers;
          } else if (data.payload?.peerId) {
            p2pPlayers = p2pPlayers.filter(p => p.peerId !== data.payload.peerId);
          }
          toast.warning(`${data.payload?.name || 'A player'} left the room.`);
        }
        return;
      }

      // --- Pre-game waiting room messages ---
      if (data.type === 'player_info') {
        if (multiplayer.isHost && isSetup) {
          // Host: upsert the peer in our player list
          const existing = p2pPlayers.find(p => p.peerId === peerId);
          if (existing) {
            existing.name = data.payload?.name;
          } else {
            let peerName = data.payload?.name || 'Anonymous';
            if (/^Player \d+$/.test(peerName)) {
              peerName = `Player ${p2pPlayers.length + 1}`;
            }
            p2pPlayers = [...p2pPlayers, { peerId, name: peerName, isHost: false }];
          }
          // Broadcast the updated roster to all peers
          multiplayer.broadcastSetupState(p2pPlayers, onlineSelectedPacks);
        }
        return;
      }

      if (data.type === 'setup_state') {
        if (!multiplayer.isHost && Array.isArray(data.payload?.p2pPlayers)) {
          // Peer: sync the waiting room display from the host's roster
          p2pPlayers = data.payload.p2pPlayers;
          if (data.payload.selectedPacks) onlineSelectedPacks = data.payload.selectedPacks;
          // Work out which slot we occupy so we can block out-of-turn actions
          const myIdx = p2pPlayers.findIndex(p => p.peerId === multiplayer.selfId);
          if (myIdx !== -1) {
            myP2PPlayerIdx = myIdx;
            localPlayerName = p2pPlayers[myIdx].name;
          }
        }
        return;
      }

      if (data.type === 'start_game') {
        // Peers: game is starting — hide setup. The actual engine state
        // arrives via the sync_state channel handled by handleRemoteSyncState.
        if (!multiplayer.isHost) {
          isSetup = false;
        }
        return;
      }

      // --- In-game messages ---
      if (!engine) return;

      if (data.type === 'GAME_ACTION') {
        const { actionType, params } = data.payload || {};
        if (actionType === 'graduate' || actionType === 'sell') {
          engine.executeOptionalAction(actionType, params);
        } else if (actionType) {
          engine.executeRequiredAction(actionType, params);
        }
      } else if (data.type === 'LANE_SELECT') {
        engine.selectLane(data.payload?.laneIdx);
      } else if (data.type === 'MODAL_RESOLVE') {
        pendingChoice = null;
        engine.resolveChoice(data.payload?.value, data.payload?.rolls);
      } else if (data.type === 'BUY_POOL') {
        engine.executeRequiredAction('buyPool', { cardType: data.payload?.cardType });
      } else if (data.type === 'STEAL_POOL') {
        engine.executeRequiredAction('steal', { cardType: data.payload?.cardType });
      }

      snapshot = engine.getSnapshot();
      pendingChoice = engine.pendingChoice ?? null;
    } catch (err) {
      console.warn("[Emulator] Dropped invalid action payload from peer:", peerId, err);
    }
  }

  function handleRemoteSyncState(remoteSnapshot) {
    if (!remoteSnapshot || typeof remoteSnapshot !== 'object') return;
    
    try {
      // Create the engine if it doesn't exist yet (first sync from host at game start)
      if (!engine) {
        isSetup = false;
        engine = new EmigrationEngine({
          mode: remoteSnapshot.mode || mode,
          players: Array.isArray(remoteSnapshot.players) ? remoteSnapshot.players : [],
          onLog: (entry) => {
            if (engine) snapshot = engine.getSnapshot();
            if (entry?.msg?.includes('SALARIES:')) playPaydaySound();
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
      }
      engine.loadSnapshot(remoteSnapshot);
      snapshot = engine.getSnapshot();
      visualActivePlayerId = snapshot.phase === 'preparation'
        ? snapshot.currentPlayerIdx
        : (snapshot.crossingOrder ? snapshot.crossingOrder[snapshot.activeCrossingIdx] : snapshot.activeCrossingIdx);
      previousActualPlayerId = visualActivePlayerId;
      pendingChoice = engine.pendingChoice ?? null;
    } catch (err) {
      console.warn("[Emulator] Dropped invalid sync state from peer:", err);
    }
  }

  function exitRoom() {
    if (multiplayer.isHost && currentRoomCode) {
      try {
        multiplayer.broadcastAction('room_closed', { reason: 'The host closed the room.' });
      } catch (e) {
        console.warn('Failed to broadcast room_closed:', e);
      }
    }
    exitRoomLocal();
  }

  function exitRoomLocal(noticeMessage = '') {
    multiplayer.disconnect();
    currentRoomCode = '';
    p2pPlayers = [];
    myP2PPlayerIdx = -1;
    hostPeerId = null;
    engine = null;
    snapshot = null;
    isSetup = true;
    window.history.replaceState({}, '', window.location.pathname);
    if (noticeMessage) {
      toast.error(noticeMessage);
    }
  }

  function startP2PGame() {
    if (!multiplayer.isHost) return;

    // Construct players from p2pPlayers, assigning random nationalities and destinations
    const shuffledNats = shuffleArray([...NATIONALITIES]);
    const shuffledDests = shuffleArray([...DESTINATIONS]);
    
    const finalPlayers = p2pPlayers.map((p, i) => {
      const nat = shuffledNats[i % shuffledNats.length].name;
      const matchingCountry = NATIONALITY_TO_COUNTRY[nat];
      const validDests = shuffledDests.filter(d => d.name !== matchingCountry);
      const destObj = validDests[i % validDests.length] || shuffledDests[i % shuffledDests.length];
      
      return {
        name: p.name,
        nationality: nat,
        destination: destObj.name
      };
    });

    engine = new EmigrationEngine({
      mode,
      players: finalPlayers,
      selectedPacks: activeSelectedPacks,
      onLog: (entry) => {
        if (engine) snapshot = engine.getSnapshot();
        if (entry?.msg?.includes("SALARIES:")) playPaydaySound();
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
    aiThinking = false;
    autoplay = null;

    // Set up AI bots for any robot players in the lobby
    activeBotIndices = p2pPlayers.map((p, i) => p.isBot ? i : -1).filter(i => i !== -1);
    if (activeBotIndices.length > 0) {
      const botEngine = new Proxy(engine, {
        get(target, prop) {
          if (['executeRequiredAction', 'executeOptionalAction'].includes(prop)) {
            return (actionType, params = {}) => {
              if (['applyCollege', 'graduate', 'activate'].includes(actionType)) {
                params.rolls = [
                  Math.floor(Math.random() * 6) + 1,
                  Math.floor(Math.random() * 6) + 1,
                  Math.floor(Math.random() * 6) + 1
                ];
              }
              const res = target[prop](actionType, params);
              multiplayer.broadcastAction('GAME_ACTION', { actionType, params });
              if (engine) multiplayer.broadcastSyncState(engine.getSnapshot());
              return res;
            };
          }
          if (prop === 'resolveChoice') {
            return (value) => {
              const rolls = [
                Math.floor(Math.random() * 6) + 1,
                Math.floor(Math.random() * 6) + 1,
                Math.floor(Math.random() * 6) + 1
              ];
              const res = target.resolveChoice(value, rolls);
              multiplayer.broadcastAction('MODAL_RESOLVE', { value, rolls });
              if (engine) multiplayer.broadcastSyncState(engine.getSnapshot());
              return res;
            };
          }
          if (prop === 'selectLane') {
            return (laneIdx) => {
              const res = target.selectLane(laneIdx);
              multiplayer.broadcastAction('LANE_SELECT', { laneIdx });
              if (engine) multiplayer.broadcastSyncState(engine.getSnapshot());
              return res;
            };
          }
          const orig = target[prop];
          if (typeof orig === 'function') return orig.bind(target);
          return orig;
        }
      });
      aiPlayer = createAutoPlayer(botEngine, aiDifficulty, { botIndices: activeBotIndices });
    } else {
      aiPlayer = null;
    }

    multiplayer.broadcastGameStart(snapshot);
  }

  function startGame(gameType = 'vscomputer') {
    // Always randomly assign nationalities and destinations
    const shuffledNats = shuffleArray([...NATIONALITIES]);
    const shuffledDests = shuffleArray([...DESTINATIONS]);
    const finalPlayers = activeSetup.map((p, i) => {
      const nat = shuffledNats[i % shuffledNats.length].name;
      const matchingCountry = NATIONALITY_TO_COUNTRY[nat];
      const validDests = shuffledDests.filter(d => d.name !== matchingCountry);
      const destObj = validDests[i % validDests.length] || shuffledDests[i % shuffledDests.length];
      return { name: p.name, nationality: nat, destination: destObj.name };
    });

    engine = new EmigrationEngine({
      mode,
      players: finalPlayers,
      selectedPacks: activeSelectedPacks,
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
    activeBotIndices = [];
    aiPlayer = null;
    aiThinking = false;
    autoplay = null;

    if (gameType === 'auto') {
      // AI Simulation: all players AI-controlled, plays at speed
      activeBotIndices = engine.players.map((_, i) => i);
      autoplay = createAutoPlayer(engine, aiDifficulty);
      autoplay.playFullGame(100);
    } else if (gameType === 'vscomputer') {
      // Solo vs AI: Player 1 (index 0) is human, all others AI
      activeBotIndices = engine.players.map((_, i) => i).filter(i => i !== 0);
      aiPlayer = createAutoPlayer(engine, aiDifficulty, { botIndices: activeBotIndices });
    } else if (gameType === 'online' && multiplayer.isHost) {
      activeBotIndices = p2pPlayers.map((p, i) => p.isBot ? i : -1).filter(i => i !== -1);
      if (activeBotIndices.length > 0) {
        const botEngine = new Proxy(engine, {
          get(target, prop) {
            if (['executeRequiredAction', 'executeOptionalAction'].includes(prop)) {
              return (actionType, params = {}) => {
                if (['applyCollege', 'graduate', 'activate'].includes(actionType)) {
                  params.rolls = [
                    Math.floor(Math.random() * 6) + 1,
                    Math.floor(Math.random() * 6) + 1,
                    Math.floor(Math.random() * 6) + 1
                  ];
                }
                const res = target[prop](actionType, params);
                multiplayer.broadcastAction('GAME_ACTION', { actionType, params });
                if (engine) multiplayer.broadcastSyncState(engine.getSnapshot());
                return res;
              };
            }
            if (prop === 'resolveChoice') {
              return (value) => {
                const rolls = [
                  Math.floor(Math.random() * 6) + 1,
                  Math.floor(Math.random() * 6) + 1,
                  Math.floor(Math.random() * 6) + 1
                ];
                const res = target.resolveChoice(value, rolls);
                multiplayer.broadcastAction('MODAL_RESOLVE', { value, rolls });
                if (engine) multiplayer.broadcastSyncState(engine.getSnapshot());
                return res;
              };
            }
            if (prop === 'selectLane') {
              return (laneIdx) => {
                const res = target.selectLane(laneIdx);
                multiplayer.broadcastAction('LANE_SELECT', { laneIdx });
                if (engine) multiplayer.broadcastSyncState(engine.getSnapshot());
                return res;
              };
            }
            const orig = target[prop];
            if (typeof orig === 'function') {
              return orig.bind(target);
            }
            return orig;
          }
        });
        aiPlayer = createAutoPlayer(botEngine, aiDifficulty, { botIndices: activeBotIndices });
      }
    }
    // 'passplay': no AI, full manual play
  }

  function handleAction(actionType) {
    if (!engine || !isMyP2PTurn) return;

    const source = selectedSlot ? 'layout' : (selectedStash ? 'stash' : null);
    const params = {
      ...selectedSlot,
      ...selectedStash,
      source,
      targetPlayerIdx: selectedSlot?.playerIdx ?? selectedStash?.playerIdx,
      stashIdx: selectedStash?.itemIdx,
    };

    // For actions that involve a dice roll, pre-generate the value and embed it
    // in params so that every peer executes with the same roll and shows the
    // same toast. Without this, each client calls Math.random() independently
    // and can produce a different outcome (the P2P desync bug).
    // We provide a short queue of rolls just in case the action needs multiple.
    if (['applyCollege', 'graduate', 'activate'].includes(actionType)) {
      params.rolls = [
        Math.floor(Math.random() * 6) + 1,
        Math.floor(Math.random() * 6) + 1,
        Math.floor(Math.random() * 6) + 1
      ];
    }

    if (actionType === 'graduate' || actionType === 'sell') {
      engine.executeOptionalAction(actionType, params);
    } else {
      engine.executeRequiredAction(actionType, params);
    }

    multiplayer.broadcastAction('GAME_ACTION', { actionType, params });
    if (engine) multiplayer.broadcastSyncState(engine.getSnapshot());
  }

  function handleSelectLane(laneIdx) {
    if (!engine || !isMyP2PTurn) return;
    engine.selectLane(laneIdx);
    multiplayer.broadcastAction('LANE_SELECT', { laneIdx });
    multiplayer.broadcastSyncState(engine.getSnapshot());
  }

  function handleCardSelect(selection) {
    // Ignore card taps when it's not this client's turn in P2P
    if (!isMyP2PTurn) return;

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
    if (!engine || !isMyP2PTurn) return;
    pendingChoice = null;
    const rolls = [
      Math.floor(Math.random() * 6) + 1,
      Math.floor(Math.random() * 6) + 1,
      Math.floor(Math.random() * 6) + 1
    ];
    engine.resolveChoice(value, rolls);
    multiplayer.broadcastAction('MODAL_RESOLVE', { value, rolls });
    multiplayer.broadcastSyncState(engine.getSnapshot());
  }

  function runEngineTests() {
    testResults = runTests();
  }

  function handleBuyPool(cardType) {
    if (!engine || !isMyP2PTurn) return;
    engine.executeRequiredAction('buyPool', { cardType });
    multiplayer.broadcastAction('BUY_POOL', { cardType });
    multiplayer.broadcastSyncState(engine.getSnapshot());
  }

  function handleStealPool(cardType) {
    if (!engine || !isMyP2PTurn) return;
    engine.executeRequiredAction('steal', { cardType });
    multiplayer.broadcastAction('STEAL_POOL', { cardType });
    multiplayer.broadcastSyncState(engine.getSnapshot());
  }


  function copyTextToClipboard(elementId) {
      const paragraphText = document.getElementById(elementId).innerText;    
      
      navigator.clipboard.writeText(paragraphText)
          .then(() => alert("Paragraph text copied!"))
          .catch(err => console.error("Failed to copy: ", err));
  }

  function getSecurityLaneBackgroundColor(i) {
    switch (i) {
      case 0: return 'bg-yellow-100 dark:bg-yellow-900';
      case 1: return 'bg-orange-100 dark:bg-orange-900';
      case 2: return 'bg-red-100 dark:bg-red-900';
      case 3: return 'bg-blue-100 dark:bg-blue-900';
      case 4: return 'bg-green-100 dark:bg-green-900';
    }
  }
</script>

<!-- Settings Modal -->
      {#if showSettings}
        <div transition:fade={{duration: 100}} class="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex justify-center items-center z-[9999]" role="presentation" onclick={(e) => { if (e.target === e.currentTarget) showSettings = false; }}>
          <div in:fly={{y:-50}} class="bg-neutral-200 dark:bg-neutral-800 p-2 rounded-md max-w-fit w-[90%] shadow-xl">
            <div class="flex justify-between gap-2">
              <h2 class="mb-2 text-xl font-semibold text-center">
                Settings
              </h2>
              <button class="btn-sm" onclick={() => {showSettings = false}}><Icon icon="lucide:x" class=""></Icon></button>
            </div>
            <div class="flex flex-col gap-4 items-start text-left mx-auto w-full rounded-md p-4 bg-neutral-100 dark:bg-neutral-900 shadow-md border border-neutral-200 dark:border-neutral-800">
      <div class="flex flex-col gap-2">
        <label class="items-center gap-2 cursor-pointer select-none inline-flex">
    <div class="relative">
      <input 
        type="checkbox" 
        class="sr-only peer" 
        bind:checked={toast.enabled} 
      />
      <div class="w-11 h-6 bg-neutral-300 rounded-full peer dark:bg-neutral-700 peer-checked:bg-blue-400 dark:peer-checked:bg-blue-900 transition-colors duration-200 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full peer-checked:after:border-white shadow-sm"></div>
    </div>
    <span class="text-sm font-medium text-neutral-800 dark:text-neutral-200">
      Enable Notifications
    </span>
  </label>
        {#if toast.enabled}
          <div class="flex flex-col gap-1">
            <label for="toast-timeout" class="text-sm opacity-70">Notifications Timeout</label>
              <select id="toast-timeout" bind:value={toast.timeoutMs}>
                <option value={1500}>Fast (1.5s)</option>
                <option value={3000}>Normal (3s)</option>
                <option value={5000}>Long (5s)</option>
              </select>
          </div>
        {/if}
      </div>

      {#if isSetup}
      {#if gameType !== 'online' || (currentRoomCode && multiplayer.isHost)}
          <div class="flex flex-col gap-1 max-w-md">
            <p class="text-sm opacity-70">Life Card Packs {#if (gameType === 'online' ? p2pPlayers.length : playerCount) !== activeSelectedPacks.length}
              <span class="p-1 bg-amber-100 dark:bg-amber-900 rounded-md font-bold">(SELECT {gameType === 'online' ? p2pPlayers.length : playerCount})</span>
            {/if}</p>
            <div class="flex flex-wrap gap-2">
              {#each PACKS_LIST as pack}
                <button
                  class="btn-sm hover:bg-purple-50 dark:hover:bg-purple-950 {activeSelectedPacks.includes(pack) ? 'bg-purple-100 dark:bg-purple-900  ' : ''}"
                  onclick={() => {
                    if (gameType === 'online') {
                      if (onlineSelectedPacks.includes(pack)) {
                        onlineSelectedPacks = onlineSelectedPacks.filter(p => p !== pack);
                      } else {
                        onlineSelectedPacks = [...onlineSelectedPacks, pack];
                      }
                      if (multiplayer.isHost) {
                        multiplayer.broadcastSetupState(p2pPlayers, onlineSelectedPacks);
                      }
                    } else {
                      if (localSelectedPacks.includes(pack)) {
                        localSelectedPacks = localSelectedPacks.filter(p => p !== pack);
                      } else {
                        localSelectedPacks = [...localSelectedPacks, pack];
                      }
                    }
                  }}
                >
                  {pack}
                </button>
              {/each}
            </div>
          </div>
        {/if}

          {#if gameType !== 'online' || (currentRoomCode && multiplayer.isHost)}
            <div class="flex flex-col gap-1">
              <p class="text-sm opacity-70">Game Type</p>
              <div class="flex justify-center">
                <button class="btn-sm rounded-r-none border-r-0 hover:bg-green-50 dark:hover:bg-green-950 {mode === 'competitive' && 'bg-green-200 dark:bg-green-900'}" onclick={() => mode = 'competitive'}>Competitive</button>
                <button class=" btn-sm rounded-l-none hover:bg-green-50 dark:hover:bg-green-950 {mode === 'cooperative' && 'bg-green-200 dark:bg-green-900'}" onclick={() => mode = 'cooperative'}>Cooperative</button>
              </div>
            </div>
          {/if}

      <div class={["flex flex-col gap-1", (gameType === 'passplay' || gameType === 'online') && 'hidden']}>
            <p class="text-sm opacity-70">Robot Skill Level</p>
            <div class="flex justify-center">
              {#each ['easy', 'normal', 'expert'] as diff, i}
                <button
                  class={["btn-sm hover:bg-blue-50 dark:hover:bg-blue-950", aiDifficulty === diff && 'bg-blue-200 dark:bg-blue-900 ', i === 0 && 'rounded-r-none', i === 1 && 'rounded-x-none border-x-0 rounded-r-none rounded-l-none', i === 2 && 'rounded-l-none']}
                  onclick={() => aiDifficulty = diff}
                >
                  {diff.charAt(0).toUpperCase() + diff.slice(1)}
                </button>
              {/each}
            </div>
          </div>
          {/if}
    </div>
          </div>
        </div>
      {/if}

<div class="">
  <div class="mb-4 py-2 w-full bg-slate-300 dark:bg-slate-700">
    <div class="flex items-center max-sm:flex-wrap max-sm:justify-center justify-between gap-2 max-w-[1200px] mx-auto px-2">
      <h1 class="font-bold text-xl">Emigration Game Emulator</h1>
      <div class="flex gap-2 items-center">
        <a title="Rulebook (PDF)" href={`/files/emigration/v${VERSION}/emigration-game-rulebook-v${VERSION}.pdf`} target="_blank" download={`emigration-game-rulebook-v${VERSION}.pdf`} class="btn-sm bg-white/50 dark:bg-black/50"><Icon icon="lucide:file-question-mark" class="size-5"/><span class="max-md:hidden">Rulebook</span></a>
        <button class="btn-sm bg-white/50 dark:bg-black/50" title="Emulator Settings" onclick={() => {
          showSettings = !showSettings
        }}><Icon icon="lucide:settings" class="size-5"/> <span class="max-md:hidden">Settings</span></button>
        <a href="/emigration" class="btn-sm  bg-white/50 dark:bg-black/50" title="Close Emulator"><Icon icon="lucide:x" class="size-5"/> <span class="max-md:hidden">Close</span> </a>
      </div>
    </div>
  </div>

  
  {#if isSetup}
    <div class="max-w-lg mx-auto px-2">
      <div class="flex flex-col gap-5 mt-4">
        <div class="flex flex-col gap-1">
          <p class="opacity-70 text-sm">Game Mode</p>
          <div class="flex justify-center flex-wrap gap-y-1">
              <button
                class="btn-sm rounded-r-none {gameType === 'vscomputer' ? 'bg-red-200 dark:bg-red-900  ' : ''}"
                onclick={() => {
                  gameType = 'vscomputer';
                  toast.enabled = true;
                }}
              >
                Solo
              </button>
              <button
                class="btn-sm border-x-0 rounded-l-none rounded-r-none {gameType === 'passplay' ? 'bg-red-200 dark:bg-red-900  ' : ''}"
                onclick={() => {
                  gameType = 'passplay';
                  toast.enabled = true;
                }}
              >
                Pass & Play
              </button>
              {#if showRobotMode}
                <button
                  class="btn-sm rounded-l-none rounded-r-none border-r-0  {gameType === 'auto' ? 'bg-red-200 dark:bg-red-900  ' : ''}"
                  onclick={() =>{
                    gameType = 'auto';
                    toast.enabled = false;
                  }}
                >
                 Robots
                </button>
              {/if}
                <button
                  class="btn-sm  rounded-l-none {gameType === 'online' ? 'bg-red-200 dark:bg-red-900  ' : ''}"
                  onclick={() => {
                    gameType = 'online';
                    toast.enabled = true;
                  }}
                >
                  Online
                </button>
          </div>
        </div>

        {#if gameType === 'online'}
          <div class="flex flex-col gap-4">
            {#if !currentRoomCode}
              <div class="flex flex-col gap-2 mx-auto w-full items-center">
                <button class="btn bg-green-200 dark:bg-green-800 w-full" onclick={hostRoom}>Host New Game</button>
                <div class="flex items-center gap-2 text-sm opacity-50 w-full"><hr class="flex-1"/> OR <hr class="flex-1"/></div>
                <div class="flex items-center w-full">
                  <input type="text" placeholder="Enter Room Code" class="flex-1 text-center font-mono uppercase rounded-r-none py-[6.5px] border-r-0" maxlength="5" bind:value={joinRoomCodeInput} />
                  <button class="btn py-[5px] px-2 bg-blue-200 dark:bg-blue-800 rounded-l-none" onclick={joinExistingRoom}>Join Game</button>
                </div>
              </div>
            {:else}
            <button 
        class="btn-sm mx-auto  bg-red-300 dark:bg-red-700"
        onclick={exitRoom}
      >
        <Icon icon="lucide:x" class="size-3.5" />
        {multiplayer.isHost ? 'Close Room' : 'Leave Room'}
      </button>
              <!-- Waiting Room -->
              <div class="flex flex-col gap-2">
                <div class="flex flex-col items-center gap-2 bg-blue-50 dark:bg-blue-950 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
                  <p class="text-sm opacity-70">Room Code</p>
                  <div class="flex gap-2 items-center">
                    <span class="text-2xl font-mono tracking-widest font-bold">{currentRoomCode}</span>
                    <button class="btn-sm bg-amber-200 dark:bg-amber-800" onclick={copyRoomUrl} title="Copy Link">
                      <Icon icon="lucide:copy" />
                      Copy Link
                    </button>
                  </div>
                  <p class="text-xs opacity-60">Share this code with your friends!</p>
                </div>

                  <div class="flex flex-col gap-2 p-2 items-start rounded-md bg-neutral-100 dark:bg-neutral-900 shadow-md border border-neutral-200 dark:border-neutral-800">
                    <p class="text-sm opacity-70">Your Name</p>
                    <input
                      class="flex-1"
                      type="text"
                      bind:value={localPlayerName}
                      placeholder="Your Name"
                      oninput={() => {
                        // Keep local p2pPlayers in sync and broadcast to peers
                        const me = p2pPlayers.find(p => p.peerId === 'self');
                        if (me) me.name = localPlayerName;
                        if (currentRoomCode) multiplayer.broadcastPlayerInfo({ name: localPlayerName, isHost: multiplayer.isHost });
                      }}
                    />
                  </div>

                <div class="flex flex-col gap-2">
                  <p class="text-sm font-bold flex justify-between items-center">
                    <span>Players in Room ({p2pPlayers.length}/6)</span>
                    {#if multiplayer.isHost && p2pPlayers.length < 6}
                      <button class="btn-sm" onclick={() => {
                        const botName = `🤖 Robot ${p2pPlayers.length + 1}`;
                        p2pPlayers = [...p2pPlayers, { peerId: 'robot-' + Math.random().toString(36).substr(2, 5), name: botName, isHost: false, isBot: true }];
                        onlineSelectedPacks = getRandomPacks(p2pPlayers.length);
                        multiplayer.broadcastSetupState(p2pPlayers, onlineSelectedPacks);
                      }}>🤖 Add Robot</button>
                    {/if}
                  </p>
                  <div class="grid grid-cols-2 gap-2">
                    {#each p2pPlayers as p, i}
                      <div class="p-2 rounded-md bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex justify-between items-center">
                        <span class="font-bold">{p.name || 'Anonymous'}</span>
                        <div class="flex items-center gap-1">
                          {#if p.isHost}
                            <span class="text-[10px] uppercase bg-green-200 dark:bg-green-900 text-green-800 dark:text-green-200 px-1 py-0.5 rounded">Host</span>
                          {:else if p.peerId === 'self'}
                            <span class="text-[10px] uppercase bg-blue-200 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-1 py-0.5 rounded">You</span>
                          {/if}
                          {#if multiplayer.isHost && p.isBot}
                            <button class="btn-sm border-none text-red-500 hover:text-red-700" onclick={() => {
                              p2pPlayers = p2pPlayers.filter((_, idx) => idx !== i);
                              onlineSelectedPacks = getRandomPacks(p2pPlayers.length);
                              multiplayer.broadcastSetupState(p2pPlayers, onlineSelectedPacks);
                            }} title="Remove Robot"><Icon icon="lucide:x" class="size-4" /></button>
                          {/if}
                        </div>
                      </div>
                    {/each}
                  </div>
                </div>
              </div>
            {/if}
          </div>
          <div class="flex flex-col items-center gap-1 max-w-md mx-auto">
              <!-- <h3 class="text-xl font-bold">P2P Multiplayer</h3> -->
              <p class="opacity-70 italic text-sm">Online mode uses serverless browser-based peer-to-peer rooms. It may not work with VPN connections.</p>
            </div>
        {:else}
          <label><span class="text-sm opacity-70">Number of Players:</span>
              <select class="w-fit" bind:value={playerCount} onchange={() => localSelectedPacks = getRandomPacks(playerCount)}>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={6}>6</option>
              </select>
          </label>

          <div class="flex flex-col gap-4">
            {#each activeSetup as p, i}
            <div class="flex flex-col gap-2 p-2 rounded-md bg-neutral-100 dark:bg-neutral-900 shadow-md border border-neutral-200 dark:border-neutral-800">
            {#if (gameType === 'vscomputer' && i === 0) || (gameType !== 'vscomputer' && gameType !== 'auto')}
              <p class="text-sm opacity-70 text-left">Human</p>
              {:else if gameType === 'vscomputer' || gameType === 'auto'}
              <p class="text-sm opacity-70 text-left">Robot</p>
            {/if}
              <input class="flex-1" type="text" bind:value={p.name} placeholder="Player Name" />
            </div>
            {/each}
          </div>
        {/if}

        

        <div class="my-2">
          {#if gameType === 'online'}
            {#if multiplayer.isHost && currentRoomCode}
              <button
                class="btn w-full text-2xl bg-amber-200 dark:bg-amber-800 disabled:opacity-40"
                disabled={p2pPlayers.length < 2}
                onclick={startP2PGame}
              >
                Start Game ({p2pPlayers.length} Player{p2pPlayers.length !== 1 ? 's' : ''})
              </button>
              {#if p2pPlayers.length < 2}
                <p class="text-xs opacity-60 mt-1">Waiting for at least 1 more player to join…</p>
              {/if}
            {:else if !currentRoomCode}
              <!-- No room joined yet, no start button -->
            {:else}
              <p class="text-sm italic opacity-60">Waiting for the host to start the game…</p>
            {/if}
          {:else}
            <button class="btn w-full text-2xl bg-amber-200 dark:bg-amber-800" onclick={() => startGame(gameType)}>Start Game</button>
          {/if}
        </div>
      </div>
    </div>
  {:else if snapshot}
  <div class="max-w-[1200px] mx-auto px-2">
    {#if gameType === 'online' && currentRoomCode}
      <div class="flex flex-wrap items-center justify-center md:justify-between gap-3 w-full mb-4">
        <div class="flex justify-center md:justify-start items-center gap-2 flex-wrap">
          <div class="flex items-center gap-1">
            <button 
              class="btn-sm bg-emerald-200 dark:bg-emerald-800"
              onclick={copyRoomUrl}
              title="Click to copy Room Code"
            >
            <span class="flex items-center gap-1.5 font-bold ">
              <span class="relative flex h-2.5 w-2.5">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-700 dark:bg-green-300 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-700 dark:bg-green-300"></span>
              </span>
              {#if multiplayer.isHost} Hosting {/if}
              Online Room:
            </span><span class="font-mono ">{currentRoomCode}</span>
            </button>
          </div>
  
          <div class="flex items-center gap-1.5 text-xs">
            <span>{p2pPlayers.length} players</span>
            <span class="opacity-40">|</span>
            <span class="opacity-80 flex gap-1 flex-wrap">
              {#each p2pPlayers as p}
                <span class="px-1.5 py-0.5 rounded bg-neutral-50/60 dark:bg-neutral-950/60 {p.peerId === multiplayer.selfId || (multiplayer.isHost && p.isHost) ? 'font-semibold' : ''}">
                  {p.name}{p.isHost ? ' (Host)' : ''}
                </span>
              {/each}
            </span>
          </div>
        </div>
  
        <button 
          class="btn-sm bg-red-300 dark:bg-red-700"
          onclick={exitRoom}
        >
          <Icon icon="lucide:x" class="size-5" />
          {multiplayer.isHost ? 'Close Room' : 'Leave Room'}
        </button>
      </div>
    {/if}
      <div class="flex flex-wrap gap-2 justify-center md:justify-end items-center mb-5">
        <div class="flex flex-wrap items-center gap-3">
          {#if gameType !== 'online' || multiplayer.isHost}
            <button class="btn-sm" onclick={() => { playersSetup = getRandomPlayersSetup(); localSelectedPacks = getRandomPacks(playerCount); isSetup = true; activeBotIndices = []; aiPlayer = null; aiThinking = false; }}><Icon icon="lucide:rotate-ccw" class="size-5"></Icon> New Game</button>
          {/if}
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6 items-start  mx-auto w-full">
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
                pendingChoice={pendingChoice || (activeBotIndices.includes(visualActivePlayerId))}
                computerTurn={activeBotIndices.includes(visualActivePlayerId)}
                waitingForPeer={!isMyP2PTurn}
                waitingForName={waitingForPlayerName}
                autoScrollEnabled={!autoplay}
                hasSelection={!!(selectedSlot || selectedStash)}
                onclearselection={() => { selectedSlot = null; selectedStash = null; selectedAnchorRect = null; }}
              />
            </div>
          {/if}

          <!-- Public Center Pool -->
          <div class="">
          <!-- Security Lanes -->
            <div class="lg:col-span-2 flex flex-col gap-1 p-1 rounded-md">
                <!-- <div class="text-sm opacity-70 ">Security Lanes</div> -->
                <div class="flex flex-wrap justify-center gap-2 pb-1">
                  {#each snapshot.securityLanes as lane, i}
                    {@const backgroundColor = getSecurityLaneBackgroundColor(i)}
                    <div class={["rounded-md gap-1 p-2 min-w-[130px] max-w-[300px] flex flex-col items-center text-center flex-1 transition-all border border-neutral-200 dark:border-neutral-800", backgroundColor]}>
                      <div class="font-bold text-xs leading-snug">{lane.name}</div>
                      <Icon icon="game-icons:police-officer-head" class="size-8 opacity-70"></Icon>
                      <div class="text-xs mb-1 flex gap-1">
                      {#each lane.unshuffledTokens as {tokenNumber, status}}
                        <p class={["bg-red-200 dark:bg-red-800 px-2 py-1 shadow-sm rounded-md border border-red-300 dark:border-red-700", status.isRevealed && 'opacity-30']}>{tokenNumber}</p>
                      {/each}
                      </div>
                      {#if lane.unshuffledTokens.filter(({status}) => status.isRevealed).length}
                        <div class="flex flex-col gap-1 justify-center">
                          {#each lane.unshuffledTokens.filter(({status}) => status.isRevealed) as {tokenNumber, status}}
                            <div class="grid grid-cols-[1fr_30px] gap-1 items-center">
                              <div class={["text-xs rounded-md px-2 py-1 w-full flex flex-col gap-1", status.player.success ? "bg-green-200 dark:bg-green-800" : "bg-red-300 dark:bg-red-900"]}>
                                <p class="w-full">{#if status.player.success}✅{:else}❌{/if} {status.player.name}</p>
                                <div class="flex gap-1 items-center">
                                  <div class="whitespace-nowrap p-1 rounded-md bg-white text-red-500 flex items-center gap-0"> <Icon icon="game-icons:round-star" class="size-3 shrink-0" />{status.player.assurance}</div>
                                  <div class="whitespace-nowrap p-1 rounded-md bg-white text-green-700 flex items-center gap-0"> <Icon icon="game-icons:two-coins" class="size-3 shrink-0" />${status.player.money}</div>
                                </div>
                              </div>
                              <div class="bg-red-200 dark:bg-red-800 px-2 py-1 rounded-md">{tokenNumber}</div>
                            </div>
                          {/each}
                        </div>
                      {/if}
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
            
            <!-- <div class="text-sm opacity-70 ">Public Services cards</div> -->
            <div class="flex flex-wrap gap-2 mx-auto">
              <!-- Tickets -->
              <div class="flex flex-1 items-center gap-4 bg-blue-50 dark:bg-blue-950 p-3.5 rounded-md border border-neutral-200 dark:border-neutral-800">
                <div class="text-left">
                  <div class="font-bold">Tickets</div>
                  <div class="text-xs ">Requires: 1+ Connection</div>
                  <div class="text-xs ">Ticket + Passport = 1 Assurance</div>
                </div>
                <div class="flex flex-col gap-1 ml-auto items-end">
                  <div class="text-2xl font-bold flex items-center gap-1.5">
                    <Icon icon="game-icons:ticket" class="size-6 shrink-0" />
                    <span>{snapshot.publicServices.tickets}</span>
                  </div>
                  {#if snapshot.phase === 'preparation' && currentPlayer}
                    <div class="flex gap-1">
                      <button
                        class="btn-sm whitespace-nowrap"
                        disabled={snapshot.publicServices.tickets <= 0 || currentPlayer.money < 2 || currentPlayer.stash.connections.length < 1 || pendingChoice}
                        onclick={() => handleBuyPool('ticket')}
                      >
                        $2 Buy
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
              <div class="flex flex-1 items-center gap-4 bg-blue-50 dark:bg-blue-950 p-3.5 rounded-md border border-neutral-200 dark:border-neutral-800">
                <div class="text-left">
                  <div class="font-bold">Passports</div>
                  <div class="text-xs ">Requires 1+ Document</div>
                  <div class="text-xs ">Passport + Ticket = 1 Assurance</div>
                </div>
                <div class="flex flex-col gap-1 ml-auto items-end">
                  <div class="text-2xl font-bold flex items-center gap-1.5">
                    <Icon icon="game-icons:passport" class="size-6 shrink-0" />
                    <span>{snapshot.publicServices.passports}</span>
                  </div>
                  {#if snapshot.phase === 'preparation' && currentPlayer}
                    <div class="flex gap-1">
                      <button
                        class="btn-sm whitespace-nowrap"
                        disabled={snapshot.publicServices.passports <= 0 || currentPlayer.money < 2 || currentPlayer.stash.documents.length < 1 || pendingChoice}
                        onclick={() => handleBuyPool('passport')}
                      >
                         $2 Buy
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
              pendingChoice={pendingChoice || (activeBotIndices.includes(visualActivePlayerId))}
              computerTurn={activeBotIndices.includes(visualActivePlayerId)}
              waitingForPeer={!isMyP2PTurn}
              waitingForName={waitingForPlayerName}
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
  
  <div class="flex flex-col gap-4 items-center my-7 max-w-md mx-auto px-2">
    
  
    <div class="opacity-70 text-sm">
      <p class="italic">The game emulator may contain mistakes.</p>
      <p class="italic">Package Version: {import.meta.env.PACKAGE_VERSION}</p>
    </div>
  
    {#if isDev}
        <button class="btn-sm" onclick={runEngineTests}>Run Engine Unit Tests</button>
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
</div>
