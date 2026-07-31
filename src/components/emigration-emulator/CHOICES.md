# Choice & Modal System

Reference for the `pendingChoice` interrupt pattern used for all interactive decisions.

## How It Works

1. Engine calls `this._setPendingChoice({ id, title, options, resolve, ... })`.
2. Engine pauses — state is snapshot'd via `createBackup()` before the choice.
3. UI detects `pendingChoice !== null` and renders `Modal.svelte` to the designated player.
4. Player (or bot) selects an option → UI calls `engine.resolveChoice(value)`.
5. The stored `resolve(value)` callback executes, resuming game logic.

**Cancel** restores the backup. **Step Back** (`onBack`) re-invokes a previous prompt.

## Key Fields

| Field | Default | Purpose |
|-------|---------|---------|
| `id` | `choice-{timestamp}` | Identifies the choice type (used by bots in `autoplay.js`) |
| `playerIdx` | `currentPlayerIdx` | Which player must respond — drives `isMyTurn` in P2P |
| `title` | — | Modal heading text |
| `options` | — | `[{ text, value, disabled? }]` |
| `cancellable` | `true` | Whether Cancel button appears |
| `onBack` | `null` | If set, adds a "← Step Back" button that re-invokes this function |
| `resolve` | — | Callback receiving the chosen `value` |

## P2P Multiplayer

- The modal is only shown to the player where `isMyTurn === true`, determined by `pendingChoice.playerIdx === myP2PPlayerIdx`.
- When a player resolves a choice, it's broadcast as `MODAL_RESOLVE` to all peers.
- Peers apply the same resolution to their local engine via `handleRemoteAction`.
- Cancel and Step Back are **not broadcast** — they only affect the local player's UI state (guarded by `isMyTurn`).

## Chaining & Multi-Player Choices

Choices are **strictly sequential** — only one `pendingChoice` exists at a time. For multi-step flows:

- A `resolve` callback can call `_setPendingChoice` again (see Social Butterfly: target → type → card).
- To redirect a decision to another player, set `playerIdx` explicitly (see Persuasion: owner decides, then actor decides).

## Reusable Helpers

- `_promptTargetPlayer(player, title, callback)` — pick an opponent (id: `select-player`)
- `_promptSelectCard(arr, title, callback)` — pick from an array of cards (id: `select-card`)

---

## Adding a New Interactive Life Card

### 1. Define the card

Add an entry to `LIFE_CARD_DEFINITIONS` in `engine.svelte.js`:

```js
{ title: "My Card", pack: "PackName", icon: "icon-name", keep: "Instant", type: "life",
  description: "What the card does." }
```

`keep` values: `"Instant"` (discard after effect), `"Must Keep"` (always kept in stash), `"May Keep"` (player chooses keep or discard).

### 2. Add the effect

Add a `case` to `_resolveLifeCardEffect()`. Always call `done()` when finished:

```js
case "My Card":
  player.money += 2;
  this.log(`P${player.id}|ACT:My Card|GAIN:2`, "action");
  this.notifyToast("money", `${player.name} gains $2`);
  done();
  break;
```

For interactive effects, use `_setPendingChoice` and call `done()` inside `resolve`:

```js
case "My Card":
  this._setPendingChoice({
    id: "my-card",
    title: "My Card: choose an option",
    options: [
      { text: "Option A", value: "a" },
      { text: "Option B", value: "b" },
    ],
    resolve: (val) => {
      // handle val...
      done();
    },
  });
  return; // important: return, not break, to avoid falling through to done()
```

### 3. If `keep: "May Keep"`

Add choice text to `_getMayKeepChoiceText()` and keep behavior to `_resolveLifeCardKeep()`.

### 4. If another player must decide

Set `playerIdx` on the choice to that player's id:

```js
this._setPendingChoice({
  id: "my-card-target-choice",
  playerIdx: target.id, // <-- this player sees the modal, not the current player
  // ...
});
```

### 5. Add bot handling

In `autoplay.js` → `resolveChoice()`, add a case for your choice `id` so bots can respond. Without this, bots will hang on the modal.

### 6. Update docs

- Add the card to `game_specification.md` under its pack.
- If it's a new pack, add the pack name to `PACKS_LIST`.

## Known Limitations

- **No value validation**: `resolveChoice` doesn't verify the value is a valid option. Invalid values from a bugged peer could cause crashes (e.g., out-of-bounds array index).
- **No sender validation in P2P**: `MODAL_RESOLVE` from any peer is accepted — there's no check that the sender is the player whose choice it is. Mitigated by UI-level guards.
- **Switch-based routing**: Life card effects live in a large `switch` in `_resolveLifeCardEffect`. Works at current scale but could be refactored to a handler registry if the card count grows significantly.
