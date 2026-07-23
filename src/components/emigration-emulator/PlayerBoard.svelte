<script>
  import Icon from '@iconify/svelte';
  let { engine, player, isActive, onCardSelect, selectedSlot, selectedStash, autoScrollEnabled = true } = $props();

  let boardEl = null;
  let wasActive = false;

  $effect(() => {
    if (autoScrollEnabled && isActive && !wasActive && boardEl) {
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

  function handleLayoutClick(e, slotIdx) {
    if (!engine || engine.phase !== 'preparation') return;
    if (!isAvailable(slotIdx)) return;
    if (onCardSelect) onCardSelect({ type: 'layout', playerIdx: player.id, slotIdx, anchorEl: e.currentTarget });
  }

  function handleStashClick(e, type, itemIdx) {
    if (!engine || engine.phase !== 'preparation') return;
    if (onCardSelect) onCardSelect({ type: 'stash', playerIdx: player.id, stashType: type, itemIdx, anchorEl: e.currentTarget });
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
    <div class="grid-card-slot empty"></div>
  {:else}
    {@const isCov = engine ? engine.isCardCovered(player, slotIdx) : false}
    {@const isAvail = isAvailable(slotIdx)}
    {@const isSelected = selectedSlot && selectedSlot.playerIdx === player.id && selectedSlot.slotIdx === slotIdx}
    {@const c = slot.card}
    
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="grid-card-slot">
      <div 
        class="grid-card border rounded-md shadow-md {slot.faceUp ? 'bg-neutral-100 dark:bg-neutral-900' : 'back bg-neutral-400 dark:bg-neutral-600'} {slot.faceUp ? c.type : ''} {isCov ? 'covered' : ''} {isAvail ? 'available' : ''} {isSelected ? 'selected' : ''}"
        style={isSelected ? 'box-shadow: 0 0 10px rgba(85, 183, 176, 0.8) !important;' : ''}
        onclick={(e) => handleLayoutClick(e, slotIdx)}
      >
        {#if slot.faceUp}
          <div class="h-2 w-full border rounded-md" style="background:{getCardColor(c.type)}"></div>
          <div class="card-type">{c.type}</div>
          {#if c.icon}
            <div class="flex items-center justify-center my-0.5">
              <Icon icon={c.icon.includes(':') ? c.icon : `game-icons:${c.icon}`} class="size-8" />
            </div>
          {/if}
          <div class="card-title">{c.name || c.title}</div>
          <div class="text-sm">{c.cost !== undefined ? `$${c.cost}` : ''}</div>
        {/if}
      </div>
    </div>
  {/if}
{/snippet}

<div
  bind:this={boardEl}
  class={["rounded-md p-5 mb-6 transition-all duration-300 mt-4 max-lg:scroll-mt-[8rem]", isActive ? "shadow-[0_0_20px_rgba(85,183,176,0.65)]" : "bg-neutral-200 dark:bg-neutral-800 "]}
>
  <!-- Player Header Info -->
  <div class="flex justify-between items-center pb-2 flex-wrap gap-2 text-xs lg:text-sm">
        <div class="flex items-center gap-1 w-fit">
          {#if isActive}
            <span class="text-green-500 animate-pulse">▶</span>
          {/if}
          <p class="text-xl font-bold">{player.name}</p>
        </div>
        <span class="flex flex-wrap gap-1 items-center">{player.nationality}</span>
          <span class="bg-neutral-50 dark:bg-neutral-950 flex gap-1 px-1 py-0.5 rounded-md items-center" title="College Fund">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="size-5"><g class="" transform="translate(0,0)" style=""><path d="M256 89.61 22.486 177.18 256 293.937l111.22-55.61-104.337-31.9A16 16 0 0 1 256 208a16 16 0 0 1-16-16 16 16 0 0 1 16-16l-2.646 8.602 18.537 5.703a16 16 0 0 1 .008.056l27.354 8.365L455 246.645v12.146a16 16 0 0 0-7 13.21 16 16 0 0 0 7.293 13.406C448.01 312.932 448 375.383 448 400c16 10.395 16 10.775 32 0 0-24.614-.008-87.053-7.29-114.584A16 16 0 0 0 480 272a16 16 0 0 0-7-13.227v-25.42L413.676 215.1l75.838-37.92L256 89.61zM119.623 249 106.5 327.74c26.175 3.423 57.486 18.637 86.27 36.627 16.37 10.232 31.703 21.463 44.156 32.36 7.612 6.66 13.977 13.05 19.074 19.337 5.097-6.288 11.462-12.677 19.074-19.337 12.453-10.897 27.785-22.128 44.156-32.36 28.784-17.99 60.095-33.204 86.27-36.627L392.375 249h-6.25L256 314.063 125.873 249h-6.25z" fill="currentColor"/></g></svg>
            <span class="max-md:hidden">College Fund:</span>
            <span class="">${player.collegeFund}</span>
          </span>

          <span class="bg-neutral-50 dark:bg-neutral-950 flex gap-1 px-1 py-0.5 rounded-md items-center text-green-700 dark:text-green-300" title="Money">
            <svg class="Icon size-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <g class="" transform="translate(0,0)" style=""><path d="M264.4 95.01c-35.6-.06-80.2 11.19-124.2 34.09C96.27 152 61.45 182 41.01 211.3c-20.45 29.2-25.98 56.4-15.92 75.8 10.07 19.3 35.53 30.4 71.22 30.4 35.69.1 80.29-11.2 124.19-34 44-22.9 78.8-53 99.2-82.2 20.5-29.2 25.9-56.4 15.9-75.8-10.1-19.3-35.5-30.49-71.2-30.49zm91.9 70.29c-3.5 15.3-11.1 31-21.8 46.3-22.6 32.3-59.5 63.8-105.7 87.8-46.2 24.1-93.1 36.2-132.5 36.2-18.6 0-35.84-2.8-50.37-8.7l10.59 20.4c10.08 19.4 35.47 30.5 71.18 30.5 35.7 0 80.3-11.2 124.2-34.1 44-22.8 78.8-52.9 99.2-82.2 20.4-29.2 26-56.4 15.9-75.7zm28.8 16.8c11.2 26.7 2.2 59.2-19.2 89.7-18.9 27.1-47.8 53.4-83.6 75.4 11.1 1.2 22.7 1.8 34.5 1.8 49.5 0 94.3-10.6 125.9-27.1 31.7-16.5 49.1-38.1 49.1-59.9 0-21.8-17.4-43.4-49.1-59.9-16.1-8.4-35.7-15.3-57.6-20zm106.7 124.8c-10.2 11.9-24.2 22.4-40.7 31-35 18.2-82.2 29.1-134.3 29.1-21.2 0-41.6-1.8-60.7-5.2-23.2 11.7-46.5 20.4-68.9 26.1 1.2.7 2.4 1.3 3.7 2 31.6 16.5 76.4 27.1 125.9 27.1s94.3-10.6 125.9-27.1c31.7-16.5 49.1-38.1 49.1-59.9z" fill="currentColor"></path></g></svg>
            <span class="max-md:hidden">Money:</span>
            <strong class="">${player.money}</strong>
          </span>

          <span class="bg-neutral-50 dark:bg-neutral-950 flex gap-1 px-1 py-0.5 rounded-md items-center" title="Salary">
            <svg class="Icon size-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g class="" transform="translate(0,0)" style=""><path d="M327.027 65.816 229.79 128.23l9.856 5.397 86.51-55.53 146.735 83.116-84.165 54.023 4.1 2.244v6.848l65.923-42.316 13.836 7.838-79.76 51.195v11.723l64.633-41.487 15.127 8.57-79.76 51.195v11.723l64.633-41.487 15.127 8.57-79.76 51.195v11.723l100.033-64.21-24.828-14.062 24.827-15.937-24.828-14.064 24.827-15.937-23.537-13.333 23.842-15.305-166.135-94.106zm31.067 44.74c-21.038 10.556-49.06 12.342-68.79 4.383l-38.57 24.757 126.903 69.47 36.582-23.48c-14.41-11.376-13.21-28.35 2.942-41.67l-59.068-33.46zM227.504 147.5l-70.688 46.094 135.61 78.066 1.33-.85c2.5-1.61 6.03-3.89 10.242-6.613 8.42-5.443 19.563-12.66 30.674-19.86 16.002-10.37 24.248-15.72 31.916-20.694L227.504 147.5zm115.467 1.17a8.583 14.437 82.068 0 1 .003 0 8.583 14.437 82.068 0 1 8.32 1.945 8.583 14.437 82.068 0 1-.87 12.282 8.583 14.437 82.068 0 1-20.273 1.29 8.583 14.437 82.068 0 1 .87-12.28 8.583 14.437 82.068 0 1 11.95-3.237zm-218.423 47.115L19.143 263.44l23.537 13.333-23.842 15.305 24.828 14.063-24.828 15.938 24.828 14.063-24.828 15.938 166.135 94.106L285.277 381.8v-11.72l-99.433 63.824L39.11 350.787l14.255-9.15 131.608 74.547L285.277 351.8v-11.72l-99.433 63.824L39.11 320.787l14.255-9.15 131.608 74.547L285.277 321.8v-11.72l-99.433 63.824L39.11 290.787l13.27-8.52 132.9 75.28 99.997-64.188v-5.05l-5.48-3.154-93.65 60.11-146.73-83.116 94.76-60.824-9.63-5.543zm20.46 11.78-46.92 30.115c14.41 11.374 13.21 28.348-2.942 41.67l59.068 33.46c21.037-10.557 49.057-12.342 68.787-4.384l45.965-29.504-123.96-71.358zm229.817 32.19c-8.044 5.217-15.138 9.822-30.363 19.688a36221.458 36221.458 0 0 1-30.69 19.873c-4.217 2.725-7.755 5.01-10.278 6.632-.09.06-.127.08-.215.137v85.924l71.547-48.088v-84.166zm-200.99 17.48a8.583 14.437 82.068 0 1 8.32 1.947 8.583 14.437 82.068 0 1-.87 12.28 8.583 14.437 82.068 0 1-20.27 1.29 8.583 14.437 82.068 0 1 .87-12.28 8.583 14.437 82.068 0 1 11.95-3.236z" fill="currentColor"></path></g></svg>
            <span class="max-md:hidden">Salary:</span>
            <span class="">${player.salary}</span>
          </span>

          <div class="flex gap-1 items-center">
            <span class="max-md:hidden">Pay Raises:</span>

            <div class="size-7 rounded-full border border-dashed flex items-center justify-center {player.payRaises >= 1 && 'border-solid bg-green-100 dark:bg-green-900'}">+$1</div>
      <div class="size-7 rounded-full border border-dashed flex items-center justify-center {player.payRaises >= 2 && 'border-solid bg-green-100 dark:bg-green-900'}">+$3</div>
          </div>

          <span class="bg-neutral-50 dark:bg-neutral-950 flex gap-1 px-1 py-0.5 rounded-md items-center text-pink-700 dark:text-pink-300" title="Access Fee">
          <svg class="Icon size-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g class="" transform="translate(0,0)" style=""><path d="M272.824 24.318c-14.929.312-25.66 3.246-32.767 8.446L142.899 84.91l-54.106 73.514C77.42 175.98 85.518 210 121.112 188.197l38.9-51.351c49.476-42.711 150.484-23.032 102.586 62.591-23.53 49.582-12.457 73.79 17.76 83.95l13.812-46.381c23.95-53.825 68.502-63.51 66.684-106.905l107.303 7.725-.866-112.045zm-54.09 103.338c-17.41-.3-34.485 6.898-46.92 17.375l-39.044 51.33c10.713 8.506 21.413 3.959 32.125-6.363 12.626 6.394 22.365-3.522 30.365-23.297 3.317-13.489 8.21-23.037 23.475-39.045zm-32.617 88.324a13.49 13.49 0 0 0-5.232 1.235l-129.164 59.51c-6.784 3.13-9.763 11.202-6.633 17.992l85.27 185.08c3.132 6.783 11.205 9.779 18 6.635l129.15-59.504c6.796-3.137 9.777-11.198 6.647-18L198.87 223.86c-2.343-5.097-7.473-8.043-12.754-7.88zm-29.767 50.06c7.794.113 14.913 2.053 21.092 5.847 10.758 6.604 18.63 20.93 19.644 35.754.698 10.184-1.712 17.837-12.553 39.873-3.879 7.885-5.634 15.27-5.072 21.355.46 4.973.786 5.855 3.639 9.844l3.135 4.38-1.754.98c-.965.538-7.097 3.1-13.627 5.693-6.918 2.746-12.316 4.496-12.934 4.193-.583-.286-2.352-2.62-3.931-5.188-7.525-12.227-7.225-27.53.878-44.627 6.655-14.04 8.47-19.966 7.952-25.974-.815-9.44-6.743-16.478-14.834-17.617-6.021-.848-10.668.553-18.912 5.703-8.298 5.183-13.941 10.708-19.055 18.656-1.8 2.797-3.407 5.053-3.57 5.014-.164-.04-3.206-7.256-6.758-16.037l-6.46-15.967 3.23-3.666c5.809-6.598 11.758-11.166 22.226-17.065 13.44-7.573 26.273-11.314 37.664-11.15zm33.308 133.048c6.463.125 12.18 3.215 15.7 8.963 4.296 7.015 4.185 13.838-.334 20.752-2.89 4.42-8.953 8.313-15.04 9.654-15.132 3.335-28.038-9.343-23.726-23.307 1.817-5.885 5.325-9.937 11.273-13.02 4.104-2.125 8.25-3.117 12.127-3.042z" fill="currentColor"></path></g></svg>
            <span class="max-md:hidden ">Access Fee:</span>

            <span class=" ">${player.accessFee}</span>
          </span>
          
          <span class="bg-neutral-50 dark:bg-neutral-950 flex gap-1 px-1 py-0.5 rounded-md items-center text-red-600 dark:text-red-400" title="Assurance">
          <svg class="Icon size-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g class="" transform="translate(0,0)" style=""><path d="M256 38.013c-22.458 0-66.472 110.3-84.64 123.502-18.17 13.2-136.674 20.975-143.614 42.334-6.94 21.358 84.362 97.303 91.302 118.662 6.94 21.36-22.286 136.465-4.116 149.665 18.17 13.2 118.61-50.164 141.068-50.164 22.458 0 122.9 63.365 141.068 50.164 18.17-13.2-11.056-128.306-4.116-149.665 6.94-21.36 98.242-97.304 91.302-118.663-6.94-21.36-125.444-29.134-143.613-42.335-18.168-13.2-62.182-123.502-84.64-123.502z" fill="currentColor"></path></g></svg>
            <span class="max-md:hidden">Assurance:</span>

            <span class="">{player.assurance}</span>
          </span>
        
        {#if player.inCollege}
          <span class=" uppercase bg-amber-500 text-black px-1.5 py-0.5 rounded">In College</span>
        {:else if player.payRaises >= 3}
          <span class=" uppercase bg-emerald-500 text-white px-1.5 py-0.5 rounded">Career Maxed</span>
        {/if}

        {#if player.crossedSuccessfully === true}
          <span class=" uppercase bg-emerald-500 text-white px-1.5 py-0.5 rounded">Crossed</span>
        {:else if player.crossedSuccessfully === false}
          <span class=" uppercase bg-rose-500 text-white px-1.5 py-0.5 rounded">Blocked</span>
        {/if}  
  </div>

  <!-- Requirements Subheader -->
  <div class="text-xs lg:text-sm text-left mb-2 px-3 py-1.5 bg-neutral-100 dark:bg-neutral-900 rounded-md flex flex-col gap-1 items-start">
    <p><strong>{player.destination}:</strong> <span class="">{getDestinationInfoText(player.destination)}</span></p>
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
  <div class="flex max-lg:flex-col lg:flex-wrap justify-center gap-2 p-4 rounded-md bg-neutral-50 dark:bg-neutral-950">
    <!-- 1. Documents -->
    <div class="flex flex-col items-start p-2 rounded-md bg-neutral-200 dark:bg-neutral-800">
      <div class="uppercase tracking-wide text-xs mb-1">Docs ({player.stash.documents.length})</div>
      {#each player.stash.documents as doc, i (doc.id)}
        {@const isSel = selectedStash && selectedStash.playerIdx === player.id && selectedStash.stashType === 'document' && selectedStash.itemIdx === i}
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div 
          class="stash-item bg-neutral-50 dark:bg-neutral-900 px-2 py-1 rounded-md flex items-center gap-1.5 {isSel ? 'selected' : ''}" 
          style="border-left: 2.5px solid var(--color-emi-document);" 
          onclick={(e) => handleStashClick(e, 'document', i)}
        >
          {#if doc.icon}
            <Icon icon={doc.icon.includes(':') ? doc.icon : `game-icons:${doc.icon}`} class="size-4 shrink-0" />
          {/if}
          <span class="truncate pr-1">{doc.name}</span>
          <span class="text-xs  font-bold">${doc.cost || 0}</span>
        </div>
      {/each}
    </div>

    <!-- 2. Connections -->
    <div class="flex flex-col items-start p-2 rounded-md bg-neutral-200 dark:bg-neutral-800">
      <div class="uppercase tracking-wide text-xs mb-1">Conns ({player.stash.connections.length})</div>
      {#each player.stash.connections as conn, i (conn.id)}
        {@const isSel = selectedStash && selectedStash.playerIdx === player.id && selectedStash.stashType === 'connection' && selectedStash.itemIdx === i}
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div 
          class="stash-item bg-neutral-50 dark:bg-neutral-900 px-2 py-1 rounded-md flex items-center gap-1.5 {isSel ? 'selected' : ''}" 
          style="border-left: 2.5px solid var(--color-emi-connection);" 
          onclick={(e) => handleStashClick(e, 'connection', i)}
        >
          {#if conn.icon}
            <Icon icon={conn.icon.includes(':') ? conn.icon : `game-icons:${conn.icon}`} class="size-4 shrink-0" />
          {/if}
          <span class="truncate pr-1">{conn.name}</span>
          <span class="text-xs  font-bold">${conn.cost || 0}</span>
        </div>
      {/each}
    </div>

    <!-- 3. Tickets -->
    <div class="flex flex-col items-start p-2 rounded-md bg-neutral-200 dark:bg-neutral-800">
      <div class="uppercase tracking-wide text-xs mb-1">Tickets ({player.stash.tickets})</div>
      {#each Array(player.stash.tickets) as _, i}
        {@const isSel = selectedStash && selectedStash.playerIdx === player.id && selectedStash.stashType === 'ticket' && selectedStash.itemIdx === i}
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div 
          class="stash-item bg-neutral-50 dark:bg-neutral-900 px-2 py-1 rounded-md flex items-center gap-1.5 {isSel ? 'selected' : ''}" 
          style="border-left: 2.5px solid var(--color-emi-ticket);" 
          onclick={(e) => handleStashClick(e, 'ticket', i)}
        >
          <Icon icon="game-icons:ticket" class="size-4 shrink-0" />
          <span>Ticket</span>
        </div>
      {/each}
    </div>

    <!-- 4. Passports -->
    <div class="flex flex-col items-start p-2 rounded-md bg-neutral-200 dark:bg-neutral-800">
      <div class="uppercase tracking-wide text-xs mb-1">Passports ({player.stash.passports})</div>
      {#each Array(player.stash.passports) as _, i}
        {@const isSel = selectedStash && selectedStash.playerIdx === player.id && selectedStash.stashType === 'passport' && selectedStash.itemIdx === i}
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div 
          class="stash-item bg-neutral-50 dark:bg-neutral-900 px-2 py-1 rounded-md flex items-center gap-1.5 {isSel ? 'selected' : ''}" 
          style="border-left: 2.5px solid var(--color-emi-passport);" 
          onclick={(e) => handleStashClick(e, 'passport', i)}
        >
          <Icon icon="game-icons:passport" class="size-4 shrink-0" />
          <span>Passport</span>
        </div>
      {/each}
    </div>

    <!-- 5. Kept Life -->
    <div class="flex flex-col items-start p-2 rounded-md bg-neutral-200 dark:bg-neutral-800">
      <div class="uppercase tracking-wide text-xs mb-1">Life ({player.stash.lifeCards.length})</div>
      {#each player.stash.lifeCards as lc, i (lc.id)}
        {@const isSel = selectedStash && selectedStash.playerIdx === player.id && selectedStash.stashType === 'lifeCard' && selectedStash.itemIdx === i}
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div 
          class="stash-item bg-neutral-50 dark:bg-neutral-900 px-2 py-1 rounded-md flex items-center gap-1.5 {isSel ? 'selected' : ''}" 
          style="border-left: 2.5px solid var(--color-emi-life);" 
          onclick={(e) => handleStashClick(e, 'lifeCard', i)}
        >
          {#if lc.icon}
            <Icon icon={lc.icon.includes(':') ? lc.icon : `game-icons:${lc.icon}`} class="size-4 shrink-0" />
          {/if}
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
    pointer-events: none;
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
    pointer-events: none;
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
    z-index: 1;
    user-select: none;
    pointer-events: auto;
  }

  .grid-card * {
    cursor: pointer;
    pointer-events: none;
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
