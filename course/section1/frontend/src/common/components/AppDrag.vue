<script setup>
import { MOVE, DATA_TRANSFER_PAYLOAD } from "@/common/constants";

const props = defineProps({
  transferData: {
    type: Object,
    required: true
  }
})

function onDrag({ dataTransfer }) {
  dataTransfer.effectAllowed = MOVE;
  dataTransfer.dropEffect = MOVE;
  dataTransfer.setData(
      DATA_TRANSFER_PAYLOAD,
      JSON.stringify(props.transferData)
  );
}
</script>

<template>
  <div
      :draggable="true"
      @dragstart.self="onDrag"
      @dragover.prevent
      @dragenter.prevent
  >
    <slot/>
  </div>
</template>

<style scoped lang="scss">

</style>
