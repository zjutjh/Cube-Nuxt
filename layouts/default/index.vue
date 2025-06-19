<template>
  <section :class="styles.layout">
    <app-header :bucket="bucketName" :folder="folderName" />
    <main :class="styles.mainContent">
      <client-only>
        <slot />
      </client-only>
    </main>
  </section>
</template>

<script lang="ts" setup>
import AppHeader from "./components/app-header/index.vue";
import styles from "./index.module.scss";

const bucketName = computed(() => useRoute().params.project as string);
const folderName = computed(() => useRoute().params.folder as string);
</script>
