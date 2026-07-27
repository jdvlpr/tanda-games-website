<script>
  /** @type {{ step: import('./QuickStartGuide.svelte').QuickStartStepData }} */
  let { step } = $props();
</script>

<!-- Step content card -->
<div class="flex flex-col gap-3 h-full">
  <!-- Bullets -->
  <ul class="flex flex-col gap-1.5 text-sm text-slate-700 dark:text-slate-300 pl-1">
    {#each step.bullets as bullet}
      <li class="flex gap-2 items-start leading-snug">
        <span class="mt-0.5 shrink-0 size-4 rounded-full bg-amber-400 dark:bg-amber-600 flex items-center justify-center">
          <svg class="size-2.5 text-slate-900" viewBox="0 0 10 10" fill="currentColor">
            <path d="M8.5 2.5 4 7 1.5 4.5" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </span>
        <span>{bullet}</span>
      </li>
    {/each}
  </ul>

  <!-- Animated UI Graphic Mockup -->
  <div class="mt-auto rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800/60 overflow-hidden min-h-[100px] flex items-center justify-center p-2">
    {#if step.uiGraphicType === 'objective'}
      <!-- Objective: Player area with slots -->
      <div class="w-full flex flex-col gap-1.5 items-center">
        <p class="text-[10px] uppercase tracking-widest text-slate-400 dark:text-slate-500 font-semibold">Your Area</p>
        <div class="flex gap-2 items-center justify-center w-full flex-wrap">
          <!-- Destination card -->
          <div class="flex flex-col items-center gap-0.5">
            <div class="w-12 h-16 rounded-lg bg-gradient-to-b from-amber-300 to-amber-500 dark:from-amber-600 dark:to-amber-800 border border-amber-400 dark:border-amber-700 shadow-sm flex flex-col items-center justify-center gap-0.5 text-amber-900 dark:text-amber-100">
              <svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>
              <span class="text-[8px] font-bold leading-tight text-center">Dest.</span>
            </div>
            <span class="text-[9px] text-slate-500 dark:text-slate-400">Card</span>
          </div>
          <!-- Stash items -->
          <div class="flex flex-col items-center gap-0.5">
            <div class="flex gap-1">
              {#each [{ color: 'bg-[#e3a780]', label: 'Doc' }, { color: 'bg-[#d990b4]', label: 'Con' }] as item}
                <div class="w-10 h-12 rounded-md {item.color} border border-white/30 shadow-sm flex items-end justify-center pb-1">
                  <span class="text-[7px] font-semibold text-slate-900">{item.label}</span>
                </div>
              {/each}
            </div>
            <span class="text-[9px] text-slate-500 dark:text-slate-400">Stash</span>
          </div>
          <!-- Empty ticket/passport slots -->
          <div class="flex flex-col items-center gap-0.5">
            <div class="flex gap-1">
              {#each ['Tkt', 'Ppt'] as label}
                <div class="w-10 h-12 rounded-md border-2 border-dashed border-slate-400 dark:border-slate-600 flex items-center justify-center">
                  <span class="text-[7px] text-slate-400 dark:text-slate-500 font-semibold">{label}</span>
                </div>
              {/each}
            </div>
            <span class="text-[9px] text-slate-500 dark:text-slate-400">Empty Slots</span>
          </div>
        </div>
        <!-- Assurance meter -->
        <div class="flex items-center gap-2 mt-1">
          <span class="text-[9px] text-slate-500 dark:text-slate-400 uppercase tracking-wide">Assurance</span>
          <div class="flex gap-0.5">
            {#each Array(5) as _, i}
              <div class="size-3 rounded-full {i < 2 ? 'bg-amber-400 dark:bg-amber-500' : 'bg-slate-300 dark:bg-slate-600'}"></div>
            {/each}
          </div>
        </div>
      </div>

    {:else if step.uiGraphicType === 'layout'}
      <!-- Layout: 4-row pyramid grid -->
      <div class="flex flex-col items-center gap-1 py-1">
        <p class="text-[10px] uppercase tracking-widest text-slate-400 dark:text-slate-500 font-semibold mb-1">Your Layout Grid</p>
        {#each [[0], [1,2], [3,4,5], [6,7,8,9]] as row, rowIdx}
          <div class="flex gap-1.5 justify-center">
            {#each row as cardIdx}
              {@const isAvailable = rowIdx === 3}
              {@const isRow2 = rowIdx === 2}
              <div class="relative w-9 h-12 rounded-md border shadow-sm flex items-center justify-center transition-all
                {isAvailable
                  ? 'bg-neutral-100 dark:bg-neutral-700 border-emerald-400 dark:border-emerald-500 glow-available'
                  : isRow2
                  ? 'bg-neutral-300 dark:bg-neutral-600 border-neutral-400 dark:border-neutral-500 opacity-70'
                  : 'bg-neutral-400 dark:bg-neutral-500 border-neutral-400 dark:border-neutral-600 opacity-40'}">
                {#if isAvailable}
                  <span class="text-[8px] font-bold text-emerald-600 dark:text-emerald-400">✓</span>
                {:else}
                  <svg class="size-3 text-neutral-500 dark:text-neutral-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 1a5 5 0 0 0-5 5v3H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V11a2 2 0 0 0-2-2h-2V6a5 5 0 0 0-5-5zm0 2a3 3 0 0 1 3 3v3H9V6a3 3 0 0 1 3-3z"/>
                  </svg>
                {/if}
              </div>
            {/each}
          </div>
        {/each}
        <div class="flex gap-3 mt-1.5">
          <span class="flex items-center gap-1 text-[9px] text-emerald-600 dark:text-emerald-400 font-semibold">
            <div class="size-2.5 rounded-sm border border-emerald-500 bg-emerald-200 dark:bg-emerald-800"></div> Available
          </span>
          <span class="flex items-center gap-1 text-[9px] text-slate-500 dark:text-slate-400">
            <div class="size-2.5 rounded-sm bg-neutral-400 dark:bg-neutral-500 opacity-60"></div> Locked
          </span>
        </div>
      </div>

    {:else if step.uiGraphicType === 'access-fee'}
      <!-- Access Fee: arrow from player A to player B grid, fee ticker -->
      <div class="w-full flex items-center justify-center gap-2 py-1">
        <!-- Player A -->
        <div class="flex flex-col items-center gap-1">
          <div class="w-14 h-[60px] rounded-xl bg-slate-200 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 flex flex-col items-center justify-center gap-0.5 text-xs font-bold text-slate-600 dark:text-slate-300 shadow-sm">
            <span class="text-[9px] text-slate-400 dark:text-slate-500">Your Grid</span>
            <span class="text-emerald-600 dark:text-emerald-400 text-[10px] font-bold">FREE</span>
          </div>
          <span class="text-[9px] text-slate-500 dark:text-slate-400 font-medium">You</span>
        </div>

        <!-- Arrow + fee box -->
        <div class="flex flex-col items-center gap-1">
          <div class="text-[9px] text-slate-500 dark:text-slate-400 font-semibold bg-red-100 dark:bg-red-900/40 border border-red-200 dark:border-red-800 rounded-md px-1.5 py-0.5">
            Access Fee <span class="fee-ticker text-red-600 dark:text-red-400 font-bold">$1→$2</span>
          </div>
          <div class="flex items-center gap-0.5">
            <div class="h-px w-6 bg-amber-400 dark:bg-amber-500"></div>
            <svg class="size-3 text-amber-500" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5l8 7-8 7"/></svg>
          </div>
          <div class="text-[9px] text-slate-500 dark:text-slate-400 text-center">Card $3 +<br/>Fee $1 = <span class="font-bold text-slate-700 dark:text-slate-200">$4</span></div>
        </div>

        <!-- Player B -->
        <div class="flex flex-col items-center gap-1">
          <div class="w-14 h-[60px] rounded-xl bg-slate-200 dark:bg-slate-700 border border-amber-400 dark:border-amber-500 flex flex-col items-center justify-center gap-0.5 text-xs font-bold shadow-sm">
            <span class="text-[9px] text-slate-400 dark:text-slate-500">Opponent</span>
            <div class="flex gap-0.5">
              {#each Array(3) as _, i}
                <div class="w-2.5 h-4 rounded-sm bg-neutral-300 dark:bg-neutral-600 border border-neutral-400 dark:border-neutral-500"></div>
              {/each}
            </div>
          </div>
          <span class="text-[9px] text-slate-500 dark:text-slate-400 font-medium">Opponent</span>
        </div>
      </div>

    {:else if step.uiGraphicType === 'actions'}
      <!-- Actions: 3 action buttons mockup -->
      <div class="w-full flex flex-col items-center gap-2 py-1">
        <p class="text-[10px] uppercase tracking-widest text-slate-400 dark:text-slate-500 font-semibold">Your Actions This Turn</p>
        <div class="flex gap-1.5 flex-wrap justify-center w-full">
          {#each [
            { icon: '⚡', label: 'Activate', hint: 'Trigger Payday / Life', color: 'bg-amber-200 dark:bg-amber-800 border-amber-400 dark:border-amber-600' },
            { icon: '🛒', label: 'Buy', hint: 'Document / Connection...', color: 'bg-[#92b0d8]/30 dark:bg-[#92b0d8]/20 border-[#92b0d8] dark:border-[#92b0d8]/60' },
            { icon: '🗑️', label: 'Discard', hint: 'Trash for $2', color: 'bg-slate-200 dark:bg-slate-700 border-slate-400 dark:border-slate-500' },
          ] as action}
            <div class="flex flex-col items-center gap-0.5">
              <button class="action-btn-demo flex flex-col items-center justify-center gap-0.5 px-3 py-1.5 rounded-xl border font-bold text-slate-800 dark:text-slate-100 text-[11px] shadow-sm cursor-default {action.color}" style="min-width:64px;">
                <span class="text-base leading-none">{action.icon}</span>
                <span>{action.label}</span>
              </button>
              <span class="text-[8px] text-slate-400 dark:text-slate-500 text-center max-w-[70px] leading-tight">{action.hint}</span>
            </div>
          {/each}
        </div>
        <p class="text-[9px] text-slate-400 dark:text-slate-500 italic">Pick exactly ONE per turn</p>
      </div>

    {:else if step.uiGraphicType === 'tickets'}
      <!-- Tickets & Passports: connection line + unlock + assurance badge -->
      <div class="w-full flex flex-col items-center gap-2 py-1">
        <div class="flex items-center gap-2 w-full justify-center flex-wrap">
          <!-- Stash with Connection -->
          <div class="flex flex-col items-center gap-0.5">
            <div class="w-10 h-13 rounded-md bg-[#d990b4]/80 border border-[#d990b4] shadow-sm flex flex-col items-center justify-center gap-0.5 text-slate-800">
              <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              <span class="text-[7px] font-bold">Conn.</span>
            </div>
            <span class="text-[8px] text-slate-500 dark:text-slate-400">In Stash</span>
          </div>

          <!-- Arrow -->
          <div class="flex items-center gap-0.5">
            <div class="h-px w-5 bg-emerald-400 dark:bg-emerald-500"></div>
            <svg class="size-3 text-emerald-500" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5l8 7-8 7"/></svg>
          </div>

          <!-- Unlocked Ticket -->
          <div class="flex flex-col items-center gap-0.5">
            <div class="w-12 h-13 rounded-md bg-[#92b0d8]/60 border border-[#92b0d8] shadow-md flex flex-col items-center justify-center gap-0.5 text-slate-800 dark:text-slate-100">
              <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9v-2a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2a2 2 0 0 1 0 4v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 1 0-4z"/></svg>
              <span class="text-[7px] font-bold">Ticket $2</span>
            </div>
            <span class="text-[8px] text-emerald-600 dark:text-emerald-400 font-semibold">Unlocked!</span>
          </div>

          <!-- + Assurance badge -->
          <div class="flex flex-col items-center gap-0.5">
            <div class="size-10 rounded-full bg-amber-400 dark:bg-amber-500 border-2 border-amber-300 dark:border-amber-400 flex items-center justify-center shadow-md assurance-glow">
              <span class="text-xs font-black text-slate-900">+1</span>
            </div>
            <span class="text-[8px] text-amber-600 dark:text-amber-400 font-semibold">Assurance!</span>
          </div>
        </div>
        <p class="text-[9px] text-slate-400 dark:text-slate-500 italic text-center">Hold both Ticket + Passport → +1 Assurance</p>
      </div>

    {:else if step.uiGraphicType === 'checkpoint'}
      <!-- Checkpoint: 5 lanes + vs box -->
      <div class="w-full flex flex-col items-center gap-2 py-1">
        <p class="text-[10px] uppercase tracking-widest text-slate-400 dark:text-slate-500 font-semibold">Security Lanes</p>
        <div class="flex gap-1.5 items-end justify-center">
          {#each Array(5) as _, i}
            {@const isSelected = i === 2}
            <div class="flex flex-col items-center gap-0.5">
              <div class="w-9 h-12 rounded-lg border-2 flex flex-col items-center justify-center gap-0.5 shadow-sm transition-all
                {isSelected
                  ? 'border-amber-400 dark:border-amber-500 bg-amber-100 dark:bg-amber-900/50 scale-110'
                  : 'border-slate-300 dark:border-slate-600 bg-slate-200 dark:bg-slate-700'}">
                {#if isSelected}
                  <span class="text-[8px] font-black text-amber-700 dark:text-amber-300">?</span>
                  <svg class="size-3 text-amber-600 dark:text-amber-400" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 12c5.33 0 8 2.67 8 4v2H4v-2c0-1.33 2.67-4 8-4z"/></svg>
                {:else}
                  <div class="size-4 rounded-sm bg-slate-400 dark:bg-slate-500 flex items-center justify-center">
                    <svg class="size-2.5 text-slate-200 dark:text-slate-300" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1a5 5 0 0 0-5 5v3H5a2 2 0 0 0-2 2v10h14V11a2 2 0 0 0-2-2h-2V6a5 5 0 0 0-5-5z"/></svg>
                  </div>
                {/if}
              </div>
              <span class="text-[7px] text-slate-400 dark:text-slate-500">{i === 2 ? '← Pick' : `L${i+1}`}</span>
            </div>
          {/each}
        </div>
        <!-- Vs box -->
        <div class="flex items-center gap-2 bg-slate-200 dark:bg-slate-700 rounded-xl px-3 py-1.5 border border-slate-300 dark:border-slate-600">
          <div class="text-center">
            <div class="text-[9px] text-slate-500 dark:text-slate-400">Your Assurance</div>
            <div class="text-lg font-black text-amber-500 dark:text-amber-400 leading-none">8</div>
          </div>
          <div class="text-slate-400 dark:text-slate-500 font-bold text-sm">vs</div>
          <div class="text-center">
            <div class="text-[9px] text-slate-500 dark:text-slate-400">Lane Token</div>
            <div class="text-lg font-black text-slate-400 dark:text-slate-500 leading-none">?</div>
          </div>
        </div>
      </div>
    {/if}
  </div>
</div>

<style>
  .glow-available {
    box-shadow: 0 0 6px 1px rgba(52, 211, 153, 0.45);
  }
  .assurance-glow {
    box-shadow: 0 0 10px 3px rgba(251, 191, 36, 0.5);
    animation: pulse-glow 2s ease-in-out infinite;
  }
  @keyframes pulse-glow {
    0%, 100% { box-shadow: 0 0 8px 2px rgba(251, 191, 36, 0.4); }
    50% { box-shadow: 0 0 16px 6px rgba(251, 191, 36, 0.7); }
  }
  .fee-ticker {
    animation: tick 1.8s steps(1, end) infinite;
  }
  @keyframes tick {
    0%, 49% { opacity: 1; }
    50%, 100% { opacity: 0.4; }
  }
</style>
