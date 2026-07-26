<script>
  import { fly } from "svelte/transition";

  let {
    anchorRect = null,
    actions = [],
    description = "",
    onaction,
    onclose,
  } = $props();

  let popoverEl = $state(null);

  // ── Positioning ───────────────────────────────────────────────────────────
  const POPOVER_W = 192; // ~w-48
  const GAP = 8;

  let position = $derived.by(() => {
    if (!anchorRect) return { top: 0, left: 0, below: true };

    const spaceBelow = window.innerHeight - anchorRect.bottom;
    const below = spaceBelow >= 140 || anchorRect.top < 140;

    // Centre horizontally on the card, clamped to viewport
    let left = anchorRect.left + anchorRect.width / 2;
    left = Math.max(
      POPOVER_W / 2 + GAP,
      Math.min(window.innerWidth - POPOVER_W / 2 - GAP, left),
    );

    const top = below ? anchorRect.bottom + GAP : anchorRect.top - GAP;

    return { top, left, below };
  });

  let posStyle = $derived(
    `top:${position.top}px;left:${position.left}px;transform:${position.below ? "translateX(-50%)" : "translate(-50%,-100%)"};`,
  );

  // ── Global listeners: Escape, window resize/scroll, outside-click/touch ───────
  $effect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onclose?.();
    };

    // Capture initial scroll position when the effect runs (popover opens)
    const SCROLL_THRESHOLD = 10;
    const initialScrollY = window.scrollY;
    const initialScrollX = window.scrollX;

    // Scroll handler with pixel threshold
    const onWindowScroll = (e) => {
      if (
        e.target === window ||
        e.target === document ||
        e.target === document.body
      ) {
        const deltaY = Math.abs(window.scrollY - initialScrollY);
        const deltaX = Math.abs(window.scrollX - initialScrollX);

        if (deltaY > SCROLL_THRESHOLD || deltaX > SCROLL_THRESHOLD) {
          onclose?.();
        }
      }
    };

    // Dedicated resize handler (closes immediately without threshold)
    const onWindowResize = () => {
      onclose?.();
    };

    window.addEventListener("keydown", onKey);
    window.addEventListener("scroll", onWindowScroll, { passive: true });
    window.addEventListener("resize", onWindowResize, { passive: true });

    // Defer outside-click/touch handler so the opening tap doesn't immediately close it.
    let outsideHandler = null;
    const t = setTimeout(() => {
      outsideHandler = (e) => {
        if (!popoverEl || popoverEl.contains(e.target)) return;
        // Let card / stash-item clicks through — they update selection themselves
        if (
          e.target.closest?.(".grid-card") ||
          e.target.closest?.(".stash-item")
        )
          return;
        onclose?.();
      };
      window.addEventListener("pointerdown", outsideHandler);
      window.addEventListener("click", outsideHandler);
    }, 50);

    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", onWindowScroll);
      window.removeEventListener("resize", onWindowResize);
      if (outsideHandler) {
        window.removeEventListener("pointerdown", outsideHandler);
        window.removeEventListener("click", outsideHandler);
      }
    };
  });
</script>

{#if anchorRect}
  <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
  <div
    bind:this={popoverEl}
    role="dialog"
    aria-label="Card actions"
    style="position:fixed;{posStyle}z-index:200;width:{POPOVER_W}px;"
    transition:fly={{ y: position.below ? -6 : 6, duration: 150, opacity: 0 }}
    class="rounded-md shadow-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-black"
  >
    <!-- Arrow pointing toward the card -->
    {#if position.below}
      <div
        class="absolute -top-1.5 left-1/2 -translate-x-1/2 size-3 bg-neutral-900 dark:bg-neutral-100 rotate-45 border-l border-t border-neutral-200 dark:border-neutral-800 z-10"
      ></div>
    {:else}
      <div
        class="absolute -bottom-1.5 left-1/2 -translate-x-1/2 size-3 bg-neutral-900 dark:bg-neutral-100 rotate-45 border-r border-b border-neutral-200 dark:border-neutral-800 z-10"
      ></div>
    {/if}

    <!-- Life card description (only shown when provided) -->
    {#if description}
      <div class="px-3 pt-2.5 text-xs leading-snug">
        {description}
      </div>
    {/if}

    <!-- Action buttons -->
    <div class="p-2 flex flex-wrap gap-1.5">
      {#each actions as action}
        {#if action.enabled}
          <button
            class="btn-sm whitespace-nowrap flex-1 bg-white dark:bg-black text-black dark:text-white"
            onclick={() => onaction?.(action.type)}
          >
            {action.label}
          </button>
        {/if}
      {:else}
        <p class="text-xs text-neutral-500 px-1 py-0.5 w-full text-center">
          No actions available
        </p>
      {/each}
    </div>
  </div>
{/if}
