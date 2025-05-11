<template>
  <div class="login">
    <el-card>
      <div class="title">欢迎来到精弘OSS</div>
      <el-input v-model="key" placeholder="请输入key" type="password" />
      <el-button class="button" type="primary" @click="login()">登录</el-button>
    </el-card>
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
  ElMessage.success("已使用新Key");
  router.push("/home");
};
</script>
