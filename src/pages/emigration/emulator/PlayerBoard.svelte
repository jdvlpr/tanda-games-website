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
      case 'document': return '#38bdf8'; // Sky-400
      case 'connection': return '#f43f5e'; // Rose-500
      case 'payday': return '#eab308'; // Yellow-500
      case 'life': return '#a855f7'; // Purple-500
      default: return '#fff';
    }
  }

  function getDestinationInfoText(destName) {
    switch (destName) {
      case "Bosnia and Herzegovina":
        return "Money ≥ 6 (+2) | Docs ≥ 4 (+2), < 2 (-2) | Conns ≥ 3 (+6)";
      case "China":
        return "Money ≥ 10 (+3), < 4 (-2) | Docs ≥ 4 (+2), < 2 (-3) | Conns ≥ 4 (+5)";
      case "Democratic Republic of Congo":
        return "Money ≥ 6 (+2) | Docs ≥ 4 (+2), < 2 (-2) | Conns ≥ 3 (+6)";
      case "France":
        return "Money ≥ 8 (+2), < 3 (-1) | Docs ≥ 4 (+2), < 2 (-3) | Conns ≥ 3 (+4)";
      case "Russia":
        return "Money ≥ 7 (+2), < 2 (-1) | Docs ≥ 4 (+2), < 2 (-3) | Conns ≥ 3 (+4)";
      case "Senegal":
        return "Money ≥ 7 (+2) | Docs ≥ 4 (+2), < 2 (-2) | Conns ≥ 3 (+5)";
      case "Switzerland":
        return "Money ≥ 7 (+2), < 2 (-1) | Docs ≥ 4 (+2), < 2 (-3) | Conns ≥ 3 (+4)";
      case "England":
        return "Money ≥ 10 (+3), < 4 (-2) | Docs ≥ 4 (+2), < 2 (-3) | Conns ≥ 3 (+4)";
      case "United States of America":
        return "Money ≥ 10 (+3), < 5 (-2) | Docs ≥ 4 (+2), < 2 (-3) | Conns ≥ 4 (+5)";
      default:
        return "";
    }
  }
</script>

{#snippet cardSlot(slotIdx)}
  {@const slot = player.layout[slotIdx]}
  {#if !slot}
    <div class="grid-card-slot">
      <div class="grid-card bg-transparent border border-dashed border-white/10 opacity-30"></div>
    </div>
  {:else}
    {@const isCov = engine ? engine.isCardCovered(player, slotIdx) : false}
    {@const isAvail = isAvailable(slotIdx)}
    {@const isSelected = selectedSlot && selectedSlot.playerIdx === player.id && selectedSlot.slotIdx === slotIdx}
    {@const c = slot.card}
    
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="grid-card-slot" onclick={() => handleLayoutClick(slotIdx)}>
      <div 
        class="grid-card {slot.faceUp ? 'front' : 'back'} {slot.faceUp ? c.type : ''} {isCov ? 'covered' : ''} {isAvail ? 'available' : ''} {isSelected ? 'selected' : ''}"
        style={isSelected ? 'border-color: #55b7b0 !important; box-shadow: 0 0 12px rgba(85, 183, 176, 0.8) !important;' : ''}
      >
        {#if !slot.faceUp}
          <div class="font-bold text-slate-400 tracking-widest text-[0.65rem] uppercase">DOWN</div>
        {:else}
          <div class="card-type" style="color: {getCardColor(c.type)}">{c.type}</div>
          <div class="card-title text-white">{c.name || c.title}</div>
          <div class="card-cost">{c.cost !== undefined ? `$${c.cost}` : ''}</div>
        {/if}
      </div>
    </div>
  {/if}
{/snippet}

<div class={["bg-emi-bg-panel border border-white/10 rounded-xl p-5 mb-6 transition-all duration-300 font-emi-ui text-slate-50", isActive && "border-emi-accent/80 shadow-[0_0_20px_rgba(85,183,176,0.65)] bg-emi-bg-panel/90"]}>
  <!-- Player Header Info -->
  <div class="flex justify-between items-center mb-3 pb-3 border-b border-white/10 flex-wrap gap-3">
    <div class="flex flex-col">
      <div class="flex items-center gap-2">
        {#if isActive}
          <span class="text-emi-accent animate-pulse">▶</span>
        {/if}
        <span class="text-xl font-bold font-emi-heading">{player.name}</span>
        <span class="text-xs text-slate-400 font-normal">({player.nationality} → {player.destination})</span>
        
        {#if player.inCollege}
          <span class="text-[0.65rem] font-bold uppercase bg-amber-500 text-black px-1.5 py-0.5 rounded">In College</span>
        {:else if player.payRaises >= 3}
          <span class="text-[0.65rem] font-bold uppercase bg-emerald-500 text-white px-1.5 py-0.5 rounded">Career Maxed</span>
        {/if}

        {#if player.crossedSuccessfully === true}
          <span class="text-[0.65rem] font-bold uppercase bg-emerald-500 text-white px-1.5 py-0.5 rounded">Crossed</span>
        {:else if player.crossedSuccessfully === false}
          <span class="text-[0.65rem] font-bold uppercase bg-rose-500 text-white px-1.5 py-0.5 rounded">Blocked</span>
        {/if}
      </div>
    </div>
    
    <div class="flex gap-2.5 flex-wrap">
      <div class="flex flex-col items-center bg-black/20 px-3 py-1 rounded-lg border border-white/5 min-w-[70px]">
        <span class="text-[0.6rem] uppercase text-slate-400 tracking-wider">Money</span>
        <strong class="text-base font-semibold text-amber-400">${player.money}</strong>
      </div>
      <div class="flex flex-col items-center bg-black/20 px-3 py-1 rounded-lg border border-white/5 min-w-[70px]">
        <span class="text-[0.6rem] uppercase text-slate-400 tracking-wider">Salary</span>
        <strong class="text-base font-semibold text-purple-300">${player.salary}</strong>
      </div>
      <div class="flex flex-col items-center bg-black/20 px-3 py-1 rounded-lg border border-white/5 min-w-[70px]">
        <span class="text-[0.6rem] uppercase text-slate-400 tracking-wider">Fee</span>
        <strong class="text-base font-semibold text-sky-300">${player.accessFee}</strong>
      </div>
      <div class="flex flex-col items-center bg-black/20 px-3 py-1 rounded-lg border border-white/5 min-w-[70px]">
        <span class="text-[0.6rem] uppercase text-slate-400 tracking-wider">Assurance</span>
        <strong class="text-base font-semibold text-emerald-400">{player.assurance}</strong>
      </div>
    </div>
  </div>

  <!-- Requirements Subheader -->
  <div class="text-[0.7rem] text-slate-400 mb-4 px-3 py-1.5 bg-black/20 rounded-md border border-white/5 flex gap-4 items-center flex-wrap">
    <span><strong>Nationality Fund:</strong> <span class="text-slate-200">${player.collegeFund}</span></span>
    <span class="text-white/10">|</span>
    <span><strong>Destination Rules:</strong> <span class="text-slate-200">{getDestinationInfoText(player.destination)}</span></span>
    
    <div class="ml-auto flex gap-1.5 items-center">
      <span class="text-slate-400 font-bold uppercase tracking-wider text-[0.6rem]">Raises:</span>
      <div class="w-5 h-5 rounded-full border border-dashed flex items-center justify-center text-[0.55rem] {player.payRaises >= 1 ? 'border-solid border-emi-payday bg-[rgba(249,197,82,0.15)] text-emi-payday font-bold' : 'border-white/20 text-white/30'}">+$1</div>
      <div class="w-5 h-5 rounded-full border border-dashed flex items-center justify-center text-[0.55rem] {player.payRaises >= 2 ? 'border-solid border-emi-payday bg-[rgba(249,197,82,0.15)] text-emi-payday font-bold' : 'border-white/20 text-white/30'}">+$3</div>
    </div>
  </div>

  <!-- Card Layout (Row 1-4 Vertical Stacked Overlap) -->
  {#if engine && engine.phase === 'preparation'}
    <div class="layout-grid-wrapper mb-4">
      <!-- Row 1 -->
      <div class="layout-row row-1">
        {@render cardSlot(0)}
        {@render cardSlot(1)}
        {@render cardSlot(2)}
        {@render cardSlot(3)}
      </div>
      <!-- Row 2 -->
      <div class="layout-row row-2">
        {@render cardSlot(4)}
        {@render cardSlot(5)}
        {@render cardSlot(6)}
      </div>
      <!-- Row 3 -->
      <div class="layout-row row-3">
        {@render cardSlot(7)}
        {@render cardSlot(8)}
        {@render cardSlot(9)}
        {@render cardSlot(10)}
      </div>
      <!-- Row 4 -->
      <div class="layout-row row-4">
        {@render cardSlot(11)}
        {@render cardSlot(12)}
        {@render cardSlot(13)}
      </div>
    </div>
  {:else}
    <div class="text-center py-6 text-sm text-slate-400 font-bold bg-black/15 rounded-lg border border-dashed border-white/5 mb-4">
      Layout Cleared (Crossing / Game Over Phase)
    </div>
  {/if}

  <!-- 5-Column Stash Display -->
  <div class="stash-container">
    <!-- 1. Documents -->
    <div class="stash-column">
      <div class="stash-col-title">Docs ({player.stash.documents.length})</div>
      {#each player.stash.documents as doc, i}
        {@const isSel = selectedStash && selectedStash.playerIdx === player.id && selectedStash.stashType === 'document' && selectedStash.itemIdx === i}
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div 
          class="stash-item {isSel ? 'selected' : ''}" 
          style="border-left: 2.5px solid #38bdf8;" 
          onclick={() => handleStashClick('document', i)}
        >
          <span class="truncate pr-1">{doc.name}</span>
          <span class="text-[0.6rem] text-slate-400 font-bold">${doc.cost || 0}</span>
        </div>
      {/each}
    </div>

    <!-- 2. Connections -->
    <div class="stash-column">
      <div class="stash-col-title">Conns ({player.stash.connections.length})</div>
      {#each player.stash.connections as conn, i}
        {@const isSel = selectedStash && selectedStash.playerIdx === player.id && selectedStash.stashType === 'connection' && selectedStash.itemIdx === i}
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div 
          class="stash-item {isSel ? 'selected' : ''}" 
          style="border-left: 2.5px solid #f43f5e;" 
          onclick={() => handleStashClick('connection', i)}
        >
          <span class="truncate pr-1">{conn.name}</span>
          <span class="text-[0.6rem] text-slate-400 font-bold">${conn.cost || 0}</span>
        </div>
      {/each}
    </div>

    <!-- 3. Tickets -->
    <div class="stash-column">
      <div class="stash-col-title">Tickets ({player.stash.tickets})</div>
      {#each Array(player.stash.tickets) as _, i}
        {@const isSel = selectedStash && selectedStash.playerIdx === player.id && selectedStash.stashType === 'ticket' && selectedStash.itemIdx === i}
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div 
          class="stash-item {isSel ? 'selected' : ''}" 
          style="border-left: 2.5px solid #55b7b0;" 
          onclick={() => handleStashClick('ticket', i)}
        >
          <span>🎟️ Ticket</span>
        </div>
      {/each}
    </div>

    <!-- 4. Passports -->
    <div class="stash-column">
      <div class="stash-col-title">Passports ({player.stash.passports})</div>
      {#each Array(player.stash.passports) as _, i}
        {@const isSel = selectedStash && selectedStash.playerIdx === player.id && selectedStash.stashType === 'passport' && selectedStash.itemIdx === i}
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div 
          class="stash-item {isSel ? 'selected' : ''}" 
          style="border-left: 2.5px solid #55b7b0;" 
          onclick={() => handleStashClick('passport', i)}
        >
          <span>🛂 Passport</span>
        </div>
      {/each}
    </div>

    <!-- 5. Kept Life -->
    <div class="stash-column">
      <div class="stash-col-title">Kept Life ({player.stash.lifeCards.length})</div>
      {#each player.stash.lifeCards as lc, i}
        {@const isSel = selectedStash && selectedStash.playerIdx === player.id && selectedStash.stashType === 'lifeCard' && selectedStash.itemIdx === i}
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div 
          class="stash-item {isSel ? 'selected' : ''}" 
          style="border-left: 2.5px solid #a855f7;" 
          onclick={() => handleStashClick('lifeCard', i)}
        >
          <span class="truncate pr-1">{lc.title}</span>
          {#if lc.money}
            <span class="bg-amber-500 text-black px-1 rounded-[3px] text-[0.55rem] font-bold">${lc.money}</span>
          {/if}
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
  .layout-grid-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 16px 0;
    background: rgba(15, 23, 42, 0.3);
    border-radius: 12px;
    position: relative;
    border: 1px solid rgba(255, 255, 255, 0.05);
  }

  .layout-row {
    display: flex;
    justify-content: center;
    position: relative;
    width: 100%;
    height: 85px; /* Creates vertical overlap */
  }

  .row-1 { z-index: 10; }
  .row-2 { z-index: 20; }
  .row-3 { z-index: 30; }
  .row-4 { z-index: 40; }

  .grid-card-slot {
    width: 90px;
    height: 110px;
    margin: 0 8px;
    position: relative;
  }

  .grid-card {
    width: 100%;
    height: 100%;
    border-radius: 8px;
    border: 1px solid #475569;
    display: flex;
    flex-direction: column;
    padding: 6px;
    font-size: 11px;
    text-align: center;
    justify-content: space-between;
    cursor: pointer;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
    transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s, opacity 0.2s;
    position: relative;
  }

  .grid-card.back {
    background-color: #334155;
    background-image: repeating-linear-gradient(
      45deg,
      transparent,
      transparent 10px,
      rgba(255, 255, 255, 0.03) 10px,
      rgba(255, 255, 255, 0.03) 20px
    );
    display: flex;
    align-items: center;
    justify-content: center;
    color: #94a3b8;
    cursor: not-allowed;
  }

  .grid-card.front {
    background-color: #1e293b;
  }

  .grid-card.document {
    border-left: 3.5px solid #38bdf8;
  }
  .grid-card.connection {
    border-left: 3.5px solid #f43f5e;
  }
  .grid-card.payday {
    border-left: 3.5px solid #eab308;
  }
  .grid-card.life {
    border-left: 3.5px solid #a855f7;
  }

  .grid-card.covered {
    opacity: 0.45;
    cursor: not-allowed;
  }

  .grid-card.available {
    opacity: 1;
    border-color: #55b7b0;
    box-shadow: 0 0 8px rgba(85, 183, 176, 0.3);
  }

  .grid-card.available:hover {
    transform: translateY(-4px) scale(1.05);
    box-shadow: 0 8px 16px rgba(85, 183, 176, 0.5);
    z-index: 50;
  }

  .grid-card .card-type {
    font-size: 8px;
    text-transform: uppercase;
    font-weight: 700;
  }

  .grid-card .card-title {
    font-weight: 700;
    line-height: 1.25;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }

  .grid-card .card-cost {
    font-size: 9px;
    color: #94a3b8;
    font-weight: 600;
  }

  /* Stash styles */
  .stash-container {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 8px;
    margin-top: 12px;
    background: rgba(15, 23, 42, 0.2);
    padding: 10px;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.03);
  }

  .stash-column {
    background: rgba(0, 0, 0, 0.2);
    padding: 6px;
    border-radius: 6px;
    border: 1px solid rgba(255, 255, 255, 0.05);
    min-height: 80px;
  }

  .stash-col-title {
    font-size: 9px;
    font-weight: 700;
    color: #94a3b8;
    margin-bottom: 6px;
    text-align: center;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    padding-bottom: 3px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .stash-item {
    font-size: 10px;
    background: #1e293b;
    border: 1px solid #475569;
    border-radius: 4px;
    padding: 3px 5px;
    margin-bottom: 4px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    transition: background-color 0.15s, border-color 0.15s;
  }

  .stash-item:hover {
    background-color: #334155;
    border-color: #55b7b0;
  }

  .stash-item.selected {
    outline: 1px solid #55b7b0;
    background-color: rgba(85, 183, 176, 0.15);
    border-color: #55b7b0;
  }
</style>
