import { defineConfig, envField } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import packageJson from "./package.json" assert { type: "json" };
import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  integrations: [svelte()],
  env: {
    schema: {
      // Available on both Server and Browser
      PUBLIC_METERED_USERNAME: envField.string({
        context: "client",
        access: "public",
      }),
      PUBLIC_METERED_CREDENTIAL: envField.string({
        context: "client",
        access: "public",
      }),
    },
  },
  vite: {
    define: {
      "import.meta.env.PACKAGE_VERSION": JSON.stringify(packageJson.version),
    },
    plugins: [tailwindcss()],
  },
  redirects: {
    "/": "/emigration",
  },
});
