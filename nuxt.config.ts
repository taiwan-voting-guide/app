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
    '@nuxt/image',
    '@nuxtjs/device',
    'nuxt-clarity-analytics',
    'nuxt-headlessui',
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
  routeRules: {
    '/api/get-all-politicians': {
      headers: {
        'Cache-Control': `public, s-max-age=${contentCacheTime} max-age=${contentCacheTime}`,
      },
    },
    '/api/get-all-tags': {
      headers: {
        'Cache-Control': `public, s-max-age=${contentCacheTime} max-age=${contentCacheTime}`,
      },
    },
    // TODO: remove this
    '/api/get-app-data': {
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
