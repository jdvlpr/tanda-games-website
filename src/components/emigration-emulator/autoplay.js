/**
 * Emigration — Autoplay AI Module
 * Provides automated game-playing strategy for playtesting.
 */

import { DESTINATIONS } from "./engine.svelte.js";

/**
 * Create an AI player that can play the game automatically.
 * @param {import('./engine.svelte.js').default} engine
 * @returns {Object} Autoplay controller
 */
export function createAutoPlayer(
  engine,
  difficulty = "expert",
  { botIndices = null, personas = {} } = {},
) {
  /**
   * Choose the best required action for the current player.
   * Priority: Activate Payday → Buy ticket/passport → Buy cheap cards → ...
   */
  function chooseAction() {
    const player = engine.players[engine.currentPlayerIdx];
    const actions = engine.getValidActions(player);
    const enabled = (type) => actions.find((a) => a.type === type)?.enabled;

    // Expert Mode: evaluate all possible valid moves with a heuristic score
    const persona = personas[engine.currentPlayerIdx] || difficulty;

    if (persona === "expert" || persona === "rusher" || persona === "hoarder" || persona === "saboteur" || persona === "conservative") {
      const bestMove = _getBestHeuristicAction(player, actions, persona);
      if (bestMove) return { type: bestMove.type, params: bestMove.params };
    }

    // Difficulty logic: Easy is 100% random choice, Normal is 30% random choice
    if (
      persona === "easy" || persona === "random" ||
      (persona === "normal" && Math.random() < 0.3)
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
        engine.publicServices.tickets > 0 &&
        player.stash.connections.length >= 1 &&
        player.money >= 2
      ) {
        possible.push({ type: "buyPool", params: { cardType: "ticket" } });
      }
      if (
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
          engine.publicServices.tickets > 0 &&
          player.stash.connections.length >= 1
        )
          possible.push({ type: "steal", params: { cardType: "ticket" } });
        if (
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
    // 1. Prioritize getting a Ticket and Passport if missing
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

    // 2. Activate available Payday cards (if net positive)
    if (enabled("activate")) {
      const paydayTarget = _findBestActivateTarget(player, "payday");
      if (paydayTarget) {
        return { type: "activate", params: paydayTarget };
      }
    }

    if (enabled("reclaim")) {
      const reclaimTarget = _findReclaimTarget(player);
      if (reclaimTarget) {
        return { type: "reclaim", params: reclaimTarget };
      }
    }

    if (enabled("steal")) {
      const faceUpLeft = engine.players.reduce(
        (sum, p) => sum + p.layout.filter((l) => l && l.faceUp).length,
        0,
      );
      const lateGame = faceUpLeft <= 6;
      const cantBuy = !enabled("buy") || player.money < 2;
      if (lateGame || cantBuy) {
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

      // Hoarding: steal an extra ticket/passport to deny opponents and earn reclaim fees later.
      // Only worth it mid/early game when there are surplus docs in the pool.
      const midGame = !lateGame;
      if (midGame) {
        const otherPlayersNeedTicket = engine.players.some(
          (p) => p.id !== player.id && p.stash.tickets < 1,
        );
        const otherPlayersNeedPassport = engine.players.some(
          (p) => p.id !== player.id && p.stash.passports < 1,
        );
        if (
          player.stash.tickets >= 1 &&
          engine.publicServices.tickets > 1 &&
          player.stash.connections.length >= 1 &&
          otherPlayersNeedTicket
        ) {
          return { type: "steal", params: { cardType: "ticket" } };
        }
        if (
          player.stash.passports >= 1 &&
          engine.publicServices.passports > 1 &&
          player.stash.documents.length >= 1 &&
          otherPlayersNeedPassport
        ) {
          return { type: "steal", params: { cardType: "passport" } };
        }
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

  function _getBestHeuristicAction(player, actions, persona) {
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
              possibleMoves.push({
                type: "activate",
                params: { targetPlayerIdx: p.id, slotIdx: i },
                card,
                fee,
                targetId: p.id,
              });
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
                possibleMoves.push({
                  type: "buy",
                  params: { targetPlayerIdx: p.id, slotIdx: i },
                  card,
                  cost,
                  fee,
                });
              }
            }
          }
        }
      }
    }
    if (enabled("buy")) {
      if (
        player.money >= 2 &&
        player.stash.connections.length >= 1 &&
        engine.publicServices.tickets > 0
      ) {
        possibleMoves.push({ type: "buyPool", params: { cardType: "ticket" } });
      }
      if (
        player.money >= 2 &&
        player.stash.documents.length >= 1 &&
        engine.publicServices.passports > 0
      ) {
        possibleMoves.push({
          type: "buyPool",
          params: { cardType: "passport" },
        });
      }
    }
    if (enabled("reclaim")) {
      const rt = _findReclaimTarget(player);
      if (rt) possibleMoves.push({ type: "reclaim", params: rt });
    }
    if (enabled("steal")) {
      if (
        player.stash.tickets < 1 &&
        engine.publicServices.tickets > 0 &&
        player.stash.connections.length >= 1
      ) {
        possibleMoves.push({ type: "steal", params: { cardType: "ticket" } });
      }
      if (
        player.stash.passports < 1 &&
        engine.publicServices.passports > 0 &&
        player.stash.documents.length >= 1
      ) {
        possibleMoves.push({ type: "steal", params: { cardType: "passport" } });
      }
      // Hoarding candidates: steal extras to deny opponents and earn reclaim fees
      const otherPlayersNeedTicket = engine.players.some(
        (p) => p.id !== player.id && p.stash.tickets < 1,
      );
      const otherPlayersNeedPassport = engine.players.some(
        (p) => p.id !== player.id && p.stash.passports < 1,
      );
      if (
        player.stash.tickets >= 1 &&
        engine.publicServices.tickets > 1 &&
        player.stash.connections.length >= 1 &&
        otherPlayersNeedTicket
      ) {
        possibleMoves.push({
          type: "steal",
          params: { cardType: "ticket" },
          isHoardingMove: true,
        });
      }
      if (
        player.stash.passports >= 1 &&
        engine.publicServices.passports > 1 &&
        player.stash.documents.length >= 1 &&
        otherPlayersNeedPassport
      ) {
        possibleMoves.push({
          type: "steal",
          params: { cardType: "passport" },
          isHoardingMove: true,
        });
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
              possibleMoves.push({
                type: "discard",
                params: { source: "layout", targetPlayerIdx: p.id, slotIdx: i },
                card,
                fee,
                targetId: p.id,
              });
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
    const dest = DESTINATIONS.find((d) => d.name === player.destination.name);
    const destTargets = dest?.targets;
    const destCheck = dest?.check;

    // Current resource counts
    let m = player.money;
    let d = player.stash.documents.length;
    let c = player.stash.connections.length;
    let pTickets = player.stash.tickets;
    let pPassports = player.stash.passports;

    // Dynamic metrics for player-count and game progress scaling
    const playerCount = engine.players.length;
    const totalStartingLayoutCards = playerCount * 14;
    const totalLayoutCardsRemaining = engine.players.reduce(
      (sum, p) => sum + p.layout.filter((l) => l !== null).length,
      0,
    );
    const faceUpLeft = engine.players.reduce(
      (sum, p) => sum + p.layout.filter((l) => l && l.faceUp).length,
      0,
    );
    const layoutProgress = Math.max(
      0,
      Math.min(1, 1 - totalLayoutCardsRemaining / totalStartingLayoutCards),
    );
    const estimatedTurnsRemaining = totalLayoutCardsRemaining / playerCount;

    // Include Frontrunner money (mirrors engine.svelte.js Phase 2 calculation)
    const frCard = player.stash.lifeCards.find(
      (lc) => lc.title === "Frontrunner",
    );
    const frMoney = frCard?.money || 0;
    const currentAssurance = destCheck ? destCheck(m + frMoney, d, c) : 0;

    const hasTicketAndPassport = pTickets >= 1 && pPassports >= 1;
    const readinessScore =
      (hasTicketAndPassport ? 10 : -20) + (currentAssurance - 6);

    const getSmoothedAssurance = (m, d, c) => {
      let score = 0;
      const actuals = { m, d, c };
      if (!destTargets) return 0;

      for (const [key, amount] of Object.entries(actuals)) {
        const rules = destTargets[key];
        if (!rules) continue;

        if (rules.minRequired !== undefined && amount < rules.minRequired) {
          // Linearly interpolate the penalty based on how many we are missing
          const missing = rules.minRequired - amount;
          score -= (missing / rules.minRequired) * (rules.penalty || 0);
        }

        if (rules.setSize > 0) {
          // Discrete reward for completed sets
          score += Math.floor(amount / rules.setSize) * (rules.reward || 0);
          // Smaller continuous reward for partial sets to guide the AI
          score +=
            ((amount % rules.setSize) / rules.setSize) *
            ((rules.reward || 0) * 0.5);
        }
      }
      return score;
    };

    const evaluateScore = (move) => {
      let score = 0;

      const isRusher = persona === 'rusher';
      const isHoarder = persona === 'hoarder';
      const isSaboteur = persona === 'saboteur';
      const isConservative = persona === 'conservative';

      if (move.type === "activate") {
        if (move.card.type === "payday") {
          // Rule 2: Never activate Payday while in college (salary is 0 Money)
          if (player.inCollege) return -100;
          // Conservative: only activate own Payday (avoids giving stipends to opponents)
          if (isConservative && move.targetId !== player.id) return -100;

          const mySalary = player.salary;
          const netGain = mySalary - move.fee;
          const opponentsCount = Math.max(1, playerCount - 1);
          const totalOpponentStipends = opponentsCount * 1;
          const totalOpponentGain =
            (move.targetId === player.id ? 0 : move.fee) +
            totalOpponentStipends;
          const avgOpponentGain = totalOpponentGain / opponentsCount;
          const relativeAdvantage = netGain - avgOpponentGain;

          if (netGain <= 0 || relativeAdvantage < 0) return -100;

          // Value money gain via Assurance impact
          const assuranceNow = getSmoothedAssurance(m + frMoney, d, c);
          const assuranceAfter = getSmoothedAssurance(
            m + netGain + frMoney,
            d,
            c,
          );

          // Rule 3: Exploiting Payday Asymmetry
          score = relativeAdvantage * (isHoarder ? 6 : 3) + (assuranceAfter - assuranceNow) * 4;
          if (move.targetId === player.id) {
            score += 4; // Bonus for activating own layout (removes a card for free)
          }
          if (readinessScore < 0 && move.targetId !== player.id) {
            score -= 5 * layoutProgress; // Preserve layout if not ready for Phase 2
          }
        } else {
          score = 3 - move.fee;
        }
      } else if (move.type === "buy") {
        const totalCost = move.cost + move.fee;
        // Mild liquidity penalty (Assurance already penalizes money spent)
        score = -(totalCost * (isHoarder ? 1.5 : 0.5));

        const isDoc = move.card.type === "document";
        const isConn = move.card.type === "connection";

        const assuranceNow = getSmoothedAssurance(m + frMoney, d, c);
        const assuranceAfter = getSmoothedAssurance(
          m - totalCost + frMoney,
          d + (isDoc ? 1 : 0),
          c + (isConn ? 1 : 0),
        );

        score += (assuranceAfter - assuranceNow) * (isHoarder ? 10 : 5);

        // Penalty avoidance boost: high incentive to clear destination minRequired missing cards
        if (
          isDoc &&
          destTargets?.d?.minRequired !== undefined &&
          d < destTargets.d.minRequired
        ) {
          score += (destTargets.d.penalty || 2) * 4;
        }
        if (
          isConn &&
          destTargets?.c?.minRequired !== undefined &&
          c < destTargets.c.minRequired
        ) {
          score += (destTargets.c.penalty || 2) * 4;
        }

        // Hoarding/Set completion bonus: reward completing or progressing sets
        if (isDoc && destTargets?.d?.setSize > 0) {
          const setSize = destTargets.d.setSize;
          if ((d + 1) % setSize === 0) score += (destTargets.d.reward || 2) * 2;
        }
        if (isConn && destTargets?.c?.setSize > 0) {
          const setSize = destTargets.c.setSize;
          if ((c + 1) % setSize === 0) score += (destTargets.c.reward || 2) * 2;
        }

        // Extra value if this doc enables buying a passport/ticket
        if (isDoc && pPassports < 1 && d === 0) score += 15;
        if (isConn && pTickets < 1 && c === 0) score += 15;
      } else if (move.type === "buyPool") {
        // Rule 1: Mandatory Ticket/Passport Safety Gate
        // Exponential urgency as layout cards dwindle to guarantee Ticket & Passport before Phase 2
        const urgency = (isRusher ? 40 : 20) + Math.pow(Math.max(0, 14 - faceUpLeft), 1.5) * 1.5;
        const isTicket = move.params.cardType === "ticket";
        const hasDoc = isTicket ? pTickets >= 1 : pPassports >= 1;

        if (!hasDoc) {
          score = urgency;
        } else {
          // Hoarding buy: if AI has money ($4+) and opponents still need this doc type, buy to hoard!
          const otherNeed = engine.players.some(
            (p) =>
              p.id !== player.id &&
              (isTicket ? p.stash.tickets < 1 : p.stash.passports < 1),
          );
          if (
            player.money >= 4 &&
            otherNeed &&
            ((isTicket && engine.publicServices.tickets > 1) ||
              (!isTicket && engine.publicServices.passports > 1))
          ) {
            score = 8;
          } else {
            score = -10;
          }
        }
      } else if (move.type === "reclaim") {
        const urgency = 18 + Math.pow(Math.max(0, 14 - faceUpLeft), 1.5) * 1.5;
        if (move.params.cardType === "ticket")
          score = pTickets < 1 ? urgency : -10;
        else score = pPassports < 1 ? urgency : -10;
      } else if (move.type === "steal") {
        const isTicket = move.params.cardType === "ticket";
        const hasDoc = isTicket ? pTickets >= 1 : pPassports >= 1;
        const urgency = 15 + Math.pow(Math.max(0, 14 - faceUpLeft), 1.5) * 1.5;

        if (!hasDoc) {
          if (player.money >= 2) {
            score = -50; // Prefer buyPool if affordable
          } else {
            score = urgency;
          }
        } else if (move.isHoardingMove) {
          const opponentsDeprived = engine.players.filter(
            (p) =>
              p.id !== player.id &&
              ((isTicket && p.stash.tickets < 1) ||
                (!isTicket && p.stash.passports < 1)),
          ).length;
          score = 5 + opponentsDeprived * 3;
        } else {
          score = -10;
        }
        if (isSaboteur) score += 20;
        if (isConservative) return -100; // Never steals — prefers buyPool
      } else if (move.type === "applyCollege") {
        // Conservative applies to college more eagerly — lower reserve threshold
        const maxTuition = (player.startingFund || 6) + 6;
        const reserveNeeded = isConservative
          ? maxTuition
          : maxTuition + Math.ceil(8 / playerCount);

        if (player.money < reserveNeeded) {
          score = -100; // Do not apply if financial risk is high
        } else if (estimatedTurnsRemaining < (isConservative ? 4 : 6)) {
          score = -20; // Not enough turns remaining for salary returns to materialize
        } else {
          // Scale early-game application score by remaining layout progress and player count factor
          const earlyBonus = (1 - layoutProgress) * (isConservative ? 10 : 6);
          const countFactor = 1 + 2 / playerCount;
          score = earlyBonus * countFactor;
          if (currentAssurance < 6) score += isConservative ? 5 : 2;
        }
      } else if (move.type === "discard") {
        // Conservative never discards from an opponent's layout
        if (isConservative && move.targetId !== player.id) return -100;

        score = 2 - move.fee;
        if (move.targetId !== player.id) {
          const targetPlayer = engine.players[move.targetId];
          const opponentFaceUp = targetPlayer
            ? targetPlayer.layout.filter((l) => l && l.faceUp).length
            : 4;

          // Target opponent's set completion requirements
          const opponentDest = DESTINATIONS.find(
            (dest) => dest.name === targetPlayer.destination.name,
          );
          const isDoc = move.card.type === "document";
          const isConn = move.card.type === "connection";

          let denialBonus = 0;
          if (opponentDest && opponentDest.targets) {
            const oppRules = isDoc
              ? opponentDest.targets.d
              : isConn
                ? opponentDest.targets.c
                : null;
            if (oppRules) {
              const oppCurrent = isDoc
                ? targetPlayer.stash.documents.length
                : targetPlayer.stash.connections.length;
              if (oppRules.minRequired && oppCurrent < oppRules.minRequired) {
                denialBonus = 4;
              } else if (
                oppRules.setSize > 0 &&
                (oppCurrent + 1) % oppRules.setSize === 0
              ) {
                denialBonus = 3;
              } else {
                denialBonus = 1;
              }
            }
          }

          const disruptBonus = opponentFaceUp <= 3 ? 3 : 2;
          score += (disruptBonus + denialBonus) * (isSaboteur ? 3 : 1);

          // Apply layout preservation penalty if self is not ready for Phase 2
          if (readinessScore < 0) {
            score -= 12 * layoutProgress;
          }
        } else {
          score -= 2;
        }
      }

      // Tie-breaker: random noise to prevent infinite loops
      return score + Math.random() * 0.1;
    };

    possibleMoves.forEach((m) => (m._score = evaluateScore(m)));
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

      // Prevent activating opponent's payday if it's a net relative loss
      if (cardType === "payday" && p.id !== player.id) {
        const mySalary = player.inCollege ? 0 : player.salary;
        const netGain = mySalary - fee;
        const opponentsCount = Math.max(1, engine.players.length - 1);
        const totalOpponentGain = fee + opponentsCount; // fee + $1 stipend per opponent
        const avgOpponentGain = totalOpponentGain / opponentsCount;
        if (netGain <= 0 || netGain - avgOpponentGain < 0) continue;
      }

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
      const aPreferred =
        (a.cardType === "document" && docs <= conns) ||
        (a.cardType === "connection" && conns <= docs);
      const bPreferred =
        (b.cardType === "document" && docs <= conns) ||
        (b.cardType === "connection" && conns <= docs);
      if (aPreferred !== bPreferred) return aPreferred ? -1 : 1;
      if (a.totalCost !== b.totalCost) return a.totalCost - b.totalCost;

      const aAvail =
        a.targetPlayerIdx !== player.id
          ? engine.getAvailableLayoutCards(a.targetPlayerIdx).length
          : 999;
      const bAvail =
        b.targetPlayerIdx !== player.id
          ? engine.getAvailableLayoutCards(b.targetPlayerIdx).length
          : 999;
      if (aAvail !== bAvail) return bAvail - aAvail;

      return 0;
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
      // Primary: reclaim if we need one and they have a spare
      if (
        player.stash.tickets < 1 &&
        p.stash.tickets > 1 &&
        player.stash.connections.length >= 1
      ) {
        return { targetPlayerIdx: p.id, cardType: "ticket" };
      }
      if (
        player.stash.passports < 1 &&
        p.stash.passports > 1 &&
        player.stash.documents.length >= 1
      ) {
        return { targetPlayerIdx: p.id, cardType: "passport" };
      }
    }

    // Secondary: hoard by reclaiming extras from an opponent who is hoarding.
    // Only worthwhile if several other opponents still need that doc type (we earn reclaim fees).
    const ticketNeeders = engine.players.filter(
      (p) => p.id !== player.id && p.stash.tickets < 1,
    ).length;
    const passportNeeders = engine.players.filter(
      (p) => p.id !== player.id && p.stash.passports < 1,
    ).length;

    for (const p of engine.players) {
      if (p.id === player.id) continue;
      if (
        ticketNeeders >= 2 &&
        p.stash.tickets > 1 &&
        player.stash.connections.length >= 1
      ) {
        return { targetPlayerIdx: p.id, cardType: "ticket" };
      }
      if (
        passportNeeders >= 2 &&
        p.stash.passports > 1 &&
        player.stash.documents.length >= 1
      ) {
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
    // In vsComputer mode, never auto-resolve a choice that belongs to the human player.
    if (
      engine.pendingChoice &&
      botIndices !== null &&
      !botIndices.includes(engine.pendingChoice.playerIdx)
    ) {
      return;
    }
    const choice = engine.pendingChoice;
    const opts = choice.options;

    // Strategy-based resolution
    const id = choice.id || "";

    // Keep Calm: don't use it (save for bad cards)
    if (id === "keep-calm-check") {
      engine.resolveChoice("skip");
      return;
    }

    // Persuasion: offer it when targeted to force double fee or card trade
    if (id === "persuasion-offer") {
      engine.resolveChoice("offer");
      return;
    }

    // Persuasion accept: if AI has money for double fee, decline to get the original card; else accept
    if (id === "persuasion-accept") {
      const activeP = engine.players[engine.currentPlayerIdx];
      const baseFee = activeP?.accessFee || 1;
      const doubleFee = baseFee * 2;
      if (activeP && activeP.money >= doubleFee) {
        engine.resolveChoice("decline");
      } else {
        engine.resolveChoice("accept");
      }
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

    // Target player selection heuristic (e.g. for Swap Wallets, Social Butterfly, Lost & Found)
    if (id === "select-player" && opts.length > 0) {
      const title = choice.title || "";
      let sortedOpts = [...opts];
      if (title.includes("Swap Wallets")) {
        sortedOpts.sort(
          (a, b) =>
            (engine.players[parseInt(b.value)]?.money || 0) -
            (engine.players[parseInt(a.value)]?.money || 0),
        );
      } else if (title.includes("Social Butterfly")) {
        sortedOpts.sort(
          (a, b) =>
            (engine.players[parseInt(b.value)]?.stash.connections.length || 0) -
              (engine.players[parseInt(a.value)]?.stash.connections.length ||
                0) ||
            (engine.players[parseInt(b.value)]?.money || 0) -
              (engine.players[parseInt(a.value)]?.money || 0),
        );
      } else if (title.includes("Lost & Found")) {
        sortedOpts.sort(
          (a, b) =>
            (engine.players[parseInt(b.value)]?.stash.documents.length || 0) -
              (engine.players[parseInt(a.value)]?.stash.documents.length ||
                0) ||
            (engine.players[parseInt(b.value)]?.money || 0) -
              (engine.players[parseInt(a.value)]?.money || 0),
        );
      } else {
        sortedOpts.sort(
          (a, b) =>
            (engine.players[parseInt(b.value)]?.money || 0) -
            (engine.players[parseInt(a.value)]?.money || 0),
        );
      }
      engine.resolveChoice(sortedOpts[0].value);
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
    const playerIdx = engine.crossingOrder
      ? engine.crossingOrder[engine.activeCrossingIdx]
      : engine.activeCrossingIdx;
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
        const minToken = Math.min(...remaining);
        const minDeficit = Math.max(0, minToken - assurance);

        return {
          laneIdx,
          successProb,
          avgToken,
          minToken,
          minDeficit,
          remainingCount: remaining.length,
        };
      })
      .filter((l) => l !== null);

    if (laneScores.length === 0) return 0;

    // Sort:
    // 1. If any lane has positive success probability, sort by successProb desc, then avgToken asc.
    // 2. If all lanes have 0 success probability (Assurance < min tokens), sort by minDeficit asc (Upside / "Hail Mary" potential), then avgToken asc.
    laneScores.sort((a, b) => {
      if (a.successProb > 0 || b.successProb > 0) {
        if (a.successProb !== b.successProb) {
          return b.successProb - a.successProb;
        }
        return a.avgToken - b.avgToken;
      }
      if (a.minDeficit !== b.minDeficit) {
        return a.minDeficit - b.minDeficit;
      }
      return a.avgToken - b.avgToken;
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

    // Resolve any pending choice first — but never steal a choice meant for the human.
    let safetyCounter = 0;
    while (engine.pendingChoice && safetyCounter < 20) {
      if (
        botIndices !== null &&
        !botIndices.includes(engine.pendingChoice.playerIdx)
      )
        break;
      resolveChoice();
      safetyCounter++;
    }

    if (engine.phase !== "preparation") return engine.phase !== "game_over";

    const player = engine.players[engine.currentPlayerIdx];

    // Optional: try to graduate if in college
    if (player.inCollege) {
      engine.executeOptionalAction("graduate");
    }

    let action = null;
    let didSell = false;

    const currentPersona = personas[engine.currentPlayerIdx] || difficulty;
    const isHeuristicPersona = ["expert", "rusher", "hoarder", "saboteur", "conservative"].includes(currentPersona);

    if (isHeuristicPersona) {
      // 1. Evaluate actions WITHOUT selling
      const actionsNoSell = engine.getValidActions(player);
      const bestMoveNoSell = _getBestHeuristicAction(player, actionsNoSell, currentPersona);
      const scoreNoSell = bestMoveNoSell ? bestMoveNoSell._score : -999;

      // 2. Evaluate actions WITH a simulated sell, if possible
      let scoreWithSell = -999;
      let stashTypeToSell = null;
      let stashIdxToSell = -1;
      let bestMoveWithSell = null;

      const trySell = (type, list) => {
        if (list.length > 0) {
          const idx = list.reduce(
            (best, c, i) => (c.cost < list[best].cost ? i : best),
            0,
          );
          const item = list.splice(idx, 1)[0];
          player.money += 2;

          const simActions = engine.getValidActions(player);
          const simBest = _getBestHeuristicAction(player, simActions, currentPersona);
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
        engine.executeOptionalAction("sell", {
          stashType: stashTypeToSell,
          stashIdx: stashIdxToSell,
        });
        action = {
          type: bestMoveWithSell.type,
          params: bestMoveWithSell.params,
        };
        didSell = true;
      }
    }

    if (!didSell) {
      // Fallback normal/easy behavior
      if (difficulty !== "expert" && player.money < 2) {
        const canSellDoc = player.stash.documents.length > 1;
        const canSellConn = player.stash.connections.length > 1;

        if (canSellDoc) {
          const idx = player.stash.documents.reduce(
            (best, c, i) =>
              c.cost < player.stash.documents[best].cost ? i : best,
            0,
          );
          engine.executeOptionalAction("sell", {
            stashType: "document",
            stashIdx: idx,
          });
        } else if (canSellConn) {
          const idx = player.stash.connections.reduce(
            (best, c, i) =>
              c.cost < player.stash.connections[best].cost ? i : best,
            0,
          );
          engine.executeOptionalAction("sell", {
            stashType: "connection",
            stashIdx: idx,
          });
        }
      }
      action = chooseAction();
    }

    if (!action) return false;

    engine.executeRequiredAction(action.type, action.params);

    // Resolve any resulting choices — but never steal a choice meant for the human.
    safetyCounter = 0;
    while (engine.pendingChoice && safetyCounter < 20) {
      if (
        botIndices !== null &&
        !botIndices.includes(engine.pendingChoice.playerIdx)
      )
        break;
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
