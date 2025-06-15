<script setup>
import { DATA_TRANSFER_PAYLOAD } from "@/common/constants";

const emit = defineEmits(['drop'])

function onDrop({ dataTransfer }) {
  if (!dataTransfer) {
    return;
  }
  const payload = dataTransfer.getData(DATA_TRANSFER_PAYLOAD);
  if (payload) {
    const transferData = JSON.parse(payload);
    emit('drop', transferData);
  }
}
</script>

<template>
  <div
      @drop.stop="onDrop"
      @dragover.prevent
      @dragenter.prevent
  >
    <slot/>
  </div>
</template>

<style scoped lang="scss">

</style>
