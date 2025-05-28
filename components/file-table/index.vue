<template>
  <el-table row-key="name" :data="fileList" height="100%">
    <el-table-column
      prop="name"
      label="文件名"
      width="320"
      column-key="last_modified"
      show-overflow-tooltip
    />
    <el-table-column prop="url" label="预览">
      <template #default="scope">
        <el-image
          :class="styles.imagePreview"
          :src="getFileRealUrl(scope.row.object_key)"
          :preview-src-list="[getFileRealUrl(scope.row.object_key)]"
          preview-teleported
          hide-on-click-modal
          fit="cover"
        />
      </template>
    </el-table-column>
    <el-table-column prop="type" label="文件类型" />
    <el-table-column prop="size" label="文件大小">
      <template #default="scope">
        {{ bytesToSizeString(scope.row.size) }}
      </template>
    </el-table-column>
    <el-table-column label="最后修改">
      <template #default="scope">
        {{ dayjs(scope.row.last_modified).format("YYYY-MM-DD HH:mm:ss") }}
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";
import dayjs from "dayjs";

import { getFolderOrFile } from "~/services/service";

import styles from "./index.module.scss";

const props = defineProps<{
  bucket: string;
  folder: string;
}>();

// http://remote/api/file?bucket=forum&object_key=abcccc/088afb14-3a15-11f0-b300-00163e7ed273.jpg
const getFileRealUrl = (objectKey: string) => {
  const url = new URL(import.meta.env.VITE_API_URL);
  url.href = `${url.href}api/file`;
  url.searchParams.append("bucket", props.bucket);
  url.searchParams.append("object_key", objectKey);
  return url.href;
};

const { data: fileList } = useQuery({
  queryKey: ["file-list", props.bucket, props.folder] as const,
  queryFn: ({ queryKey }) =>
    getFolderOrFile({
      bucket: queryKey[1],
      location: queryKey[2]
    }),
  select: (res) => res.file_list
});
</script>
