<template>
  <section :class="styles.home">
    <div :class="styles.column">
      <bucket-column :selected-bucket="bucketName" />
    </div>
  </section>
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router";

import styles from "./index.module.scss";

const bucketName = useRoute().params.project as string;
</script>
