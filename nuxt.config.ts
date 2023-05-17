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
      politician: {
        prefix: "/politician",
        driver: "github",
        repo: "taiwan-voting-guide/content",
        branch: "main",
        dir: "politician",
      },
      tags: {
        prefix: "/tag",
        driver: "github",
        repo: "taiwan-voting-guide/content",
        branch: "main",
        dir: "/tag",
      },
    },
  },
  routeRules: {
    "/docs": { redirect: { to: "docs/introduction", statusCode: 302 } },
  },
});
