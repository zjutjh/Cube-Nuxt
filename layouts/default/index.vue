<template>
  <section :class="styles.layout">
    <app-header />
    <main :class="styles.mainContent">
      <client-only>
        <slot />
      </client-only>
    </main>
  </section>
</template>

<script lang="ts" setup>
import AppHeader from "./components/app-header/index.vue";
import styles from "./index.module.scss";
</script>
