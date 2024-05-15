import { defineStore } from "pinia";
import BackPage from "@/components/BackPage.vue"

export const layoutStore = defineStore("layout", {
  state: () => ({
    stepSetup: 1,
    lastTab: 0,
    tab: [],
    BackPage: BackPage,
  }),
  getters: {},
  actions: {}
});
