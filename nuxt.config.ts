// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
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
  app: {
    baseURL: "/frontend/",
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
    },
  },
  routeRules: {
    "/docs": { redirect: { to: "docs/introduction", statusCode: 302 } },
  },
});
