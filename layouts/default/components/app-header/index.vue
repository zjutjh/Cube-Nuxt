<template>
  <header :class="styles.appHeader">
    <div />
    <div :class="styles.actions">
      <span> 保持文件名 </span>
      <el-switch v-model="retainName"></el-switch>
      <span> 保持格式 </span>
      <el-switch v-model="dontConvert"></el-switch>
      <el-button type="primary" :icon="UploadIcon">上传文件</el-button>
      <el-button plain @click="router.push('/login')">返回登录</el-button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { Upload as UploadIcon } from "@element-plus/icons-vue";

import styles from "./index.module.scss";

/** 为 true 时不改变原有文件名，否则使用 UUID 作为文件名 */
const retainName = ref(true);

/** 为 true 时不转换文件为 webp 格式 若文件不是图片则报错 */
const dontConvert = ref(true);

const router = useRouter();
</script>
