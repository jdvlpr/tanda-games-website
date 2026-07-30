import fs from 'node:fs';
import { parseArgs } from 'node:util';
import { createStandardGameSetup } from '../src/components/emigration-emulator/gameSetup.js';
import { createAutoPlayer } from '../src/components/emigration-emulator/autoplay.js';
import { PACKS_LIST } from '../src/components/emigration-emulator/engine.svelte.js';

const { values } = parseArgs({
  options: {
    games:   { type: 'string',  short: 'g', default: '100' },
    players: { type: 'string',  short: 'p', default: '4' },
    personas:{ type: 'string',              default: '' },
    packs:   { type: 'string',              default: '' },
    output:  { type: 'string',  short: 'o', default: '' },
    verbose: { type: 'boolean', short: 'v', default: false },
  },
});

const NUM_GAMES  = parseInt(values.games, 10);
const NUM_PLAYERS = parseInt(values.players, 10);
const verbose    = values.verbose;

// Personas that use full heuristic scoring — the useful pool for balance testing
const HEURISTIC_PERSONAS = ['expert', 'rusher', 'hoarder', 'saboteur', 'conservative'];

const fixedPersonasArray = values.personas ? values.personas.split(',') : [];
// If --personas is supplied, fix personas for every game; otherwise randomise per game
const fixedPersonas = fixedPersonasArray.length > 0
  ? Object.fromEntries(Array.from({ length: NUM_PLAYERS }, (_, i) => [i, fixedPersonasArray[i] || 'expert']))
  : null;

if (fixedPersonas) {
  console.log(`Personas (fixed):`, fixedPersonas);
} else {
  console.log(`Personas: random per player per game (pool: ${HEURISTIC_PERSONAS.join(', ')})`);
}

// --packs: comma-separated pack names (validated against PACKS_LIST), or random each game
const packsArg = values.packs
  ? values.packs.split(',').map(s => s.trim()).filter(s => PACKS_LIST.includes(s))
  : null;

if (values.packs && packsArg.length === 0) {
  console.warn(`Warning: --packs provided but no valid pack names matched. Available: ${PACKS_LIST.join(', ')}`);
}

console.log(`Starting Emigration Simulation...`);
console.log(`Games: ${NUM_GAMES}, Players: ${NUM_PLAYERS}`);
console.log(`Life Packs: ${packsArg ? packsArg.join(', ') : 'random each game'}`);

const metrics = {
  totalGames: NUM_GAMES,
  winsByPersona: {},
  // Life card name -> number of times that card appeared in the winner's stash
  winnerLifeCards: {},
  // Pack name -> number of wins where that pack was in play
  winsByPack: {},
  totalTurns: 0,
  assuranceScores: [],
  // Per-game winner snapshots for deeper analysis
  winnerSnapshots: [],
};

async function run() {
  for (let g = 0; g < NUM_GAMES; g++) {
    if (!verbose && g > 0 && g % 10 === 0) {
      console.log(`Simulated ${g} games...`);
    }

    // Assign personas: fixed if --personas supplied, otherwise random per player per game
    const botPersonas = fixedPersonas ?? Object.fromEntries(
      Array.from({ length: NUM_PLAYERS }, (_, i) => [
        i,
        HEURISTIC_PERSONAS[Math.floor(Math.random() * HEURISTIC_PERSONAS.length)],
      ])
    );

    const { engine } = createStandardGameSetup({
      playerCount: NUM_PLAYERS,
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

    // The packs actually used this game (engine resolves random if none supplied)
    const usedPacks = engine.selectedPacks ?? [];

    if (engine.gameResult && engine.gameResult.winner) {
      const winnerName = engine.gameResult.winner;
      const winner = engine.players.find(p => p.name === winnerName);
      const winnerIdx = engine.players.indexOf(winner);
      const persona = botPersonas[winnerIdx] ?? 'expert';

      // Wins by persona
      metrics.winsByPersona[persona] = (metrics.winsByPersona[persona] || 0) + 1;

      // Winner's life cards
      const lifeCardNames = winner.stash.lifeCards.map(c => c.name);
      for (const name of lifeCardNames) {
        metrics.winnerLifeCards[name] = (metrics.winnerLifeCards[name] || 0) + 1;
      }

      // Wins per pack (any pack in play at time of win)
      for (const pack of usedPacks) {
        metrics.winsByPack[pack] = (metrics.winsByPack[pack] || 0) + 1;
      }

      // Per-game winner snapshot
      metrics.winnerSnapshots.push({
        game: g,
        name: winnerName,
        persona,
        packs: usedPacks,
        assurance: winner.assurance,
        money: winner.money,
        docs: winner.stash.documents.length,
        connections: winner.stash.connections.length,
        lifeCards: lifeCardNames,
        crossed: winner.crossedSuccessfully,
        turns: engine.turnNumber,
      });
    }

    // Assurance scores for all players
    engine.players.forEach(p => {
      metrics.assuranceScores.push(p.assurance);
    });
  }

  console.log(`\nSimulation Complete!`);
  console.log(`Win Rate by Persona:`);
  for (const [persona, wins] of Object.entries(metrics.winsByPersona)) {
    console.log(`  ${persona}: ${((wins / NUM_GAMES) * 100).toFixed(1)}% (${wins} wins)`);
  }
  console.log(`Average Turns: ${(metrics.totalTurns / NUM_GAMES).toFixed(1)}`);
  console.log(`Winner Life Cards (by frequency):`);
  const sortedLifeCards = Object.entries(metrics.winnerLifeCards).sort((a, b) => b[1] - a[1]);
  for (const [name, count] of sortedLifeCards) {
    console.log(`  "${name}": ${count} times`);
  }

  if (values.output) {
    fs.writeFileSync(values.output, JSON.stringify(metrics, null, 2));
    console.log(`Data exported to ${values.output}`);
  }
}

run().catch(console.error);
