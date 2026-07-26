<script>
  import Icon from "@iconify/svelte";

  let {
    engine,
    snapshot,
    currentPlayer,
    actions,
    onaction,
    onselectlane,
    selectionText,
    pendingChoice,
    computerTurn = false,
    waitingForPeer = false,
    waitingForName = "",
    autoScrollEnabled = true,
    onclearselection,
    hasSelection = false,
    copyTextToClipboard,
  } = $props();

  let logContainer = $state(null);

  // Auto-scroll logs when snapshot updates (disabled for AI Simulation mode)
  $effect(() => {
    if (autoScrollEnabled && snapshot && snapshot.logs && logContainer) {
      setTimeout(() => {
        if (logContainer) {
          logContainer.scrollTop = logContainer.scrollHeight;
        }
      }, 50);
    }
  });
</script>

<div
  class="bg-slate-300/90 dark:bg-slate-700/90 text-slate-950 dark:text-slate-50 border border-slate-300 dark:border-slate-700 rounded-md p-2 flex flex-col gap-2 overflow-auto backdrop-blur-md max-lg:shadow-lg"
>
  {#if engine && snapshot}
    <!-- Action Dashboard Panel -->
    <div>
      <!-- Action States -->
      {#if snapshot.phase === "game_over"}
        <div class="text-center flex flex-col items-center">
          <h3 class="font-bold">Game Over</h3>
          <div class="text-lg font-bold">{snapshot.gameResult?.message}</div>
        </div>
      {:else if computerTurn}
        <div class="text-sm font-semibold">🤖 Computer is taking its turn…</div>
      {:else if waitingForPeer}
        <div class="text-sm font-semibold">
          ⏳ Waiting for <span class="font-bold"
            >{waitingForName || "another player"}</span
          >…
        </div>
      {:else if snapshot.phase === "preparation"}
        <!-- Selection Hint -->
        <div
          class="text-sm min-h-[44px] flex items-center justify-center text-center gap-2 flex-wrap"
        >
          <span class="flex-1">{@html selectionText}</span>
          {#if hasSelection && onclearselection}
            <button
              class="btn-sm bg-slate-200 dark:bg-slate-800 border-slate-500"
              onclick={onclearselection}
              ><Icon icon="lucide:x" class="size-5" /> Clear</button
            >
          {/if}
        </div>
        <div class="flex flex-wrap gap-2 items-center justify-center">
          {#each actions as action}
            <button
              class={["btn-action", action.optional && ""]}
              disabled={!action.enabled || pendingChoice}
              onclick={() => onaction(action.type)}
            >
              {#if action.lucideIcon}<Icon
                  icon="lucide:{action.lucideIcon}"
                  class="size-5"
                />{/if}
              {action.label}
            </button>
          {/each}
        </div>
      {:else if snapshot.phase === "crossing"}
        <div class="text-sm font-semibold text-center py-5 px-4">
          Border Crossing Phase is active.<br />
          <span class="text-sm font-normal mt-1 block"
            >Please click "Select Lane" on one of the Security Lanes in the
            Public Center Pool.</span
          >
        </div>
      {/if}
    </div>
  {/if}
</div>
