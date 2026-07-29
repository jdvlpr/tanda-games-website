<script>
  import Icon from "@iconify/svelte";

  /**
   * Renders a single stash item (document, connection, ticket, passport, life card).
   *
   * Props:
   *   card       – the card/item object (must have at least `name` or `title`)
   *   stashType  – one of 'document'|'connection'|'ticket'|'passport'|'lifeCard'
   *   isSelected – whether this card is currently selected (shows outline)
   *   readonly   – when true, click events are suppressed (discard pile usage)
   *   onclick    – called with the native pointer event when the item is clicked
   */
  let {
    card = {},
    stashType = "document",
    isSelected = false,
    readonly = false,
    onclick = null,
  } = $props();

  const COLOR_VAR_MAP = {
    document: "var(--color-emi-document)",
    connection: "var(--color-emi-connection)",
    ticket: "var(--color-emi-ticket)",
    passport: "var(--color-emi-passport)",
    lifeCard: "var(--color-emi-life)",
  };

  const ICON_MAP = {
    ticket: "game-icons:ticket",
    passport: "game-icons:passport",
  };

  let borderColor = $derived(COLOR_VAR_MAP[stashType] ?? "transparent");
  let displayIcon = $derived(
    card.icon
      ? card.icon.includes(":")
        ? card.icon
        : `game-icons:${card.icon}`
      : (ICON_MAP[stashType] ?? null),
  );
  let displayLabel = $derived(card.name ?? card.title ?? stashType);
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  class="stash-item bg-neutral-50 dark:bg-neutral-900 px-2 py-1 rounded-2xl flex items-center gap-1.5 {isSelected
    ? 'selected'
    : ''} {readonly ? 'cursor-default' : ''}"
  style="border-left: 4px solid {borderColor};border-right: 4px solid {borderColor};"
  onclick={!readonly ? onclick : null}
>
  {#if displayIcon}
    <Icon icon={displayIcon} class="size-4 shrink-0" />
  {/if}
  <span class="truncate pr-1">{displayLabel}</span>
  {#if stashType === "lifeCard" && card.money}
    <span
      class="bg-amber-500 text-black px-1 rounded-[3px] text-[0.55rem] font-bold"
      >${card.money}</span
    >
  {/if}
</div>

<style>
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

  .stash-item.cursor-default {
    cursor: default;
  }
</style>
