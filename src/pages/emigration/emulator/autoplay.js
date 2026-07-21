/**
 * Emigration — Autoplay AI Module
 * Provides automated game-playing strategy for playtesting.
 */

import { DESTINATIONS } from "./engine.js";


/**
 * Create an AI player that can play the game automatically.
 * @param {import('./engine.js').default} engine
 * @returns {Object} Autoplay controller
 */
export function createAutoPlayer(engine, difficulty = "normal") {
  /**
   * Choose the best required action for the current player.
   * Priority: Activate Payday → Buy ticket/passport → Buy cheap cards → ...
   */
  function chooseAction() {
    const player = engine.players[engine.currentPlayerIdx];
    const actions = engine.getValidActions(player);
    const enabled = (type) => actions.find((a) => a.type === type)?.enabled;

    // Expert Mode: evaluate all possible valid moves with a heuristic score
    if (difficulty === "expert") {
      const bestMove = _getBestHeuristicAction(player, actions);
      if (bestMove) return { type: bestMove.type, params: bestMove.params };
    }

    // Difficulty logic: Easy is 100% random choice, Normal is 30% random choice
    if (
      difficulty === "easy" ||
      (difficulty === "normal" && Math.random() < 0.3)
    ) {
      const possible = [];
      if (enabled("activate")) {
        const pt = _findBestActivateTarget(player, "payday");
        if (pt) possible.push({ type: "activate", params: pt });
        const lt = _findBestActivateTarget(player, "life");
        if (lt) possible.push({ type: "activate", params: lt });
      }
      if (enabled("buy")) {
        const bt = _findCheapestBuyTarget(player);
        if (bt) possible.push({ type: "buy", params: bt });
      }
      if (
        player.stash.tickets < 1 &&
        engine.publicServices.tickets > 0 &&
        player.stash.connections.length >= 1 &&
        player.money >= 2
      ) {
        possible.push({ type: "buyPool", params: { cardType: "ticket" } });
      }
      if (
        player.stash.passports < 1 &&
        engine.publicServices.passports > 0 &&
        player.stash.documents.length >= 1 &&
        player.money >= 2
      ) {
        possible.push({ type: "buyPool", params: { cardType: "passport" } });
      }
      if (enabled("reclaim")) {
        const rt = _findReclaimTarget(player);
        if (rt) possible.push({ type: "reclaim", params: rt });
      }
      if (enabled("steal")) {
        if (
          player.stash.tickets < 1 &&
          engine.publicServices.tickets > 0 &&
          player.stash.connections.length >= 1
        )
          possible.push({ type: "steal", params: { cardType: "ticket" } });
        if (
          player.stash.passports < 1 &&
          engine.publicServices.passports > 0 &&
          player.stash.documents.length >= 1
        )
          possible.push({ type: "steal", params: { cardType: "passport" } });
      }
      if (enabled("applyCollege")) {
        possible.push({ type: "applyCollege", params: {} });
      }
      if (enabled("discard")) {
        const dt = _findDiscardTarget(player);
        if (dt) possible.push(dt);
      }

      if (possible.length > 0) {
        return possible[Math.floor(Math.random() * possible.length)];
      }
    }

    // Normal Mode:
    // 1. Activate available Payday cards (if net positive)
    if (enabled("activate")) {
      const paydayTarget = _findBestActivateTarget(player, "payday");
      if (paydayTarget) {
        return { type: "activate", params: paydayTarget };
      }
    }

    // 2. Prioritize getting a Ticket and Passport if missing
    if (
      player.stash.tickets < 1 &&
      engine.publicServices.tickets > 0 &&
      player.stash.connections.length >= 1 &&
      player.money >= 2
    ) {
      return { type: "buyPool", params: { cardType: "ticket" } };
    }
    if (
      player.stash.passports < 1 &&
      engine.publicServices.passports > 0 &&
      player.stash.documents.length >= 1 &&
      player.money >= 2
    ) {
      return { type: "buyPool", params: { cardType: "passport" } };
    }

    if (enabled("reclaim")) {
      const reclaimTarget = _findReclaimTarget(player);
      if (reclaimTarget) {
        return { type: "reclaim", params: reclaimTarget };
      }
    }

    if (enabled("steal")) {
      if (
        player.stash.tickets < 1 &&
        engine.publicServices.tickets > 0 &&
        player.stash.connections.length >= 1
      ) {
        return { type: "steal", params: { cardType: "ticket" } };
      }
      if (
        player.stash.passports < 1 &&
        engine.publicServices.passports > 0 &&
        player.stash.documents.length >= 1
      ) {
        return { type: "steal", params: { cardType: "passport" } };
      }
    }

    // 3. Buy cheapest available Documents/Connections
    if (enabled("buy")) {
      const buyTarget = _findCheapestBuyTarget(player);
      if (buyTarget) {
        return { type: "buy", params: buyTarget };
      }
    }

    // 4. Activate Life cards
    if (enabled("activate")) {
      const lifeTarget = _findBestActivateTarget(player, "life");
      if (lifeTarget) {
        return { type: "activate", params: lifeTarget };
      }
    }

    // 5. Apply for College
    if (enabled("applyCollege")) {
      return { type: "applyCollege", params: {} };
    }

    // 6. Discard
    if (enabled("discard")) {
      return _findDiscardTarget(player);
    }

    // Fallback
    for (const a of actions) {
      if (!a.optional && a.enabled) {
        return { type: a.type, params: {} };
      }
    }
    return null;
  }

  function _getBestHeuristicAction(player, actions) {
    const possibleMoves = [];
    const enabled = (type) => actions.find((a) => a.type === type)?.enabled;

    // Generate ALL possible valid moves
    if (enabled("activate")) {
      for (const p of engine.players) {
        const fee = p.id === player.id ? 0 : player.accessFee;
        if (player.money < fee) continue;
        for (let i = 0; i < 14; i++) {
          if (engine.isCardAvailable(p, i)) {
            const card = p.layout[i].card;
            if (card.type === "payday" || card.type === "life") {
              possibleMoves.push({ type: "activate", params: { targetPlayerIdx: p.id, slotIdx: i }, card, fee, targetId: p.id });
            }
          }
        }
      }
    }
    if (enabled("buy")) {
      for (const p of engine.players) {
        const fee = p.id === player.id ? 0 : player.accessFee;
        for (let i = 0; i < 14; i++) {
          if (engine.isCardAvailable(p, i)) {
            const card = p.layout[i].card;
            if (card.type === "document" || card.type === "connection") {
              const cost = engine.getEffectiveCost(player, card);
              if (player.money >= cost + fee) {
                possibleMoves.push({ type: "buy", params: { targetPlayerIdx: p.id, slotIdx: i }, card, cost, fee });
              }
            }
          }
        }
      }
    }
    if (enabled("buyPool")) {
      if (player.money >= 2 && player.stash.connections.length >= 1 && engine.publicServices.tickets > 0) {
        possibleMoves.push({ type: "buyPool", params: { cardType: "ticket" }});
      }
      if (player.money >= 2 && player.stash.documents.length >= 1 && engine.publicServices.passports > 0) {
        possibleMoves.push({ type: "buyPool", params: { cardType: "passport" }});
      }
    }
    if (enabled("reclaim")) {
      const rt = _findReclaimTarget(player);
      if (rt) possibleMoves.push({ type: "reclaim", params: rt });
    }
    if (enabled("steal")) {
      if (player.stash.tickets < 1 && engine.publicServices.tickets > 0 && player.stash.connections.length >= 1) {
        possibleMoves.push({ type: "steal", params: { cardType: "ticket" } });
      }
      if (player.stash.passports < 1 && engine.publicServices.passports > 0 && player.stash.documents.length >= 1) {
        possibleMoves.push({ type: "steal", params: { cardType: "passport" } });
      }
    }
    if (enabled("applyCollege")) {
      possibleMoves.push({ type: "applyCollege", params: {} });
    }
    if (enabled("discard")) {
      for (const p of engine.players) {
        const fee = p.id === player.id ? 0 : player.accessFee;
        if (player.money < fee) continue;
        for (let i = 0; i < 14; i++) {
          if (engine.isCardAvailable(p, i)) {
            const card = p.layout[i].card;
            if (card.type === "document" || card.type === "connection") {
              possibleMoves.push({ type: "discard", params: { source: "layout", targetPlayerIdx: p.id, slotIdx: i }, card, fee, targetId: p.id });
            }
          }
        }
      }
    }
    if (enabled("forfeit")) {
      possibleMoves.push({ type: "forfeit", params: {} });
    }

    if (possibleMoves.length === 0) return null;

    // Look up destination-specific Assurance rules for this player
    const dest = DESTINATIONS.find((d) => d.name === player.destination);
    const destTargets = dest?.targets;
    const destCheck = dest?.check;

    // Current resource counts
    let m = player.money;
    let d = player.stash.documents.length;
    let c = player.stash.connections.length;
    let pTickets = player.stash.tickets;
    let pPassports = player.stash.passports;

    // Include Frontrunner money (mirrors engine.js Phase 2 calculation)
    const frCard = player.stash.lifeCards.find((lc) => lc.title === "Frontrunner");
    const frMoney = frCard?.money || 0;
    const currentAssurance = destCheck ? destCheck(m + frMoney, d, c) : 0;

    const getSmoothedAssurance = (m, d, c) => {
      let score = 0;
      const actuals = { m, d, c };
      if (!destTargets) return 0;
      
      for (const [key, amount] of Object.entries(actuals)) {
        const rules = destTargets[key];
        if (!rules) continue;
        
        if (rules.setSize > 0) {
          score += (amount / rules.setSize) * (rules.reward || 0);
        }
        
        if (rules.minRequired !== undefined) {
          if (amount < rules.minRequired) {
            score -= ((rules.minRequired - amount) / rules.minRequired) * (rules.penalty || 0);
          }
        }
      }
      return score;
    };

    const evaluateScore = (move) => {
      let score = 0;

      if (move.type === "activate") {
        if (move.card.type === "payday") {
          const netGain = player.salary - move.fee;
          if (netGain <= 0) return -100;
          // Value money gain via Assurance impact
          const assuranceNow = getSmoothedAssurance(m + frMoney, d, c);
          const assuranceAfter = getSmoothedAssurance(m + netGain + frMoney, d, c);
          score = netGain * 1.5 + (assuranceAfter - assuranceNow) * 4;
          if (move.targetId !== player.id) score -= 2;
        } else {
          score = 3 - move.fee;
        }
      } else if (move.type === "buy") {
        const totalCost = move.cost + move.fee;
        score = -totalCost;

        const isDoc = move.card.type === "document";
        const isConn = move.card.type === "connection";
        
        const assuranceNow = getSmoothedAssurance(m + frMoney, d, c);
        const assuranceAfter = getSmoothedAssurance(m - totalCost + frMoney, d + (isDoc ? 1 : 0), c + (isConn ? 1 : 0));
        
        score += (assuranceAfter - assuranceNow) * 5;
        
        // Extra value if this doc enables buying a passport
        if (isDoc && pPassports < 1 && d === 0) score += 15;
        if (isConn && pTickets < 1 && c === 0) score += 15;
      } else if (move.type === "buyPool") {
        // Late game scale
        const faceUpLeft = engine.players.reduce((sum, p) => sum + p.layout.filter(l => l && l.faceUp).length, 0);
        const urgency = 15 + Math.max(0, 14 - faceUpLeft) * 1.5;
        
        if (move.params.cardType === "ticket") {
          score = (pTickets < 1) ? urgency : -10;
        } else {
          score = (pPassports < 1) ? urgency : -10;
        }
      } else if (move.type === "reclaim") {
        const faceUpLeft = engine.players.reduce((sum, p) => sum + p.layout.filter(l => l && l.faceUp).length, 0);
        const urgency = 10 + Math.max(0, 14 - faceUpLeft) * 1.5;
        if (move.params.cardType === "ticket") score = (pTickets < 1) ? urgency : -10;
        else score = (pPassports < 1) ? urgency : -10;
      } else if (move.type === "steal") {
        score = -5;
        const faceUpLeft = engine.players.reduce((sum, p) => sum + p.layout.filter(l => l && l.faceUp).length, 0);
        const urgency = 10 + Math.max(0, 14 - faceUpLeft) * 1.5;
        if (move.params.cardType === "ticket" && pTickets < 1) score += urgency;
        if (move.params.cardType === "passport" && pPassports < 1) score += urgency;
      } else if (move.type === "applyCollege") {
        const isLateGame = engine.publicServices.tickets <= 1 || engine.publicServices.passports <= 1;
        score = isLateGame ? -5 : 4;
      } else if (move.type === "discard") {
        score = 2 - move.fee;
        if (move.targetId !== player.id) {
          score += 3;
        } else {
          score -= 2;
        }
      }

      // Tie-breaker: random noise to prevent infinite loops
      return score + Math.random() * 0.1;
    };

    possibleMoves.forEach(m => m._score = evaluateScore(m));
    possibleMoves.sort((a, b) => b._score - a._score);
    
    return possibleMoves[0];
  }

  /**
   * Find the best card to activate (payday or life).
   */
  function _findBestActivateTarget(player, cardType) {
    // Prefer own layout (no access fee), then cheapest opponent
    const candidates = [];

    for (const p of engine.players) {
      const fee = p.id === player.id ? 0 : player.accessFee;
      if (player.money < fee) continue;
      
      // Prevent activating opponent's payday if it's a net loss
      if (cardType === "payday" && p.id !== player.id && player.salary <= fee) continue;

      for (let i = 0; i < 14; i++) {
        if (engine.isCardAvailable(p, i)) {
          const card = p.layout[i].card;
          if (card.type === cardType) {
            candidates.push({ targetPlayerIdx: p.id, slotIdx: i, fee });
          }
        }
      }
    }

    if (candidates.length === 0) return null;
    // Sort: own layout first (fee=0), then by fee
    candidates.sort((a, b) => a.fee - b.fee);
    return {
      targetPlayerIdx: candidates[0].targetPlayerIdx,
      slotIdx: candidates[0].slotIdx,
    };
  }

  /**
   * Find cheapest buyable Document or Connection.
   */
  function _findCheapestBuyTarget(player) {
    const candidates = [];

    for (const p of engine.players) {
      const fee = p.id === player.id ? 0 : player.accessFee;
      for (let i = 0; i < 14; i++) {
        if (engine.isCardAvailable(p, i)) {
          const card = p.layout[i].card;
          if (card.type === "document" || card.type === "connection") {
            const cost = engine.getEffectiveCost(player, card);
            if (player.money >= cost + fee) {
              candidates.push({
                targetPlayerIdx: p.id,
                slotIdx: i,
                totalCost: cost + fee,
                cardType: card.type,
              });
            }
          }
        }
      }
    }

    if (candidates.length === 0) return null;

    // Prefer: balance doc/conn ratio, then cheapest
    const docs = player.stash.documents.length;
    const conns = player.stash.connections.length;

    candidates.sort((a, b) => {
      // Prefer whichever type we have fewer of
      const aPreferred =
        (a.cardType === "document" && docs <= conns) ||
        (a.cardType === "connection" && conns <= docs);
      const bPreferred =
        (b.cardType === "document" && docs <= conns) ||
        (b.cardType === "connection" && conns <= docs);
      if (aPreferred !== bPreferred) return aPreferred ? -1 : 1;
      return a.totalCost - b.totalCost;
    });

    return {
      targetPlayerIdx: candidates[0].targetPlayerIdx,
      slotIdx: candidates[0].slotIdx,
    };
  }

  /**
   * Find a reclaim target.
   */
  function _findReclaimTarget(player) {
    const cost = 2 + player.accessFee;
    if (player.money < cost) return null;

    for (const p of engine.players) {
      if (p.id === player.id) continue;
      if (player.stash.tickets < 1 && p.stash.tickets > 1) {
        return { targetPlayerIdx: p.id, cardType: "ticket" };
      }
      if (player.stash.passports < 1 && p.stash.passports > 1) {
        return { targetPlayerIdx: p.id, cardType: "passport" };
      }
    }
    return null;
  }

  /**
   * Find the least valuable card to discard.
   */
  function _findDiscardTarget(player) {
    // Discard from own layout
    for (let i = 0; i < 14; i++) {
      if (engine.isCardAvailable(player, i)) {
        const card = player.layout[i].card;
        if (card.type === "document" || card.type === "connection") {
          return {
            type: "discard",
            params: {
              source: "layout",
              targetPlayerIdx: player.id,
              slotIdx: i,
            },
          };
        }
      }
    }

    // Discard from opponent layout
    for (const p of engine.players) {
      if (p.id === player.id) continue;
      if (player.money < player.accessFee) continue;
      for (let i = 0; i < 14; i++) {
        if (engine.isCardAvailable(p, i)) {
          const card = p.layout[i].card;
          if (card.type === "document" || card.type === "connection") {
            return {
              type: "discard",
              params: { source: "layout", targetPlayerIdx: p.id, slotIdx: i },
            };
          }
        }
      }
    }

    return { type: "discard", params: {} };
  }

  /**
   * Resolve a pending choice using AI strategy.
   */
  function resolveChoice() {
    if (!engine.pendingChoice) return;
    const choice = engine.pendingChoice;
    const opts = choice.options;

    // Strategy-based resolution
    const id = choice.id || "";

    // Keep Calm: don't use it (save for bad cards)
    if (id === "keep-calm-check") {
      engine.resolveChoice("skip");
      return;
    }

    // Persuasion: skip offering it
    if (id === "persuasion-offer") {
      engine.resolveChoice("skip");
      return;
    }

    // May Keep: keep if it has a useful ongoing effect
    if (id === "may-keep-choice") {
      engine.resolveChoice("keep");
      return;
    }

    // FOMO: skip trading destinations
    if (id === "fomo") {
      engine.resolveChoice("skip");
      return;
    }

    // Mental Fog: don't discard life cards
    if (id === "mental-fog") {
      engine.resolveChoice("skip");
      return;
    }

    // For money vs. card choices: take money
    if (opts.some((o) => o.value === "money")) {
      engine.resolveChoice("money");
      return;
    }

    // Trousers: lose money rather than documents
    if (id === "trousers") {
      engine.resolveChoice("money");
      return;
    }

    // Suspect: lose connection if available
    if (id === "suspect-penalty") {
      engine.resolveChoice(
        opts.some((o) => o.value === "conn") ? "conn" : "doc",
      );
      return;
    }

    // Default: pick first option
    if (opts.length > 0) {
      engine.resolveChoice(opts[0].value);
    }
  }

  /**
   * Choose a security lane for border crossing.
   *
   * Tokens in each lane are face-down and shuffled. As players cross, tokens are revealed
   * and removed from lanes. This function adapts based on REMAINING tokens (public knowledge)
   * and calculates success probability for each lane.
   *
   * Strategy:
   * 1. For each lane, examine only the remaining tokens (not already revealed/consumed)
   * 2. Calculate probability of success: (tokens ≤ assurance) / (remaining tokens)
   * 3. Pick the lane with highest success probability
   * 4. On tie, pick lane with lowest average remaining token (most "forgiving")
   */
  function chooseLane() {
    const playerIdx = engine.crossingOrder ? engine.crossingOrder[engine.activeCrossingIdx] : engine.activeCrossingIdx;
    const player = engine.players[playerIdx];
    const assurance = player.assurance;

    // Evaluate each lane based on REMAINING tokens
    const laneScores = engine.securityLanes
      .map((lane, laneIdx) => {
        if (lane.tokens.length === 0) return null;

        const remaining = lane.tokens;
        const successCount = remaining.filter((t) => t <= assurance).length;
        const successProb = successCount / remaining.length;
        const avgToken =
          remaining.reduce((a, b) => a + b, 0) / remaining.length;

        return {
          laneIdx,
          successProb,
          avgToken,
          remainingCount: remaining.length,
        };
      })
      .filter((l) => l !== null);

    if (laneScores.length === 0) return 0;

    // Sort by: highest success probability first, then lowest average token
    laneScores.sort((a, b) => {
      if (a.successProb !== b.successProb) {
        return b.successProb - a.successProb; // Higher probability = better
      }
      return a.avgToken - b.avgToken; // Lower average token = more forgiving
    });

    return laneScores[0].laneIdx;
  }

  /**
   * Play one complete turn (optional + required actions).
   * Returns true if a turn was played, false if game is over or stuck.
   */
  function playTurn() {
    if (engine.phase === "game_over") return false;

    if (engine.phase === "crossing") {
      const laneIdx = chooseLane();
      engine.selectLane(laneIdx);
      return true;
    }

    // Resolve any pending choice first
    let safetyCounter = 0;
    while (engine.pendingChoice && safetyCounter < 20) {
      resolveChoice();
      safetyCounter++;
    }

    if (engine.phase !== "preparation") return engine.phase !== "game_over";

    const player = engine.players[engine.currentPlayerIdx];

    // Optional: try to graduate if in college
    if (player.inCollege) {
      engine.executeOptionalAction("graduate");
    }

    // Optional: sell a card from stash if low on money (e.g. to afford access fee or tickets)
    // Optional: try to graduate if in college
    if (player.inCollege) {
      engine.executeOptionalAction("graduate");
    }

    let action = null;
    let didSell = false;

    if (difficulty === "expert") {
      // 1. Evaluate actions WITHOUT selling
      const actionsNoSell = engine.getValidActions(player);
      const bestMoveNoSell = _getBestHeuristicAction(player, actionsNoSell);
      const scoreNoSell = bestMoveNoSell ? bestMoveNoSell._score : -999;

      // 2. Evaluate actions WITH a simulated sell, if possible
      let scoreWithSell = -999;
      let stashTypeToSell = null;
      let stashIdxToSell = -1;
      let bestMoveWithSell = null;

      const trySell = (type, list) => {
        if (list.length > 0) {
          const idx = list.reduce((best, c, i) => (c.cost < list[best].cost ? i : best), 0);
          const item = list.splice(idx, 1)[0];
          player.money += 2;

          const simActions = engine.getValidActions(player);
          const simBest = _getBestHeuristicAction(player, simActions);
          if (simBest && simBest._score > scoreWithSell) {
            scoreWithSell = simBest._score;
            bestMoveWithSell = simBest;
            stashTypeToSell = type;
            stashIdxToSell = idx;
          }

          player.money -= 2;
          list.splice(idx, 0, item); // restore
        }
      };

      trySell("document", player.stash.documents);
      trySell("connection", player.stash.connections);

      if (scoreWithSell > scoreNoSell + 5 && stashTypeToSell) {
        engine.executeOptionalAction("sell", { stashType: stashTypeToSell, stashIdx: stashIdxToSell });
        action = { type: bestMoveWithSell.type, params: bestMoveWithSell.params };
        didSell = true;
      }
    }

    if (!didSell) {
      // Fallback normal/easy behavior
      if (difficulty !== "expert" && player.money < 2) {
        if (player.stash.documents.length > 0) {
          const idx = player.stash.documents.reduce((best, c, i) => (c.cost < player.stash.documents[best].cost ? i : best), 0);
          engine.executeOptionalAction("sell", { stashType: "document", stashIdx: idx });
        } else if (player.stash.connections.length > 0) {
          const idx = player.stash.connections.reduce((best, c, i) => (c.cost < player.stash.connections[best].cost ? i : best), 0);
          engine.executeOptionalAction("sell", { stashType: "connection", stashIdx: idx });
        }
      }
      action = chooseAction();
    }

    if (!action) return false;

    engine.executeRequiredAction(action.type, action.params);

    // Resolve any resulting choices
    safetyCounter = 0;
    while (engine.pendingChoice && safetyCounter < 20) {
      resolveChoice();
      safetyCounter++;
    }

    return engine.phase !== "game_over";
  }

  /**
   * Play the entire game from current state to completion.
   * @param {number} [speed=0] - Milliseconds between actions. 0 = instant.
   * @param {((turn: number) => void)|null} [onTurnComplete] - Callback after each turn
   * @returns {Promise<Object>} Game result
   */
  async function playFullGame(speed = 0, onTurnComplete = null) {
    let turnCount = 0;
    const maxTurns = 5000;

    while (engine.phase !== "game_over" && turnCount < maxTurns) {
      const played = playTurn();
      turnCount++;

      if (onTurnComplete) onTurnComplete(turnCount);

      if (!played && engine.phase !== "game_over") {
        // Stuck — force phase 2
        engine.triggerPhase2();
        // Resolve crossing
        while (engine.phase === "crossing") {
          const laneIdx = chooseLane();
          engine.selectLane(laneIdx);
        }
        break;
      }

      if (speed > 0) {
        await new Promise((resolve) => setTimeout(resolve, speed));
      }
    }

    if (engine.phase !== "game_over" && turnCount >= maxTurns) {
      engine.log("AI safety: max turns reached, forcing end.", "error");
      engine.triggerPhase2();
      while (engine.phase === "crossing") {
        engine.selectLane(chooseLane());
      }
    }

    return engine.gameResult;
  }

  return {
    chooseAction,
    resolveChoice,
    chooseLane,
    playTurn,
    playFullGame,
  };
}
