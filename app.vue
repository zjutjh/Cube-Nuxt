<template>
  <NuxtPage />
</template>

<script setup lang="ts">
import "./assets/global.scss";

import { Folder, FolderAdd, FolderDelete, House } from "@element-plus/icons-vue";
import { VueQueryPlugin } from "@tanstack/vue-query";
const app = useNuxtApp().vueApp;
app.use(VueQueryPlugin);
// 按需引入elm-icon
app.component("Folder", Folder);
app.component("FolderAdd", FolderAdd);
app.component("FolderDelete", FolderDelete);
app.component("House", House);
</script>
