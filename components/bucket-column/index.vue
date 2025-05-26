<template>
  <div :class="styles.projectList">
    <div :class="styles.topIcon">
      <el-icon><house /></el-icon>
    </div>
    <template v-if="projectData">
      <nuxt-link v-for="bucket in projectData.bucket_list" :key="bucket" :href="`/home/${bucket}`">
        <div
          :class="styles.projectName"
          :style="bucket === selectedBucket ? { backgroundColor: 'rgb(200, 200, 200)' } : undefined"
        >
          {{ bucket }}
        </div>
      </nuxt-link>
    </template>
  </div>
  <slot></slot>
</template>

<script lang="ts" setup>
import { useQuery } from "@tanstack/vue-query";

import { getBucket } from "~/services/service";

import styles from "./index.module.scss";

defineProps<{
  selectedBucket: string;
}>();

const { data: projectData } = useQuery({
  queryKey: ["project"],
  queryFn: getBucket
});
</script>
