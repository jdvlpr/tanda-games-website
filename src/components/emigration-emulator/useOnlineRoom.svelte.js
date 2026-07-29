/**
 * useOnlineRoom — rune-based composable for P2P multiplayer room management.
 *
 * Wraps all multiplayer lifecycle: connecting, player roster, sync, and
 * remote action handling.  Returns reactive state and action functions that
 * the caller wires into the game engine.
 *
 * Usage:
 *   const room = useOnlineRoom({ onRemoteAction, onSyncState, onGameStart });
 */

import {
  multiplayer,
  copyRoomUrl,
  getRoomCodeFromUrl,
  setRoomCodeInUrl,
  generateRoomCode,
} from "../../stores/multiplayer.svelte.js";
import { toast } from "../../stores/toast.svelte";
import { PACKS_LIST, shuffleArray } from "./engine.svelte.js";

export { copyRoomUrl };

/**
 * @param {object} callbacks
 * @param {(data: any, peerId: string) => void} callbacks.onRemoteAction
 *   Called whenever a game action arrives from a peer.
 * @param {(remoteSnapshot: any) => void} callbacks.onSyncState
 *   Called whenever the host pushes a full state sync.
 * @param {() => void} [callbacks.onGameStart]
 *   Called on non-host peers when the host fires start_game.
 */
export function useOnlineRoom({ onRemoteAction, onSyncState, onGameStart } = {}) {
  // ── Reactive state ────────────────────────────────────────────────────────
  let currentRoomCode = $state("");
  let localPlayerName = $state("Player 1");
  let p2pPlayers = $state([]); // { peerId, name, isHost, isBot? }[]
  let myP2PPlayerIdx = $state(-1);
  let hostPeerId = $state(null);
  let selectedPacks = $state([]);

  // ── Internal helpers ──────────────────────────────────────────────────────
  function getRandomPacks(count) {
    return shuffleArray([...PACKS_LIST]).slice(0, count);
  }

  // ── Lifecycle effect: subscribe to multiplayer events ─────────────────────
  $effect(() => {
    if (typeof window === "undefined") return;

    // Auto-join from URL on first load
    const urlCode = getRoomCodeFromUrl();
    if (urlCode && !currentRoomCode) {
      currentRoomCode = urlCode;
      connectToRoom(urlCode, false);
    }

    const unsubAction = multiplayer.onAction((data, peerId) => {
      handleRemoteMessage(data, peerId);
    });

    const unsubSync = multiplayer.onSyncState((remoteSnapshot) => {
      onSyncState?.(remoteSnapshot);
    });

    const unsubJoin = multiplayer.onPeerJoin(() => {
      if (currentRoomCode) {
        multiplayer.broadcastPlayerInfo({
          name: localPlayerName,
          isHost: multiplayer.isHost,
        });
      }
      if (multiplayer.isHost) {
        const available = PACKS_LIST.filter((p) => !selectedPacks.includes(p));
        if (available.length > 0) {
          const randomPack = available[Math.floor(Math.random() * available.length)];
          selectedPacks = [...selectedPacks, randomPack];
          multiplayer.broadcastSetupState(p2pPlayers, selectedPacks);
        }
      }
    });

    const unsubLeave = multiplayer.onPeerLeave((leavingPeerId) => {
      if (!multiplayer.isHost) {
        if (hostPeerId && leavingPeerId === hostPeerId) {
          exitRoomLocal("The host left the game. The room has been closed.");
          return;
        }
        const leftPlayer = p2pPlayers.find((p) => p.peerId === leavingPeerId);
        if (leftPlayer?.isHost) {
          exitRoomLocal("The host left the game. The room has been closed.");
          return;
        }
        if (leftPlayer) {
          toast.warning(`${leftPlayer.name} left the room.`);
        }
      } else {
        const leftPlayer = p2pPlayers.find((p) => p.peerId === leavingPeerId);
        const leftName = leftPlayer?.name || "A player";
        p2pPlayers = p2pPlayers.filter((p) => p.peerId !== leavingPeerId);
        toast.warning(`${leftName} left the room.`);

        if (selectedPacks.length > 0) {
          selectedPacks = selectedPacks.slice(0, -1);
        }
        multiplayer.broadcastSetupState(p2pPlayers, selectedPacks);
      }
    });

    return () => {
      unsubAction();
      unsubSync();
      unsubJoin();
      unsubLeave();
    };
  });

  // ── Remote message router ─────────────────────────────────────────────────
  function handleRemoteMessage(data, peerId) {
    if (!data || typeof data !== "object") return;

    try {
      if (!multiplayer.isHost && peerId) {
        hostPeerId = peerId;
      }

      if (data.type === "room_closed") {
        exitRoomLocal(data.payload?.reason || "The host closed the room.");
        return;
      }

      if (data.type === "player_left") {
        if (!multiplayer.isHost) {
          if (Array.isArray(data.payload?.p2pPlayers)) {
            p2pPlayers = data.payload.p2pPlayers;
          } else if (data.payload?.peerId) {
            p2pPlayers = p2pPlayers.filter(
              (p) => p.peerId !== data.payload.peerId,
            );
          }
          toast.warning(`${data.payload?.name || "A player"} left the room.`);
        }
        return;
      }

      if (data.type === "player_info") {
        if (multiplayer.isHost) {
          const existing = p2pPlayers.find((p) => p.peerId === peerId);
          if (existing) {
            existing.name = data.payload?.name;
          } else {
            let peerName = data.payload?.name || "Anonymous";
            if (/^Player \d+$/.test(peerName)) {
              peerName = `Player ${p2pPlayers.length + 1}`;
            }
            p2pPlayers = [...p2pPlayers, { peerId, name: peerName, isHost: false }];
          }
          multiplayer.broadcastSetupState(p2pPlayers, selectedPacks);
        }
        return;
      }

      if (data.type === "setup_state") {
        if (!multiplayer.isHost && Array.isArray(data.payload?.p2pPlayers)) {
          p2pPlayers = data.payload.p2pPlayers;
          if (data.payload.selectedPacks) selectedPacks = data.payload.selectedPacks;
          const myIdx = p2pPlayers.findIndex(
            (p) => p.peerId === multiplayer.selfId,
          );
          if (myIdx !== -1) {
            myP2PPlayerIdx = myIdx;
            localPlayerName = p2pPlayers[myIdx].name;
          }
        }
        return;
      }

      if (data.type === "start_game") {
        if (!multiplayer.isHost) {
          onGameStart?.();
        }
        return;
      }

      // Delegate in-game messages to the caller
      onRemoteAction?.(data, peerId);
    } catch (err) {
      console.warn("[useOnlineRoom] Dropped invalid message from peer:", peerId, err);
    }
  }

  // ── Public actions ────────────────────────────────────────────────────────
  function connectToRoom(code, asHost) {
    currentRoomCode = code;
    setRoomCodeInUrl(code);
    p2pPlayers = [{ peerId: "self", name: localPlayerName, isHost: asHost }];
    if (asHost) {
      myP2PPlayerIdx = 0;
      hostPeerId = "self";
      selectedPacks = getRandomPacks(1);
    }
    multiplayer.connect(code, asHost);
  }

  function hostRoom() {
    const code = generateRoomCode();
    connectToRoom(code, true);
  }

  function joinRoom(code) {
    const trimmed = code.trim().toUpperCase();
    if (trimmed.length === 5) {
      connectToRoom(trimmed, false);
    } else {
      toast.error("Please enter a valid 5-character room code.");
    }
  }

  function exitRoom() {
    if (multiplayer.isHost && currentRoomCode) {
      try {
        multiplayer.broadcastAction("room_closed", {
          reason: "The host closed the room.",
        });
      } catch (e) {
        console.warn("Failed to broadcast room_closed:", e);
      }
    }
    exitRoomLocal();
  }

  function exitRoomLocal(noticeMessage = "") {
    multiplayer.disconnect();
    currentRoomCode = "";
    p2pPlayers = [];
    myP2PPlayerIdx = -1;
    hostPeerId = null;
    if (typeof window !== "undefined") {
      window.history.replaceState({}, "", window.location.pathname);
    }
    if (noticeMessage) {
      toast.error(noticeMessage);
    }
  }

  function updateLocalPlayerName(name) {
    localPlayerName = name;
    const me = p2pPlayers.find((p) => p.peerId === "self");
    if (me) me.name = localPlayerName;
    if (currentRoomCode) {
      multiplayer.broadcastPlayerInfo({ name, isHost: multiplayer.isHost });
    }
  }

  function addBot() {
    const botName = `🤖 Robot ${p2pPlayers.length + 1}`;
    p2pPlayers = [
      ...p2pPlayers,
      {
        peerId: "robot-" + Math.random().toString(36).substr(2, 5),
        name: botName,
        isHost: false,
        isBot: true,
      },
    ];
    selectedPacks = getRandomPacks(p2pPlayers.length);
    multiplayer.broadcastSetupState(p2pPlayers, selectedPacks);
  }

  function removeBot(idx) {
    p2pPlayers = p2pPlayers.filter((_, i) => i !== idx);
    selectedPacks = getRandomPacks(p2pPlayers.length);
    multiplayer.broadcastSetupState(p2pPlayers, selectedPacks);
  }

  function togglePack(pack) {
    if (selectedPacks.includes(pack)) {
      selectedPacks = selectedPacks.filter((p) => p !== pack);
    } else {
      selectedPacks = [...selectedPacks, pack];
    }
    if (multiplayer.isHost) {
      multiplayer.broadcastSetupState(p2pPlayers, selectedPacks);
    }
  }

  function broadcastGameStart(snapshot) {
    multiplayer.broadcastGameStart(snapshot);
  }

  // ── Expose ────────────────────────────────────────────────────────────────
  return {
    // State (read-only from outside, reactive via runes)
    get currentRoomCode() { return currentRoomCode; },
    get localPlayerName() { return localPlayerName; },
    get p2pPlayers() { return p2pPlayers; },
    get myP2PPlayerIdx() { return myP2PPlayerIdx; },
    get selectedPacks() { return selectedPacks; },
    get isHost() { return multiplayer.isHost; },
    get selfId() { return multiplayer.selfId; },

    // Actions
    hostRoom,
    joinRoom,
    exitRoom,
    updateLocalPlayerName,
    addBot,
    removeBot,
    togglePack,
    broadcastGameStart,

    // Low-level multiplayer passthrough (for engine dispatch)
    broadcastAction: multiplayer.broadcastAction.bind(multiplayer),
    broadcastSyncState: multiplayer.broadcastSyncState.bind(multiplayer),
  };
}
