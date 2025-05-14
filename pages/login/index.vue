<template>
  <div class="login">
    <div class="content">
      <div class="logo">
        <img src="/logo.png" alt="logo" />
      </div>
      <el-input v-model="key" placeholder="请输入key" type="password" show-password />
      <el-button class="button" type="info" @click="login()">登录</el-button>
    </div>
    <div class="footer">
      <a href="https://github.com/zjutjh/JH-OSS-Nuxt" target="_blank">前端</a>
      |
      <a href="https://github.com/zjutjh/JH-OSS" target="_blank">后端</a>
    </div>
  </div>
</template>
<script setup lang="ts">
import "./index.scss";

const key = ref("");

const router = useRouter();
const login = () => {
  if (!key.value) {
    ElMessage.error("请输入key");
    return;
  }
  localStorage.setItem("key", key.value);
  ElMessage.success("已使用新key");
  router.push("/home/default/default");
};
</script>
