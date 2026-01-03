import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async () => {
  const posts = await getCollection('blog');

  const searchIndex = posts
    .filter(post => !post.data.draft)
    .map(post => ({
      slug: post.slug,
      title: post.data.title,
      description: post.data.description,
      tags: post.data.tags || [],
      pubDate: post.data.pubDate.toISOString(),
      // Extract first 200 characters of content for search
      excerpt: post.body?.slice(0, 200).replace(/[#*`\[\]]/g, '') || ''
    }));

  return new Response(JSON.stringify(searchIndex), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
};
