# Emigration — Complete Game Specification & Reference Manual

This document serves as the absolute, standalone source of truth for the board game **Emigration**. It is structured for easy ingestion by both human designers and AI agents to facilitate game development, rules validation, and emulation.

---

## 1. Game Overview & Core Objective

**Emigration** is a game about preparing to move abroad. Players must acquire funds, secure vital documents, build local connections, and purchase tickets and passports. All of this culminates at the border control checkpoints, where players select security lanes to cross into their new homes.

- **Competitive Mode**: Players compete to emigrate successfully. The winner is the player who crosses the border and has the most remaining **Assurance** (tie broken by Money, then by the order in which they crossed). If no one crosses, the player with the most Money wins.
- **Cooperative Mode**: Players win or lose as a team. Every single player must successfully cross the border. If even one player fails to cross, the entire team loses.

---

## 2. Components & Setup Specifications

### 2.1 Player Count & Card Pool Scaling

The quantities of cards mixed into the active layout deck scale dynamically with the player count:

| Players | Documents / Connections (Each) | Life Card Packs (Sets of 4) | Paydays | Total Deck Size |
| :-----: | :----------------------------: | :-------------------------: | :-----: | :-------------: |
|  **2**  |             7 each             |      2 packs (8 cards)      |    8    |    30 cards     |
|  **3**  |            10 each             |     3 packs (12 cards)      |   12    |    44 cards     |
|  **4**  |            13 each             |     4 packs (16 cards)      |   16    |    58 cards     |
|  **5**  |            16 each             |     5 packs (20 cards)      |   20    |    72 cards     |
|  **6**  |            19 each             |     6 packs (24 cards)      |   24    |    86 cards     |

### 2.2 Standard Setup Procedure

1. **Security Lanes**: Arrange the 5 Security Lane cards side-by-side. Place their matching face-down Assurance tokens underneath them.
2. **Public Services**: Place a pool of Tickets and Passports in the center of the table. The quantity of each card is equal to the number of players.
3. **Player Setup**: Each player randomly receives:
   - 1 **Nationality Card** (starts with the number of Money tokens indicated by the Starting Fund).
   - 1 **Career Card** (starts at $1 salary).
   - 1 **Destination Card** (if matching the player's Nationality card, redraw).
   - 1 **Access Fee Card** (starts at $1, hiding the higher fees, with a maximum Access Fee of $5).
4. **Layout Setup**:
   - Combine the scaled quantities of Documents, Connections, Paydays, and Life Cards into a single deck and shuffle.
   - Draw 2 random cards from the deck and remove them from the game face-down (without looking).
   - Deal 14 cards to each player. Players arrange these in their personal **Layout** (see Section 2.3).

### 2.3 Layout Structure

Each player's personal play area has two zones: the **Layout** (dealt cards in a grid) and the **Stash** (acquired cards).

#### Layout Grid

The 14 dealt cards are arranged in 4 rows, alternating between 4-card and 3-card rows:

```
Row 1:   [DOWN]  [DOWN]  [DOWN]  [DOWN]      ← 4 cards, face-down
Row 2:     [ UP ]  [ UP ]  [ UP ]             ← 3 cards, face-up, staggered
Row 3:   [DOWN]  [DOWN]  [DOWN]  [DOWN]      ← 4 cards, face-down
Row 4:     [ UP ]  [ UP ]  [ UP ]             ← 3 cards, face-up, staggered
```

Row 1 is furthest from the player; Row 4 is closest. The 3-card rows are offset horizontally so each card sits between two cards of the adjacent 4-card row, like a pyramid. Each card in a 3-card row **partially covers 2 cards** in the 4-card row directly behind it. Row 3 also slightly overlaps Row 2 from below, covering it.

#### Availability & Uncovering

A card is **available** only if it is **face-up and not covered** by any other card.

At setup, only the **3 Row 4 cards** are available. All other cards are either face-down, covered, or both.

When a card is removed from the layout, the cards it was covering may become uncovered. A card is uncovered only when **all** cards overlapping it have been removed. If a newly uncovered card is face-down, flip it face-up — it is now available.

#### Stash

Adjacent to each player's layout grid, there is a **Stash** area — open space where the player places cards they have acquired (purchased Documents, Connections, Tickets, Passports, and keepable Life Cards). The Stash is organized so that card types are visible to all players. Tickets and Passports in a player's Stash can be targeted by the **Reclaim** action (see Section 4.2).

#### Access Fee Card & Nationality Card

Below/beside the layout, each player also has:

- Their **Nationality Card** (visible to all players, showing nationality and starting funds).
- Their **Access Fee Card**, which is a sliding card that reveals increasing fee values (1 through $5). The card is positioned so that only the current fee is visible. When a player's Access Fee increases, they slide the card to reveal the next higher number.

#### Career Card

Each player starts with a base salary of **$1**.

- Salary remains **$1** for the entire game.

---

## 3. Data Tables

### 3.1 Nationalities

Nationality cards dictate the starting fund.

| Nationality | Starting Fund |
| :---------- | :-----------: |
| Bosnian     |      $2       |
| Congolese   |      $2       |
| Senegalese  |      $2       |
| Swiss       |      $6       |
| French      |      $6       |
| Russian     |      $6       |
| English     |      $10      |
| Chinese     |      $10      |
| American    |      $10      |

### 3.2 Destinations & Assurance Track

Players track their Assurance in real-time on an **Assurance Track** starting at 0. As soon as a player acquires enough Documents or Connections in Phase 1 to meet their Destination's set requirement (`setSize`), those cards are **immediately traded in** (discarded to the discard pile) and the Assurance reward is added directly to their position on the Assurance Track.

Each Destination card outlines the specific requirements to earn or lose Assurance during Phase 2 (Crossing the Border). Players can earn a single Assurance reward per resource type by meeting or exceeding the set threshold (maximum 1 set per resource). Penalties for failing to meet minimum requirements apply only once.

- **Format**: `≥ [X]` &rarr; `Assurance Reward`
- **Format**: `< [Minimum Required]` &rarr; `Assurance Penalty`

| Destination                      | Money                                 | Documents                            | Connections       |
| :------------------------------- | :------------------------------------ | :----------------------------------- | :---------------- |
| **Bosnia and Herzegovina**       | ≥ 7 &rarr; +2 < 3 &rarr; -1           | ≥ 4 &rarr; +2 < 3 &rarr; -3          | ≥ 3 &rarr; +6     |
| **China**                        | ≥ 10 &rarr; +3 < 4 &rarr; -2          | ≥ 4 &rarr; +2 < 2 &rarr; -3          | ≥ 4 &rarr; +5     |
| **Democratic Republic of Congo** | ≥ 7 &rarr; +2 < 2 &rarr; -2           | ≥ 4 &rarr; +2 < 3 &rarr; -3          | ≥ 3 &rarr; +6     |
| **France**                       | ≥ 8 &rarr; +2 < 3 &rarr; -1           | ≥ 4 &rarr; +2 < 2 &rarr; -3          | ≥ 3 &rarr; +4     |
| **Russia**                       | ≥ 7 &rarr; +2 < 2 &rarr; -1           | ≥ 4 &rarr; +2 < 2 &rarr; -3          | ≥ 3 &rarr; +4     |
| **Senegal**                      | ≥ 7 &rarr; +2                         | ≥ 4 &rarr; +2 < 3 &rarr; -3          | ≥ 3 &rarr; +5     |
| **Switzerland**                  | ≥ 7 &rarr; +2 < 2 &rarr; -1          | ≥ 4 &rarr; +2 < 2 &rarr; -3          | ≥ 3 &rarr; +4     |
| **England**                      | ≥ 10 &rarr; +3 < 4 &rarr; -2          | ≥ 4 &rarr; +2 < 2 &rarr; -3          | ≥ 3 &rarr; +4     |
| **United States of America**     | ≥ 10 &rarr; +3 < 5 &rarr; -2          | ≥ 4 &rarr; +2 < 2 &rarr; -3          | ≥ 4 &rarr; +5     |

### 3.3 Security Lanes

Security Lanes have 3 tokens stacked face-down. The tokens in each lane's pool are shuffled during setup, so players do not know their order. When a player selects a lane, the top token is revealed:

|    Lane    | Tokens Pool (Shuffled & Stacked Face-down) |
| :--------: | :----------------------------------------- |
| **Lane 1** | [6, 7, 7]                                  |
| **Lane 2** | [6, 7, 8]                                  |
| **Lane 3** | [5, 8, 8]                                  |
| **Lane 4** | [4, 8, 9]                                  |
| **Lane 5** | [3, 9, 11]                                 |

### 3.4 Documents & Connections Catalogue

All standard Documents and Connections cost $4 base price (each Document or Connection in a player's Stash reduces the cost of buying subsequent cards of that type by $1, down to a minimum of $0):

| Documents (Cost)                      | Icon               | Connections (Cost)                           | Icon               |
| :------------------------------------ | :----------------- | :------------------------------------------- | :----------------- |
| Write Last Will and Testament    | `tombstone`        | Coffee with Airport Employee            | `coffee-mug`       |
| Certificate of Excellence        | `diploma`          | Cookies for Neighbor from Destination   | `cookie`           |
| Checklist                        | `checklist`        | Video Chat with Person from Destination | `video-conference` |
| Copy of Birth Certificate        | `stork-delivery`   | Support Group Motivates You             | `cherish`          |
| Notebook                         | `notebook`         | Learn Song from Your Destination        | `banjo`            |
| Subscribe to Travel Updates      | `rss`              | Listen to the News                      | `newspaper`        |
| Travel Brochure                  | `open-book`        | Friend moves to your Destination        | `hiking`           |
| Physical Exam                    | `stethoscope`      | Language Classes                        | `conversation`     |
| Vaccination Record               | `miracle-medecine` | Network Fair                            | `mesh-network`     |
| Personality Test                 | `skills`           | Dinner with a Diplomat                  | `hot-meal`         |
| Travel Wallet                    | `wallet`           | Become World Famous                     | `mona-lisa`        |
| Attend Security Training         | `padlock`          | Learn from an Elder                     | `wisdom`           |
| Residence Address in Destination | `treasure-map`     | Excellent Teamwork                      | `team-idea`        |
| Letter of Recommendation         | `thumb-up`         | Endorsement from Royalty                | `coronation`       |
| Letter of Invitation             | `envelope`         | Enter Luxury Travel Club                | `winged-scepter`   |
| Background Check                 | `sherlock-holmes`  | Internship in Your Destination          | `light-backpack`   |
| Employment Contract              | `journey`          | Get Engaged to a Native                 | `engagement-ring`  |
| International Driving Permit     | `steering-wheel`   | Politician Approves You                 | `public-speaker`   |
| Vehicle Registration Papers      | `race-car`         | Attend History Class                    | `read`             |
| Pet Passport                     | `labrador-head`    | Travel Concierge                        | `top-hat`          |
| Language Phrasebook              | `book-cover`       | Favorable Cultural Opinion              | `vote`             |

---

## 4. Phase 1: Preparation Mechanics & Actions

### 4.1 Card Availability, Revealing Cards & Access Fees

#### Available Cards

On your turn, you may only take an **available** card. A card is considered available if it meets one of the following criteria:

1. It is a **completely uncovered, face-up card** in any player's Layout (your own or an opponent's).
2. It is a card in the **Public Services pool** (Tickets and Passports in the center of the table).
3. It is an **extra Ticket or Passport** in another player's Stash — but only if that player has more than one of that card type (i.e., it must not be the player's only Ticket or only Passport in the Stash).

All other cards (face-down cards, cards covered by other cards, a player's sole Ticket/Passport in Stash) are **not available**.

#### Revealing Cards

After any action that removes a card from a Layout (buying, activating, discarding, etc.), one or more previously covered cards may become uncovered (see the overlap model in Section 2.3). When this happens:

1. **Finish resolving the current action completely** before revealing any cards.
2. Flip each newly uncovered face-down card **face-up**.
3. It immediately becomes an **available card**.

#### Access Fees

- Taking a card from **your own** Layout costs **no Access Fee**.
- Taking an available card from **another player's** Layout requires paying **that player** your current Access Fee (starts at $1).
- After paying an Access Fee to an opponent, **slide your own Access Fee card to the left**, revealing your new increased Access Fee. The Access Fee increments by $1 each time, up to a **maximum of $5**.
- You **must be able to afford** the Access Fee before taking the card. The total cost is the card's purchase price (paid to the bank) **plus** the Access Fee (paid to the opponent).
- You do **not** pay an Access Fee for taking a card from the Public Services pool or for taking a card from your own Layout.

### 4.2 Turn Structure

On their turn, a player may perform **any number of Optional Actions BEFORE** resolving exactly **one Required Action**.

#### Exceptions / Forfeit Rule

- If a player **cannot perform any** of the Required Actions, they **forfeit** their turn and take **$1 from the bank**.
- A player might be able to do an Optional Action and still not be able to do a Required Action — the turn is still forfeited (and they still gain $1).
- If a player **can** do a Required Action, they **must** do one.

#### Optional Actions (Zero or More, BEFORE the Required Action):

1. **Sell**: Remove a Document or Connection from your own Stash and place it into the discard pile to collect $3 from the bank (in a 2 or 3 player game) or $2 from the bank (in a 4+ player game). You may not Sell a card from another player's Stash, only your own. You may not Sell a Ticket, Passport, or Life card from your Stash, only a Document or Connection.

#### Required Actions (Must Choose Exactly One):

1. **Activate**: Remove a Payday or Life Card from any player's Layout (must be an available card).
   - **Payday**: The player who activated the Payday collects their full current salary from the bank (salary starts at $1). The players to their immediate left and right receive a flat stipend of $1 from the bank. Put the Payday card in the discard pile.
   - **Life Card**: Resolve its immediate text or place it in the players Stash if it says to keep the card.
2. **Buy card**:
   - **Document**: Base cost $4, minus $1 for each Document already in your Stash (minimum $0), plus any Life Card discounts/penalties and opponent Access Fee. Place it in your Stash.
   - **Connection**: Base cost $4, minus $1 for each Connection already in your Stash (minimum $0), plus any Life Card discounts/penalties and opponent Access Fee. Place it in your Stash.
   - **Ticket**: Costs $2. Must have at least 1 Connection in your stash.
   - **Passport**: Costs $2. Must have at least 1 Document in your stash.
   - _Bonus_: If a player has at least one Ticket and one Passport in their stash, they immediately gain 2 Assurance (for a 2 or 3 player game) or 1 Assurance (for a 4+ player game).
3. **Steal** (marked with a skip-turn icon): Take a Ticket (requires at least 1 Connection in your Stash) or Passport (requires at least 1 Document in your Stash) from the Public Services pool **for free**. You **skip your next turn** as a penalty.
4. **Reclaim**: Take a Ticket or Passport from another player's Stash (only if they have more than one of that type). Instead of paying the bank, pay **the opponent** $2 plus your Access Fee.
5. **Discard**: Place a Document or Connection into the Discard Pile and collect $3 from the bank (in a 2 or 3 player game) or $2 from the bank (in a 4+ player game). This can target a card from your own own Layout (no Access Fee), or an opponent's Layout (pay your Access Fee to the opponent). You may not discard Paydays or Life Cards, only Documents or Connections.

### 4.3 End of Phase 1
Phase 1 ends when there are no more face-up cards left in any player's layout. Play continues into Phase 2 from the last player to take a turn in Phase 1. 
---

## 5. Life Card Reference Catalogue

Life Cards have three keep types:

- **Instant**: Resolve the effect immediately, then discard the card.
- **May Keep**: The player chooses between an immediate effect OR keeping the card for an ongoing effect.
- **Must Keep**: The card is always kept in the player's Stash. Its immediate effect (if any) resolves, and its ongoing effect persists.

| Pack             | Card Title                   | Icon               |   Type    | Gameplay Effect                                                                                                                                                                      |
| :--------------- | :--------------------------- | :----------------- | :-------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Friendship**   | Stellar Reputation           | `star-struck`      | May Keep  | Gain $3, or keep this card in your stash and all Connections cost $1 less.                                                                                                           |
| **Friendship**   | Rummage Sale                 | `bunny-slippers`   |  Instant  | Gain $3, or take 1 discarded Document.                                                                                                                                               |
| **Friendship**   | Island Paradise              | `island`           |  Instant  | Gain $1 and player(s) with the fewest Documents gain $1.                                                                                                                             |
| **Friendship**   | Swap Wallets                 | `cash`             |  Instant  | You may trade all your Money for another player's Money.                                                                                                                             |
| **High Society** | VIP                          | `laurel-crown`     |  Instant  | Gain $1 for every $2 held by the player with the most Money.                                                                                                                         |
| **High Society** | Fancy Clothes                | `tie`              | May Keep  | Gain $3, or keep this card in your stash and all Documents cost $1 less.                                                                                                             |
| **High Society** | Social Butterfly             | `butterfly`        |  Instant  | Take 1 Connection or $3 from another player.                                                                                                                                         |
| **High Society** | Identical Twin               | `duality`          |  Instant  | Gain $1 and take another turn.                                                                                                                                                       |
| **Downtown**     | Reward                       | `trophy`           |  Instant  | Gain $1 and take $1 from every other player.                                                                                                                                         |
| **Downtown**     | Suspect                      | `crime-scene-tape` |  Instant  | Lose $1 and lose 1 Connection or 1 Document.                                                                                                                                         |
| **Downtown**     | Salvage                      | `ancient-ruins`    | Must Keep | Gain $1. Keep this card in your stash and whenever another player discards a Document gain $1.                                                                        |
| **Downtown**     | Blacklisted                  | `spy`              | Must Keep | Lose $1. Keep this card in your stash and if you discard a Connection, lose $1.                                                                                          |
| **Emergency**    | Trousers Fall Down           | `trousers`         |  Instant  | Lose $3 or lose 1 Document.                                                                                                                                                          |
| **Emergency**    | Keep Calm                    | `cement-shoes`     | Must Keep | Gain $1 and keep this card in your stash. You may discard a Life Card instead of taking it, then discard this card.                                                                  |
| **Emergency**    | Life Coach                   | `medallist`        |  Instant  | Take 1 Assurance.                                                                                                                                                                    |
| **Emergency**    | Shredder Accident            | `trash-can`        |  Instant  | Lose 1 Document. If you have none, lose $1.                                                                                                                                          |
| **Vacation**     | Camping                      | `camping-tent`     |  Instant  | Gain $1 and player(s) with the fewest Connections gain $1.                                                                                                                           |
| **Vacation**     | FOMO                         | `card-exchange`    |  Instant  | Lose $1 and you may trade Destinations with someone.                                                                                                                                 |
| **Vacation**     | Nostalgia                    | `backward-time`    |  Instant  | Replay any discarded Life Card or gain $2.                                                                                                                                           |
| **Vacation**     | Lost & Found                 | `backpack`         |  Instant  | Take 1 Document or $2 from another player.                                                                                                                                           |
| **News**         | Pandemic / Economic Stimulus | `parmecia`         |  Instant  | 1st: Everyone loses a random amount of Money. 2nd: Everyone gains a random amount of Money.                                                                                          |
| **News**         | Mental Fog                   | `dread`            |  Instant  | Lose $1 and you may discard an available Life Card from any player’s Layout or from any player's Stash.                                                                                                           |
| **News**         | Insider                      | `read`             | May Keep  | Gain $3 or keep this card in your stash, all documents cost +$1, and on Paydays gain $1.                                                                                             |
| **Charity**      | Philanthropy                 | `wallet`           |  Instant  | Lose $1 and starting with the player to your left, give $1 to every other player.                                                                                                    |
| **Charity**      | Bailout                      | `receive-money`    |  Instant  | Gain $1 and gain $1 for player(s) with the least Money.                                                                                                                              |
| **Charity**      | Share                        | `present`          |  Instant  | Distribute half your Money (round down) to other players.                                                                                                                            |
| **Charity**      | Pay Cut                      | `smash-arrows`     | Must Keep | Lose $1. Keep this card in your stash and on Paydays lose $1.                                                                                                                        |
| **Trade**        | Productivity                 | `factory-arm`      |  Instant  | Gain $1 and decrease your Access Fee by 1 (minimum 0).                                                                                                                               |
| **Trade**        | Tariffs                      | `bank`             |  Instant  | Lose $1 and increase your Access Fee by 1 (maximum 5).                                                                                                                               |
| **Trade**        | Boost                        | `refinery`         |  Instant  | Gain half the Money tokens of any player’s Starting Money (round down).                                                                                                              |
| **Trade**        | Persuasion                   | `convince`         | Must Keep | Gain $1 and keep this card in your stash. When someone would activate, buy, or discard a card from your Layout, you may offer this instead. If declined, they pay double Access Fee. |
| **Sports**       | Underdog                     | `giant`            | Must Keep | Lose $1 and keep this card in your stash. When a Life Card enters your Stash, pass this card to the player on your left. Lose $1 after Phase 1.                                      |
| **Sports**       | Frontrunner                  | `laurels-trophy`   | Must Keep | Keep this card in your stash. Place $1 from bank on this card (max 3). On Paydays, pass this left. Money stays on this and can only be used after Phase 1.                           |
| **Sports**       | Penalty                      | `whistle`          | Must Keep | Lose $1 and keep this card in your stash. After a Document enters your Stash, pass this card to the player on your left.                                                             |
| **Sports**       | Star Power                   | `podium-winner`    | Must Keep | Gain $1 and keep this card in your stash. After a Connection enters any other player’s Stash, give them this card.                                                                   |

---

## 6. Phase 2: Border Crossing Mechanics

### 6.1 Crossing Resolution

Each player gets exactly one turn to attempt crossing the border:

1. **Assurance Withdrawal**: The player evaluates their Destination criteria against their ending Money, Documents, and Connections (from Section 3.2). For each resource type meeting the threshold, at most one set is traded in for the Assurance reward (Money is returned to the bank; Documents and Connections are placed in the discard pile). Any remaining excess resources beyond the single set threshold remain with the player. Adjust their Assurance total accordingly.
2. **Lane Selection**: Choose a Security Lane (1–5) containing tokens. Flip the top token.
3. **Immigration Check**:
   - If the player does not have a Ticket and a Passport, they fail automatically.
   - If the player's Assurance \(\ge\) the token value: The player pays Assurance equal to the token value. They cross successfully.
   - If Assurance \(<\) token value: They are turned back and fail to emigrate.

---
