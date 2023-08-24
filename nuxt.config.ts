import { resolve } from "path";

const isProd = process.env.NODE_ENV === "production";

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
    "@nuxtjs/device",
    "nuxt-clarity-analytics",
    "nuxt-headlessui",
    "nuxt-monaco-editor",
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
            driver: "github",
            repo: "taiwan-voting-guide/content",
            branch: "main",
            token: process.env.GITHUB_TOKEN,
            dir: "content",
          }
        : {
            driver: "fs",
            base: resolve(__dirname, "content/content"),
          },
    },
  },
  nitro: {
    publicAssets: [
      {
        baseURL: "api/_content",
        dir: "public/api/_content",
        maxAge: 3600,
      },
    ],
  },
  routeRules: {
    "/": { prerender: true },
    "/docs/**": { prerender: true },
    "/docs": { redirect: { to: "docs/introduction", statusCode: 302 } },
    "/data/**": { prerender: true },
    "/data": {
      redirect: { to: "data/tag_clicks_last_7_days", statusCode: 302 },
    },
    "/api/_content/**": {
      swr: 3600,
    },
  },
});
