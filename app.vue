<template>
  <NuxtPage />
</template>

<script setup lang="ts">
import "./assets/global.scss";

import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import { VueQueryPlugin } from "@tanstack/vue-query";
const app = useNuxtApp().vueApp;

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.use(VueQueryPlugin);
</script>
