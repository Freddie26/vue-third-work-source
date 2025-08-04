<template>
  <app-layout>
    <router-view />
  </app-layout>
</template>

<script setup>
import { AppLayout } from '@/layouts'
import { useColumnsStore, useCommentsStore, useTasksStore, useUsersStore } from "@/store";

const tasksStore = useTasksStore();
const usersStore = useUsersStore();
const columnsStore = useColumnsStore();
const commentStore = useCommentsStore();

void tasksStore.fetchTasks();
void usersStore.fetchUsers();
void columnsStore.fetchColumns();
void commentStore.fetchComments();
</script>

<style lang="scss">
@import "@/assets/scss/app.scss";
</style>
