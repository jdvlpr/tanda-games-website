<script>
  import PlayerBoard from "./PlayerBoard.svelte";

  /**
   * Horizontal snap-scroll carousel of PlayerBoard components.
   * Owns the IntersectionObserver and nav-dot scroll tracking.
   *
   * Props:
   *   players              – snapshot.players array
   *   engine               – the game engine instance
   *   snapshot             – full game snapshot
   *   visualActivePlayerId – index of the visually active player
   *   selectedSlot         – forwarded to each PlayerBoard
   *   selectedStash        – forwarded to each PlayerBoard
   *   autoScrollEnabled    – whether boards auto-scroll into view
   *   onCardSelect         – forwarded to each PlayerBoard
   *
   * Exposes:
   *   container            – the scroll container DOM element (bind:container)
   */
  let {
    players = [],
    engine,
    snapshot,
    visualActivePlayerId,
    selectedSlot,
    selectedStash,
    autoScrollEnabled = true,
    onCardSelect = null,
    container = $bindable(null),
  } = $props();

  let currentlyScrolledToPlayer = $state(0);
  let boardElements = $state([]);

  function scrollToPlayer(index) {
    if (boardElements[index]) {
      boardElements[index].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }

  $effect(() => {
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            currentlyScrolledToPlayer = Number(entry.target.dataset.index);
          }
        });
      },
      { root: container, threshold: 0.5 },
    );

    boardElements.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  });
</script>

<!-- Horizontal Scroll Container -->
<div
  class="flex w-full overflow-x-auto snap-x snap-mandatory scroll-smooth gap-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
  lg:flex lg:flex-wrap lg:justify-center lg:w-screen lg:relative lg:left-1/2 lg:-translate-x-1/2"
  bind:this={container}
>
  {#each players as player, index}
    <div
      class="snap-center"
      bind:this={boardElements[index]}
      data-index={index}
    >
      <PlayerBoard
        {engine}
        {player}
        isActive={visualActivePlayerId === player.id}
        onCardSelect={onCardSelect}
        {selectedSlot}
        {selectedStash}
        {snapshot}
        {autoScrollEnabled}
      />
    </div>
  {/each}
</div>

<!-- Navigation Dots -->
<div
  class="flex justify-center gap-2 sticky bottom-5 z-150 lg:hidden w-fit mx-auto"
>
  {#each players as player, i}
    <button
      onclick={() => scrollToPlayer(i)}
      aria-label="Scroll to player {i + 1}"
      class={[
        "btn-action px-4 backdrop-blur-md rounded-full",
        currentlyScrolledToPlayer === i
          ? "bg-amber-200/70 dark:bg-amber-800/70"
          : "bg-neutral-100/70 dark:bg-neutral-900/70",
      ]}>{i + 1}</button
    >
  {/each}
</div>
