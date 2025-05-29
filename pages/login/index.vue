<template>
  <div :class="styles.login">
    <div :class="styles.logo">
      <img :src="LogoImage" alt="logo" :draggable="false" />
    </div>
    <section :class="styles.form">
      <el-input
        v-model="apiKey"
        size="large"
        placeholder="请输入 API Key"
        type="password"
        show-password
        clearable
      />
      <el-button
        size="large"
        :disabled="apiKey.length <= 0"
        :class="styles.loginButton"
        type="primary"
        @click="handleConfirmAPIKey"
      >
        登录
      </el-button>
    </section>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";

import LogoImage from "@/assets/logo.png";
import { useApiKey } from "@/composables/use-api-key";

import styles from "./index.module.scss";

definePageMeta({
  layout: false
});

const apiKey = useApiKey();
const router = useRouter();

const handleConfirmAPIKey = () => {
  router.push("/home");
};
</script>
