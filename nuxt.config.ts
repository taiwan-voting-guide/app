const contentCacheTime = 60 * 10;

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        lang: 'zh-Hant-TW',
      },
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
      title: '選前大補帖',
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1, minimum-scale=1',
        },
      ],
    },
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/html-validator',
    '@nuxt/image',
    '@nuxtjs/device',
    'nuxt-clarity-analytics',
    'nuxt-headlessui',
    'nuxt-gtag',
  ],
  runtimeConfig: {
    public: {
      env: process.env.NODE_ENV,
      mixpanelProjectToken: process.env.MIXPANEL_PROJECT_TOKEN,
    },
  },
  gtag: {
    id: process.env.GA_TRACKING_ID,
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
    '/api/get-politician-search-options': {
      headers: {
        'Cache-Control': `public, s-max-age=${contentCacheTime} max-age=${contentCacheTime}`,
      },
    },
    '/api/get-content-html': {
      headers: {
        'Cache-Control': `public, s-max-age=${contentCacheTime} max-age=${contentCacheTime}`,
      },
    },
    '/api/get-tag-added-last-7-days': {
      headers: {
        'Cache-Control': `public, s-max-age=${contentCacheTime} max-age=${contentCacheTime}`,
      },
    },
    '/api/get-politician-added-last-7-days': {
      headers: {
        'Cache-Control': `public, s-max-age=${contentCacheTime} max-age=${contentCacheTime}`,
      },
    },
    '/api/get-contribution': {
      headers: {
        'Cache-Control': `public, s-max-age=${contentCacheTime} max-age=${contentCacheTime}`,
      },
    },
    '/api/get-docs': {
      headers: {
        'Cache-Control': `public, s-max-age=${contentCacheTime} max-age=${contentCacheTime}`,
      },
    },
  },
});
