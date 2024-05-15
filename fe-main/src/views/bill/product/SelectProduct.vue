<script setup>
import { ref } from "vue";

const checked = ref(false);

</script>
<template>
  <div>
    <div class="border-gray-300 w-full border items-center flex gap-2 p-2 rounded-lg">
      <span class="pi pi-search"></span>
      <input placeholder="Tìm theo tên sản phẩm" />
    </div>
    <div class="flex gap-2 flex-col">
      <label v-for="item in 5" :key="item" class="flex gap-2 checkbox-select-product first:mt-4" for="checkbox">
        <Checkbox inputId="checkbox" class="border-gray-300 border rounded" v-model="checked" :binary="true" />
        <div>Hàu sữa tươi pháp</div>
      </label>
    </div>
    <div class="flex justify-between items-center mt-4 border-t-2 pt-4 border-gray-300">
      <label class="flex gap-2 checkbox-select-product" for="checkbox2">
        <Checkbox inputId="checkbox2" class="border-gray-300 border rounded" v-model="checked" :binary="true" />
        <div>Chọn tất cả</div>
      </label>
      <Button label="Thêm mới" />
    </div>
  </div>
</template>
<style lang="scss">
.checkbox-select-product {
  .p-checkbox-box {
    height: 18px;
  }
}
</style>
