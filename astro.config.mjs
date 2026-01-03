// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import rehypeFigure from 'rehype-figure';
import rehypeExternalLinks from 'rehype-external-links';
import { rehypeImageAttributes } from './src/plugins/rehype-image-attributes.mjs';

// https://astro.build/config
export default defineConfig({
  // Update this to your GitHub Pages URL: https://<username>.github.io/<repo-name>/
  // Or your custom domain: https://yourdomain.com
  site: 'https://moex01.github.io/moex0-blog',

  integrations: [mdx(), sitemap()],

  // Image optimization configuration
  // Uses sharp (already installed) for WebP/AVIF conversion and resizing
  image: {
    // Use sharp for image processing with optimized settings
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {
        // Limit image dimensions to prevent excessive memory usage
        limitInputPixels: 268402689 // ~16k x 16k pixels
      }
    }
    // Note: External images (GitBook CDN) are not optimized due to complex URLs
    // Local images in src/assets/ are automatically optimized
  },

  vite: {
    plugins: [tailwindcss()]
  },

  markdown: {
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark'
      },
      defaultColor: 'dark'
    },
    rehypePlugins: [
      rehypeFigure,
      [rehypeExternalLinks, { target: '_blank', rel: ['noopener', 'noreferrer'] }],
      rehypeImageAttributes // Adds loading="lazy" and decoding="async" to images for CLS prevention
    ]
  }
});
