import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'
import vercel from '@astrojs/vercel/serverless'

export default defineConfig({
  site: 'https://abdillamit.com',
  integrations: [sitemap()],
  adapter: vercel(),
  i18n: {
    defaultLocale: 'ru',
    locales: ['ru', 'en', 'ky'],
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: true
    }
  },
  trailingSlash: 'never',
  build: {
    format: 'directory'
  }
})
