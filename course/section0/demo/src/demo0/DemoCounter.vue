<template>
  <div>
    <button @click.prevent="decrement"> - </button>
    <span> Current value: {{ count }} </span>
    <button @click.prevent="increment"> + </button>
  </div>
</template>

<script setup>
  import {ref} from "vue";

  const count = ref(0)

  const increment = () => { count.value += 1 }
  const decrement = () => { count.value -= 1 }
</script>

<style scoped lang="scss">

</style>
