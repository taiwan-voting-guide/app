import { resolve } from "path";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      link: [{ rel: "icon", type: "image/svg+xml", href: "/favicon.svg" }],
      title: "選前大補帖",
    },
  },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxt/content",
    "nuxt-monaco-editor",
    "nuxt-clarity-analytics",
  ],
  runtimeConfig: {
    isServer: true,
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
      content: {
        driver: "fs",
        base: resolve(__dirname, "content/content"),
      },
    },
  },
  routeRules: {
    "/docs": { redirect: { to: "docs/introduction", statusCode: 302 } },
    "/data": {
      redirect: { to: "data/tag_clicks_last_7_days", statusCode: 302 },
    },
  },
});
