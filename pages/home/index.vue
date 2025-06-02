<template>
  <section :class="styles.home">
    <file-column v-if="bucketList" :list="bucketList" base-path="/home">
      <template #icon>
        <el-icon-folder />
      </template>
    </file-column>
  </section>
</template>

<script lang="ts" setup>
import styles from "./index.module.scss";

const { data: bucketList } = useBucketList();
const { refreshQuery } = useRefreshQuery();
onMounted(async () => {
  await refreshQuery(["bucketList"]);
  if (!bucketList.value) {
    ElMessage.warning("key错误,请重新尝试");
  }
});
</script>
