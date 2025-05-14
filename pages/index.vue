<template>
  <div>
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
onMounted(() => {
  if (localStorage.getItem("key")) {
    router.push("/home/default/default");
  } else {
    router.push("/login");
  }
});
</script>
