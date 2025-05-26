<template>
  <bucket-column :selected-bucket="bucketName" />
  <folder-column :selected-bucket="bucketName" :selected-folder="folderName" />
  <myTable />
</template>
<script setup lang="ts">
import myTable from "./table/index.vue";

const bucketName = useRoute().params.project as string;
const folderName = useRoute().params.folder as string;
</script>
