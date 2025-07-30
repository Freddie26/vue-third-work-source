<template>
  <app-layout>
    <router-view />
  </app-layout>
</template>

<script setup>
import { AppLayout } from '@/layouts'
import { useColumnsStore, useTasksStore, useUsersStore } from "@/store";

const tasksStore = useTasksStore()
const usersStore = useUsersStore()
const columnsStore = useColumnsStore()

void tasksStore.fetchTasks()
void usersStore.fetchUsers()
void columnsStore.fetchColumns()
</script>

<style lang="scss">
@import "@/assets/scss/app.scss";
</style>
