<template>
  <div v-if="isProjectError" class="error-type">
    <el-alert title="Key错误" type="error" center :closable="false" />
    <span class="error-text">Error</span>
  </div>
  <div v-else class="home">
    <div class="side-bar">
      <div class="project-list">
        <div class="top-icon">
          <el-icon><House /></el-icon>
        </div>
        <div
          v-for="item in projectList"
          :key="item"
          class="project-name"
          :style="item === projectLocation ? { backgroundColor: 'rgb(200, 200, 200)' } : {}"
          @click="router.push(`/home/${item}/default`)"
        >
          <span class="title">{{ item }}</span>
        </div>
      </div>
      <div class="foler-list">
        <div
          v-if="!folderRevising"
          class="top-icon top-icon-folder"
          @click="folderRevising = !folderRevising"
        >
          <el-icon><Folder /></el-icon>
        </div>
        <div v-else class="top-icon-function">
          <el-icon @click="deleteFolder()"><FolderDelete /></el-icon>
        </div>
        <div
          v-for="item in fileList"
          :key="item.name"
          class="folder-name"
          :style="folderLocation === item.name ? { backgroundColor: 'rgb(225, 225, 225)' } : {}"
          @click="router.push(`/home/${projectLocation}/${item.name}`)"
        >
          <span class="title">{{ item.name }}</span>
        </div>
      </div>
    </div>
    <div class="main">
      <div class="top-bar">
        <div class="left-block">
          <el-button
            v-if="folderRevising || projectRevising"
            bg
            plain
            type="info"
            @click="
              folderRevising = false;
              projectRevising = false;
            "
            >取消</el-button
          >
        </div>
        <div class="switch-block">
          保持文件名
          <el-switch v-model="retainName"></el-switch>
          保持格式
          <el-switch v-model="dontConvert"></el-switch>
        </div>
        <div>
          <el-button bg plain type="primary" class="upload" @click="upload()"
            ><el-icon><Upload /></el-icon>上传文件</el-button
          >
          <el-button bg plain type="info" @click="router.push('/login')">返回登录</el-button>
        </div>
      </div>
      <myTable />
    </div>
  </div>
</template>
<script setup lang="ts">
import "./index.scss";

import { useQuery } from "@tanstack/vue-query";

import { deleteFile, getBucket, getFolder, uploadFile } from "~/services/service";
import type { GetBucket, GetFolder } from "~/services/types";

import myTable from "./table/index.vue";
const router = useRouter();

/** 为 true 时不改变原有文件名，否则使用 UUID 作为文件名 */
const retainName = ref(true);

/** 为 true 时不转换文件为 webp 格式 若文件不是图片则报错 */
const dontConvert = ref(true);

const projectLocation = useRoute().params.project;
const folderLocation = useRoute().params.folder;

const projectList = computed(() => {
  return projectData.value?.data.bucket_list;
});

const fileList = computed(() => {
  if (fileData.value) return fileData.value.data.file_list;
  return [];
});
const upload = () => {
  if (folderLocation === "default" || projectLocation === "default") {
    ElMessage.error("请先选择文件夹");
    return;
  }

  const input = document.createElement("input");
  input.type = "file";
  input.multiple = true;

  input.onchange = async () => {
    const files = input.files;
    if (!files || files.length === 0) {
      ElMessage.warning("未选择任何文件");
      return;
    }

    try {
      const res = await uploadFile(
        files,
        projectLocation,
        folderLocation,
        dontConvert.value,
        retainName.value
      );
      if (!res.ok) throw new Error("上传失败");
      ElMessage.success("上传成功");
    } catch (err) {
      ElMessage.error("上传失败:" + err);
    }
  };

  input.click();
};

const { data: projectData, isError: isProjectError } = useQuery<GetBucket>({
  queryKey: ["project"],
  queryFn: () => getBucket()
});

const { data: fileData } = useQuery<GetFolder>({
  queryKey: ["file", projectLocation],
  queryFn: () => {
    return getFolder(projectLocation, "/");
  }
});

const projectRevising = ref(false);
const folderRevising = ref(false);

const deleteFolder = () => {
  ElMessageBox.confirm(`确认删除${"文件夹"}?`, {
    confirmButtonText: "确认",
    cancelButtonText: "取消"
  }).then(() => {
    deleteFile(projectLocation, folderLocation);
  });
};
</script>
