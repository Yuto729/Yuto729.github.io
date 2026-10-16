import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://yuto729.github.io',
  integrations: [tailwind(), mdx()],
  build: {
    // CSS を HTML に埋め込み、1リクエストで描画できるようにする
    inlineStylesheets: 'always',
  },
});
