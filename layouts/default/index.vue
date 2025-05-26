<template>
  <app-header />
  <client-only>
    <slot />
  </client-only>
</template>

<script lang="ts" setup>
import AppHeader from "./components/app-header/index.vue";
</script>
