// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: "Cube"
    }
  },
  compatibilityDate: "2024-11-01",
  devtools: { enabled: false },
  modules: ["@nuxt/eslint", "@element-plus/nuxt", "@nuxt/fonts"],
  css: ["~/assets/css/main.css"],
  vite: {
    server: {
      proxy: {
        "/api": {
          target: process.env.VITE_API_URL,
          changeOrigin: true
        }
      }
    }
  }
});
