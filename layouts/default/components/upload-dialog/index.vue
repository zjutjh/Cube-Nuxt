<template>
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
        <span> 保持文件名 </span> <el-switch v-model="isContainName"></el-switch>

        <span> 转为webp </span> <el-switch v-model="isConvertWebp"></el-switch>
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
      </div>
      <div :class="styles.uploadTip">
        <div>支持多文件上传</div>
        <div>不存在的文件夹会自动创建</div>
      </div>
    </el-upload>
  </el-dialog>
</template>
<script setup lang="ts">
import type { UploadRequestOptions } from "element-plus/lib";

import { useRefreshFileTree } from "~/composables/use-refresh-file-tree";
import { uploadFile } from "~/services/service";

import styles from "./index.module.scss";
const { refreshFileTree } = useRefreshFileTree();
const uploadDialogVisible = defineModel<boolean>("uploadDialogVisible");

/** 为 true 时不改变原有文件名，否则使用 UUID 作为文件名 */
const isContainName = ref(true);

/** 为 true 时尝试转换为webp格式，若转换失败则报错 */
const isConvertWebp = ref(true);

const uploadBucket = ref<string>("");
const uploadFolder = ref<string>("");

const handleSuccess = () => {
  ElMessage.success(`上传成功`);
};
const handleError = () => {
  ElMessage.error(`上传失败`);
};
/** 为了适配elment-plus的upload组件的自动上传功能 特调的函数 */
const elAutoUpload = async (options: UploadRequestOptions) => {
  const formData = new FormData();
  formData.append("files", options.file);
  formData.append("bucket", uploadBucket.value);
  formData.append("location", uploadFolder.value);
  formData.append("convert_webp", String(isConvertWebp.value));
  /** 后端接口参数名叫use_uuid 为true时就用uuid覆盖原文件名 所以use_uuid为false即为isContainName为true */
  formData.append("use_uuid", String(!isContainName.value));
  try {
    await uploadFile(formData);
    refreshFileTree({ folderList: true, fileList: true });
  } catch (e: unknown) {
    if (e instanceof Error) {
      ElMessage.error(e.message);
    }
  }
};
</script>
