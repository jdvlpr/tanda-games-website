import EmigrationEngine, {
  shuffleArray,
  NATIONALITIES,
  DESTINATIONS,
  NATIONALITY_TO_COUNTRY,
  PACKS_LIST
} from "./engine.svelte.js";

export function getRandomPacks(count) {
  return shuffleArray([...PACKS_LIST]).slice(0, count);
}

export function getRandomPlayersSetup(totalCount = 6) {
  const shuffledNats = shuffleArray([...NATIONALITIES]);
  const availableDests = shuffleArray([...DESTINATIONS]);

  return Array.from({ length: totalCount }, (_, i) => {
    const nat = shuffledNats[i];
    const matchingCountry = NATIONALITY_TO_COUNTRY[nat.name];
    
    const destIndex = availableDests.findIndex((d) => d.name !== matchingCountry);
    const [destObj] = availableDests.splice(destIndex, 1);

    return {
      name: `Player ${i + 1}`,
      nationality: nat,
      destination: destObj,
    };
  });
}

export function createStandardGameSetup({
  playerCount = 4,
  mode = "competitive",
  selectedPacks = null,
  onLog = null,
  onStateChange = null,
  playersSetupOverride = null,
}) {
  const playersSetup = playersSetupOverride || getRandomPlayersSetup(playerCount);
  const finalPacks = selectedPacks || getRandomPacks(playerCount);

  const engine = new EmigrationEngine({
    mode,
    players: playersSetup,
    selectedPacks: finalPacks,
    onLog,
    onStateChange,
  });

  return { engine, playersSetup, selectedPacks: finalPacks };
}
