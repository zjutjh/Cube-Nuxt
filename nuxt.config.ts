// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: "精弘OSS"
    }
  },
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@nuxt/eslint", "@element-plus/nuxt"],
  css: ["element-plus/dist/index.css"],
  vite: {
    server: {
      proxy: {
        "/api": {
          target: "http://101.126.88.138:8083",
          changeOrigin: true
        }
      }
    }
  }
});
