<script>
  import Icon from "@iconify/svelte";
  import ToastContainer from "../ToastContainer.svelte";

  let {
    engine,
    snapshot,
    currentPlayer,
    actions,
    onaction,
    pendingChoice,
    computerTurn = false,
    waitingForPeer = false,
    waitingForName = "",
  } = $props();
</script>

{#snippet content()}
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
        >{currentPlayer.name} is taking their turn...</span
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
{/snippet}

<div class="sticky top-0 z-[100]">
  <!-- Ghost content to determine the height of the parent element when not stuck to the top of the page-->
  <div class="invisible flex flex-col gap-2 p-2 border border-transparent">
    <!-- Just the initial static content goes here -->
    {@render content()}
  </div>
  <div
    class="absolute top-0 left-0 right-0 flex flex-col gap-2 p-2 rounded-2xl border border-slate-300 bg-slate-300/70 shadow-lg backdrop-blur-md transition-transform duration-300 ease-in-out dark:border-slate-700 dark:bg-slate-700/70 text-slate-950 dark:text-slate-50"
  >
    {@render content()}
    <ToastContainer />
  </div>
</div>

<div class="flex flex-wrap gap-2 items-center justify-center mt-2">
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
