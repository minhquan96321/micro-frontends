import { defineStore } from "pinia";

const schema = {
  id: "string",
  avatar: "string",
  name: "string",
  zid: "string",
  balance: 0,
  // description: "string",
  // nodeId: "string",
  // category: "string[]",
  language: "string[]",
  // storage: "number",
  phone: "string"
  // bank: "string"
};

export const userStore = defineStore("user", {
  state: () => {
    const user = {};
    Object.keys(schema).forEach((k) => (user[k] = null));
    return user;
  },
  getters: {},
  actions: {
    update(userInfo) {
      Object.keys(schema).forEach((k) => {
        this[k] = userInfo[k];
      });
      this.id = userInfo._id;
    },
    async getMoneyProfile() {
      const res = await window.$api.call("relationship/myBalance");
      if (typeof res.balance === "number") {
        this.balance = res.balance;
        return this.balance;
      }
    },
    async getTokenUpload() {
      if (!window.$stores.user.tokenUpload) {
        const res = await window.$api.call("user/uploadToken");
        if (res && res.token) {
          this.tokenUpload = res.token;
        }
      }
      return this.tokenUpload;
    }
  }
});
