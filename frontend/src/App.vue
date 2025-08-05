<template>
  <app-layout>
    <router-view />
  </app-layout>
</template>

<script setup>
import { AppLayout } from '@/layouts'
import { useColumnsStore, useCommentsStore, useTasksStore, useTicksStore, useUsersStore } from "@/store";

const tasksStore = useTasksStore();
const usersStore = useUsersStore();
const columnsStore = useColumnsStore();
const commentsStore = useCommentsStore();
const ticksStore = useTicksStore();

void tasksStore.fetchTasks()
void usersStore.fetchUsers()
void columnsStore.fetchColumns()
void commentsStore.fetchComments()
void ticksStore.fetchTicks()
</script>

<style lang="scss">
@import "@/assets/scss/app.scss";
</style>
