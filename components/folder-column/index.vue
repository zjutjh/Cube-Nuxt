<template>
  <div class="foler-list">
    <div
      v-if="!folderRevising"
      class="top-icon top-icon-folder"
      @click="folderRevising = !folderRevising"
    >
      <el-icon><folder /></el-icon>
    </div>
    <div v-else class="top-icon-function">
      <el-icon @click="handleDeleteFolder()"><folder-delete /></el-icon>
    </div>
    <NuxtLink v-for="folder in folderList" :key="folder.name" :to="`/home/${selectedBucket}/`">
      <div
        class="folder-name"
        :style="
          selectedFolder === folder.name ? { backgroundColor: 'rgb(225, 225, 225)' } : undefined
        "
      >
        {{ folder.name }}
      </div>
    </NuxtLink>
  </div>
</template>

<script lang="ts" setup>
import { Folder, FolderDelete } from "@element-plus/icons-vue";
import { useQuery } from "@tanstack/vue-query";

import { deleteFile, getFolderOrFile } from "~/services/service";

const folderRevising = ref(false);

const props = defineProps<{
  selectedBucket: string | undefined;
  selectedFolder: string | undefined;
}>();

const shouldQueryFolderList = computed(() => {
  return Boolean(props.selectedBucket);
});

const { data: folderList } = useQuery({
  queryKey: ["folderList", props.selectedBucket] as const,
  queryFn: ({ queryKey }) => getFolderOrFile(queryKey[1] ?? "", "/"),
  select: (res) => res.file_list.filter((item) => item.type === "folder"),
  enabled: shouldQueryFolderList
});

const handleDeleteFolder = async () => {
  if (!props.selectedBucket) {
    return;
  }

  await ElMessageBox.confirm(`确认删除${"文件夹"}?`, {
    confirmButtonText: "确认",
    cancelButtonText: "取消"
  });
  deleteFile(props.selectedBucket, "");
};
</script>
