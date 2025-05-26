<template>
  <NuxtPage />
</template>

<script setup lang="ts">
import "./assets/global.scss";

import { Folder, FolderAdd, FolderDelete, House, Upload } from "@element-plus/icons-vue";
import { VueQueryPlugin } from "@tanstack/vue-query";
const app = useNuxtApp().vueApp;
app.use(VueQueryPlugin);

// 按需引入elm-icon
app.component("FolderIcon", Folder);
app.component("FolderAddIcon", FolderAdd);
app.component("FolderDeleteIcon", FolderDelete);
app.component("HouseIcon", House);
app.component("UploadIcon", Upload);
</script>
