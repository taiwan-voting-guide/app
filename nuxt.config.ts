import { resolve } from 'path';

const isProd = process.env.NODE_ENV === 'production';
const contentCacheTime = 60 * 60;

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
      title: '選前大補帖',
    },
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/content',
    '@nuxtjs/device',
    'nuxt-clarity-analytics',
    'nuxt-headlessui',
    'nuxt-monaco-editor',
  ],
  runtimeConfig: {
    public: {
      env: process.env.NODE_ENV,
      mixpanelProjectToken: process.env.MIXPANEL_PROJECT_TOKEN,
    },
  },
  typescript: {
    typeCheck: true,
    tsConfig: {
      compilerOptions: {
        resolveJsonModule: true,
      },
    },
  },
  content: {
    sources: {
      content: isProd
        ? {
            driver: 'github',
            repo: 'taiwan-voting-guide/content',
            branch: 'main',
            token: process.env.GITHUB_TOKEN,
            dir: 'content',
            ttl: contentCacheTime,
          }
        : {
            driver: 'fs',
            base: resolve(__dirname, 'content/content'),
          },
    },
  },
  routeRules: {
    '/api/_content/**': {
      headers: {
        'Cache-Control': `public, s-max-age=${contentCacheTime} max-age=${contentCacheTime}`,
      },
    },
  },
});
