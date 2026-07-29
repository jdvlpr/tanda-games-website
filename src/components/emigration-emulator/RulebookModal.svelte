<script>
  import Icon from "@iconify/svelte";
  import { fade, fly } from "svelte/transition";

  /**
   * Renders the Rulebook PDF in an overlay modal.
   *
   * Props:
   *   show        – bind:show to toggle visibility
   *   rulebookHref – URL to the PDF file
   */
  let {
    show = $bindable(false),
    rulebookHref = "",
  } = $props();
</script>

{#if show}
  <div
    transition:fade={{ duration: 100 }}
    class="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex justify-center items-center z-[9999]"
    role="presentation"
    onclick={(e) => {
      if (e.target === e.currentTarget) show = false;
    }}
  >
    <div
      in:fly={{ y: -50 }}
      class="bg-neutral-200 dark:bg-neutral-800 p-2 rounded-2xl w-[95%] shadow-xl max-h-[90vh] overflow-y-auto"
    >
      <div class="flex justify-between gap-2">
        <h2 class="text-xl font-semibold text-center">Rulebook</h2>
        <button
          class="btn-sm"
          onclick={() => {
            show = false;
          }}><Icon icon="lucide:x" class=""></Icon></button
        >
      </div>
      <p class="text-left opacity-70 text-xs mb-2">23 MB</p>
      <div
        class="w-full h-[80vh] border border-slate-200 rounded-lg shadow-sm overflow-hidden bg-slate-50"
      >
        <object
          title="PDF rulebook"
          data={rulebookHref}
          type="application/pdf"
          class="w-full h-full"
        >
          <!-- Fallback UI if the browser cannot render the PDF inline -->
          <div
            class="flex flex-col items-center justify-center h-full p-6 text-center"
          >
            <svg
              class="w-12 h-12 text-slate-400 mb-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
            <p class="text-slate-600 font-medium mb-4">
              Inline PDF viewing is not supported by your browser.
            </p>
            <a
              href={rulebookHref}
              download
              class="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md shadow-sm transition-colors duration-150"
            >
              Download PDF
            </a>
          </div>
        </object>
      </div>
    </div>
  </div>
{/if}
