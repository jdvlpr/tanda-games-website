<script>
  let { engine, player, isActive, onCardSelect, selectedSlot, selectedStash } = $props();

  // Helper to determine if a slot is available
  function isAvailable(slotIdx) {
    if (!engine) return false;
    return engine.isCardAvailable(player, slotIdx);
  }

  function handleLayoutClick(slotIdx) {
    if (!engine || engine.phase !== 'preparation') return;
    if (!isAvailable(slotIdx)) return;
    if (onCardSelect) onCardSelect({ type: 'layout', playerIdx: player.id, slotIdx });
  }

  function handleStashClick(type, itemIdx) {
    if (!engine || engine.phase !== 'preparation') return;
    if (onCardSelect) onCardSelect({ type: 'stash', playerIdx: player.id, stashType: type, itemIdx });
  }

  // Get color for card type
  function getCardColor(type) {
    switch(type) {
      case 'document': return 'var(--color-emi-document)';
      case 'connection': return 'var(--color-emi-connection)';
      case 'payday': return 'var(--color-emi-payday)';
      case 'life': return 'var(--color-emi-life)';
      default: return '#fff';
    }
  }

  // Get Tailwind grid positioning classes for layout cards
  function getPosClass(i) {
    switch(i) {
      case 0: return 'col-start-1 row-start-1 z-10';
      case 1: return 'col-start-2 row-start-1 z-10';
      case 2: return 'col-start-3 row-start-1 z-10';
      case 3: return 'col-start-4 row-start-1 z-10';
      
      case 4: return 'col-start-1 col-span-2 row-start-2 ml-[50%] z-20';
      case 5: return 'col-start-2 col-span-2 row-start-2 ml-[50%] z-20';
      case 6: return 'col-start-3 col-span-2 row-start-2 ml-[50%] z-20';
      
      case 7: return 'col-start-1 row-start-3 z-30';
      case 8: return 'col-start-2 row-start-3 z-30';
      case 9: return 'col-start-3 row-start-3 z-30';
      case 10: return 'col-start-4 row-start-3 z-30';
      
      case 11: return 'col-start-1 col-span-2 row-start-4 ml-[50%] z-40';
      case 12: return 'col-start-2 col-span-2 row-start-4 ml-[50%] z-40';
      case 13: return 'col-start-3 col-span-2 row-start-4 ml-[50%] z-40';
      default: return '';
    }
  }
</script>

<div class="bg-emi-bg-panel border border-white/5 rounded-xl p-4 mb-6 transition-all duration-300 font-emi-ui text-slate-50 {isActive ? 'border-emi-accent shadow-[0_0_20px_rgba(85,183,176,0.1)]' : ''}">
  <div class="flex justify-between items-center mb-4 pb-3 border-b border-white/10 flex-wrap gap-3">
    <div class="flex flex-col">
      <span class="text-xl font-bold font-emi-heading">{player.name}</span>
      <span class="text-sm text-slate-400">{player.nationality} → {player.destination}</span>
    </div>
    <div class="flex gap-4 flex-wrap">
      <div class="flex flex-col items-center bg-black/20 px-3 py-1.5 rounded-lg">
        <span class="text-[0.7rem] uppercase text-slate-400 tracking-wider">Money</span>
        <strong class="text-lg font-semibold">${player.money}</strong>
      </div>
      <div class="flex flex-col items-center bg-black/20 px-3 py-1.5 rounded-lg">
        <span class="text-[0.7rem] uppercase text-slate-400 tracking-wider">Salary</span>
        <strong class="text-lg font-semibold">${player.salary}</strong>
      </div>
      <div class="flex flex-col items-center bg-black/20 px-3 py-1.5 rounded-lg">
        <span class="text-[0.7rem] uppercase text-slate-400 tracking-wider">Assurance</span>
        <strong class="text-lg font-semibold">{player.assurance}</strong>
      </div>
      <div class="flex flex-col items-center bg-black/20 px-3 py-1.5 rounded-lg" title="Access Fee paid to opponents">
        <span class="text-[0.7rem] uppercase text-slate-400 tracking-wider">Fee</span>
        <strong class="text-lg font-semibold">${player.accessFee}</strong>
      </div>
    </div>
  </div>

  <div class="flex items-center gap-3 mb-5 bg-black/10 px-3 py-2 rounded-lg">
    <div class="text-sm text-slate-400">Career (Pay Raises)</div>
    <div class="flex gap-2 items-center">
      <div class="w-8 h-8 rounded-full border-2 border-dashed flex items-center justify-center text-xs {player.payRaises >= 1 ? 'border-solid border-emi-payday bg-[rgba(249,197,82,0.1)] text-emi-payday font-bold' : 'border-white/20 text-white/30'}">+$1</div>
      <div class="w-8 h-8 rounded-full border-2 border-dashed flex items-center justify-center text-xs {player.payRaises >= 2 ? 'border-solid border-emi-payday bg-[rgba(249,197,82,0.1)] text-emi-payday font-bold' : 'border-white/20 text-white/30'}">+$3</div>
      {#if player.inCollege}
        <div class="bg-emi-accent text-black px-2 py-1 rounded text-xs font-bold ml-2">In College</div>
      {/if}
    </div>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-[minmax(300px,1.5fr)_1fr] gap-6">
    <div>
      <h4 class="mt-0 mb-3 text-sm uppercase text-slate-400 tracking-wide">Layout</h4>
      <div class="grid grid-cols-4 auto-rows-[80px] gap-2 relative pb-[90px]">
        {#each player.layout as slot, i}
          <!-- svelte-ignore a11y_click_events_have_key_events -->
          <!-- svelte-ignore a11y_no_static_element_interactions -->
          <div 
            class="w-full h-[160px] rounded-xl relative transition-all duration-200 {getPosClass(i)} flex flex-col items-center justify-center {!slot ? 'border-2 border-dashed border-white/10 bg-transparent' : 'bg-[#1e293b] border-2 shadow-lg'} {slot && !slot.faceUp ? 'bg-[repeating-linear-gradient(45deg,#1e293b,#1e293b_15px,#0f172a_15px,#0f172a_30px)] border-[#334155]' : ''} {slot && slot.faceUp && !isAvailable(i) ? 'brightness-[0.5] saturate-[0.7]' : ''} {isAvailable(i) ? 'cursor-pointer hover:-translate-y-2' : ''} {selectedSlot?.playerIdx === player.id && selectedSlot?.slotIdx === i ? 'outline outline-2 outline-white outline-offset-4 !z-50' : ''}"
            style={slot && slot.faceUp ? `border-color: ${getCardColor(slot.card.type)}; ${isAvailable(i) && (!selectedSlot || selectedSlot.slotIdx !== i) ? `box-shadow: 0 0 20px ${getCardColor(slot.card.type)}66;` : ''}` : ''}
            onclick={() => handleLayoutClick(i)}
          >
            {#if slot}
              {#if slot.faceUp}
                <div class="p-3 h-full w-full flex flex-col text-center">
                  <div class="text-[0.65rem] font-bold tracking-wider uppercase mb-2" style="color: {getCardColor(slot.card.type)}">{slot.card.type}</div>
                  <div class="text-sm font-bold leading-snug flex-grow flex items-center justify-center text-white">{slot.card.name || slot.card.title}</div>
                  {#if slot.card.cost !== undefined}
                    <div class="text-xs font-bold self-center bg-black/40 px-2 py-1 rounded text-slate-300 mt-2">${slot.card.cost}</div>
                  {/if}
                </div>
              {:else}
                <div class="font-bold text-slate-400 tracking-widest text-sm uppercase">DOWN</div>
              {/if}
            {/if}
          </div>
        {/each}
      </div>
    </div>

    <div>
      <h4 class="mt-0 mb-3 text-sm uppercase text-slate-400 tracking-wide">Stash</h4>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <h5 class="mt-0 mb-2 text-xs text-slate-400">Docs ({player.stash.documents.length})</h5>
          <div class="flex flex-col gap-1.5">
            {#each player.stash.documents as doc, i}
              <!-- svelte-ignore a11y_click_events_have_key_events -->
              <!-- svelte-ignore a11y_no_static_element_interactions -->
              <div 
                class="bg-white/5 border border-white/10 border-l-4 px-2 py-1.5 rounded text-xs cursor-pointer transition-colors duration-200 hover:bg-white/10 {selectedStash?.playerIdx === player.id && selectedStash?.stashType === 'document' && selectedStash?.itemIdx === i ? 'outline outline-1 outline-emi-accent bg-emi-accent/10' : ''}"
                style="border-left-color: {getCardColor('document')}"
                onclick={() => handleStashClick('document', i)}
              >
                {doc.name}
              </div>
            {/each}
          </div>
        </div>

        <div>
          <h5 class="mt-0 mb-2 text-xs text-slate-400">Conns ({player.stash.connections.length})</h5>
          <div class="flex flex-col gap-1.5">
            {#each player.stash.connections as conn, i}
              <!-- svelte-ignore a11y_click_events_have_key_events -->
              <!-- svelte-ignore a11y_no_static_element_interactions -->
              <div 
                class="bg-white/5 border border-white/10 border-l-4 px-2 py-1.5 rounded text-xs cursor-pointer transition-colors duration-200 hover:bg-white/10 {selectedStash?.playerIdx === player.id && selectedStash?.stashType === 'connection' && selectedStash?.itemIdx === i ? 'outline outline-1 outline-emi-accent bg-emi-accent/10' : ''}"
                style="border-left-color: {getCardColor('connection')}"
                onclick={() => handleStashClick('connection', i)}
              >
                {conn.name}
              </div>
            {/each}
          </div>
        </div>

        <div>
          <h5 class="mt-0 mb-2 text-xs text-slate-400">Other</h5>
          <div class="flex flex-col gap-1.5">
            <div class="px-2 py-1.5 rounded text-xs bg-black/20 border border-white/5 {player.stash.tickets > 0 ? 'opacity-100 bg-white/10 border-white/20' : 'opacity-50'}">
              🎟️ Tickets: {player.stash.tickets}
            </div>
            <div class="px-2 py-1.5 rounded text-xs bg-black/20 border border-white/5 {player.stash.passports > 0 ? 'opacity-100 bg-white/10 border-white/20' : 'opacity-50'}">
              🛂 Passports: {player.stash.passports}
            </div>
          </div>
          {#if player.stash.lifeCards.length > 0}
            <h5 class="mt-2 mb-2 text-xs text-slate-400">Life Cards</h5>
            <div class="flex flex-col gap-1.5">
              {#each player.stash.lifeCards as lc}
                <div class="bg-white/5 border border-white/10 border-l-4 px-2 py-1.5 rounded text-xs cursor-default" style="border-left-color: {getCardColor('life')}">
                  {lc.title}
                </div>
              {/each}
            </div>
          {/if}
        </div>
      </div>
    </div>
  </div>
</div>
