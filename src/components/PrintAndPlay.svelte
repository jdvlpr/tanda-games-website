<script>
    export let variants;
    export let defaultVariant;
    export let title;
    export let link;
    export let placeholder;
    export let tokensHREF;
    export let tokensTitle;

    let variant = defaultVariant;

    $: activeVariant = variants.filter((n) => n.id === variant)[0];
    let activeVariantHref;
    let activeVariantName;

    $: if (activeVariant) {
        activeVariantHref = link.replace(placeholder, activeVariant.id);
        activeVariantName = title.replace(placeholder, activeVariant.name);
    }
</script>

<div class="inline-flex flex-col gap-2 my-4">
    <div class="inline-flex gap-2 flex-wrap justify-center">
        <div class="flex flex-col gap-2 text-left">
            <label for="variant" class="text-sm">Print & Play Variants</label>
            <select id="variant" name="selected_variant" class="w-fit dark:text-neutral-900" bind:value={variant}>
                {#each variants as { name, id }}
                    <option value={id}>{name}</option>
                {/each}
            </select>
        </div>

        {#if activeVariant}
            <a href={activeVariantHref} download={activeVariantName} class="btn"
                ><svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                    />
                </svg>
                Print & Play ({activeVariant.name})</a
            >
        {/if}
    </div>
</div>

{#if activeVariant}
    <div class="inline-flex flex-col gap-2 my-2">
        <p class="italic">
            To Print & Play, you'll need a printer, {activeVariant.sheets} sheets of paper, and some time to cut out all
            the cards. You'll also need <span class="font-black">One Six-Sided Die</span>;
            <span class="font-black">Money Tokens</span>
            (about 20 per player) and
            <span class="font-black">Assurance Tokens</span> (about 10 per player), using another game's pieces, coins,
            monopoly money, poker chips, Legos, or candy. (Or
            <a class="underline" href={tokensHREF} download={tokensTitle}
                >click here to download and print Money and Assurance Tokens</a
            >.)
        </p>
    </div>
{/if}
