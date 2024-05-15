<script setup>
const props = defineProps({ handleSelectImage: Function, listImage: Array, removeImage: Function, isLoadingUpload: Boolean });
</script>
<template>
  <div class="flex items-center py-2">
    <!-- <div class="w-[120px]">Ảnh hóa đơn</div> -->
    <div class="flex flex-wrap justify-center gap-2 w-full">
      <div
        v-for="(image, index) in listImage"
        :key="image"
        class="relative h-[100px] w-[100px] border border-gray-300 border-dashed flex items-center justify-center rounded-lg"
      >
        <img :src="image" class="w-full h-full object-cover rounded-lg" />
        <span class="pi pi-trash absolute right-1 top-1 rounded-lg bg-white" @click="removeImage(index)" />
      </div>
      <label for="select-image-bill" class="border border-gray-300 border-dashed h-[100px] w-[100px] rounded-lg flex justify-center flex-col items-center">
        <div><span :class="`pi ${isLoadingUpload ? 'pi-spin pi-spinner' : 'pi-plus'}`"></span></div>
        <div class="text-xs">Ảnh hóa đơn</div>
      </label>
      <input
        id="select-image-bill"
        class="rounded-lg pr-2 outline-none bg-transparent hidden"
        accept="image/*"
        type="file"
        @change="handleSelectImage"
      />
    </div>
  </div>
</template>
