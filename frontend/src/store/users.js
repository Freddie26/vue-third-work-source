import { defineStore } from "pinia";
import { userService } from '@/services';

export const useUsersStore = defineStore(
  'users',
  {
    state: () => ({
      users: [],
    }),
    getters: {},
    actions: {
      async fetchUsers() {
        // Получение данных из JSON-файла заменим в последующих разделах
        this.users = await userService.fetchUsers();
      },
    },
  },
);
