import fs from 'node:fs';
import { parseArgs } from 'node:util';
import { createStandardGameSetup } from '../src/components/emigration-emulator/gameSetup.js';
import { createAutoPlayer, BOT_PERSONAS } from '../src/components/emigration-emulator/autoplay.js';
import { PACKS_LIST, LIFE_CARD_DEFINITIONS } from '../src/components/emigration-emulator/engine.svelte.js';

const cardToPackMap = new Map();
LIFE_CARD_DEFINITIONS.forEach(def => {
  cardToPackMap.set(def.title, def.pack);
});

const { values } = parseArgs({
  options: {
    games:   { type: 'string',  short: 'g', default: '1000' },
    players: { type: 'string',  short: 'p', default: 'random' },
    personas:{ type: 'string',              default: '' },
    packs:   { type: 'string',              default: '' },
    inverse: { type: 'boolean', short: 'i', default: false }, 
    output:  { type: 'string',  short: 'o', default: '' },
    verbose: { type: 'boolean', short: 'v', default: false },
    showAll: { type: 'boolean', short: 'a', default: false },
  },
});

const NUM_GAMES  = parseInt(values.games, 10);
const verbose    = values.verbose;
const showAll    = values.showAll;

const fixedPersonasArray = values.personas ? values.personas.split(',') : [];

let basePlayers = values.players === 'random' ? null : parseInt(values.players, 10);
if (basePlayers === null && fixedPersonasArray.length > 0) {
  basePlayers = fixedPersonasArray.length;
}

if (fixedPersonasArray.length > 0) {
  console.log(`Personas (fixed): ${fixedPersonasArray.join(', ')}`);
} else {
  console.log(`Personas: random per player per game (pool: ${BOT_PERSONAS.join(', ')})`);
}

const inputPacks = values.packs ? values.packs.split(',').map(s => s.trim()) : [];
let packsArg = null;
let poolForRandom = PACKS_LIST;

if (inputPacks.length > 0) {
  if (values.inverse) {
    poolForRandom = PACKS_LIST.filter(p => !inputPacks.includes(p));
  } else {
    packsArg = inputPacks.filter(s => PACKS_LIST.includes(s));
    if (packsArg.length === 0) {
      console.warn(`Warning: --packs provided but no valid pack names matched. Available: ${PACKS_LIST.join(', ')}`);
    }
  }
}

console.log(`Starting Emigration Simulation...`);
console.log(`Games: ${NUM_GAMES}, Players: ${basePlayers !== null ? basePlayers : 'random (2-6)'}`);

let packsLog = 'random each game';
if (packsArg) {
  packsLog = packsArg.join(', ');
} else if (values.inverse && inputPacks.length > 0) {
  packsLog = `random each game (excluding: ${inputPacks.join(', ')})`;
}
console.log(`Life Packs: ${packsLog}`);

const createMetricsSandbox = () => ({
  games: 0,
  winsByPersona: {},
  winsByNationality: {},
  winsByDestination: {},
  winsByPayRaise: { "0": 0, "1": 0, "2": 0 },
  winsByTurnOrder: {},
  winsByCrossed: { "true": 0, "false": 0 },
  winnerLifeCards: {},
  totalCardPlays: {},
  winnerCardPairs: {},
  winnerMoneyDelta: { totalDelta: 0, maxDelta: null, minDelta: null },
  runnerUpGap: { totalGap: 0 },
  packInclusions: {},
  winsByPack: {}, 
  winnerResources: { totalDocs: 0, totalConnections: 0 },
  assurance: { winnerTotal: 0, loserTotal: 0, loserCount: 0 }
});

const metrics = {
  totalGames: NUM_GAMES,
  overall: createMetricsSandbox(),
  byPlayerCount: {},
  winnerSnapshots: [],
};

async function run() {
  for (let g = 0; g < NUM_GAMES; g++) {
    if (!verbose && (g % 10 === 0 || g === NUM_GAMES)) {
      const percent = Math.floor((g / NUM_GAMES) * 100);
      const barLength = 80;
      const filled = Math.floor((percent / 100) * barLength);
      const empty = barLength - filled;
      const bar = '█'.repeat(filled) + '-'.repeat(empty);
      process.stdout.write(`\rSimulating: [${bar}] ${percent}% (${g}/${NUM_GAMES})`);
    }

    const numPlayers = basePlayers !== null ? basePlayers : Math.floor(Math.random() * 5) + 2; 

    if (!metrics.byPlayerCount[numPlayers]) {
      metrics.byPlayerCount[numPlayers] = createMetricsSandbox();
    }
    
    const pcMetrics = metrics.byPlayerCount[numPlayers];
    const overallMetrics = metrics.overall;
    
    pcMetrics.games++;
    overallMetrics.games++;

    const fixedPersonas = fixedPersonasArray.length > 0
      ? Object.fromEntries(Array.from({ length: numPlayers }, (_, i) => [i, fixedPersonasArray[i] || 'expert']))
      : null;

    const botPersonas = fixedPersonas ?? Object.fromEntries(
      Array.from({ length: numPlayers }, (_, i) => [
        i,
        BOT_PERSONAS[Math.floor(Math.random() * BOT_PERSONAS.length)],
      ])
    );

    let currentSelectedPacks = packsArg;
    if (!currentSelectedPacks && values.inverse && inputPacks.length > 0) {
      const maxPacks = Math.min(3, poolForRandom.length); 
      const pickCount = Math.floor(Math.random() * maxPacks) + 1;
      currentSelectedPacks = [...poolForRandom]
        .sort(() => 0.5 - Math.random())
        .slice(0, pickCount);
    }

    const { engine } = createStandardGameSetup({
      playerCount: numPlayers,
      mode: 'competitive',
      selectedPacks: currentSelectedPacks,
      excludedPacks: values.inverse ? inputPacks : [],
      onLog: (entry) => {
        if (verbose && entry.type !== 'toast') {
          console.log(`[Game ${g}] ${entry.msg}`);
        }
      }
    });

    engine.players.forEach((p, i) => {
      p.persona = botPersonas[i];
    });

    if (verbose) {
      const playerDetails = engine.players.map((p, i) =>
        `P${i}: ${p.persona} (${p.nationality.name} -> ${p.destination.name})`
      ).join(', ');
      console.log(`\n--- [Game ${g}] Setup: ${playerDetails} ---`);
    }

    const autoplay = createAutoPlayer(engine, 'expert', {
      botIndices: engine.players.map((_, i) => i),
      personas: botPersonas
    });

    await autoplay.playFullGame(0);

    const usedPacks = engine.selectedPacks ?? [];

    const cardsPlayedByPlayer = Array.from({ length: numPlayers }, () => new Set());
    for (const entry of (engine.logs || [])) {
      if (!entry || !entry.msg) continue;

      const actMatch = entry.msg.match(/P(\d+)\|ACT:([^|]+)/);
      if (actMatch) {
        const pIdx = parseInt(actMatch[1], 10);
        const title = actMatch[2].trim();
        if (cardToPackMap.has(title) && pIdx >= 0 && pIdx < numPlayers) {
          const pack = cardToPackMap.get(title);
          cardsPlayedByPlayer[pIdx].add(`${pack} - ${title}`);
        }
      }

      const replayMatch = entry.msg.match(/P(\d+).*?REPLAY:([^|]+)/);
      if (replayMatch) {
        const pIdx = parseInt(replayMatch[1], 10);
        const title = replayMatch[2].trim();
        if (cardToPackMap.has(title) && pIdx >= 0 && pIdx < numPlayers) {
          const pack = cardToPackMap.get(title);
          cardsPlayedByPlayer[pIdx].add(`${pack} - ${title}`);
        }
      }
    }

    if (engine.gameResult && engine.gameResult.winner) {
      const winnerName = engine.gameResult.winner;
      const winner = engine.players.find(p => p.name === winnerName);
      const winnerIdx = engine.players.indexOf(winner);
      
      const otherPlayers = engine.players.filter(p => p.name !== winnerName);
      
      const persona = botPersonas[winnerIdx] ?? 'expert';
      const nationality = winner.nationality.name;
      const startingMoney = winner.startingMoney;
      const destination = winner.destination.name;
      const payRaises = winner.payRaises ?? 0;
      
      for (let p = 0; p < numPlayers; p++) {
        for (const fullName of cardsPlayedByPlayer[p]) {
          pcMetrics.totalCardPlays[fullName] = (pcMetrics.totalCardPlays[fullName] || 0) + 1;
          overallMetrics.totalCardPlays[fullName] = (overallMetrics.totalCardPlays[fullName] || 0) + 1;
        }
      }

      const winnerPlayedCardsSet = cardsPlayedByPlayer[winnerIdx] || new Set();
      const winnerLifeCardNames = Array.from(winnerPlayedCardsSet);
      const sortedCards = [...winnerLifeCardNames].sort();

      const winnerPacksPlayed = new Set();
      for (const name of winnerLifeCardNames) {
        const packName = name.split(' - ')[0];
        winnerPacksPlayed.add(packName);
      }

      const moneyDelta = winner.money - startingMoney;
      const secondPlaceMoney = otherPlayers.length > 0 ? Math.max(...otherPlayers.map(p => p.money)) : 0;
      const moneyGap = winner.money - secondPlaceMoney;
      
      const docsCount = winner.stash.documents.length;
      const connCount = winner.stash.connections.length;
      
      const winnerAssurance = winner.assurance || 0;
      const loserAssuranceTotal = otherPlayers.reduce((sum, p) => sum + (p.assurance || 0), 0);

      [overallMetrics, pcMetrics].forEach(target => {
        target.winsByPersona[persona] = (target.winsByPersona[persona] || 0) + 1;
        target.winsByNationality[nationality] = (target.winsByNationality[nationality] || 0) + 1;
        target.winsByDestination[destination] = (target.winsByDestination[destination] || 0) + 1;
        target.winsByPayRaise[payRaises] = (target.winsByPayRaise[payRaises] || 0) + 1;
        target.winsByTurnOrder[winnerIdx] = (target.winsByTurnOrder[winnerIdx] || 0) + 1;
        target.winsByCrossed[winner.crossedSuccessfully] = (target.winsByCrossed[winner.crossedSuccessfully] || 0) + 1;
        
        target.winnerMoneyDelta.totalDelta += moneyDelta;
        if (target.winnerMoneyDelta.maxDelta === null || moneyDelta > target.winnerMoneyDelta.maxDelta) {
          target.winnerMoneyDelta.maxDelta = moneyDelta;
        }
        if (target.winnerMoneyDelta.minDelta === null || moneyDelta < target.winnerMoneyDelta.minDelta) {
          target.winnerMoneyDelta.minDelta = moneyDelta;
        }

        target.runnerUpGap.totalGap += moneyGap;
        
        target.winnerResources.totalDocs += docsCount;
        target.winnerResources.totalConnections += connCount;
        
        target.assurance.winnerTotal += winnerAssurance;
        target.assurance.loserTotal += loserAssuranceTotal;
        target.assurance.loserCount += otherPlayers.length;

        for (const name of winnerLifeCardNames) {
          target.winnerLifeCards[name] = (target.winnerLifeCards[name] || 0) + 1;
        }

        for (let i = 0; i < sortedCards.length; i++) {
          for (let j = i + 1; j < sortedCards.length; j++) {
            const pair = `${sortedCards[i]} + ${sortedCards[j]}`;
            target.winnerCardPairs[pair] = (target.winnerCardPairs[pair] || 0) + 1;
          }
        }

        for (const pack of usedPacks) {
          target.packInclusions[pack] = (target.packInclusions[pack] || 0) + 1;
          if (winnerPacksPlayed.has(pack)) {
            target.winsByPack[pack] = (target.winsByPack[pack] || 0) + 1;
          }
        }
      });

      metrics.winnerSnapshots.push({
        game: g,
        players: numPlayers,
        name: winnerName,
        persona,
        nationality,
        startingMoney,
        destination,
        packs: usedPacks,
        assurance: winner.assurance,
        money: winner.money,
        payRaises,
        docs: docsCount,
        connections: connCount,
        lifeCardsPlayed: winnerLifeCardNames,
        crossed: winner.crossedSuccessfully,
        turns: engine.turnNumber,
      });
    }
  }

  console.log(`\n\nSimulation Complete!\n`);

  const sortedPlayerCounts = Object.keys(metrics.byPlayerCount).sort((a, b) => a - b);
  
  const reportSections = [
    { label: 'Overall', data: metrics.overall }
  ];
  for (const countStr of sortedPlayerCounts) {
    reportSections.push({ label: `${countStr} Players`, data: metrics.byPlayerCount[countStr] });
  }

  // --- AUTOMATED HEALTH CHECK ALGORITHM ---
  function analyzeCategoryHealth(categoryKey, type = 'spread', threshold = 15) {
    const outliers = [];
    let dominantSynergies = new Set();
    
    for (const countStr of sortedPlayerCounts) {
      const data = metrics.byPlayerCount[countStr];
      if (data.games === 0) continue;
      
      let rates = [];
      
      // 1. Handle Pack Draft/Win Ratio
      if (type === 'pack') {
        for (const pack of Object.keys(data.packInclusions)) {
          const inc = data.packInclusions[pack];
          const wins = data.winsByPack[pack] || 0;
          if (inc > 0) rates.push((wins / inc) * 100);
        }
      } 
      // 2. Handle Turn Order Distribution
      else if (type === 'turnOrder') {
         const numPlayers = parseInt(countStr, 10);
         for (let i = 0; i < numPlayers; i++) {
           rates.push(((data.winsByTurnOrder[i] || 0) / data.games) * 100);
         }
      } 
      // 3. Handle Synergy Over-centralization (Golden Ticket Check)
      else if (type === 'synergy') {
        const dict = data[categoryKey];
        for (const key of Object.keys(dict)) {
          const rate = ((dict[key] || 0) / data.games) * 100;
          if (rate > threshold) dominantSynergies.add(key);
        }
        continue; // Bypasses the standard spread evaluation
      } 
      // 4. Handle Resource Disparity (Snowball Check)
      else if (type === 'disparity') {
        if (categoryKey === 'assurance') {
          const winnerAvg = data.assurance.winnerTotal / data.games;
          const loserAvg = data.assurance.loserCount > 0 
            ? data.assurance.loserTotal / data.assurance.loserCount 
            : 0;
          
          if (loserAvg > 0 && (winnerAvg / loserAvg) >= threshold) {
            outliers.push(countStr);
          }
        }
        continue; // Bypasses the standard spread evaluation
      } 
      // 5. Standard Spread Check
      else {
        const dict = data[categoryKey];
        for (const key of Object.keys(dict)) {
          rates.push(((dict[key] || 0) / data.games) * 100);
        }
      }

      if (rates.length < 2) continue;

      if (type === 'turnOrder') {
        const numPlayers = parseInt(countStr, 10);
        const ideal = 100 / numPlayers;
        const maxDev = Math.max(...rates.map(r => Math.abs(r - ideal)));
        if (maxDev > threshold) outliers.push(countStr); // Deviation threshold
      } else {
        const max = Math.max(...rates);
        const min = Math.min(...rates);
        if (max - min > threshold) outliers.push(countStr); // Spread threshold
      }
    }
    
    // Custom returns for new types
    if (type === 'synergy') {
      if (dominantSynergies.size === 0) return {ok: true, message: `✅ Diverse Meta (No single combo > ${threshold}%)`};
      return {ok: false, message: `⚠️ Dominant Strategy Detected: [${Array.from(dominantSynergies).join('] | [')}]`};
    }
    
    if (type === 'disparity') {
      if (outliers.length === 0) return {ok: true, message: `✅ Balanced Economy`};
      return {ok: false, message: `⚠️ Snowball Effect Detected (> ${threshold}x gap in ${outliers.join(', ')}-player games)`};
    }
    
    // Default returns
    if (outliers.length === 0) return {ok: true, message:`✅ Consistently Balanced`};
    return {ok: false, message:`⚠️ Outliers Detected (${outliers.join(', ')}-player games)`};
  }

  const printHeader = (title, description, healthTag = null) => {
    console.log(`=========================================`);
    console.log(`${title}`);
    console.log(`> ${description}`);
    if (healthTag) console.log(`>> Category Health: ${healthTag}`);
    console.log(`=========================================\n`);
  };

  // --- 1. WIN RATE BY PERSONA ---
  const personaHealth = analyzeCategoryHealth('winsByPersona', 'spread', 15)
  printHeader(
    `WIN RATE BY PERSONA`, 
    `Which bot personalities or strategies secure the most wins.`, 
    personaHealth.message
  );
  if (!personaHealth.ok || showAll) {
    for (const { label, data } of reportSections) {
      console.log(`  ${label} (${data.games} games):`);
      const sorted = Object.entries(data.winsByPersona).sort((a, b) => b[1] - a[1]);
      for (const [key, val] of sorted) {
        console.log(`    - ${key}: ${val} times (${((val / data.games) * 100).toFixed(1)}%)`);
      }
    }
    console.log();
  }

  // --- 2. WIN RATE BY NATIONALITY ---
  const natHealth = analyzeCategoryHealth('winsByNationality', 'spread', 15)
  printHeader(
    `WIN RATE BY STARTING NATIONALITY`, 
    `How starting nationalities impact the likelihood of winning.`, 
    natHealth.message
  );
  if (!natHealth.ok || showAll) {
    for (const { label, data } of reportSections) {
      console.log(`  ${label} (${data.games} games):`);
      const sorted = Object.entries(data.winsByNationality).sort((a, b) => b[1] - a[1]);
      for (const [key, val] of sorted) {
        console.log(`    - ${key}: ${val} times (${((val / data.games) * 100).toFixed(1)}%)`);
      }
    }
    console.log();
  }

  // --- 3. WIN RATE BY DESTINATION ---
  const destHealth = analyzeCategoryHealth('winsByDestination', 'spread', 15)
  printHeader(
    `WIN RATE BY DESTINATION`, 
    `Which final destinations are associated with the most wins.`, 
    destHealth.message
  );
  if (!destHealth.ok || showAll) {
    for (const { label, data } of reportSections) {
      console.log(`  ${label} (${data.games} games):`);
      const sorted = Object.entries(data.winsByDestination).sort((a, b) => b[1] - a[1]);
      for (const [key, val] of sorted) {
        console.log(`    - ${key}: ${val} times (${((val / data.games) * 100).toFixed(1)}%)`);
      }
    }
    console.log();
  }

  // --- 4. WIN RATE BY PAY RAISES ---
  const payRaiseHealth = analyzeCategoryHealth('winsByPayRaise', 'spread', 45);
  printHeader(
    `WIN RATE BY PAY RAISES`, 
    `The impact of college graduations and pay raises on securing a win.`,
    payRaiseHealth.message
  ); 
  if (!payRaiseHealth.ok || showAll) {
    for (const { label, data } of reportSections) {
      console.log(`  ${label} (${data.games} games):`);
      for (let r = 0; r <= 2; r++) {
        const val = data.winsByPayRaise[String(r)] || 0;
        console.log(`    - ${r} Raises: ${val} times (${((val / data.games) * 100).toFixed(1)}%)`);
      }
    }
    console.log();
  }

  // --- 5. WIN RATE BY TURN ORDER ---
  const seatHealth = analyzeCategoryHealth('winsByTurnOrder', 'turnOrder', 10)
  printHeader(
    `WIN RATE BY TURN ORDER (SEAT POSITION)`, 
    `Checks for first-player or late-player advantage based on starting seat.`, 
    seatHealth.message
  );
  if (!seatHealth.ok || showAll) {
    for (const { label, data } of reportSections) {
      console.log(`  ${label} (${data.games} games):`);
      const maxSeat = Math.max(...Object.keys(data.winsByTurnOrder).map(Number));
      for (let seat = 0; seat <= maxSeat; seat++) {
        const val = data.winsByTurnOrder[seat] || 0;
        console.log(`    - Seat ${seat + 1}: ${val} times (${((val / data.games) * 100).toFixed(1)}%)`);
      }
    }
    console.log();
  }

  // --- 6. WINNER FINANCIAL DELTA & GAP ---
  printHeader(
    `FINANCIAL DELTAS & RUNNER-UP GAP`, 
    `Measures total wealth generated and how closely second place trailed the winner.`
  ); 
  for (const { label, data } of reportSections) {
    console.log(`  ${label} (${data.games} games):`);
    console.log(`    - Avg Final vs Start : ${Math.round(data.winnerMoneyDelta.totalDelta / data.games)}`);
    console.log(`    - Avg Runner-Up Gap  : ${Math.round(data.runnerUpGap.totalGap / data.games)}`);
    console.log(`    - Max Delta Recorded : ${data.winnerMoneyDelta.maxDelta}`);
    console.log(`    - Min Delta Recorded : ${data.winnerMoneyDelta.minDelta}`);
  }
  console.log();
  
  // --- 7. RESOURCE ECONOMY ---
  printHeader(
    `RESOURCE ECONOMY (WINNER FINAL STASH)`, 
    `The average number of unspent Documents and Connections the winner hoarded.`
  ); 
  for (const { label, data } of reportSections) {
    console.log(`  ${label} (${data.games} games):`);
    const avgDocs = (data.winnerResources.totalDocs / data.games).toFixed(2);
    const avgConn = (data.winnerResources.totalConnections / data.games).toFixed(2);
    console.log(`    - Average Documents  : ${avgDocs}`);
    console.log(`    - Average Connections: ${avgConn}`);
  }
  console.log();

  // --- 8. ASSURANCE UTILIZATION ---
  const assuranceHealth = analyzeCategoryHealth('assurance', 'disparity', 2.0);
  printHeader(
    `ASSURANCE UTILIZATION`, 
    `Compares how much remaining Assurance the winner had versus the losing players.`,
    assuranceHealth.message
  ); 
  if (!assuranceHealth.ok || showAll) {
    for (const { label, data } of reportSections) {
      console.log(`  ${label} (${data.games} games):`);
      const avgWinAssur = (data.assurance.winnerTotal / data.games).toFixed(2);
      const avgLoseAssur = data.assurance.loserCount > 0 ? (data.assurance.loserTotal / data.assurance.loserCount).toFixed(2) : "0.00";
      console.log(`    - Winner Average : ${avgWinAssur}`);
      console.log(`    - Loser Average  : ${avgLoseAssur}`);
    }
    console.log();
  }

  // --- 9. CROSSED BORDER DATA ---
  printHeader(
    `WINNER CROSSED BORDER SUCCESSFULLY`, 
    `The percentage of winners who secured their victory by successfully crossing.`
  ); 
  for (const { label, data } of reportSections) {
    const crossedTrue = data.winsByCrossed["true"] || 0;
    console.log(`  ${label} (${data.games} games): ${crossedTrue} times (${((crossedTrue / data.games) * 100).toFixed(1)}%)`);
  }
  console.log();

  // --- 10. PACK UTILIZATION WIN RATE ---
  const packHealth = analyzeCategoryHealth('packInclusions', 'pack', 25)
  printHeader(
    `PACK UTILIZATION WIN RATE (Wins / Drafts)`, 
    `When a pack is drafted into the game, how often the winner actually plays a card from it.`, 
    packHealth.message
  );
  if (!packHealth.ok || showAll) {
    for (const { label, data } of reportSections) {
      console.log(`  ${label} (${data.games} games):`);
      const packStats = [];
      for (const [pack, inclusions] of Object.entries(data.packInclusions)) {
        const wins = data.winsByPack[pack] || 0;
        const rate = inclusions > 0 ? (wins / inclusions) * 100 : 0;
        packStats.push({ pack, wins, inclusions, rate });
      }
      packStats.sort((a, b) => b.rate - a.rate);
  
      for (const stat of packStats) {
        console.log(`    - ${stat.pack}: ${stat.rate.toFixed(1)}% (${stat.wins} / ${stat.inclusions} inclusions)`);
      }
    }
    console.log();
  }

  // --- 11. TOP 5 CARD SYNERGIES ---
  const synergyHealth = analyzeCategoryHealth('winnerCardPairs', 'synergy', 15);
  printHeader(
    `TOP 5 WINNER CARD SYNERGIES (PAIRS PLAYED)`, 
    `The most common two-card combinations played by the winner during the game.`,
    synergyHealth.message
  );
  if (!synergyHealth.ok || showAll) {
    for (const { label, data } of reportSections) {
      console.log(`  ${label} (${data.games} games):`);
      const sorted = Object.entries(data.winnerCardPairs).sort((a, b) => b[1] - a[1]).slice(0, 5);
      for (const [key, val] of sorted) {
        console.log(`    - [${key}]: ${val} times (${((val / data.games) * 100).toFixed(1)}%)`);
      }
    }
    console.log();
  }

  // --- 12. TOP 5 LIFE CARDS BY WIN RATE WHEN PLAYED ---
  printHeader(
    `TOP 5 LIFE CARDS BY WIN RATE WHEN PLAYED`, 
    `The individual Life Cards with the highest win rate when played by players during the game.`
  );
  for (const { label, data } of reportSections) {
    console.log(`  ${label} (${data.games} games):`);
    const sorted = Object.entries(data.winnerLifeCards).sort((a, b) => {
      const aWinner = a[1];
      const bWinner = b[1];
      const aTotal = data.totalCardPlays[a[0]] || aWinner;
      const bTotal = data.totalCardPlays[b[0]] || bWinner;
      const aRate = aTotal > 0 ? aWinner / aTotal : 0;
      const bRate = bTotal > 0 ? bWinner / bTotal : 0;

      if (bRate !== aRate) return bRate - aRate;
      if (bWinner !== aWinner) return bWinner - aWinner;
      if (bTotal !== aTotal) return bTotal - aTotal;
      return a[0].localeCompare(b[0]);
    }).slice(0, 5);

    for (const [key, val] of sorted) {
      const totalPlays = data.totalCardPlays[key] || val;
      const winRate = totalPlays > 0 ? ((val / totalPlays) * 100).toFixed(1) : '0.0';
      console.log(`    - "${key}": ${winRate}% win rate (${val} wins / ${totalPlays} total plays)`);
    }
  }
  console.log();


  // --- EXPORT JSON CLEANUP ---
  if (values.output) {
    const cleanSandboxForExport = (sandbox) => {
      sandbox.winsByPersona = Object.fromEntries(Object.entries(sandbox.winsByPersona).sort((a, b) => b[1] !== a[1] ? b[1] - a[1] : a[0].localeCompare(b[0])));
      sandbox.winsByNationality = Object.fromEntries(Object.entries(sandbox.winsByNationality).sort((a, b) => b[1] !== a[1] ? b[1] - a[1] : a[0].localeCompare(b[0])));
      sandbox.winsByDestination = Object.fromEntries(Object.entries(sandbox.winsByDestination).sort((a, b) => b[1] !== a[1] ? b[1] - a[1] : a[0].localeCompare(b[0])));
      
      const packRates = {};
      for (const pack of Object.keys(sandbox.packInclusions)) {
        const inclusions = sandbox.packInclusions[pack];
        const wins = sandbox.winsByPack[pack] || 0;
        packRates[pack] = {
          inclusions,
          wins,
          winRatePercent: inclusions > 0 ? parseFloat(((wins / inclusions) * 100).toFixed(2)) : 0
        };
      }
      sandbox.packWinRates = Object.fromEntries(
        Object.entries(packRates).sort((a, b) => b[1].winRatePercent !== a[1].winRatePercent ? b[1].winRatePercent - a[1].winRatePercent : a[0].localeCompare(b[0]))
      );
      
      delete sandbox.packInclusions;
      delete sandbox.winsByPack;

      const cardStats = {};
      for (const [card, winnerPlays] of Object.entries(sandbox.winnerLifeCards)) {
        const totalPlays = sandbox.totalCardPlays[card] || winnerPlays;
        cardStats[card] = {
          winnerPlays,
          totalPlays,
          winRatePercent: totalPlays > 0 ? parseFloat(((winnerPlays / totalPlays) * 100).toFixed(2)) : 0
        };
      }
      sandbox.winnerPlayedLifeCardStats = Object.fromEntries(
        Object.entries(cardStats).sort((a, b) => {
          if (b[1].winRatePercent !== a[1].winRatePercent) return b[1].winRatePercent - a[1].winRatePercent;
          if (b[1].winnerPlays !== a[1].winnerPlays) return b[1].winnerPlays - a[1].winnerPlays;
          if (b[1].totalPlays !== a[1].totalPlays) return b[1].totalPlays - a[1].totalPlays;
          return a[0].localeCompare(b[0]);
        })
      );

      sandbox.winnerLifeCards = Object.fromEntries(Object.entries(sandbox.winnerLifeCards).sort((a, b) => b[1] !== a[1] ? b[1] - a[1] : a[0].localeCompare(b[0])));
      sandbox.totalCardPlays = Object.fromEntries(Object.entries(sandbox.totalCardPlays).sort((a, b) => b[1] !== a[1] ? b[1] - a[1] : a[0].localeCompare(b[0])));
      sandbox.winnerCardPairs = Object.fromEntries(Object.entries(sandbox.winnerCardPairs).sort((a, b) => b[1] !== a[1] ? b[1] - a[1] : a[0].localeCompare(b[0])));
      
      sandbox.winnerMoneyDelta.averageDelta = parseFloat((sandbox.winnerMoneyDelta.totalDelta / sandbox.games).toFixed(2));
      sandbox.runnerUpGap.averageGap = parseFloat((sandbox.runnerUpGap.totalGap / sandbox.games).toFixed(2));
      sandbox.winnerResources.averageDocs = parseFloat((sandbox.winnerResources.totalDocs / sandbox.games).toFixed(2));
      sandbox.winnerResources.averageConnections = parseFloat((sandbox.winnerResources.totalConnections / sandbox.games).toFixed(2));
      sandbox.assurance.winnerAverage = parseFloat((sandbox.assurance.winnerTotal / sandbox.games).toFixed(2));
      sandbox.assurance.loserAverage = sandbox.assurance.loserCount > 0 
        ? parseFloat((sandbox.assurance.loserTotal / sandbox.assurance.loserCount).toFixed(2)) 
        : 0;
    };

    cleanSandboxForExport(metrics.overall);
    for (const countStr of sortedPlayerCounts) {
      cleanSandboxForExport(metrics.byPlayerCount[countStr]);
    }

    const exportData = {
      totalGames: NUM_GAMES,
      overall: metrics.overall,
      byPlayerCount: metrics.byPlayerCount,
      winnerSnapshots: metrics.winnerSnapshots
    };

    fs.writeFileSync(values.output, JSON.stringify(exportData, null, 2));
    console.log(`Data exported to ${values.output}`);

    const txtOutput = values.output.endsWith('.json') 
      ? values.output.replace(/\.json$/, '.txt') 
      : `${values.output}.txt`;
      
    fs.writeFileSync(txtOutput, JSON.stringify(exportData, null, 2));
  }
}

run().catch(console.error);
