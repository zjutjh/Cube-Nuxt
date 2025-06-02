<template>
  <header :class="styles.appHeader">
    <div />
    <div :class="styles.actions">
      <el-button type="primary" :icon="UploadIcon" @click="uploadDialogVisible = true"
        >上传文件</el-button
      >
      <el-button plain @click="router.push('/login')">返回登录</el-button>
    </div>
    <el-dialog
      v-model="uploadDialogVisible"
      title="上传文件"
      width="800px"
      append-to-body
      align-center
    >
      <div :class="styles.uploadSetting">
        <div :class="styles.uploadSettingDiv">
          <span>bucket</span> <el-input v-model="uploadBucket" :class="styles.settingInput" />

          <span>folder</span> <el-input v-model="uploadFolder" :class="styles.settingInput" />
          <span> 保持文件名 </span> <el-switch v-model="containName"></el-switch>

          <span> 保持格式 </span> <el-switch v-model="convertWebp"></el-switch>
        </div>
      </div>
      <el-upload
        v-if="uploadBucket && uploadFolder"
        drag
        multiple
        :on-success="handleSuccess"
        :on-error="handleError"
        :http-request="elAutoUpload"
        :class="styles.uploadArea"
      >
        <el-icon :class="styles.uploadIcon"><el-icon-upload-filled /></el-icon>
        <div :class="styles.uploadText">
          将文件拖到此处，或
          <span>点击上传</span>
          <br /><br />
          <span :class="styles.uploadTip">支持多文件上传</span>
        </div>
      </el-upload>
    </el-dialog>
  </header>
</template>

<script setup lang="ts">
import { Upload as UploadIcon } from "@element-plus/icons-vue";
import type { UploadRequestOptions } from "element-plus";

import { uploadFile } from "~/services/service";

import styles from "./index.module.scss";
const router = useRouter();
const { refreshQuery } = useRefreshQuery();
const uploadDialogVisible = ref(false);

/** 为 true 时不改变原有文件名，否则使用 UUID 作为文件名 */
const containName = ref(true);

/** 为 true 时尝试转换为webp格式，若转换失败则报错 */
const convertWebp = ref(true);

const uploadBucket = ref();
const uploadFolder = ref();

const handleSuccess = () => {
  ElMessage.success(`上传成功`);
};
const handleError = (e: any) => {
  ElMessage.error(`上传失败` + e);
};
/** 为了适配elment-plus的upload组件的自动上传功能 特调的函数 */
const elAutoUpload = async (options: UploadRequestOptions) => {
  const formData = new FormData();
  formData.append("files", options.file);
  formData.append("bucket", uploadBucket.value);
  formData.append("location", uploadFolder.value);
  formData.append("convert_webp", String(convertWebp.value));
  formData.append("use_uuid", String(!containName.value));
  try {
    await uploadFile(formData);
    refreshQuery(["fileList", "folderList"]);
  } catch (e: any) {
    options.onError(e);
  }
};
</script>
