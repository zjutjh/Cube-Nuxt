<template>
  <section :class="styles.home">
    <file-column v-if="bucketList" :list="bucketList" :selected-name="bucketName" base-path="/home">
      <template #icon>
        <el-icon-folder />
      </template>
    </file-column>
  </section>
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router";

import styles from "./index.module.scss";

const bucketName = useRoute().params.project as string;

const { data: bucketList } = useBucketList();
</script>
