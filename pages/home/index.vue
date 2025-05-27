<template>
  <section :class="styles.home">
    <file-column v-if="bucketList" :list="bucketList" :selected-name="bucketName" base-path="/home">
      <template #icon>
        <el-icon-folder />
      </template>
    </file-column>
  </section>
</template>

<script lang="ts" setup>
import { useQuery } from "@tanstack/vue-query";
import { useRoute } from "vue-router";

import { getBucket } from "~/services/service";

import styles from "./index.module.scss";

const bucketName = useRoute().params.project as string;

const { data: bucketList } = useQuery({
  queryKey: ["bucketList"],
  queryFn: getBucket,
  select: (res) =>
    res.bucket_list.map((item) => ({
      name: item,
      type: "folder"
    }))
});
</script>
