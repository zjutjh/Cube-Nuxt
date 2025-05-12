<template>
  <div class="home">
    <div class="top-bar">
      <div>
        <el-input v-model="reserchRef" size="default" placeholder="输入文件名"></el-input>
        保持文件名
        <el-switch v-model="retainName"></el-switch>
        覆盖同名
        <el-switch v-model="allowOverwrite"></el-switch>
        保持格式
        <el-switch v-model="dontConvert"></el-switch>
      </div>
      <div>
        <el-button bg text type="primary" class="upload" @click="upload()">
          上传文件
        </el-button>
        <el-button bg text type="primary" @click="router.push('/login')">返回登录</el-button>
      </div>
    </div>
    <div class="side-bar">
      <div class="project-list">
        
      </div>
      <div class="foler-list">

      </div>
    </div>
    <div class="main-content">
    </div>
  </div>
</template>
<script setup lang="ts">
import "./index.scss";
const router = useRouter();

const reserchRef = ref<string>("");
const uploadedFile = ref<File | null>(null);

/** 为 true 时不改变原有文件名，否则使用 UUID 作为文件名 */
const retainName = ref(true);
/** 为 true 时允许覆盖同名文件 否则报错 */
const allowOverwrite = ref(false);
/** 为 true 时不转换文件为 webp 格式 若文件不是图片则报错 */
const dontConvert = ref(true);
</script>
