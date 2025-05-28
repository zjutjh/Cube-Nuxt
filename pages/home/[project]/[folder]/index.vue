<template>
  <section :class="styles.home">
    <file-column
      v-if="bucketList"
      :list="bucketList"
      :selected-name="bucketName"
      base-path="/home"
      :class-name="styles.fileColumn"
    >
      <template #icon>
        <el-icon-folder />
      </template>
    </file-column>
    <file-column
      v-if="folderList"
      :list="folderList"
      :selected-name="folderName"
      :base-path="`/home/${bucketName}`"
      :class-name="styles.fileColumn"
    >
      <template #icon>
        <el-icon-folder />
      </template>
    </file-column>
    <section :class="styles.tableWrapper">
      <file-table :bucket="bucketName" :folder="folderName" />
    </section>
  </section>
</template>

<script lang="ts" setup>
import styles from "./index.module.scss";

const bucketName = useRoute().params.project as string;
const folderName = useRoute().params.folder as string;

const { data: bucketList } = useBucketList();
const { data: folderList } = useFolderList({ bucketName });
</script>
