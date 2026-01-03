import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';

const parser = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
});

export async function GET(context) {
  const posts = await getCollection('blog', ({ data }) => {
    return data.draft !== true;
  });

  const sortedPosts = posts.sort((a, b) => 
    b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );

  return rss({
    // Channel metadata
    title: 'moex0 | Cybersecurity Blog',
    description: 'Cybersecurity research, threat intelligence, APT analysis, malware research, and security insights by moex0.',
    site: context.site,
    
    // Items
    items: sortedPosts.map((post) => {
      // Render markdown content to HTML
      const rawHtml = parser.render(post.body || '');
      
      // Sanitize HTML for RSS (remove scripts, etc.)
      const content = sanitizeHtml(rawHtml, {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat([
          'img', 'figure', 'figcaption', 'pre', 'code', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'
        ]),
        allowedAttributes: {
          ...sanitizeHtml.defaults.allowedAttributes,
          img: ['src', 'alt', 'title', 'width', 'height', 'loading'],
          a: ['href', 'title', 'target', 'rel'],
          code: ['class'],
          pre: ['class'],
        },
      });

      return {
        title: post.data.title,
        pubDate: post.data.pubDate,
        description: post.data.description,
        link: `/blog/${post.slug}/`,
        // Full content for RSS readers
        content,
        // Categories from tags
        categories: post.data.tags || [],
        // Author
        author: 'moex0',
        // Custom fields
        customData: post.data.updatedDate 
          ? `<updated>${post.data.updatedDate.toISOString()}</updated>`
          : '',
      };
    }),
    
    // Additional channel metadata
    customData: `
      <language>en-us</language>
      <copyright>Copyright ${new Date().getFullYear()} moex0</copyright>
      <managingEditor>moex0</managingEditor>
      <webMaster>moex0</webMaster>
      <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
      <ttl>60</ttl>
      <image>
        <url>${context.site}favicon.svg</url>
        <title>moex0 | Cybersecurity Blog</title>
        <link>${context.site}</link>
      </image>
    `.trim(),
  });
}
