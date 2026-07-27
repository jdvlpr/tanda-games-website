<script>
  import { fly, fade } from "svelte/transition";
  import { cubicOut } from "svelte/easing";
  import QuickStartStep from "./QuickStartStep.svelte";

  // ── Types ─────────────────────────────────────────────────────────────────
  /**
   * @typedef {'objective'|'layout'|'access-fee'|'actions'|'tickets'|'checkpoint'} UIGraphicType
   *
   * @typedef {Object} QuickStartStepData
   * @property {number} id
   * @property {string} title
   * @property {string} [badge]
   * @property {string[]} bullets
   * @property {string} [callout]
   * @property {UIGraphicType} uiGraphicType
   * @property {string} uiSuggestionText
   */

  // ── Step Data ──────────────────────────────────────────────────────────────
  /** @type {QuickStartStepData[]} */
  const QUICK_START_STEPS = [
    {
      id: 1,
      title: "The Goal",
      badge: "Step 1 of 6",
      bullets: [
        "Collect Money, Documents, Connections, a Ticket, and a Passport before reaching Border Control.",
        "Reach Phase 2 with both travel papers and enough Assurance points to pass Security.",
        "The player who successfully crosses with the highest remaining Assurance wins!",
      ],
      uiGraphicType: "objective",
      uiSuggestionText:
        "Highlight player area: Destination Card, Stash items, and empty Ticket/Passport slots.",
    },
    {
      id: 2,
      title: "Unlocking Cards (The Layout)",
      badge: "Step 2 of 6",
      bullets: [
        "Your grid has 14 cards stacked in 4 overlapping rows.",
        "You can only interact with AVAILABLE cards — face-up and completely uncovered (starting with Row 4).",
        "Removing a card flips any fully uncovered cards face-up, making them available.",
      ],
      uiGraphicType: "layout",
      uiSuggestionText:
        "14-card pyramid grid: Row 4 glows green ('Available'), upper cards dimmed with lock icons.",
    },
    {
      id: 3,
      title: "Paying Access Fees",
      badge: "Step 3 of 6",
      bullets: [
        "Your Layout: Taking available cards costs $0 fee.",
        "Opponent's Layout: Requires paying them an Access Fee + card cost.",
        "Every time you pay an opponent's fee, your own Access Fee ticks up by $1 (max $5).",
      ],
      uiGraphicType: "access-fee",
      uiSuggestionText:
        "Arrow from Player A to Player B grid: Card Cost ($3) + Access Fee ($1). Fee meter ticks from $1 to $2.",
    },
    {
      id: 4,
      title: "Your Turn (Required Actions)",
      badge: "Step 4 of 6",
      bullets: [
        "On every turn, perform exactly ONE required action:",
        "⚡ Activate: Trigger an available Payday (payout) or Life Card (events).",
        "🛒 Buy: Purchase an available Document, Connection, Ticket, or Passport.",
        "🗑️ Discard: Trash an available Document/Connection for $2 from the bank.",
      ],
      uiGraphicType: "actions",
      uiSuggestionText:
        "3-button modal preview: 'Activate', 'Buy', 'Discard' with quick tooltips.",
    },
    {
      id: 5,
      title: "Tickets & Passports",
      badge: "Step 5 of 6",
      bullets: [
        "Ticket ($2): Requires at least 1 Connection in Stash.",
        "Passport ($2): Requires at least 1 Document in Stash.",
        "Instant Bonus: Holding both a Ticket & Passport instantly grants +1 Assurance!",
      ],
      uiGraphicType: "tickets",
      uiSuggestionText:
        "Connection line linking Stash items to unlocked 'Buy Ticket' button + glowing +1 Assurance badge.",
    },
    {
      id: 6,
      title: "Crossing the Border (Endgame)",
      badge: "Step 6 of 6",
      bullets: [
        "1. Trade Sets: Match Destination criteria with resources for extra Assurance.",
        "2. Pick a Security Lane: Choose 1 of 5 lanes & reveal top token.",
        "3. The Checkpoint: If your Assurance >= Token Value (and you have Ticket + Passport), you cross!",
      ],
      uiGraphicType: "checkpoint",
      uiSuggestionText:
        "5 Security Lanes with face-down tokens vs. Preview calculation box: Your Assurance (8) vs Lane (?)",
    },
  ];

  // ── Props ──────────────────────────────────────────────────────────────────
  /** @type {{ onClose?: () => void }} */
  let { onClose } = $props();

  // ── State ──────────────────────────────────────────────────────────────────
  let isOpen = $state(false);
  let currentStep = $state(0);
  let slideDir = $state(1); // 1 = forward, -1 = backward

  // Touch swipe state
  let touchStartX = 0;
  let touchStartY = 0;

  // ── Derived ───────────────────────────────────────────────────────────────
  let isFirstStep = $derived(currentStep === 0);
  let isLastStep = $derived(currentStep === QUICK_START_STEPS.length - 1);
  let progressPercentage = $derived(
    Math.round(((currentStep + 1) / QUICK_START_STEPS.length) * 100),
  );
  let step = $derived(QUICK_START_STEPS[currentStep]);

  // ── Navigation ────────────────────────────────────────────────────────────
  function goNext() {
    if (isLastStep) return;
    slideDir = 1;
    currentStep++;
  }

  function goPrev() {
    if (isFirstStep) return;
    slideDir = -1;
    currentStep--;
  }

  function goToStep(idx) {
    slideDir = idx > currentStep ? 1 : -1;
    currentStep = idx;
  }

  function close() {
    isOpen = false;
    onClose?.();
  }

  // ── Keyboard navigation ───────────────────────────────────────────────────
  function handleKeydown(e) {
    if (!isOpen) return;
    if (e.key === "ArrowRight") goNext();
    else if (e.key === "ArrowLeft") goPrev();
    else if (e.key === "Escape") close();
  }

  // ── Touch swipe ───────────────────────────────────────────────────────────
  function handleTouchStart(e) {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  }

  function handleTouchEnd(e) {
    const dx = e.changedTouches[0].clientX - touchStartX;
    const dy = e.changedTouches[0].clientY - touchStartY;
    // Only act if mostly horizontal
    if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy)) return;
    if (dx < 0) goNext();
    else goPrev();
  }
</script>

<svelte:window onkeydown={handleKeydown} />

<!-- ── Trigger FAB ──────────────────────────────────────────────────────────── -->
<button
  class="fixed bottom-3 right-3 z-150 size-10 rounded-full
         bg-amber-500 dark:bg-amber-600 border-2 border-amber-400 dark:border-amber-500 text-slate-900
         flex items-center justify-center cursor-pointer
         shadow-[0_4px_16px_rgba(0,0,0,0.35)]
         transition-all duration-200 hover:scale-[1.08] active:scale-95 fab-glow"
  onclick={() => {
    isOpen = true;
    currentStep = 0;
  }}
  aria-label="Open Quick Start Guide"
  title="Quick Start Guide"
>
  <!-- Book / guide icon -->
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="w-[20px] h-[20px]"
  >
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    <line x1="8" y1="7" x2="16" y2="7" />
    <line x1="8" y1="11" x2="16" y2="11" />
    <line x1="8" y1="15" x2="12" y2="15" />
  </svg>
</button>

<!-- ── Modal Overlay ───────────────────────────────────────────────────────── -->
{#if isOpen}
  <!-- Backdrop -->
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    class="fixed inset-0 z-[400] bg-black/60 backdrop-blur-sm"
    onclick={close}
    transition:fade={{ duration: 200 }}
  ></div>

  <!-- Dialog card -->
  <div
    class="fixed inset-x-0 bottom-0 sm:inset-0 sm:flex sm:items-center sm:justify-center z-[450] pointer-events-none"
    transition:fly={{ y: 40, duration: 300, easing: cubicOut }}
  >
    <div
      class="pointer-events-auto w-full sm:max-w-[420px] sm:mx-4
             bg-neutral-50 dark:bg-neutral-900
             border border-neutral-200 dark:border-neutral-700
             rounded-t-3xl sm:rounded-3xl
             shadow-2xl flex flex-col"
      style="max-height: min(680px, 96dvh);"
      ontouchstart={handleTouchStart}
      ontouchend={handleTouchEnd}
    >
      <!-- Drag handle (mobile only) -->
      <div class="flex justify-center pt-3 pb-1 sm:hidden">
        <div
          class="w-9 h-1 rounded-full bg-neutral-300 dark:bg-neutral-600"
        ></div>
      </div>

      <!-- ── Header ───────────────────────────────────────────────────────── -->
      <div
        class="flex items-center justify-between px-5 pt-3 pb-2 sm:pt-5 border-b border-neutral-200 dark:border-neutral-800"
      >
        <div class="flex flex-col gap-0.5">
          <p
            class="text-[10px] uppercase tracking-widest font-bold text-amber-500 dark:text-amber-400"
          >
            {step.badge ?? `Step ${step.id} of ${QUICK_START_STEPS.length}`}
          </p>
          <h2
            class="text-lg font-black text-slate-900 dark:text-slate-50 leading-tight m-0"
          >
            {step.title}
          </h2>
        </div>
        <button
          class="ml-2 size-8 flex items-center justify-center rounded-xl
                 text-neutral-500 dark:text-neutral-400
                 hover:bg-neutral-200 dark:hover:bg-neutral-800
                 hover:text-slate-900 dark:hover:text-slate-100
                 transition-colors cursor-pointer border-0 bg-transparent shrink-0"
          onclick={close}
          aria-label="Close guide"
        >
          <svg
            class="size-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
          >
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- ── Progress bar ──────────────────────────────────────────────────── -->
      <div class="px-5 py-2 flex items-center gap-2">
        <div
          class="flex-1 h-1.5 rounded-full bg-neutral-200 dark:bg-neutral-700 overflow-hidden"
        >
          <div
            class="h-full rounded-full bg-amber-400 dark:bg-amber-500 transition-all duration-400 ease-out"
            style="width: {progressPercentage}%"
          ></div>
        </div>
        <span
          class="text-[10px] font-bold text-neutral-400 dark:text-neutral-500 tabular-nums shrink-0"
        >
          {currentStep + 1}/{QUICK_START_STEPS.length}
        </span>
      </div>

      <!-- ── Step Content (animated) ────────────────────────────────────────── -->
      <div
        class="flex-1 overflow-y-auto overscroll-contain px-5 py-2
                  [&::-webkit-scrollbar]:w-1
                  [&::-webkit-scrollbar-track]:bg-transparent
                  [&::-webkit-scrollbar-thumb]:bg-neutral-300
                  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-600
                  [&::-webkit-scrollbar-thumb]:rounded-full"
      >
        {#key currentStep}
          <div
            in:fly={{
              x: slideDir * 40,
              duration: 250,
              easing: cubicOut,
              delay: 50,
            }}
            out:fly={{ x: slideDir * -40, duration: 200, easing: cubicOut }}
          >
            <QuickStartStep {step} />
          </div>
        {/key}
      </div>

      <!-- ── Step Dots ──────────────────────────────────────────────────────── -->
      <div class="flex items-center justify-center gap-1.5 pt-2 pb-1">
        {#each QUICK_START_STEPS as s, i}
          <button
            class="rounded-full transition-all duration-200 cursor-pointer border-0
                   {currentStep === i
              ? 'w-5 h-2 bg-amber-400 dark:bg-amber-500'
              : 'size-2 bg-neutral-300 dark:bg-neutral-600 hover:bg-neutral-400 dark:hover:bg-neutral-500'}"
            onclick={() => goToStep(i)}
            aria-label="Go to step {i + 1}"
          ></button>
        {/each}
      </div>

      <!-- ── Navigation Bar ──────────────────────────────────────────────────── -->
      <div
        class="flex gap-2 px-5 py-4 border-t border-neutral-200 dark:border-neutral-800"
      >
        <button
          class="btn-sm flex-1 flex items-center justify-center gap-1
                 text-slate-700 dark:text-slate-300
                 disabled:opacity-40 disabled:cursor-not-allowed"
          disabled={isFirstStep}
          onclick={goPrev}
        >
          <svg
            class="size-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"><path d="M15 18l-6-6 6-6" /></svg
          >
          Back
        </button>

        {#if isLastStep}
          <button
            class="btn-action flex-[2] text-sm font-bold py-2 px-4"
            onclick={close}
          >
            <svg
              class="size-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"><path d="M20 6 9 17l-5-5" /></svg
            >
            Let's Play!
          </button>
        {:else}
          <button
            class="btn-action flex-[2] text-sm font-bold py-2 px-4"
            onclick={goNext}
          >
            Next
            <svg
              class="size-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"><path d="M9 18l6-6-6-6" /></svg
            >
          </button>
        {/if}
      </div>
    </div>
  </div>
{/if}

<style>
  .fab-glow {
    box-shadow:
      0 4px 16px rgba(0, 0, 0, 0.35),
      0 0 0 0 rgba(251, 191, 36, 0);
    animation: fab-amber-pulse 3s ease-in-out infinite;
  }

  @keyframes fab-amber-pulse {
    0%,
    100% {
      box-shadow:
        0 4px 16px rgba(0, 0, 0, 0.35),
        0 0 0 0 rgba(251, 191, 36, 0);
    }
    50% {
      box-shadow:
        0 4px 16px rgba(0, 0, 0, 0.35),
        0 0 0 7px rgba(251, 191, 36, 0.25);
    }
  }
</style>
