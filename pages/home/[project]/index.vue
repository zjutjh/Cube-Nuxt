<template>
  <section :class="styles.home">
    <file-column v-if="bucketList" :list="bucketList" :selected-name="bucketName" base-path="/home">
      <template #icon>
        <el-icon-folder />
      </template>
    </file-column>
    <file-column v-if="folderList" :list="folderList" :base-path="`/home/${bucketName}`">
      <template #icon>
        <el-icon-folder />
      </template>
    </file-column>
  </section>
</template>

<script lang="ts" setup>
import { useQuery } from "@tanstack/vue-query";

import { deleteFile, getBucket, getFolderOrFile } from "~/services/service";

import styles from "./index.module.scss";

const bucketName = useRoute().params.project as string;

const { data: bucketList } = useQuery({
  queryKey: ["bucketList"],
  queryFn: getBucket,
  select: (res) =>
    res.bucket_list
      .map((item) => ({
        name: item,
        type: "folder"
      }))
      .sort()
});

const { data: folderList } = useQuery({
  queryKey: ["folderList", bucketName] as const,
  queryFn: ({ queryKey }) => getFolderOrFile(queryKey[1] ?? "", "/"),
  select: (res) => res.file_list.filter((item) => item.type === "folder")
});

/* const handleDeleteFolder = async () => {
  if (!bucketName) {
    return;
  }

  await ElMessageBox.confirm(`确认删除${"文件夹"}?`, {
    confirmButtonText: "确认",
    cancelButtonText: "取消"
  });
  deleteFile(bucketName, "");
}; */
</script>
