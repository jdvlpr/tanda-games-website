<script>
    import { fly, fade } from 'svelte/transition';
    import { toast } from '../stores/toast.svelte.js';

    /** @type {{ item: import('../stores/toast.svelte.js').Toast }} */
    let { item } = $props();

    // Styling based on toast type using Tailwind
    const typeClasses = {
        success: 'bg-green-100/50 dark:bg-green-900/50',
        error: 'bg-red-100/50 dark:bg-red-900/50',
        warning: 'bg-amber-100/50 dark:bg-amber-900/50',
        info: 'bg-blue-100/50 dark:bg-blue-900/50'
    };
</script>

<div
    in:fly={{ y: 20, duration: 300 }}
    out:fade={{ duration: 200 }}
    class="flex items-center justify-between p-1 rounded-md min-w-[260px] w-full text-left text-black dark:text-white pointer-events-auto backdrop-blur-md border {typeClasses[item.type]}"
    role="alert"
>
    <span class="text-xs md:text-sm">{item.message}</span>
    
    <!-- <button 
        onclick={() => toast.remove(item.id)} 
        class="ml-2 opacity-50 hover:opacity-100 transition-opacity cursor-pointer"  
        aria-label="Close"
    >
        <svg xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" class="size-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
    </button> -->
</div>