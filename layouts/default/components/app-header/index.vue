<template>
  <header :class="styles.appHeader">
    <div />
    <div :class="styles.actions">
      <el-button type="primary" :icon="UploadIcon" @click="uploadDialogVisible = true"
        >上传文件</el-button
      >
      <el-button plain @click="router.push('/login')">返回登录</el-button>
    </div>
    <upload-dialog v-model="uploadDialogVisible" />
  </header>
</template>

<script setup lang="ts">
import { Upload as UploadIcon } from "@element-plus/icons-vue";

import UploadDialog from "~/layouts/default/components/upload-dialog/index.vue";

import styles from "./index.module.scss";
const router = useRouter();
const uploadDialogVisible = ref(false);
</script>
