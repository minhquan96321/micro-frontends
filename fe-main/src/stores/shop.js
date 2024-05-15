import { defineStore } from "pinia";
import config from "@/config";

export const shopStore = defineStore("shop", {
  state: () => ({
    id: "string",
    employer: {},
    balance: 0,
    name: "",
    typeDiscount: "",
    affiliater: "",
    affiliaterBonus: 0,
    description: "",
    primaryColor: "",
    address: [],
    banner: [],
    mode: ""
  }),
  getters: {},
  actions: {
    async info() {
      const shop = await window.$api.call(`shop/info?shopId=${config.shopId}`);
      if (shop.success) {
        console.info("mode: ", shop.data.mode);
        for (const key in shop.data) {
          this[key] = shop.data[key];
        }
      }
    },
    async firstly() {
      const shop = await window.$api.call(`shop/firstly?shopId=${config.shopId}`);
      this.primaryColor = shop.primaryColor;
      this.secondaryColor = shop.secondaryColor;
      this.name = shop.name;
    }
  }
});
