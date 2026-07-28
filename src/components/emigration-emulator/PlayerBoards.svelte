<script>
  import Icon from "@iconify/svelte";
  let {
    engine,
    isActive,
    onCardSelect,
    selectedSlot,
    selectedStash,
    snapshot,
    autoScrollEnabled = true,
  } = $props();

  let currentlyScrolledToPlayer = $state(0);
  let playerBoardContainer;
  let playerBoardElements = $state([]);

  // Scroll handler for the dot buttons
  function scrollToPlayer(index) {
    if (playerBoardElements[index]) {
      playerBoardElements[index].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }

  $effect(() => {
    if (!playerBoardContainer) return;

    // Set up the IntersectionObserver to detect which card is visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Update the reactive state based on the dataset index
            currentlyScrolledToPlayer = Number(entry.target.dataset.index);
          }
        });
      },
      {
        root: playerBoardContainer,
        threshold: 0.5, // Triggers when at least 50% of the card is visible
      },
    );

    // Observe all card elements
    playerBoardElements.forEach((el) => {
      if (el) observer.observe(el);
    });

    // In Svelte 5, returning a function from $effect handles cleanup automatically
    return () => observer.disconnect();
  });
</script>

<!-- Horizontal Scroll Container -->
<!-- We use standard Tailwind scroll-snap classes and arbitrary variants to hide the scrollbar for a cleaner look -->
<div
  class="flex w-full overflow-x-auto snap-x snap-mandatory gap-4 px-4 pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
  bind:this={playerBoardContainer}
>
  <!-- Player Boards -->
  {#each snapshot.players as player, index}
    bind:this={playerBoardElements[index]}
    <PlayerBoard
      {engine}
      {player}
      isActive={visualActivePlayerId === player.id}
      onCardSelect={handleCardSelect}
      {selectedSlot}
      {selectedStash}
      {snapshot}
      autoScrollEnabled={!autoplay}
    />
  {/each}
</div>
<!-- Navigation Dots -->
<div class="flex justify-center gap-2 mt-2">
  <!-- The first dot starts 'active' (darker color) -->
  {#each snapshot.players as _, i}
    <button
      onclick={scrollToPlayer(i)}
      aria-label="Scroll to player {i + 1}"
      class={[
        "dot w-3 h-3 rounded-full",
        currentlyScrolledToPlayer === i
          ? "bg-gray-800"
          : "bg-gray-300 hover:bg-gray-400",
      ]}
    ></button>
  {/each}
</div>
