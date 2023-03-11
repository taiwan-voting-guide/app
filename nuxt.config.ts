// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss"],
  runtimeConfig: {
    public: {
      googleClientId: process.env.NUXT_GOOGLE_CLIENT_ID,
      backendEndpoint: process.env.NUXT_BACKEND_ENDPOINT,
    },
  },
  typescript: {
    typeCheck: true,
  },
});
