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

  // 1. Create a state variable to hold the scroll position
  let scrollY = $state(0);

  // 2. Derive whether it should be hidden (true if within 20px of the top)
  let isHidden = $derived(scrollY <= 130);
</script>

<!-- 3. Bind the window's scrollY to our state variable -->
<svelte:window bind:scrollY />

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

<div
  class={[
    "fixed top-2 right-2 left-2 max-w-lg mx-auto z-[100] flex flex-col gap-2 p-2 rounded-2xl border border-slate-300 bg-slate-300/70 shadow-lg backdrop-blur-md transition-all duration-300 ease-in-out dark:border-slate-700 dark:bg-slate-700/70 text-slate-950 dark:text-slate-50",
    isHidden && "opacity-0 pointer-events-none",
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
        class="text-sm min-h-4 flex flex-wrap items-center justify-center text-center gap-2"
      >
        {#if currentPlayer.name}
          <span class="text-xs font-bold">{currentPlayer.name}'s Turn</span>
          <span
            class="flex gap-1 items-center text-green-700 dark:text-green-300 w-fit px-2 py-1 bg-green-200 dark:bg-green-800 rounded-2xl"
            title="Current amount of Money"
          >
            <strong class="font-bold text-md">${currentPlayer.money}</strong>
            <span class="text-xs">Money</span>
          </span>
          <span
            class="flex gap-1 items-center text-pink-700 dark:text-pink-300 px-2 py-1 bg-pink-200 dark:bg-pink-800 rounded-2xl"
            title="Access Fee"
          >
            <span class="font-bold text-md">${currentPlayer.accessFee}</span>
            <span class="text-xs">Access Fee</span>
          </span>
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
  <ToastContainer />
</div>
