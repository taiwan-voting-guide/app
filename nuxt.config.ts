import { resolve } from "path";

const isProd = process.env.NODE_ENV === "production";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      link: [{ rel: "icon", type: "image/svg+xml", href: "/favicon.svg" }],
    },
    baseURL: isProd ? "/frontend/" : "/",
  },
  modules: ["@nuxtjs/tailwindcss", "@nuxt/content", "nuxt-monaco-editor"],
  runtimeConfig: {
    public: {
      env: process.env.NODE_ENV,
      mixpanelProjectToken: process.env.NUXT_MIXPANEL_PROJECT_TOKEN,
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
            dir: "/content",
          }
        : {
            driver: "fs",
            base: resolve(__dirname, "content/dev"),
          },
      docs: {
        driver: "fs",
        prefix: "/docs", // All contents inside this source will be prefixed with `/docs`
        base: resolve(__dirname, "content/docs"),
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
