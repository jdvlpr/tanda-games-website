<script>
    import { fly, fade } from 'svelte/transition';
    import { toast } from '../stores/toast.svelte.js';
  import Icon from '@iconify/svelte';

    /** @type {{ item: import('../stores/toast.svelte.js').Toast }} */
    let { item } = $props();

    const typeClasses = {
        success: 'bg-green-100/50 dark:bg-green-900/50',
        error: 'bg-red-400/50 dark:bg-red-600/50',
        warning: 'bg-amber-100/50 dark:bg-amber-900/50',
        info: 'bg-blue-100/50 dark:bg-blue-900/50',
        money: 'bg-green-100/50 dark:bg-green-900/50',
        assurance:'bg-red-200/50 dark:bg-red-800/50',
        document:'bg-orange-200/50 dark:bg-orange-800/50',
        connection: 'bg-pink-200/50 dark:bg-pink-800/50',
        life: 'bg-white',
    };

    const indentPx = $derived((item.indent ?? 0) * 16);
</script>

<div
    in:fly={{ y: 20, duration: 300 }}
    out:fade={{ duration: 200 }}
    style="margin-left: {indentPx}px;"
    class={["flex items-center justify-between p-1 rounded-md min-w-[260px] w-full text-left text-black dark:text-white pointer-events-auto backdrop-blur-md border border-neutral-200 dark:border-neutral-800", typeClasses[item.type]]}
    role="alert"
>
    {#if item.indent}
        <Icon icon="lucide:corner-down-right" class="size-3.5 mr-1 opacity-40 select-none"/>
    {/if}
    <span class="text-xs md:text-sm flex-1">{item.message}</span>
</div>