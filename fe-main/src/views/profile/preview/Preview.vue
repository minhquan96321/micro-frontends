<script setup>
import { ref } from "vue";
const idShop = ref("");
import config from "@/config";

const submit = async () => {
  window.$router.replace("/dashboard");

  if (idShop.value && idShop.value.length === 24) {
    window.$stores.layout.stepSetup = 1;
    config.shopId = idShop.value;
    window.$stores.discount.listDiscount = null;
    window.$stores.product.listProduct.length = 0;
  }
};

const back = () => {
  window.$router.push("/dashboard");
};
</script>
<template>
  <div class="flex items-center justify-center w-[100vw] h-[100vh]">
    <Button class="fixed top-10 left-4" @click="back">Back</Button>
    <div class="border border-gray-500 flex items-center rounded-lg px-2 py-1">
      <input v-model="idShop" class="p-1 py-2 outline-none bg-transparent" placeholder="Nhập Id..." />
      <Button @click="submit">Submit</Button>
    </div>
  </div>
</template>
