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
  turnsByPlayerCount: {},
  winsByPersona: {},
  winsByPersonaByPlayerCount: {},
  winsByNationality: {},
  winsByDestination: {},
  winsByPayRaise: {},
  winnerLifeCards: {},
  winsByPack: {},
  totalTurns: 0,
  winnerSnapshots: [],
};

async function run() {
  for (let g = 0; g < NUM_GAMES; g++) {
    if (!verbose && g > 0 && g % 100 === 0) {
      console.log(`Simulated ${g} games...`);
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

    metrics.totalTurns += engine.turnNumber;
    metrics.turnsByPlayerCount[numPlayers] = (metrics.turnsByPlayerCount[numPlayers] || 0) + engine.turnNumber;

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
      const startingMoney = winner.startingFund;
      const destination = winner.destination.name;

      metrics.winsByNationality[nationality] = (metrics.winsByNationality[nationality] || 0) + 1;
      metrics.winsByDestination[destination] = (metrics.winsByDestination[destination] || 0) + 1;

      const payRaises = winner.payRaises ?? 0;
      metrics.winsByPayRaise[payRaises] = (metrics.winsByPayRaise[payRaises] || 0) + 1;

      const lifeCardNames = winner.stash.lifeCards.map(c => c.title);
      for (const name of lifeCardNames) {
        metrics.winnerLifeCards[name] = (metrics.winnerLifeCards[name] || 0) + 1;
      }

      for (const pack of usedPacks) {
        metrics.winsByPack[pack] = (metrics.winsByPack[pack] || 0) + 1;
      }

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
        turns: engine.turnNumber,
      });
    }


  }

  console.log(`\nSimulation Complete!`);
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

  console.log(`\nAverage Turns (Overall): ${(metrics.totalTurns / NUM_GAMES).toFixed(1)}`);
  console.log(`Average Turns per Player by Player Count:`);
  const sortedPlayerCounts = Object.keys(metrics.gamesByPlayerCount).sort((a, b) => a - b);
  for (const countStr of sortedPlayerCounts) {
    const count = parseInt(countStr, 10);
    const games = metrics.gamesByPlayerCount[countStr];
    const turns = metrics.turnsByPlayerCount[countStr] || 0;
    const avgTurnsPerGame = turns / games;
    const avgTurnsPerPlayer = avgTurnsPerGame / count;
    console.log(`  ${count} Players: ${avgTurnsPerPlayer.toFixed(1)} turns/player (${avgTurnsPerGame.toFixed(1)} total turns per game)`);
  }

  const sortedNationalities = Object.entries(metrics.winsByNationality).sort((a, b) => b[1] - a[1]);
  console.log(`\nWin Rate by Starting Nationality (includes starting $):`);
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

  console.log(`\nWinner Life Cards (by frequency):`);
  const sortedLifeCards = Object.entries(metrics.winnerLifeCards).sort((a, b) => b[1] - a[1]);
  for (const [name, count] of sortedLifeCards) {
    console.log(`  "${name}": ${count} times`);
  }

  if (values.output) {
    // Sort keys in objects before writing to JSON
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
    
    const avgTurnsPerPlayerByPlayerCount = {};
    for (const countStr of sortedPlayerCounts) {
      const count = parseInt(countStr, 10);
      const games = metrics.gamesByPlayerCount[countStr];
      const turns = metrics.turnsByPlayerCount[countStr] || 0;
      avgTurnsPerPlayerByPlayerCount[countStr] = parseFloat((turns / (games * count)).toFixed(1));
    }
    metrics.averageTurnsOverall = parseFloat((metrics.totalTurns / NUM_GAMES).toFixed(1));
    metrics.averageTurnsPerPlayerByPlayerCount = avgTurnsPerPlayerByPlayerCount;
    metrics.totalTurns;
    metrics.turnsByPlayerCount;
    
    for (const count of Object.keys(metrics.winsByPersonaByPlayerCount)) {
      metrics.winsByPersonaByPlayerCount[count] = Object.fromEntries(
        Object.entries(metrics.winsByPersonaByPlayerCount[count]).sort((a, b) => b[1] - a[1])
      );
    }

    fs.writeFileSync(values.output, JSON.stringify(metrics, null, 2));
    console.log(`Data exported to ${values.output}`);
  }
}

run().catch(console.error);
