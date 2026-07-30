<script>
  import Icon from "@iconify/svelte";
  import { fade, fly } from "svelte/transition";

  /**
   * The settings overlay modal.
   *
   * Props:
   *   show          – bind:show to toggle visibility
   *   toast         – the toast store (for enabled / timeoutMs bindings)
   *   isSetup       – whether we're still in the setup screen
   *   gameType      – 'vscomputer'|'passplay'|'auto'|'online'
   *   mode          – 'competitive'|'cooperative'
   *   aiDifficulty  – 'easy'|'normal'|'expert'
   *   PACKS_LIST    – array of pack name strings
   *   activeSelectedPacks – currently selected packs
   *   playerCount   – number of local players (non-online)
   *   p2pPlayers    – array of online room players
   *   currentRoomCode – active room code string (empty when not in room)
   *   multiplayer   – the multiplayer store
   *   onlineSelectedPacks – currently selected online packs
   *
   *   onmodechange       – (newMode) => void
   *   onaidifficulty     – (diff) => void
   *   ontogglepack       – (pack) => void  (handles local vs online internally via gameType)
   */
  let {
    show = $bindable(false),
    toast,
    isSetup,
    gameType,
    mode,
    PACKS_LIST = [],
    activeSelectedPacks = [],
    playerCount,
    p2pPlayers = [],
    currentRoomCode = "",
    multiplayer,
    onmodechange = null,
    ontogglepack = null,
  } = $props();
</script>

{#if show}
  <div
    transition:fade={{ duration: 100 }}
    class="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex justify-center items-center z-[9999]"
    role="presentation"
    onclick={(e) => {
      if (e.target === e.currentTarget) show = false;
    }}
  >
    <div
      in:fly={{ y: -50 }}
      class="bg-neutral-200 dark:bg-neutral-800 p-2 rounded-2xl max-w-fit w-[90%] shadow-xl max-h-[90vh] overflow-y-auto"
    >
      <div class="flex justify-between gap-2">
        <h2 class="mb-2 text-xl font-semibold text-center">Settings</h2>
        <button
          class="btn-sm"
          onclick={() => {
            show = false;
          }}><Icon icon="lucide:x" class=""></Icon></button
        >
      </div>
      <div
        class="flex flex-col gap-4 items-start text-left mx-auto w-full rounded-2xl p-4 bg-neutral-100 dark:bg-neutral-900 shadow-md border border-neutral-200 dark:border-neutral-800"
      >
        <div class="flex flex-col gap-2">
          <label
            class="items-center gap-2 cursor-pointer select-none inline-flex"
          >
            <div class="relative">
              <input
                type="checkbox"
                class="sr-only peer"
                bind:checked={toast.enabled}
              />
              <div
                class="w-11 h-6 bg-neutral-300 rounded-full peer dark:bg-neutral-700 peer-checked:bg-blue-400 dark:peer-checked:bg-blue-900 transition-colors duration-200 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full peer-checked:after:border-white shadow-sm"
              ></div>
            </div>
            <span
              class="text-sm font-medium text-neutral-800 dark:text-neutral-200"
            >
              Enable Notifications
            </span>
          </label>
          {#if toast.enabled}
            <div class="flex flex-col gap-1">
              <label for="toast-timeout" class="text-sm opacity-70"
                >Notifications Timeout</label
              >
              <select id="toast-timeout" bind:value={toast.timeoutMs}>
                <option value={1500}>Fast (1.5s)</option>
                <option value={3000}>Normal (3s)</option>
                <option value={5000}>Long (5s)</option>
              </select>
            </div>
          {/if}
        </div>

        {#if isSetup}
          {#if gameType !== "online" || (currentRoomCode && multiplayer.isHost)}
            <div class="flex flex-col gap-1 max-w-md">
              <p class="text-sm opacity-70">
                Life Card Packs {#if (gameType === "online" ? p2pPlayers.length : playerCount) !== activeSelectedPacks.length}
                  <span
                    class="p-1 bg-amber-100 dark:bg-amber-900 rounded-2xl font-bold"
                    >(SELECT {gameType === "online"
                      ? p2pPlayers.length
                      : playerCount})</span
                  >
                {/if}
              </p>
              <div class="flex flex-wrap gap-2">
                {#each PACKS_LIST as pack}
                  <button
                    class="btn-sm hover:bg-purple-50 dark:hover:bg-purple-950 {activeSelectedPacks.includes(
                      pack,
                    )
                      ? 'bg-purple-100 dark:bg-purple-900  '
                      : ''}"
                    onclick={() => ontogglepack?.(pack)}
                  >
                    {pack}
                  </button>
                {/each}
              </div>
            </div>
          {/if}

          {#if gameType !== "online" || (currentRoomCode && multiplayer.isHost)}
            <div class="flex flex-col gap-1">
              <p class="text-sm opacity-70">Game Type</p>
              <div class="flex justify-center">
                <button
                  class="btn-sm rounded-r-none border-r-0 hover:bg-green-50 dark:hover:bg-green-950 {mode ===
                    'competitive' && 'bg-green-200 dark:bg-green-900'}"
                  onclick={() => onmodechange?.("competitive")}
                  >Competitive</button
                >
                <button
                  class=" btn-sm rounded-l-none hover:bg-green-50 dark:hover:bg-green-950 {mode ===
                    'cooperative' && 'bg-green-200 dark:bg-green-900'}"
                  onclick={() => onmodechange?.("cooperative")}
                  >Cooperative</button
                >
              </div>
            </div>
          {/if}

        {/if}
      </div>
    </div>
  </div>
{/if}
