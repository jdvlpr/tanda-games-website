<script>
  import { fly } from 'svelte/transition';

  let {
    anchorRect = null,
    actions = [],
    description = '',
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
    left = Math.max(POPOVER_W / 2 + GAP, Math.min(window.innerWidth - POPOVER_W / 2 - GAP, left));

    const top = below ? anchorRect.bottom + GAP : anchorRect.top - GAP;

    return { top, left, below };
  });

  let posStyle = $derived(
    `top:${position.top}px;left:${position.left}px;transform:${position.below ? 'translateX(-50%)' : 'translate(-50%,-100%)'};`
  );

  // ── Global listeners: Escape, scroll-away, outside-click ──────────────────
  $effect(() => {
    const onKey    = (e) => { if (e.key === 'Escape') onclose?.(); };
    const onScroll = ()  => onclose?.();

    window.addEventListener('keydown', onKey);
    window.addEventListener('scroll', onScroll, true);

    // Defer outside-click so the opening click doesn't immediately close it.
    // Crucially: if the click lands on another selectable card (.grid-card or
    // .stash-item), DON'T close — the card's own onclick has already updated
    // the selection and we want the popover to snap to the new card instead.
    let outsideHandler = null;
    const t = setTimeout(() => {
      outsideHandler = (e) => {
        if (!popoverEl || popoverEl.contains(e.target)) return;
        // Let card / stash-item clicks through — they update the selection themselves
        if (e.target.closest?.('.grid-card') || e.target.closest?.('.stash-item')) return;
        onclose?.();
      };
      window.addEventListener('click', outsideHandler);
    }, 0);

    return () => {
      clearTimeout(t);
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('scroll', onScroll, true);
      if (outsideHandler) window.removeEventListener('click', outsideHandler);
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
    class="rounded-xl shadow-2xl border border-white/10 bg-neutral-800 text-white overflow-hidden"
  >

    <!-- Arrow pointing toward the card -->
    {#if position.below}
      <div class="absolute -top-1.5 left-1/2 -translate-x-1/2 size-3 bg-neutral-800 rotate-45 border-l border-t border-white/10 z-10"></div>
    {:else}
      <div class="absolute -bottom-1.5 left-1/2 -translate-x-1/2 size-3 bg-neutral-800 rotate-45 border-r border-b border-white/10 z-10"></div>
    {/if}

    <!-- Life card description (only shown when provided) -->
    {#if description}
      <div class="px-3 pt-2.5 pb-2 border-b border-white/10 text-[11px] text-neutral-300 leading-snug">
        {description}
      </div>
    {/if}

    <!-- Action buttons -->
    <div class="p-2 flex flex-wrap gap-1.5">
      {#each actions as action}
        {#if action.enabled}
          <button
            class="flex-1 text-xs font-semibold px-2 py-1.5 rounded-md bg-neutral-700 hover:bg-teal-700 transition-colors whitespace-nowrap cursor-pointer"
            onclick={() => onaction?.(action.type)}
          >
            {action.label}
          </button>
        {/if}
      {:else}
        <p class="text-xs text-neutral-500 px-1 py-0.5 w-full text-center">No actions available</p>
      {/each}
    </div>
  </div>
{/if}
