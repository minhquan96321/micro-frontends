<script setup>
import { reactive, ref, onMounted } from "vue";
const props = defineProps(["closeModal", "editProductActive"]);
const listProduct = reactive(JSON.parse(JSON.stringify(window.$stores.product.listProduct)));

const isLoading = ref(false);
const save = async () => {
  isLoading.value = true;
  const products = [];
  for (const product of listProduct) {
    if (product.checked) {
      products.push(product._id)
    }
  }

  await window.$api.call("discount/updateProducts", { id: props.editProductActive._id, products });
  await window.$stores.discount.list();
  isLoading.value = false;
  props.closeModal();
};

onMounted(() => {
  for (const id of props.editProductActive.products) {
    for (const product of listProduct) {
      if (product._id === id) {
        product.checked = true;
      }
    }
  }
});
</script>

<template>
  <div class="modal-add-row-aff-all">
    <div class="gap-3 mb-3">
      <div class="mb-2 font-semibold">Chọn sản phẩm</div>
      <div v-for="(product, index) in listProduct" :key="product._id" class="px-2">
        <div v-if="product.category !== listProduct[index - 1]?.category" class="items-center flex mb-4">
          <div class="font-semibold">
            {{ product.category + " (" + listProduct.filter((item) => item.category === product.category).length + ")" }}
          </div>
        </div>
        <div class="flex gap-2 items-center mb-4">
          <Checkbox v-model="product.checked" :inputId="product._id" :binary="true" />
          <label class="flex flex-1" :for="product._id">
            <div class="w-[40px] h-[40px] border border-dashed border-gray-400 rounded mr-2">
              <img class="w-full h-full object-cover" crossorigin="anonymous" :src="product.picture" />
            </div>
            <div class="flex font-semibold gap-2 flex-1 items-center">
              <div>{{ product.name }}</div>
            </div>
          </label>
        </div>
      </div>
    </div>

    <div class="flex justify-center mt-6 gap-2">
      <Button class="flex gap-2" type="button" @click="save"> <span v-if="isLoading" class="pi pi-spin pi-spinner" />Save </Button>
    </div>
  </div>
</template>
<style></style>
