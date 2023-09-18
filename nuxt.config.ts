import { resolve } from 'path';

const isProd = process.env.NODE_ENV === 'production';
const contentCacheTime = 60 * 60;

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        lang: 'zh-Hant-TW',
      },
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
      title: '選前大補帖',
    },
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/html-validator',
    '@nuxt/content',
    '@nuxt/image',
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
      // TODO; deprecated content API
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
    '/api/get-content': {
      headers: {
        'Cache-Control': `public, s-max-age=${contentCacheTime} max-age=${contentCacheTime}`,
      },
    },
    '/api/get-front-matter': {
      headers: {
        'Cache-Control': `public, s-max-age=${contentCacheTime} max-age=${contentCacheTime}`,
      },
    },
  },
});
