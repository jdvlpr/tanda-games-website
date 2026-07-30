<script>
  import Icon from "@iconify/svelte";
  import { changelog } from "../../js/emegration-changelog.js";
  import { playPaydaySound } from "../../js/utils.svelte.js";
  import { multiplayer } from "../../stores/multiplayer.svelte.js";
  import { toast } from "../../stores/toast.svelte";
  import ActionPanel from "./ActionPanel.svelte";
  import { createAutoPlayer } from "./autoplay.js";
  import CardActionPopover from "./CardActionPopover.svelte";
  import DiscardPile from "./DiscardPile.svelte";
  import EmulatorHeader from "./EmulatorHeader.svelte";
  import EmigrationEngine, {
    DESTINATIONS,
    LIFE_CARD_DEFINITIONS,
    NATIONALITIES,
    NATIONALITY_TO_COUNTRY,
    PACKS_LIST,
    runTests,
    shuffleArray,
  } from "./engine.svelte.js";
  import GameLogSheet from "./GameLogSheet.svelte";
  import Modal from "./Modal.svelte";
  import PlayerBoardsCarousel from "./PlayerBoardsCarousel.svelte";
  import PublicResourcePool from "./PublicResourcePool.svelte";
  import RulebookModal from "./RulebookModal.svelte";
  import SecurityLanes from "./SecurityLanes.svelte";
  import SettingsModal from "./SettingsModal.svelte";
  import SetupScreen from "./SetupScreen.svelte";
  import { copyRoomUrl, useOnlineRoom } from "./useOnlineRoom.svelte.js";
  import { getRandomPacks, getRandomPlayersSetup, createStandardGameSetup } from "./gameSetup.js";

  // Props
  let { defaultMode = "competitive", defaultPlayerCount = 4 } = $props();

  const VERSION = changelog[0].version;
  const ID = "emigration";

  const rulebookHref = `/files/${ID}/v${VERSION}/emigration-game-rulebook-v${VERSION}.pdf`;

  // Dev flag
  const isDev = import.meta.env.DEV;

  let showRobotMode = $state(null);

  $effect(() => {
    showRobotMode = getRobotModeFromUrl();
  });

  let showSettings = $state(false);
  let showRulebook = $state(false);

  function getRobotModeFromUrl() {
    if (typeof window === "undefined") return null;
    const params = new URLSearchParams(window.location.search);
    return !!params.get("showRobotMode");
  }



  // Setup State
  let isSetup = $state(true);
  let mode = $state(defaultMode);
  let playerCount = $state(defaultPlayerCount);
  let localSelectedPacks = $state(getRandomPacks(defaultPlayerCount));
  let botPersonas = $state({});

  // Heuristic personas available for random assignment
  const HEURISTIC_PERSONAS = ['expert', 'rusher', 'hoarder', 'saboteur', 'conservative'];

  /**
   * Returns a copy of botPersonas with any unset bot slot filled with a random persona.
   * Explicit SetupScreen selections are always preserved.
   */
  function resolvePersonas(botIndices) {
    const resolved = { ...botPersonas };
    for (const idx of botIndices) {
      if (!resolved[idx]) {
        resolved[idx] = HEURISTIC_PERSONAS[Math.floor(Math.random() * HEURISTIC_PERSONAS.length)];
      }
    }
    return resolved;
  }

  // Initialize default players with randomized nationalities and destinations
  let playersSetup = $state(getRandomPlayersSetup());

  // Game State
  let engine = $state(null);
  let snapshot = $state(null); // reactive copy of engine state
  let pendingChoice = $state(null);
  let autoplay = $state(null);
  let gameType = $state("vscomputer");

  // Solo vs AI State
  let aiPlayer = $state(null);
  let aiThinking = $state(false);
  let activeBotIndices = $state([]);

  // Selection State
  let selectedSlot = $state(null);
  let selectedStash = $state(null);
  let selectedAnchorRect = $state(null);
  // Carousel container (bound from PlayerBoardsCarousel for CardActionPopover)
  let playerBoardsContainer = $state(null);

  // ── Online Room Handlers ───────────────────────────────────────────────
  function handleRemoteAction(data, peerId) {
    if (!data || typeof data !== "object") return;
    try {
      // --- In-game messages ---
      if (!engine) return;

      if (data.type === "GAME_ACTION") {
        const { actionType, params } = data.payload || {};
        if (actionType === "graduate" || actionType === "sell") {
          engine.executeOptionalAction(actionType, params);
        } else if (actionType) {
          engine.executeRequiredAction(actionType, params);
        }
      } else if (data.type === "LANE_SELECT") {
        engine.selectLane(data.payload?.laneIdx);
      } else if (data.type === "MODAL_RESOLVE") {
        pendingChoice = null;
        engine.resolveChoice(data.payload?.value, data.payload?.rolls);
      } else if (data.type === "BUY_POOL") {
        engine.executeRequiredAction("buyPool", {
          cardType: data.payload?.cardType,
        });
      } else if (data.type === "STEAL_POOL") {
        engine.executeRequiredAction("steal", {
          cardType: data.payload?.cardType,
        });
      }

      snapshot = engine.getSnapshot();
      pendingChoice = engine.pendingChoice ?? null;
    } catch (err) {
      console.warn(
        "[Emulator] Dropped invalid action payload from peer:",
        peerId,
        err,
      );
    }
  }

  function handleRemoteSyncState(remoteSnapshot) {
    if (!remoteSnapshot || typeof remoteSnapshot !== "object") return;
    try {
      // Create the engine if it doesn't exist yet (first sync from host at game start)
      if (!engine) {
        isSetup = false;
        engine = createStandardGameSetup({
          mode: remoteSnapshot.mode || mode,
          playersSetupOverride: Array.isArray(remoteSnapshot.players)
            ? remoteSnapshot.players
            : [],
          onLog: (entry) => {
        if (engine) snapshot = engine.getSnapshot();
        if (entry?.msg?.includes("SALARIES:")) playPaydaySound();
        if (entry?.type === 'toast') toast[entry.style](entry.toastMsg, entry.opts);
      },
          onStateChange: () => {
            if (engine) {
              snapshot = engine.getSnapshot();
              pendingChoice = engine.pendingChoice ?? null;
            }
            selectedSlot = null;
            selectedStash = null;
            selectedAnchorRect = null;
          },
        }).engine;
      }
      engine.loadSnapshot(remoteSnapshot);
      snapshot = engine.getSnapshot();
      visualActivePlayerId =
        snapshot.phase === "preparation"
          ? snapshot.currentPlayerIdx
          : snapshot.crossingOrder
            ? snapshot.crossingOrder[snapshot.activeCrossingIdx]
            : snapshot.activeCrossingIdx;
      previousActualPlayerId = visualActivePlayerId;
      pendingChoice = engine.pendingChoice ?? null;
    } catch (err) {
      console.warn("[Emulator] Dropped invalid sync state from peer:", err);
    }
  }

  // ── Online Room composable ───────────────────────────────────────────────
  const room = useOnlineRoom({
    onRemoteAction: handleRemoteAction,
    onSyncState: handleRemoteSyncState,
    onGameStart: () => {
      isSetup = false;
    },
  });

  // Convenience aliases so templates stay readable
  let currentRoomCode = $derived(room.currentRoomCode);
  let p2pPlayers = $derived(room.p2pPlayers);
  let myP2PPlayerIdx = $derived(room.myP2PPlayerIdx);

  let activeSelectedPacks = $derived(
    gameType === "online" ? room.selectedPacks : localSelectedPacks,
  );

  let isPreparationPhase = $derived(snapshot?.phase === "preparation");

  function getLifeCardDescription(title) {
    return (
      LIFE_CARD_DEFINITIONS.find((card) => card.title === title)?.description ??
      ""
    );
  }

  // Derived Values
  let currentPlayer = $derived(
    snapshot ? snapshot.players[actualActivePlayerId] : null,
  );

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
    const raw = engine.getValidActions(
      snapshot.players[snapshot.currentPlayerIdx],
    );

    // Determine what card type is selected, and where it lives
    let selectionCardType = null; // 'payday' | 'life' | 'document' | 'connection'
    let selectionSource = null; // 'layout' | 'stash-doc' | 'stash-conn' | 'stash-ticket' | 'stash-passport'

    if (selectedSlot) {
      const targetPlayer = snapshot.players[selectedSlot.playerIdx];
      const card = targetPlayer?.layout[selectedSlot.slotIdx]?.card;
      if (card) {
        selectionCardType = card.type;
        selectionSource = "layout";
      }
    } else if (selectedStash) {
      const t = selectedStash.stashType;
      if (t === "document") {
        selectionCardType = "document";
        selectionSource = "stash-doc";
      }
      if (t === "connection") {
        selectionCardType = "connection";
        selectionSource = "stash-conn";
      }
      if (t === "ticket") {
        selectionCardType = "ticket";
        selectionSource = "stash-ticket";
      }
      if (t === "passport") {
        selectionCardType = "passport";
        selectionSource = "stash-passport";
      }
    }

    // No selection — disable actions that require a target card
    if (!selectionSource) {
      return raw.map((action) => {
        if (
          ["activate", "buy", "discard", "sell", "reclaim", "steal"].includes(
            action.type,
          )
        ) {
          return { ...action, enabled: false };
        }
        return action;
      });
    }

    return raw.map((action) => {
      let allowed = true;

      const isOwnTarget =
        (selectedSlot &&
          selectedSlot.playerIdx === snapshot.currentPlayerIdx) ||
        (selectedStash &&
          selectedStash.playerIdx === snapshot.currentPlayerIdx);

      if (selectionSource === "layout") {
        if (selectionCardType === "payday" || selectionCardType === "life") {
          // Payday & Life: only Activate
          allowed = action.type === "activate";
        } else if (
          selectionCardType === "document" ||
          selectionCardType === "connection"
        ) {
          // Doc & Conn in layout: Buy or Discard only
          allowed = action.type === "buy" || action.type === "discard";
        }
      } else if (
        selectionSource === "stash-doc" ||
        selectionSource === "stash-conn"
      ) {
        // Stash doc/conn: Sell only (Discard is only valid on layout cards)
        // You can only sell your own stash items
        allowed = action.type === "sell" && isOwnTarget;
      } else if (
        selectionSource === "stash-ticket" ||
        selectionSource === "stash-passport"
      ) {
        // Stash ticket/passport: only Reclaim (targeting another player's extra ticket/passport)
        allowed = action.type === "reclaim" && !isOwnTarget;
      }

      return allowed ? action : { ...action, enabled: false };
    });
  });

  // ── Action splitting ─────────────────────────────────────────────────────
  // Card-specific actions → live in the popover
  const POPOVER_ACTION_TYPES = new Set([
    "buy",
    "discard",
    "activate",
    "sell",
    "reclaim",
  ]);
  // Also exclude 'steal' from the dashboard — it already has dedicated buttons in Public Resources
  const DASHBOARD_EXCLUDED_TYPES = new Set([
    "buy",
    "discard",
    "activate",
    "sell",
    "reclaim",
    "steal",
  ]);

  let popoverActions = $derived(
    filteredActions.filter((a) => POPOVER_ACTION_TYPES.has(a.type)),
  );
  let dashboardActions = $derived(
    filteredActions.filter((a) => !DASHBOARD_EXCLUDED_TYPES.has(a.type)),
  );

  let popoverDescription = $derived.by(() => {
    if (!snapshot) return "";
    if (selectedSlot) {
      const p = snapshot.players[selectedSlot.playerIdx];
      const card = p?.layout[selectedSlot.slotIdx]?.card;
      if (card && card.type === "life") {
        return getLifeCardDescription(card.name || card.title || "");
      }
    }
    if (selectedStash) {
      const p = snapshot.players[selectedStash.playerIdx];
      const { stashType: t, itemIdx: i } = selectedStash;
      if (t === "lifeCard") {
        const card = p?.stash.lifeCards[i];
        return getLifeCardDescription(card?.title || "");
      }
    }
    return "";
  });

  let showPopover = $derived(
    !!(
      selectedAnchorRect &&
      (selectedSlot || selectedStash) &&
      snapshot?.phase === "preparation"
    ),
  );

  let actualActivePlayerId = $derived(
    snapshot
      ? snapshot.phase === "preparation"
        ? snapshot.currentPlayerIdx
        : snapshot.crossingOrder
          ? snapshot.crossingOrder[snapshot.activeCrossingIdx]
          : snapshot.activeCrossingIdx
      : 0,
  );
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
      snapshot.phase !== "game_over" &&
      activeBotIndices.includes(visualActivePlayerId),
  );

  // Is it currently this client's turn to provide input?
  let isMyTurn = $derived.by(() => {
    if (!snapshot || snapshot.phase === "game_over") return false;

    const actingPlayerIdx = pendingChoice
      ? pendingChoice.playerIdx
      : actualActivePlayerId;

    if (gameType === "online") {
      if (myP2PPlayerIdx === -1) return true;
      return actingPlayerIdx === myP2PPlayerIdx;
    }

    if (activeBotIndices.includes(actingPlayerIdx)) {
      return false;
    }

    return true;
  });

  // Name of the player whose turn it currently is (for the "Waiting for X" message)
  let waitingForPlayerName = $derived.by(() => {
    if (!snapshot || gameType !== "online" || isMyTurn) return "";

    const actingPlayerIdx = pendingChoice
      ? pendingChoice.playerIdx
      : actualActivePlayerId;
    if (activeBotIndices.includes(actingPlayerIdx)) return "";

    return snapshot.players?.[actingPlayerIdx]?.name ?? "another player";
  });

  // Drive AI turns whenever snapshot changes
  $effect(() => {
    if (
      !snapshot ||
      !aiPlayer ||
      aiThinking ||
      isTransitioning ||
      activeBotIndices.length === 0
    )
      return;
    if (snapshot.phase === "game_over") return;

    const choiceBotIdx = pendingChoice
      ? activeBotIndices.includes(pendingChoice.playerIdx)
      : false;

    // Pause AI turns if there's a pending choice targeted at a non-bot player.
    if (pendingChoice && !choiceBotIdx) return;

    // If there is a pending choice directed at an AI player during a non-bot's turn
    if (pendingChoice && choiceBotIdx) {
      aiThinking = true;
      setTimeout(() => {
        if (!engine || engine.phase === "game_over") {
          aiThinking = false;
          return;
        }
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
      if (!engine || engine.phase === "game_over") {
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
      if (
        !engine.pendingChoice ||
        activeBotIndices.includes(engine.pendingChoice.playerIdx)
      ) {
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

  // Tests
  let testResults = $state(null);

  // ── Bot proxy factory ──────────────────────────────────────────────────
  /**
   * Wraps a game engine with a Proxy that automatically broadcasts every action
   * to peers over the multiplayer channel, so online bots stay in sync.
   */
  function createBotEngine(baseEngine) {
    return new Proxy(baseEngine, {
      get(target, prop) {
        if (["executeRequiredAction", "executeOptionalAction"].includes(prop)) {
          return (actionType, params = {}) => {
            if (["applyCollege", "graduate", "activate"].includes(actionType)) {
              params.rolls = [
                Math.floor(Math.random() * 6) + 1,
                Math.floor(Math.random() * 6) + 1,
                Math.floor(Math.random() * 6) + 1,
              ];
            }
            const res = target[prop](actionType, params);
            room.broadcastAction("GAME_ACTION", { actionType, params });
            if (engine) room.broadcastSyncState(engine.getSnapshot());
            return res;
          };
        }
        if (prop === "resolveChoice") {
          return (value) => {
            const rolls = [
              Math.floor(Math.random() * 6) + 1,
              Math.floor(Math.random() * 6) + 1,
              Math.floor(Math.random() * 6) + 1,
            ];
            const res = target.resolveChoice(value, rolls);
            room.broadcastAction("MODAL_RESOLVE", { value, rolls });
            if (engine) room.broadcastSyncState(engine.getSnapshot());
            return res;
          };
        }
        if (prop === "selectLane") {
          return (laneIdx) => {
            const res = target.selectLane(laneIdx);
            room.broadcastAction("LANE_SELECT", { laneIdx });
            if (engine) room.broadcastSyncState(engine.getSnapshot());
            return res;
          };
        }
        const orig = target[prop];
        if (typeof orig === "function") return orig.bind(target);
        return orig;
      },
    });
  }

  function startP2PGame() {
    if (!room.isHost) return;

    // Shuffle both arrays
    const shuffledNats = shuffleArray([...NATIONALITIES]);
    const availableDests = shuffleArray([...DESTINATIONS]);

    const finalPlayers = p2pPlayers.map((p, i) => {
      const nat = shuffledNats[i];
      const matchingCountry = NATIONALITY_TO_COUNTRY[nat.name];
      const destIndex = availableDests.findIndex(
        (d) => d.name !== matchingCountry,
      );
      const [destObj] = availableDests.splice(destIndex, 1);
      return { name: p.name, nationality: nat, destination: destObj };
    });

    engine = createStandardGameSetup({
      mode,
      playersSetupOverride: finalPlayers,
      selectedPacks: activeSelectedPacks,
      onLog: (entry) => {
        if (engine) snapshot = engine.getSnapshot();
        if (entry?.msg?.includes("SALARIES:")) playPaydaySound();
        if (entry?.type === 'toast') toast[entry.style](entry.toastMsg, entry.opts);
      },
      onStateChange: () => {
        if (engine) {
          snapshot = engine.getSnapshot();
          pendingChoice = engine.pendingChoice ?? null;
        }
        selectedSlot = null;
        selectedStash = null;
        selectedAnchorRect = null;
      },
    }).engine;

    snapshot = engine.getSnapshot();
    visualActivePlayerId =
      snapshot.phase === "preparation"
        ? snapshot.currentPlayerIdx
        : snapshot.crossingOrder
          ? snapshot.crossingOrder[snapshot.activeCrossingIdx]
          : snapshot.activeCrossingIdx;
    previousActualPlayerId = visualActivePlayerId;
    isTransitioning = false;
    pendingChoice = engine.pendingChoice ?? null;
    isSetup = false;
    testResults = null;
    aiThinking = false;
    autoplay = null;

    // Set up AI bots for any robot players in the lobby
    activeBotIndices = p2pPlayers
      .map((p, i) => (p.isBot ? i : -1))
      .filter((i) => i !== -1);
    if (activeBotIndices.length > 0) {
      const resolvedPersonas = resolvePersonas(activeBotIndices);
      aiPlayer = createAutoPlayer(createBotEngine(engine), "expert", {
        botIndices: activeBotIndices,
        personas: resolvedPersonas,
      });
    } else {
      aiPlayer = null;
    }

    room.broadcastGameStart(snapshot);
  }

  function startGame(requestedGameType = "vscomputer") {
    // Shuffle both arrays
    const shuffledNats = shuffleArray([...NATIONALITIES]);
    const availableDests = shuffleArray([...DESTINATIONS]);

    const activeSetup = playersSetup.slice(0, playerCount);
    const finalPlayers = activeSetup.map((p, i) => {
      const nat = shuffledNats[i];
      const matchingCountry = NATIONALITY_TO_COUNTRY[nat.name];
      const destIndex = availableDests.findIndex(
        (d) => d.name !== matchingCountry,
      );
      const [destObj] = availableDests.splice(destIndex, 1);
      return { name: p.name, nationality: nat, destination: destObj };
    });

    engine = createStandardGameSetup({
      mode,
      playersSetupOverride: finalPlayers,
      selectedPacks: activeSelectedPacks,
      onLog: (entry) => {
        if (engine) snapshot = engine.getSnapshot();
        if (entry?.msg?.includes("SALARIES:")) playPaydaySound();
        if (entry?.type === 'toast') toast[entry.style](entry.toastMsg, entry.opts);
      },
      onStateChange: () => {
        if (engine) {
          snapshot = engine.getSnapshot();
          pendingChoice = engine.pendingChoice ?? null;
        }
        selectedSlot = null;
        selectedStash = null;
        selectedAnchorRect = null;
      },
    }).engine;

    snapshot = engine.getSnapshot();
    visualActivePlayerId =
      snapshot.phase === "preparation"
        ? snapshot.currentPlayerIdx
        : snapshot.crossingOrder
          ? snapshot.crossingOrder[snapshot.activeCrossingIdx]
          : snapshot.activeCrossingIdx;
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

    if (requestedGameType === "auto") {
      // AI Simulation: all players AI-controlled, plays at speed
      activeBotIndices = engine.players.map((_, i) => i);
      autoplay = createAutoPlayer(engine, "expert", { personas: resolvePersonas(activeBotIndices) });
      autoplay.playFullGame(100);
    } else if (requestedGameType === "vscomputer") {
      // Solo vs AI: Player 1 (index 0) is human, all others AI
      activeBotIndices = engine.players.map((_, i) => i).filter((i) => i !== 0);
      aiPlayer = createAutoPlayer(engine, "expert", {
        botIndices: activeBotIndices,
        personas: resolvePersonas(activeBotIndices),
      });
    } else if (requestedGameType === "online" && room.isHost) {
      activeBotIndices = p2pPlayers
        .map((p, i) => (p.isBot ? i : -1))
        .filter((i) => i !== -1);
      if (activeBotIndices.length > 0) {
        const resolvedPersonas = resolvePersonas(activeBotIndices);
        aiPlayer = createAutoPlayer(createBotEngine(engine), "expert", {
          botIndices: activeBotIndices,
          personas: resolvedPersonas,
        });
      }
    }
    // 'passplay': no AI, full manual play
  }

  function handleAction(actionType) {
    if (!engine || !isMyTurn) return;

    const source = selectedSlot ? "layout" : selectedStash ? "stash" : null;
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
    if (["applyCollege", "graduate", "activate"].includes(actionType)) {
      params.rolls = [
        Math.floor(Math.random() * 6) + 1,
        Math.floor(Math.random() * 6) + 1,
        Math.floor(Math.random() * 6) + 1,
      ];
    }

    if (actionType === "graduate" || actionType === "sell") {
      engine.executeOptionalAction(actionType, params);
    } else {
      engine.executeRequiredAction(actionType, params);
    }

    multiplayer.broadcastAction("GAME_ACTION", { actionType, params });
    if (engine) multiplayer.broadcastSyncState(engine.getSnapshot());
  }

  function handleSelectLane(laneIdx) {
    if (!engine || !isMyTurn) return;
    engine.selectLane(laneIdx);
    multiplayer.broadcastAction("LANE_SELECT", { laneIdx });
    multiplayer.broadcastSyncState(engine.getSnapshot());
  }

  function handleCardSelect(selection) {
    // Ignore card taps when it's not this client's turn in P2P
    if (!isMyTurn) return;

    const { anchorEl, ...rest } = selection;

    // Toggle off if clicking the currently selected card
    const isSameSlot =
      selectedSlot &&
      rest.type === "layout" &&
      selectedSlot.playerIdx === rest.playerIdx &&
      selectedSlot.slotIdx === rest.slotIdx;
    const isSameStash =
      selectedStash &&
      rest.type === "stash" &&
      selectedStash.playerIdx === rest.playerIdx &&
      selectedStash.stashType === rest.stashType &&
      selectedStash.itemIdx === rest.itemIdx;

    if (isSameSlot || isSameStash) {
      selectedSlot = null;
      selectedStash = null;
      selectedAnchorRect = null;
      return;
    }

    selectedAnchorRect = anchorEl ? anchorEl.getBoundingClientRect() : null;

    if (rest.type === "layout") {
      selectedSlot = rest;
      selectedStash = null;
    } else if (rest.type === "stash") {
      selectedStash = rest;
      selectedSlot = null;
    }
  }

  function handleModalResolve(value) {
    if (!engine || !isMyTurn) return;
    pendingChoice = null;
    const rolls = [
      Math.floor(Math.random() * 6) + 1,
      Math.floor(Math.random() * 6) + 1,
      Math.floor(Math.random() * 6) + 1,
    ];
    engine.resolveChoice(value, rolls);
    multiplayer.broadcastAction("MODAL_RESOLVE", { value, rolls });
    multiplayer.broadcastSyncState(engine.getSnapshot());
  }

  function runEngineTests() {
    testResults = runTests();
  }

  function handleBuyPool(cardType) {
    if (!engine || !isMyTurn) return;
    engine.executeRequiredAction("buyPool", { cardType });
    multiplayer.broadcastAction("BUY_POOL", { cardType });
    multiplayer.broadcastSyncState(engine.getSnapshot());
  }

  function handleStealPool(cardType) {
    if (!engine || !isMyTurn) return;
    engine.executeRequiredAction("steal", { cardType });
    multiplayer.broadcastAction("STEAL_POOL", { cardType });
    multiplayer.broadcastSyncState(engine.getSnapshot());
  }

  function copyTextToClipboard(elementId) {
    const paragraphText = document.getElementById(elementId).innerText;

    navigator.clipboard
      .writeText(paragraphText)
      .then(() => alert("Paragraph text copied!"))
      .catch((err) => console.error("Failed to copy: ", err));
  }

  function getSecurityLaneBackgroundColor(i) {
    switch (i) {
      case 0:
        return "bg-yellow-100 dark:bg-yellow-900";
      case 1:
        return "bg-orange-100 dark:bg-orange-900";
      case 2:
        return "bg-red-100 dark:bg-red-900";
      case 3:
        return "bg-blue-100 dark:bg-blue-900";
      case 4:
        return "bg-green-100 dark:bg-green-900";
    }
  }
</script>

<!-- Modals -->
<SettingsModal
  bind:show={showSettings}
  {toast}
  {isSetup}
  {gameType}
  {mode}
  {PACKS_LIST}
  {activeSelectedPacks}
  {playerCount}
  {p2pPlayers}
  {currentRoomCode}
  {multiplayer}
  onlineSelectedPacks={room.selectedPacks}
  onmodechange={(m) => (mode = m)}
  ontogglepack={(pack) => {
    if (gameType === "online") {
      room.togglePack(pack);
    } else {
      if (localSelectedPacks.includes(pack)) {
        localSelectedPacks = localSelectedPacks.filter((p) => p !== pack);
      } else {
        localSelectedPacks = [...localSelectedPacks, pack];
      }
    }
  }}
/>

<RulebookModal bind:show={showRulebook} {rulebookHref} />

<!-- App Shell -->
<div class="">
  <EmulatorHeader
    onrulebook={() => (showRulebook = true)}
    onsettings={() => (showSettings = !showSettings)}
  />

  {#if isSetup}
    <SetupScreen
      bind:botPersonas
      bind:gameType
      {showRobotMode}
      bind:playersSetup
      bind:playerCount
      bind:localSelectedPacks
      {toast}
      {currentRoomCode}
      {p2pPlayers}
      isHost={room.isHost}
      selfId={room.selfId}
      onlineSelectedPacks={room.selectedPacks}
      onstart={({ gameType: gt }) => {
        if (gt === "online") {
          startP2PGame();
        } else {
          startGame(gt);
        }
      }}
      onhostroom={room.hostRoom}
      onjoinroom={room.joinRoom}
      onexitroom={room.exitRoom}
      onaddbot={room.addBot}
      onremovebot={room.removeBot}
      ontogglelocalpack={(pack) => {
        if (localSelectedPacks.includes(pack)) {
          localSelectedPacks = localSelectedPacks.filter((p) => p !== pack);
        } else {
          localSelectedPacks = [...localSelectedPacks, pack];
        }
      }}
      ontoggleonlinepack={room.togglePack}
      onupdatename={room.updateLocalPlayerName}
    />
  {:else if snapshot}
    <div class="max-w-3xl mx-auto px-2">
      {#if gameType === "online" && currentRoomCode}
        <div
          class="flex flex-wrap items-center justify-center md:justify-between gap-3 w-full mb-4"
        >
          <div
            class="flex justify-center md:justify-start items-center gap-2 flex-wrap"
          >
            <div class="flex items-center gap-1">
              <button
                class="btn-sm bg-emerald-200 dark:bg-emerald-800"
                onclick={copyRoomUrl}
                title="Click to copy Room Code"
              >
                <span class="flex items-center gap-1.5 font-bold">
                  <span class="relative flex h-2.5 w-2.5">
                    <span
                      class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-700 dark:bg-green-300 opacity-75"
                    ></span>
                    <span
                      class="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-700 dark:bg-green-300"
                    ></span>
                  </span>
                  {#if multiplayer.isHost}
                    Hosting
                  {/if}
                  Online Room:
                </span><span class="font-mono">{currentRoomCode}</span>
              </button>
            </div>

            <div class="flex items-center gap-1.5 text-xs">
              <span>{p2pPlayers.length} players</span>
              <span class="opacity-40">|</span>
              <span class="opacity-80 flex gap-1 flex-wrap">
                {#each p2pPlayers as p}
                  <span
                    class="px-1.5 py-0.5 rounded bg-neutral-50/60 dark:bg-neutral-950/60 {p.peerId ===
                      multiplayer.selfId ||
                    (multiplayer.isHost && p.isHost)
                      ? 'font-semibold'
                      : ''}"
                  >
                    {p.name}{p.isHost ? " (Host)" : ""}
                  </span>
                {/each}
              </span>
            </div>
          </div>

          <button
            class="btn-sm bg-red-300 dark:bg-red-700"
            onclick={room.exitRoom}
          >
            Exit Room
          </button>
        </div>
      {/if}
      <div
        class="flex flex-wrap gap-2 justify-center md:justify-end items-center mb-4"
      >
        <div class="flex flex-wrap items-center gap-3">
          {#if gameType !== "online" || multiplayer.isHost}
            <button
              class="btn-sm"
              onclick={() => {
                playersSetup = getRandomPlayersSetup();
                localSelectedPacks = getRandomPacks(playerCount);
                isSetup = true;
                activeBotIndices = [];
                aiPlayer = null;
                aiThinking = false;
              }}
              ><Icon icon="lucide:rotate-ccw"></Icon><span>
                New Game</span
              ></button
            >
          {/if}
        </div>
      </div>

      <!-- Main Column: Public Pool & Player Boards -->
      <div class="flex flex-col gap-2 relative">
        <!-- Security Lanes -->
        <SecurityLanes
          lanes={snapshot.securityLanes}
          phase={snapshot.phase}
          pendingChoice={!!pendingChoice}
          onlaneselect={handleSelectLane}
        />

        <!-- Public Resource Pool -->
        <PublicResourcePool
          publicServices={snapshot.publicServices}
          {currentPlayer}
          phase={snapshot.phase}
          pendingChoice={!!pendingChoice}
          onbuy={handleBuyPool}
          onsteal={handleStealPool}
        />

        <ActionPanel
          {engine}
          {snapshot}
          {currentPlayer}
          actions={dashboardActions}
          onaction={handleAction}
          pendingChoice={pendingChoice ||
            activeBotIndices.includes(visualActivePlayerId)}
          computerTurn={activeBotIndices.includes(visualActivePlayerId)}
          waitingForPeer={!isMyTurn}
          waitingForName={waitingForPlayerName}
        />

        <!-- Player Boards Carousel -->
        <PlayerBoardsCarousel
          players={snapshot.players}
          {engine}
          {snapshot}
          {visualActivePlayerId}
          {selectedSlot}
          {selectedStash}
          autoScrollEnabled={!autoplay}
          onCardSelect={handleCardSelect}
          bind:container={playerBoardsContainer}
        />

        <!-- Discard Pile -->
        <DiscardPile discardPile={engine.discardPile} />
      </div>
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
        {playerBoardsContainer}
        anchorRect={selectedAnchorRect}
        actions={popoverActions}
        description={popoverDescription}
        onaction={handleAction}
        onclose={() => {
          selectedSlot = null;
          selectedStash = null;
          selectedAnchorRect = null;
        }}
      />
    {/if}
  {/if}

  <div class="flex flex-col gap-4 items-center mb-7 mt-4 max-w-md mx-auto px-2">
    <div class="opacity-70 text-sm">
      <p class="italic">The game emulator may contain mistakes.</p>
      <p class="italic">Package Version: {import.meta.env.PACKAGE_VERSION}</p>
    </div>

    {#if isDev}
      <button class="btn-sm" onclick={runEngineTests}
        >Run Engine Unit Tests</button
      >
      {#if testResults}
        <div
          class="bg-black p-4 rounded-lg mb-6 font-mono text-xs max-h-[200px] overflow-y-auto"
        >
          {#each testResults as res}
            <div class="mb-1 {res.pass ? 'text-[#a3e635]' : 'text-[#ef4444]'}">
              {res.pass ? "✅" : "❌"}
              {res.description}
            </div>
          {/each}
        </div>
      {/if}
    {/if}
  </div>
</div>
