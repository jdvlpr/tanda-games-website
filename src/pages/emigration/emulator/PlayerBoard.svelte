<script>
  let { engine, player, isActive, onCardSelect, selectedSlot, selectedStash } = $props();

  // Helper to determine if a slot is available
  function isAvailable(slotIdx) {
    if (!engine) return false;
    return engine.isCardAvailable(player, slotIdx);
  }

  function handleLayoutClick(slotIdx) {
    if (!engine || engine.phase !== 'preparation') return;
    if (onCardSelect) onCardSelect({ type: 'layout', playerIdx: player.id, slotIdx });
  }

  function handleStashClick(type, itemIdx) {
    if (!engine || engine.phase !== 'preparation') return;
    if (onCardSelect) onCardSelect({ type: 'stash', playerIdx: player.id, stashType: type, itemIdx });
  }

  // Get color for card type
  function getCardColor(type) {
    switch(type) {
      case 'document': return 'var(--emi-color-document)';
      case 'connection': return 'var(--emi-color-connection)';
      case 'payday': return 'var(--emi-color-payday)';
      case 'life': return 'var(--emi-color-life)';
      default: return '#fff';
    }
  }
</script>

<div class="player-board" class:active={isActive}>
  <div class="player-header">
    <div class="name-badge">
      <span class="name">{player.name}</span>
      <span class="route">{player.nationality} → {player.destination}</span>
    </div>
    <div class="stats">
      <div class="stat"><span>Money</span><strong>${player.money}</strong></div>
      <div class="stat"><span>Salary</span><strong>${player.salary}</strong></div>
      <div class="stat"><span>Assurance</span><strong>{player.assurance}</strong></div>
      <div class="stat" title="Access Fee paid to opponents"><span>Fee</span><strong>${player.accessFee}</strong></div>
    </div>
  </div>

  <div class="career-track">
    <div class="career-label">Career (Pay Raises)</div>
    <div class="slots">
      <div class="career-slot" class:filled={player.payRaises >= 1}>+$1</div>
      <div class="career-slot" class:filled={player.payRaises >= 2}>+$3</div>
      {#if player.inCollege}
        <div class="college-badge">In College</div>
      {/if}
    </div>
  </div>

  <div class="board-content">
    <div class="layout-area">
      <h4>Layout</h4>
      <div class="layout-grid">
        {#each player.layout as slot, i}
          <!-- svelte-ignore a11y_click_events_have_key_events -->
          <!-- svelte-ignore a11y_no_static_element_interactions -->
          <div 
            class="card-slot row-{i <= 3 ? 1 : i <= 6 ? 2 : i <= 10 ? 3 : 4} pos-{i}"
            class:empty={!slot}
            class:face-down={slot && !slot.faceUp}
            class:available={isAvailable(i)}
            class:selected={selectedSlot?.playerIdx === player.id && selectedSlot?.slotIdx === i}
            onclick={() => handleLayoutClick(i)}
          >
            {#if slot}
              {#if slot.faceUp}
                <div class="card-front" style="border-top-color: {getCardColor(slot.card.type)}">
                  <div class="card-type">{slot.card.type}</div>
                  <div class="card-title">{slot.card.name || slot.card.title}</div>
                  {#if slot.card.cost !== undefined}
                    <div class="card-cost">${slot.card.cost}</div>
                  {/if}
                </div>
              {:else}
                <div class="card-back"></div>
              {/if}
            {/if}
          </div>
        {/each}
      </div>
    </div>

    <div class="stash-area">
      <h4>Stash</h4>
      <div class="stash-grid">
        <div class="stash-column documents">
          <h5>Docs ({player.stash.documents.length})</h5>
          <div class="stash-list">
            {#each player.stash.documents as doc, i}
              <!-- svelte-ignore a11y_click_events_have_key_events -->
              <!-- svelte-ignore a11y_no_static_element_interactions -->
              <div 
                class="stash-item"
                style="border-left-color: {getCardColor('document')}"
                class:selected={selectedStash?.playerIdx === player.id && selectedStash?.stashType === 'document' && selectedStash?.itemIdx === i}
                onclick={() => handleStashClick('document', i)}
              >
                {doc.name}
              </div>
            {/each}
          </div>
        </div>

        <div class="stash-column connections">
          <h5>Conns ({player.stash.connections.length})</h5>
          <div class="stash-list">
            {#each player.stash.connections as conn, i}
              <!-- svelte-ignore a11y_click_events_have_key_events -->
              <!-- svelte-ignore a11y_no_static_element_interactions -->
              <div 
                class="stash-item"
                style="border-left-color: {getCardColor('connection')}"
                class:selected={selectedStash?.playerIdx === player.id && selectedStash?.stashType === 'connection' && selectedStash?.itemIdx === i}
                onclick={() => handleStashClick('connection', i)}
              >
                {conn.name}
              </div>
            {/each}
          </div>
        </div>

        <div class="stash-column other">
          <h5>Other</h5>
          <div class="stash-badges">
            <div class="badge ticket" class:has={player.stash.tickets > 0}>
              🎟️ Tickets: {player.stash.tickets}
            </div>
            <div class="badge passport" class:has={player.stash.passports > 0}>
              🛂 Passports: {player.stash.passports}
            </div>
          </div>
          {#if player.stash.lifeCards.length > 0}
            <h5 style="margin-top: 8px;">Life Cards</h5>
            <div class="stash-list">
              {#each player.stash.lifeCards as lc}
                <div class="stash-item life" style="border-left-color: {getCardColor('life')}">
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

<style>
  .player-board {
    background: var(--emi-bg-panel, rgba(30, 41, 59, 0.5));
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 12px;
    padding: 16px;
    margin-bottom: 24px;
    transition: all 0.3s ease;
    font-family: var(--emi-font-ui, 'Public Sans', sans-serif);
    color: var(--emi-text-main, #f8fafc);
  }

  .player-board.active {
    border-color: var(--emi-color-accent, #55b7b0);
    box-shadow: 0 0 20px rgba(85, 183, 176, 0.1);
  }

  .player-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    padding-bottom: 12px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    flex-wrap: wrap;
    gap: 12px;
  }

  .name-badge {
    display: flex;
    flex-direction: column;
  }

  .name {
    font-size: 1.2rem;
    font-weight: 700;
    font-family: var(--emi-font-heading, 'Marvin Round', 'Public Sans', sans-serif);
  }

  .route {
    font-size: 0.85rem;
    color: var(--emi-text-muted, #94a3b8);
  }

  .stats {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
  }

  .stat {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: rgba(0, 0, 0, 0.2);
    padding: 6px 12px;
    border-radius: 8px;
  }

  .stat span {
    font-size: 0.7rem;
    text-transform: uppercase;
    color: var(--emi-text-muted, #94a3b8);
    letter-spacing: 0.5px;
  }

  .stat strong {
    font-size: 1.1rem;
    font-weight: 600;
  }

  .career-track {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 20px;
    background: rgba(0, 0, 0, 0.1);
    padding: 8px 12px;
    border-radius: 8px;
  }

  .career-label {
    font-size: 0.85rem;
    color: var(--emi-text-muted, #94a3b8);
  }

  .slots {
    display: flex;
    gap: 8px;
    align-items: center;
  }

  .career-slot {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: 2px dashed rgba(255, 255, 255, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.3);
  }

  .career-slot.filled {
    border-style: solid;
    border-color: var(--emi-color-payday, #f9c552);
    background: rgba(249, 197, 82, 0.1);
    color: var(--emi-color-payday, #f9c552);
    font-weight: bold;
  }

  .college-badge {
    background: var(--emi-color-accent, #55b7b0);
    color: #000;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 0.75rem;
    font-weight: bold;
    margin-left: 8px;
  }

  .board-content {
    display: grid;
    grid-template-columns: minmax(300px, 1.5fr) 1fr;
    gap: 24px;
  }

  @media (max-width: 1024px) {
    .board-content {
      grid-template-columns: 1fr;
    }
  }

  h4 {
    margin-top: 0;
    margin-bottom: 12px;
    font-size: 0.9rem;
    text-transform: uppercase;
    color: var(--emi-text-muted, #94a3b8);
    letter-spacing: 1px;
  }

  /* DAG Layout Grid */
  .layout-grid {
    display: grid;
    /* 4 columns for max width, with overlapping */
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: 80px; /* Overlapping rows */
    gap: 8px;
    position: relative;
    padding-bottom: 40px;
  }

  .card-slot {
    width: 100%;
    height: 110px;
    border-radius: 8px;
    position: relative;
    z-index: 1;
    transition: all 0.2s;
  }

  /* Positional logic for the pyramid/staggered layout */
  .pos-0 { grid-column: 1; grid-row: 1; }
  .pos-1 { grid-column: 2; grid-row: 1; }
  .pos-2 { grid-column: 3; grid-row: 1; }
  .pos-3 { grid-column: 4; grid-row: 1; }

  /* Row 2 is 3 cards staggered */
  .pos-4 { grid-column: 1 / span 2; grid-row: 2; margin-left: 50%; z-index: 2; }
  .pos-5 { grid-column: 2 / span 2; grid-row: 2; margin-left: 50%; z-index: 2; }
  .pos-6 { grid-column: 3 / span 2; grid-row: 2; margin-left: 50%; z-index: 2; }

  /* Row 3 is 4 cards */
  .pos-7 { grid-column: 1; grid-row: 3; z-index: 3; }
  .pos-8 { grid-column: 2; grid-row: 3; z-index: 3; }
  .pos-9 { grid-column: 3; grid-row: 3; z-index: 3; }
  .pos-10 { grid-column: 4; grid-row: 3; z-index: 3; }

  /* Row 4 is 3 cards staggered */
  .pos-11 { grid-column: 1 / span 2; grid-row: 4; margin-left: 50%; z-index: 4; }
  .pos-12 { grid-column: 2 / span 2; grid-row: 4; margin-left: 50%; z-index: 4; }
  .pos-13 { grid-column: 3 / span 2; grid-row: 4; margin-left: 50%; z-index: 4; }

  .card-slot.empty {
    border: 1px dashed rgba(255, 255, 255, 0.1);
    background: transparent;
  }

  .card-slot:not(.empty) {
    background: #1e293b;
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  }

  .card-slot.face-down {
    background: repeating-linear-gradient(
      45deg,
      #1e293b,
      #1e293b 10px,
      #0f172a 10px,
      #0f172a 20px
    );
    opacity: 0.6;
  }

  .card-slot.available {
    cursor: pointer;
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
    z-index: 10;
  }

  .card-slot.available:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
  }

  .card-slot.selected {
    outline: 2px solid var(--emi-color-accent, #55b7b0);
    outline-offset: 2px;
    z-index: 20;
  }

  .card-front {
    padding: 8px;
    height: 100%;
    display: flex;
    flex-direction: column;
    border-top: 4px solid transparent;
    border-radius: 7px;
  }

  .card-type {
    font-size: 0.6rem;
    text-transform: uppercase;
    color: var(--emi-text-muted, #94a3b8);
    margin-bottom: 4px;
  }

  .card-title {
    font-size: 0.8rem;
    font-weight: 600;
    line-height: 1.2;
    flex-grow: 1;
  }

  .card-cost {
    font-size: 0.9rem;
    font-weight: bold;
    align-self: flex-end;
    background: rgba(0,0,0,0.3);
    padding: 2px 6px;
    border-radius: 4px;
  }

  /* Stash Area */
  .stash-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }

  @media (max-width: 600px) {
    .stash-grid {
      grid-template-columns: 1fr;
    }
  }

  .stash-column h5 {
    margin-top: 0;
    margin-bottom: 8px;
    font-size: 0.8rem;
    color: var(--emi-text-muted, #94a3b8);
  }

  .stash-list {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .stash-item {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-left: 3px solid transparent;
    padding: 6px 8px;
    border-radius: 4px;
    font-size: 0.8rem;
    cursor: pointer;
    transition: background 0.2s;
  }

  .stash-item:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  .stash-item.selected {
    outline: 1px solid var(--emi-color-accent, #55b7b0);
    background: rgba(85, 183, 176, 0.1);
  }

  .stash-item.life {
    cursor: default;
  }

  .stash-item.life:hover {
    background: rgba(255, 255, 255, 0.05);
  }

  .stash-badges {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .badge {
    padding: 6px 8px;
    border-radius: 4px;
    font-size: 0.8rem;
    background: rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.05);
    opacity: 0.5;
  }

  .badge.has {
    opacity: 1;
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.2);
  }
</style>
