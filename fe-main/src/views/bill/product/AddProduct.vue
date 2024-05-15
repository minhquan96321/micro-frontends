<script setup>
defineProps({ changeState: Function });

</script>
<template>
  <div>
    <div class="flex items-center py-2">
      <div class="w-[120px]">Sản phẩm</div>
      <div class="border border-primary text-primary h-10 pr-2 rounded-lg flex items-center" @click="changeState('popupProduct')">
        <div class="w-[30px] flex justify-center items-center">
          <span class="pi pi-plus" />
        </div>
        <div>Thêm sản phẩm</div>
      </div>
    </div>
  </div>
</template>
