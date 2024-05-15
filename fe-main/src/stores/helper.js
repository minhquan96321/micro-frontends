import { defineStore } from "pinia";
import { uploadSingleImage } from "@/helper/useUploadImage";


export const helperStore = defineStore("helper", {
  state: () => ({}),
  actions: {
    async uploadSingleImage(file) {
      return uploadSingleImage(file)
    }
  }
});