// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: "Cube"
    }
  },
  nitro: {
    handlers: [
      {
        route: "/api/**",
        handler: "~/server/api/proxy.handler.ts"
      }
    ]
  },
  compatibilityDate: "2024-11-01",
  devtools: { enabled: false },
  modules: ["@nuxt/eslint", "@element-plus/nuxt", "@nuxt/fonts"],
  css: ["~/assets/css/main.css"]
});
