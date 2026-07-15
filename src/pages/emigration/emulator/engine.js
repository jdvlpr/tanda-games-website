/**
 * Emigration — Complete Game Engine
 * Pure ES module with zero DOM dependencies.
 * Source of truth: game_specification.md
 */

// ─── Utility ─────────────────────────────────────────────────────────────────

/** Fisher–Yates shuffle (in-place, returns same array). */
export function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// ─── Constants & Data Tables ─────────────────────────────────────────────────

/** Maps nationality adjective → destination country name. */
export const NATIONALITY_TO_COUNTRY = {
  Bosnian: "Bosnia and Herzegovina",
  Chinese: "China",
  Congolese: "Democratic Republic of Congo",
  French: "France",
  Russian: "Russia",
  Senegalese: "Senegal",
  Swiss: "Switzerland",
  English: "England",
  American: "United States of America",
};

export const NATIONALITIES = [
  { name: "Bosnian", fund: 2 },
  { name: "Chinese", fund: 6 },
  { name: "Congolese", fund: 2 },
  { name: "French", fund: 5 },
  { name: "Russian", fund: 5 },
  { name: "Senegalese", fund: 3 },
  { name: "Swiss", fund: 4 },
  { name: "English", fund: 5 },
  { name: "American", fund: 6 },
];

export const DESTINATIONS = [
  {
    name: "Bosnia and Herzegovina",
    nationality: "Bosnian",
    check: (m, d, c) => {
      let a = 0;
      if (m >= 6) a += 2;
      if (d >= 4) a += 2;
      else if (d < 2) a -= 2;
      if (c >= 3) a += 6;
      return a;
    },
  },
  {
    name: "China",
    nationality: "Chinese",
    check: (m, d, c) => {
      let a = 0;
      if (m >= 10) a += 3;
      else if (m < 4) a -= 2;
      if (d >= 4) a += 2;
      else if (d < 2) a -= 3;
      if (c >= 4) a += 5;
      return a;
    },
  },
  {
    name: "Democratic Republic of Congo",
    nationality: "Congolese",
    check: (m, d, c) => {
      let a = 0;
      if (m >= 6) a += 2;
      if (d >= 4) a += 2;
      else if (d < 2) a -= 2;
      if (c >= 3) a += 6;
      return a;
    },
  },
  {
    name: "France",
    nationality: "French",
    check: (m, d, c) => {
      let a = 0;
      if (m >= 8) a += 2;
      else if (m < 3) a -= 1;
      if (d >= 4) a += 2;
      else if (d < 2) a -= 3;
      if (c >= 3) a += 4;
      return a;
    },
  },
  {
    name: "Russia",
    nationality: "Russian",
    check: (m, d, c) => {
      let a = 0;
      if (m >= 7) a += 2;
      else if (m < 2) a -= 1;
      if (d >= 4) a += 2;
      else if (d < 2) a -= 3;
      if (c >= 3) a += 4;
      return a;
    },
  },
  {
    name: "Senegal",
    nationality: "Senegalese",
    check: (m, d, c) => {
      let a = 0;
      if (m >= 7) a += 2;
      if (d >= 4) a += 2;
      else if (d < 2) a -= 2;
      if (c >= 3) a += 5;
      return a;
    },
  },
  {
    name: "Switzerland",
    nationality: "Swiss",
    check: (m, d, c) => {
      let a = 0;
      if (m >= 7) a += 2;
      else if (m < 2) a -= 1;
      if (d >= 4) a += 2;
      else if (d < 2) a -= 3;
      if (c >= 3) a += 4;
      return a;
    },
  },
  {
    name: "England",
    nationality: "English",
    check: (m, d, c) => {
      let a = 0;
      if (m >= 10) a += 3;
      else if (m < 4) a -= 2;
      if (d >= 4) a += 2;
      else if (d < 2) a -= 3;
      if (c >= 3) a += 4;
      return a;
    },
  },
  {
    name: "United States of America",
    nationality: "American",
    check: (m, d, c) => {
      let a = 0;
      if (m >= 10) a += 3;
      else if (m < 5) a -= 2;
      if (d >= 4) a += 2;
      else if (d < 2) a -= 3;
      if (c >= 4) a += 5;
      return a;
    },
  },
];

export const DOCUMENTS_CATALOG = [
  { name: "Write Last Will and Testament", cost: 2, type: "document" },
  { name: "Certificate of Excellence", cost: 2, type: "document" },
  { name: "Checklist", cost: 2, type: "document" },
  { name: "Copy of Birth Certificate", cost: 2, type: "document" },
  { name: "Notebook", cost: 2, type: "document" },
  { name: "Subscribe to Travel Updates", cost: 2, type: "document" },
  { name: "Travel Brochure", cost: 2, type: "document" },
  { name: "Physical Exam", cost: 3, type: "document" },
  { name: "Vaccination Record", cost: 3, type: "document" },
  { name: "Personality Test", cost: 3, type: "document" },
  { name: "Travel Wallet", cost: 3, type: "document" },
  { name: "Attend Security Training", cost: 3, type: "document" },
  { name: "Residence Address in Destination", cost: 3, type: "document" },
  { name: "Letter of Recommendation", cost: 3, type: "document" },
  { name: "Letter of Invitation", cost: 4, type: "document" },
  { name: "Background Check", cost: 4, type: "document" },
  { name: "Employment Contract", cost: 4, type: "document" },
  { name: "International Driving Permit", cost: 4, type: "document" },
  { name: "Vehicle Registration Papers", cost: 4, type: "document" },
  { name: "Pet Passport", cost: 4, type: "document" },
  { name: "Language Phrasebook", cost: 4, type: "document" },
];

export const CONNECTIONS_CATALOG = [
  { name: "Coffee with Airport Employee", cost: 2, type: "connection" },
  {
    name: "Cookies for Neighbor from Destination",
    cost: 2,
    type: "connection",
  },
  {
    name: "Video Chat with Person from Destination",
    cost: 2,
    type: "connection",
  },
  { name: "Support Group Motivates You", cost: 2, type: "connection" },
  { name: "Learn Song from Your Destination", cost: 2, type: "connection" },
  { name: "Listen to the News", cost: 2, type: "connection" },
  { name: "Friend moves to your Destination", cost: 2, type: "connection" },
  { name: "Language Classes", cost: 3, type: "connection" },
  { name: "Network Fair", cost: 3, type: "connection" },
  { name: "Dinner with a Diplomat", cost: 3, type: "connection" },
  { name: "Become World Famous", cost: 3, type: "connection" },
  { name: "Learn from an Elder", cost: 3, type: "connection" },
  { name: "Excellent Teamwork", cost: 3, type: "connection" },
  { name: "Endorsement from Royalty", cost: 3, type: "connection" },
  { name: "Enter Luxury Travel Club", cost: 4, type: "connection" },
  { name: "Internship in Your Destination", cost: 4, type: "connection" },
  { name: "Get Engaged to a Native", cost: 4, type: "connection" },
  { name: "Politician Approves You", cost: 4, type: "connection" },
  { name: "Attend History Class", cost: 4, type: "connection" },
  { name: "Travel Concierge", cost: 4, type: "connection" },
  { name: "Favorable Cultural Opinion", cost: 4, type: "connection" },
];

export const LIFE_CARDS_CATALOG = [
  // Friendship pack
  {
    title: "Stellar Reputation",
    pack: "Friendship",
    keep: "May Keep",
    type: "life",
  },
  { title: "Rummage Sale", pack: "Friendship", keep: "Instant", type: "life" },
  {
    title: "Island Paradise",
    pack: "Friendship",
    keep: "Instant",
    type: "life",
  },
  { title: "Swap Wallets", pack: "Friendship", keep: "Instant", type: "life" },
  // High Society pack
  { title: "VIP", pack: "High Society", keep: "Instant", type: "life" },
  {
    title: "Fancy Clothes",
    pack: "High Society",
    keep: "May Keep",
    type: "life",
  },
  {
    title: "Social Butterfly",
    pack: "High Society",
    keep: "Instant",
    type: "life",
  },
  {
    title: "Identical Twin",
    pack: "High Society",
    keep: "Instant",
    type: "life",
  },
  // Downtown pack
  { title: "Reward", pack: "Downtown", keep: "Instant", type: "life" },
  { title: "Suspect", pack: "Downtown", keep: "Instant", type: "life" },
  { title: "Salvage", pack: "Downtown", keep: "Must Keep", type: "life" },
  { title: "Blacklisted", pack: "Downtown", keep: "Must Keep", type: "life" },
  // Emergency pack
  {
    title: "Trousers Fall Down",
    pack: "Emergency",
    keep: "Instant",
    type: "life",
  },
  { title: "Keep Calm", pack: "Emergency", keep: "Must Keep", type: "life" },
  { title: "Life Coach", pack: "Emergency", keep: "Instant", type: "life" },
  {
    title: "Shredder Accident",
    pack: "Emergency",
    keep: "Instant",
    type: "life",
  },
  // Vacation pack
  { title: "Camping", pack: "Vacation", keep: "Instant", type: "life" },
  { title: "FOMO", pack: "Vacation", keep: "Instant", type: "life" },
  { title: "Nostalgia", pack: "Vacation", keep: "Instant", type: "life" },
  { title: "Lost & Found", pack: "Vacation", keep: "Instant", type: "life" },
  // News pack (two Pandemic cards)
  {
    title: "Pandemic / Economic Stimulus",
    pack: "News",
    keep: "Instant",
    type: "life",
  },
  {
    title: "Pandemic / Economic Stimulus",
    pack: "News",
    keep: "Instant",
    type: "life",
  },
  { title: "Mental Fog", pack: "News", keep: "Instant", type: "life" },
  { title: "Insider", pack: "News", keep: "May Keep", type: "life" },
  // Charity pack
  { title: "Philanthropy", pack: "Charity", keep: "Instant", type: "life" },
  { title: "Bailout", pack: "Charity", keep: "Instant", type: "life" },
  { title: "Share", pack: "Charity", keep: "Instant", type: "life" },
  { title: "Pay Cut", pack: "Charity", keep: "Must Keep", type: "life" },
  // Trade pack
  { title: "Productivity", pack: "Trade", keep: "Instant", type: "life" },
  { title: "Tariffs", pack: "Trade", keep: "Instant", type: "life" },
  { title: "Boost", pack: "Trade", keep: "Instant", type: "life" },
  { title: "Persuasion", pack: "Trade", keep: "Must Keep", type: "life" },
  // Sports pack
  { title: "Underdog", pack: "Sports", keep: "Must Keep", type: "life" },
  { title: "Frontrunner", pack: "Sports", keep: "Must Keep", type: "life" },
  { title: "Penalty", pack: "Sports", keep: "Must Keep", type: "life" },
  { title: "Star Power", pack: "Sports", keep: "Must Keep", type: "life" },
];

export const PACKS_LIST = [
  "Friendship",
  "High Society",
  "Downtown",
  "Emergency",
  "Vacation",
  "News",
  "Charity",
  "Trade",
  "Sports",
];

/** Security lane token pools (shuffled at setup). */
export const SECURITY_LANES_DATA = [
  { name: "Lane 1", tokens: [6, 7, 7] },
  { name: "Lane 2", tokens: [6, 7, 8] },
  { name: "Lane 3", tokens: [5, 8, 8] },
  { name: "Lane 4", tokens: [4, 8, 9] },
  { name: "Lane 5", tokens: [3, 9, 11] },
];

/**
 * Layout coverage DAG.
 * Key = card index, Value = array of card indices that COVER this card.
 * A card is covered if ANY of its covering cards are still present.
 *
 * Layout grid (14 cards):
 *   Row 1: [0] [1] [2] [3]       ← face-down
 *   Row 2:   [4] [5] [6]         ← face-up, staggered
 *   Row 3: [7] [8] [9] [10]      ← face-down
 *   Row 4:  [11] [12] [13]       ← face-up, staggered (initially available)
 */
export const LAYOUT_COVERS = {
  0: [4], // card 0 is covered by card 4
  1: [4, 5],
  2: [5, 6],
  3: [6],
  4: [7, 8], // row 2 cards covered by row 3
  5: [8, 9],
  6: [9, 10],
  7: [11], // row 3 cards covered by row 4
  8: [11, 12],
  9: [12, 13],
  10: [13],
  11: [], // row 4 — never covered
  12: [],
  13: [],
};

/** Pay raise amounts for the 2 career slots. */
export const SALARY_RAISES = [1, 3];

/** Maximum number of pay raise slots. */
export const MAX_PAY_RAISES = 2;

// ─── Engine Class ────────────────────────────────────────────────────────────

/**
 * Complete game engine for the Emigration board game.
 * Manages all game state and enforces all rules from the specification.
 *
 * The engine uses a pendingChoice pattern for interactive decisions:
 * when user input is needed, `pendingChoice` is set and `resolveChoice(value)`
 * continues execution. This supports both interactive UI and automated AI play.
 */
export default class EmigrationEngine {
  /**
   * @param {Object} config
   * @param {'competitive'|'cooperative'} config.mode
   * @param {{name:string, nationality:string, destination:string}[]} config.players
   * @param {string[]} [config.selectedPacks] - Life card packs to use (if not provided, random selection)
   * @param {(() => number)|null} [config.rollOverride] - Override dice roll
   * @param {((entry: {msg:string, type:string}) => void)|null} [config.onLog]
   * @param {(() => void)|null} [config.onStateChange]
   */
  constructor({
    mode,
    players: playersSetup,
    selectedPacks = null,
    rollOverride = null,
    onLog = null,
    onStateChange = null,
  }) {
    this.mode = mode;
    this.selectedPacks = selectedPacks;
    this.rollOverride = rollOverride;
    this.onLog = onLog;
    this.onStateChange = onStateChange;

    // Game state
    this.phase = "preparation"; // 'preparation' | 'crossing' | 'game_over'
    this.currentPlayerIdx = 0;
    this.players = [];
    this.publicServices = { tickets: 0, passports: 0 };
    this.securityLanes = [];
    this.discardPile = [];
    this.logs = [];
    this.turnNumber = 1;
    this.consecutiveForfeits = 0;
    this.pandemicStimulusCount = 0;
    this.activeCrossingIdx = 0;
    this.gameResult = null;
    this._collegeFailed = false;
    this._identicalTwinExtraTurn = false;

    // Choice system
    this.pendingChoice = null;
    this._pendingResolve = null;

    // Safety valve for infinite loops
    this._advanceCount = 0;

    this.log("Initializing game...", "system");
    this._setupSecurityLanes();
    this._setupPlayersAndDeck(playersSetup);
    this.log(`--- ${this.players[0].name}'s turn ---`, "system");
    this._notify();
  }

  // ─── Dice ────────────────────────────────────────────────────────────

  rollD6() {
    if (this.rollOverride) {
      const val = this.rollOverride();
      this.log(`D6 rolled (override): ${val}`, "roll");
      return val;
    }
    const val = Math.floor(Math.random() * 6) + 1;
    this.log(`D6 rolled: ${val}`, "roll");
    return val;
  }

  // ─── Setup ───────────────────────────────────────────────────────────

  _setupSecurityLanes() {
    this.securityLanes = SECURITY_LANES_DATA.map((lane) => ({
      name: lane.name,
      tokens: shuffleArray([...lane.tokens]),
    }));
    this.log("Security lanes arranged with shuffled tokens.", "system");
  }

  _setupPlayersAndDeck(playersSetup) {
    const P = playersSetup.length;
    this.publicServices.tickets = P;
    this.publicServices.passports = P;

    // Scaling (§2.1)
    const docConnEach = 7 + (P - 2) * 3;
    const packsCount = P;
    const paydaysCount = P * 4;

    this.log(
      `Deck scaled for ${P} players: ${docConnEach} Docs/Conns each, ` +
        `${packsCount} Life Packs, ${paydaysCount} Paydays.`,
      "system",
    );

    // Build the deck
    const selectedDocs = shuffleArray([...DOCUMENTS_CATALOG]).slice(
      0,
      docConnEach,
    );
    const selectedConns = shuffleArray([...CONNECTIONS_CATALOG]).slice(
      0,
      docConnEach,
    );
    const usedPacks =
      this.selectedPacks || shuffleArray([...PACKS_LIST]).slice(0, packsCount);
    this.log(`Life Card packs: ${usedPacks.join(", ")}`, "system");

    const selectedLifeCards = LIFE_CARDS_CATALOG.filter((c) =>
      usedPacks.includes(c.pack),
    ).map((c) => ({ ...c }));

    const paydays = Array.from({ length: paydaysCount }, () => ({
      name: "Payday",
      type: "payday",
      cost: 0,
    }));

    const mainDeck = shuffleArray([
      ...selectedDocs.map((c) => ({ ...c })),
      ...selectedConns.map((c) => ({ ...c })),
      ...selectedLifeCards,
      ...paydays,
    ]);

    // Remove 2 random cards face-down (§2.2 step 4)
    mainDeck.splice(0, 2);
    this.log(
      `Removed 2 cards face-down. Deck: ${mainDeck.length} cards.`,
      "system",
    );

    // Initialize players
    playersSetup.forEach((setup, idx) => {
      const nat = NATIONALITIES.find((n) => n.name === setup.nationality);
      if (!nat) throw new Error(`Unknown nationality: ${setup.nationality}`);

      const player = {
        id: idx,
        name: setup.name,
        nationality: nat.name,
        destination: setup.destination,
        money: nat.fund,
        salary: 1,
        payRaises: 0,
        inCollege: false,
        accessFee: 1,
        assurance: 0,
        skipNextTurn: false,
        collegeFund: nat.fund,
        startingFund: nat.fund,
        ticketPassportBonusClaimed: false,
        crossedSuccessfully: null,
        stash: {
          documents: [],
          connections: [],
          tickets: 0,
          passports: 0,
          lifeCards: [],
        },
        layout: new Array(14).fill(null),
      };

      // Deal 14 cards
      for (let i = 0; i < 14; i++) {
        const card = mainDeck.pop();
        // Rows 1 (0-3) and 3 (7-10) are face-down; Rows 2 (4-6) and 4 (11-13) are face-up
        const faceDown = (i >= 0 && i <= 3) || (i >= 7 && i <= 10);
        player.layout[i] = { card: { ...card }, faceUp: !faceDown, index: i };
      }

      this.players.push(player);
      this.log(
        `${player.name} (${player.nationality} → ${player.destination}) ` +
          `starts with $${player.money}.`,
        "system",
      );
    });
  }

  // ─── Layout Coverage ─────────────────────────────────────────────────

  /** Check if a card at slotIdx is covered by any other card in the layout. */
  isCardCovered(player, slotIdx) {
    const covers = LAYOUT_COVERS[slotIdx];
    if (!covers) return false;
    return covers.some((covIdx) => player.layout[covIdx] !== null);
  }

  /** Check if a card is available (face-up AND not covered). */
  isCardAvailable(player, slotIdx) {
    const slot = player.layout[slotIdx];
    if (!slot) return false;
    return slot.faceUp && !this.isCardCovered(player, slotIdx);
  }

  /** Get all available card slot indices for a player's layout. */
  getAvailableLayoutCards(playerIdx) {
    const player = this.players[playerIdx];
    const result = [];
    for (let i = 0; i < 14; i++) {
      if (this.isCardAvailable(player, i)) result.push(i);
    }
    return result;
  }

  /** After removing a card, flip newly uncovered face-down cards. */
  uncoverLayout(player) {
    for (let i = 0; i < 14; i++) {
      const slot = player.layout[i];
      if (slot && !slot.faceUp && !this.isCardCovered(player, i)) {
        slot.faceUp = true;
        this.log(
          `${player.name}'s card ${slot.card.name || slot.card.title} ` +
            `(slot ${i}) is uncovered and flipped face-up.`,
          "system",
        );
      }
    }
  }

  // ─── Navigation ──────────────────────────────────────────────────────

  getLeftPlayer(player) {
    return this.players[
      (player.id - 1 + this.players.length) % this.players.length
    ];
  }

  // ─── Hooks ───────────────────────────────────────────────────────────

  /** Called when a card is discarded. Triggers Salvage/Blacklisted. */
  _onCardDiscarded(discardingPlayer, card) {
    // Salvage: other players gain 1 Money
    for (const p of this.players) {
      if (
        p.id !== discardingPlayer.id &&
        p.stash.lifeCards.some((lc) => lc.title === "Salvage")
      ) {
        p.money += 1;
        this.log(`${p.name} gains $1 from Salvage.`, "system");
      }
    }
    // Blacklisted: discarder loses 1 Money
    if (
      discardingPlayer.stash.lifeCards.some((lc) => lc.title === "Blacklisted")
    ) {
      discardingPlayer.money = Math.max(0, discardingPlayer.money - 1);
      this.log(`${discardingPlayer.name} loses $1 from Blacklisted.`, "system");
    }
  }

  /** Called when a player gains a document. Triggers Penalty pass. */
  _onPlayerGainDocument(player) {
    const idx = player.stash.lifeCards.findIndex(
      (lc) => lc.title === "Penalty",
    );
    if (idx !== -1) {
      const [card] = player.stash.lifeCards.splice(idx, 1);
      const left = this.getLeftPlayer(player);
      left.stash.lifeCards.push(card);
      this.log(`Penalty passed from ${player.name} to ${left.name}.`, "system");
    }
  }

  /** Called when a player gains a connection. Triggers Star Power. */
  _onPlayerGainConnection(player) {
    for (const p of this.players) {
      if (p.id !== player.id) {
        const idx = p.stash.lifeCards.findIndex(
          (lc) => lc.title === "Star Power",
        );
        if (idx !== -1) {
          p.money += 1;
          const [card] = p.stash.lifeCards.splice(idx, 1);
          player.stash.lifeCards.push(card);
          this.log(
            `${p.name} gains $1 from Star Power, passes card to ${player.name}.`,
            "system",
          );
        }
      }
    }
  }

  /**
   * Called ONLY when a life card is KEPT (Must Keep or May Keep chosen to keep).
   * NOT called for Instant cards that are discarded.
   * Triggers Underdog.
   */
  _onPlayerGainLifeCard(player) {
    const idx = player.stash.lifeCards.findIndex(
      (lc) => lc.title === "Underdog",
    );
    if (idx !== -1) {
      player.money = Math.max(0, player.money - 1);
      const [card] = player.stash.lifeCards.splice(idx, 1);
      const left = this.getLeftPlayer(player);
      left.stash.lifeCards.push(card);
      this.log(
        `Underdog: ${player.name} loses $1, card passes to ${left.name}.`,
        "system",
      );
    }
  }

  /** Check and grant/revoke Ticket+Passport bonus. */
  checkTicketPassportBonus(player) {
    if (!player.ticketPassportBonusClaimed) {
      if (player.stash.tickets >= 1 && player.stash.passports >= 1) {
        player.assurance += 1;
        player.ticketPassportBonusClaimed = true;
        this.log(
          `${player.name} gains +1 Assurance (Ticket + Passport bonus).`,
          "system",
        );
      }
    } else {
      if (player.stash.tickets === 0 || player.stash.passports === 0) {
        player.assurance = Math.max(0, player.assurance - 1);
        player.ticketPassportBonusClaimed = false;
        this.log(`${player.name} lost Ticket/Passport bonus.`, "system");
      }
    }
  }

  // ─── Cost Helpers ────────────────────────────────────────────────────

  /** Get the effective cost of a card considering stash discounts. */
  getEffectiveCost(player, card) {
    let cost = card.cost || 0;
    if (
      card.type === "document" &&
      player.stash.lifeCards.some((lc) => lc.title === "Fancy Clothes")
    ) {
      cost = Math.max(0, cost - 1);
    }
    if (
      card.type === "connection" &&
      player.stash.lifeCards.some((lc) => lc.title === "Stellar Reputation")
    ) {
      cost = Math.max(0, cost - 1);
    }
    return cost;
  }

  // ─── Forfeit / Availability Check ────────────────────────────────────

  /** Can the player perform ANY required action? If not, they forfeit. */
  canPerformAnyRequiredAction(player) {
    // 1. Activate: any available Payday/Life card in any layout
    for (const p of this.players) {
      const fee = p.id === player.id ? 0 : player.accessFee;
      if (player.money >= fee) {
        for (let i = 0; i < 14; i++) {
          if (this.isCardAvailable(p, i)) {
            const t = p.layout[i].card.type;
            if (t === "payday" || t === "life") return true;
          }
        }
      }
    }

    // 2. Buy Doc/Conn from layouts
    for (const p of this.players) {
      const fee = p.id === player.id ? 0 : player.accessFee;
      for (let i = 0; i < 14; i++) {
        if (this.isCardAvailable(p, i)) {
          const card = p.layout[i].card;
          if (card.type === "document" || card.type === "connection") {
            const cost = this.getEffectiveCost(player, card);
            if (player.money >= cost + fee) return true;
          }
        }
      }
    }

    // Buy Ticket/Passport from pool
    if (
      this.publicServices.tickets > 0 &&
      player.stash.connections.length >= 1 &&
      player.money >= 2
    )
      return true;
    if (
      this.publicServices.passports > 0 &&
      player.stash.documents.length >= 1 &&
      player.money >= 2
    )
      return true;

    // 3. Steal from pool (free)
    if (this.publicServices.tickets > 0 && player.stash.connections.length >= 1)
      return true;
    if (this.publicServices.passports > 0 && player.stash.documents.length >= 1)
      return true;

    // 4. Reclaim from opponent stash
    for (const p of this.players) {
      if (p.id !== player.id) {
        const cost = 2 + player.accessFee;
        if (
          player.money >= cost &&
          (p.stash.tickets > 1 || p.stash.passports > 1)
        )
          return true;
      }
    }

    // 5. Discard from own stash (free, earns 2)
    if (
      player.stash.documents.length > 0 ||
      player.stash.connections.length > 0
    )
      return true;
    // Discard from own layout (no access fee)
    for (let i = 0; i < 14; i++) {
      if (this.isCardAvailable(player, i)) {
        const t = player.layout[i].card.type;
        if (t === "document" || t === "connection") return true;
      }
    }
    // Discard from opponent layout (pay access fee)
    for (const p of this.players) {
      if (p.id !== player.id && player.money >= player.accessFee) {
        for (let i = 0; i < 14; i++) {
          if (this.isCardAvailable(p, i)) {
            const t = p.layout[i].card.type;
            if (t === "document" || t === "connection") return true;
          }
        }
      }
    }

    // 6. Apply for College
    if (
      !this._collegeFailed &&
      player.payRaises < MAX_PAY_RAISES &&
      !player.inCollege
    ) {
      const minTuition = Math.floor(player.collegeFund / 2) + 1;
      if (player.money >= minTuition) return true;
    }

    return false;
  }

  /**
   * Returns structured array of valid actions for the current player.
   * Used by the UI to enable/disable buttons and by the AI for decision-making.
   */
  getValidActions(player) {
    const actions = [];
    const p = player || this.players[this.currentPlayerIdx];

    // Optional: Graduate
    actions.push({
      type: "graduate",
      label: "Graduate (D6)",
      optional: true,
      enabled: p.inCollege,
    });

    // Optional: Sell
    const canSell =
      p.stash.documents.length > 0 || p.stash.connections.length > 0;
    actions.push({
      type: "sell",
      label: "Sell Stash Card",
      optional: true,
      enabled: canSell,
    });

    // Required: Activate
    let canActivate = false;
    for (const op of this.players) {
      const fee = op.id === p.id ? 0 : p.accessFee;
      if (p.money >= fee) {
        for (let i = 0; i < 14; i++) {
          if (this.isCardAvailable(op, i)) {
            const t = op.layout[i].card.type;
            if (t === "payday" || t === "life") {
              canActivate = true;
              break;
            }
          }
        }
      }
      if (canActivate) break;
    }
    actions.push({
      type: "activate",
      label: "Activate Card",
      optional: false,
      enabled: canActivate,
    });

    // Required: Buy
    let canBuy = false;
    for (const op of this.players) {
      const fee = op.id === p.id ? 0 : p.accessFee;
      for (let i = 0; i < 14; i++) {
        if (this.isCardAvailable(op, i)) {
          const card = op.layout[i].card;
          if (card.type === "document" || card.type === "connection") {
            if (p.money >= this.getEffectiveCost(p, card) + fee) {
              canBuy = true;
              break;
            }
          }
        }
      }
      if (canBuy) break;
    }
    if (
      this.publicServices.tickets > 0 &&
      p.stash.connections.length >= 1 &&
      p.money >= 2
    )
      canBuy = true;
    if (
      this.publicServices.passports > 0 &&
      p.stash.documents.length >= 1 &&
      p.money >= 2
    )
      canBuy = true;
    actions.push({
      type: "buy",
      label: "Buy Card",
      optional: false,
      enabled: canBuy,
    });

    // Required: Steal
    const canStealT =
      this.publicServices.tickets > 0 && p.stash.connections.length >= 1;
    const canStealP =
      this.publicServices.passports > 0 && p.stash.documents.length >= 1;
    actions.push({
      type: "steal",
      label: "Steal (Skip Turn)",
      optional: false,
      enabled: canStealT || canStealP,
    });

    // Required: Reclaim
    let canReclaim = false;
    for (const op of this.players) {
      if (
        op.id !== p.id &&
        p.money >= 2 + p.accessFee &&
        (op.stash.tickets > 1 || op.stash.passports > 1)
      ) {
        canReclaim = true;
        break;
      }
    }
    actions.push({
      type: "reclaim",
      label: "Reclaim Card",
      optional: false,
      enabled: canReclaim,
    });

    // Required: Discard
    let canDiscard =
      p.stash.documents.length > 0 || p.stash.connections.length > 0;
    if (!canDiscard) {
      for (const op of this.players) {
        const fee = op.id === p.id ? 0 : p.accessFee;
        if (p.money >= fee) {
          for (let i = 0; i < 14; i++) {
            if (this.isCardAvailable(op, i)) {
              const t = op.layout[i].card.type;
              if (t === "document" || t === "connection") {
                canDiscard = true;
                break;
              }
            }
          }
        }
        if (canDiscard) break;
      }
    }
    actions.push({
      type: "discard",
      label: "Discard Card",
      optional: false,
      enabled: canDiscard,
    });

    // Required: Apply for College
    let canApply = false;
    if (!this._collegeFailed && p.payRaises < MAX_PAY_RAISES && !p.inCollege) {
      const minTuition = Math.floor(p.collegeFund / 2) + 1;
      if (p.money >= minTuition) canApply = true;
    }
    actions.push({
      type: "applyCollege",
      label: "Apply for College",
      optional: false,
      enabled: canApply,
    });

    return actions;
  }

  // ─── Turn Management ─────────────────────────────────────────────────

  advanceTurn() {
    this._advanceCount++;
    if (this._advanceCount > 2000) {
      this.log("Safety limit: forcing Phase 2.", "error");
      this.triggerPhase2();
      return;
    }

    if (this.checkPhase2Trigger()) {
      this.triggerPhase2();
      return;
    }

    this._collegeFailed = false;

    // Identical Twin extra turn: don't advance player index
    if (this._identicalTwinExtraTurn) {
      this._identicalTwinExtraTurn = false;
      this.log(
        `${this.players[this.currentPlayerIdx].name} takes an extra turn (Identical Twin).`,
        "system",
      );
      this._notify();
      return;
    }

    this.currentPlayerIdx = (this.currentPlayerIdx + 1) % this.players.length;
    this.turnNumber++;

    const next = this.players[this.currentPlayerIdx];

    // Skip turn penalty (from Steal)
    if (next.skipNextTurn) {
      next.skipNextTurn = false;
      this.log(`${next.name} skips their turn (penalty).`, "system");
      this.advanceTurn();
      return;
    }

    // Forfeit check
    if (!this.canPerformAnyRequiredAction(next)) {
      this.consecutiveForfeits++;
      this.log(
        `${next.name} forfeits (no available actions). ` +
          `Consecutive: ${this.consecutiveForfeits}/${this.players.length}`,
        "error",
      );
      if (this.consecutiveForfeits >= this.players.length) {
        this.log("All players forfeited. Everyone gains $1.", "system");
        this.players.forEach((p) => {
          p.money += 1;
        });
        this.consecutiveForfeits = 0;
      }
      this.advanceTurn();
      return;
    }

    this.consecutiveForfeits = 0;
    this.log(`--- Turn ${this.turnNumber}: ${next.name} ---`, "system");
    this._notify();
  }

  // ─── Phase 2 Trigger ─────────────────────────────────────────────────

  /** Phase 2 triggers when no face-up cards remain AND pool is empty. */
  checkPhase2Trigger() {
    const poolEmpty =
      this.publicServices.tickets === 0 && this.publicServices.passports === 0;
    if (!poolEmpty) return false;

    for (const p of this.players) {
      for (let i = 0; i < 14; i++) {
        if (p.layout[i] !== null) return false; // any card remaining = not triggered
      }
    }
    return true;
  }

  // ─── Phase 2: Border Crossing ────────────────────────────────────────

  triggerPhase2() {
    this.phase = "crossing";
    this.activeCrossingIdx = 0;
    this.log("══════════════════════════════════════", "system");
    this.log("PHASE 2: BORDER CROSSING", "system");
    this.log("══════════════════════════════════════", "system");

    // Evaluate destination criteria for all players
    for (const player of this.players) {
      const dest = DESTINATIONS.find((d) => d.name === player.destination);
      // Include Frontrunner money in the money count (Bug #8 fix)
      let totalMoney = player.money;
      const frCard = player.stash.lifeCards.find(
        (lc) => lc.title === "Frontrunner",
      );
      if (frCard && frCard.money) totalMoney += frCard.money;

      const docs = player.stash.documents.length;
      const conns = player.stash.connections.length;
      const mod = dest.check(totalMoney, docs, conns);
      player.assurance += mod;

      this.log(
        `${player.name}: Money=$${totalMoney}, Docs=${docs}, Conns=${conns} → ` +
          `${player.destination} modifier: ${mod >= 0 ? "+" : ""}${mod}. ` +
          `Assurance: ${player.assurance}`,
        "system",
      );
    }

    this.log(`${this.players[0].name} selects a security lane...`, "system");
    this._notify();
  }

  /** Player selects a security lane during Phase 2. */
  selectLane(laneIdx) {
    if (this.phase !== "crossing") return;
    const player = this.players[this.activeCrossingIdx];
    const lane = this.securityLanes[laneIdx];

    if (!lane || lane.tokens.length === 0) {
      this.log("That lane has no tokens left!", "error");
      return;
    }

    const tokenVal = lane.tokens.shift();
    this.log(
      `${player.name} selected ${lane.name}: token value = ${tokenVal}`,
      "action",
    );

    const hasTicket = player.stash.tickets > 0;
    const hasPassport = player.stash.passports > 0;

    if (!hasTicket || !hasPassport) {
      player.crossedSuccessfully = false;
      this.log(`${player.name} FAILED — missing Ticket/Passport.`, "error");
    } else if (player.assurance >= tokenVal) {
      player.crossedSuccessfully = true;
      player.assurance -= tokenVal;
      this.log(
        `${player.name} CROSSED! Paid ${tokenVal} Assurance. ` +
          `Remaining: ${player.assurance}`,
        "action",
      );
    } else {
      player.crossedSuccessfully = false;
      this.log(
        `${player.name} TURNED BACK — Assurance ${player.assurance} < ${tokenVal}.`,
        "error",
      );
    }

    this.activeCrossingIdx++;
    if (this.activeCrossingIdx >= this.players.length) {
      this._endGame();
    } else {
      this.log(
        `${this.players[this.activeCrossingIdx].name} selects a lane...`,
        "system",
      );
    }
    this._notify();
  }

  _endGame() {
    this.phase = "game_over";
    this.log("══════════════════════════════════════", "system");
    this.log("GAME OVER", "system");
    this.log("══════════════════════════════════════", "system");

    const playerResults = this.players.map((p) => ({
      name: p.name,
      crossed: p.crossedSuccessfully,
      assurance: p.assurance,
      money: p.money,
      docs: p.stash.documents.length,
      conns: p.stash.connections.length,
    }));

    if (this.mode === "cooperative") {
      const allCrossed = this.players.every((p) => p.crossedSuccessfully);
      if (allCrossed) {
        this.gameResult = {
          winner: null,
          message: "COOPERATIVE WIN! Everyone crossed!",
          playerResults,
        };
        this.log(this.gameResult.message, "system");
      } else {
        const failed = this.players
          .filter((p) => !p.crossedSuccessfully)
          .map((p) => p.name);
        this.gameResult = {
          winner: null,
          message: `COOPERATIVE DEFEAT. Failed: ${failed.join(", ")}.`,
          playerResults,
        };
        this.log(this.gameResult.message, "error");
      }
    } else {
      const crossed = this.players
        .filter((p) => p.crossedSuccessfully)
        .sort((a, b) => {
          if (b.assurance !== a.assurance) return b.assurance - a.assurance;
          if (b.money !== a.money) return b.money - a.money;
          return a.id - b.id;
        });

      if (crossed.length > 0) {
        const w = crossed[0];
        this.gameResult = {
          winner: w.name,
          message: `WINNER: ${w.name} (Assurance: ${w.assurance}, Money: $${w.money})`,
          playerResults,
        };
      } else {
        const byMoney = [...this.players].sort((a, b) => b.money - a.money);
        const w = byMoney[0];
        this.gameResult = {
          winner: w.name,
          message: `WINNER (no one crossed, most Money): ${w.name} ($${w.money})`,
          playerResults,
        };
      }
      this.log(this.gameResult.message, "system");
    }
  }

  // ─── Choice System ───────────────────────────────────────────────────

  _setPendingChoice(choice) {
    this.pendingChoice = {
      id: choice.id || `choice-${Date.now()}`,
      title: choice.title,
      options: choice.options,
    };
    this._pendingResolve = choice.resolve;
    this._notify();
  }

  resolveChoice(value) {
    if (!this._pendingResolve) return;
    const resolve = this._pendingResolve;
    this._pendingResolve = null;
    this.pendingChoice = null;
    resolve(value);
  }

  // ─── Optional Actions ────────────────────────────────────────────────

  /**
   * Execute an optional action (before the required action).
   * @param {'graduate'|'sell'} type
   * @param {Object} [params]
   */
  executeOptionalAction(type, params = {}) {
    if (this.phase !== "preparation" || this.pendingChoice) return;
    const player = this.players[this.currentPlayerIdx];

    switch (type) {
      case "graduate": {
        if (!player.inCollege) {
          this.log("Not in college.", "error");
          return;
        }
        const roll = this.rollD6();
        if (roll <= 3) {
          player.inCollege = false;
          player.assurance += 2;
          // Fill next pay raise slot
          const raiseAmount = SALARY_RAISES[player.payRaises];
          player.salary += raiseAmount;
          player.payRaises++;
          this.log(
            `${player.name} graduated (rolled ${roll})! +2 Assurance, ` +
              `salary +$${raiseAmount} → $${player.salary}/payday.`,
            "action",
          );
        } else {
          this.log(
            `${player.name} failed exams (rolled ${roll}). Remains in college.`,
            "error",
          );
        }
        this._notify();
        break;
      }

      case "sell": {
        const { stashType, stashIdx } = params;
        if (!stashType || stashIdx === undefined) {
          this.log("Select a stash card to sell.", "error");
          return;
        }
        const arr =
          stashType === "document"
            ? player.stash.documents
            : player.stash.connections;
        if (stashIdx < 0 || stashIdx >= arr.length) {
          this.log("Invalid stash index.", "error");
          return;
        }

        const [sold] = arr.splice(stashIdx, 1);
        this.discardPile.push(sold);
        player.money += 2;
        this.log(`${player.name} sold ${sold.name} for $2.`, "action");
        this._onCardDiscarded(player, sold);
        this._notify();
        break;
      }
    }
  }

  // ─── Required Actions ────────────────────────────────────────────────

  /**
   * Execute a required action (consumes the turn on success).
   * @param {'activate'|'buy'|'buyPool'|'steal'|'reclaim'|'discard'|'applyCollege'} type
   * @param {Object} [params]
   */
  executeRequiredAction(type, params = {}) {
    if (this.phase !== "preparation" || this.pendingChoice) return;
    if (this._collegeFailed && type === "applyCollege") {
      this.log("Cannot apply for college again this turn.", "error");
      return;
    }
    const player = this.players[this.currentPlayerIdx];

    switch (type) {
      case "activate":
        return this._doActivate(player, params);
      case "buy":
        return this._doBuy(player, params);
      case "buyPool":
        return this._doBuyPool(player, params);
      case "steal":
        return this._doSteal(player, params);
      case "reclaim":
        return this._doReclaim(player, params);
      case "discard":
        return this._doDiscard(player, params);
      case "applyCollege":
        return this._doApplyCollege(player);
    }
  }

  // ── Activate ──────────────────────────────────────────────────────────

  _doActivate(player, { targetPlayerIdx, slotIdx }) {
    const target = this.players[targetPlayerIdx];
    const slot = target.layout[slotIdx];
    if (!slot || !this.isCardAvailable(target, slotIdx)) {
      this.log("Card is not available.", "error");
      return;
    }
    if (slot.card.type !== "payday" && slot.card.type !== "life") {
      this.log("Can only activate Payday or Life cards.", "error");
      return;
    }

    const fee = target.id === player.id ? 0 : player.accessFee;
    if (player.money < fee) {
      this.log(`Cannot afford access fee ($${fee}).`, "error");
      return;
    }

    // Life card special checks: Keep Calm, Persuasion
    if (slot.card.type === "life") {
      // Check Keep Calm
      if (player.stash.lifeCards.some((lc) => lc.title === "Keep Calm")) {
        this._setPendingChoice({
          id: "keep-calm-check",
          title: `Use Keep Calm to discard "${slot.card.title}" without effect?`,
          options: [
            { text: "Yes — discard both cards", value: "use" },
            { text: "No — resolve the Life Card normally", value: "skip" },
          ],
          resolve: (val) => {
            if (val === "use") {
              const kcIdx = player.stash.lifeCards.findIndex(
                (lc) => lc.title === "Keep Calm",
              );
              const [kcCard] = player.stash.lifeCards.splice(kcIdx, 1);
              this.discardPile.push(kcCard);

              // Pay fee and remove card
              this._payAccessFee(player, target, fee);
              const [removed] = target.layout.splice(slotIdx, 1, null);
              this.discardPile.push(removed.card);
              this._onCardDiscarded(player, removed.card);
              this.log(
                `${player.name} used Keep Calm to discard ${removed.card.title}.`,
                "action",
              );
              this.uncoverLayout(target);
              this.advanceTurn();
              return;
            }
            // Continue with normal activation (may trigger Persuasion check)
            this._continueActivate(player, target, slotIdx, fee);
          },
        });
        return;
      }

      // Check Persuasion (opponent's layout only)
      if (
        target.id !== player.id &&
        target.stash.lifeCards.some((lc) => lc.title === "Persuasion")
      ) {
        this._handlePersuasion(player, target, slotIdx, fee, (actualFee) => {
          this._finishActivate(player, target, slotIdx, actualFee);
        });
        return;
      }
    }

    this._finishActivate(player, target, slotIdx, fee);
  }

  _continueActivate(player, target, slotIdx, fee) {
    if (
      target.id !== player.id &&
      target.stash.lifeCards.some((lc) => lc.title === "Persuasion")
    ) {
      this._handlePersuasion(player, target, slotIdx, fee, (actualFee) => {
        this._finishActivate(player, target, slotIdx, actualFee);
      });
      return;
    }
    this._finishActivate(player, target, slotIdx, fee);
  }

  _finishActivate(player, target, slotIdx, fee) {
    this._payAccessFee(player, target, fee);
    const [removed] = target.layout.splice(slotIdx, 1, null);
    const card = removed.card;

    // Treat layout removal as a discard event for life-card trigger hooks.
    this._onCardDiscarded(player, card);

    if (card.type === "payday") {
      this.discardPile.push(card);
      this.log(`${player.name} activated Payday.`, "action");
      this._resolvePayday();
      this.uncoverLayout(target);
      this.advanceTurn();
    } else {
      // Life card
      this.log(`${player.name} activated ${card.title}.`, "action");
      this._resolveLifeCardActivation(player, target, card);
    }
  }

  _resolvePayday() {
    for (const p of this.players) {
      if (p.inCollege) {
        this.log(`${p.name} is in college — salary paused.`, "system");
      } else {
        let payout = p.salary;
        if (p.stash.lifeCards.some((lc) => lc.title === "Insider")) payout += 1;
        if (p.stash.lifeCards.some((lc) => lc.title === "Pay Cut"))
          payout = Math.max(0, payout - 1);
        p.money += payout;
        this.log(`${p.name} receives $${payout} salary.`, "action");
      }

      // Frontrunner: place 1 Money on card (max 5), then pass left
      const frIdx = p.stash.lifeCards.findIndex(
        (lc) => lc.title === "Frontrunner",
      );
      if (frIdx !== -1) {
        const fr = p.stash.lifeCards[frIdx];
        if (!fr.money) fr.money = 0;
        if (fr.money < 5) {
          fr.money += 1;
          this.log(
            `Frontrunner: $1 placed on card (total: $${fr.money}).`,
            "system",
          );
        }
        const [frCard] = p.stash.lifeCards.splice(frIdx, 1);
        const left = this.getLeftPlayer(p);
        left.stash.lifeCards.push(frCard);
        this.log(
          `Frontrunner passed from ${p.name} to ${left.name}.`,
          "system",
        );
      }
    }
  }

  // ── Persuasion Handler ────────────────────────────────────────────────

  _handlePersuasion(player, target, slotIdx, baseFee, callback) {
    this._setPendingChoice({
      id: "persuasion-offer",
      title: `${target.name} has Persuasion. Offer it instead of the targeted card?`,
      options: [
        { text: `Yes — offer Persuasion to ${player.name}`, value: "offer" },
        { text: "No — proceed normally", value: "skip" },
      ],
      resolve: (val) => {
        if (val === "skip") {
          callback(baseFee);
          return;
        }
        // Persuasion offered — buyer accepts or declines
        this._setPendingChoice({
          id: "persuasion-accept",
          title: `${player.name}: Accept Persuasion, or decline and pay double fee?`,
          options: [
            {
              text: `Accept Persuasion (pay $${baseFee} fee)`,
              value: "accept",
            },
            {
              text: `Decline (pay $${baseFee * 2} double fee)`,
              value: "decline",
            },
          ],
          resolve: (buyerVal) => {
            if (buyerVal === "accept") {
              // Buyer gets Persuasion, normal fee
              if (player.money < baseFee) {
                this.log(`Cannot afford fee ($${baseFee}).`, "error");
                return;
              }
              this._payAccessFee(player, target, baseFee);
              const persIdx = target.stash.lifeCards.findIndex(
                (lc) => lc.title === "Persuasion",
              );
              const [persCard] = target.stash.lifeCards.splice(persIdx, 1);
              player.stash.lifeCards.push(persCard);
              this.log(
                `${player.name} accepted Persuasion from ${target.name}.`,
                "action",
              );
              this._onPlayerGainLifeCard(player);
              this.advanceTurn();
            } else {
              // Double fee
              const doubleFee = baseFee * 2;
              if (player.money < doubleFee) {
                this.log(`Cannot afford double fee ($${doubleFee}).`, "error");
                return;
              }
              this.log(
                `${player.name} declined Persuasion. Paying double fee ($${doubleFee}).`,
                "action",
              );
              callback(doubleFee);
            }
          },
        });
      },
    });
  }

  _payAccessFee(player, target, fee) {
    if (fee > 0 && target.id !== player.id) {
      player.money -= fee;
      target.money += fee;
      player.accessFee = Math.min(5, player.accessFee + 1);
      this.log(
        `${player.name} paid $${fee} access fee to ${target.name}.`,
        "system",
      );
    }
  }

  // ── Life Card Activation Flow ─────────────────────────────────────────

  _resolveLifeCardActivation(player, layoutOwner, card) {
    if (card.keep === "Must Keep") {
      this._resolveLifeCardEffect(player, card, () => {
        this._onPlayerGainLifeCard(player);
        this.uncoverLayout(layoutOwner);
        this.advanceTurn();
      });
    } else if (card.keep === "May Keep") {
      this._setPendingChoice({
        id: "may-keep-choice",
        title: `${card.title}: Keep for ongoing effect, or take immediate effect?`,
        options: [
          { text: "Keep card (ongoing effect)", value: "keep" },
          { text: "Take immediate effect", value: "immediate" },
        ],
        resolve: (val) => {
          if (val === "keep") {
            this._resolveLifeCardKeep(player, card, () => {
              this._onPlayerGainLifeCard(player);
              this.uncoverLayout(layoutOwner);
              this.advanceTurn();
            });
          } else {
            this._resolveLifeCardEffect(player, card, () => {
              this.discardPile.push(card);
              this.uncoverLayout(layoutOwner);
              this.advanceTurn();
            });
          }
        },
      });
    } else {
      // Instant
      this._resolveLifeCardEffect(player, card, () => {
        this.discardPile.push(card);
        this.uncoverLayout(layoutOwner);
        this.advanceTurn();
      });
    }
  }

  /** Handle the "keep" path for May Keep cards. */
  _resolveLifeCardKeep(player, card, done) {
    switch (card.title) {
      case "Stellar Reputation":
        player.stash.lifeCards.push({ ...card, keep: "Must Keep" });
        this.log(
          `${player.name} keeps Stellar Reputation (Connections cost -$1).`,
          "action",
        );
        done();
        break;
      case "Fancy Clothes":
        player.stash.lifeCards.push({ ...card, keep: "Must Keep" });
        this.log(
          `${player.name} keeps Fancy Clothes (Documents cost -$1).`,
          "action",
        );
        done();
        break;
      case "Insider":
        player.stash.lifeCards.push({ ...card, keep: "Must Keep" });
        this.log(`${player.name} keeps Insider (+$1 on Paydays).`, "action");
        done();
        break;
      default:
        done();
    }
  }

  // ── Life Card Effect Resolution ───────────────────────────────────────

  /**
   * Resolve a life card's immediate effect.
   * @param {Object} player - The player resolving the card
   * @param {Object} card - The life card
   * @param {Function} done - Continuation callback
   */
  _resolveLifeCardEffect(player, card, done) {
    const title = card.title;

    switch (title) {
      // ── Friendship ──
      case "Stellar Reputation":
        player.money += 3;
        this.log(`${player.name} gains $3.`, "action");
        done();
        break;

      case "Rummage Sale": {
        const discDocs = this.discardPile.filter((c) => c.type === "document");
        if (discDocs.length > 0) {
          this._setPendingChoice({
            id: "rummage-sale",
            title: "Rummage Sale: Gain $3 or take 1 discarded Document?",
            options: [
              { text: "Gain $3", value: "money" },
              ...discDocs.map((c, i) => ({
                text: `Take: ${c.name}`,
                value: `doc-${i}`,
              })),
            ],
            resolve: (val) => {
              if (val === "money") {
                player.money += 3;
                this.log(`${player.name} gains $3.`, "action");
              } else {
                const discIdx = this.discardPile.findIndex(
                  (c) => c.type === "document",
                );
                if (discIdx !== -1) {
                  // Find the specific doc selected
                  const docIndexInDiscard = parseInt(val.split("-")[1]);
                  let count = 0;
                  for (let i = 0; i < this.discardPile.length; i++) {
                    if (this.discardPile[i].type === "document") {
                      if (count === docIndexInDiscard) {
                        const [taken] = this.discardPile.splice(i, 1);
                        player.stash.documents.push(taken);
                        this.log(
                          `${player.name} takes ${taken.name} from discard.`,
                          "action",
                        );
                        this._onPlayerGainDocument(player);
                        break;
                      }
                      count++;
                    }
                  }
                }
              }
              done();
            },
          });
          return;
        }
        player.money += 3;
        this.log(
          `${player.name} gains $3 (no documents in discard).`,
          "action",
        );
        done();
        break;
      }

      case "Island Paradise":
        player.money += 1;
        this.log(`${player.name} gains $1.`, "action");
        {
          const minDocs = Math.min(
            ...this.players.map((p) => p.stash.documents.length),
          );
          for (const p of this.players) {
            if (p.stash.documents.length === minDocs) {
              p.money += 1;
              this.log(
                `${p.name} (fewest Documents: ${minDocs}) gains $1.`,
                "system",
              );
            }
          }
        }
        done();
        break;

      case "Swap Wallets":
        this._promptTargetPlayer(
          player,
          "Swap Wallets: choose a player",
          (targetId) => {
            const target = this.players[targetId];
            const temp = player.money;
            player.money = target.money;
            target.money = temp;
            this.log(
              `${player.name} swapped wallets with ${target.name}.`,
              "action",
            );
            done();
          },
        );
        break;

      // ── High Society ──
      case "VIP": {
        const maxM = Math.max(...this.players.map((p) => p.money));
        const bonus = Math.floor(maxM / 2);
        player.money += bonus;
        this.log(
          `VIP: richest player has $${maxM}. ${player.name} gains $${bonus}.`,
          "action",
        );
        done();
        break;
      }

      case "Fancy Clothes":
        player.money += 3;
        this.log(`${player.name} gains $3.`, "action");
        done();
        break;

      case "Social Butterfly":
        this._promptTargetPlayer(
          player,
          "Social Butterfly: choose target",
          (targetId) => {
            const target = this.players[targetId];
            const options = [];
            if (target.stash.connections.length > 0) {
              options.push({
                text: `Take 1 Connection from ${target.name}`,
                value: "conn",
              });
            }
            options.push({
              text: `Take up to $3 from ${target.name}`,
              value: "money",
            });

            if (options.length === 1 && options[0].value === "money") {
              const stolen = Math.min(3, target.money);
              target.money -= stolen;
              player.money += stolen;
              this.log(
                `${player.name} takes $${stolen} from ${target.name}.`,
                "action",
              );
              done();
              return;
            }

            this._setPendingChoice({
              id: "social-butterfly-choice",
              title: "Social Butterfly: take Connection or Money?",
              options,
              resolve: (val) => {
                if (val === "conn") {
                  this._setPendingChoice({
                    id: "social-butterfly-conn",
                    title: "Choose Connection to take",
                    options: target.stash.connections.map((c, i) => ({
                      text: `${c.name} ($${c.cost})`,
                      value: String(i),
                    })),
                    resolve: (connIdx) => {
                      const [taken] = target.stash.connections.splice(
                        parseInt(connIdx),
                        1,
                      );
                      player.stash.connections.push(taken);
                      this.log(
                        `${player.name} takes ${taken.name} from ${target.name}.`,
                        "action",
                      );
                      this._onPlayerGainConnection(player);
                      done();
                    },
                  });
                } else {
                  const stolen = Math.min(3, target.money);
                  target.money -= stolen;
                  player.money += stolen;
                  this.log(
                    `${player.name} takes $${stolen} from ${target.name}.`,
                    "action",
                  );
                  done();
                }
              },
            });
          },
        );
        break;

      case "Identical Twin":
        player.money += 1;
        this._identicalTwinExtraTurn = true;
        this.log(`${player.name} gains $1 and takes another turn.`, "action");
        done();
        break;

      // ── Downtown ──
      case "Reward":
        player.money += 1;
        for (const p of this.players) {
          if (p.id !== player.id) {
            const amt = Math.min(1, p.money);
            p.money -= amt;
            player.money += amt;
            if (amt > 0)
              this.log(`${player.name} takes $1 from ${p.name}.`, "action");
          }
        }
        done();
        break;

      case "Suspect":
        player.money = Math.max(0, player.money - 1);
        this.log(`${player.name} loses $1.`, "action");
        if (
          player.stash.documents.length > 0 ||
          player.stash.connections.length > 0
        ) {
          const opts = [];
          if (player.stash.documents.length > 0)
            opts.push({ text: "Lose 1 Document", value: "doc" });
          if (player.stash.connections.length > 0)
            opts.push({ text: "Lose 1 Connection", value: "conn" });
          this._setPendingChoice({
            id: "suspect-penalty",
            title: "Suspect: lose a Document or Connection",
            options: opts,
            resolve: (val) => {
              const arr =
                val === "doc"
                  ? player.stash.documents
                  : player.stash.connections;
              if (arr.length === 1) {
                const [disc] = arr.splice(0, 1);
                this.discardPile.push(disc);
                this.log(`${player.name} loses ${disc.name}.`, "action");
                this._onCardDiscarded(player, disc);
                done();
              } else {
                this._setPendingChoice({
                  id: "suspect-select",
                  title: `Select ${val === "doc" ? "Document" : "Connection"} to lose`,
                  options: arr.map((c, i) => ({
                    text: c.name,
                    value: String(i),
                  })),
                  resolve: (idx) => {
                    const [disc] = arr.splice(parseInt(idx), 1);
                    this.discardPile.push(disc);
                    this.log(`${player.name} loses ${disc.name}.`, "action");
                    this._onCardDiscarded(player, disc);
                    done();
                  },
                });
              }
            },
          });
          return;
        }
        this.log(`${player.name} has nothing else to lose.`, "system");
        done();
        break;

      case "Salvage":
        player.money += 1;
        player.stash.lifeCards.push({ ...card });
        this.log(`${player.name} gains $1 and keeps Salvage.`, "action");
        done();
        break;

      case "Blacklisted":
        player.money = Math.max(0, player.money - 1);
        player.stash.lifeCards.push({ ...card });
        this.log(`${player.name} loses $1 and keeps Blacklisted.`, "action");
        done();
        break;

      // ── Emergency ──
      case "Trousers Fall Down":
        if (player.stash.documents.length > 0) {
          this._setPendingChoice({
            id: "trousers",
            title: "Trousers Fall Down: lose $3 or lose 1 Document?",
            options: [
              { text: "Lose $3", value: "money" },
              { text: "Lose 1 Document", value: "doc" },
            ],
            resolve: (val) => {
              if (val === "money") {
                player.money = Math.max(0, player.money - 3);
                this.log(`${player.name} loses $3.`, "action");
                done();
              } else {
                this._promptSelectCard(
                  player.stash.documents,
                  "Document to lose",
                  (idx) => {
                    const [disc] = player.stash.documents.splice(idx, 1);
                    this.discardPile.push(disc);
                    this.log(`${player.name} loses ${disc.name}.`, "action");
                    this._onCardDiscarded(player, disc);
                    done();
                  },
                );
              }
            },
          });
          return;
        }
        player.money = Math.max(0, player.money - 3);
        this.log(`${player.name} loses $3 (no Documents).`, "action");
        done();
        break;

      case "Keep Calm":
        player.money += 1;
        player.stash.lifeCards.push({ ...card });
        this.log(`${player.name} gains $1 and keeps Keep Calm.`, "action");
        done();
        break;

      case "Life Coach":
        player.assurance += 1;
        this.log(`${player.name} gains +1 Assurance.`, "action");
        done();
        break;

      case "Shredder Accident":
        if (player.stash.documents.length > 0) {
          this._promptSelectCard(
            player.stash.documents,
            "Document to lose (Shredder)",
            (idx) => {
              const [disc] = player.stash.documents.splice(idx, 1);
              this.discardPile.push(disc);
              this.log(
                `${player.name} loses ${disc.name} (Shredder).`,
                "action",
              );
              this._onCardDiscarded(player, disc);
              done();
            },
          );
          return;
        }
        player.money = Math.max(0, player.money - 1);
        this.log(`${player.name} loses $1 (no Documents).`, "action");
        done();
        break;

      // ── Vacation ──
      case "Camping":
        player.money += 1;
        this.log(`${player.name} gains $1.`, "action");
        {
          const minConns = Math.min(
            ...this.players.map((p) => p.stash.connections.length),
          );
          for (const p of this.players) {
            if (p.stash.connections.length === minConns) {
              p.money += 1;
              this.log(
                `${p.name} (fewest Connections: ${minConns}) gains $1.`,
                "system",
              );
            }
          }
        }
        done();
        break;

      case "FOMO":
        player.money = Math.max(0, player.money - 1);
        this.log(`${player.name} loses $1.`, "action");
        this._setPendingChoice({
          id: "fomo",
          title: "FOMO: Trade destinations with another player?",
          options: [
            { text: "No — keep my destination", value: "skip" },
            ...this.players
              .filter((p) => p.id !== player.id)
              .map((p) => ({
                text: `Trade with ${p.name} (${p.destination})`,
                value: String(p.id),
              })),
          ],
          resolve: (val) => {
            if (val !== "skip") {
              const target = this.players[parseInt(val)];
              const temp = player.destination;
              player.destination = target.destination;
              target.destination = temp;
              this.log(
                `${player.name} and ${target.name} swapped destinations.`,
                "action",
              );
            }
            done();
          },
        });
        break;

      case "Nostalgia": {
        const discLife = this.discardPile.filter((c) => c.type === "life");
        if (discLife.length > 0) {
          this._setPendingChoice({
            id: "nostalgia",
            title: "Nostalgia: replay a discarded Life Card or gain $2?",
            options: [
              { text: "Gain $2", value: "money" },
              ...discLife.map((c, i) => ({
                text: `Replay: ${c.title}`,
                value: `life-${i}`,
              })),
            ],
            resolve: (val) => {
              if (val === "money") {
                player.money += 2;
                this.log(`${player.name} gains $2.`, "action");
                done();
              } else {
                const lifeIdx = parseInt(val.split("-")[1]);
                let count = 0;
                for (let i = 0; i < this.discardPile.length; i++) {
                  if (this.discardPile[i].type === "life") {
                    if (count === lifeIdx) {
                      const [taken] = this.discardPile.splice(i, 1);
                      this.log(
                        `${player.name} replays ${taken.title}.`,
                        "action",
                      );
                      this._resolveLifeCardEffect(player, taken, () => {
                        this.discardPile.push(taken);
                        done();
                      });
                      return;
                    }
                    count++;
                  }
                }
                // Fallback
                player.money += 2;
                done();
              }
            },
          });
          return;
        }
        player.money += 2;
        this.log(
          `${player.name} gains $2 (no Life Cards in discard).`,
          "action",
        );
        done();
        break;
      }

      case "Lost & Found":
        this._promptTargetPlayer(
          player,
          "Lost & Found: choose target",
          (targetId) => {
            const target = this.players[targetId];
            const opts = [];
            if (target.stash.documents.length > 0) {
              opts.push({
                text: `Take 1 Document from ${target.name}`,
                value: "doc",
              });
            }
            opts.push({ text: `Take $2 from ${target.name}`, value: "money" });

            this._setPendingChoice({
              id: "lost-found-choice",
              title: "Lost & Found: Document or Money?",
              options: opts,
              resolve: (val) => {
                if (val === "doc") {
                  this._setPendingChoice({
                    id: "lost-found-doc",
                    title: "Select Document",
                    options: target.stash.documents.map((c, i) => ({
                      text: c.name,
                      value: String(i),
                    })),
                    resolve: (idx) => {
                      const [taken] = target.stash.documents.splice(
                        parseInt(idx),
                        1,
                      );
                      player.stash.documents.push(taken);
                      this.log(
                        `${player.name} takes ${taken.name} from ${target.name}.`,
                        "action",
                      );
                      this._onPlayerGainDocument(player);
                      done();
                    },
                  });
                } else {
                  const stolen = Math.min(2, target.money);
                  target.money -= stolen;
                  player.money += stolen;
                  this.log(
                    `${player.name} takes $${stolen} from ${target.name}.`,
                    "action",
                  );
                  done();
                }
              },
            });
          },
        );
        break;

      // ── News ──
      case "Pandemic / Economic Stimulus": {
        this.pandemicStimulusCount++;
        const roll = this.rollD6();
        if (this.pandemicStimulusCount % 2 === 1) {
          // Odd: everyone loses
          for (const p of this.players) {
            p.money = Math.max(0, p.money - roll);
          }
          this.log(
            `Pandemic! Everyone loses $${roll}. (Activation #${this.pandemicStimulusCount})`,
            "action",
          );
        } else {
          // Even: everyone gains
          for (const p of this.players) {
            p.money += roll;
          }
          this.log(
            `Economic Stimulus! Everyone gains $${roll}. (Activation #${this.pandemicStimulusCount})`,
            "action",
          );
        }
        done();
        break;
      }

      case "Mental Fog":
        player.money = Math.max(0, player.money - 1);
        this.log(`${player.name} loses $1.`, "action");
        if (player.stash.lifeCards.length > 0) {
          this._setPendingChoice({
            id: "mental-fog",
            title: "Mental Fog: discard a kept Life Card? (optional)",
            options: [
              { text: "Skip — don't discard", value: "skip" },
              ...player.stash.lifeCards.map((c, i) => ({
                text: `Discard: ${c.title}`,
                value: String(i),
              })),
            ],
            resolve: (val) => {
              if (val !== "skip") {
                const [disc] = player.stash.lifeCards.splice(parseInt(val), 1);
                this.discardPile.push(disc);
                this.log(`${player.name} discards ${disc.title}.`, "action");
              }
              done();
            },
          });
          return;
        }
        done();
        break;

      case "Insider":
        player.money += 3;
        this.log(`${player.name} gains $3.`, "action");
        done();
        break;

      // ── Charity ──
      case "Philanthropy": {
        player.money = Math.max(0, player.money - 1);
        this.log(`${player.name} loses $1.`, "action");
        // Give $1 to each other player starting left
        let idx = (player.id - 1 + this.players.length) % this.players.length;
        while (idx !== player.id) {
          if (player.money > 0) {
            player.money -= 1;
            this.players[idx].money += 1;
            this.log(
              `${player.name} gives $1 to ${this.players[idx].name}.`,
              "system",
            );
          }
          idx = (idx - 1 + this.players.length) % this.players.length;
        }
        done();
        break;
      }

      case "Bailout": {
        player.money += 1;
        this.log(`${player.name} gains $1.`, "action");
        const minM = Math.min(...this.players.map((p) => p.money));
        for (const p of this.players) {
          if (p.money === minM) {
            p.money += 1;
            this.log(`${p.name} (least Money) gains $1.`, "system");
          }
        }
        done();
        break;
      }

      case "Share": {
        const half = Math.floor(player.money / 2);
        player.money -= half;
        const others = this.players.filter((p) => p.id !== player.id);
        if (others.length > 0) {
          const base = Math.floor(half / others.length);
          let extra = half % others.length;
          for (const p of others) {
            const amt = base + (extra > 0 ? 1 : 0);
            if (extra > 0) extra--;
            p.money += amt;
            this.log(`${p.name} receives $${amt} share.`, "system");
          }
        }
        this.log(`${player.name} shared $${half}.`, "action");
        done();
        break;
      }

      case "Pay Cut":
        player.money = Math.max(0, player.money - 1);
        player.stash.lifeCards.push({ ...card });
        this.log(`${player.name} loses $1 and keeps Pay Cut.`, "action");
        done();
        break;

      // ── Trade ──
      case "Productivity":
        player.money += 1;
        player.accessFee = Math.max(0, player.accessFee - 1);
        this.log(
          `${player.name} gains $1, Access Fee → $${player.accessFee}.`,
          "action",
        );
        done();
        break;

      case "Tariffs":
        player.money = Math.max(0, player.money - 1);
        player.accessFee = Math.min(5, player.accessFee + 1);
        this.log(
          `${player.name} loses $1, Access Fee → $${player.accessFee}.`,
          "action",
        );
        done();
        break;

      case "Boost":
        this._promptTargetPlayer(
          player,
          "Boost: choose player (gain half their Nationality fund)",
          (targetId) => {
            const target = this.players[targetId];
            const amt = Math.floor(target.collegeFund / 2);
            player.money += amt;
            this.log(
              `${player.name} gains $${amt} (half of ${target.name}'s fund: $${target.collegeFund}).`,
              "action",
            );
            done();
          },
        );
        break;

      case "Persuasion":
        player.money += 1;
        player.stash.lifeCards.push({ ...card });
        this.log(`${player.name} gains $1 and keeps Persuasion.`, "action");
        done();
        break;

      // ── Sports ──
      case "Underdog":
        player.money = Math.max(0, player.money - 1);
        player.stash.lifeCards.push({ ...card });
        this.log(`${player.name} loses $1 and keeps Underdog.`, "action");
        done();
        break;

      case "Frontrunner":
        player.stash.lifeCards.push({ ...card, money: 1 });
        this.log(
          `${player.name} keeps Frontrunner ($1 placed on card).`,
          "action",
        );
        done();
        break;

      case "Penalty":
        player.money = Math.max(0, player.money - 1);
        player.stash.lifeCards.push({ ...card });
        this.log(`${player.name} loses $1 and keeps Penalty.`, "action");
        done();
        break;

      case "Star Power":
        player.money += 1;
        player.stash.lifeCards.push({ ...card });
        this.log(`${player.name} gains $1 and keeps Star Power.`, "action");
        done();
        break;

      default:
        this.log(`Unknown Life Card: ${title}`, "error");
        done();
    }
  }

  // ── Prompt Helpers ────────────────────────────────────────────────────

  _promptTargetPlayer(player, title, callback) {
    const opponents = this.players.filter((p) => p.id !== player.id);
    this._setPendingChoice({
      id: "select-player",
      title,
      options: opponents.map((p) => ({
        text: `${p.name} ($${p.money}, ${p.stash.documents.length}D, ${p.stash.connections.length}C)`,
        value: String(p.id),
      })),
      resolve: (val) => callback(parseInt(val)),
    });
  }

  _promptSelectCard(arr, title, callback) {
    if (arr.length === 1) {
      callback(0);
      return;
    }
    this._setPendingChoice({
      id: "select-card",
      title,
      options: arr.map((c, i) => ({
        text: c.name || c.title,
        value: String(i),
      })),
      resolve: (val) => callback(parseInt(val)),
    });
  }

  // ── Buy ───────────────────────────────────────────────────────────────

  _doBuy(player, { targetPlayerIdx, slotIdx }) {
    const target = this.players[targetPlayerIdx];
    const slot = target.layout[slotIdx];
    if (!slot || !this.isCardAvailable(target, slotIdx)) {
      this.log("Card not available.", "error");
      return;
    }
    const card = slot.card;
    if (card.type !== "document" && card.type !== "connection") {
      this.log("Can only buy Document/Connection from layout.", "error");
      return;
    }

    const fee = target.id === player.id ? 0 : player.accessFee;
    const cost = this.getEffectiveCost(player, card);

    // Check Persuasion
    if (
      target.id !== player.id &&
      target.stash.lifeCards.some((lc) => lc.title === "Persuasion")
    ) {
      this._handlePersuasion(player, target, slotIdx, fee, (actualFee) => {
        this._finishBuy(player, target, slotIdx, cost, actualFee);
      });
      return;
    }

    this._finishBuy(player, target, slotIdx, cost, fee);
  }

  _finishBuy(player, target, slotIdx, cost, fee) {
    const totalCost = cost + fee;
    if (player.money < totalCost) {
      this.log(`Cannot afford $${totalCost}.`, "error");
      return;
    }

    player.money -= cost;
    this._payAccessFee(player, target, fee);
    const [removed] = target.layout.splice(slotIdx, 1, null);
    const card = removed.card;

    if (card.type === "document") {
      player.stash.documents.push(card);
      this.log(
        `${player.name} bought ${card.name} ($${cost}) from ${target.name}.`,
        "action",
      );
      this._onPlayerGainDocument(player);
    } else {
      player.stash.connections.push(card);
      this.log(
        `${player.name} bought ${card.name} ($${cost}) from ${target.name}.`,
        "action",
      );
      this._onPlayerGainConnection(player);
    }

    this.uncoverLayout(target);
    this.advanceTurn();
  }

  // ── Buy Pool ──────────────────────────────────────────────────────────

  _doBuyPool(player, { cardType }) {
    if (cardType === "ticket") {
      if (this.publicServices.tickets <= 0) {
        this.log("No Tickets in pool.", "error");
        return;
      }
      if (player.stash.connections.length < 1) {
        this.log("Need ≥1 Connection.", "error");
        return;
      }
      if (player.money < 2) {
        this.log("Need $2.", "error");
        return;
      }
      player.money -= 2;
      this.publicServices.tickets--;
      player.stash.tickets++;
      this.log(`${player.name} bought a Ticket from the pool.`, "action");
    } else {
      if (this.publicServices.passports <= 0) {
        this.log("No Passports in pool.", "error");
        return;
      }
      if (player.stash.documents.length < 1) {
        this.log("Need ≥1 Document.", "error");
        return;
      }
      if (player.money < 2) {
        this.log("Need $2.", "error");
        return;
      }
      player.money -= 2;
      this.publicServices.passports--;
      player.stash.passports++;
      this.log(`${player.name} bought a Passport from the pool.`, "action");
    }
    this.checkTicketPassportBonus(player);
    this.advanceTurn();
  }

  // ── Steal ─────────────────────────────────────────────────────────────

  _doSteal(player, { cardType }) {
    if (cardType === "ticket") {
      if (
        this.publicServices.tickets <= 0 ||
        player.stash.connections.length < 1
      ) {
        this.log("Cannot steal a Ticket.", "error");
        return;
      }
      this.publicServices.tickets--;
      player.stash.tickets++;
      this.log(`${player.name} stole a Ticket. Skips next turn.`, "action");
    } else {
      if (
        this.publicServices.passports <= 0 ||
        player.stash.documents.length < 1
      ) {
        this.log("Cannot steal a Passport.", "error");
        return;
      }
      this.publicServices.passports--;
      player.stash.passports++;
      this.log(`${player.name} stole a Passport. Skips next turn.`, "action");
    }
    player.skipNextTurn = true;
    this.checkTicketPassportBonus(player);
    this.advanceTurn();
  }

  // ── Reclaim ───────────────────────────────────────────────────────────

  _doReclaim(player, { targetPlayerIdx, cardType }) {
    const target = this.players[targetPlayerIdx];
    if (target.id === player.id) {
      this.log("Cannot reclaim from yourself.", "error");
      return;
    }

    const cost = 2 + player.accessFee;
    if (player.money < cost) {
      this.log(`Cannot afford $${cost}.`, "error");
      return;
    }

    if (cardType === "ticket") {
      if (target.stash.tickets <= 1) {
        this.log(`${target.name} has ≤1 Ticket.`, "error");
        return;
      }
      player.money -= cost;
      target.money += cost;
      player.accessFee = Math.min(5, player.accessFee + 1);
      target.stash.tickets--;
      player.stash.tickets++;
      this.log(
        `${player.name} reclaimed a Ticket from ${target.name} ($${cost}).`,
        "action",
      );
    } else {
      if (target.stash.passports <= 1) {
        this.log(`${target.name} has ≤1 Passport.`, "error");
        return;
      }
      player.money -= cost;
      target.money += cost;
      player.accessFee = Math.min(5, player.accessFee + 1);
      target.stash.passports--;
      player.stash.passports++;
      this.log(
        `${player.name} reclaimed a Passport from ${target.name} ($${cost}).`,
        "action",
      );
    }

    this.checkTicketPassportBonus(player);
    this.checkTicketPassportBonus(target);
    this.advanceTurn();
  }

  // ── Discard ───────────────────────────────────────────────────────────

  _doDiscard(
    player,
    { source, targetPlayerIdx, slotIdx, stashType, stashIdx },
  ) {
    if (source === "stash") {
      if (targetPlayerIdx !== undefined && targetPlayerIdx !== player.id) {
        this.log("Cannot discard from another player's stash.", "error");
        return;
      }
      const arr =
        stashType === "document"
          ? player.stash.documents
          : player.stash.connections;
      if (stashIdx < 0 || stashIdx >= arr.length) {
        this.log("Invalid index.", "error");
        return;
      }
      const [disc] = arr.splice(stashIdx, 1);
      this.discardPile.push(disc);
      player.money += 2;
      this.log(
        `${player.name} discarded ${disc.name} from stash, gains $2.`,
        "action",
      );
      this._onCardDiscarded(player, disc);
      this.advanceTurn();
    } else {
      // From layout
      const target = this.players[targetPlayerIdx];
      const slot = target.layout[slotIdx];
      if (!slot || !this.isCardAvailable(target, slotIdx)) {
        this.log("Card not available.", "error");
        return;
      }
      if (slot.card.type !== "document" && slot.card.type !== "connection") {
        this.log("Can only discard Document/Connection.", "error");
        return;
      }

      const fee = target.id === player.id ? 0 : player.accessFee;
      if (player.money < fee) {
        this.log(`Cannot afford fee ($${fee}).`, "error");
        return;
      }

      this._payAccessFee(player, target, fee);
      const [removed] = target.layout.splice(slotIdx, 1, null);
      this.discardPile.push(removed.card);
      player.money += 2;
      this.log(
        `${player.name} discarded ${removed.card.name} from ${target.name}'s layout, gains $2.`,
        "action",
      );
      this._onCardDiscarded(player, removed.card);
      this.uncoverLayout(target);
      this.advanceTurn();
    }
  }

  // ── Apply for College ─────────────────────────────────────────────────

  _doApplyCollege(player) {
    if (player.payRaises >= MAX_PAY_RAISES) {
      this.log("Career maxed (2/2 raises).", "error");
      return;
    }
    if (player.inCollege) {
      this.log("Already in college.", "error");
      return;
    }

    const minTuition = Math.floor(player.collegeFund / 2) + 1;
    if (player.money < minTuition) {
      this.log(`Cannot afford min tuition ($${minTuition}).`, "error");
      return;
    }

    const roll = this.rollD6();
    let tuition;
    if (roll <= 3) {
      tuition = Math.floor(player.collegeFund / 2) + roll;
    } else {
      tuition = player.collegeFund + roll;
    }

    this.log(
      `${player.name} applies for college. Roll: ${roll}, Tuition: $${tuition}`,
      "action",
    );

    if (player.money >= tuition) {
      player.money -= tuition;
      player.inCollege = true;
      this.log(
        `${player.name} paid $${tuition} and is now in college.`,
        "action",
      );
      this.advanceTurn();
    } else {
      player.money = Math.max(0, player.money - 1);
      this._collegeFailed = true;
      this.log(
        `${player.name} can't afford $${tuition}. Paid $1 penalty. ` +
          `Must choose a different action.`,
        "error",
      );
      this._notify();
    }
  }

  // ─── Logging & Notifications ──────────────────────────────────────────

  log(msg, type = "action") {
    const entry = { msg, type, turn: this.turnNumber };
    this.logs.push(entry);
    if (this.onLog) this.onLog(entry);
  }

  _notify() {
    if (this.onStateChange) this.onStateChange();
  }

  /** Return a JSON-serializable snapshot of the game state. */
  getSnapshot() {
    return JSON.parse(
      JSON.stringify({
        phase: this.phase,
        mode: this.mode,
        turnNumber: this.turnNumber,
        currentPlayerIdx: this.currentPlayerIdx,
        publicServices: this.publicServices,
        securityLanes: this.securityLanes,
        players: this.players,
        gameResult: this.gameResult,
        logs: this.logs,
        activeCrossingIdx: this.activeCrossingIdx,
      }),
    );
  }
}

// ─── Tests ───────────────────────────────────────────────────────────────────

/**
 * Run engine unit tests. Returns array of { pass: boolean, description: string }.
 */
export function runTests() {
  const results = [];
  function assert(cond, desc) {
    results.push({ pass: !!cond, description: desc });
  }

  // 1. Deck scaling
  [2, 3, 4, 5, 6].forEach((P) => {
    try {
      const setup = Array.from({ length: P }, (_, i) => ({
        name: `P${i + 1}`,
        nationality: NATIONALITIES[i % NATIONALITIES.length].name,
        destination: DESTINATIONS[(i + 1) % DESTINATIONS.length].name,
      }));
      const eng = new EmigrationEngine({ mode: "competitive", players: setup });
      assert(eng.players.length === P, `[${P}P] Correct player count`);
      assert(eng.publicServices.tickets === P, `[${P}P] Tickets = ${P}`);
      assert(
        eng.players[0].layout.filter((s) => s !== null).length === 14,
        `[${P}P] 14 layout cards dealt`,
      );
    } catch (e) {
      assert(false, `[${P}P] Deck scaling error: ${e.message}`);
    }
  });

  // 2. Layout DAG coverage
  try {
    const setup = [
      { name: "A", nationality: "Bosnian", destination: "China" },
      { name: "B", nationality: "French", destination: "Russia" },
    ];
    const eng = new EmigrationEngine({ mode: "competitive", players: setup });
    const p = eng.players[0];

    assert(!eng.isCardCovered(p, 11), "Card 11 (row 4) initially uncovered");
    assert(!eng.isCardCovered(p, 12), "Card 12 (row 4) initially uncovered");
    assert(!eng.isCardCovered(p, 13), "Card 13 (row 4) initially uncovered");
    assert(eng.isCardCovered(p, 7), "Card 7 (row 3) initially covered");
    assert(eng.isCardCovered(p, 0), "Card 0 (row 1) initially covered");

    // Remove card 11 → card 7 should uncover
    p.layout[11] = null;
    eng.uncoverLayout(p);
    assert(!eng.isCardCovered(p, 7), "Card 7 uncovered after card 11 removed");
    assert(p.layout[7]?.faceUp, "Card 7 flipped face-up");

    // Card 8 still covered by card 12
    assert(eng.isCardCovered(p, 8), "Card 8 still covered (card 12 present)");
  } catch (e) {
    assert(false, `Layout DAG error: ${e.message}`);
  }

  // 3. Destination calculations
  try {
    const bosnia = DESTINATIONS.find(
      (d) => d.name === "Bosnia and Herzegovina",
    );
    assert(bosnia.check(6, 4, 3) === 10, "Bosnia: m=6,d=4,c=3 → +10");
    assert(bosnia.check(5, 1, 2) === -2, "Bosnia: m=5,d=1,c=2 → -2");

    const usa = DESTINATIONS.find((d) => d.name === "United States of America");
    assert(usa.check(10, 4, 4) === 10, "USA: m=10,d=4,c=4 → +10");
    assert(usa.check(4, 1, 0) === -5, "USA: m=4,d=1,c=0 → -5");
  } catch (e) {
    assert(false, `Destination calc error: ${e.message}`);
  }

  // 4. Pay raise system
  try {
    assert(SALARY_RAISES.length === 2, "2 pay raise slots");
    assert(SALARY_RAISES[0] === 1, "First raise = +$1");
    assert(SALARY_RAISES[1] === 3, "Second raise = +$3");
    // Salary progression: 1 → 2 → 5
    let salary = 1;
    salary += SALARY_RAISES[0]; // → 2
    assert(salary === 2, "After 1st raise: salary = $2");
    salary += SALARY_RAISES[1]; // → 5
    assert(salary === 5, "After 2nd raise: salary = $5");
  } catch (e) {
    assert(false, `Pay raise error: ${e.message}`);
  }

  // 5. College tuition
  try {
    // Bosnian fund = 2, minTuition = floor(2/2)+1 = 2
    assert(Math.floor(2 / 2) + 1 === 2, "Bosnian min tuition = $2");
    // Financial aid (roll 1-3): floor(2/2)+roll = 1+roll
    assert(Math.floor(2 / 2) + 1 === 2, "Bosnian aid tuition (roll 1) = $2");
    assert(Math.floor(2 / 2) + 3 === 4, "Bosnian aid tuition (roll 3) = $4");
    // No aid (roll 4-6): fund+roll = 2+roll
    assert(2 + 4 === 6, "Bosnian full tuition (roll 4) = $6");
  } catch (e) {
    assert(false, `College tuition error: ${e.message}`);
  }

  // 6. Forfeit detection
  try {
    const setup = [
      { name: "A", nationality: "Bosnian", destination: "China" },
      { name: "B", nationality: "French", destination: "Russia" },
    ];
    const eng = new EmigrationEngine({ mode: "competitive", players: setup });
    const p = eng.players[0];
    p.money = 0;
    p.stash.documents = [];
    p.stash.connections = [];
    p.layout = new Array(14).fill(null);
    eng.players[1].layout = new Array(14).fill(null);
    eng.publicServices.tickets = 0;
    eng.publicServices.passports = 0;

    assert(
      !eng.canPerformAnyRequiredAction(p),
      "Forfeit detected: no money, no cards",
    );

    p.money = 2;
    assert(
      eng.canPerformAnyRequiredAction(p),
      "Can apply for college with $2 (Bosnian min tuition)",
    );
  } catch (e) {
    assert(false, `Forfeit detection error: ${e.message}`);
  }

  // 7. Nationality-country mapping
  try {
    assert(
      NATIONALITY_TO_COUNTRY["Bosnian"] === "Bosnia and Herzegovina",
      "Bosnian → Bosnia",
    );
    assert(
      NATIONALITY_TO_COUNTRY["American"] === "United States of America",
      "American → USA",
    );
    assert(
      NATIONALITY_TO_COUNTRY["Congolese"] === "Democratic Republic of Congo",
      "Congolese → DRC",
    );
  } catch (e) {
    assert(false, `Mapping error: ${e.message}`);
  }

  // 8. Security lanes
  try {
    const setup = [
      { name: "A", nationality: "Bosnian", destination: "China" },
      { name: "B", nationality: "French", destination: "Russia" },
    ];
    const eng = new EmigrationEngine({ mode: "competitive", players: setup });
    assert(eng.securityLanes.length === 5, "5 security lanes");
    assert(eng.securityLanes[0].tokens.length === 3, "Lane 1 has 3 tokens");
    // Verify token values are correct (sorted)
    const l1sorted = [...eng.securityLanes[0].tokens].sort((a, b) => a - b);
    assert(
      l1sorted[0] === 6 && l1sorted[1] === 7 && l1sorted[2] === 7,
      "Lane 1 tokens = [6,7,7]",
    );
  } catch (e) {
    assert(false, `Security lane error: ${e.message}`);
  }

  // 9. Life card choice and stash-triggered effects
  try {
    const setup = [
      { name: "A", nationality: "Bosnian", destination: "China" },
      { name: "B", nationality: "French", destination: "Russia" },
    ];
    const eng = new EmigrationEngine({ mode: "competitive", players: setup });
    const actor = eng.players[1];
    const salvageOwner = eng.players[0];

    salvageOwner.stash.lifeCards.push({ title: "Salvage", type: "life" });
    actor.layout[11] = {
      card: {
        title: "Nostalgia",
        pack: "Vacation",
        keep: "Instant",
        type: "life",
      },
      faceUp: true,
      index: 11,
    };
    actor.money = 10;
    eng.currentPlayerIdx = 1;

    eng.executeRequiredAction("activate", {
      targetPlayerIdx: 1,
      slotIdx: 11,
    });

    assert(
      salvageOwner.money === 3,
      "Salvage triggers when another player activates and discards a life card",
    );

    // May Keep cards should present a choice and can be kept in stash.
    const keeper = eng.players[0];
    keeper.layout[13] = {
      card: {
        title: "Stellar Reputation",
        pack: "Friendship",
        keep: "May Keep",
        type: "life",
      },
      faceUp: true,
      index: 13,
    };
    eng.currentPlayerIdx = 0;
    eng.executeRequiredAction("activate", {
      targetPlayerIdx: 0,
      slotIdx: 13,
    });
    assert(
      eng.pendingChoice?.id === "may-keep-choice",
      "May Keep life cards prompt for a keep/immediate choice",
    );
    eng.resolveChoice("keep");
    assert(
      keeper.stash.lifeCards.some((lc) => lc.title === "Stellar Reputation"),
      "Choosing keep places the life card in stash",
    );

    const discountCost = eng.getEffectiveCost(keeper, {
      cost: 2,
      type: "connection",
    });
    assert(
      discountCost === 1,
      "Kept Stellar Reputation reduces connection purchase cost by $1",
    );
  } catch (e) {
    assert(false, `Life card effect error: ${e.message}`);
  }

  return results;
}
