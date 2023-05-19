import { resolve } from "path";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      link: [{ rel: "icon", type: "image/svg+xml", href: "/favicon.svg" }],
    },
  },
  modules: ["@nuxtjs/tailwindcss", "@nuxt/content", "nuxt-monaco-editor"],
  runtimeConfig: {
    public: {
      googleClientId: process.env.NUXT_GOOGLE_CLIENT_ID,
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
      content:
        process.env.NODE_ENV === "production"
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
    "/data": { redirect: { to: "data/tags", statusCode: 302 } },
  },
});
