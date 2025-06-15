<script setup>
defineProps({
  value: {
    type: Number,
    required: true,
  }
});
</script>

<template>
  <span>Current value: {{ value }}</span>
</template>

<style scoped lang="scss">

</style>
