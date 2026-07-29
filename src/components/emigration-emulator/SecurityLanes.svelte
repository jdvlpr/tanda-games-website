<script>
  import Icon from "@iconify/svelte";

  /**
   * Renders the Security Lanes section shown during the crossing phase.
   * Hidden automatically during the preparation phase.
   *
   * Props:
   *   lanes         – snapshot.securityLanes array
   *   phase         – snapshot.phase string
   *   pendingChoice – truthy when a modal choice is pending (disables Select Lane)
   *   onlaneselect  – (laneIdx: number) => void
   */
  let { lanes = [], phase = "", pendingChoice = false, onlaneselect = null } =
    $props();

  function getSecurityLaneBackgroundColor(i) {
    switch (i) {
      case 0:
        return "bg-yellow-100 dark:bg-yellow-900";
      case 1:
        return "bg-orange-100 dark:bg-orange-900";
      case 2:
        return "bg-red-100 dark:bg-red-900";
      case 3:
        return "bg-blue-100 dark:bg-blue-900";
      case 4:
        return "bg-green-100 dark:bg-green-900";
    }
  }
</script>

<div class={["flex flex-col gap-1", phase === "preparation" && "hidden"]}>
  <div class="flex flex-wrap justify-center gap-2 pb-1">
    {#each lanes as lane, i}
      {@const backgroundColor = getSecurityLaneBackgroundColor(i)}
      <div
        class={[
          "rounded-2xl gap-1 p-2 min-w-[130px] max-w-[300px] flex flex-col items-center text-center flex-1 transition-all border border-neutral-200 dark:border-neutral-800",
          backgroundColor,
        ]}
      >
        <div class="font-bold text-xs leading-snug">{lane.name}</div>
        <Icon icon="game-icons:police-officer-head" class="size-8"></Icon>
        <div class="text-xs mb-1 flex gap-1">
          {#each lane.unshuffledTokens as { tokenNumber, status }}
            <p
              class={[
                "bg-red-200 dark:bg-red-800 px-2 py-1 shadow-sm rounded-2xl border border-red-300 dark:border-red-700",
                status.isRevealed && "opacity-30",
              ]}
            >
              {tokenNumber}
            </p>
          {/each}
        </div>
        {#if phase === "crossing"}
          <button
            class="btn w-full"
            disabled={lane.tokens.length === 0 || pendingChoice}
            onclick={() => onlaneselect?.(i)}
          >
            Select Lane
          </button>
        {/if}
        {#if lane.unshuffledTokens.filter(({ status }) => status.isRevealed).length}
          <div class="flex flex-col gap-1 justify-center">
            {#each lane.unshuffledTokens.filter(({ status }) => status.isRevealed) as { tokenNumber, status }}
              <div class="grid grid-cols-[1fr_30px] gap-1 items-center">
                <div
                  class={[
                    "text-xs rounded-2xl px-2 py-1 w-full flex flex-col gap-1",
                    status.player.success
                      ? "bg-green-200 dark:bg-green-800"
                      : "bg-red-300 dark:bg-red-900",
                  ]}
                >
                  <p class="w-full">
                    {#if status.player.success}✅{:else}❌{/if}
                    {status.player.name}
                  </p>
                  <div class="flex gap-1 items-center">
                    <div
                      class="whitespace-nowrap p-1 rounded-2xl bg-white text-red-500 flex items-center gap-0"
                    >
                      <Icon
                        icon="game-icons:round-star"
                        class="size-3 shrink-0"
                      />{status.player.assurance}
                    </div>
                    <div
                      class="whitespace-nowrap p-1 rounded-2xl bg-white text-green-700 flex items-center gap-0"
                    >
                      <Icon
                        icon="game-icons:two-coins"
                        class="size-3 shrink-0"
                      />${status.player.money}
                    </div>
                  </div>
                </div>
                <div
                  class="bg-red-200 dark:bg-red-800 px-2 py-1 text-xs rounded-2xl border border-red-300 dark:border-red-700"
                >
                  {tokenNumber}
                </div>
              </div>
            {/each}
          </div>
        {/if}
      </div>
    {/each}
  </div>
</div>
