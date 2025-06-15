<script>
    let {
        variants,
        defaultVariant,
        title,
        link,
        placeholder,
        tokensHREF,
        tokensTitle
    } = $props();

    let variant = $state(defaultVariant);

    let activeVariant = $derived(variants.filter((n) => n.id === variant)[0]);


    let activeVariantHref = $derived(link.replace(placeholder, activeVariant.id));
    let activeVariantName = $derived(title.replace(placeholder, activeVariant.name));
</script>

<div class="inline-flex flex-col gap-2 my-4 items-start">
    <h2 class="font-bold text-2xl">Print & Play</h2>

    <div class="flex flex-col">
        <label for="variant" class="text-sm">Select a Variant</label>
        <select id="variant" name="selected_variant" class="w-fit" bind:value={variant} >
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
                    class="w-6 h-6 flex-none"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                    />
                </svg>
                Download Print & Play ({activeVariant.name})</a
            >
        {/if}    

    {#if activeVariant}
        <div class="inline-flex flex-col gap-2 my-2 text-left">
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
</div>

