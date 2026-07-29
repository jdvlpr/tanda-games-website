<script>
  import Icon from "@iconify/svelte";

  /**
   * Renders the top navigation bar for the emulator.
   *
   * Props:
   *   onrulebook  – called when user clicks Rulebook
   *   onsettings  – called when user clicks Settings
   */
  let { onrulebook = null, onsettings = null } = $props();
</script>

<div class="mb-4 py-2 w-full bg-slate-300 dark:bg-slate-700">
  <div
    class="flex items-center max-sm:flex-wrap max-sm:justify-center justify-between gap-2 max-w-3xl mx-auto px-2"
  >
    <div class="flex flex-col items-center md:items-start">
      <h1 class="font-bold text-2xl text-slate-900 dark:text-slate-100">
        Emigration
      </h1>
      <p
        class="font-bold text-xs uppercase tracking-widest text-slate-600 dark:text-slate-400"
      >
        Game Emulator
      </p>
    </div>

    <div class="flex gap-2 items-center flex-wrap justify-center">
      <button
        title="Rulebook (PDF)"
        onclick={onrulebook}
        class="btn-sm bg-white/50 dark:bg-black/50"
        ><Icon icon="lucide:file-question-mark" class="size-5" /><span
          class="">Rulebook</span
        ></button
      >
      <button
        class="btn-sm bg-white/50 dark:bg-black/50"
        title="Emulator Settings"
        onclick={onsettings}
        ><Icon icon="lucide:settings" class="size-5" />
        <span class="">Settings</span></button
      >
      <a
        href="/emigration"
        class="btn-sm bg-white/50 dark:bg-black/50"
        title="Close Emulator"
        ><Icon icon="lucide:x" class="size-5" /> <span class="">Close</span>
      </a>
    </div>
  </div>
</div>
