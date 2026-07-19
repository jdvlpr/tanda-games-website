<script>
  let { logs = [], autoScrollEnabled = true } = $props();

  // Sheet state
  let isOpen = $state(false);
  let logContainer = $state(null);
  let lastSeenLogCount = $state(0);
  let unreadCount = $derived(Math.max(0, logs.length - lastSeenLogCount));

  // Touch/drag state
  let isDragging = $state(false);
  let dragStartY = 0;
  let dragCurrentY = $state(0);
  let sheetEl = $state(null);

  // FAB pulse on new logs
  let fabPulse = $state(false);
  let pulseTimeout = null;

  $effect(() => {
    if (logs.length > lastSeenLogCount && !isOpen) {
      fabPulse = true;
      clearTimeout(pulseTimeout);
      pulseTimeout = setTimeout(() => { fabPulse = false; }, 1500);
    }
  });

  // Auto-scroll when opened or new logs arrive while open
  $effect(() => {
    if (isOpen && autoScrollEnabled && logs && logContainer) {
      setTimeout(() => {
        if (logContainer) {
          logContainer.scrollTop = logContainer.scrollHeight;
        }
      }, 60);
    }
  });

  function openSheet() {
    isOpen = true;
    lastSeenLogCount = logs.length;
    dragCurrentY = 0;
  }

  function closeSheet() {
    isOpen = false;
    dragCurrentY = 0;
    isDragging = false;
  }

  function handleTouchStart(e) {
    const touch = e.touches[0];
    const sheetRect = sheetEl?.getBoundingClientRect();
    if (!sheetRect) return;
    // Only start drag from the handle area (top 48px of sheet)
    const touchYInSheet = touch.clientY - sheetRect.top;
    if (touchYInSheet > 48) return;
    // Prevent the page from scrolling as soon as a drag begins
    e.preventDefault();
    isDragging = true;
    dragStartY = touch.clientY;
    dragCurrentY = 0;
  }

  // Must be registered with { passive: false } so preventDefault() is honoured.
  // Browsers make touch listeners passive by default; passive listeners silently
  // ignore preventDefault(), which causes the page to scroll while dragging.
  function handleTouchMove(e) {
    if (!isDragging) return;
    e.preventDefault(); // stop the page scrolling behind the sheet
    const touch = e.touches[0];
    const delta = touch.clientY - dragStartY;
    dragCurrentY = Math.max(0, delta);
  }

  function handleTouchEnd() {
    if (!isDragging) return;
    isDragging = false;
    if (dragCurrentY > 100) {
      closeSheet();
    } else {
      dragCurrentY = 0;
    }
  }

  // Attach touchmove as non-passive on the sheet element so we can call
  // preventDefault() to suppress scroll while the user drags the sheet down.
  $effect(() => {
    const el = sheetEl;
    if (!el) return;
    el.addEventListener('touchmove', handleTouchMove, { passive: false });
    return () => el.removeEventListener('touchmove', handleTouchMove);
  });
</script>

<!-- Only shown on mobile (< lg). On desktop, log lives in the sidebar. -->
<div class="lg:hidden">
  <!-- FAB Button -->
  <button
    class="fixed bottom-5 right-5 z-[200] w-[52px] h-[52px] rounded-full
           bg-neutral-800 border-2 border-neutral-700 text-neutral-300
           flex items-center justify-center cursor-pointer
           shadow-[0_4px_16px_rgba(0,0,0,0.4)]
           transition-transform duration-200 hover:scale-[1.08] active:scale-95
           {fabPulse && unreadCount > 0 ? 'animate-fab-pulse' : ''}"
    onclick={openSheet}
    aria-label="Open game log"
  >
    <!-- Log / document icon -->
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
         class="w-[22px] h-[22px]">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/>
      <polyline points="10 9 9 9 8 9"/>
    </svg>

    {#if unreadCount > 0}
      <span class="absolute -top-1 -right-1
                   bg-[#55b7b0] text-black text-[10px] font-bold
                   min-w-[18px] h-[18px] rounded-full
                   flex items-center justify-center px-1 leading-none">
        {unreadCount > 99 ? '99+' : unreadCount}
      </span>
    {/if}
  </button>

  <!-- Backdrop -->
  {#if isOpen}
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div
      class="fixed inset-0 z-[250] bg-black/50 animate-fade-in"
      onclick={closeSheet}
    ></div>

    <!-- Bottom Sheet -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div
      bind:this={sheetEl}
      class="fixed bottom-0 left-0 right-0 z-[300]
             h-[60vh] bg-neutral-900 border-t border-neutral-700
             rounded-t-2xl flex flex-col
             {isDragging ? '' : 'transition-transform duration-150 ease-out'}
             will-change-transform animate-slide-up"
      style="transform: translateY({dragCurrentY}px);"
      ontouchstart={handleTouchStart}
      ontouchend={handleTouchEnd}
    >
      <!-- Drag Handle -->
      <div class="flex justify-center pt-2.5 pb-1 cursor-grab touch-none">
        <div class="w-9 h-1 rounded-full bg-neutral-600"></div>
      </div>

      <!-- Header -->
      <div class="flex items-center justify-between px-4 pb-2 border-b border-neutral-800">
        <h3 class="text-[13px] font-semibold uppercase tracking-widest text-neutral-400 m-0">
          Game Log
        </h3>
        <button
          class="bg-transparent border-none text-neutral-500 text-base
                 cursor-pointer px-2 py-1 rounded transition-colors
                 hover:text-neutral-200 hover:bg-neutral-800"
          onclick={closeSheet}
          aria-label="Close log"
        >✕</button>
      </div>

      <!-- Log Content -->
      <div
        bind:this={logContainer}
        class="flex-1 overflow-y-auto overscroll-contain
               px-4 py-3 font-emi-mono text-[11px]
               flex flex-col items-start text-left gap-1
               [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/15 [&::-webkit-scrollbar-thumb]:rounded-sm"
      >
        {#each logs as log}
          <div class="leading-relaxed pb-0.5 {log.type === 'error' ? 'text-red-300' : 'text-neutral-300'}">
            <span class="text-[10px] text-neutral-500">[{log.turn}]</span> {log.msg}
          </div>
        {/each}
        {#if logs.length === 0}
          <div class="text-neutral-600 text-center py-8 italic">No log entries yet.</div>
        {/if}
      </div>
    </div>
  {/if}
</div>

<style>
  /* Custom keyframes can't be expressed as Tailwind utilities */
  @keyframes fab-pulse {
    0%, 100% { box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4); }
    50%       { box-shadow: 0 0 0 10px rgba(85, 183, 176, 0.3), 0 4px 16px rgba(0, 0, 0, 0.4); }
  }
  @keyframes fade-in {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes slide-up {
    from { transform: translateY(100%); }
    to   { transform: translateY(0); }
  }

  :global(.animate-fab-pulse) { animation: fab-pulse 1.5s ease-in-out; }
  :global(.animate-fade-in)   { animation: fade-in 0.2s ease-out; }
  :global(.animate-slide-up)  { animation: slide-up 0.3s cubic-bezier(0.32, 0.72, 0, 1); }
</style>
