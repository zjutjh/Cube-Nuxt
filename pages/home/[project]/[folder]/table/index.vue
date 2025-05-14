<template>
  <el-table
    v-if="tableData.length > 0"
    ref="tableRef"
    row-key="name"
    :highlight-current-row="false"
    :data="tableData"
    class="table"
  >
    <el-table-column
      prop="name"
      label="文件名"
      width="180"
      column-key="last_modified"
      class="file-name"
    />
    <el-table-column prop="url" label="预览" width="200" class="preview">
      <template #default="scope">
        <el-image
          :src="scope.row.url"
          scroll-container="true"
          :preview-src-list="[scope.row.url]"
          :z-index="2009"
          fit="cover"
        />
      </template>
    </el-table-column>
    <el-table-column prop="type" label="文件类型" width="180" column-key="last_modified" />
    <el-table-column prop="last_modified" label="最后修改" width="400" column-key="last_modified" />
  </el-table>
</template>
<script setup lang="ts">
import "./index.scss";

import { useQuery } from "@tanstack/vue-query";

import type { GetFolder } from "~/services/types";

const projectLocation = useRoute().params.project;
const folderLocation = useRoute().params.folder;

const tableData = computed(() => {
  return fileData.value?.data?.file_list ?? [];
});
const getFile = async (location: string | string[]): Promise<GetFolder> => {
  const res = await fetch(`/api/files?location=${location}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Key: localStorage.getItem("key") || ""
    }
  });
  return res.json();
};
const { data: fileData } = useQuery<GetFolder>({
  queryKey: ["file", projectLocation, folderLocation],
  queryFn: () => {
    return getFile(`/${projectLocation}/${folderLocation}`);
  }
});
</script>
