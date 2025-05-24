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
          <el-icon @click="newFoloder('folder')"><FolderAdd /></el-icon
          ><el-icon @click="deleteFolder('folder')"><FolderDelete /></el-icon>
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
          覆盖同名
          <el-switch v-model="allowOverwrite"></el-switch>
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

import type { GetBucket, GetFolder } from "~/services/types";

import myTable from "./table/index.vue";
const router = useRouter();

/** 为 true 时不改变原有文件名，否则使用 UUID 作为文件名 */
const retainName = ref(true);
/** 为 true 时允许覆盖同名文件 否则报错 */
const allowOverwrite = ref(false);
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

    const formData = new FormData();
    for (const file of files) {
      formData.append("files", file);
    }

    formData.append("location", `/${projectLocation}/${folderLocation}`);
    formData.append("dont_convert", String(dontConvert.value));
    formData.append("retain_name", String(retainName.value));
    formData.append("allow_overwrite", String(allowOverwrite.value));

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: {
          Key: localStorage.getItem("key") || ""
          // 不设置 Content-Type，浏览器自动处理 multipart/form-data
        },
        body: formData
      });

      if (!res.ok) throw new Error("上传失败");
      ElMessage.success("上传成功");
    } catch (err) {
      ElMessage.error("上传失败:" + err);
    }
  };

  input.click();
};

const getFolder = async (location: string | string[]): Promise<GetFolder> => {
  const res = await fetch(`/api/files?bucket=${projectLocation}&location=${location}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Key: localStorage.getItem("key") || ""
    }
  });
  return res.json();
};
const getBucket = async (): Promise<GetBucket> => {
  const res = await fetch(`/api/buckets`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Key: localStorage.getItem("key") || ""
    }
  });
  return res.json();
};

const { data: projectData, isError: isProjectError } = useQuery<GetBucket>({
  queryKey: ["project"],
  queryFn: () => getBucket()
});

const { data: fileData } = useQuery<GetFolder>({
  queryKey: ["file", projectLocation],
  queryFn: () => {
    return getFolder("/");
  }
});

const projectRevising = ref(false);
const folderRevising = ref(false);
const newFoloder = (type: "project" | "folder") => {
  ElMessageBox.prompt(`请输入${type === "project" ? "项目名" : "文件夹名"}`, {
    confirmButtonText: "确认",
    cancelButtonText: "取消"
  })
    .then(({ value }) => {
      if (value) {
        fetch("/api/create-dir", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Key: localStorage.getItem("key") || ""
          },
          body: JSON.stringify({
            target: type === "project" ? value : `/${projectLocation}/${value}`
          })
        });
      }
    })
    .catch(() => {
      ElMessage.error("取消");
    });
};

const deleteFolder = (type: "project" | "folder") => {
  ElMessageBox.confirm(`确认删除${type === "project" ? "项目" : "文件夹"}？`, {
    confirmButtonText: "确认",
    cancelButtonText: "取消"
  }).then(() => {
    fetch("/api/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Key: localStorage.getItem("key") || ""
      },
      body: JSON.stringify({
        target: type === "project" ? projectLocation : `/${projectLocation}/${folderLocation}`
      })
    });
  });
};
</script>
