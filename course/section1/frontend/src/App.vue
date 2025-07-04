<template>
  <app-layout
      :tasks="filteredTasks"
      :filters="state.filters"
      @update-tasks="sortTasks"
  >
    <home-view
        :tasks="filteredTasks"
        :filters="state.filters"
        @update-tasks="sortTasks"
        @apply-filters="applyFilters"
    />
  </app-layout>
</template>

<script setup>
import { reactive, computed } from "vue";
import { AppLayout } from "@/layouts";
import { HomeView } from "@/views";
import { normalizeTask } from "@/common/helpers";
import tasks from "./mocks/tasks.json"

const state = reactive({
  tasks: tasks.map(task => normalizeTask(task)),
  filters: {
    search: '',
    users: [],
    statuses: [],
  }
})

const filteredTasks = computed(() => {
  const filtersAreEmpty = Object.values(state.filters)
      .every(value => !value.length)
  if (filtersAreEmpty) {
    // Вернуть все задачи, если фильтры не применены
    return state.tasks
  }

  // Применить фильтр по поиску
  const searchFilterFn = task => task.title
      .toLowerCase()
      .includes(state.filters.search.toLowerCase().trim())

  // Применить фильтр по пользователям
  const usersFilterFn = task => state.filters.users
      .some(userId => userId === task.userId)

  // Применить фильтр по статусам
  const statusesFilterFn = task => state.filters.statuses
      .some(el => el === task.status || el === task.timeStatus)

  // Обработать задачи в соответствии с фильтрами
  return state.tasks.filter(task => {
    let result = {
      search: searchFilterFn,
      users: usersFilterFn,
      statuses: statusesFilterFn
    }
    return Object.entries(result)
        .every(([key, callback]) =>
            !state.filters[key].length || callback(task))
  })
})

function sortTasks(tasksToSort) {
  tasksToSort.forEach(task => {
    const index = state.tasks.findIndex(stateTask => stateTask.id === task.id)

    if (~index) {
      state.tasks.splice(index, 1, task)
    }
  })
}

function applyFilters({item, entity}) {
  if (!Array.isArray(state.filters[entity])) {
    state.filters[entity] = item
  } else {
    const resultValues = [...state.filters[entity]]
    const itemIndex = resultValues.findIndex(el => el === item)
    ~itemIndex
        ? resultValues.splice(itemIndex, 1)
        : resultValues.push(item)
    state.filters[entity] = resultValues
  }
}
</script>

<style lang="scss">
@import "@/assets/scss/app.scss";
</style>
