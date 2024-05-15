import { defineStore } from "pinia";

export const discountStore = defineStore("discount", {
  state: () => ({
    listDiscount: null
  }),
  getters: {},
  actions: {
    async list() {
      const response = await window.$api.call(`discount/list`);
      if(response.rows) {
        this.listDiscount = response.rows
      }
    }
  }
});
