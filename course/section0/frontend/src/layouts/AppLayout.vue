<template>
  <div class="app_layout">
    <app-layout-header></app-layout-header>
    <slot></slot>
  </div>
</template>

<script setup>
import AppLayoutHeader from "@/layouts/AppLayoutHeader.vue";

</script>

<style scoped lang="scss">
.app_layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
</style>
