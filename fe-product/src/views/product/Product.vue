<script setup>
import { computed, onMounted, onUnmounted, ref } from "vue";
import { numberToVnd } from "@/helper/convert.js";

const { mode } = window.$stores?.shop || {};

const listProduct = computed(() => window.$stores.product.listProduct);

const navigateCreateProduct = () => {
  window.$router.push("/dashboard/product/edit");
};
const date = new Date();
const files = ref([]);

</script>
<template>
  <div>
    <div class="relative min-h-[26px] mt-4">
      <!-- <div v-if="productStore.listProduct?.listCategory" class="w-[calc(100%-40px)] flex gap-2 flex-wrap">
        <div v-for="listProduct in productStore.listProductShow" :key="listProduct" class="bg-gray-300 py-1 px-2 rounded-lg">{{ listProduct[0].category }}</div>
      </div> -->
      <div class="w-[calc(100%-40px)] flex gap-2 flex-wrap"></div>
      <div v-if="mode === 'owner'" class="border border-primary rounded text-primary w-6 h-6 flex items-center justify-center absolute right-0 top-0">
        <span class="pi pi-file-edit" @click="navigateCreateProduct()" />
      </div>
    </div>
    <div class="pb-[100px]">
      <div v-for="(product, index) in listProduct" :key="product._id" class="px-2">
        <div v-if="product.category !== listProduct[index - 1]?.category" class="items-center flex mb-4">
          <div class="font-semibold">
            {{ product.category + " (" + listProduct.filter((item) => item.category === product.category).length + ")" }}
          </div>
          <!-- <span class="pi pi-trash" @click="deleteGroup(product.category)" /> -->
        </div>
        <div class="flex gap-2 items-center mb-4">
          <div class="w-[80px] h-[80px] border border-dashed rounded">
            <img class="w-full h-full object-cover" crossorigin="anonymous" :src="product.picture" />
          </div>
          <div class="flex flex-col gap-2 w-[calc(100%-145px)]">
            <div>{{ product.name }}</div>
            <div class="font-semibold">{{ numberToVnd(product.price) }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
