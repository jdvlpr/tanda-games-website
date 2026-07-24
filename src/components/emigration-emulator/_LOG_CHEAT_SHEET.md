# Emigration Engine: Dense Log Cheat Sheet

This document serves as a parsing guide for the `engine.svelte.js` event logs. The game engine emits dense, pipe-delimited (`|`) strings to record game state changes with minimal token overhead.

## 1\. Syntax Anatomy

Most log entries follow this structure:
`[PREFIX] | [ACTOR] | [EVENT] | [PARAM_1] | [PARAM_2] ...`

- **Prefixes:**
  - `INIT`: Fired only during setup.
  - `T{turnNumber}`: Fired during Phase 1 (Preparation). Indicates the active game turn. Example: `T4`.
  - `PHASE2`: Fired during Phase 2 (Border Crossing). Replaces the turn number.
  - `GAME_OVER`: Final game result log.
  - `ERR`: Safety limit or invalid state warning.
- **Actor:** Usually `P{id}` (e.g., `P0` for Player 0).
- **Event/Params:** Specific action codes and key-value pairs (e.g., `COST:2`, `GAIN:3`).

---

## 2\. Initialization & Global Events

| Log Signature                                                              | Description                                      | Agent Action                                                                                                            |
| :------------------------------------------------------------------------- | :----------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------- |
| `INIT\|P{id}\|NAT:{nat}\|DEST:{dest}\|${money}\|FACEUP:[{idx}:{name},...]` | Player setup data.                               | Initialize player `id` with starting `money`, nationality `nat`, and layout containing `FACEUP` cards at exact indices. |
| `T{n}\|PAYDAY\|SALARIES:[{s0},{s1},...]`                                   | Global payday event.                             | Iterate over all players (0 to N). Add `sX` to Player X's money.                                                        |
| `{PREFIX}\|P{id}\|ACT:{cardName}\|DELTA:[{d0},{d1},...]`                   | Global life card effect (e.g., Pandemic, Share). | Apply the integer `dX` to Player X's money. Positive is a gain, negative is a loss.                                     |
| `ALL_FORFEIT\|GAIN:1`                                                      | Gridlock resolution.                             | Add +$1 to all players.                                                                                                 |
| `GAME_OVER\|{message}`                                                     | Game conclusion.                                 | Terminate parsing; extract winner/result from `message`.                                                                |

---

## 3\. Core Actions (Optional & Required)

| Log Signature                                                 | Description                                                                                                         |
| :------------------------------------------------------------ | :------------------------------------------------------------------------------------------------------------------ |
| `P{id}\|GRAD\|ROLL:{r}\|RES:PASS\|SALARY_INC:{amt}`           | Passed College Graduation. Player is no longer in college. Base salary increases by `amt`.                          |
| `P{id}\|GRAD\|ROLL:{r}\|RES:FAIL`                             | Failed Graduation. Remains in college.                                                                              |
| `P{id}\|COLLEGE_APP\|ROLL:{r}\|TUITION:{t}\|RES:PASS`         | Passed College Application. Deduct `t` money. Player is now in college.                                             |
| `P{id}\|COLLEGE_APP\|ROLL:{r}\|TUITION:{t}\|RES:FAIL`         | Failed Application (cannot afford). Deduct $1 penalty.                                                              |
| `P{id}\|BUY:{cardName}\|FROM:P{ownerId}\|COST:{c}`            | Bought a Layout Card. Deduct `c` from `P{id}`. Add card to `P{id}`'s stash.                                         |
| `P{id}\|BUY_POOL:{Ticket/Passport}\|COST:2`                   | Bought from public pool. Deduct $2. Add doc to stash. Pool count -1.                                                |
| `P{id}\|STEAL:{Ticket/Passport}\|SKIP_NEXT`                   | Stole from pool. Add doc to stash. Flag `P{id}` to skip their next turn. Pool count -1.                             |
| `P{id}\|RECLAIM:{Ticket/Passport}\|FROM:P{ownerId}\|COST:{c}` | Stole from opponent stash. Deduct `c` from `P{id}`. Add `c` to `P{ownerId}`. Move doc from `P{ownerId}` to `P{id}`. |
| `P{id}\|DISC:{cardName}\|FROM:P{ownerId}\|GAIN:2`             | Discarded opponent layout card. `P{id}` gains $2. Card goes to discard pile.                                        |
| `P{id}\|SELL:{cardName}\|GAIN:2`                              | Sold a card from own stash. `P{id}` gains $2.                                                                       |

---

## 4\. Mechanics, Triggers, & Intercepts

| Log Signature                                       | Description                                                                                                                        |
| :-------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------- |
| `P{id}\|PAY_FEE:{fee}\|TO:P{ownerId}`               | `P{id}` pays Access Fee. Deduct `fee` from `P{id}`, add `fee` to `P{ownerId}`. Increase `P{id}`'s Access Fee tracker by 1 (max 5). |
| `P{id}\|REV\|S{idx}:{cardName}`                     | Face-down card uncovered. Mark Layout slot `idx` as Face-Up for `P{id}`.                                                           |
| `P{id}\|TICKET_PASSPORT_BONUS\|GAIN:1A` / `LOSS:1A` | Acquired or lost the matching set bonus. Adjust Assurance (`A`) by 1.                                                              |
| `P{id}\|FORFEIT\|CONS:{count}`                      | Player had no valid moves.                                                                                                         |
| `P{id}\|SKIP_TURN`                                  | Player skipped turn due to previous penalty.                                                                                       |

---

## 5\. Life Card Activations & Passives

Life cards use `ACT` when triggered for an immediate effect, and `KEEP` when stored in the stash. Passives trigger dynamically in response to other events.

### General Patterns

- **Activating an Instant:** `P{id}\|ACT:{cardName}\|[EFFECTS]`
- **Choosing to Keep:** `P{id}\|KEEP:{cardName}`
- **Interceptions:**
  - `P{id}\|KEEP_CALM_USED\|DISC:{cardName}`
  - `P{id}\|PERSUASION_ACC\|FROM:P{ownerId}`
  - `P{id}\|PERSUASION_DECLINED\|FEE:{f}`

### Common Instant Effect Flags

- `GAIN:{amt}` / `LOSS:{amt}` : Money changes.
- `GAIN_A:{amt}` : Assurance change.
- `TAKE:DOC:{name}\|FROM:P{ownerId}` : Stolen document.
- `TAKE:CONN:{name}\|FROM:P{ownerId}` : Stolen connection.
- `TAKE:MONEY:{amt}\|FROM:P{ownerId}` : Stolen money.
- `SWAP_DEST:P{targetId}` : Traded destination cards.
- `DISC_LAYOUT:{name}\|FROM:P{ownerId}` : Targeted layout destruction.
- `DISC_STASH:{name}\|FROM:P{ownerId}` : Targeted stash destruction.
- `FEE_INC:1` / `FEE_DEC:1` : Access Fee modified.

### Passive Triggers (From Stash)

- **Salvage:** `P{id}\|SALVAGE\|GAIN:1`
- **Blacklisted:** `P{id}\|BLACKLISTED\|LOSS:1`
- **Penalty:** `P{id}\|PASS_PENALTY\|TO:P{targetId}`
- **Star Power:** `P{id}\|STAR_POWER\|GAIN:1\|PASS_TO:P{targetId}`
- **Underdog:** `P{id}\|UNDERDOG\|LOSS:1\|PASS_TO:P{targetId}`
- **Frontrunner:** `P{id}\|FRONTRUNNER_ADD:1\|TOTAL:{tot}` & `P{id}\|FRONTRUNNER_PASS\|TO:P{targetId}`

---

## 6\. Phase 2 (Border Crossing)

| Log Signature                                          | Description                                                                                                                                                                                                                                |
| :----------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `PHASE2_START`                                         | Phase 1 ends. Game transitions to evaluation.                                                                                                                                                                                              |
| `PHASE2\|P{id}\|TRADE\|[TRADES]\|TOTAL_A:{a}`          | Shows resources converted to Assurance (`A`).<br>`${m}:+{mA}A` = Spent `$m` for `mA` Assurance.<br>`{d}D:+{dA}A` = Spent `d` Documents for `dA` Assurance.<br>`PEN_C:-{cA}A` = Assessed penalty of `cA` Assurance for lacking Connections. |
| `PHASE2\|P{id}\|SELECT_LANE:{name}\|TKN:{val}`         | Player selects a lane and reveals a token value.                                                                                                                                                                                           |
| `PHASE2\|P{id}\|CROSS:FAIL_MISSING_DOCS`               | Player auto-failed due to missing Ticket/Passport.                                                                                                                                                                                         |
| `PHASE2\|P{id}\|CROSS:FAIL_LOW_A`                      | Player Assurance is lower than Token value (`TKN`).                                                                                                                                                                                        |
| `PHASE2\|P{id}\|CROSS:PASS\|PAID_A:{val}\|REM_A:{rem}` | Player won. Assurance is equal or higher than Token. Deduct `val` from Assurance.                                                                                                                                                          |

## 7\. Short Codes Reference Dictionary

- **`A`** = Assurance
- **`D`** = Documents
- **`C`** = Connections
- **`TKN`** = Token Value (Security Lane)
- **`REV`** = Reveal (Flip face down card up)
- **`DISC`** = Discard
- **`CONS`** = Consecutive
- **`NAT`** / **`DEST`** = Nationality / Destination
