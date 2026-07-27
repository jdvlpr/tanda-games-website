<script>
  import Icon from "@iconify/svelte";

  let {
    engine,
    snapshot,
    currentPlayer,
    actions,
    isMobile,
    onaction,
    onselectlane,
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

  let isHidden = $state(false);
  let headerRef = $state(null);
  let markerRef = $state(null);
  let lastY = 0;

  function handleScroll() {
    // If we are NOT on mobile, make sure the header is visible and stop here
    if (!isMobile) {
      isHidden = false;
      return;
    }

    if (!markerRef || !headerRef) return;

    const currentY = window.scrollY;

    // Calculate the exact distance from the top of the webpage to the marker
    const absoluteTop = markerRef.getBoundingClientRect().top + currentY;
    const headerHeight = headerRef.offsetHeight;

    // The exact moment the original space is completely above the viewport
    const triggerPoint = absoluteTop + headerHeight;

    if (currentY > lastY) {
      // Scrolling DOWN
      if (currentY > triggerPoint) {
        isHidden = true;
      }
    } else if (currentY < lastY) {
      // Scrolling UP: Hide the header
      isHidden = false;
    }

    // Failsafe: if we scroll back up into the header's original territory
    if (currentY <= absoluteTop) {
      isHidden = false;
    }

    // Update lastY for the next scroll event
    lastY = Math.max(0, currentY);
  }

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

<svelte:window onscroll={handleScroll} />

<div bind:this={markerRef}></div>
<div
  bind:this={headerRef}
  class={[
    "bg-slate-300/90 dark:bg-slate-700/90 text-slate-950 dark:text-slate-50 border border-slate-300 dark:border-slate-700 rounded-md p-2 flex flex-col gap-2 backdrop-blur-md max-lg:shadow-lg transition-transform duration-300 ease-in-out sticky top-0 z-100",
    isHidden ? "-translate-y-full" : "translate-y-0",
  ]}
>
  {#if engine && snapshot}
    <!-- Action Dashboard Panel -->
    <!-- Action States -->
    {#if snapshot.phase === "game_over"}
      <div class="text-center flex flex-col items-center">
        <h3 class="font-bold">Game Over</h3>
        <div class="text-lg font-bold">{snapshot.gameResult?.message}</div>
      </div>
    {:else if computerTurn}
      <span class="text-xs font-bold"
        >{currentPlayer.name} is taking it's turn...</span
      >
    {:else if waitingForPeer}
      <span class="text-xs font-bold"
        >⏳ Waiting for <span class="font-bold"
          >{waitingForName || "another player"}</span
        ></span
      >
    {:else if snapshot.phase === "preparation"}
      <!-- Selection Hint -->
      <div
        class="text-sm min-h-4 flex items-center justify-center text-center gap-2 flex-col"
      >
        {#if currentPlayer.name}
          <span class="text-xs font-bold">{currentPlayer.name}'s Turn</span>
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
          >Please click "Select Lane" on one of the Security Lanes in the Public
          Center Pool.</span
        >
      </div>
    {/if}
  {/if}
</div>
