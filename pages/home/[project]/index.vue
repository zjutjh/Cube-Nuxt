<template>
  <section :class="styles.home">
    <file-column :list="bucketList" :selected-name="bucketName" base-path="/home">
      <template #icon>
        <el-icon-folder />
      </template>
    </file-column>
    <file-column :list="folderList" :base-path="`/home/${bucketName}`">
      <template #icon>
        <el-icon-folder />
      </template>
    </file-column>
  </section>
</template>

<script lang="ts" setup>
import styles from "./index.module.scss";

const bucketName = useRoute().params.project as string;

const { data: bucketList } = useBucketList();
const { data: folderList } = useFolderList({ bucketName });
</script>
