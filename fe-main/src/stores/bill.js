import { defineStore } from "pinia";
export const billStore = defineStore("bill", {
  state: () => ({}),
  actions: {
    async detail(payload) {
      const { id, showType } = payload;
      const response = await window.$api.call("bill/detail", { id, showType });
      return response;
    }
  }
});
