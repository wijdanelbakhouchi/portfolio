import { defineConfig, loadEnv } from 'vite';
import { renderPortfolio } from './src/render.ts';
import { createContactHandler } from './server/contact.ts';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'SITE_');
  const origin = env.SITE_URL ? new URL(env.SITE_URL).origin : '';
  // Server-only values are never injected into the HTML or browser bundle.
  const serverEnv = { ...loadEnv(mode, process.cwd(), ['RESEND_', 'CONTACT_', 'SITE_']), ...process.env };
  const contact = createContactHandler({ env: serverEnv });
  const mountContact = server => {
    server.middlewares.use('/api/contact', (req, res, next) => {
      contact(req, res).catch(next);
    });
  };
  return {
    base: './',
    plugins: [
      { name: 'local-contact-api', configureServer: mountContact, configurePreviewServer: mountContact },
      {
        name: 'site-metadata',
        transformIndexHtml: { order: 'pre', handler(html) {
          return html.replace('<!-- PORTFOLIO -->', renderPortfolio()).replace(
            '<!-- DEPLOYMENT_METADATA -->',
            origin
              ? `<link rel="canonical" href="${origin}/"><meta property="og:url" content="${origin}/"><meta property="og:image" content="${origin}/images/social-card.png">`
              : ''
          );
        } },
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
