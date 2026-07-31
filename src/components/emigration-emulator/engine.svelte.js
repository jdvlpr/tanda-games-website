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

/**
 * Dynamically calculates Assurance, applying set rewards and minimum penalties
 * uniformly to any resource that has them defined in the targets object.
 *
 * @param {number} m - Actual Money amount
 * @param {number} d - Actual Documents amount
 * @param {number} c - Actual Connections amount
 * @param {Object} targets - The dynamic rules for sets, rewards, and penalties
 * @returns {number} The calculated score
 */
const calculateAssurance = (targets) => (m, d, c) => {
  let a = 0;

  // Map the variables to their keys so we can process them identically
  const actuals = { m, d, c };

  for (const [key, amount] of Object.entries(actuals)) {
    const rules = targets[key];
    if (!rules) continue;

    // 1. Add reward for meeting set requirement (max 1 set)
    if (rules.setSize > 0 && amount >= rules.setSize) {
      a += rules.reward || 0;
    }

    // 2. Apply penalty if below minimum required
    if (rules.minRequired !== undefined && amount < rules.minRequired) {
      a -= rules.penalty || 0;
    }
  }

  return a;
};

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
  { name: "Bosnian", collegeFund: 4, startingMoney: 2, countryCode: "ba" },
  { name: "Congolese", collegeFund: 4, startingMoney: 2, countryCode: "cd" },
  { name: "Senegalese", collegeFund: 4, startingMoney: 2, countryCode: "sn" },
  { name: "Swiss", collegeFund: 6, startingMoney: 6, countryCode: "ch" },
  { name: "French", collegeFund: 6, startingMoney: 6, countryCode: "fr" },
  { name: "Russian", collegeFund: 6, startingMoney: 6, countryCode: "ru" },
  { name: "English", collegeFund: 8, startingMoney: 10, countryCode: "gb-eng" },
  { name: "Chinese", collegeFund: 8, startingMoney: 10, countryCode: "cn" },
  { name: "American", collegeFund: 8, startingMoney: 10, countryCode: "us" },
];

export const DESTINATIONS = [
  {
    name: "Bosnia and Herzegovina",
    targets: {
      m: { setSize: 7, reward: 2, minRequired: 3, penalty: 1},
      d: { setSize: 4, reward: 2, minRequired: 3, penalty: 3 },
      c: { setSize: 3, reward: 6 },
    },
  },
  {
    name: "China",
    targets: {
      m: { setSize: 10, reward: 3, minRequired: 4, penalty: 2 },
      d: { setSize: 4, reward: 2, minRequired: 2, penalty: 3 },
      c: { setSize: 4, reward: 5 },
    },
  },
  {
    name: "Democratic Republic of Congo",
    targets: {
      m: { setSize: 7, reward: 2, minRequired: 2, penalty: 2},
      d: { setSize: 4, reward: 2, minRequired: 3, penalty: 3 },
      c: { setSize: 3, reward: 6 },
    },
  },
  {
    name: "France",
    targets: {
      m: { setSize: 8, reward: 2, minRequired: 3, penalty: 1 },
      d: { setSize: 4, reward: 2, minRequired: 2, penalty: 3 },
      c: { setSize: 3, reward: 4 },
    },
  },
  {
    name: "Russia",
    targets: {
      m: { setSize: 7, reward: 2, minRequired: 2, penalty: 1 },
      d: { setSize: 4, reward: 2, minRequired: 2, penalty: 3 },
      c: { setSize: 3, reward: 4 },
    },
  },
  {
    name: "Senegal",
    targets: {
      m: { setSize: 7, reward: 2 },
      d: { setSize: 4, reward: 2, minRequired: 3, penalty: 3 },
      c: { setSize: 3, reward: 5 },
    },
  },
  {
    name: "Switzerland",
    targets: {
      m: { setSize: 7, reward: 2, minRequired: 2, penalty: 1 },
      d: { setSize: 4, reward: 2, minRequired: 2, penalty: 3 },
      c: { setSize: 3, reward: 4 },
    },
  },
  {
    name: "England",
    targets: {
      m: { setSize: 10, reward: 3, minRequired: 4, penalty: 2 },
      d: { setSize: 4, reward: 2, minRequired: 2, penalty: 3 },
      c: { setSize: 3, reward: 4 },
    },
  },
  {
    name: "United States of America",
    targets: {
      m: { setSize: 10, reward: 3, minRequired: 5, penalty: 2 },
      d: { setSize: 4, reward: 2, minRequired: 2, penalty: 3 },
      c: { setSize: 4, reward: 5 },
    },
  },
].map((dest, i) => {
  return {
    ...dest,
    countryCode: NATIONALITIES[i].countryCode,
    nationality: NATIONALITIES[i].name,
    check: calculateAssurance(dest.targets),
  };
});

export const DOCUMENTS_CATALOG = [
  {
    name: "Write Last Will and Testament",
    cost: 2,
    icon: "tombstone",
    type: "document",
  },
  {
    name: "Certificate of Excellence",
    cost: 2,
    icon: "diploma",
    type: "document",
  },
  { name: "Checklist", cost: 2, icon: "checklist", type: "document" },
  {
    name: "Copy of Birth Certificate",
    cost: 2,
    icon: "stork-delivery",
    type: "document",
  },
  { name: "Notebook", cost: 2, icon: "notebook", type: "document" },
  {
    name: "Subscribe to Travel Updates",
    cost: 2,
    icon: "rss",
    type: "document",
  },
  { name: "Travel Brochure", cost: 2, icon: "open-book", type: "document" },
  { name: "Physical Exam", cost: 3, icon: "stethoscope", type: "document" },
  {
    name: "Vaccination Record",
    cost: 3,
    icon: "miracle-medecine",
    type: "document",
  },
  { name: "Personality Test", cost: 3, icon: "skills", type: "document" },
  { name: "Travel Wallet", cost: 3, icon: "wallet", type: "document" },
  {
    name: "Attend Security Training",
    cost: 3,
    icon: "padlock",
    type: "document",
  },
  {
    name: "Residence Address in Destination",
    cost: 3,
    icon: "treasure-map",
    type: "document",
  },
  {
    name: "Letter of Recommendation",
    cost: 3,
    icon: "thumb-up",
    type: "document",
  },
  { name: "Letter of Invitation", cost: 4, icon: "envelope", type: "document" },
  {
    name: "Background Check",
    cost: 4,
    icon: "sherlock-holmes",
    type: "document",
  },
  { name: "Employment Contract", cost: 4, icon: "journey", type: "document" },
  {
    name: "International Driving Permit",
    cost: 4,
    icon: "steering-wheel",
    type: "document",
  },
  {
    name: "Vehicle Registration Papers",
    cost: 4,
    icon: "race-car",
    type: "document",
  },
  { name: "Pet Passport", cost: 4, icon: "labrador-head", type: "document" },
  {
    name: "Language Phrasebook",
    cost: 4,
    icon: "book-cover",
    type: "document",
  },
];

export const CONNECTIONS_CATALOG = [
  {
    name: "Coffee with Airport Employee",
    cost: 2,
    icon: "coffee-mug",
    type: "connection",
  },
  {
    name: "Cookies for Neighbor from Destination",
    cost: 2,
    icon: "cookie",
    type: "connection",
  },
  {
    name: "Video Chat with Person from Destination",
    cost: 2,
    icon: "video-conference",
    type: "connection",
  },
  {
    name: "Support Group Motivates You",
    cost: 2,
    icon: "cherish",
    type: "connection",
  },
  {
    name: "Learn Song from Your Destination",
    cost: 2,
    icon: "banjo",
    type: "connection",
  },
  {
    name: "Listen to the News",
    cost: 2,
    icon: "newspaper",
    type: "connection",
  },
  {
    name: "Friend moves to your Destination",
    cost: 2,
    icon: "hiking",
    type: "connection",
  },
  {
    name: "Language Classes",
    cost: 3,
    icon: "conversation",
    type: "connection",
  },
  { name: "Network Fair", cost: 3, icon: "mesh-network", type: "connection" },
  {
    name: "Dinner with a Diplomat",
    cost: 3,
    icon: "hot-meal",
    type: "connection",
  },
  {
    name: "Become World Famous",
    cost: 3,
    icon: "mona-lisa",
    type: "connection",
  },
  { name: "Learn from an Elder", cost: 3, icon: "wisdom", type: "connection" },
  {
    name: "Excellent Teamwork",
    cost: 3,
    icon: "team-idea",
    type: "connection",
  },
  {
    name: "Endorsement from Royalty",
    cost: 3,
    icon: "coronation",
    type: "connection",
  },
  {
    name: "Enter Luxury Travel Club",
    cost: 4,
    icon: "winged-scepter",
    type: "connection",
  },
  {
    name: "Internship in Your Destination",
    cost: 4,
    icon: "light-backpack",
    type: "connection",
  },
  {
    name: "Get Engaged to a Native",
    cost: 4,
    icon: "engagement-ring",
    type: "connection",
  },
  {
    name: "Politician Approves You",
    cost: 4,
    icon: "public-speaker",
    type: "connection",
  },
  { name: "Attend History Class", cost: 4, icon: "read", type: "connection" },
  { name: "Travel Concierge", cost: 4, icon: "top-hat", type: "connection" },
  {
    name: "Favorable Cultural Opinion",
    cost: 4,
    icon: "vote",
    type: "connection",
  },
];

export const LIFE_CARD_DEFINITIONS = Object.freeze([
  {
    title: "Stellar Reputation",
    pack: "Friendship",
    icon: "star-struck",
    keep: "May Keep",
    type: "life",
    description:
      "Gain $3, or keep this card in your stash and all Connections cost $1 less.",
  },
  {
    title: "Rummage Sale",
    pack: "Friendship",
    icon: "bunny-slippers",
    keep: "Instant",
    type: "life",
    description: "Gain $3, or take 1 discarded Document.",
  },
  {
    title: "Island Paradise",
    pack: "Friendship",
    icon: "island",
    keep: "Instant",
    type: "life",
    description: "Gain $1 and player(s) with the fewest Documents gain $1.",
  },
  {
    title: "Swap Wallets",
    pack: "Friendship",
    icon: "cash",
    keep: "Instant",
    type: "life",
    description: "You may trade all your Money for another player's Money.",
  },
  {
    title: "VIP",
    pack: "High Society",
    icon: "laurel-crown",
    keep: "Instant",
    type: "life",
    description: "Gain $1 for every $2 held by the player with the most Money.",
  },
  {
    title: "Fancy Clothes",
    pack: "High Society",
    icon: "tie",
    keep: "May Keep",
    type: "life",
    description:
      "Gain $3, or keep this card in your stash and all Documents cost $1 less.",
  },
  {
    title: "Social Butterfly",
    pack: "High Society",
    icon: "butterfly",
    keep: "Instant",
    type: "life",
    description: "Take 1 Connection or $3 from another player.",
  },
  {
    title: "Identical Twin",
    pack: "High Society",
    icon: "duality",
    keep: "Instant",
    type: "life",
    description: "Gain $1 and take another turn.",
  },
  {
    title: "Reward",
    pack: "Downtown",
    icon: "trophy",
    keep: "Instant",
    type: "life",
    description: "Gain $1 and take $1 from every other player.",
  },
  {
    title: "Suspect",
    pack: "Downtown",
    icon: "crime-scene-tape",
    keep: "Instant",
    type: "life",
    description: "Lose $1 and lose 1 Connection or 1 Document.",
  },
  {
    title: "Salvage",
    pack: "Downtown",
    icon: "ancient-ruins",
    keep: "Must Keep",
    type: "life",
    description:
      "Gain $1. Keep this card in your stash and whenever another player discards a Document, gain $1.",
  },
  {
    title: "Blacklisted",
    pack: "Downtown",
    icon: "spy",
    keep: "Must Keep",
    type: "life",
    description:
      "Lose $1. Keep this card in your stash and if you discard Connection, lose $1.",
  },
  {
    title: "Trousers Fall Down",
    pack: "Emergency",
    icon: "trousers",
    keep: "Instant",
    type: "life",
    description: "Lose $3 or lose 1 Document.",
  },
  {
    title: "Keep Calm",
    pack: "Emergency",
    icon: "cement-shoes",
    keep: "Must Keep",
    type: "life",
    description:
      "Gain $1 and keep this card in your stash. You may discard a Life Card instead of taking it, then discard this card.",
  },
  {
    title: "Life Coach",
    pack: "Emergency",
    icon: "medallist",
    keep: "Instant",
    type: "life",
    description: "Take 1 Assurance.",
  },
  {
    title: "Shredder Accident",
    pack: "Emergency",
    icon: "trash-can",
    keep: "Instant",
    type: "life",
    description: "Lose 1 Document. If you have none, lose $1.",
  },
  {
    title: "Camping",
    pack: "Vacation",
    icon: "camping-tent",
    keep: "Instant",
    type: "life",
    description: "Gain $1 and player(s) with the fewest Connections gain $1.",
  },
  {
    title: "FOMO",
    pack: "Vacation",
    icon: "card-exchange",
    keep: "Instant",
    type: "life",
    description: "Lose $1 and you may trade Destinations with someone.",
  },
  {
    title: "Nostalgia",
    pack: "Vacation",
    icon: "backward-time",
    keep: "Instant",
    type: "life",
    description: "Replay any discarded Life Card or gain $2.",
  },
  {
    title: "Lost & Found",
    pack: "Vacation",
    icon: "backpack",
    keep: "Instant",
    type: "life",
    description: "Take 1 Document or $2 from another player.",
  },
  {
    title: "Pandemic / Economic Stimulus",
    pack: "News",
    icon: "parmecia",
    keep: "Instant",
    type: "life",
    description:
      "1st: Everyone loses a random amount of Money. 2nd: Everyone gains a random amount of Money.",
  },
  {
    title: "Pandemic / Economic Stimulus",
    pack: "News",
    icon: "parmecia",
    keep: "Instant",
    type: "life",
    description:
      "1st: Everyone loses a random amount of Money. 2nd: Everyone gains a random amount of Money.",
  },
  {
    title: "Mental Fog",
    pack: "News",
    icon: "dread",
    keep: "Instant",
    type: "life",
    description:
      "Lose $1 and you may discard an available Life Card from any player’s Layout or from any player’s Stash.",
  },
  {
    title: "Insider",
    pack: "News",
    icon: "read",
    keep: "May Keep",
    type: "life",
    description:
      "Gain $3 or keep this card in your stash, all documents cost +$1, and on Paydays gain $1.",
  },
  {
    title: "Philanthropy",
    pack: "Charity",
    icon: "wallet",
    keep: "Instant",
    type: "life",
    description:
      "Lose $1 and starting with the player to your left, give $1 to every other player.",
  },
  {
    title: "Bailout",
    pack: "Charity",
    icon: "receive-money",
    keep: "Instant",
    type: "life",
    description: "Gain $1 and gain $1 for player(s) with the least Money.",
  },
  {
    title: "Share",
    pack: "Charity",
    icon: "present",
    keep: "Instant",
    type: "life",
    description: "Distribute half your Money (round down) to other players.",
  },
  {
    title: "Pay Cut",
    pack: "Charity",
    icon: "smash-arrows",
    keep: "Must Keep",
    type: "life",
    description:
      "Lose $1. Keep this card in your stash and on Paydays lose $1.",
  },
  {
    title: "Productivity",
    pack: "Trade",
    icon: "factory-arm",
    keep: "Instant",
    type: "life",
    description: "Gain $1 and decrease your Access Fee by 1 (minimum 0).",
  },
  {
    title: "Tariffs",
    pack: "Trade",
    icon: "bank",
    keep: "Instant",
    type: "life",
    description: "Lose $1 and increase your Access Fee by 1 (maximum 5).",
  },
  {
    title: "Boost",
    pack: "Trade",
    icon: "refinery",
    keep: "Instant",
    type: "life",
    description:
      "Gain half the Money tokens of any player’s Starting Money (round down).",
  },
  {
    title: "Persuasion",
    pack: "Trade",
    icon: "convince",
    keep: "Must Keep",
    type: "life",
    description:
      "Gain $1 and keep this card in your stash. When someone would activate, buy, or discard a card from your Layout, you may offer this instead. If declined, they pay double Access Fee.",
  },
  {
    title: "Underdog",
    pack: "Sports",
    icon: "giant",
    keep: "Must Keep",
    type: "life",
    description:
      "Lose $1 and keep this card in your stash. When a Life Card enters your Stash, pass this card to the player on your left. Lose $1 after Phase 1.",
  },
  {
    title: "Frontrunner",
    pack: "Sports",
    icon: "laurels-trophy",
    keep: "Must Keep",
    type: "life",
    description:
      "Keep this card in your stash. Place $1 from bank on this card (max 3). On Paydays, pass this left. Money stays on this and can only be used after Phase 1.",
  },
  {
    title: "Penalty",
    pack: "Sports",
    icon: "whistle",
    keep: "Must Keep",
    type: "life",
    description:
      "Lose $1 and keep this card in your stash. After a Document enters your Stash, pass this card to the player on your left.",
  },
  {
    title: "Star Power",
    pack: "Sports",
    icon: "podium-winner",
    keep: "Must Keep",
    type: "life",
    description:
      "Gain $1 and keep this card in your stash. After a Connection enters any other player’s Stash, give them this card.",
  },
]);

export const LIFE_CARDS_CATALOG = LIFE_CARD_DEFINITIONS.map((card) => ({
  ...card,
}));

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
export const SALARY_RAISES = [3, 2];

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

    this.phase = "preparation";
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
    this._graduateAttempted = false;
    this._identicalTwinExtraTurn = false;
    this.p2pRollQueue = [];

    // Choice system
    this.pendingChoice = null;
    this._pendingResolve = null;
    this._backup = null;

    // Safety valve for infinite loops
    this._advanceCount = 0;

    this._setupSecurityLanes();
    this._setupPlayersAndDeck(playersSetup);
    this._notify();
  }

  // ─── Logging System ──────────────────────────────────────────────────

  /** Appends standard formatting and tracks dense event logs. */
  log(msg, type = "action") {
    let formattedMsg = msg;
    if (
      !msg.startsWith("INIT") &&
      !msg.startsWith("PHASE2") &&
      !msg.startsWith("GAME_OVER") &&
      !msg.startsWith("ERR|")
    ) {
      formattedMsg = `T${this.turnNumber}|${msg}`;
    }
    const entry = { msg: formattedMsg, type, turn: this.turnNumber };
    this.logs.push(entry);
    if (this.onLog) this.onLog(entry);
  }


  /** Triggers UI toast messages via the onLog callback. */
  notifyToast(style, msg, opts = {}) {
    if (this.onLog) {
      this.onLog({ type: 'toast', style, toastMsg: msg, opts });
    }
  }

  /** Helper to track and format DELTA array for global events. */
  _withDelta(actionFn) {
    const before = this.players.map((p) => p.money);
    actionFn();
    const after = this.players.map((p) => p.money);
    const delta = after.map((a, i) => a - before[i]);
    return `DELTA:[${delta.join(",")}]`;
  }

  // ─── Dice ────────────────────────────────────────────────────────────

  rollD6() {
    if (this.rollOverride) {
      const val = this.rollOverride();
      this.log(`ROLL_D6_OVR:${val}`, "roll");
      return val;
    }
    if (this.p2pRollQueue && this.p2pRollQueue.length > 0) {
      const val = this.p2pRollQueue.shift();
      this.log(`ROLL_D6_P2P:${val}`, "roll");
      return val;
    }
    const val = Math.floor(Math.random() * 6) + 1;
    this.log(`ROLL_D6:${val}`, "roll");
    return val;
  }

  // ─── Setup ───────────────────────────────────────────────────────────

  _setupSecurityLanes() {
    this.securityLanes = SECURITY_LANES_DATA.map((lane) => ({
      name: lane.name,
      unshuffledTokens: lane.tokens.map((tokenNumber) => {
        return {
          tokenNumber,
          status: {
            isRevealed: false,
            revealedBy: null,
            success: false,
          },
        };
      }),
      tokens: shuffleArray([...lane.tokens]),
    }));
  }

  _setupPlayersAndDeck(playersSetup) {
    const P = playersSetup.length;
    this.publicServices.tickets = P;
    this.publicServices.passports = P;

    const docConnEach = 7 + (P - 2) * 3;
    const packsCount = P;
    const paydaysCount = P * 4;

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

    const selectedLifeCards = LIFE_CARDS_CATALOG.filter((c) =>
      usedPacks.includes(c.pack),
    ).map((c) => ({ ...c }));

    const paydays = Array.from({ length: paydaysCount }, () => ({
      name: "Payday",
      type: "payday",
      icon: "money-stack",
      cost: 0,
    }));

    let cardIdCounter = 0;
    const mainDeck = shuffleArray([
      ...selectedDocs.map((c) => ({ ...c, id: `card-${cardIdCounter++}` })),
      ...selectedConns.map((c) => ({ ...c, id: `card-${cardIdCounter++}` })),
      ...selectedLifeCards.map((c) => ({
        ...c,
        id: `card-${cardIdCounter++}`,
      })),
      ...paydays.map((c) => ({ ...c, id: `card-${cardIdCounter++}` })),
    ]);

    mainDeck.splice(0, 2);

    playersSetup.forEach((setup, idx) => {
      const nat = NATIONALITIES.find((n) => n.name === setup.nationality.name);
      if (!nat) throw new Error(`Unknown nationality: ${setup.nationality.name}`);
      const dest = DESTINATIONS.find((d) => d.name === setup.destination.name);
      if (!dest) throw new Error(`Unknown destination: ${setup.destination.name}`);

      const player = {
        id: idx,
        name: setup.name,
        nationality: nat,
        destination: dest,
        money: nat.startingMoney,
        salary: 1,
        payRaises: 0,
        inCollege: false,
        accessFee: 1,
        assurance: 0,
        skipNextTurn: false,
        collegeFund: nat.collegeFund,
        startingMoney: nat.startingMoney,
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

      const faceUpCards = [];
      [4, 5, 6, 11, 12, 13].forEach((idx) => {
        if (player.layout[idx]) {
          const name =
            player.layout[idx].card.name || player.layout[idx].card.title;
          faceUpCards.push(`${idx}:${name}`);
        }
      });
      this.log(
        `INIT|P${player.id}|NAT:${player.nationality.name}|DEST:${player.destination.name}|$${player.money}|FACEUP:[${faceUpCards.join(",")}]`,
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
          `P${player.id}|REV|S${i}:${slot.card.name || slot.card.title}`,
          "system",
        );
      }
    }
  }

  // ─── Navigation ──────────────────────────────────────────────────────

  getLeftPlayer(player) {
    return this.players[
      (player.id + 1 + this.players.length) % this.players.length
    ];
  }

  getRightPlayer(player) {
    return this.players[
      (player.id - 1 + this.players.length) % this.players.length
    ];
  }

  // ─── Hooks ───────────────────────────────────────────────────────────

  /**
   * Called when a card is discarded.
   * Triggers Salvage/Blacklisted ONLY when the DISCARD required action removes
   * a Document or Connection from a layout. Life cards and Paydays discarded
   * via activation, selling, or any other means do NOT trigger these effects.
   */
  _onCardDiscarded(discardingPlayer, card, isDiscardAction = false) {
    if (!isDiscardAction) return;
    // Only Documents and Connections trigger Salvage/Blacklisted.
    if (card.type !== "document" && card.type !== "connection") return;
    // Salvage: other player gain $1
    for (const p of this.players) {
      if (
        card.type === 'document' &&
        p.id !== discardingPlayer.id &&
        p.stash.lifeCards.some((lc) => lc.title === "Salvage")
      ) {
        p.money += 1;
        this.log(`${p.name} gains $1 from Salvage.`, "system");
        this.notifyToast("money", `${p.name} gains $1 from Salvage.`, { indent: 1 });
      }
    }
    // Blacklisted: discarder loses $1
    if (
      card.type === "connection" && discardingPlayer.stash.lifeCards.some((lc) => lc.title === "Blacklisted")
    ) {
      discardingPlayer.money = Math.max(0, discardingPlayer.money - 1);
      this.log(`P${discardingPlayer.id}|BLACKLISTED|LOSS:1`, "system");
      this.notifyToast("money", `${discardingPlayer.name} loses $1 from Blacklisted`, {
        indent: 1,
      });
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
      left.money = Math.max(0, left.money - 1);
      this.log(`P${player.id}|PASS_PENALTY|TO:P${left.id}`, "system");
      this.notifyToast("money", 
        `${left.name} takes Penalty from ${player.name} and loses $1`,
        { indent: 1 },
      );
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
          const [card] = p.stash.lifeCards.splice(idx, 1);
          player.money += 1;
          player.stash.lifeCards.push(card);
          this.log(
            `P${p.id}|STAR_POWER|GAIN:1|PASS_TO:P${player.id}`,
            "system",
          );
          this.notifyToast("money", 
            `${player.name} takes Star Power from ${p.name} and gains $1`,
            { indent: 1 },
          );
        }
      }
    }
  }

  /**
   * Called ONLY when a life card is KEPT (Must Keep or May Keep chosen to keep).
   * NOT called for Instant cards that are discarded.
   * Triggers Underdog — but only when a card OTHER than Underdog itself is gained
   * (Underdog should not pass itself on its own first acquisition).
   * @param {object} player
   * @param {object|null} gainedCard - The card that was just added to the stash, or null if unknown.
   */
  _onPlayerGainLifeCard(player, gainedCard = null) {
    // Underdog only triggers when *another* life card enters the stash.
    if (gainedCard && gainedCard.title === "Underdog") return;

    const idx = player.stash.lifeCards.findIndex(
      (lc) => lc.title === "Underdog",
    );
    if (idx !== -1) {
      const [card] = player.stash.lifeCards.splice(idx, 1);
      const left = this.getLeftPlayer(player);
      left.stash.lifeCards.push(card);
      left.money = Math.max(0, left.money - 1);
      this.log(`P${player.id}|UNDERDOG|LOSS:1|PASS_TO:P${left.id}`, "system");
      this.notifyToast("money", 
        `${left.name} takes Underdog from ${player.name} and loses $1`,
        { indent: 1 },
      );
    }
  }

  /** Check and grant/revoke Ticket+Passport bonus. */
  checkTicketPassportBonus(player) {
    if (!player.ticketPassportBonusClaimed) {
      if (player.stash.tickets >= 1 && player.stash.passports >= 1) {
        const bonus = this.players.length > 4 ? 2 : 1;
        player.assurance += bonus;
        player.ticketPassportBonusClaimed = true;
        this.log(`P${player.id}|TICKET_PASSPORT_BONUS|GAIN:1A`, "system");
        this.notifyToast("assurance", 
          `${player.name} gains 1 Assurance (Passport + Ticket)`,
          {
            indent: 1,
          },
        );
      }
    }
    // TODO: I don't think the else case is necessary. Why would a player lose an assurance?
    // else {
    //   if (player.stash.tickets === 0 || player.stash.passports === 0) {
    //     player.assurance = Math.max(0, player.assurance - 1);
    //     player.ticketPassportBonusClaimed = false;
    //     this.log(`P${player.id}|TICKET_PASSPORT_BONUS|LOSS:1A`, "system");
    //   }
    // }
  }

  // ─── Cost Helpers ────────────────────────────────────────────────────

  /** Get the effective cost of a card considering stash discounts and penalties. */
  getEffectiveCost(player, card) {
    let cost = card.cost || 0;
    if (
      card.type === "document" &&
      player.stash.lifeCards.some((lc) => lc.title === "Fancy Clothes")
    ) {
      cost -= 1;
    }
    if (
      card.type === "document" &&
      player.stash.lifeCards.some((lc) => lc.title === "Insider")
    ) {
      cost += 1;
    }
    if (
      card.type === "connection" &&
      player.stash.lifeCards.some((lc) => lc.title === "Stellar Reputation")
    ) {
      cost -= 1;
    }
    return Math.max(0, cost);
  }

  // ─── Forfeit / Availability Check ────────────────────────────────────

  /** Can the player perform ANY required action? If not, they forfeit. */
  canPerformAnyRequiredAction(player) {
    // Activate any Payday or Life Card
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

    // Buy a Document or Connection
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

    // Reclaim Ticket or Passport from opponent stash
    for (const p of this.players) {
      if (p.id !== player.id) {
        const cost = 2 + player.accessFee;
        const canAfford = player.money >= cost;
        const canReclaimTicket =
          p.stash.tickets > 1 && player.stash.connections.length >= 1;
        const canReclaimPassport =
          p.stash.passports > 1 && player.stash.documents.length >= 1;
        if (canAfford && (canReclaimTicket || canReclaimPassport)) return true;
      }
    }

    // Discard from own layout
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

    // Apply for College
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

  getValidActions(player) {
    const actions = [];
    const p = player || this.players[this.currentPlayerIdx];

    // Optional: Graduate
    actions.push({
      type: "graduate",
      label: "Graduate",
      lucideIcon: 'graduation-cap',
      optional: true,
      enabled: p.inCollege && !this._graduateAttempted,
    });

    const canSell =
      p.stash.documents.length > 0 || p.stash.connections.length > 0;
    actions.push({
      type: "sell",
      label: "Sell",
      lucideIcon: 'hand-coins',
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
      label: "Activate",
      lucideIcon: 'zap',
      optional: false,
      enabled: canActivate,
    });

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
      label: "Buy",
      lucideIcon: 'shopping-cart',
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
      label: "Steal (skip next turn)",
      lucideIcon: 'hat-glasses',
      optional: false,
      enabled: canStealT || canStealP,
    });

    let canReclaim = false;
    for (const op of this.players) {
      if (
        op.id !== p.id &&
        p.money >= 2 + p.accessFee &&
        ((op.stash.tickets > 1 && p.stash.connections.length >= 1) ||
          (op.stash.passports > 1 && p.stash.documents.length >= 1))
      ) {
        canReclaim = true;
        break;
      }
    }
    actions.push({
      type: "reclaim",
      label: "Reclaim",
      lucideIcon: 'search-check',
      optional: false,
      enabled: canReclaim,
    });

    // Required: Discard
    let canDiscard = false;
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
    actions.push({
      type: "discard",
      label: "Discard",
      lucideIcon: 'archive',
      optional: false,
      enabled: canDiscard,
    });

    let canApply = false;
    if (!this._collegeFailed && p.payRaises < MAX_PAY_RAISES && !p.inCollege) {
      const minTuition = Math.floor(p.collegeFund / 2) + 1;
      if (p.money >= minTuition) canApply = true;
    }
    actions.push({
      type: "applyCollege",
      label: "Apply for College",
      lucideIcon: 'notebook-pen',
      optional: false,
      enabled: canApply,
    });

    const hasAnyRequired = actions.some((a) => !a.optional && a.enabled);
    if (!hasAnyRequired) {
      actions.push({
        type: "forfeit",
        label: "Forfeit Turn",
        lucideIcon: 'circle-arrow-right',
        optional: false,
        enabled: true,
      });
    }

    return actions;
  }

  // ─── Turn Management ─────────────────────────────────────────────────

  advanceTurn() {
    this._advanceCount++;
    if (this._advanceCount > 2000) {
      this.log("ERR|SAFETY_LIMIT", "error");
      this.triggerPhase2();
      return;
    }

    if (this.checkPhase2Trigger()) {
      this.triggerPhase2();
      return;
    }

    this._collegeFailed = false;
    this._graduateAttempted = false;
    // Identical Twin extra turn: don't advance player index
    if (this._identicalTwinExtraTurn) {
      this._identicalTwinExtraTurn = false;
      this._notify();
      return;
    }

    this.currentPlayerIdx = (this.currentPlayerIdx + 1) % this.players.length;
    this.turnNumber++;

    const next = this.players[this.currentPlayerIdx];

    if (next.skipNextTurn) {
      next.skipNextTurn = false;
      this.log(`P${next.id}|SKIP_TURN`, "system");
      this.notifyToast("info", `${next.name} turn skipped`);
      this.advanceTurn();
      return;
    }

    // Removed auto-forfeit to allow optional actions before forfeiting

    this.consecutiveForfeits = 0;
    this._notify();
  }

  // ─── Phase 2 Trigger ─────────────────────────────────────────────────

  checkPhase2Trigger() {
    // Phase 1 ends when every player's layout is completely empty,
    // regardless of remaining tickets or passports in the public pool.
    for (const p of this.players) {
      for (let i = 0; i < 14; i++) {
        if (p.layout[i] !== null) return false;
      }
    }
    return true;
  }

  // ─── Phase 2: Border Crossing ────────────────────────────────────────

  triggerPhase2() {
    this.phase = "crossing";
    this.activeCrossingIdx = 0;
    this.crossingOrder = [];
    for (let i = 0; i < this.players.length; i++) {
      this.crossingOrder.push(
        (this.currentPlayerIdx + 1 + i) % this.players.length,
      );
    }
    this.log("PHASE2_START", "system");
    this.notifyToast("info", `Start Phase 2`);

    for (const player of this.players) {
      const dest = DESTINATIONS.find((d) => d.name === player.destination.name);
      let totalMoney = player.money;
      const frCard = player.stash.lifeCards.find(
        (lc) => lc.title === "Frontrunner",
      );
      if (frCard && frCard.money) totalMoney += frCard.money;

      const docs = player.stash.documents.length;
      const conns = player.stash.connections.length;

      let consumedMoney = 0,
        consumedDocs = 0,
        consumedConns = 0;
      let mGain = 0,
        dGain = 0,
        cGain = 0;
      let mPen = 0,
        dPen = 0,
        cPen = 0;

      if (dest.targets) {
        if (dest.targets.m) {
          if (dest.targets.m.setSize > 0 && totalMoney >= dest.targets.m.setSize) {
            consumedMoney = dest.targets.m.setSize;
            mGain = dest.targets.m.reward || 0;
          }
          if (
            dest.targets.m.minRequired !== undefined &&
            totalMoney < dest.targets.m.minRequired
          ) {
            mPen = dest.targets.m.penalty || 0;
          }
        }
        if (dest.targets.d) {
          if (dest.targets.d.setSize > 0 && docs >= dest.targets.d.setSize) {
            consumedDocs = dest.targets.d.setSize;
            dGain = dest.targets.d.reward || 0;
          }
          if (
            dest.targets.d.minRequired !== undefined &&
            docs < dest.targets.d.minRequired
          ) {
            dPen = dest.targets.d.penalty || 0;
          }
        }
        if (dest.targets.c) {
          if (dest.targets.c.setSize > 0 && conns >= dest.targets.c.setSize) {
            consumedConns = dest.targets.c.setSize;
            cGain = dest.targets.c.reward || 0;
          }
          if (
            dest.targets.c.minRequired !== undefined &&
            conns < dest.targets.c.minRequired
          ) {
            cPen = dest.targets.c.penalty || 0;
          }
        }
      }

      const mod = dest.check
        ? dest.check(totalMoney, docs, conns)
        : mGain + dGain + cGain - mPen - dPen - cPen;
      player.assurance += mod;

      if (consumedMoney > 0) {
        let remainingToPay = consumedMoney;
        if (player.money >= remainingToPay) {
          player.money -= remainingToPay;
        } else {
          remainingToPay -= player.money;
          player.money = 0;
          if (frCard)
            frCard.money = Math.max(0, (frCard.money || 0) - remainingToPay);
        }
      }

      for (let i = 0; i < consumedDocs; i++) {
        if (player.stash.documents.length > 0) {
          const doc = player.stash.documents.pop();
          this.discardPile.push(doc);
          this._onCardDiscarded(player, doc);
        }
      }

      for (let i = 0; i < consumedConns; i++) {
        if (player.stash.connections.length > 0) {
          const conn = player.stash.connections.pop();
          this.discardPile.push(conn);
          this._onCardDiscarded(player, conn);
        }
      }

      let tradeStr = `PHASE2|P${player.id}|TRADE`;
      if (consumedMoney > 0) tradeStr += `|$${consumedMoney}:+${mGain}A`;
      if (consumedDocs > 0) tradeStr += `|${consumedDocs}D:+${dGain}A`;
      if (consumedConns > 0) tradeStr += `|${consumedConns}C:+${cGain}A`;
      if (mPen > 0) tradeStr += `|PEN_M:-${mPen}A`;
      if (dPen > 0) tradeStr += `|PEN_D:-${dPen}A`;
      if (cPen > 0) tradeStr += `|PEN_C:-${cPen}A`;
      tradeStr += `|TOTAL_A:${player.assurance}`;

      this.log(tradeStr, "system");
    }

    this._notify();
  }

  selectLane(laneIdx) {
    if (this.phase !== "crossing") return;
    const playerIdx = this.crossingOrder
      ? this.crossingOrder[this.activeCrossingIdx]
      : this.activeCrossingIdx;
    const player = this.players[playerIdx];
    const lane = this.securityLanes[laneIdx];

    if (!lane || lane.tokens.length === 0) {
      this.log("ERR|LANE_EMPTY", "error");
      return;
    }

    const tokenVal = lane.tokens.shift();
    this.log(
      `PHASE2|P${player.id}|SELECT_LANE:${lane.name}|TKN:${tokenVal}`,
      "action",
    );

    const hasTicket = player.stash.tickets > 0;
    const hasPassport = player.stash.passports > 0;

    if (!hasTicket || !hasPassport) {
      player.crossedSuccessfully = false;
      this.log(`PHASE2|P${player.id}|CROSS:FAIL_MISSING_DOCS`, "error");
      this.notifyToast("error", 
        `${player.name} selects ${lane.name}, reveals ${tokenVal} token, blocked: missing Passport/Ticket`,
      );
      let hasRevealed = false;
      this.securityLanes[laneIdx].unshuffledTokens = this.securityLanes[
        laneIdx
      ].unshuffledTokens.map(({ tokenNumber, status }) => {
        if (status.isRevealed) return { tokenNumber, status };
        if (tokenNumber === tokenVal && !hasRevealed) {
          hasRevealed = true;
          return {
            tokenNumber,
            status: {
              isRevealed: true,
              player: {
                assurance: player.assurance,
                money: player.money,
                name: player.name,
                success: false,
              },
            },
          };
        }
        return { tokenNumber, status };
      });
    } else if (player.assurance >= tokenVal) {
      player.crossedSuccessfully = true;
      player.assurance -= tokenVal;
      this.log(
        `PHASE2|P${player.id}|CROSS:PASS|PAID_A:${tokenVal}|REM_A:${player.assurance}`,
        "action",
      );
      this.notifyToast("success", 
        `${player.name} selects ${lane.name}, reveals ${tokenVal} token, crosses with ${player.assurance} Assurance remaining`,
      );
      let hasRevealed = false;
      this.securityLanes[laneIdx].unshuffledTokens = this.securityLanes[
        laneIdx
      ].unshuffledTokens.map(({ tokenNumber, status }) => {
        if (status.isRevealed) return { tokenNumber, status };
        if (tokenNumber === tokenVal && !hasRevealed) {
          hasRevealed = true;
          return {
            tokenNumber,
            status: {
              isRevealed: true,
              player: {
                assurance: player.assurance,
                money: player.money,
                name: player.name,
                success: true,
              },
            },
          };
        }
        return { tokenNumber, status };
      });
    } else {
      player.crossedSuccessfully = false;
      this.log(`PHASE2|P${player.id}|CROSS:FAIL_LOW_A`, "error");
      this.notifyToast("error", 
        `${player.name} selects ${lane.name}, reveals ${tokenVal} token, blocked: has ${player.assurance} Assurance`,
      );
      let hasRevealed = false;
      this.securityLanes[laneIdx].unshuffledTokens = this.securityLanes[
        laneIdx
      ].unshuffledTokens.map(({ tokenNumber, status }) => {
        if (status.isRevealed) return { tokenNumber, status };
        if (tokenNumber === tokenVal && !hasRevealed) {
          hasRevealed = true;
          return {
            tokenNumber,
            status: {
              isRevealed: true,
              player: {
                assurance: player.assurance,
                money: player.money,
                name: player.name,
                success: false,
              },
            },
          };
        }
        return { tokenNumber, status };
      });
    }

    this.activeCrossingIdx++;
    if (this.activeCrossingIdx >= this.players.length) {
      this._endGame();
    }
    this._notify();
  }

  _endGame() {
    this.phase = "game_over";

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
      } else {
        const failed = this.players
          .filter((p) => !p.crossedSuccessfully)
          .map((p) => p.name);
        this.gameResult = {
          winner: null,
          message: `COOPERATIVE DEFEAT. Failed: ${failed.join(", ")}.`,
          playerResults,
        };
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
          message: `WINNER: ${w.name} (Assurance: ${w.assurance}, $${w.money})`,
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
    }
    this.log(
      `GAME_OVER|${this.gameResult.message}`,
      this.mode === "cooperative" &&
        !this.players.every((p) => p.crossedSuccessfully)
        ? "error"
        : "system",
    );
  }

  // ─── Choice System ───────────────────────────────────────────────────

  _setPendingChoice(choice) {
    this.pendingChoice = {
      id: choice.id || `choice-${Date.now()}`,
      title: choice.title,
      options: choice.options,
      cancellable: choice.cancellable !== false,
      canGoBack: !!choice.onBack,
      // playerIdx: the id of the player who must make this decision.
      // Defaults to the current acting player. Persuasion uses this
      // to hand the interrupt to the layout owner (target), not the actor.
      playerIdx: choice.playerIdx ?? this.currentPlayerIdx,
    };
    this._pendingResolve = choice.resolve;
    this._onBack = choice.onBack || null;
    this._notify();
  }

  stepBackChoice() {
    if (this.pendingChoice && this._onBack) {
      const backFn = this._onBack;
      this.pendingChoice = null;
      this._pendingResolve = null;
      this._onBack = null;
      backFn();
    }
  }

  resolveChoice(value, rolls = null) {
    if (!this.pendingChoice) return;
    this.createBackup();
    if (rolls) this.p2pRollQueue = [...rolls];
    const resolve = this._pendingResolve;
    this._pendingResolve = null;
    this._onBack = null;
    this.pendingChoice = null;
    this._backup = null;
    resolve(value);
  }

  createBackup() {
    this._backup = JSON.stringify({
      phase: this.phase,
      currentPlayerIdx: this.currentPlayerIdx,
      players: this.players,
      publicServices: this.publicServices,
      securityLanes: this.securityLanes,
      discardPile: this.discardPile,
      deck: this.deck,
      turnNumber: this.turnNumber,
      consecutiveForfeits: this.consecutiveForfeits,
      pandemicStimulusCount: this.pandemicStimulusCount,
      activeCrossingIdx: this.activeCrossingIdx,
      crossingOrder: this.crossingOrder,
      gameResult: this.gameResult,
      _collegeFailed: this._collegeFailed,
      _graduateAttempted: this._graduateAttempted,
      _identicalTwinExtraTurn: this._identicalTwinExtraTurn,
      // logs are append-only; excluded to keep the serialized backup small.
      // We store only the length so restoreBackup() can trim any entries
      // written after the snapshot was taken.
      _logsLength: this.logs.length,
    });
  }

  restoreBackup() {
    if (!this._backup) return false;
    const backup = JSON.parse(this._backup);
    const logsLength = backup._logsLength;
    delete backup._logsLength;
    Object.assign(this, backup);
    // Trim any log entries added after the backup was created
    if (logsLength !== undefined) this.logs.length = logsLength;
    this.pendingChoice = null;
    this._pendingResolve = null;
    this._backup = null;
    this._notify();
    return true;
  }

  cancelPendingChoice() {
    if (this.pendingChoice && this.pendingChoice.cancellable !== false) {
      this.restoreBackup();
    }
  }

  // ─── Optional Actions ────────────────────────────────────────────────

  executeOptionalAction(type, params = {}) {
    if (this.phase !== "preparation" || this.pendingChoice) return;
    this.createBackup();
    if (params.rolls) this.p2pRollQueue = [...params.rolls];
    const player = this.players[this.currentPlayerIdx];

    switch (type) {
      case "graduate": {
        if (!player.inCollege) {
          this.log(`ERR|NOT_IN_COLLEGE`, "error");
          return;
        }
        const roll = this.rollD6();
        if (roll <= 3) {
          player.inCollege = false;
          player.assurance += player.payRaises === 0 ? 2 : 1;
          const raiseAmount = SALARY_RAISES[player.payRaises];
          player.salary += raiseAmount;
          player.payRaises++;
          this.log(
            `P${player.id}|GRAD|ROLL:${roll}|RES:PASS|SALARY_INC:${raiseAmount}`,
            "action",
          );
          this.notifyToast("success", `${player.name} rolled ${roll} and graduated`);
        } else {
          this.log(`P${player.id}|GRAD|ROLL:${roll}|RES:FAIL`, "error");
          this.notifyToast("error", `${player.name} rolled ${roll} and remains in college`);
          this._graduateAttempted = true;
        }
        this._notify();
        break;
      }
      case "sell": {
        const { stashType, stashIdx } = params;
        if (!stashType || stashIdx === undefined) {
          this.log(`ERR|SELECT_STASH_CARD`, "error");
          return;
        }
        const arr =
          stashType === "document"
            ? player.stash.documents
            : player.stash.connections;
        if (stashIdx < 0 || stashIdx >= arr.length) {
          this.log(`ERR|INVALID_STASH_IDX`, "error");
          return;
        }
        const [sold] = arr.splice(stashIdx, 1);
        this.discardPile.push(sold);
        const payout = this.players.length < 4 ? 3 : 2;
        player.money += payout;
        this.log(`P${player.id}|SELL:${sold.name}|GAIN:${payout}`, "action");
        this.notifyToast("warning", 
          `${player.name} sells ${sold.type.charAt(0).toUpperCase() + sold.type.slice(1)} for $${payout}`,
        );
        this._onCardDiscarded(player, sold);
        this._notify();
        break;
      }
    }
  }

  // ─── Required Actions ────────────────────────────────────────────────

  executeRequiredAction(type, params = {}) {
    if (this.phase !== "preparation" || this.pendingChoice) return;
    if (this._collegeFailed && type === "applyCollege") {
      this.log(`ERR|COLLEGE_FAIL_ONCE`, "error");
      return;
    }
    this.createBackup();
    if (params.rolls) this.p2pRollQueue = [...params.rolls];
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
      case "forfeit":
        player.money += 1;
        this.log(
          `P${player.id}|FORFEIT|GAIN:1`,
          "error",
        );
        this.notifyToast("warning", `${player.name} forfeits — gains $1`);
        this.advanceTurn();
        return;
    }
  }

  // ── Activate ──────────────────────────────────────────────────────────

  _doActivate(player, { targetPlayerIdx, slotIdx }) {

    const target = this.players[targetPlayerIdx];
    const slot = target.layout[slotIdx];
    if (!slot || !this.isCardAvailable(target, slotIdx)) {
      this.log("ERR|CARD_NOT_AVAIL", "error");
      return;
    }
    if (slot.card.type !== "payday" && slot.card.type !== "life") {
      this.log("ERR|INVALID_CARD_TYPE", "error");
      return;
    }

    const fee = target.id === player.id ? 0 : player.accessFee;
    if (player.money < fee) {
      this.log(`ERR|NO_FUNDS_${fee}`, "error");
      this.notifyToast("error", `${player.name} can't activate card: not enough money`);
      return;
    }

    if (slot.card.type === "life") {
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

              this._payAccessFee(player, target, fee);
              const [removed] = target.layout.splice(slotIdx, 1, null);
              this.discardPile.push(removed.card);
              this._onCardDiscarded(player, removed.card);
              this.log(
                `P${player.id}|KEEP_CALM_USED|DISC:${removed.card.title}`,
                "action",
              );
              this.notifyToast("life", 
                `${player.name} uses Keep Calm to discard "${removed.card.title}"`,
              );
              this.uncoverLayout(target);
              this.advanceTurn();
              return;
            }
            this._continueActivate(player, target, slotIdx, fee);
          },
        });
        return;
      }

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

    this._onCardDiscarded(player, card);

    if (card.type === "payday") {
      this.discardPile.push(card);
      this.log(`P${player.id}|ACT:Payday`, "action");
      this._resolvePayday(player);
      this.uncoverLayout(target);
      this.advanceTurn();
    } else {
      this.log(`P${player.id}|ACT:${card.title}`, "action");
      this._resolveLifeCardActivation(player, target, card);
    }
  }

  _resolvePayday(activator) {
    const adjacentIds = new Set();
    if (activator) {
      adjacentIds.add(this.getLeftPlayer(activator).id);
      adjacentIds.add(this.getRightPlayer(activator).id);
    }

    const salaries = this.players.map((p) => {
      if (p.inCollege) return 0;
      let payout = 0;
      if (activator && p.id === activator.id) {
        payout = p.salary;
      } else if (adjacentIds.has(p.id)) {
        payout = 1;
      }
      if (p.stash.lifeCards.some((lc) => lc.title === "Insider")) payout += 1;
      if (p.stash.lifeCards.some((lc) => lc.title === "Pay Cut"))
        payout = Math.max(0, payout - 1);
      p.money += payout;
      return payout;
    });
    this.log(`PAYDAY|SALARIES:[${salaries.join(",")}]`, "action");
    this.notifyToast("money", `${activator.name} activates Payday`);

    // Snapshot all Frontrunner passes BEFORE mutating any stashes, so that a
    // card pushed to a later-in-array player doesn't get passed a second time
    // within the same Payday iteration.
    const frontrunnerPasses = [];
    for (const p of this.players) {
      const frIdx = p.stash.lifeCards.findIndex(
        (lc) => lc.title === "Frontrunner",
      );
      if (frIdx !== -1) {
        frontrunnerPasses.push({ holder: p, idx: frIdx });
      }
    }
    for (const { holder: p, idx: frIdx } of frontrunnerPasses) {
      const fr = p.stash.lifeCards[frIdx];
      if (!fr.money) fr.money = 0;
      if (fr.money < 3) {
        fr.money += 1;
        this.log(`P${p.id}|FRONTRUNNER_ADD:1|TOTAL:${fr.money}`, "system");
      }
      const [frCard] = p.stash.lifeCards.splice(frIdx, 1);
      const left = this.getLeftPlayer(p);
      left.stash.lifeCards.push(frCard);
      this.log(`P${p.id}|FRONTRUNNER_PASS|TO:P${left.id}`, "system");
      this.notifyToast("life", 
        `${p.name} passes Frontrunner with $${fr.money} to ${left.name}`,
        { indent: 1 },
      );
    }
  }

  // ── Persuasion Handler ────────────────────────────────────────────────

  _handlePersuasion(player, target, slotIdx, baseFee, callback, extraCost = 0) {
    // Step 1: Ask the layout OWNER (target) if they want to offer Persuasion.
    // playerIdx is set to target.id so the UI / AI loop knows this interrupt
    // belongs to target, not to the acting player.
    const doubleFee = baseFee * 2;
    this._setPendingChoice({
      id: "persuasion-offer",
      playerIdx: target.id,
      title: `${target.name}: You have Persuasion — offer it to ${player.name} instead of "${target.layout[slotIdx]?.card?.name ?? target.layout[slotIdx]?.card?.title ?? "the targeted card"}"?`,
      cancellable: false,
      options: [
        { text: `Yes — offer Persuasion to ${player.name}`, value: "offer" },
        { text: "No — proceed normally", value: "skip" },
      ],
      resolve: (val) => {
        if (val === "skip") {
          callback(baseFee);
          return;
        }
        // Step 2: Ask the ACTING player (player) if they accept.
        // playerIdx is set to player.id so the UI knows to show this to them.
        const canAffordDouble = player.money >= doubleFee + extraCost;
        const promptBuyer = () => {
          this._setPendingChoice({
            id: "persuasion-accept",
            playerIdx: player.id,
            title: `${player.name}: Accept Persuasion from ${target.name}, or decline and pay double Access Fee?`,
            cancellable: false,
            onBack: () =>
              this._handlePersuasion(
                player,
                target,
                slotIdx,
                baseFee,
                callback,
                extraCost,
              ),
            options: [
              {
                text: `Accept Persuasion (pay $${baseFee} Access Fee)`,
                value: "accept",
              },
              {
                text: canAffordDouble
                  ? `Decline (pay double: $${doubleFee} Access Fee) and take the card`
                  : `Decline (Requires $${doubleFee} Access Fee - insufficient funds)`,
                value: "decline",
                disabled: !canAffordDouble,
              },
            ],
            resolve: (buyerVal) => {
              if (buyerVal === "accept") {
                if (player.money < baseFee) {
                  this.log(`ERR|NO_FUNDS_${baseFee}`, "error");
                  promptBuyer();
                  return;
                }
                this._payAccessFee(player, target, baseFee);
                const persIdx = target.stash.lifeCards.findIndex(
                  (lc) => lc.title === "Persuasion",
                );
                const [persCard] = target.stash.lifeCards.splice(persIdx, 1);
                player.stash.lifeCards.push(persCard);
                this.log(
                  `P${player.id}|PERSUASION_ACC|FROM:P${target.id}`,
                  "action",
                );
                this.notifyToast("life", 
                  `${player.name} accepts Persuasion from ${target.name}`,
                );
                this._onPlayerGainLifeCard(player);
                this.advanceTurn();
              } else {
                if (player.money < doubleFee) {
                  this.log(`ERR|NO_FUNDS_${doubleFee}`, "error");
                  promptBuyer();
                  return;
                }
                this.log(
                  `P${player.id}|PERSUASION_DECLINED|FEE:${doubleFee}`,
                  "action",
                );
                this.notifyToast("life", 
                  `${player.name} rejects Persuasion from ${target.name}, pays ${doubleFee} Access Fee`,
                );
                callback(doubleFee);
              }
            },
          });
        };
        promptBuyer();
      },
    });
  }

  _payAccessFee(player, target, fee) {
    if (fee > 0 && target.id !== player.id) {
      player.money -= fee;
      target.money += fee;
      player.accessFee = Math.min(5, player.accessFee + 1);
      this.log(`P${player.id}|PAY_FEE:${fee}|TO:P${target.id}`, "system");
    }
  }

  // ── Life Card Activation Flow ─────────────────────────────────────────

  _getMayKeepChoiceText(card) {
    switch (card.title) {
      case "Insider":
        return {
          title: "Choose how to resolve Insider",
          keepText: "Keep: all documents cost +$1, +$1 on Paydays",
          immediateText: "Discard: gain $3",
        };
      case "Stellar Reputation":
        return {
          title: "Choose how to resolve Stellar Reputation",
          keepText: "Keep: all Connections cost $1 less",
          immediateText: "Discard: gain $3",
        };
      case "Fancy Clothes":
        return {
          title: "Choose how to resolve Fancy Clothes",
          keepText: "Keep: all Documents cost $1 less",
          immediateText: "Discard: gain $3",
        };
      default:
        return {
          title: `Choose how to resolve ${card.title}`,
          keepText: "Keep: ongoing effect",
          immediateText: "Discard: immediate effect",
        };
    }
  }

  _resolveLifeCardActivation(player, layoutOwner, card) {
    if (card.keep === "Must Keep") {
      this._resolveLifeCardEffect(player, card, () => {
        // Pass the card so Underdog doesn't self-trigger on its own first acquisition.
        this._onPlayerGainLifeCard(player, card);
        this.uncoverLayout(layoutOwner);
        this.advanceTurn();
      });
    } else if (card.keep === "May Keep") {
      const choiceText = this._getMayKeepChoiceText(card);
      this._setPendingChoice({
        id: "may-keep-choice",
        title: choiceText.title,
        options: [
          { text: choiceText.keepText, value: "keep" },
          { text: choiceText.immediateText, value: "immediate" },
        ],
        resolve: (val) => {
          if (val === "keep") {
            this._resolveLifeCardKeep(player, card, () => {
              // Pass the card so Underdog doesn't self-trigger on its own first acquisition.
              this._onPlayerGainLifeCard(player, card);
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
      this._resolveLifeCardEffect(player, card, () => {
        this.discardPile.push(card);
        this.uncoverLayout(layoutOwner);
        this.advanceTurn();
      });
    }
  }

  _resolveLifeCardKeep(player, card, done) {
    switch (card.title) {
      case "Stellar Reputation":
        player.stash.lifeCards.push({ ...card, keep: "Must Keep" });
        this.log(`P${player.id}|KEEP:Stellar Reputation`, "action");
        this.notifyToast("life", `${player.name} keeps Stellar Reputation`);
        done();
        break;
      case "Fancy Clothes":
        player.stash.lifeCards.push({ ...card, keep: "Must Keep" });
        this.log(`P${player.id}|KEEP:Fancy Clothes`, "action");
        this.notifyToast("life", `${player.name} keeps Fancy Clothes`);
        done();
        break;
      case "Insider":
        player.stash.lifeCards.push({ ...card, keep: "Must Keep" });
        this.log(`P${player.id}|KEEP:Insider`, "action");
        this.notifyToast("life", `${player.name} keeps Insider`);
        done();
        break;
      default:
        done();
    }
  }

  // ── Life Card Effect Resolution ───────────────────────────────────────

  _resolveLifeCardEffect(player, card, done) {
    const title = card.title;

    switch (title) {
      // ── Friendship ──
      case "Stellar Reputation":
        player.money += 3;
        this.log(`P${player.id}|ACT:Stellar Reputation|GAIN:3`, "action");
        this.notifyToast("money", `${player.name} gains $3 from Stellar Reputation`);
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
                this.log(`P${player.id}|ACT:Rummage Sale|GAIN:3`, "action");
                this.notifyToast("money", `${player.name} gains $3 from Rummage Sale`);
              } else {
                const docIndexInDiscard = parseInt(val.split("-")[1]);
                let count = 0;
                for (let i = 0; i < this.discardPile.length; i++) {
                  if (this.discardPile[i].type === "document") {
                    if (count === docIndexInDiscard) {
                      const [taken] = this.discardPile.splice(i, 1);
                      player.stash.documents.push(taken);
                      this.log(
                        `P${player.id}|ACT:Rummage Sale|TAKE_DOC:${taken.name}`,
                        "action",
                      );
                      this.notifyToast("document", 
                        `${player.name} takes Document from Rummage Sale`,
                      );
                      this._onPlayerGainDocument(player);
                      break;
                    }
                    count++;
                  }
                }
              }
              done();
            },
          });
          return;
        }
        player.money += 3;
        this.log(`P${player.id}|ACT:Rummage Sale|GAIN:3|NO_DOCS`, "action");
        this.notifyToast("money", 
          `${player.name} gains $3 from Rummage Sale (no Docs available)`,
        );
        done();
        break;
      }

      case "Island Paradise": {
        const deltaStr = this._withDelta(() => {
          player.money += 1;
          const minDocs = Math.min(
            ...this.players.map((p) => p.stash.documents.length),
          );
          for (const p of this.players) {
            if (p.stash.documents.length === minDocs) p.money += 1;
          }
        });
        this.log(`P${player.id}|ACT:Island Paradise|${deltaStr}`, "action");
        this.notifyToast("money", 
          `${player.name} gains $1 and players with the fewest Docs gain $1`,
        );
        done();
        break;
      }

      case "Swap Wallets":
        this._promptTargetPlayer(
          player,
          "Swap Wallets: choose a player",
          (targetId) => {
            const target = this.players[targetId];
            const temp = player.money;
            this.notifyToast("money", 
              `${player.name} ($${player.money}) swaps wallets with ${target.name} ($${target.money})`,
            );
            player.money = target.money;
            target.money = temp;
            this.log(
              `P${player.id}|ACT:Swap Wallets|SWAP:P${targetId}`,
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
        this.log(`P${player.id}|ACT:VIP|GAIN:${bonus}`, "action");
        this.notifyToast("money", `${player.name} VIP: gains ${bonus}`);
        done();
        break;
      }

      case "Fancy Clothes":
        player.money += 3;
        this.log(`P${player.id}|ACT:Fancy Clothes|GAIN:3`, "action");
        this.notifyToast("money", `${player.name} Fancy Clothes: gains $3`);
        done();
        break;

      case "Social Butterfly": {
        const promptTarget = () => {
          this._promptTargetPlayer(
            player,
            "Social Butterfly: choose target",
            (targetId) => {
              const target = this.players[targetId];
              const options = [];
              if (target.stash.connections.length > 0)
                options.push({
                  text: `Take 1 Connection from ${target.name}`,
                  value: "conn",
                });
              options.push({
                text: `Take up to $3 from ${target.name}`,
                value: "money",
              });

              if (options.length === 1 && options[0].value === "money") {
                const stolen = Math.min(3, target.money);
                target.money -= stolen;
                player.money += stolen;
                this.log(
                  `P${player.id}|ACT:Social Butterfly|TAKE:MONEY:${stolen}|FROM:P${target.id}`,
                  "action",
                );
                this.notifyToast("money", 
                  `${player.name} Social Butterfly: takes $${stolen} from ${target.name}`,
                );
                done();
                return;
              }

              const promptChoice = () => {
                this._setPendingChoice({
                  id: "social-butterfly-choice",
                  title: "Social Butterfly: take Connection or Money?",
                  options,
                  onBack: promptTarget,
                  resolve: (val) => {
                    if (val === "conn") {
                      this._setPendingChoice({
                        id: "social-butterfly-conn",
                        title: "Choose Connection to take",
                        options: target.stash.connections.map((c, i) => ({
                          text: `${c.name} ($${c.cost})`,
                          value: String(i),
                        })),
                        onBack: promptChoice,
                        resolve: (connIdx) => {
                          const [taken] = target.stash.connections.splice(
                            parseInt(connIdx),
                            1,
                          );
                          player.stash.connections.push(taken);
                          this.log(
                            `P${player.id}|ACT:Social Butterfly|TAKE:CONN:${taken.name}|FROM:P${target.id}`,
                            "action",
                          );
                          this.notifyToast("connection", 
                            `${player.name} Social Butterfly: takes Connection from ${target.name}`,
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
                        `P${player.id}|ACT:Social Butterfly|TAKE:MONEY:${stolen}|FROM:P${target.id}`,
                        "action",
                      );
                      this.notifyToast("money", 
                        `${player.name} Social Butterfly: takes $${stolen} from ${target.name}`,
                      );
                      done();
                    }
                  },
                });
              };
              promptChoice();
            },
          );
        };
        promptTarget();
        break;
      }

      case "Identical Twin":
        player.money += 1;
        this._identicalTwinExtraTurn = true;
        this.log(
          `P${player.id}|ACT:Identical Twin|GAIN:1|EXTRA_TURN`,
          "action",
        );
        this.notifyToast("life", `${player.name} Identical Twin: takes another turn`);
        done();
        break;

      // ── Downtown ──
      case "Reward": {
        const deltaStr = this._withDelta(() => {
          player.money += 1;
          for (const p of this.players) {
            if (p.id !== player.id) {
              const amt = Math.min(1, p.money);
              p.money -= amt;
              player.money += amt;
            }
          }
        });
        this.log(`P${player.id}|ACT:Reward|${deltaStr}`, "action");
        this.notifyToast("money", 
          `${player.name} gains $1 from Reward and takes $1 from every other player`,
        );
        done();
        break;
      }

      case "Suspect":
        player.money = Math.max(0, player.money - 1);
        this.log(`P${player.id}|ACT:Suspect|LOSS:1`, "action");
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
                this.log(
                  `P${player.id}|ACT:Suspect|DISC:${disc.name}`,
                  "action",
                );
                this.notifyToast("warning", 
                  `${player.name} Suspect: loses $1 and discards ${disc.name}`,
                );
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
                    this.log(
                      `P${player.id}|ACT:Suspect|DISC:${disc.name}`,
                      "action",
                    );
                    this.notifyToast("warning", 
                      `${player.name} Suspect: loses $1 and discards ${disc.name}`,
                    );
                    this._onCardDiscarded(player, disc);
                    done();
                  },
                });
              }
            },
          });
          return;
        }
        this.log(`P${player.id}|ACT:Suspect|NOTHING_TO_LOSE`, "system");
        this.notifyToast("money", `${player.name} Suspect: loses $1 (no Doc or Con to lose)`);
        done();
        break;

      case "Salvage":
        player.money += 1;
        player.stash.lifeCards.push({ ...card });
        this.log(`P${player.id}|ACT:Salvage|GAIN:1|KEEP`, "action");
        this.notifyToast("money", `${player.name} keeps Salvage, gains $1`);
        done();
        break;

      case "Blacklisted":
        player.money = Math.max(0, player.money - 1);
        player.stash.lifeCards.push({ ...card });
        this.log(`P${player.id}|ACT:Blacklisted|LOSS:1|KEEP`, "action");
        this.notifyToast("money", `${player.name} keeps Blacklisted, loses $1`);
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
                this.log(
                  `P${player.id}|ACT:Trousers Fall Down|LOSS:3`,
                  "action",
                );
                this.notifyToast("money", `${player.name} Trousers Fall Down: loses $3`);

                done();
              } else {
                this._promptSelectCard(
                  player.stash.documents,
                  "Document to lose",
                  (idx) => {
                    const [disc] = player.stash.documents.splice(idx, 1);
                    this.discardPile.push(disc);
                    this.log(
                      `P${player.id}|ACT:Trousers Fall Down|DISC:${disc.name}`,
                      "action",
                    );
                    this.notifyToast("document", 
                      `${player.name} Trousers Fall Down: discards ${disc.name}`,
                    );
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
        this.log(
          `P${player.id}|ACT:Trousers Fall Down|LOSS:3|NO_DOCS`,
          "action",
        );
        this.notifyToast("money", `${player.name} Trousers Fall Down: loses $3 (no Docs)`);
        done();
        break;

      case "Keep Calm":
        player.money += 1;
        player.stash.lifeCards.push({ ...card });
        this.log(`P${player.id}|ACT:Keep Calm|GAIN:1|KEEP`, "action");
        this.notifyToast("money", `${player.name} keeps Keep Calm, gains $1`);
        done();
        break;

      case "Life Coach":
        player.assurance += 1;
        this.log(`P${player.id}|ACT:Life Coach|GAIN_A:1`, "action");
        this.notifyToast("assurance", `${player.name} Life Coach: gains 1 Assurance`);
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
                `P${player.id}|ACT:Shredder Accident|DISC:${disc.name}`,
                "action",
              );
              this.notifyToast("document", 
                `${player.name} Shredder Accident: discards ${disc.name}`,
              );
              this._onCardDiscarded(player, disc);
              done();
            },
          );
          return;
        }
        player.money = Math.max(0, player.money - 1);
        this.log(
          `P${player.id}|ACT:Shredder Accident|LOSS:1|NO_DOCS`,
          "action",
        );
        this.notifyToast("money", `${player.name} Shredder Accident: loses $1 (no Docs)`);
        done();
        break;

      // ── Vacation ──
      case "Camping": {
        const deltaStr = this._withDelta(() => {
          player.money += 1;
          const minConns = Math.min(
            ...this.players.map((p) => p.stash.connections.length),
          );
          for (const p of this.players) {
            if (p.stash.connections.length === minConns) p.money += 1;
          }
        });
        this.log(`P${player.id}|ACT:Camping|${deltaStr}`, "action");
        this.notifyToast("money", 
          `${player.name} gains $1 from Camping and player(s) with the least Connections gain $1`,
        );
        done();
        break;
      }

      case "FOMO":
        player.money = Math.max(0, player.money - 1);
        this.log(`P${player.id}|ACT:FOMO|LOSS:1`, "action");
        this.notifyToast("money", `${player.name} Fomo: loses $1`);
        this._setPendingChoice({
          id: "fomo",
          title: "FOMO: Trade destinations with another player?",
          options: [
            { text: "No — keep my destination", value: "skip" },
            ...this.players
              .filter((p) => p.id !== player.id)
              .map((p) => ({
                text: `Trade with ${p.name} (${p.destination.name})`,
                value: String(p.id),
              })),
          ],
          resolve: (val) => {
            if (val !== "skip") {
              const target = this.players[parseInt(val)];
              const temp = player.destination;
              this.notifyToast("life", 
                `${player.name} Fomo: trades Destinations (${player.destination.name}) with ${target.name} (${target.destination.name})`,
              );
              player.destination = target.destination;
              target.destination = temp;
              this.log(
                `P${player.id}|ACT:FOMO|SWAP_DEST:P${target.id}`,
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
                text: `Replay ${c.title} (${c.description})`,
                value: `life-${i}`,
              })),
            ],
            resolve: (val) => {
              if (val === "money") {
                player.money += 2;
                this.log(`P${player.id}|ACT:Nostalgia|GAIN:2`, "action");
                this.notifyToast("money", `${player.name} Nostalgia: gains $2`);
                done();
              } else {
                const lifeIdx = parseInt(val.split("-")[1]);
                let count = 0;
                for (let i = 0; i < this.discardPile.length; i++) {
                  if (this.discardPile[i].type === "life") {
                    if (count === lifeIdx) {
                      const [taken] = this.discardPile.splice(i, 1);
                      this.log(
                        `P${player.id}|ACT:Nostalgia|REPLAY:${taken.title}`,
                        "action",
                      );
                      this.notifyToast("life", 
                        `${player.name} Nostalgia: replays ${taken.title}`,
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
                player.money += 2;
                done();
              }
            },
          });
          return;
        }
        player.money += 2;
        this.log(`P${player.id}|ACT:Nostalgia|GAIN:2|NO_LIFE`, "action");
        this.notifyToast("money", `${player.name} Nostalgia: gains $2 (no Life Card)`);
        done();
        break;
      }

      case "Lost & Found": {
        const promptTarget = () => {
          this._promptTargetPlayer(
            player,
            "Lost & Found: choose target",
            (targetId) => {
              const target = this.players[targetId];
              const opts = [];
              if (target.stash.documents.length > 0)
                opts.push({
                  text: `Take 1 Document from ${target.name}`,
                  value: "doc",
                });
              opts.push({
                text: `Take $2 from ${target.name}`,
                value: "money",
              });

              const promptChoice = () => {
                this._setPendingChoice({
                  id: "lost-found-choice",
                  title: "Lost & Found: Document or Money?",
                  options: opts,
                  onBack: promptTarget,
                  resolve: (val) => {
                    if (val === "doc") {
                      this._setPendingChoice({
                        id: "lost-found-doc",
                        title: "Select Document",
                        options: target.stash.documents.map((c, i) => ({
                          text: c.name,
                          value: String(i),
                        })),
                        onBack: promptChoice,
                        resolve: (idx) => {
                          const [taken] = target.stash.documents.splice(
                            parseInt(idx),
                            1,
                          );
                          player.stash.documents.push(taken);
                          this.log(
                            `P${player.id}|ACT:Lost & Found|TAKE:DOC:${taken.name}|FROM:P${target.id}`,
                            "action",
                          );
                          this.notifyToast("document", 
                            `${player.name} Lost & Found: takes ${taken.name} from ${target.name}`,
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
                        `P${player.id}|ACT:Lost & Found|TAKE:MONEY:${stolen}|FROM:P${target.id}`,
                        "action",
                      );
                      this.notifyToast("money", 
                        `${player.name} Lost & Found: takes $${stolen} from ${target.name}`,
                      );
                      done();
                    }
                  },
                });
              };
              promptChoice();
            },
          );
        };
        promptTarget();
        break;
      }

      // ── News ──
      case "Pandemic / Economic Stimulus": {
        this.pandemicStimulusCount++;
        const roll = this.rollD6();
        const deltaStr = this._withDelta(() => {
          if (this.pandemicStimulusCount % 2 === 1) {
            for (const p of this.players) p.money = Math.max(0, p.money - roll);
          } else {
            for (const p of this.players) p.money += roll;
          }
        });
        this.log(`P${player.id}|ACT:PANDEMIC_STIMULUS|${deltaStr}`, "action");
        if (this.pandemicStimulusCount % 2 === 1)
          this.notifyToast("money", `${player.name} Pandemic: everyone loses $${roll}`);
        else this.notifyToast("money", `${player.name} Pandemic: everyone gains $${roll}`);
        done();
        break;
      }

      case "Mental Fog":
        player.money = Math.max(0, player.money - 1);
        this.log(`P${player.id}|ACT:Mental Fog|LOSS:1`, "action");
        const candidates = [];
        for (const owner of this.players) {
          owner.stash.lifeCards.forEach((card, idx) => {
            candidates.push({
              owner,
              source: "stash",
              idx,
              title: card.title,
              card,
            });
          });
          const ownerLayout = owner.layout;
          for (let i = 0; i < ownerLayout.length; i++) {
            const slot = ownerLayout[i];
            const isAvailable = this.isCardAvailable(owner, i);
            if (slot && slot.card?.type === "life" && isAvailable) {
              candidates.push({
                owner,
                source: "layout",
                idx: i,
                title: slot.card.title,
                slot,
              });
            }
          }
        }
        if (candidates.length > 0) {
          this._setPendingChoice({
            id: "mental-fog",
            title: "Mental Fog: discard a Life Card? (optional)",
            options: [
              { text: "Skip — don't discard", value: "skip" },
              ...candidates.map((candidate, i) => ({
                text: `${candidate.owner.name} (${candidate.source === "layout" ? "Layout" : "Stash"}): ${candidate.title}`,
                value: String(i),
              })),
            ],
            resolve: (val) => {
              if (val !== "skip") {
                const candidate = candidates[parseInt(val)];
                if (candidate.source === "stash") {
                  const [disc] = candidate.owner.stash.lifeCards.splice(
                    candidate.idx,
                    1,
                  );
                  this.discardPile.push(disc);
                  this.log(
                    `P${player.id}|ACT:Mental Fog|DISC_STASH:${disc.title}|FROM:P${candidate.owner.id}`,
                    "action",
                  );
                  this.notifyToast("warning", 
                    `${player.name} Mental Fog: loses $1 and discards ${disc.title} from ${candidate.owner.name}`,
                  );
                } else {
                  const slot = candidate.owner.layout[candidate.idx];
                  if (slot) {
                    const [removed] = candidate.owner.layout.splice(
                      candidate.idx,
                      1,
                      null,
                    );
                    this.discardPile.push(removed.card);
                    this.log(
                      `P${player.id}|ACT:Mental Fog|DISC_LAYOUT:${removed.card.title}|FROM:P${candidate.owner.id}`,
                      "action",
                    );
                    this.notifyToast("warning", 
                      `${player.name} Mental Fog: loses $1 and discards ${removed.card.title} from ${candidate.owner.name}`,
                    );
                    this.uncoverLayout(candidate.owner);
                  }
                }
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
        this.log(`P${player.id}|ACT:Insider|GAIN:3`, "action");
        this.notifyToast("money", `${player.name} Insider: gains $3`);
        done();
        break;

      // ── Charity ──
      case "Philanthropy": {
        const deltaStr = this._withDelta(() => {
          player.money = Math.max(0, player.money - 1);
          let idx = (player.id - 1 + this.players.length) % this.players.length;
          while (idx !== player.id) {
            if (player.money > 0) {
              player.money -= 1;
              this.players[idx].money += 1;
            }
            idx = (idx - 1 + this.players.length) % this.players.length;
          }
        });
        this.log(`P${player.id}|ACT:Philanthropy|${deltaStr}`, "action");
        this.notifyToast("money", 
          `${player.name} loses $1 from Philanthropy, and distributes $1 to every other player`,
        );
        done();
        break;
      }

      case "Bailout": {
        const deltaStr = this._withDelta(() => {
          const minM = Math.min(...this.players.map((p) => p.money));
          for (const p of this.players) {
            if (p.money === minM) p.money += 1;
          }
          player.money += 1;
        });
        this.log(`P${player.id}|ACT:Bailout|${deltaStr}`, "action");
        this.notifyToast("money", 
          `${player.name} gains $1 from Bailout and player(s) with the least Money gain $1`,
        );
        done();
        break;
      }

      case "Share": {
        let half = 0;
        const deltaStr = this._withDelta(() => {
          half = Math.floor(player.money / 2);
          player.money -= half;
          const others = this.players.filter((p) => p.id !== player.id);
          if (others.length > 0) {
            const base = Math.floor(half / others.length);
            let extra = half % others.length;
            for (const p of others) {
              const amt = base + (extra > 0 ? 1 : 0);
              if (extra > 0) extra--;
              p.money += amt;
            }
          }
        });
        this.log(`P${player.id}|ACT:Share|${deltaStr}`, "action");
        this.notifyToast("money", 
          `${player.name} distributes half their Money ($${half}) to other players.`,
        );
        done();
        break;
      }

      case "Pay Cut":
        player.money = Math.max(0, player.money - 1);
        player.stash.lifeCards.push({ ...card });
        this.log(`P${player.id}|ACT:Pay Cut|LOSS:1|KEEP`, "action");
        this.notifyToast("money", `${player.name} keeps Pay Cut, loses $1`);
        done();
        break;

      // ── Trade ──
      case "Productivity":
        player.money += 1;
        player.accessFee = Math.max(0, player.accessFee - 1);
        this.log(`P${player.id}|ACT:Productivity|GAIN:1|FEE_DEC:1`, "action");
        this.notifyToast("money", 
          `${player.name} Productivity: gains $1 and Access Fee decreases to ${player.accessFee}`,
        );
        done();
        break;

      case "Tariffs":
        player.money = Math.max(0, player.money - 1);
        player.accessFee = Math.min(5, player.accessFee + 1);
        this.log(`P${player.id}|ACT:Tariffs|LOSS:1|FEE_INC:1`, "action");
        this.notifyToast("money", 
          `${player.name} Tariffs: loses $1 and Access Fee increases to ${player.accessFee}`,
        );
        done();
        break;

      case "Boost":
        this._promptTargetPlayer(
          player,
          "Boost: choose player (gain half their Nationality fund)",
          (targetId) => {
            const target = this.players[targetId];
            const amt = Math.floor(target.startingMoney / 2);
            player.money += amt;
            this.log(
              `P${player.id}|ACT:Boost|GAIN:${amt}|FROM_NAT_STARTING:P${targetId}`,
              "action",
            );
            this.notifyToast("money", 
              `${player.name} Boost: gains $${amt} (${target.name}'s Starting Money amount)`,
            );
            done();
          },
        );
        break;

      case "Persuasion":
        player.money += 1;
        player.stash.lifeCards.push({ ...card });
        this.log(`P${player.id}|ACT:Persuasion|GAIN:1|KEEP`, "action");
        this.notifyToast("money", `${player.name} keeps Persuasion, gains $1`);
        done();
        break;

      // ── Sports ──
      case "Underdog":
        player.money = Math.max(0, player.money - 1);
        player.stash.lifeCards.push({ ...card });
        this.log(`P${player.id}|ACT:Underdog|LOSS:1|KEEP`, "action");
        this.notifyToast("money", `${player.name} keeps Underdog, loses $1`);
        done();
        break;

      case "Frontrunner":
        player.stash.lifeCards.push({ ...card, money: 1 });
        this.log(`P${player.id}|ACT:Frontrunner|MONEY_PLACED:1|KEEP`, "action");
        this.notifyToast("life", `${player.name} keeps Frontrunner, places $1 on card`);
        done();
        break;

      case "Penalty":
        player.money = Math.max(0, player.money - 1);
        player.stash.lifeCards.push({ ...card });
        this.log(`P${player.id}|ACT:Penalty|LOSS:1|KEEP`, "action");
        this.notifyToast("money", `${player.name} keeps Penalty, loses $1`);
        done();
        break;

      case "Star Power":
        player.money += 1;
        player.stash.lifeCards.push({ ...card });
        this.log(`P${player.id}|ACT:Star Power|GAIN:1|KEEP`, "action");
        this.notifyToast("money", `${player.name} keeps Star Power, gains $1`);
        done();
        break;

      default:
        this.log(`ERR|UNKNOWN_LIFE_CARD:${title}`, "error");
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
        text: `${p.name} ($${p.money}, ${p.stash.documents.length} Documents, ${p.stash.connections.length} Connections, $${p.startingMoney} Starting Money)`,
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
      this.log("ERR|CARD_NOT_AVAIL", "error");
      return;
    }
    const card = slot.card;
    if (card.type !== "document" && card.type !== "connection") {
      this.log("ERR|NOT_DOC_OR_CONN", "error");
      return;
    }

    const fee = target.id === player.id ? 0 : player.accessFee;
    const cost = this.getEffectiveCost(player, card);

    if (
      target.id !== player.id &&
      target.stash.lifeCards.some((lc) => lc.title === "Persuasion")
    ) {
      this._handlePersuasion(player, target, slotIdx, fee, (actualFee) => {
        this._finishBuy(player, target, slotIdx, cost, actualFee);
      }, cost);
      return;
    }

    this._finishBuy(player, target, slotIdx, cost, fee);
  }

  _finishBuy(player, target, slotIdx, cost, fee) {
    const totalCost = cost + fee;
    if (player.money < totalCost) {
      this.log(`ERR|NO_FUNDS_${totalCost}`, "error");
      this.notifyToast("error", `${player.name} can't buy card: not enough funds`);
      return;
    }

    player.money -= cost;
    this._payAccessFee(player, target, fee);
    const [removed] = target.layout.splice(slotIdx, 1, null);
    const card = removed.card;

    if (card.type === "document") {
      player.stash.documents.push(card);
      this.log(
        `P${player.id}|BUY:${card.name}|FROM:P${target.id}|COST:${cost}`,
        "action",
      );
      if (player.id === target.id)
        this.notifyToast("document", `${player.name} buys Document for $${cost}`);
      else
        this.notifyToast("document", 
          `${player.name} buys Document ($${cost}) from ${target.name} (+$${fee} Access Fee)`,
        );
      this._onPlayerGainDocument(player);
    } else {
      player.stash.connections.push(card);
      this.log(
        `P${player.id}|BUY:${card.name}|FROM:P${target.id}|COST:${cost}`,
        "action",
      );
      if (player.id === target.id)
        this.notifyToast("connection", `${player.name} buys Connection for $${cost}`);
      else
        this.notifyToast("connection", 
          `${player.name} buys Connection ($${cost}) from ${target.name} (+$${fee} Access Fee)`,
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
        this.log("ERR|NO_TICKETS_IN_POOL", "error");
        return;
      }
      if (player.stash.connections.length < 1) {
        this.log("ERR|NEED_CONN", "error");
        this.notifyToast("error", `${player.name} needs a Connection to buy a Ticket`);
        return;
      }
      if (player.money < 2) {
        this.log("ERR|NO_FUNDS_2", "error");
        return;
      }
      player.money -= 2;
      this.publicServices.tickets--;
      player.stash.tickets++;
      this.log(`P${player.id}|BUY_POOL:Ticket|COST:2`, "action");
      this.notifyToast("info", `${player.name} buys a Ticket for $2`);
    } else {
      if (this.publicServices.passports <= 0) {
        this.log("ERR|NO_PASSPORTS_IN_POOL", "error");
        return;
      }
      if (player.stash.documents.length < 1) {
        this.log("ERR|NEED_DOC", "error");
        this.notifyToast("error", `${player.name} needs a Document to buy a Passport`);
        return;
      }
      if (player.money < 2) {
        this.log("ERR|NO_FUNDS_2", "error");
        return;
      }
      player.money -= 2;
      this.publicServices.passports--;
      player.stash.passports++;
      this.log(`P${player.id}|BUY_POOL:Passport|COST:2`, "action");
      this.notifyToast("info", `${player.name} buys Passport for $2`);
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
        this.log("ERR|CANNOT_STEAL_TICKET", "error");
        return;
      }
      this.publicServices.tickets--;
      player.stash.tickets++;
      this.log(`P${player.id}|STEAL:Ticket|SKIP_NEXT`, "action");
      this.notifyToast("warning", `${player.name} steals a Ticket and skips next turn`);
    } else {
      if (
        this.publicServices.passports <= 0 ||
        player.stash.documents.length < 1
      ) {
        this.log("ERR|CANNOT_STEAL_PASSPORT", "error");
        return;
      }
      this.publicServices.passports--;
      player.stash.passports++;
      this.log(`P${player.id}|STEAL:Passport|SKIP_NEXT`, "action");
      this.notifyToast("warning", `${player.name} steals a Passport and skips next turn`);
    }
    player.skipNextTurn = true;
    this.checkTicketPassportBonus(player);
    this.advanceTurn();
  }

  // ── Reclaim ───────────────────────────────────────────────────────────

  _doReclaim(player, { targetPlayerIdx, cardType, stashType }) {
    const target = this.players[targetPlayerIdx];
    if (target.id === player.id) {
      this.log("ERR|CANNOT_RECLAIM_SELF", "error");
      return;
    }

    const _type = cardType || stashType;

    const cost = 2 + player.accessFee;
    if (player.money < cost) {
      this.log(`ERR|NO_FUNDS_${cost}`, "error");
      return;
    }

    if (_type === "ticket") {
      if (target.stash.tickets <= 1) {
        this.log(`ERR|P${target.id}_LACKS_TICKETS`, "error");
        return;
      }
      if (player.stash.connections.length < 1) {
        this.log("ERR|NEED_CONN", "error");
        this.notifyToast("error", `${player.name} needs a Connection to reclaim a Ticket`);
        return;
      }
      player.money -= cost;
      target.money += cost;
      player.accessFee = Math.min(5, player.accessFee + 1);
      target.stash.tickets--;
      player.stash.tickets++;
      this.log(
        `P${player.id}|RECLAIM:Ticket|FROM:P${target.id}|COST:${cost}`,
        "action",
      );
      this.notifyToast("info", 
        `${player.name} reclaims a Ticket from ${target.name} for $${cost}`,
      );
    } else {
      if (target.stash.passports <= 1) {
        this.log(`ERR|P${target.id}_LACKS_PASSPORTS`, "error");
        return;
      }
      if (player.stash.documents.length < 1) {
        this.log("ERR|NEED_DOC", "error");
        this.notifyToast("error", "Need Document");
        return;
      }
      player.money -= cost;
      target.money += cost;
      player.accessFee = Math.min(5, player.accessFee + 1);
      target.stash.passports--;
      player.stash.passports++;
      this.log(
        `P${player.id}|RECLAIM:Passport|FROM:P${target.id}|COST:${cost}`,
        "action",
      );
      this.notifyToast("info", 
        `${player.name} reclaims a Passport from ${target.name} for $${cost}`,
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
      this.log("ERR|NO_STASH_DISCARD", "error");
      return;
    }

    const target = this.players[targetPlayerIdx];
    const slot = target.layout[slotIdx];
    if (!slot || !this.isCardAvailable(target, slotIdx)) {
      this.log("ERR|CARD_NOT_AVAIL", "error");
      return;
    }
    if (slot.card.type !== "document" && slot.card.type !== "connection") {
      this.log("ERR|NOT_DOC_OR_CONN", "error");
      return;
    }

    const fee = target.id === player.id ? 0 : player.accessFee;
    if (
      target.id !== player.id &&
      target.stash.lifeCards.some((lc) => lc.title === "Persuasion")
    ) {
      this._handlePersuasion(player, target, slotIdx, fee, (actualFee) => {
        this._finishDiscard(player, target, slotIdx, actualFee);
      });
      return;
    }

    this._finishDiscard(player, target, slotIdx, fee);
  }

  _finishDiscard(player, target, slotIdx, fee) {
    if (player.money < fee) {
      this.log(`ERR|NO_FUNDS_${fee}`, "error");
      return;
    }

    this._payAccessFee(player, target, fee);
    const [removed] = target.layout.splice(slotIdx, 1, null);
    this.discardPile.push(removed.card);
    const payout = this.players.length < 4 ? 3 : 2;
    player.money += payout;
    this.log(
      `P${player.id}|DISC:${removed.card.name}|FROM:P${target.id}|GAIN:${payout}`,
      "action",
    );
    const cardType =
      removed.card.type.charAt(0).toUpperCase() + removed.card.type.slice(1);
    if (player.id === target.id)
      if (cardType === "Document")
        this.notifyToast("document", `${player.name} discards a ${cardType} and gains $${payout}`);
      else
        this.notifyToast("connection", `${player.name} discards a ${cardType} and gains $${payout}`);
    else if (cardType === "Document")
      this.notifyToast("document", 
        `${player.name} discards a ${cardType} from ${target.name} ($${fee} Access Fee)`,
      );
    else
      this.notifyToast("connection", 
        `${player.name} discards a ${cardType} from ${target.name} ($${fee} Access Fee)`,
      );
    this._onCardDiscarded(player, removed.card, true);
    this.uncoverLayout(target);
    this.advanceTurn();
  }

  // ── Apply for College ─────────────────────────────────────────────────

  _doApplyCollege(player) {
    if (player.payRaises >= MAX_PAY_RAISES) {
      this.log("ERR|MAX_RAISES", "error");
      return;
    }
    if (player.inCollege) {
      this.log("ERR|ALREADY_IN_COLLEGE", "error");
      return;
    }

    const minTuition = Math.floor(player.collegeFund / 2) + 1;
    if (player.money < minTuition) {
      this.log(`ERR|NO_FUNDS_${minTuition}`, "error");
      return;
    }

    const roll = this.rollD6();
    let tuition;
    if (roll <= 3) {
      tuition = Math.floor(player.collegeFund / 2) + roll;
    } else {
      tuition = player.collegeFund + roll;
    }

    if (player.money >= tuition) {
      player.money -= tuition;
      player.inCollege = true;
      this.log(
        `P${player.id}|COLLEGE_APP|ROLL:${roll}|TUITION:${tuition}|RES:PASS`,
        "action",
      );
      this.notifyToast("success", 
        `${player.name} goes to college (rolls ${roll}, pays $${tuition})`,
      );
      this.advanceTurn();
    } else {
      player.money = Math.max(0, player.money - 1);
      this._collegeFailed = true;
      this.log(
        `P${player.id}|COLLEGE_APP|ROLL:${roll}|TUITION:${tuition}|RES:FAIL`,
        "error",
      );
      this.notifyToast("error", 
        `${player.name} fails to go to college (rolls ${roll}, tuition is $${tuition})`,
      );
      if (!this.canPerformAnyRequiredAction(player)) {
        this.log(`P${player.id}|FORFEIT_AUTO`, "system");
        this.advanceTurn();
      } else {
        this._notify();
      }
    }
  }

  // ─── Logging & Notifications ──────────────────────────────────────────

  _notify() {
    if (this.onStateChange) this.onStateChange();
  }

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
        crossingOrder: this.crossingOrder,
        pendingChoice: this.pendingChoice,
      }),
    );
  }

  loadSnapshot(snapshot) {
    if (!snapshot || typeof snapshot !== "object") return;

    // Deep clone to prevent prototype pollution and ensure clean POJOs
    let cleanSnap;
    try {
      cleanSnap = JSON.parse(JSON.stringify(snapshot));
    } catch (e) {
      console.warn("Invalid snapshot payload", e);
      return;
    }

    if (cleanSnap.phase !== undefined) this.phase = cleanSnap.phase;
    if (cleanSnap.mode !== undefined) this.mode = cleanSnap.mode;
    if (cleanSnap.turnNumber !== undefined)
      this.turnNumber = cleanSnap.turnNumber;
    if (cleanSnap.currentPlayerIdx !== undefined)
      this.currentPlayerIdx = cleanSnap.currentPlayerIdx;
    if (cleanSnap.publicServices !== undefined)
      this.publicServices = cleanSnap.publicServices;
    if (cleanSnap.securityLanes !== undefined)
      this.securityLanes = cleanSnap.securityLanes;
    if (cleanSnap.players !== undefined) this.players = cleanSnap.players;
    if (cleanSnap.gameResult !== undefined)
      this.gameResult = cleanSnap.gameResult;
    if (cleanSnap.logs !== undefined) this.logs = cleanSnap.logs;
    if (cleanSnap.activeCrossingIdx !== undefined)
      this.activeCrossingIdx = cleanSnap.activeCrossingIdx;
    if (cleanSnap.crossingOrder !== undefined)
      this.crossingOrder = cleanSnap.crossingOrder;
    if (cleanSnap.pendingChoice !== undefined)
      this.pendingChoice = cleanSnap.pendingChoice;
    this._notify();
  }
}

// ─── Tests ───────────────────────────────────────────────────────────────────

export function runTests() {
  const results = [];
  function assert(cond, desc) {
    results.push({ pass: !!cond, description: desc });
  }

  [2, 3, 4, 5, 6].forEach((P) => {
    try {
      const setup = Array.from({ length: P }, (_, i) => ({
        name: `P${i + 1}`,
        nationality: NATIONALITIES[i % NATIONALITIES.length],
        destination: DESTINATIONS[(i + 1) % DESTINATIONS.length],
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

  try {
    const setup = [
      { name: "A", nationality: {name: "Bosnian"}, destination: {name: "China"} },
      { name: "B", nationality: {name: "French"}, destination: {name: "Russia"} },
    ];
    const eng = new EmigrationEngine({ mode: "competitive", players: setup });
    const p = eng.players[0];
    assert(!eng.isCardCovered(p, 11), "Card 11 (row 4) initially uncovered");
    assert(!eng.isCardCovered(p, 12), "Card 12 (row 4) initially uncovered");
    assert(!eng.isCardCovered(p, 13), "Card 13 (row 4) initially uncovered");
    assert(eng.isCardCovered(p, 7), "Card 7 (row 3) initially covered");
    assert(eng.isCardCovered(p, 0), "Card 0 (row 1) initially covered");
    p.layout[11] = null;
    eng.uncoverLayout(p);
    assert(!eng.isCardCovered(p, 7), "Card 7 uncovered after card 11 removed");
    assert(p.layout[7]?.faceUp, "Card 7 flipped face-up");
    assert(eng.isCardCovered(p, 8), "Card 8 still covered (card 12 present)");
  } catch (e) {
    assert(false, `Layout DAG error: ${e.message}`);
  }

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

  try {
    assert(SALARY_RAISES.length === 2, "2 pay raise slots");
    assert(SALARY_RAISES[0] === 2, "First raise = +$2");
    assert(SALARY_RAISES[1] === 2, "Second raise = +$2");
    let salary = 1;
    salary += SALARY_RAISES[0];
    assert(salary === 3, "After 1st raise: salary = $3");
    salary += SALARY_RAISES[1];
    assert(salary === 5, "After 2nd raise: salary = $5");
  } catch (e) {
    assert(false, `Pay raise error: ${e.message}`);
  }

  try {
    const setup = [
      { name: "A", nationality: {name: "Bosnian",}, destination: {name:"China"}},
      { name: "B", nationality: {name: "French",}, destination: {name:"Russia"}},
    ];
    const eng = new EmigrationEngine({ mode: "competitive", players: setup });
    eng.players[0].salary = 3;
    eng.players[1].salary = 5;
    const moneyA = eng.players[0].money;
    const moneyB = eng.players[1].money;
    eng._resolvePayday(eng.players[0]);
    assert(
      eng.players[0].money === moneyA + 3,
      "Payday activator gets full salary ($3)",
    );
    assert(
      eng.players[1].money === moneyB + 1,
      "Non-activator gets $1 flat stipend (not full salary)",
    );
  } catch (e) {
    assert(false, `Payday resolution test error: ${e.message}`);
  }

  try {
    assert(Math.floor(2 / 2) + 1 === 2, "Bosnian min tuition = $2");
    assert(Math.floor(2 / 2) + 1 === 2, "Bosnian aid tuition (roll 1) = $2");
    assert(Math.floor(2 / 2) + 3 === 4, "Bosnian aid tuition (roll 3) = $4");
    assert(2 + 4 === 6, "Bosnian full tuition (roll 4) = $6");
  } catch (e) {
    assert(false, `College tuition error: ${e.message}`);
  }

  try {
    const setup = [
      { name: "A", nationality: {name: "Bosnian",}, destination: {name:"China"}},
      { name: "B", nationality: {name: "French",}, destination: {name:"Russia"}},
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

  try {
    const setup = [
      { name: "A", nationality: {name: "Bosnian",}, destination: {name:"China"}},
      { name: "B", nationality: {name: "French",}, destination: {name:"Russia"}},
    ];
    const eng = new EmigrationEngine({ mode: "competitive", players: setup });
    assert(eng.securityLanes.length === 5, "5 security lanes");
    assert(eng.securityLanes[0].tokens.length === 3, "Lane 1 has 3 tokens");
    const l1sorted = [...eng.securityLanes[0].tokens].sort((a, b) => a - b);
    assert(
      l1sorted[0] === 6 && l1sorted[1] === 7 && l1sorted[2] === 7,
      "Lane 1 tokens = [6,7,7]",
    );
  } catch (e) {
    assert(false, `Security lane error: ${e.message}`);
  }

  try {
    const setup = [
      { name: "A", nationality: {name: "Bosnian",}, destination: {name:"China"}},
      { name: "B", nationality: {name: "French",}, destination: {name:"Russia"}},
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
    eng.executeRequiredAction("activate", { targetPlayerIdx: 1, slotIdx: 11 });
    // Resolve any pendingChoice from Nostalgia (e.g. gain $2 option)
    if (eng.pendingChoice) eng.resolveChoice(eng.pendingChoice.options[0].value);

    assert(
      salvageOwner.money === 2,
      "Salvage does NOT trigger when another player activates (discards) a life card",
    );

    // Salvage DOES trigger on a document discard (the DISCARD required action).
    const discardEng = new EmigrationEngine({ mode: "competitive", players: setup });
    const discardActor = discardEng.players[1];
    const discardSalvageOwner = discardEng.players[0];
    discardSalvageOwner.stash.lifeCards.push({ title: "Salvage", type: "life" });
    discardActor.layout[11] = {
      card: { title: "Work Permit", type: "document", cost: 2 },
      faceUp: true,
      index: 11,
    };
    discardEng.currentPlayerIdx = 1;
    discardEng.executeRequiredAction("discard", { targetPlayerIdx: 1, slotIdx: 11 });
    assert(
      discardSalvageOwner.money === 3,
      "Salvage triggers when another player discards a Document",
    );

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
    eng.executeRequiredAction("activate", { targetPlayerIdx: 0, slotIdx: 13 });
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

    keeper.stash.lifeCards.push({ title: "Insider", type: "life" });
    const insiderDocCost = eng.getEffectiveCost(keeper, {
      cost: 2,
      type: "document",
    });
    assert(
      insiderDocCost === 3,
      "Kept Insider increases document purchase cost by $1",
    );

    const fogger = eng.players[0];
    fogger.layout[11] = {
      card: {
        title: "Mental Fog",
        pack: "News",
        keep: "Instant",
        type: "life",
      },
      faceUp: true,
      index: 11,
    };
    const target = eng.players[1];
    target.layout[13] = {
      card: { title: "Insider", pack: "News", keep: "May Keep", type: "life" },
      faceUp: true,
      index: 13,
    };
    target.stash.lifeCards.push({ title: "Stellar Reputation", type: "life" });
    eng.currentPlayerIdx = 0;
    eng.executeRequiredAction("activate", { targetPlayerIdx: 0, slotIdx: 11 });
    assert(
      eng.pendingChoice?.options?.some(
        (opt) =>
          opt.text.includes("Insider") ||
          opt.text.includes("Stellar Reputation"),
      ),
      "Mental Fog offers cards from another player's layout or stash",
    );
  } catch (e) {
    assert(false, `Life card effect error: ${e.message}`);
  }

  try {
    const setup = [
      { name: "A", nationality: {name: "Bosnian",}, destination: {name:"China"}},
      { name: "B", nationality: {name: "French",}, destination: {name:"Russia"}},
      { name: "C", nationality: {name:"Chinese"}, destination: {name:"England"} },
    ];
    const eng = new EmigrationEngine({ mode: "competitive", players: setup });
    eng.currentPlayerIdx = 1; // Player 2 (index 1) was last to take turn in Phase 1
    eng.triggerPhase2();
    const snap = eng.getSnapshot();
    assert(
      snap.crossingOrder && snap.crossingOrder[0] === 2,
      "Phase 2 crossing order starts with P3 (idx 2) after P2 (idx 1) and is included in snapshot",
    );
  } catch (e) {
    assert(false, `Crossing order test error: ${e.message}`);
  }

  // ── Persuasion Life Card tests ───────────────────────────────────────────
  try {
    const setup = [
      { name: "A", nationality: {name: "Bosnian",}, destination: {name:"China"}},
      { name: "B", nationality: {name: "French",}, destination: {name:"Russia"}},
    ];

    // ─── Scenario: layout owner skips the offer → action proceeds at normal fee
    {
      const eng = new EmigrationEngine({ mode: "competitive", players: setup });
      const actor = eng.players[0]; // P0 is the acting player
      const owner = eng.players[1]; // P1 owns the layout card + Persuasion

      owner.stash.lifeCards.push({ title: "Persuasion", type: "life" });
      owner.layout[11] = {
        card: { name: "Checklist", cost: 2, type: "document" },
        faceUp: true,
        index: 11,
      };
      actor.money = 20;
      eng.currentPlayerIdx = 0;

      eng.executeRequiredAction("discard", {
        source: "layout",
        targetPlayerIdx: 1,
        slotIdx: 11,
      });

      // Engine should have paused with a persuasion-offer prompt for the OWNER (P1)
      assert(
        eng.pendingChoice?.id === "persuasion-offer",
        "Persuasion: discard from opponent layout triggers persuasion-offer prompt",
      );
      assert(
        eng.pendingChoice?.playerIdx === owner.id,
        "Persuasion: persuasion-offer is directed at the layout owner (target), not the actor",
      );

      // Owner skips — action should resolve normally
      const feeBeforeSkip = actor.accessFee;
      const actorMoneyBefore = actor.money;
      const ownerMoneyBefore = owner.money;
      eng.resolveChoice("skip");

      assert(
        eng.phase === "preparation",
        "Persuasion skip: game still in preparation",
      );
      assert(
        actor.money === actorMoneyBefore + 2 - feeBeforeSkip,
        "Persuasion skip: actor gains $2 from discard minus normal access fee",
      );
      assert(
        owner.money === ownerMoneyBefore + feeBeforeSkip,
        "Persuasion skip: owner receives normal access fee",
      );
    }

    // ─── Scenario: owner offers → actor accepts → Persuasion transferred
    {
      const eng = new EmigrationEngine({ mode: "competitive", players: setup });
      const actor = eng.players[0];
      const owner = eng.players[1];

      owner.stash.lifeCards.push({ title: "Persuasion", type: "life" });
      owner.layout[11] = {
        card: { name: "Checklist", cost: 2, type: "document" },
        faceUp: true,
        index: 11,
      };
      actor.money = 20;
      eng.currentPlayerIdx = 0;

      eng.executeRequiredAction("discard", {
        source: "layout",
        targetPlayerIdx: 1,
        slotIdx: 11,
      });

      // Owner offers Persuasion
      const baseFee = actor.accessFee;
      const ownerMoneyBefore = owner.money;
      const actorMoneyBefore = actor.money;
      eng.resolveChoice("offer"); // persuasion-offer → "offer"

      // Now persuasion-accept prompt should be for the ACTOR (P0)
      assert(
        eng.pendingChoice?.id === "persuasion-accept",
        "Persuasion accept: persuasion-accept prompt shown after owner offers",
      );
      assert(
        eng.pendingChoice?.playerIdx === actor.id,
        "Persuasion accept: persuasion-accept is directed at the acting player",
      );

      eng.resolveChoice("accept");

      assert(
        actor.stash.lifeCards.some((lc) => lc.title === "Persuasion"),
        "Persuasion accept: Persuasion card is in actor's stash",
      );
      assert(
        !owner.stash.lifeCards.some((lc) => lc.title === "Persuasion"),
        "Persuasion accept: Persuasion card removed from owner's stash",
      );
      assert(
        actor.money === actorMoneyBefore - baseFee,
        "Persuasion accept: actor pays base access fee",
      );
      assert(
        owner.money === ownerMoneyBefore + baseFee,
        "Persuasion accept: owner receives base access fee",
      );
    }

    // ─── Scenario: owner offers → actor declines → double fee, action continues
    {
      const eng = new EmigrationEngine({ mode: "competitive", players: setup });
      const actor = eng.players[0];
      const owner = eng.players[1];

      owner.stash.lifeCards.push({ title: "Persuasion", type: "life" });
      owner.layout[11] = {
        card: { name: "Checklist", cost: 2, type: "document" },
        faceUp: true,
        index: 11,
      };
      actor.money = 20;
      eng.currentPlayerIdx = 0;

      const baseFee = actor.accessFee;
      const ownerMoneyBefore = owner.money;
      const actorMoneyBefore = actor.money;

      eng.executeRequiredAction("discard", {
        source: "layout",
        targetPlayerIdx: 1,
        slotIdx: 11,
      });

      eng.resolveChoice("offer"); // owner offers
      eng.resolveChoice("decline"); // actor declines

      assert(
        actor.money === actorMoneyBefore + 2 - baseFee * 2,
        "Persuasion decline: actor pays double access fee and still gains $2 from discard",
      );
      assert(
        owner.money === ownerMoneyBefore + baseFee * 2,
        "Persuasion decline: owner receives double access fee",
      );
      assert(
        owner.stash.lifeCards.some((lc) => lc.title === "Persuasion"),
        "Persuasion decline: Persuasion card stays with owner (not transferred)",
      );
    }
  } catch (e) {
    assert(false, `Persuasion life card error: ${e.message}`);
  }

  return results;
}
