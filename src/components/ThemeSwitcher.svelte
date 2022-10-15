<script>
    import { onMount } from "svelte";
    import { activeTheme, theme, themes } from "../js/stores";
    import { setTheme } from "../js/utils";

    export let showText = false;
    export let edge = "right";
    let show = false;

    onMount(() => {
        // Check if theme is set, or match the system's theme
        if (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches) setTheme("system");
        else if (!("theme" in localStorage)) setTheme("system");
        else setTheme(localStorage.theme);
        // Listen for change in color scheme
        window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
            if ($theme === "system") setTheme("system");
        });
    });
</script>

<svelte:window
    on:click={() => (show = false)}
    on:keydown={(e) => {
        if (e.code === "Escape") show = false;
    }}
/>

<!-- This example requires Tailwind CSS v2.0+ -->
<div class="w-fit font-serif">
    <button
        id="menu-button"
        aria-expanded="true"
        aria-haspopup="true"
        title="Change Theme [t]"
        class="flex items-center gap-2 p-4"
        on:click={(e) => {
            e.stopPropagation();
            show = !show;
        }}
    >
        {#key $theme}
            {@html $activeTheme.icon}
            {#if showText}
                {$activeTheme.name}
            {/if}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                <path
                    fill-rule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clip-rule="evenodd"
                />
            </svg>
        {/key}
    </button>

    {#if show}
        <!--
          Dropdown menu, show/hide based on menu state.
      
          Entering: "transition ease-out duration-100"
            From: "transform opacity-0 scale-95"
            To: "transform opacity-100 scale-100"
          Leaving: "transition ease-in duration-75"
            From: "transform opacity-100 scale-100"
            To: "transform opacity-0 scale-95"
        -->
        <div
            class="absolute z-10 mt-2 origin-top-right bg-white dark:bg-neutral-900 rounded border border-neutral-200 dark:border-neutral-600 shadow-lg"
            class:-translate-x-[30px]={edge === "right"}
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
            tabindex="-1"
        >
            <div class="py-1 divide-y divide-neutral-200" role="none">
                <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
                {#each $themes as { name, id, icon }}
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <p
                        class="flex items-center gap-x-1 px-4 py-2 cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-900"
                        role="menuitem"
                        tabindex="0"
                        on:click={() => setTheme(id)}
                    >
                        {@html icon}
                        {name}
                    </p>
                {/each}
            </div>
        </div>
    {/if}
</div>
