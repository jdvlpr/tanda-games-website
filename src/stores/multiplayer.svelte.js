import { toast } from './toast.svelte';

/**
 * 5-character alphanumeric room code generator (no ambiguous chars)
 */
export function generateRoomCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 5; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

/**
 * Read room code from URL parameter `?room=CODE`.
 */
export function getRoomCodeFromUrl() {
  if (typeof window === 'undefined') return null;
  const params = new URLSearchParams(window.location.search);
  const code = params.get('room');
  return code ? code.trim().toUpperCase() : null;
}

/**
 * Updates the URL ?room= parameter without reloading the page.
 */
export function setRoomCodeInUrl(code) {
  if (typeof window === 'undefined') return;
  const params = new URLSearchParams(window.location.search);
  params.set('room', code);
  const newUrl = `${window.location.pathname}?${params.toString()}${window.location.hash}`;
  window.history.replaceState(null, '', newUrl);
}

/**
 * Copy full room URL to clipboard and show toast feedback.
 */
export async function copyRoomUrl() {
  if (typeof window === 'undefined') return;
  try {
    await navigator.clipboard.writeText(window.location.href);
    toast.success('Room link copied to clipboard!');
  } catch (err) {
    toast.error('Failed to copy room link.');
  }
}

class MultiplayerStore {
  roomCode = $state('');
  peerCount = $state(0);
  isConnected = $state(false);
  isHost = $state(false);
  peers = $state([]);
  selfId = $state('');

  // Internal Trystero room & action handles
  #room = null;
  #sendGameAction = null;
  #sendSyncState = null;

  // Registered handler callbacks
  #actionHandlers = new Set();
  #syncStateHandlers = new Set();
  #peerJoinHandlers = new Set();

  /**
   * Connect to a Trystero Nostr room.
   * @param {string} code  The 5-char room code
   * @param {boolean} asHost  True if this peer is the host
   */
  async connect(code, asHost = false) {
    if (typeof window === 'undefined') return;

    if (this.#room) {
      this.disconnect();
    }

    this.roomCode = code;
    this.isHost = asHost;
    this.peers = [];
    this.peerCount = 0;

    try {
      const { joinRoom, selfId } = await import('trystero/nostr');

      const room = joinRoom({ appId: 'emigration-boardgame-emulator' }, code);
      this.#room = room;
      this.selfId = selfId;
      this.isConnected = true;

      // --- Set up actions ---
      // Trystero v0.25+: makeAction returns an object with .send and .onMessage
      const gameAction = room.makeAction('game_action');
      const syncStateAction = room.makeAction('sync_state');

      // Store send functions
      this.#sendGameAction = (payload, targetPeerId) => {
        if (targetPeerId) {
          gameAction.send(payload, { target: targetPeerId });
        } else {
          gameAction.send(payload);
        }
      };

      this.#sendSyncState = (data, targetPeerId) => {
        if (targetPeerId) {
          syncStateAction.send(data, { target: targetPeerId });
        } else {
          syncStateAction.send(data);
        }
      };

      // IMPORTANT: Trystero onMessage receives (data, { peerId })
      gameAction.onMessage = (payload, { peerId }) => {
        for (const handler of this.#actionHandlers) {
          try { handler(payload, peerId); } catch (e) {
            console.error('[Multiplayer] Action handler error:', e);
          }
        }
      };

      syncStateAction.onMessage = (data, { peerId }) => {
        for (const handler of this.#syncStateHandlers) {
          try { handler(data, peerId); } catch (e) {
            console.error('[Multiplayer] SyncState handler error:', e);
          }
        }
      };

      // --- Peer lifecycle ---
      room.onPeerJoin = (peerId) => {
        if (!this.peers.includes(peerId)) {
          this.peers = [...this.peers, peerId];
          this.peerCount = this.peers.length;
        }
        toast.info(`Peer connected (${this.peerCount} peer${this.peerCount > 1 ? 's' : ''})`);
        for (const handler of this.#peerJoinHandlers) {
          try { handler(peerId); } catch (e) {
            console.error('[Multiplayer] PeerJoin handler error:', e);
          }
        }
      };

      room.onPeerLeave = (peerId) => {
        this.peers = this.peers.filter(p => p !== peerId);
        this.peerCount = this.peers.length;
        toast.warning(`Peer disconnected (${this.peerCount} peer${this.peerCount !== 1 ? 's' : ''} remaining)`);
      };

    } catch (err) {
      console.error('[Multiplayer] Failed to connect:', err);
      toast.error('Failed to initialize P2P room connection');
    }
  }

  /** Send a typed game action to all peers (or a specific peer). */
  sendAction(type, payload, targetPeerId = null) {
    if (!this.#sendGameAction) {
      console.warn('[Multiplayer] sendAction called before connected');
      return;
    }
    this.#sendGameAction({ type, payload }, targetPeerId);
  }

  /**
   * Broadcast a game snapshot to all peers (or a specific peer) via the
   * dedicated sync_state channel.
   */
  sendSyncState(snapshot, targetPeerId = null) {
    if (!this.#sendSyncState) {
      console.warn('[Multiplayer] sendSyncState called before connected');
      return;
    }
    this.#sendSyncState(snapshot, targetPeerId);
  }

  // --- Convenience helpers for specific action types ---

  broadcastPlayerInfo(info) {
    this.sendAction('player_info', info);
  }

  broadcastSetupState(p2pPlayers) {
    this.sendAction('setup_state', { p2pPlayers });
  }

  /**
   * Host calls this to start the game.
   * Sends the initial snapshot via the reliable sync_state channel so peers
   * can bootstrap their engine from it.
   */
  broadcastGameStart(snapshot) {
    // First, signal that the game is starting (lets peers hide the waiting room)
    this.sendAction('start_game', {});
    // Then immediately send the full authoritative snapshot on the sync channel
    this.sendSyncState(snapshot);
  }

  /** Broadcast a live game-action to all peers (post-game-start). */
  broadcastAction(type, payload) {
    this.sendAction(type, payload);
  }

  /** Broadcast a live state snapshot to all peers (post-game-start). */
  broadcastSyncState(snapshot, targetPeerId = null) {
    this.sendSyncState(snapshot, targetPeerId);
  }

  /** Register a handler for incoming game actions. Returns an unsubscribe fn. */
  onAction(handler) {
    this.#actionHandlers.add(handler);
    return () => this.#actionHandlers.delete(handler);
  }

  /** Register a handler for incoming state snapshots. Returns an unsubscribe fn. */
  onSyncState(handler) {
    this.#syncStateHandlers.add(handler);
    return () => this.#syncStateHandlers.delete(handler);
  }

  /** Register a handler called when any peer joins. Returns an unsubscribe fn. */
  onPeerJoin(handler) {
    this.#peerJoinHandlers.add(handler);
    return () => this.#peerJoinHandlers.delete(handler);
  }

  /** Leave the current room and reset state. */
  disconnect() {
    if (this.#room) {
      try { this.#room.leave(); } catch (_) {}
      this.#room = null;
    }
    this.#sendGameAction = null;
    this.#sendSyncState = null;
    this.isConnected = false;
    this.isHost = false;
    this.peerCount = 0;
    this.peers = [];
    this.roomCode = '';
    this.selfId = '';
    this.#peerJoinHandlers.clear();
    this.#actionHandlers.clear();
    this.#syncStateHandlers.clear();
  }
}

export const multiplayer = new MultiplayerStore();
