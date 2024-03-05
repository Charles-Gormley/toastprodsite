import { defineConfig, sharpImageService } from "astro/config";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  integrations: [
    // Allows writing nested CSS declarations in Astro components.
    tailwind({ nesting: true })
  ],
  prefetch: { prefetchAll: true },
  image: { service: sharpImageService() }
})
