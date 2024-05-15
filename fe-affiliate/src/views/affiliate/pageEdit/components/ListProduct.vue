<script setup>
import { reactive } from "vue";

const props = defineProps(["discount", "activeEditProduct"]);
const state = reactive({ deleteLoading: false, activeEdit: false });
const listProductObject = reactive({});
for (const item of window.$stores.product.listProduct) {
  listProductObject[item._id] = item;
}

const deleteGroup = () => {
  if (state.deleteLoading) return;
  state.deleteLoading = true;
  window.$api.call("discount/remove", { id: props.discount._id }).finally(async () => {
    await window.$stores.discount.list();
    state.deleteLoading = false;
  });
};
const modeEdit = window.location.pathname.includes("edit");
</script>

<template>
  <div class="flex mt-2">
    <div v-if="modeEdit" class="w-8 flex items-center">
      <span class="mb-[2px]" :class="state.deleteLoading ? 'pi pi-spin pi-spinner' : 'pi pi-trash'" @click="deleteGroup()" />
    </div>
    <div class="flex gap-2 flex-1">
      <div class="flex-1 flex flex-wrap">
        <div v-for="(productId, index) in discount.products" :key="productId" class="py-[2px] w-fit flex items-center gap-2 whitespace-nowrap font-semibold">
          {{ listProductObject[productId]?.name}} {{ discount.products.length !== 1 && index !== discount.products.length - 1 ? "," : "" }}
        </div>
      </div>
      <div v-if="modeEdit" class="text-primary flex items-center px-1 opacity-80 border-primary">
        <span class="text-primary pi pi-file-edit" @click="activeEditProduct" />
      </div>
    </div>
  </div>
</template>
