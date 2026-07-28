<script>
  import Icon from "@iconify/svelte";
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
      class="w-[clamp(66px,20vw,100px)] shrink-0 h-[110px] lg:h-[125px] mx-1 sm:mx-2 relative pointer-events-none empty"
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
      class="w-[clamp(66px,20vw,100px)] shrink-0 h-[110px] lg:h-[125px] mx-1 sm:mx-2 relative pointer-events-none"
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
  class={["my-2 transition-all duration-300 scroll-mt-[6rem] mx-auto w-full"]}
>
  <div
    class={[
      "flex p-2 pb-4 flex-col gap-4 rounded-2xl",
      isActive
        ? "border-2 border-amber-400 dark:border-amber-600 shadow-md shadow-amber-200/50 dark:shadow-amber-800/50"
        : "border border-neutral-200 dark:border-neutral-800",
    ]}
  >
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
        <span class="text-xs"
          >${player.collegeFund} College Fund / Starting Money</span
        >
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
        class="flex gap-1 items-center text-pink-700 dark:text-pink-300 px-2 py-1 bg-pink-200 dark:bg-pink-800 rounded-2xl"
        title="Access Fee"
      >
        <span class="font-bold text-md">${player.accessFee}</span>
        <span class="text-xs">Access Fee</span>
      </span>

      <span
        class="flex gap-1 items-center text-green-700 dark:text-green-300 w-fit px-2 py-1 bg-green-200 dark:bg-green-800 rounded-2xl"
        title="Current amount of Money"
      >
        <!-- <svg
          class="Icon size-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <g class="" transform="translate(0,0)" style=""
            ><path
              d="M264.4 95.01c-35.6-.06-80.2 11.19-124.2 34.09C96.27 152 61.45 182 41.01 211.3c-20.45 29.2-25.98 56.4-15.92 75.8 10.07 19.3 35.53 30.4 71.22 30.4 35.69.1 80.29-11.2 124.19-34 44-22.9 78.8-53 99.2-82.2 20.5-29.2 25.9-56.4 15.9-75.8-10.1-19.3-35.5-30.49-71.2-30.49zm91.9 70.29c-3.5 15.3-11.1 31-21.8 46.3-22.6 32.3-59.5 63.8-105.7 87.8-46.2 24.1-93.1 36.2-132.5 36.2-18.6 0-35.84-2.8-50.37-8.7l10.59 20.4c10.08 19.4 35.47 30.5 71.18 30.5 35.7 0 80.3-11.2 124.2-34.1 44-22.8 78.8-52.9 99.2-82.2 20.4-29.2 26-56.4 15.9-75.7zm28.8 16.8c11.2 26.7 2.2 59.2-19.2 89.7-18.9 27.1-47.8 53.4-83.6 75.4 11.1 1.2 22.7 1.8 34.5 1.8 49.5 0 94.3-10.6 125.9-27.1 31.7-16.5 49.1-38.1 49.1-59.9 0-21.8-17.4-43.4-49.1-59.9-16.1-8.4-35.7-15.3-57.6-20zm106.7 124.8c-10.2 11.9-24.2 22.4-40.7 31-35 18.2-82.2 29.1-134.3 29.1-21.2 0-41.6-1.8-60.7-5.2-23.2 11.7-46.5 20.4-68.9 26.1 1.2.7 2.4 1.3 3.7 2 31.6 16.5 76.4 27.1 125.9 27.1s94.3-10.6 125.9-27.1c31.7-16.5 49.1-38.1 49.1-59.9z"
              fill="currentColor"
            ></path></g
          ></svg
        > -->
        <strong class="font-bold text-md">${player.money}</strong>
        <span class="text-xs">Money</span>
      </span>

      <span
        class="flex gap-1 items-center px-2 py-1 bg-teal-200 dark:bg-teal-800 rounded-2xl"
        title="Current salary"
      >
        <!-- <svg
          class="Icon size-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          ><g class="" transform="translate(0,0)" style=""
            ><path
              d="M327.027 65.816 229.79 128.23l9.856 5.397 86.51-55.53 146.735 83.116-84.165 54.023 4.1 2.244v6.848l65.923-42.316 13.836 7.838-79.76 51.195v11.723l64.633-41.487 15.127 8.57-79.76 51.195v11.723l64.633-41.487 15.127 8.57-79.76 51.195v11.723l100.033-64.21-24.828-14.062 24.827-15.937-24.828-14.064 24.827-15.937-23.537-13.333 23.842-15.305-166.135-94.106zm31.067 44.74c-21.038 10.556-49.06 12.342-68.79 4.383l-38.57 24.757 126.903 69.47 36.582-23.48c-14.41-11.376-13.21-28.35 2.942-41.67l-59.068-33.46zM227.504 147.5l-70.688 46.094 135.61 78.066 1.33-.85c2.5-1.61 6.03-3.89 10.242-6.613 8.42-5.443 19.563-12.66 30.674-19.86 16.002-10.37 24.248-15.72 31.916-20.694L227.504 147.5zm115.467 1.17a8.583 14.437 82.068 0 1 .003 0 8.583 14.437 82.068 0 1 8.32 1.945 8.583 14.437 82.068 0 1-.87 12.282 8.583 14.437 82.068 0 1-20.273 1.29 8.583 14.437 82.068 0 1 .87-12.28 8.583 14.437 82.068 0 1 11.95-3.237zm-218.423 47.115L19.143 263.44l23.537 13.333-23.842 15.305 24.828 14.063-24.828 15.938 24.828 14.063-24.828 15.938 166.135 94.106L285.277 381.8v-11.72l-99.433 63.824L39.11 350.787l14.255-9.15 131.608 74.547L285.277 351.8v-11.72l-99.433 63.824L39.11 320.787l14.255-9.15 131.608 74.547L285.277 321.8v-11.72l-99.433 63.824L39.11 290.787l13.27-8.52 132.9 75.28 99.997-64.188v-5.05l-5.48-3.154-93.65 60.11-146.73-83.116 94.76-60.824-9.63-5.543zm20.46 11.78-46.92 30.115c14.41 11.374 13.21 28.348-2.942 41.67l59.068 33.46c21.037-10.557 49.057-12.342 68.787-4.384l45.965-29.504-123.96-71.358zm229.817 32.19c-8.044 5.217-15.138 9.822-30.363 19.688a36221.458 36221.458 0 0 1-30.69 19.873c-4.217 2.725-7.755 5.01-10.278 6.632-.09.06-.127.08-.215.137v85.924l71.547-48.088v-84.166zm-200.99 17.48a8.583 14.437 82.068 0 1 8.32 1.947 8.583 14.437 82.068 0 1-.87 12.28 8.583 14.437 82.068 0 1-20.27 1.29 8.583 14.437 82.068 0 1 .87-12.28 8.583 14.437 82.068 0 1 11.95-3.236z"
              fill="currentColor"
            ></path></g
          ></svg
        > -->
        <span class="font-bold text-md">${player.salary}</span>
        <span class="text-xs">Salary</span>
        <div class="flex gap-2 items-center">
          <div
            class="size-7 rounded-full border border-dashed flex items-center justify-center text-xs {player.payRaises >=
              1 && 'border-solid bg-green-100 dark:bg-green-900'}"
          >
            +$1
          </div>
          <div
            class="size-7 rounded-full border border-dashed flex items-center justify-center text-xs {player.payRaises >=
              2 && 'border-solid bg-green-100 dark:bg-green-900'}"
          >
            +$3
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

    {#if player.inCollege}
      <span class=" uppercase bg-amber-500 text-black px-1.5 py-0.5 rounded"
        >In College</span
      >
    {:else if player.payRaises >= 3}
      <span class=" uppercase bg-emerald-500 text-white px-1.5 py-0.5 rounded"
        >Career Maxed</span
      >
    {/if}

    {#if player.crossedSuccessfully === true}
      <span class=" uppercase bg-emerald-500 text-white px-1.5 py-0.5 rounded"
        >Crossed</span
      >
    {:else if player.crossedSuccessfully === false}
      <span class=" uppercase bg-rose-500 text-white px-1.5 py-0.5 rounded"
        >Blocked</span
      >
    {/if}

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
      <div class="flex gap-3 justify-center">
        <div
          class="flex flex-col items-center gap-0 text-sm p-2 rounded-2xl bg-neutral-200 dark:bg-neutral-800 h-fit"
        >
          <p class="">Money ({player.money})</p>
          <div class="">
            <span class="font-bold"
              >x{player.destination.targets.m.setSize}</span
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
        <!-- 1. Documents -->
        <div
          class="flex flex-col items-center gap-0 text-sm p-2 rounded-2xl bg-neutral-200 dark:bg-neutral-800 h-fit"
        >
          <p>
            Documents ({player.stash.documents.length})
          </p>
          <div class="">
            <span class="font-bold"
              >x{player.destination.targets.d.setSize}</span
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
                <!-- svelte-ignore a11y_click_events_have_key_events -->
                <!-- svelte-ignore a11y_no_static_element_interactions -->
                <div
                  class="stash-item bg-neutral-50 dark:bg-neutral-900 px-2 py-1 rounded-2xl flex items-center gap-1.5 {isSel
                    ? 'selected'
                    : ''}"
                  style="border-left: 2.5px solid var(--color-emi-document);"
                  onclick={(e) => handleStashClick(e, "document", i)}
                >
                  {#if doc.icon}
                    <Icon
                      icon={doc.icon.includes(":")
                        ? doc.icon
                        : `game-icons:${doc.icon}`}
                      class="size-4 shrink-0"
                    />
                  {/if}
                  <span class="truncate pr-1">{doc.name}</span>
                </div>
              {/each}
            </div>
          {/if}
        </div>

        <!-- Connections -->
        <div
          class="flex flex-col items-center gap-0 text-sm p-2 rounded-2xl bg-neutral-200 dark:bg-neutral-800 h-fit"
        >
          <p>Connections ({player.stash.connections.length})</p>
          <div class="">
            <span class="font-bold"
              >x{player.destination.targets.c.setSize}</span
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
                <!-- svelte-ignore a11y_click_events_have_key_events -->
                <!-- svelte-ignore a11y_no_static_element_interactions -->
                <div
                  class="stash-item bg-neutral-50 dark:bg-neutral-900 px-2 py-1 rounded-2xl flex items-center gap-1.5 {isSel
                    ? 'selected'
                    : ''}"
                  style="border-left: 2.5px solid var(--color-emi-connection);"
                  onclick={(e) => handleStashClick(e, "connection", i)}
                >
                  {#if conn.icon}
                    <Icon
                      icon={conn.icon.includes(":")
                        ? conn.icon
                        : `game-icons:${conn.icon}`}
                      class="size-4 shrink-0"
                    />
                  {/if}
                  <span class="truncate pr-1">{conn.name}</span>
                  <span class="text-xs font-bold">${conn.cost || 0}</span>
                </div>
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
            class="flex flex-col items-start p-2 rounded-2xl bg-neutral-200 dark:bg-neutral-800"
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
              <!-- svelte-ignore a11y_click_events_have_key_events -->
              <!-- svelte-ignore a11y_no_static_element_interactions -->
              <div
                class="stash-item bg-neutral-50 dark:bg-neutral-900 px-2 py-1 rounded-2xl flex items-center gap-1.5 {isSel
                  ? 'selected'
                  : ''}"
                style="border-left: 2.5px solid var(--color-emi-ticket);"
                onclick={(e) => handleStashClick(e, "ticket", i)}
              >
                <Icon icon="game-icons:ticket" class="size-4 shrink-0" />
                <span>Ticket</span>
              </div>
            {/each}
          </div>
        {/if}

        <!-- Passports -->
        {#if player.stash.passports}
          <div
            class="flex flex-col items-start p-2 rounded-2xl bg-neutral-200 dark:bg-neutral-800"
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
              <!-- svelte-ignore a11y_click_events_have_key_events -->
              <!-- svelte-ignore a11y_no_static_element_interactions -->
              <div
                class="stash-item bg-neutral-50 dark:bg-neutral-900 px-2 py-1 rounded-2xl flex items-center gap-1.5 {isSel
                  ? 'selected'
                  : ''}"
                style="border-left: 2.5px solid var(--color-emi-passport);"
                onclick={(e) => handleStashClick(e, "passport", i)}
              >
                <Icon icon="game-icons:passport" class="size-4 shrink-0" />
                <span>Passport</span>
              </div>
            {/each}
          </div>
        {/if}

        <!-- Kept Life -->
        {#if player.stash.lifeCards.length}
          <div
            class="flex flex-col items-start p-2 rounded-2xl bg-neutral-200 dark:bg-neutral-800"
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
              <!-- svelte-ignore a11y_click_events_have_key_events -->
              <!-- svelte-ignore a11y_no_static_element_interactions -->
              <div
                class="stash-item bg-neutral-50 dark:bg-neutral-900 px-2 py-1 rounded-2xl flex items-center gap-1.5 {isSel
                  ? 'selected'
                  : ''}"
                style="border-left: 2.5px solid var(--color-emi-life);"
                onclick={(e) => handleStashClick(e, "lifeCard", i)}
              >
                {#if lc.icon}
                  <Icon
                    icon={lc.icon.includes(":")
                      ? lc.icon
                      : `game-icons:${lc.icon}`}
                    class="size-4 shrink-0"
                  />
                {/if}
                <span class="truncate pr-1">{lc.title}</span>
                {#if lc.money}
                  <span
                    class="bg-amber-500 text-black px-1 rounded-[3px] text-[0.55rem] font-bold"
                    >${lc.money}</span
                  >
                {/if}
              </div>
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

  @media (hover: hover) {
    .grid-card.available:hover {
      transform: translateY(-4px) scale(1.05);
      box-shadow: 0 8px 16px rgba(85, 183, 176, 0.5);
      z-index: 50;
    }
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
