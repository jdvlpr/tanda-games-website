<script>
  import Icon from "@iconify/svelte";

  /**
   * Renders the public Tickets and Passports pool cards.
   *
   * Props:
   *   publicServices  – snapshot.publicServices ({ tickets, passports })
   *   currentPlayer   – the active player object (null if not preparation phase)
   *   phase           – snapshot.phase
   *   pendingChoice   – truthy when a modal choice is pending (disables buttons)
   *   onbuy           – (cardType: 'ticket'|'passport') => void
   *   onsteal         – (cardType: 'ticket'|'passport') => void
   */
  let {
    publicServices = { tickets: 0, passports: 0 },
    currentPlayer = null,
    phase = "",
    pendingChoice = false,
    onbuy = null,
    onsteal = null,
  } = $props();

  let isPreparation = $derived(phase === "preparation");
</script>

<div class="flex flex-wrap gap-2">
  <!-- Tickets -->
  {#snippet publicServiceCard(type, count, icon, label, requirement, note, canBuy, canSteal)}
    <div
      class="flex flex-1 items-center gap-4 bg-blue-50 dark:bg-blue-950/50 p-3.5 rounded-2xl border border-neutral-200 dark:border-neutral-800"
    >
      <div class="text-left">
        <div class="font-bold text-xl">{label}</div>
        <div class="text-xs">Requires: {requirement}</div>
        <div class="text-xs">{note}</div>
      </div>
      <div class="flex flex-col gap-1 ml-auto items-end">
        <div class="text-2xl font-bold flex items-center gap-1.5">
          <Icon {icon} class="size-6 shrink-0" />
          <span>{count}</span>
        </div>
        {#if isPreparation && currentPlayer}
          <div class="flex gap-1">
            <button
              class="btn-sm whitespace-nowrap"
              disabled={!canBuy || pendingChoice}
              onclick={() => onbuy?.(type)}
            >
              $2 Buy
            </button>
            <button
              class="btn-sm"
              disabled={!canSteal || pendingChoice}
              onclick={() => onsteal?.(type)}
            >
              Steal
            </button>
          </div>
        {/if}
      </div>
    </div>
  {/snippet}

  {@render publicServiceCard(
    "ticket",
    publicServices.tickets,
    "game-icons:ticket",
    "Tickets",
    "1+ Connection",
    "Ticket + Passport = 1 Assurance",
    publicServices.tickets > 0 &&
      currentPlayer?.money >= 2 &&
      currentPlayer?.stash?.connections?.length >= 1,
    publicServices.tickets > 0 &&
      currentPlayer?.stash?.connections?.length >= 1,
  )}

  {@render publicServiceCard(
    "passport",
    publicServices.passports,
    "game-icons:passport",
    "Passports",
    "1+ Document",
    "Passport + Ticket = 1 Assurance",
    publicServices.passports > 0 &&
      currentPlayer?.money >= 2 &&
      currentPlayer?.stash?.documents?.length >= 1,
    publicServices.passports > 0 &&
      currentPlayer?.stash?.documents?.length >= 1,
  )}
</div>
