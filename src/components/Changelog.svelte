<script>
    let { title, data } = $props();
</script>

<h1 class="text-3xl my-4">{title}</h1>

<div class="text-left inline-flex flex-col justify-center items-center gap-4">
    {#each data as { date, items, version }}
        <div class="bg-neutral-100 p-4 dark:bg-neutral-700 w-full rounded-md">
            <h2 class="text-lg font-bold mt-2">Version {version}</h2>
            <p class="italic mb-2">{date}</p>
            <ul class="list-disc ml-8">
                {#each items as item}
                    <li>{item}</li>
                {/each}
            </ul>
        </div>
    {/each}
</div>
