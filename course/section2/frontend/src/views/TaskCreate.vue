<script setup>
import TaskCardCreator from "@/modules/tasks/components/TaskCardCreator.vue";

defineEmits(["addTask"]);
</script>

<template>
	<task-card-creator @add-task="$emit('addTask', $event)" />
</template>

<style scoped lang="scss">

</style>
