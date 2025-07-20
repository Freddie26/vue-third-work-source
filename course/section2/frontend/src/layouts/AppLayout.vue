<script setup>
import { useRoute } from "vue-router";
import { shallowRef, watch } from "vue";
import AppLayoutDefault from "@/layouts/AppLayoutDefault.vue";

const route = useRoute();
const layout = shallowRef(null);

watch(
  () => route.meta,
  async (meta) => {
    try {
      const lo = meta.layout;
      if (lo) {
        const component = await import( /* @vite-ignore */ `./${lo}.vue`);
        layout.value = component?.default || AppLayoutDefault;
      } else {
        layout.value = AppLayoutDefault;
      }
    } catch (e) {
      console.error(
        "Динамический шаблон не найден. Установлен шаблон по-умолчанию.",
        e,
      );
      layout.value = AppLayoutDefault;
    }
  },
);
</script>

<template>
  <component :is="layout">
    <slot />
  </component>
</template>

<style lang="scss" scoped>
.app_layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.content {
  display: flex;
  flex-grow: 1;
}
</style>
