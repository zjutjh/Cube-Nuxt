<template>
  <div class="home">
    <h1>{{ route.params.project }}</h1>
  </div>
</template>
<script setup lang="ts">
import "../index.scss";
const route = useRoute();


</script>
