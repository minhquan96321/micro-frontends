import { defineStore } from "pinia";

export const productStore = defineStore("product", {
  state: () => ({
    products: {},
    listProduct: {},
    // listProductShow: []
  }),
  getters: {},
  actions: {
    update(shopInfo) {
      Object.keys(shopInfo);
      for (const item in shopInfo) {
        this[item] = shopInfo[item];
      }
    },
    async list() {
      const response = await window.$api.call("product/list", { shopId: window.$stores.shop._id });
      if (response) {
        this.products = response;
        this.listProduct = response.rows.sort((a,b) => a.category.localeCompare(b.category));

        return this.listProduct;
      }
    }
  }
});
