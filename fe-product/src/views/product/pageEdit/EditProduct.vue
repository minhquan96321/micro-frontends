<script setup>
import { ref, reactive, computed, watchEffect, onMounted, onUnmounted } from "vue";
// import Menu from "./menu/Menu.vue";
import { numberToVnd } from "@/helper/convert.js";
// import BackPage from "@/components/BackPage.vue";
// const { BackPage } = window.$stores.layout;

import AddProduct from "./components/AddProduct.vue";

import BackPage from 'master_app/BackPage';

const listProduct = computed(() => window.$stores.product.listProduct);
const state = reactive({ loadingDelete: false, showModalAdd: false });

onMounted(() => {
  if (!window.$stores.product.listProduct.length) {
    window.$stores.product.list();
  }
});

const deleteProduct = async (id) => {
  if (!state.loadingDelete) {
    state.loadingDelete = id;
    await window.$api.call("product/remove", { id });
    await window.$stores.product.list();
    state.loadingDelete = false;
  }
};

const deleteGroup = (category) => {
  // request delete product by category
};

onUnmounted(() => {
  console.log("unmount")
})

</script>

<template>
  <BackPage className="bg-primary" name="Chỉnh sửa sản phẩm" />
  <div class="pt-back">
    <div>
      <div class="pb-[100px] pt-4 px-4">
        <!-- <Menu /> -->
        <div v-for="(product, index) in listProduct" :key="product._id" class="">
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
            <div class="flex flex-col gap-2 flex-1">
              <div>{{ product.name }}</div>
              <div class="font-semibold">{{ numberToVnd(product.price) }}</div>
            </div>
            <span :class="state.loadingDelete === product._id ? 'pi pi-spin pi-spinner' : 'pi pi-trash'" @click="deleteProduct(product._id)" />
          </div>
        </div>
        <div class="flex mt-4">
          <Button class="mx-auto" @click="state.showModalAdd = true">Thêm sản phẩm</Button>
        </div>
      </div>
    </div>
  </div>
  <Dialog v-model:visible="state.showModalAdd" modal header="Thêm sản phẩm" :style="{ width: 'calc(100vw - 32px)' }">
    <AddProduct :closeModal="() => (state.showModalAdd = false)" />
  </Dialog>
</template>
