<template>
  <el-table ref="tableRef" row-key="date" :data="tableData">
    <el-table-column
      prop="name"
      label="文件名"
      sortable
      width="180"
      column-key="date"
      :filter-method="filterHandler"
    />
    <el-table-column prop="name" label="预览" width="180" />
    <el-table-column prop="address" label="Address" :formatter="formatter" />

    <el-table-column
      prop="tag"
      label="Tag"
      width="100"
      :filters="[
        { text: 'Home', value: 'Home' },
        { text: 'Office', value: 'Office' },
      ]"
      :filter-method="filterTag"
      filter-placement="bottom-end"
    >
    </el-table-column>
  </el-table>
</template>
<script setup lang="ts">
import "./index.scss";

import { useQuery } from "@tanstack/vue-query";

import type { fileList, GetFolder } from "~/services/types";
const tableData = ref<fileList[]>([
  {
    name: "111.jpg",
    size: 1024,
    type: "file",
    last_modified: "2025-05-14T11:20:11+08:00"
  },
  {
    name: "222.jpg",
    size: 1024,
    type: "file",
    last_modified: "2025-05-14T11:20:11+08:00"
  }
])
const getFolder = async (location: string | string[]): Promise<GetFolder> => {
  const res = await fetch("/api/files", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Key: localStorage.getItem("key") || ""
    },
    body: JSON.stringify({ location })
  });
  return res.json();
};
</script>