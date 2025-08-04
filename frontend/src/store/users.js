import { defineStore } from "pinia";
import { userService } from '@/services';

export const useUsersStore = defineStore(
  'users',
  {
    state: () => ({
      users: [],
    }),
    getters: {
      findUserById: (state) => (id) => {
        return state.users.find(user => user.id === id);
      }
    },
    actions: {
      async fetchUsers() {
        // Получение данных из JSON-файла заменим в последующих разделах
        this.users = await userService.fetchUsers();
      },
    },
  },
);
