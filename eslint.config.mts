import zjutjh from "@zjutjh/eslint-config";

export default zjutjh({
  vue: true,
  ts: {
    parserOptions: {
      project: ["./tsconfig.json", "**/packages/*/tsconfig.json"]
    }
  },
  prettier: true,
  ignores: ["**/.output", "**/.nuxt", "**/dist"]
});
