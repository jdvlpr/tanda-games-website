<script>
    import ThemeSwitcher from "../components/ThemeSwitcher.svelte";
</script>

<header class="flex flex-wrap gap-2 justify-center items-center bg-neutral-200 dark:bg-neutral-700">
    <a href="/" title="home" class="text-2xl font-serif uppercase">T&A Games</a>
    <ThemeSwitcher edge="left" showText={false} />
</header>
