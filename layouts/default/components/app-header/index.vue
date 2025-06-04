<template>
  <header :class="styles.appHeader">
    <div />
    <div :class="styles.actions">
      <el-button type="primary" :icon="ElIconUpload" @click="isUploadDialogVisible = true"
        >上传文件</el-button
      >
      <el-button plain @click="router.push('/login')">返回登录</el-button>
    </div>
    <upload-dialog v-model:upload-dialog-visible="isUploadDialogVisible" />
  </header>
</template>

<script setup lang="ts">
import UploadDialog from "../upload-dialog/index.vue";
import styles from "./index.module.scss";
const router = useRouter();
const isUploadDialogVisible = ref(false);
</script>
