<script>
  let { engine, player, isActive, onCardSelect, selectedSlot, selectedStash } = $props();

  let boardEl = null;
  let wasActive = false;

  $effect(() => {
    if (isActive && !wasActive && boardEl) {
      requestAnimationFrame(() => {
        boardEl?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
    wasActive = isActive;
  });

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
      case 'document': return '#e3a780';
      case 'connection': return '#d990b4';
      case 'payday': return '#deede2';
      case 'life': return '#fefefe';
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
      <div class="grid-card rounded-md bg-transparent cursor-auto! border-none! shadow-none!"></div>
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
        class="grid-card border rounded-md shadow-md {slot.faceUp ? 'bg-neutral-100 dark:bg-neutral-900' : 'back bg-neutral-400 dark:bg-neutral-600'} {slot.faceUp ? c.type : ''} {isCov ? 'covered' : ''} {isAvail ? 'available' : ''} {isSelected ? 'selected' : ''}"
        style={isSelected ? 'box-shadow: 0 0 10px rgba(85, 183, 176, 0.8) !important;' : ''}
      >
        {#if slot.faceUp}
          <div class="h-2 w-full border cursor-pointer rounded-md" style="background:{getCardColor(c.type)}"></div>
          <div class="card-type">{c.type}</div>
          <div class="card-title">{c.name || c.title}</div>
          <div class="text-sm">{c.cost !== undefined ? `$${c.cost}` : ''}</div>
        {/if}
      </div>
    </div>
  {/if}
{/snippet}

<div
  bind:this={boardEl}
  class={["bg-neutral-200 dark:bg-neutral-800 rounded-md p-5 mb-6 transition-all duration-300 mt-4", isActive && "shadow-[0_0_20px_rgba(85,183,176,0.65)]"]}
>
  <!-- Player Header Info -->
  <div class="flex justify-between items-center mb-3 pb-3 flex-wrap gap-3">
    <div class="flex flex-col">
      <div class="flex items-center gap-2">
        {#if isActive}
          <span class=" animate-pulse">▶</span>
        {/if}
        <span class="text-xl font-bold">{player.name}</span>
        <span class="text-xs">({player.nationality} → {player.destination})</span>
        
        {#if player.inCollege}
          <span class="text-xs font-bold uppercase bg-amber-500 text-black px-1.5 py-0.5 rounded">In College</span>
        {:else if player.payRaises >= 3}
          <span class="text-xs font-bold uppercase bg-emerald-500 text-white px-1.5 py-0.5 rounded">Career Maxed</span>
        {/if}

        {#if player.crossedSuccessfully === true}
          <span class="text-xs font-bold uppercase bg-emerald-500 text-white px-1.5 py-0.5 rounded">Crossed</span>
        {:else if player.crossedSuccessfully === false}
          <span class="text-xs font-bold uppercase bg-rose-500 text-white px-1.5 py-0.5 rounded">Blocked</span>
        {/if}
      </div>
    </div>
    
    <div class="flex gap-2.5 flex-wrap">
      <div class="flex flex-col items-center bg-neutral-100 dark:bg-neutral-900 px-3 py-1 rounded-md">
        <span class="text-xs uppercase  tracking-wider">Money</span>
        <strong class="text-base font-semibold text-green-700 dark:text-green-300">${player.money}</strong>
      </div>
      <div class="flex flex-col items-center bg-neutral-100 dark:bg-neutral-900 px-3 py-1 rounded-md">
        <span class="text-xs uppercase  tracking-wider">Salary</span>
        <strong class="text-base font-semibold">${player.salary}</strong>
      </div>
      <div class="flex flex-col items-center bg-neutral-100 dark:bg-neutral-900 px-3 py-1 rounded-md">
        <span class="text-xs uppercase  tracking-wider">Access Fee</span>
        <strong class="text-base font-semibold text-red-700 dark:text-red-300">${player.accessFee}</strong>
      </div>
      <div class="flex flex-col items-center bg-neutral-100 dark:bg-neutral-900 px-3 py-1 rounded-md">
        <span class="text-xs uppercase  tracking-wider">Assurance</span>
        <strong class="text-base font-semibold  text-red-700 dark:text-red-300">{player.assurance}</strong>
      </div>
    </div>
  </div>

  <!-- Requirements Subheader -->
  <div class="text-sm  mb-4 px-3 py-1.5 bg-neutral-100 dark:bg-neutral-900 rounded-md flex flex-col gap-1 items-start">
    <p>
      <strong>College Fund:</strong> <span class="">${player.collegeFund}</span>
    </p>
    <p><strong>Destination Rules:</strong> <span class="">{getDestinationInfoText(player.destination)}</span></p>
    <div class=" flex gap-1 items-center">
      <span class=""><strong>Raises:</strong></span>
      <div class="size-6 rounded-full border border-dashed flex items-center justify-center text-xs {player.payRaises >= 1 && 'border-solid bg-green-100 dark:bg-green-900 font-bold'}">+$1</div>
      <div class="size-8 rounded-full border border-dashed flex items-center justify-center text-xs {player.payRaises >= 2 && 'border-solid bg-green-100 dark:bg-green-900 font-bold'}">+$3</div>
    </div>
  </div>

  <!-- Card Layout (Row 1-4 Vertical Stacked Overlap) -->
  {#if engine && engine.phase === 'preparation'}
    <div class="bg-neutral-100 dark:bg-neutral-900 p-4 rounded-md mb-4 pb-18">
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
    <div class="text-center py-6 text-sm  font-bold bg-black/15 rounded-md border border-dashed border-white/5 mb-4">
      Layout Cleared (Crossing / Game Over Phase)
    </div>
  {/if}

  <!-- 5-Column Stash Display -->
  <div class="stash-container p-4 rounded-md bg-neutral-100 dark:bg-neutral-900">
    <!-- 1. Documents -->
    <div class="stash-column">
      <div class="uppercase tracking-wide text-xs mb-1">Docs ({player.stash.documents.length})</div>
      {#each player.stash.documents as doc, i}
        {@const isSel = selectedStash && selectedStash.playerIdx === player.id && selectedStash.stashType === 'document' && selectedStash.itemIdx === i}
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div 
          class="stash-item bg-neutral-50 dark:bg-neutral-900 px-2 py-1 rounded-md {isSel ? 'selected' : ''}" 
          style="border-left: 2.5px solid var(--color-emi-document);" 
          onclick={() => handleStashClick('document', i)}
        >
          <span class="truncate pr-1">{doc.name}</span>
          <span class="text-xs  font-bold">${doc.cost || 0}</span>
        </div>
      {/each}
    </div>

    <!-- 2. Connections -->
    <div class="stash-column">
      <div class="uppercase tracking-wide text-xs mb-1">Conns ({player.stash.connections.length})</div>
      {#each player.stash.connections as conn, i}
        {@const isSel = selectedStash && selectedStash.playerIdx === player.id && selectedStash.stashType === 'connection' && selectedStash.itemIdx === i}
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div 
          class="stash-item bg-neutral-50 dark:bg-neutral-900 px-2 py-1 rounded-md {isSel ? 'selected' : ''}" 
          style="border-left: 2.5px solid var(--color-emi-connection);" 
          onclick={() => handleStashClick('connection', i)}
        >
          <span class="truncate pr-1">{conn.name}</span>
          <span class="text-xs  font-bold">${conn.cost || 0}</span>
        </div>
      {/each}
    </div>

    <!-- 3. Tickets -->
    <div class="stash-column">
      <div class="uppercase tracking-wide text-xs mb-1">Tickets ({player.stash.tickets})</div>
      {#each Array(player.stash.tickets) as _, i}
        {@const isSel = selectedStash && selectedStash.playerIdx === player.id && selectedStash.stashType === 'ticket' && selectedStash.itemIdx === i}
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div 
          class="stash-item bg-neutral-50 dark:bg-neutral-900 px-2 py-1 rounded-md {isSel ? 'selected' : ''}" 
          style="border-left: 2.5px solid var(--color-emi-ticket);" 
          onclick={() => handleStashClick('ticket', i)}
        >
          <span>🎟️ Ticket</span>
        </div>
      {/each}
    </div>

    <!-- 4. Passports -->
    <div class="stash-column">
      <div class="uppercase tracking-wide text-xs mb-1">Passports ({player.stash.passports})</div>
      {#each Array(player.stash.passports) as _, i}
        {@const isSel = selectedStash && selectedStash.playerIdx === player.id && selectedStash.stashType === 'passport' && selectedStash.itemIdx === i}
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div 
          class="stash-item bg-neutral-50 dark:bg-neutral-900 px-2 py-1 rounded-md {isSel ? 'selected' : ''}" 
          style="border-left: 2.5px solid var(--color-emi-passport);" 
          onclick={() => handleStashClick('passport', i)}
        >
          <span>🛂 Passport</span>
        </div>
      {/each}
    </div>

    <!-- 5. Kept Life -->
    <div class="stash-column">
      <div class="uppercase tracking-wide text-xs mb-1">Life ({player.stash.lifeCards.length})</div>
      {#each player.stash.lifeCards as lc, i}
        {@const isSel = selectedStash && selectedStash.playerIdx === player.id && selectedStash.stashType === 'lifeCard' && selectedStash.itemIdx === i}
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div 
          class="stash-item bg-neutral-50 dark:bg-neutral-900 px-2 py-1 rounded-md {isSel ? 'selected' : ''}" 
          style="border-left: 2.5px solid var(--color-emi-life);" 
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

  .layout-row {
    display: flex;
    justify-content: center;
    position: relative;
    width: 100%;
    height: 50px; /* Creates vertical overlap */
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
    display: flex;
    flex-direction: column;
    padding: 4px;
    font-size: 11px;
    text-align: center;
    justify-content: space-between;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s, opacity 0.2s;
    position: relative;
  }

  .grid-card.back {
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
    opacity: 0.7;
  }

  .grid-card.document {
    border-color: var(--color-emi-document);
    border-left: 3.5px solid var(--color-emi-document);
  }
  .grid-card.connection {
    border-color: var(--color-emi-connection);
    border-left: 3.5px solid var(--color-emi-connection);
  }
  .grid-card.payday {
    border-color: var(--color-emi-payday);
    border-left: 3.5px solid var(--color-emi-payday);
  }
  .grid-card.life {
    border-color: var(--color-emi-life);
    border-left: 3.5px solid var(--color-emi-life);
  }

  .grid-card.covered {
    cursor: not-allowed;
  }

  .grid-card.available {
    box-shadow: 0 0 5px rgba(85, 183, 176, 0.3);
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


  /* Stash styles */
  .stash-container {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 8px;
    overflow:auto;
  }

  .stash-column {
    background: rgba(0, 0, 0, 0.2);
    padding: 6px;
    border-radius: 6px;
    border: 1px solid rgba(255, 255, 255, 0.05);
    min-height: 80px;
    min-width: 100px;
  }

  .stash-item {
    font-size: 10px;
    margin-bottom: 4px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
  }

  .stash-item:hover {
    border-color: #55b7b0;
  }

  .stash-item.selected {
    outline: 1px solid #55b7b0;
    border-color: #55b7b0;
  }
</style>
