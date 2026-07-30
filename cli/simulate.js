import fs from 'node:fs';
import { parseArgs } from 'node:util';
import { createStandardGameSetup } from '../src/components/emigration-emulator/gameSetup.js';
import { createAutoPlayer, BOT_PERSONAS } from '../src/components/emigration-emulator/autoplay.js';
import { PACKS_LIST } from '../src/components/emigration-emulator/engine.svelte.js';

const { values } = parseArgs({
  options: {
    games:   { type: 'string',  short: 'g', default: '1000' },
    players: { type: 'string',  short: 'p', default: 'random' },
    personas:{ type: 'string',              default: '' },
    packs:   { type: 'string',              default: '' },
    output:  { type: 'string',  short: 'o', default: '' },
    verbose: { type: 'boolean', short: 'v', default: false },
  },
});

const NUM_GAMES  = parseInt(values.games, 10);
const verbose    = values.verbose;

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

const packsArg = values.packs
  ? values.packs.split(',').map(s => s.trim()).filter(s => PACKS_LIST.includes(s))
  : null;

if (values.packs && packsArg.length === 0) {
  console.warn(`Warning: --packs provided but no valid pack names matched. Available: ${PACKS_LIST.join(', ')}`);
}

console.log(`Starting Emigration Simulation...`);
console.log(`Games: ${NUM_GAMES}, Players: ${basePlayers !== null ? basePlayers : 'random (2-6)'}`);
console.log(`Life Packs: ${packsArg ? packsArg.join(', ') : 'random each game'}`);

const metrics = {
  totalGames: NUM_GAMES,
  gamesByPlayerCount: {},
  winsByPersona: {},
  winsByPersonaByPlayerCount: {},
  winsByNationality: {},
  winsByDestination: {},
  winsByPayRaise: {},
  winsByPlayerCountByPayRaise: {}, 
  winnerLifeCards: {},
  winsByPack: {},
  winsByPlayerCountByCrossed: {},
  winnerSnapshots: [],
  winsByTurnOrder_PlayerCount: {},
  winnerMoneyDelta: { totalDelta: 0, maxDelta: 0, minDelta: 0 },
  winnerCardPairs: {},
};

async function run() {
  for (let g = 0; g < NUM_GAMES; g++) {
   // Update the UI every 10 games (or at the very end)
    if (!verbose && (g % 10 === 0 || g === NUM_GAMES)) {
      const percent = Math.floor((g / NUM_GAMES) * 100);
      
      const barLength = 80;
      const filled = Math.floor((percent / 100) * barLength);
      const empty = barLength - filled;
      
      const bar = '█'.repeat(filled) + '-'.repeat(empty);
      
      process.stdout.write(`\rSimulating: [${bar}] ${percent}% (${g}/${NUM_GAMES})`);
    }

    const numPlayers = basePlayers !== null ? basePlayers : Math.floor(Math.random() * 5) + 2; // 2 to 6
    metrics.gamesByPlayerCount[numPlayers] = (metrics.gamesByPlayerCount[numPlayers] || 0) + 1;

    const fixedPersonas = fixedPersonasArray.length > 0
      ? Object.fromEntries(Array.from({ length: numPlayers }, (_, i) => [i, fixedPersonasArray[i] || 'expert']))
      : null;

    const botPersonas = fixedPersonas ?? Object.fromEntries(
      Array.from({ length: numPlayers }, (_, i) => [
        i,
        BOT_PERSONAS[Math.floor(Math.random() * BOT_PERSONAS.length)],
      ])
    );

    const { engine } = createStandardGameSetup({
      playerCount: numPlayers,
      mode: 'competitive',
      selectedPacks: packsArg && packsArg.length > 0 ? packsArg : null,
      onLog: (entry) => {
        if (verbose && entry.type !== 'toast') {
          console.log(`[Game ${g}] ${entry.msg}`);
        }
      }
    });

    const autoplay = createAutoPlayer(engine, 'expert', {
      botIndices: engine.players.map((_, i) => i),
      personas: botPersonas
    });

    await autoplay.playFullGame(0);

    const usedPacks = engine.selectedPacks ?? [];

    if (engine.gameResult && engine.gameResult.winner) {
      const winnerName = engine.gameResult.winner;
      const winner = engine.players.find(p => p.name === winnerName);
      const winnerIdx = engine.players.indexOf(winner);
      const persona = botPersonas[winnerIdx] ?? 'expert';

      metrics.winsByPersona[persona] = (metrics.winsByPersona[persona] || 0) + 1;
      
      if (!metrics.winsByPersonaByPlayerCount[numPlayers]) {
        metrics.winsByPersonaByPlayerCount[numPlayers] = {};
      }
      metrics.winsByPersonaByPlayerCount[numPlayers][persona] = (metrics.winsByPersonaByPlayerCount[numPlayers][persona] || 0) + 1;

      const nationality = winner.nationality.name;
      const startingMoney = winner.startingMoney;
      const destination = winner.destination.name;

      metrics.winsByNationality[nationality] = (metrics.winsByNationality[nationality] || 0) + 1;
      metrics.winsByDestination[destination] = (metrics.winsByDestination[destination] || 0) + 1;

      const payRaises = winner.payRaises ?? 0;
      metrics.winsByPayRaise[payRaises] = (metrics.winsByPayRaise[payRaises] || 0) + 1;

      if (!metrics.winsByPlayerCountByPayRaise[numPlayers]) {
        metrics.winsByPlayerCountByPayRaise[numPlayers] = {};
      }
      metrics.winsByPlayerCountByPayRaise[numPlayers][payRaises] = (metrics.winsByPlayerCountByPayRaise[numPlayers][payRaises] || 0) + 1;

      const lifeCardNames = winner.stash.lifeCards.map(c => c.title);
      for (const name of lifeCardNames) {
        metrics.winnerLifeCards[name] = (metrics.winnerLifeCards[name] || 0) + 1;
      }

      // Assumes winnerIdx represents seat position (0 = first player)
      if (!metrics.winsByTurnOrder_PlayerCount[numPlayers]) {
        metrics.winsByTurnOrder_PlayerCount[numPlayers] = {};
      }
      metrics.winsByTurnOrder_PlayerCount[numPlayers][winnerIdx] = (metrics.winsByTurnOrder_PlayerCount[numPlayers][winnerIdx] || 0) + 1;

      const moneyDelta = winner.money - startingMoney;
      metrics.winnerMoneyDelta.totalDelta += moneyDelta;
      if (moneyDelta > metrics.winnerMoneyDelta.maxDelta) metrics.winnerMoneyDelta.maxDelta = moneyDelta;
      if (moneyDelta < metrics.winnerMoneyDelta.minDelta) metrics.winnerMoneyDelta.minDelta = moneyDelta;

      // Sort to ensure "Card A + Card B" is treated the same as "Card B + Card A"
      const sortedCards = [...lifeCardNames].sort();
      for (let i = 0; i < sortedCards.length; i++) {
        for (let j = i + 1; j < sortedCards.length; j++) {
          const pair = `${sortedCards[i]} + ${sortedCards[j]}`;
          metrics.winnerCardPairs[pair] = (metrics.winnerCardPairs[pair] || 0) + 1;
        }
      }

      for (const pack of usedPacks) {
        metrics.winsByPack[pack] = (metrics.winsByPack[pack] || 0) + 1;
      }

      if (!metrics.winsByPlayerCountByCrossed[numPlayers]) {
        metrics.winsByPlayerCountByCrossed[numPlayers] = {};
      }
      metrics.winsByPlayerCountByCrossed[numPlayers][winner.crossedSuccessfully] = (metrics.winsByPlayerCountByCrossed[numPlayers][winner.crossedSuccessfully] || 0) + 1;

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
        docs: winner.stash.documents.length,
        connections: winner.stash.connections.length,
        lifeCards: lifeCardNames,
        crossed: winner.crossedSuccessfully,
        turns: engine.turnNumber, // Kept this in the snapshot just in case you want to analyze individual game lengths later
      });
    }
  }

  console.log(`\n\nSimulation Complete!`);
  console.log(`Win Rate by Persona (Overall):`);
  const overallSorted = Object.entries(metrics.winsByPersona).sort((a, b) => b[1] - a[1]);
  for (const [persona, wins] of overallSorted) {
    console.log(`  ${persona}: ${((wins / NUM_GAMES) * 100).toFixed(1)}% (${wins} wins)`);
  }

  if (basePlayers === null) {
    console.log(`\nWin Rate by Persona by Player Count:`);
    const counts = Object.keys(metrics.gamesByPlayerCount).sort((a, b) => a - b);
    for (const count of counts) {
      const games = metrics.gamesByPlayerCount[count];
      console.log(`  ${count} Players (${games} games):`);
      const winsByPersona = metrics.winsByPersonaByPlayerCount[count] || {};
      const sortedWinsByPersona = Object.entries(winsByPersona).sort((a, b) => b[1] - a[1]);
      for (const [persona, wins] of sortedWinsByPersona) {
        console.log(`    ${persona}: ${((wins / games) * 100).toFixed(1)}% (${wins} wins)`);
      }
    }
  }

  const sortedPlayerCounts = Object.keys(metrics.gamesByPlayerCount).sort((a, b) => a - b);

  const sortedNationalities = Object.entries(metrics.winsByNationality).sort((a, b) => b[1] - a[1]);
  console.log(`\nWin Rate by Starting Nationality:`);
  for (const [nat, wins] of sortedNationalities) {
    console.log(`  ${nat}: ${((wins / NUM_GAMES) * 100).toFixed(1)}% (${wins} wins)`);
  }

  const sortedDestinations = Object.entries(metrics.winsByDestination).sort((a, b) => b[1] - a[1]);
  console.log(`\nWin Rate by Destination:`);
  for (const [dest, wins] of sortedDestinations) {
    console.log(`  ${dest}: ${((wins / NUM_GAMES) * 100).toFixed(1)}% (${wins} wins)`);
  }

  console.log(`\nWin Rate by Pay Raise Status (College Graduations):`);
  const payRaiseLabels = {
    0: '0 pay raises (0 college graduations)',
    1: '1 pay raise  (1 college graduation)',
    2: '2 pay raises (2 college graduations)',
  };
  for (let r = 0; r <= 2; r++) {
    const wins = metrics.winsByPayRaise[r] || 0;
    console.log(`  ${payRaiseLabels[r]}: ${((wins / NUM_GAMES) * 100).toFixed(1)}% (${wins} wins)`);
  }

  // --- NEW: Log Turn Order Advantage ---
  console.log(`\nWin Rate by Turn Order (Seat Position):`);
  for (const countStr of sortedPlayerCounts) {
    console.log(`  ${countStr} Players:`);
    const seats = metrics.winsByTurnOrder_PlayerCount[countStr] || {};
    const totalGamesForCount = metrics.gamesByPlayerCount[countStr];
    for (let seat = 0; seat < parseInt(countStr, 10); seat++) {
      const wins = seats[seat] || 0;
      console.log(`    Seat ${seat + 1}: ${((wins / totalGamesForCount) * 100).toFixed(1)}% (${wins} wins)`);
    }
  }

  // --- NEW: Log Money Delta ---
  console.log(`\nWinner Financial Delta (Final Money - Starting Money):`);
  console.log(`  Average Delta: ${Math.round(metrics.winnerMoneyDelta.totalDelta / NUM_GAMES)}`);
  console.log(`  Max Delta: ${metrics.winnerMoneyDelta.maxDelta}`);
  console.log(`  Min Delta: ${metrics.winnerMoneyDelta.minDelta}`);

  // --- NEW: Log Card Synergies ---
  console.log(`\nTop 5 Winner Card Synergies (Pairs):`);
  const sortedPairs = Object.entries(metrics.winnerCardPairs).sort((a, b) => b[1] - a[1]).slice(0, 5);
  for (const [pair, count] of sortedPairs) {
    console.log(`  [${pair}]: ${count} times`);
  }

  console.log(`\nNumber of Players by Winner's Pay Raises:`);
  for (const countStr of sortedPlayerCounts) {
    const stats = metrics.winsByPlayerCountByPayRaise[countStr] || {};
    const zeroRaises = stats[0] || 0;
    const oneRaise = stats[1] || 0;
    const twoRaises = stats[2] || 0;
    const total = zeroRaises + oneRaise + twoRaises;
    
    // Calculates win rate based on total wins for this specific player count
    const pct0 = total > 0 ? ((zeroRaises / total) * 100).toFixed(1) : '0.0';
    const pct1 = total > 0 ? ((oneRaise / total) * 100).toFixed(1) : '0.0';
    const pct2 = total > 0 ? ((twoRaises / total) * 100).toFixed(1) : '0.0';

    console.log(`  ${countStr} Players: 0 Raises: ${zeroRaises} (${pct0}%), 1 Raise: ${oneRaise} (${pct1}%), 2 Raises: ${twoRaises} (${pct2}%)`);
  }

  console.log(`\nWinner Life Cards (by frequency):`);
  const sortedLifeCards = Object.entries(metrics.winnerLifeCards).sort((a, b) => b[1] - a[1]);
  for (const [name, count] of sortedLifeCards) {
    console.log(`  "${name}": ${count} times`);
  }

  const sortedEntries = Object.entries(metrics.winsByPlayerCountByCrossed)
    .sort(([playersA], [playersB]) => Number(playersA) - Number(playersB));

  console.log("\nWinner Crossed Data (Sorted by Player Count):");
  for (const [playerCount, stats] of sortedEntries) {
    const countTrue = stats.true || 0;
    const countFalse = stats.false || 0;
    const total = countTrue + countFalse;
    const percentTrue = total > 0 ? (countTrue / total) * 100 : 0;
    
    console.log(`  ${playerCount} Players: ${countTrue} times (${percentTrue.toFixed(1)}%)`);
  }

  if (values.output) {
    metrics.winsByPersona = Object.fromEntries(overallSorted);
    metrics.winsByNationality = Object.fromEntries(sortedNationalities);
    metrics.winsByDestination = Object.fromEntries(sortedDestinations);
    metrics.winsByPayRaise = {
      "0": metrics.winsByPayRaise[0] || 0,
      "1": metrics.winsByPayRaise[1] || 0,
      "2": metrics.winsByPayRaise[2] || 0,
    };
    metrics.winnerLifeCards = Object.fromEntries(sortedLifeCards);
    metrics.winsByPack = Object.fromEntries(Object.entries(metrics.winsByPack).sort((a, b) => b[1] - a[1]));
    
    for (const count of Object.keys(metrics.winsByPersonaByPlayerCount)) {
      metrics.winsByPersonaByPlayerCount[count] = Object.fromEntries(
        Object.entries(metrics.winsByPersonaByPlayerCount[count]).sort((a, b) => b[1] - a[1])
      );
    }

    metrics.winnerMoneyDelta.averageDelta = parseFloat((metrics.winnerMoneyDelta.totalDelta / NUM_GAMES).toFixed(2));
    metrics.winnerCardPairs = Object.fromEntries(Object.entries(metrics.winnerCardPairs).sort((a, b) => b[1] - a[1]));

    fs.writeFileSync(values.output, JSON.stringify(metrics, null, 2));
    console.log(`\nData exported to ${values.output}`);

    const txtOutput = values.output.endsWith('.json') 
      ? values.output.replace(/\.json$/, '.txt') 
      : `${values.output}.txt`;
      
    fs.writeFileSync(txtOutput, JSON.stringify(metrics));
  }
}

run().catch(console.error);
