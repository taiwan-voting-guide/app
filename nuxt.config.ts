const contentCacheTime = 60 * 60;

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        lang: 'zh-Hant-TW',
      },
      bodyAttrs: {
        class: 'bg-slate-100',
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
    // TODO: define all api cache time
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
