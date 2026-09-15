import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'SITE_');
  const origin = env.SITE_URL ? new URL(env.SITE_URL).origin : '';
  return {
    base: './',
    plugins: [
      {
        name: 'site-metadata',
        transformIndexHtml(html) {
          return html.replace(
            '<!-- DEPLOYMENT_METADATA -->',
            origin
              ? `<link rel="canonical" href="${origin}/"><meta property="og:url" content="${origin}/"><meta property="og:image" content="${origin}/images/social-card.png">`
              : ''
          );
        },
        generateBundle() {
          this.emitFile({
            type: 'asset',
            fileName: 'robots.txt',
            source: `User-agent: *\nAllow: /\n${origin ? `Sitemap: ${origin}/sitemap.xml\n` : ''}`,
          });
          if (origin) {
            this.emitFile({
              type: 'asset',
              fileName: 'sitemap.xml',
              source: `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${origin}/</loc></url></urlset>`,
            });
          }
        },
      },
    ],
  };
});
