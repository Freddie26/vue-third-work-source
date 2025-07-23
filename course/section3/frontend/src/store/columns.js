import { defineStore } from "pinia";

export const useColumnsStore = defineStore(
  'columns',
  {
    state: () => ({
      column: [],
    }),
    getters: {},
    actions: {},
  }
);
