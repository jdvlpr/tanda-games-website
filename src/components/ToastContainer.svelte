<script>
    import { toast } from '../stores/toast.svelte.js';
    import ToastItem from './Toast.svelte';
</script>

<div class="fixed bottom-4 left-1/2 -translate-1/2 z-200 pointer-events-none flex flex-col items-end">
    {#each toast.toasts as item (item.id)}
        <ToastItem {item} />
    {/each}
</div>