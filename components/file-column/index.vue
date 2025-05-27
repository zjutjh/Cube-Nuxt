<template>
  <div :class="styles.fileColumn">
    <div :class="styles.topIcon">
      <el-icon>
        <slot name="icon" />
      </el-icon>
    </div>
    <template v-if="list">
      <nuxt-link v-for="item in list" :key="item.name" :href="`${basePath}/${item.name}`">
        <div
          :class="styles.label"
          :style="
            selectedName === item.name ? { backgroundColor: 'rgb(200, 200, 200)' } : undefined
          "
        >
          {{ item.name }}
        </div>
      </nuxt-link>
    </template>
  </div>
</template>

<script lang="ts" setup>
import type { FileMeta } from "~/services/types";

import styles from "./index.module.scss";

defineProps<{
  list: FileMeta[];
  selectedName?: string;
  basePath: string;
}>();

defineSlots<{
  icon: () => void;
}>();
</script>
