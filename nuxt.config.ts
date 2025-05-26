// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: "精弘OSS"
    }
  },
  compatibilityDate: "2024-11-01",
  devtools: { enabled: false },
  modules: ["@nuxt/eslint", "@element-plus/nuxt"],
  css: ["element-plus/dist/index.css"],
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
