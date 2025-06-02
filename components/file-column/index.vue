<template>
  <div :class="clsx(styles.fileColumn, className)">
    <div :class="styles.topIcon">
      <el-icon>
        <slot name="icon" />
      </el-icon>
    </div>
    <template v-if="list">
      <nuxt-link v-for="item in list" :key="item.name" :href="`${basePath}/${item.name}`">
        <div
          :class="styles.label"
          :style="selectedName === item.name ? { color: `rgb(0, 50, 120)` } : {}"
        >
          {{ item.name }}
        </div>
      </nuxt-link>
    </template>
  </div>
</template>

<script lang="ts" setup>
import clsx from "clsx";

import type { FileMeta } from "~/services/types";

import styles from "./index.module.scss";

defineProps<{
  list?: FileMeta[];
  selectedName?: string;
  basePath: string;
  className?: string;
}>();

defineSlots<{
  icon: () => void;
}>();
</script>
