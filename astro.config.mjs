import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import packageJson from "./package.json" assert { type: "json" };
import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  vite: {
    define: {
      "import.meta.env.PACKAGE_VERSION": JSON.stringify(packageJson.version),
    },
    plugins: [tailwindcss()],
  },
  integrations: [svelte()],
});
