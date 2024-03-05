import { defineConfig, sharpImageService } from "astro/config";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  integrations: [
    tailwind({ nesting: true })
  ],
  prefetch: { prefetchAll: true },
  image: { service: sharpImageService() }
})
