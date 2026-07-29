<script>
  import Icon from "@iconify/svelte";
  import StashCard from "./StashCard.svelte";

  /**
   * Renders the discard pile as a collapsible list of read-only StashCards.
   * Cards are only shown when the pile is non-empty.
   *
   * Props:
   *   discardPile – array of card objects from engine.discardPile
   */
  let { discardPile = [] } = $props();

  let isExpanded = $state(false);

  function getStashType(card) {
    return card.type ?? "document";
  }
</script>

{#if discardPile.length}
  <div class="mt-2">
    <button
      class="btn-sm w-full flex items-center justify-between"
      onclick={() => (isExpanded = !isExpanded)}
    >
      <span class="flex items-center gap-1.5">
        <Icon icon="lucide:trash-2" class="size-4" />
        Discard Pile ({discardPile.length})
      </span>
      <Icon
        icon={isExpanded ? "lucide:chevron-up" : "lucide:chevron-down"}
        class="size-4"
      />
    </button>

    {#if isExpanded}
      <div
        class="mt-2 flex flex-col gap-1 max-h-[260px] overflow-y-auto p-2 rounded-2xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800"
      >
        {#each discardPile as card, i (card.id ?? i)}
          <StashCard
            {card}
            stashType={getStashType(card)}
            isSelected={false}
            readonly={true}
          />
        {/each}
      </div>
    {/if}
  </div>
{/if}
