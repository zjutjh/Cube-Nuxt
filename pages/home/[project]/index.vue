<template>
  <!-- <div class="load-type" v-if="isProjectLoading">
    <el-skeleton animated />
  </div>
  <div class="error-type" v-else-if="isProjectError">
    <el-alert title="报错" type="error" center :closable="false" />
    Error
  </div> -->
  <div class="home">
    <div class="top-bar">
      <div class="left-block">
        <el-input
          v-model="reserchRef"
          clearable
          placeholder="搜索"
          prefix-icon="Search"
          size="default"
        />
        保持文件名
        <el-switch v-model="retainName"></el-switch>
        覆盖同名
        <el-switch v-model="allowOverwrite"></el-switch>
        保持格式
        <el-switch v-model="dontConvert"></el-switch>
      </div>
      <div>
        <el-button bg text type="primary" class="upload" @click="upload()">上传文件</el-button>
        <el-button bg text type="primary" @click="router.push('/login')">返回登录</el-button>
      </div>
    </div>
    <div class="main">
      <div class="side-bar">
        <div class="project-list">
          <div class="description">
            <el-icon><House /></el-icon>
          </div>
          <div
            v-for="item in projectList"
            :key="item.name"
            class="project-name"
            @click="fileLocation = item.name"
          >
            {{ item.name }}
          </div>
        </div>
        <div
          class="foler-list"
          :style="{ visibility: fileLocation === 'default' ? 'hidden' : 'visible' }"
        >
          <div class="description">
            <el-icon><FolderAdd /></el-icon>
          </div>
          <div v-for="item in fileList" :key="item.name" class="folder-name">
            {{ item.name }}
          </div>
        </div>
      </div>
      <div class="main-content">
        <myTable />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import "./index.scss";

import { useQuery } from "@tanstack/vue-query";

import type { GetFolder } from "~/services/types";

import myTable from "./table/index.vue";
const router = useRouter();

/** 为 true 时不改变原有文件名，否则使用 UUID 作为文件名 */
const retainName = ref(true);
/** 为 true 时允许覆盖同名文件 否则报错 */
const allowOverwrite = ref(false);
/** 为 true 时不转换文件为 webp 格式 若文件不是图片则报错 */
const dontConvert = ref(true);

const reserchRef = ref<string>("");

const fileLocation = useRoute().params.project;

const projectList = [
  {
    name: "QA",
    size: "4.00",
    type: "dir",
    last_modified: "2025-05-14T11:20:11+08:00"
  },
  {
    name: "form",
    size: "4.00",
    type: "dir",
    last_modified: "2025-05-14T11:19:10+08:00"
  },
  {
    name: "wjh",
    size: "4.00",
    type: "dir",
    last_modified: "2025-05-14T11:19:05+08:00"
  }
];

const fileList = [
  {
    name: "bottom",
    size: "4.00",
    type: "dir",
    last_modified: "2025-05-14T11:20:11+08:00"
  },
  {
    name: "top",
    size: "4.00",
    type: "dir",
    last_modified: "2025-05-14T11:19:10+08:00"
  },
  {
    name: "left",
    size: "4.00",
    type: "dir",
    last_modified: "2025-05-14T11:19:05+08:00"
  }
];
const upload = () => {
  console.log(1);
};

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

const {
  data: projectData,
  isError: isProjectError,
  isLoading: isProjectLoading
} = useQuery<GetFolder>({
  queryKey: ["project"],
  queryFn: () => getFolder("/")
});

const { data: fileData } = useQuery<GetFolder>({
  queryKey: ["file"],
  queryFn: () => {
    return getFolder(fileLocation);
  }
});
</script>
