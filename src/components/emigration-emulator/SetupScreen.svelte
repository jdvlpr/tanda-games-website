<script>
  import Icon from "@iconify/svelte";
  import { copyRoomUrl } from "./useOnlineRoom.svelte.js";
  import { PACKS_LIST } from "./engine.svelte.js";
  import { BOT_PERSONAS, getRandomPersona } from "./autoplay.js";

  /**
   * Pre-game setup screen.
   *
   * Props:
   *   gameType          – $bindable: 'vscomputer'|'passplay'|'auto'|'online'
   *   showRobotMode     – whether the hidden "Robots" game-type button is visible
   *   playersSetup      – array of { name, nationality, destination } for local play
   *   playerCount       – $bindable: number of local players
   *   localSelectedPacks – $bindable: active packs for local games
   *   toast             – toast store (for enabling on mode switch)
   *
   *   -- Online specific (passed from useOnlineRoom) --
   *   currentRoomCode   – active room code string (empty = not in room)
   *   p2pPlayers        – reactive array of online room players
   *   isHost            – whether this client is the room host
   *   selfId            – this client's peer ID
   *   onlineSelectedPacks – active packs for online games
   *
   *   -- Callbacks --
   *   onstart           – ({ gameType }) => void  – fires Start Game button
   *   onhostroom        – () => void
   *   onjoinroom        – (code: string) => void
   *   onexitroom        – () => void
   *   onaddbot          – () => void
   *   onremovebot       – (idx: number) => void
   *   ontogglelocalpack – (pack) => void
   *   ontoggleonlinepack– (pack) => void
   *   onupdatename      – (name: string) => void  – local player name in online mode
   */
  let {
    gameType = $bindable("vscomputer"),
    showRobotMode = false,
    playersSetup = $bindable([]),
    playerCount = $bindable(4),
    botPersonas = $bindable({}),
    localSelectedPacks = $bindable([]),
    toast,
    currentRoomCode = "",
    p2pPlayers = [],
    isHost = false,
    selfId = "",
    onlineSelectedPacks = [],
    onstart = null,
    onhostroom = null,
    onjoinroom = null,
    onexitroom = null,
    onaddbot = null,
    onremovebot = null,
    ontogglelocalpack = null,
    ontoggleonlinepack = null,
    onupdatename = null,
  } = $props();

  let joinRoomCodeInput = $state("");
  // Local player name kept here only for the online waiting room input
  let localPlayerName = $state("Player 1");

  let activeSelectedPacks = $derived(
    gameType === "online" ? onlineSelectedPacks : localSelectedPacks,
  );

  let activeSetup = $derived(playersSetup.slice(0, playerCount));

  // Initialize empty bot slots with random personas so the UI shows them and the user can change them
  for (let i = 0; i < 6; i++) {
    if (!botPersonas[i]) {
      botPersonas[i] = getRandomPersona();
    }
  }
</script>

<div class="max-w-lg mx-auto px-2">
  <div class="flex flex-col gap-5 mt-4">
    <!-- Game Mode selector -->
    <div class="flex flex-col gap-1">
      <p class="opacity-70 text-sm">Game Mode</p>
      <div class="flex justify-center flex-wrap gap-y-1">
        <button
          class="btn-sm rounded-r-none {gameType === 'vscomputer'
            ? 'bg-red-200 dark:bg-red-900  '
            : ''}"
          onclick={() => {
            gameType = "vscomputer";
            toast.enabled = true;
          }}
        >
          Solo
        </button>
        <button
          class="btn-sm border-x-0 rounded-l-none rounded-r-none {gameType ===
          'passplay'
            ? 'bg-red-200 dark:bg-red-900  '
            : ''}"
          onclick={() => {
            gameType = "passplay";
            toast.enabled = true;
          }}
        >
          Pass &amp; Play
        </button>
        {#if showRobotMode}
          <button
            class="btn-sm rounded-l-none rounded-r-none border-r-0 {gameType ===
            'auto'
              ? 'bg-red-200 dark:bg-red-900  '
              : ''}"
            onclick={() => {
              gameType = "auto";
              toast.enabled = false;
            }}
          >
            Robots
          </button>
        {/if}
        <button
          class="btn-sm rounded-l-none {gameType === 'online'
            ? 'bg-red-200 dark:bg-red-900  '
            : ''}"
          onclick={() => {
            gameType = "online";
            toast.enabled = true;
          }}
        >
          Online
        </button>
      </div>
    </div>

    <!-- Online Mode -->
    {#if gameType === "online"}
      <div class="flex flex-col gap-4">
        {#if !currentRoomCode}
          <!-- No room yet: host or join -->
          <div class="flex flex-col gap-2 mx-auto w-full items-center">
            <button
              class="btn bg-green-200 dark:bg-green-800 w-full"
              onclick={onhostroom}>Host New Game</button
            >
            <div class="flex items-center gap-2 text-sm opacity-50 w-full">
              <hr class="flex-1" />
              OR
              <hr class="flex-1" />
            </div>
            <div class="flex items-center w-full">
              <input
                type="text"
                placeholder="Enter Room Code"
                class="flex-1 text-center font-mono uppercase rounded-r-none py-[6.5px] border-r-0"
                maxlength="5"
                bind:value={joinRoomCodeInput}
              />
              <button
                class="btn py-[5px] px-2 bg-blue-200 dark:bg-blue-800 rounded-l-none"
                onclick={() => onjoinroom?.(joinRoomCodeInput)}
                >Join Game</button
              >
            </div>
          </div>
        {:else}
          <!-- Inside a room: waiting room UI -->
          <button
            class="btn-sm mx-auto bg-red-300 dark:bg-red-700"
            onclick={onexitroom}
          >
            <Icon icon="lucide:x" class="size-3.5" />
            {isHost ? "Close Room" : "Leave Room"}
          </button>

          <div class="flex flex-col gap-2">
            <!-- Room code display -->
            <div
              class="flex flex-col items-center gap-2 bg-blue-50 dark:bg-blue-950 p-3 rounded-lg border border-blue-200 dark:border-blue-800"
            >
              <p class="text-sm opacity-70">Room Code</p>
              <div class="flex gap-2 items-center">
                <span class="text-2xl font-mono tracking-widest font-bold"
                  >{currentRoomCode}</span
                >
                <button
                  class="btn-sm bg-amber-200 dark:bg-amber-800"
                  onclick={copyRoomUrl}
                  title="Copy Link"
                >
                  <Icon icon="lucide:copy" />
                  Copy Link
                </button>
              </div>
              <p class="text-xs opacity-60">
                Share this code with your friends!
              </p>
            </div>

            <!-- Your Name -->
            <div
              class="flex flex-col gap-2 p-2 items-start rounded-2xl bg-neutral-100 dark:bg-neutral-900 shadow-md border border-neutral-200 dark:border-neutral-800"
            >
              <p class="text-sm opacity-70">Your Name</p>
              <input
                class="flex-1"
                type="text"
                bind:value={localPlayerName}
                placeholder="Your Name"
                oninput={() => onupdatename?.(localPlayerName)}
              />
            </div>

            <!-- Players in Room -->
            <div class="flex flex-col gap-2">
              <p class="text-sm font-bold flex justify-between items-center">
                <span>Players in Room ({p2pPlayers.length}/6)</span>
                {#if isHost && p2pPlayers.length < 6}
                  <button class="btn-sm" onclick={onaddbot}>🤖 Add Robot</button
                  >
                {/if}
              </p>
              <div class="grid grid-cols-2 gap-2">
                {#each p2pPlayers as p, i}
                  <div
                    class="p-2 rounded-2xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex justify-between items-center"
                  >
                    <span class="font-bold">{p.name || "Anonymous"}</span>
                    <div class="flex items-center gap-1">
                      {#if p.isHost}
                        <span
                          class="text-[10px] uppercase bg-green-200 dark:bg-green-900 text-green-800 dark:text-green-200 px-1 py-0.5 rounded"
                          >Host</span
                        >
                      {:else if p.peerId === "self"}
                        <span
                          class="text-[10px] uppercase bg-blue-200 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-1 py-0.5 rounded"
                          >You</span
                        >
                      {/if}
                      {#if isHost && p.isBot}
                        <button
                          class="btn-sm border-none text-red-500 hover:text-red-700"
                          onclick={() => onremovebot?.(i)}
                          title="Remove Robot"
                          ><Icon icon="lucide:x" class="size-4" /></button
                        >
                      {/if}
                    </div>
                  </div>
                {/each}
              </div>
            </div>
          </div>
        {/if}
      </div>
    {:else}
      <!-- Local play: player count + player names -->
      <label
        ><span class="text-sm opacity-70">Number of Players:</span>
        <select class="w-fit" bind:value={playerCount}>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
          <option value={6}>6</option>
        </select>
      </label>

      <div class="flex flex-col gap-4">
        {#each activeSetup as p, i}
          <div
            class="flex flex-wrap gap-2 p-2 rounded-2xl bg-neutral-100 dark:bg-neutral-900 shadow-md border border-neutral-200 dark:border-neutral-800"
          >
            <div class="flex flex-col gap-2 flex-1">
              {#if (gameType === "vscomputer" && i === 0) || (gameType !== "vscomputer" && gameType !== "auto")}
                <p class="text-sm opacity-70 text-left">Human</p>
              {:else if gameType === "vscomputer" || gameType === "auto"}
                <p class="text-sm opacity-70 text-left">Robot</p>
              {/if}
              <input
                class="min-w-[200px]"
                type="text"
                bind:value={p.name}
                placeholder="Player Name"
              />
            </div>
            {#if (gameType === "vscomputer" && i !== 0) || gameType === "auto"}
              <div class="w-fit flex flex-col gap-2 h-fit">
                <p class="text-sm opacity-70 text-left">Skill</p>
                <select class="w-fit" bind:value={botPersonas[i]}>
                  {#each BOT_PERSONAS as persona}
                    <option value={persona}
                      >{persona.charAt(0).toUpperCase() +
                        persona.slice(1)}</option
                    >
                  {/each}
                </select>
              </div>
            {/if}
          </div>
        {/each}
      </div>
    {/if}

    <!-- Start Button area -->
    <div class="my-2">
      {#if gameType === "online"}
        {#if isHost && currentRoomCode}
          <button
            class="btn w-full text-2xl bg-amber-200 dark:bg-amber-800 disabled:opacity-40"
            disabled={p2pPlayers.length < 2}
            onclick={() => onstart?.({ gameType })}
          >
            Start Game ({p2pPlayers.length} Player{p2pPlayers.length !== 1
              ? "s"
              : ""})
          </button>
          {#if p2pPlayers.length < 2}
            <p class="text-xs opacity-60 mt-1">
              Waiting for at least 1 more player to join…
            </p>
          {/if}
        {:else if !currentRoomCode}
          <!-- No room joined yet, no start button -->
        {:else}
          <p class="text-sm italic opacity-60">
            Waiting for the host to start the game…
          </p>
        {/if}
      {:else}
        <button
          class="btn w-full text-2xl bg-amber-200 dark:bg-amber-800"
          onclick={() => onstart?.({ gameType })}>Start Game</button
        >
      {/if}
    </div>
  </div>
</div>
