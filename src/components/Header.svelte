<script>
    import ThemeSwitcher from "../components/ThemeSwitcher.svelte";
</script>

<header class="flex flex-wrap gap-2 justify-center items-center bg-neutral-50 dark:bg-neutral-950">
    <a href="/" title="home" class="text-2xl font-serif uppercase">T&A Games</a>
    <ThemeSwitcher edge="left" showText={false} />
</header>
