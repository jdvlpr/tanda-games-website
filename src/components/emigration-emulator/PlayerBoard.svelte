<script>
  import Icon from "@iconify/svelte";
  import StashCard from "./StashCard.svelte";
  import { SALARY_RAISES } from "./engine.svelte";
  let {
    engine,
    player,
    isActive,
    onCardSelect,
    selectedSlot,
    selectedStash,
    snapshot,
    autoScrollEnabled = true,
  } = $props();

  let boardEl = null;
  let wasActive = false;

  let isRow1Empty = $derived(
    !player.layout[0] &&
      !player.layout[1] &&
      !player.layout[2] &&
      !player.layout[3],
  );
  let isRow2Empty = $derived(
    !player.layout[4] && !player.layout[5] && !player.layout[6],
  );
  let isRow3Empty = $derived(
    !player.layout[7] &&
      !player.layout[8] &&
      !player.layout[9] &&
      !player.layout[10],
  );
  let isRow4Empty = $derived(
    !player.layout[11] && !player.layout[12] && !player.layout[13],
  );
  let isLayoutEmpty = $derived(isRow1Empty && isRow2Empty);

  $effect(() => {
    if (
      autoScrollEnabled &&
      isActive &&
      !wasActive &&
      boardEl &&
      snapshot.turnNumber > 1
    ) {
      requestAnimationFrame(() => {
        boardEl?.scrollIntoView({ behavior: "smooth", block: "start" });
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
    if (!engine || engine.phase !== "preparation") return;
    if (!isAvailable(slotIdx)) return;
    if (onCardSelect)
      onCardSelect({
        type: "layout",
        playerIdx: player.id,
        slotIdx,
        anchorEl: e.currentTarget,
      });
  }

  function handleStashClick(e, type, itemIdx) {
    if (!engine || engine.phase !== "preparation") return;
    if (onCardSelect)
      onCardSelect({
        type: "stash",
        playerIdx: player.id,
        stashType: type,
        itemIdx,
        anchorEl: e.currentTarget,
      });
  }
</script>

{#snippet cardSlot(slotIdx)}
  {@const slot = player.layout[slotIdx]}
  {#if !slot}
    <div
      class="w-[clamp(60px,18vw,100px)] shrink-0 h-[110px] md:h-[125px] mx-1 sm:mx-2 relative pointer-events-none empty"
    ></div>
  {:else}
    {@const isCov = engine ? engine.isCardCovered(player, slotIdx) : false}
    {@const isAvail = isAvailable(slotIdx)}
    {@const isSelected =
      selectedSlot &&
      selectedSlot.playerIdx === player.id &&
      selectedSlot.slotIdx === slotIdx}
    {@const c = slot.card}

    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div
      class="w-[clamp(60px,18vw,100px)] shrink-0 h-[110px] md:h-[125px] mx-1 sm:mx-2 relative pointer-events-none"
    >
      <div
        class="grid-card border rounded-2xl shadow-md {slot.faceUp
          ? 'bg-neutral-50 dark:bg-neutral-950'
          : 'back bg-neutral-400 dark:bg-neutral-600'} {slot.faceUp
          ? c.type
          : ''} {isCov ? 'covered' : ''} {isAvail
          ? 'available'
          : ''} {isSelected ? 'selected' : ''}"
        style={isSelected
          ? "box-shadow: 0 0 10px rgba(85, 183, 176, 0.8) !important;"
          : ""}
        onclick={(e) => handleLayoutClick(e, slotIdx)}
      >
        {#if slot.faceUp}
          <p class="text-xs capitalize truncate">{c.type}</p>
          {#if c.icon}
            <div class="flex items-center justify-center my-0.5">
              <Icon
                icon={c.icon.includes(":") ? c.icon : `game-icons:${c.icon}`}
                class="size-8"
              />
            </div>
          {/if}
          <div class="text-xs line-clamp-2 break-normal">
            {c.name || c.title}
          </div>
          <div class="text-xs font-bold">
            {c.cost !== undefined ? `$${c.cost}` : ""}
          </div>
        {/if}
      </div>
    </div>
  {/if}
{/snippet}

<div
  bind:this={boardEl}
  class={["transition-all duration-300 scroll-mt-[6rem] flex-1"]}
>
  <div
    class={[
      "flex p-2 pb-4 flex-col gap-4 rounded-2xl",
      isActive
        ? "border-2 border-amber-400 dark:border-amber-600 shadow-md shadow-amber-200/50 dark:shadow-amber-800/50"
        : "border-2 border-neutral-200 dark:border-neutral-800",
    ]}
  >
    <div class="flex flex-col gap-2 items-center justify-start">
      <!-- Player Header Info -->
      <div class="flex flex-col gap-1">
        <p class={["text-2xl font-bold"]}>
          {player.name}
        </p>
        <p
          class="flex gap-1 justify-center items-center text-md"
          title="{player.name}'s Nationality and (Starting Money)"
        >
          <span class="fi fi-{player.nationality.countryCode}"></span>
          <span class="opacity-70">{player.nationality.name}</span>
        </p>
        <span
          class="flex gap-1 items-center justify-center opacity-70"
          title="{player.name}'s college tuition (plus a die roll amount of Money, and potentially discounted based on the die roll)"
        >
          <span class="text-xs">${player.startingMoney} Starting Money</span>
          <span class="text-xs">${player.collegeFund} College Fund</span>
          <!-- <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                class="size-5"
                ><g class="" transform="translate(0,0)" style=""
                  ><path
                    d="M256 89.61 22.486 177.18 256 293.937l111.22-55.61-104.337-31.9A16 16 0 0 1 256 208a16 16 0 0 1-16-16 16 16 0 0 1 16-16l-2.646 8.602 18.537 5.703a16 16 0 0 1 .008.056l27.354 8.365L455 246.645v12.146a16 16 0 0 0-7 13.21 16 16 0 0 0 7.293 13.406C448.01 312.932 448 375.383 448 400c16 10.395 16 10.775 32 0 0-24.614-.008-87.053-7.29-114.584A16 16 0 0 0 480 272a16 16 0 0 0-7-13.227v-25.42L413.676 215.1l75.838-37.92L256 89.61zM119.623 249 106.5 327.74c26.175 3.423 57.486 18.637 86.27 36.627 16.37 10.232 31.703 21.463 44.156 32.36 7.612 6.66 13.977 13.05 19.074 19.337 5.097-6.288 11.462-12.677 19.074-19.337 12.453-10.897 27.785-22.128 44.156-32.36 28.784-17.99 60.095-33.204 86.27-36.627L392.375 249h-6.25L256 314.063 125.873 249h-6.25z"
                    fill="currentColor"
                  /></g
                ></svg
              > -->
        </span>
      </div>

      <div class="flex flex-wrap gap-1 justify-center items-start">
        <span
          class="flex gap-1 items-center text-green-700 dark:text-green-300 w-fit px-2 py-1 bg-green-200 dark:bg-green-800 rounded-2xl"
          title="Current amount of Money"
        >
          <strong class="font-bold text-md">${player.money}</strong>
          <span class="text-xs">Money</span>
        </span>

        <span
          class="flex gap-1 items-center text-pink-700 dark:text-pink-300 px-2 py-1 bg-pink-200 dark:bg-pink-800 rounded-2xl"
          title="Access Fee"
        >
          <span class="font-bold text-md">${player.accessFee}</span>
          <span class="text-xs">Access Fee</span>
        </span>

        <span
          class="flex gap-1 items-center px-2 py-1 bg-teal-200 dark:bg-teal-800 rounded-2xl"
          title="Current salary"
        >
          <span class="font-bold text-md">${player.salary}</span>
          <span class="text-xs">Salary</span>
          <div class="flex gap-2 items-center">
            <div
              class="size-7 rounded-full border border-dashed flex items-center justify-center text-xs {player.payRaises ===
                1 && 'border-solid bg-green-100 dark:bg-green-900'}"
            >
              +${SALARY_RAISES[0]}
            </div>
            <div
              class="size-7 rounded-full border border-dashed flex items-center justify-center text-xs {player.payRaises ===
                2 && 'border-solid bg-green-100 dark:bg-green-900'}"
            >
              +${SALARY_RAISES[1]}
            </div>
          </div>
        </span>

        <span
          class="flex gap-1 items-center text-red-600 dark:text-red-400 px-2 py-1 bg-red-200 dark:bg-red-800 rounded-2xl"
          title="Assurance"
        >
          <span class="font-bold text-md">{player.assurance}</span>
          <Icon icon="game-icons:round-star" class="size-4 shrink-0" />
          <span class="text-xs">Assurance</span>
        </span>
      </div>

      <div class="flex flex-wrap gap-1 justify-center items-start">
        {#if player.inCollege}
          <span
            class=" font-bold tracking-wide bg-amber-300 dark:bg-amber-700 px-2 py-1 rounded-2xl text-sm"
            >In College</span
          >
        {/if}

        {#if player.crossedSuccessfully === true}
          <span
            class=" font-bold tracking-wide bg-emerald-500 text-white px-2 py-1 rounded-2xl text-sm"
            >Crossed</span
          >
        {:else if player.crossedSuccessfully === false}
          <span
            class=" font-bold tracking-wide bg-rose-500 text-white px-2 py-1 rounded-2xl text-sm"
            >Blocked</span
          >
        {/if}
      </div>
    </div>

    <!-- Card Layout (Row 1-4 Vertical Stacked Overlap) -->
    {#if engine && engine.phase === "preparation"}
      <div class={["mb-2", !isLayoutEmpty && "pb-18"]}>
        <!-- Row 1 -->
        <div class={["layout-row row-1", isRow1Empty && "h-0!"]}>
          {@render cardSlot(0)}
          {@render cardSlot(1)}
          {@render cardSlot(2)}
          {@render cardSlot(3)}
        </div>
        <!-- Row 2 -->
        <div class={["layout-row row-2", isRow2Empty && "h-0!"]}>
          {@render cardSlot(4)}
          {@render cardSlot(5)}
          {@render cardSlot(6)}
        </div>
        <!-- Row 3 -->
        <div class={["layout-row row-3", isRow3Empty && "h-0!"]}>
          {@render cardSlot(7)}
          {@render cardSlot(8)}
          {@render cardSlot(9)}
          {@render cardSlot(10)}
        </div>
        <!-- Row 4 -->
        <div class={["layout-row row-4", isRow4Empty && "h-0!"]}>
          {@render cardSlot(11)}
          {@render cardSlot(12)}
          {@render cardSlot(13)}
        </div>
      </div>
    {:else}
      <div
        class="text-center py-6 text-sm font-bold bg-black/15 rounded-2xl border border-dashed border-white/5 mb-4"
      >
        Layout Cleared (Crossing / Game Over Phase)
      </div>
    {/if}

    <!-- Destination Card -->
    <div class="text-left flex flex-col gap-1">
      <div class="flex flex-col gap-0 items-center">
        <p class="text-xs opacity-70">Destination</p>
        <p class="font-bold">
          <span class="fi fi-{player.destination.countryCode} pr-1"></span>
          {player.destination.name}
        </p>
      </div>
      <div class="flex max-lg:flex-col lg:flex-wrap justify-center gap-2">
        <div
          class="flex flex-col items-center gap-0 text-sm p-2 rounded-2xl bg-neutral-200 dark:bg-neutral-800 h-fit"
        >
          <p class="">Money ({player.money})</p>
          <div class="">
            <span class="font-bold"
              >≥{player.destination.targets.m.setSize}</span
            >
            =
            <span
              class="inline-flex gap-0.5 items-center text-red-600 dark:text-red-400 shrink-0 font-semibold"
            >
              +{player.destination.targets.m.reward}
              <Icon icon="game-icons:round-star" class="size-3" />
            </span>
          </div>
          <div>
            {#if player.destination.targets.m.minRequired && player.destination.targets.m.penalty}
              <span class="font-bold"
                >{`<`}{player.destination.targets.m.minRequired}</span
              >
              =
              <span
                class="inline-flex gap-0.5 items-center text-red-600 dark:text-red-400 shrink-0 font-semibold"
              >
                -{player.destination.targets.m.penalty}
                <Icon icon="game-icons:round-star" class="size-3" />
              </span>
            {/if}
          </div>
        </div>
        <!-- Documents -->
        <div
          class="flex flex-col items-center gap-0 text-sm p-2 rounded-2xl bg-neutral-200 dark:bg-neutral-800 h-fit"
        >
          <p>
            Documents {#if player.stash.documents.length}
              ({player.stash.documents.length})
            {/if}
          </p>
          <div class="">
            <span class="font-bold"
              >≥{player.destination.targets.d.setSize}</span
            >
            =
            <span
              class="inline-flex gap-0.5 items-center text-red-600 dark:text-red-400 shrink-0 font-semibold"
            >
              +{player.destination.targets.d.reward}
              <Icon icon="game-icons:round-star" class="size-3" />
            </span>
          </div>
          <div>
            {#if player.destination.targets.d.minRequired && player.destination.targets.d.penalty}
              <span class="font-bold"
                >{`<`}{player.destination.targets.d.minRequired}</span
              >
              =
              <span
                class="inline-flex gap-0.5 items-center text-red-600 dark:text-red-400 shrink-0 font-semibold"
              >
                -{player.destination.targets.d.penalty}
                <Icon icon="game-icons:round-star" class="size-3" />
              </span>
            {/if}
          </div>
          {#if player.stash.documents.length}
            <div class="mt-2">
              {#each player.stash.documents as doc, i (doc.id)}
                {@const isSel =
                  selectedStash &&
                  selectedStash.playerIdx === player.id &&
                  selectedStash.stashType === "document" &&
                  selectedStash.itemIdx === i}
                <StashCard
                  card={doc}
                  stashType="document"
                  isSelected={isSel}
                  onclick={(e) => handleStashClick(e, "document", i)}
                />
              {/each}
            </div>
          {/if}
        </div>

        <!-- Connections -->
        <div
          class="flex flex-col items-center gap-0 text-sm p-2 rounded-2xl bg-neutral-200 dark:bg-neutral-800 h-fit"
        >
          <p>
            Connections {#if player.stash.connections.length}
              ({player.stash.connections.length})
            {/if}
          </p>
          <div class="">
            <span class="font-bold"
              >≥{player.destination.targets.c.setSize}</span
            >
            =
            <span
              class="inline-flex gap-0.5 items-center text-red-600 dark:text-red-400 shrink-0 font-semibold"
            >
              +{player.destination.targets.c.reward}
              <Icon icon="game-icons:round-star" class="size-3" />
            </span>
          </div>
          <div>
            {#if player.destination.targets.c.minRequired && player.destination.targets.c.penalty}
              <span class="font-bold"
                >{`<`}{player.destination.targets.c.minRequired}</span
              >
              =
              <span
                class="inline-flex gap-0.5 items-center text-red-600 dark:text-red-400 shrink-0 font-semibold"
              >
                -{player.destination.targets.c.penalty}
                <Icon icon="game-icons:round-star" class="size-3" />
              </span>
            {/if}
          </div>
          {#if player.stash.connections.length}
            <div class="flex flex-col items-start mt-2">
              {#each player.stash.connections as conn, i (conn.id)}
                {@const isSel =
                  selectedStash &&
                  selectedStash.playerIdx === player.id &&
                  selectedStash.stashType === "connection" &&
                  selectedStash.itemIdx === i}
                <StashCard
                  card={conn}
                  stashType="connection"
                  isSelected={isSel}
                  onclick={(e) => handleStashClick(e, "connection", i)}
                />
              {/each}
            </div>
          {/if}
        </div>
      </div>
    </div>

    <!-- Column Stash Display -->
    {#if player.stash.documents.length || player.stash.connections.length || player.stash.tickets || player.stash.passports || player.stash.lifeCards.length}
      <div class="flex max-lg:flex-col lg:flex-wrap justify-center gap-2">
        <!-- Tickets -->
        {#if player.stash.tickets}
          <div
            class="flex flex-col items-center gap-0 text-sm p-2 rounded-2xl bg-neutral-200 dark:bg-neutral-800 h-fit"
          >
            <div class="uppercase tracking-wide text-xs mb-1">
              Tickets ({player.stash.tickets})
            </div>
            {#each Array(player.stash.tickets) as _, i}
              {@const isSel =
                selectedStash &&
                selectedStash.playerIdx === player.id &&
                selectedStash.stashType === "ticket" &&
                selectedStash.itemIdx === i}
              <StashCard
                card={{ name: "Ticket" }}
                stashType="ticket"
                isSelected={isSel}
                onclick={(e) => handleStashClick(e, "ticket", i)}
              />
            {/each}
          </div>
        {/if}

        <!-- Passports -->
        {#if player.stash.passports}
          <div
            class="flex flex-col items-center gap-0 text-sm p-2 rounded-2xl bg-neutral-200 dark:bg-neutral-800 h-fit"
          >
            <div class="uppercase tracking-wide text-xs mb-1">
              Passports ({player.stash.passports})
            </div>
            {#each Array(player.stash.passports) as _, i}
              {@const isSel =
                selectedStash &&
                selectedStash.playerIdx === player.id &&
                selectedStash.stashType === "passport" &&
                selectedStash.itemIdx === i}
              <StashCard
                card={{ name: "Passport" }}
                stashType="passport"
                isSelected={isSel}
                onclick={(e) => handleStashClick(e, "passport", i)}
              />
            {/each}
          </div>
        {/if}

        <!-- Kept Life -->
        {#if player.stash.lifeCards.length}
          <div
            class="flex flex-col items-center gap-0 text-sm p-2 rounded-2xl bg-neutral-200 dark:bg-neutral-800 h-fit"
          >
            <div class="uppercase tracking-wide text-xs mb-1">
              Life Cards ({player.stash.lifeCards.length})
            </div>
            {#each player.stash.lifeCards as lc, i (lc.id)}
              {@const isSel =
                selectedStash &&
                selectedStash.playerIdx === player.id &&
                selectedStash.stashType === "lifeCard" &&
                selectedStash.itemIdx === i}
              <StashCard
                card={lc}
                stashType="lifeCard"
                isSelected={isSel}
                onclick={(e) => handleStashClick(e, "lifeCard", i)}
              />
            {/each}
          </div>
        {/if}
      </div>
    {/if}
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

  .row-1 {
    z-index: 10;
  }
  .row-2 {
    z-index: 20;
  }
  .row-3 {
    z-index: 30;
  }
  .row-4 {
    z-index: 40;
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
    transition:
      transform 0.2s,
      box-shadow 0.2s,
      border-color 0.2s,
      opacity 0.2s;
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
    border-left: 4px solid var(--color-emi-document);
    border-right: 4px solid var(--color-emi-document);
  }
  .grid-card.connection {
    border-color: var(--color-emi-connection);
    border-left: 4px solid var(--color-emi-connection);
    border-right: 4px solid var(--color-emi-connection);
  }
  .grid-card.payday {
    border-color: var(--color-emi-payday);
    border-left: 4px solid var(--color-emi-payday);
    border-right: 4px solid var(--color-emi-payday);
  }
  .grid-card.life {
    border-color: var(--color-emi-life);
    border-left: 4px solid var(--color-emi-life);
    border-right: 4px solid var(--color-emi-life);
  }

  .grid-card.covered {
    cursor: not-allowed;
  }

  .grid-card.available {
    box-shadow: 0 0 5px rgba(85, 183, 176, 0.3);
  }

  @media (hover: hover) {
    .grid-card.available:hover {
      transform: translateY(-4px) scale(1.05);
      box-shadow: 0 8px 16px rgba(85, 183, 176, 0.5);
      z-index: 50;
    }
  }

  /* Stash styles are now owned by StashCard.svelte */

  .stash-column {
    background: rgba(0, 0, 0, 0.2);
    padding: 6px;
    border-radius: 6px;
    border: 1px solid rgba(255, 255, 255, 0.05);
    min-height: 80px;
    min-width: 100px;
  }
</style>
