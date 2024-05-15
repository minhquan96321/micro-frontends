import { defineStore } from "pinia";
export const transactionStore = defineStore("transaction", {
  state: () => ({
    listProfile: [],
    listShop: [],
    transactionShow: {}
  }),
  actions: {
    async getList(payload) {
      const { page, billType, showType } = payload;
      const response = await window.$api.call("transaction/listing", { page, billType, showType });
      if (response && response.rows) {
        if (showType === "profile") {
          if (page === 1) this.listProfile = response.rows;
          else this.listProfile.push(...response.rows);
        } else {
          if (page === 1) this.listShop = response.rows;
          else this.listShop.push(...response.rows);
        }
      }
      return response;
    }
  }
});
