# Emigration Game Architecture

This document provides a high-level overview of the Emigration board game emulator architecture to help AI agents and developers quickly understand the codebase.

## Core Principles

1. **Separation of Concerns:** The game logic (Engine) is 100% decoupled from the UI (Svelte).
2. **Pure State:** The engine manages a single source of truth for the game state. It has ZERO DOM dependencies.

## Key Files & Components

- **`engine.js`**: The heart of the game. Handles all state mutations, rule enforcement, phase transitions, and turn progressions.
- **`EmigrationEmulator.svelte`**: The main UI orchestrator. Mounts the engine, listens for state changes, and renders the board.
- **`autoplay.js`**: The AI logic for "Solo vs Computer" mode. It evaluates the board state and invokes the exact same engine actions that a human player would.
- **`Modal.svelte`**: Renders the UI for interactive decisions (e.g., choosing targets, keeping cards).
- **`game_specification.md`**: The authoritative rulebook for the physical board game. The emulator should completely match the logic, rules, and player objectives from the game_specification.md file in order to emulate the game using its authoritative source.

## State Management & UI Reactivity

- The engine uses a callback `onStateChange` which is fired whenever the game state updates (via `this._notify()`).
- `EmigrationEmulator.svelte` intercepts this callback to create a snapshot clone of the engine state. Svelte's reactivity engine then updates the UI based on this snapshot.

## The `pendingChoice` Pattern (Interrupts & Modals)

When an action requires a user decision (e.g., choosing a player to steal from, or deciding whether to use a Persuasion card), the engine pauses execution and sets a `pendingChoice` object.

1. The engine pauses and calls `this._setPendingChoice({ id, title, options, resolve })`.
2. The UI detects that `pendingChoice` is not null and displays a `Modal.svelte`.
3. The user makes a selection (or clicks Cancel, which rolls back the state).
4. The UI calls `engine.resolveChoice(value)`.
5. The engine executes the callback and resumes the action logic.

## Actions Flow

Players (human or AI) take their turns by executing actions through the engine:

- **Optional Actions:** Can be performed before a required action and do _not_ end the turn (e.g., `sell` a card from the stash for $2, `graduate`).
- **Required Actions:** A player must perform exactly one per turn, which immediately ends the turn (e.g., `buy` a card, `activate` a card, `discard` a card from a layout).
- **Stash vs Layout:** Cards in a player's hand are their "Stash". Cards on the board are their "Layout". You `sell` from a Stash (optional), but you `discard` from a Layout (required).
