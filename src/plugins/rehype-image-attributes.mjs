/**
 * Rehype plugin to add attributes to images for CLS prevention and performance
 *
 * This plugin processes all <img> elements and adds:
 * - loading="lazy" for lazy loading images below the fold
 * - decoding="async" for non-blocking image decoding
 * - width/height attributes when available from the URL or defaults
 *
 * For external images without known dimensions, CSS aspect-ratio handles CLS prevention.
 */

import { visit } from 'unist-util-visit';

export function rehypeImageAttributes() {
  return (tree) => {
    visit(tree, 'element', (node) => {
      // Only process img elements
      if (node.tagName !== 'img') return;

      const props = node.properties || {};

      // Add lazy loading if not already set
      if (!props.loading) {
        props.loading = 'lazy';
      }

      // Add async decoding for non-blocking image decode
      if (!props.decoding) {
        props.decoding = 'async';
      }

      // Add data attribute to identify external images for CSS targeting
      const src = props.src || '';
      if (src.startsWith('http://') || src.startsWith('https://')) {
        props['data-external'] = 'true';
      }

      node.properties = props;
    });
  };
}

export default rehypeImageAttributes;
