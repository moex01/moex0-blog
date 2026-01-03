import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import satori from 'satori';
import sharp from 'sharp';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

// Load fonts from local node_modules
function getInterRegularFont(): ArrayBuffer {
  const fontPath = join(process.cwd(), 'node_modules/@fontsource/inter/files/inter-latin-400-normal.woff');
  return readFileSync(fontPath).buffer;
}

function getInterBoldFont(): ArrayBuffer {
  const fontPath = join(process.cwd(), 'node_modules/@fontsource/inter/files/inter-latin-700-normal.woff');
  return readFileSync(fontPath).buffer;
}

function getJetBrainsMonoFont(): ArrayBuffer {
  const fontPath = join(process.cwd(), 'node_modules/@fontsource/jetbrains-mono/files/jetbrains-mono-latin-400-normal.woff');
  return readFileSync(fontPath).buffer;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getCollection('blog');
  return posts
    .filter((post) => !post.data.draft)
    .map((post) => ({
      params: { slug: post.slug },
      props: { title: post.data.title, description: post.data.description },
    }));
};

export const GET: APIRoute = async ({ props }) => {
  const { title, description } = props as { title: string; description: string };

  const interRegularFont = getInterRegularFont();
  const interBoldFont = getInterBoldFont();
  const jetBrainsMonoFont = getJetBrainsMonoFont();

  // Create the OG image using Satori
  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          backgroundColor: '#0d1117',
          padding: '60px',
          fontFamily: 'Inter',
        },
        children: [
          // Terminal window frame
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                height: '100%',
                backgroundColor: '#161b22',
                borderRadius: '12px',
                border: '1px solid #30363d',
                overflow: 'hidden',
              },
              children: [
                // Terminal title bar
                {
                  type: 'div',
                  props: {
                    style: {
                      display: 'flex',
                      alignItems: 'center',
                      padding: '16px 20px',
                      backgroundColor: '#21262d',
                      borderBottom: '1px solid #30363d',
                    },
                    children: [
                      // Window controls
                      {
                        type: 'div',
                        props: {
                          style: {
                            display: 'flex',
                            gap: '8px',
                          },
                          children: [
                            {
                              type: 'div',
                              props: {
                                style: {
                                  width: '12px',
                                  height: '12px',
                                  borderRadius: '50%',
                                  backgroundColor: '#ff5f56',
                                },
                              },
                            },
                            {
                              type: 'div',
                              props: {
                                style: {
                                  width: '12px',
                                  height: '12px',
                                  borderRadius: '50%',
                                  backgroundColor: '#ffbd2e',
                                },
                              },
                            },
                            {
                              type: 'div',
                              props: {
                                style: {
                                  width: '12px',
                                  height: '12px',
                                  borderRadius: '50%',
                                  backgroundColor: '#27ca40',
                                },
                              },
                            },
                          ],
                        },
                      },
                      // Terminal title
                      {
                        type: 'div',
                        props: {
                          style: {
                            marginLeft: '16px',
                            fontFamily: 'JetBrains Mono',
                            fontSize: '14px',
                            color: '#8b949e',
                          },
                          children: 'moex0@blog:~$',
                        },
                      },
                    ],
                  },
                },
                // Terminal content
                {
                  type: 'div',
                  props: {
                    style: {
                      display: 'flex',
                      flexDirection: 'column',
                      flex: 1,
                      padding: '40px',
                      justifyContent: 'center',
                    },
                    children: [
                      // Command line with title
                      {
                        type: 'div',
                        props: {
                          style: {
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '20px',
                          },
                          children: [
                            // Command prompt
                            {
                              type: 'div',
                              props: {
                                style: {
                                  display: 'flex',
                                  alignItems: 'center',
                                  fontFamily: 'JetBrains Mono',
                                  fontSize: '18px',
                                },
                                children: [
                                  {
                                    type: 'span',
                                    props: {
                                      style: { color: '#7ee787' },
                                      children: '$',
                                    },
                                  },
                                  {
                                    type: 'span',
                                    props: {
                                      style: { color: '#8b949e', marginLeft: '12px' },
                                      children: 'cat article.md',
                                    },
                                  },
                                ],
                              },
                            },
                            // Article title
                            {
                              type: 'div',
                              props: {
                                style: {
                                  fontSize: '42px',
                                  fontWeight: 700,
                                  color: '#e6edf3',
                                  lineHeight: 1.2,
                                  letterSpacing: '-0.02em',
                                },
                                children: title.length > 80 ? title.substring(0, 77) + '...' : title,
                              },
                            },
                            // Description
                            {
                              type: 'div',
                              props: {
                                style: {
                                  fontSize: '20px',
                                  color: '#8b949e',
                                  lineHeight: 1.5,
                                  marginTop: '8px',
                                },
                                children: description.length > 150 ? description.substring(0, 147) + '...' : description,
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                // Footer with branding
                {
                  type: 'div',
                  props: {
                    style: {
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '20px 40px',
                      borderTop: '1px solid #30363d',
                      backgroundColor: '#21262d',
                    },
                    children: [
                      // Logo/Brand
                      {
                        type: 'div',
                        props: {
                          style: {
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                          },
                          children: [
                            {
                              type: 'div',
                              props: {
                                style: {
                                  width: '40px',
                                  height: '40px',
                                  borderRadius: '8px',
                                  backgroundColor: '#7ee787',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  fontFamily: 'JetBrains Mono',
                                  fontSize: '20px',
                                  fontWeight: 700,
                                  color: '#0d1117',
                                },
                                children: 'm',
                              },
                            },
                            {
                              type: 'div',
                              props: {
                                style: {
                                  fontFamily: 'JetBrains Mono',
                                  fontSize: '24px',
                                  fontWeight: 700,
                                  color: '#e6edf3',
                                },
                                children: 'moex0',
                              },
                            },
                          ],
                        },
                      },
                      // Tagline
                      {
                        type: 'div',
                        props: {
                          style: {
                            fontFamily: 'JetBrains Mono',
                            fontSize: '16px',
                            color: '#58a6ff',
                          },
                          children: 'Cybersecurity Research & Analysis',
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Inter',
          data: interRegularFont,
          weight: 400,
          style: 'normal',
        },
        {
          name: 'Inter',
          data: interBoldFont,
          weight: 700,
          style: 'normal',
        },
        {
          name: 'JetBrains Mono',
          data: jetBrainsMonoFont,
          weight: 400,
          style: 'normal',
        },
        {
          name: 'JetBrains Mono',
          data: jetBrainsMonoFont,
          weight: 700,
          style: 'normal',
        },
      ],
    }
  );

  // Convert SVG to PNG using sharp with optimization
  const png = await sharp(Buffer.from(svg))
    .png({
      compressionLevel: 9, // Maximum compression (0-9)
      effort: 10, // Maximum effort for compression (1-10)
      palette: true, // Use indexed palette for smaller file size (OG images have limited colors)
      quality: 90, // Quality for palette generation
    })
    .toBuffer();

  return new Response(new Uint8Array(png), {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
