# Emigration Game Architecture

This document provides a high-level overview of the Emigration board game emulator architecture to help AI agents and developers quickly understand the codebase.

## Core Principles

1. **Separation of Concerns:** The game logic (Engine) is 100% decoupled from the UI (Svelte).
2. **Pure State:** The engine manages a single source of truth for the game state. It has ZERO DOM dependencies.

## Key Files & Components

- **`src/components/emigration-emulator/game_specification.md`**: The authoritative rulebook for the physical board game. The emulator should completely match the logic, rules, and player objectives from the game_specification.md file in order to emulate the game using its authoritative source.
- **`src/components/emigration-emulator/engine.svelte.js`**: The heart of the game. Handles all state mutations, rule enforcement, phase transitions, and turn progressions.
- **`src/components/emigration-emulator/EmigrationEmulator.svelte`**: The main UI orchestrator. Mounts the engine, listens for state changes, and renders the board.
- **`src/components/emigration-emulator/autoplay.js`**: The AI logic for "Solo vs Computer" mode. It evaluates the board state and invokes the exact same engine actions that a human player would.
- **`src/components/emigration-emulator/Modal.svelte`**: Renders the UI for interactive decisions (e.g., choosing targets, keeping cards).

## State Management & UI Reactivity

- The engine uses a callback `onStateChange` which is fired whenever the game state updates (via `this._notify()`).
- `src/components/emigration-emulator/EmigrationEmulator.svelte` intercepts this callback to create a snapshot clone of the engine state. Svelte's reactivity engine then updates the UI based on this snapshot.

## The `pendingChoice` Pattern (Interrupts & Modals)

When an action requires a user decision (e.g., choosing a player to steal from, or deciding whether to use a Persuasion card), the engine pauses execution and sets a `pendingChoice` object.

1. The engine pauses and calls `this._setPendingChoice({ id, playerIdx, title, options, resolve })` (where `playerIdx` identifies which player must respond, defaulting to `currentPlayerIdx`).
2. The UI detects that `pendingChoice` is not null and displays a `Modal.svelte` to the designated player.
3. The user makes a selection (or clicks Cancel, which rolls back the state).
4. The UI calls `engine.resolveChoice(value)`.
5. The engine executes the callback and resumes the action logic.

> **See also:** [`src/components/emigration-emulator/CHOICES.md`](src/components/emigration-emulator/CHOICES.md) for a full reference on the choice system, P2P behaviour, and a step-by-step guide to adding new interactive life cards.

## Actions Flow

Players (human or AI) take their turns by executing actions through the engine:

- **Optional Actions:** Can be performed before a required action and do _not_ end the turn (e.g., `sell` a card from the stash for $2).
- **Required Actions:** A player must perform exactly one per turn, which immediately ends the turn (e.g., `buy` a card [Documents and Connections cost base $4, reduced by $1 per card of that type in stash], `activate` a card [activating Payday awards full salary to the activator and a $1 stipend to non-activators], `discard` a card from a layout). If a player **cannot** perform any Required Action, they **forfeit** their turn and take **$1 from the bank**.
- **Stash vs Layout:** Cards in a player's hand are their "Stash". Cards on the board are their "Layout". You `sell` from a Stash (optional), but you `discard` from a Layout (required).

## Layout Structure (DAG)

- The starting layout is a 14-card directed acyclic graph (DAG) arranged in 4 overlapping rows.
- Cards in Row 1 and Row 3 start face-down. Cards in Row 2 and Row 4 start face-up.
- A card is "covered" if any card in a higher row overlaps it. The engine tracks this using `isCardCovered()`. A card cannot be targeted by an action if it is covered.
- When an action removes a card from the layout (e.g. `buy`, `discard`), the `uncoverLayout()` method is called, which flips any newly uncovered face-down cards to face-up.

## Real-Time Assurance Track & Immediate Set Trade-Ins

- Players track their score on an **Assurance Track** starting at 0.
- When a player acquires enough Documents or Connections in Phase 1 to fulfill their Destination set requirement, those cards are **immediately traded in** (discarded to `discardPile`) and the Assurance reward is added directly to `player.assurance`.

## Phases

- **Phase 1 (Preparation):** Players take turns acquiring resources, documents, and connections to prepare for the border crossing.
- **Phase 2 (Crossing):** Triggers instantly when the center pool of tickets/passports is completely empty AND no face-up cards remain in any layout.
- In Phase 2, players sequentially pick a security lane. Their `assurance` is calculated (trading at most 1 set per resource type for rewards), and they cross if `assurance >= token value`.

## CLI Simulation Tool

**Entry point:** `cli/simulate.js`

Run with Node directly — no build step required:

```bash
node cli/simulate.js [options]
```

| Flag | Default | Description |
|------|---------|-------------|
| `--games N` / `-g N` | `100` | Number of games to simulate |
| `--players N` / `-p N` | `4` | Players per game |
| `--personas a,b,...` | _(random)_ | Fix a comma-separated persona per player seat (e.g. `expert,rusher,hoarder,expert`) |
| `--packs a,b,...` | _(random)_ | Fix which life card packs are in play each game |
| `--output file.json` / `-o` | _(none)_ | Export full metrics JSON |
| `--verbose` / `-v` | `false` | Log every engine action to stdout |

**Output metrics** (console + optional JSON):
- Win rate by persona
- Average turns per game
- Winner life card played frequency (and win rate when played)
- Wins by pack (pack utilization by winner)
- Win rate by turn order and resource economy
- Per-game winner snapshots (persona, assurance, money, docs, connections, life cards played, turn count)

**Performance:** ~6–10 ms per game after JIT warm-up. 1,000 games completes in ~27 s on a modern Mac.

> **Note:** `createBackup()` in the engine excludes the `logs` array from serialisation (storing only the log length). This is intentional — it keeps the backup payload small and was the key optimisation that made the CLI fast. Do not add `logs` back to the backup without benchmarking first.

---

## Bot Personas

All heuristic personas live in `src/components/emigration-emulator/autoplay.js` inside `_getBestHeuristicAction()` and `resolveChoice()`. Each persona is a scoring modifier on top of the shared move-evaluation framework — they all see the same candidate moves but weight them and resolve interactive choices differently based on playstyle.

The **pool of heuristic personas** used in CLI random simulation is defined in `autoplay.js` and imported into `simulate.js`:
```js
export const BOT_PERSONAS = ['expert', 'rusher', 'hoarder', 'saboteur', 'conservative', 'scholar', 'easy'];
```

### Shared Heuristic Improvements
- **Destination Target Capping:** Stops boosting document/connection acquisition once the destination's single-set requirement is met (since max 1 set per resource awards Assurance). Redundant card purchases are penalized.
- **Access Fee Cost Valuation:** Correctly treats Access Fee as a cost penalty on the acting player. Taking from opponent layouts increases own Access Fee ($1 → $5), making future opponent-layout purchases more expensive.
- **Dynamic Life Card Evaluation:** Evaluates Life Card utility dynamically (`_evaluateLifeCardUtility`) and resolves choices (`may-keep-choice`, `select-player`) based on persona preferences and current resource needs.

### `expert` (Min-Maxer / Optimal Heuristic Leader)
The optimized reference persona designed for peak performance across all player counts (2–6 players).
- **Priority Set Fulfillment:** Prioritizes clearing `minRequired` thresholds for Documents and Connections to eliminate catastrophic -3 Assurance penalties, and completes set thresholds (`setSize`) to capture maximum Assurance rewards (+2 for docs, +4 to +6 for conns). Penalizes redundant purchases once sets are capped.
- **Travel Document Locking:** Immediately acquires Ticket and Passport once 1 Connection and 1 Document are secured, locking in the one-time Ticket+Passport Assurance bonus (+2 to +6 Assurance) and guaranteeing border crossing capability.
- **Payday Asymmetry:** Avoids activating Payday at base salary ($1) when it would be a poor relative trade, while still preferring own-layout activations that avoid fee costs.
- **Layout & Disruption Efficiency:** Heavily prefers own-layout purchases ($0 access fee) and opportunistically buys or discards from opponent layouts to deny opponents single-set completion rewards.

### `rusher` (High Roller)
Prioritises getting ticket + passport as quickly as possible to trigger Phase 2 early, before opponents are ready.
- Doubles the `buyPool` urgency score (`40` vs `20` base), acquiring travel docs at high speed.
- **Resource Safety Gate:** Tempers pool urgency if holding 0 documents and 0 connections early in the game, ensuring it acquires at least 1 baseline set card so it can pass security lane checks.

### `hoarder` (Gatekeeper / Resource Accumulator)
Focuses on accumulating resources, passive income, and denying travel docs.
- **Payday:** Multiplies relative-advantage score by `6` (vs `3`).
- **Buy:** Multiplies assurance-gain reward by `10` (vs `5`) and liquidity penalty by `1.5` (vs `0.5`).
- Opportunistically buys extra tickets/passports from the pool to deny opponents and earn reclaim fees ($2 + \text{opponent Access Fee}$).
- Prefers keeping passive income Life Cards (*Insider*, *Salvage*).
- **Strict Capping Penalty:** Penalizes redundant document/connection buys once destination single-set requirements are capped to hoard raw cash for Phase 2 trading.

### `saboteur` (Aggressive Disruptor)
Focuses on disrupting opponents rather than pure self-optimization.
- Adds `+20` flat score to all steal moves.
- Target-aware set denial: discards cards from opponent layouts that would complete an opponent's set requirement ($3\times$ bonus).
- In interactive Life Card choices (e.g. *Social Butterfly*, *Lost & Found*), aggressively steals from the opponent with the highest resources to deny their set.
- **Self-Advancement Check:** Reduces disruption bonus if holding 0 documents and 0 connections, ensuring it establishes a minimal set before engaging in pure sabotage.

### `conservative` (Risk-Averse Saver)
Risk-averse and self-contained — avoids hostile actions and preserves cash.
- **Never steals** (returns `-100`).
- **Never discards from an opponent's layout** (returns `-100`).
- **Selective Opponent Payday:** Prefers own layout Payday, but will activate opponent layout Payday if net cash yield after access fee is high ($\ge \$4$).
- Preserves cash and avoids expensive opponent-layout actions when reserves are low.
- In interactive choices, prefers taking bank cash options over taking from opponents.

### `scholar` (Career Engine Builder)
Dedicated career engine persona.
- Focuses on strong early setup and efficient Payday timing.
- Prefers keeping Payday boosters like *Insider*.

### `easy` / `random`
Non-heuristic personas — pick randomly from available valid moves for baseline stress-testing.

### `normal`
Intermediate difficulty fallback with a 30% chance of choosing randomly. Used in interactive solo mode.

---

### Adding a New Persona

1. Add the name to `BOT_PERSONAS` in `src/components/emigration-emulator/autoplay.js`.
2. Add persona flags inside `_getBestHeuristicAction()` and `resolveChoice()` in `autoplay.js`.
3. Adjust score multipliers or add early-returns (`return -100`) for move types the persona should avoid.
4. Document it in the section above.

