// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@nuxt/eslint", "@nuxt/icon", "@element-plus/nuxt"],
  css: ["element-plus/dist/index.css"],
  vite: {
    server: {
      proxy: {
        "/ap": {
          target: "http://101.126.88.138:8083",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, "")
        }
      }
    }
  }
});
