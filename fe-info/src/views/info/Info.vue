<script setup>
import { onMounted } from "vue";

const info = window.$stores?.shop || {};

onMounted(() => {
  // if (!window.$stores.user.phone) {
  //   if (!window.$stores.user.requestPhoneReject) window.$router.push("/permission-phone");
  // }
});

const navigate = () => {
  window.$router.push("/dashboard/info/edit");
};
</script>
<template>
  <div class="mt-4">
    <div class="flex justify-between mb-4">
      <div class="font-semibold">{{$t("info.inMy")}}</div>
      <div v-if="info.mode === 'owner'"
        class="border w-6 h-6 border-primary rounded text-primary flex justify-center items-center">
        <span class="pi pi-file-edit" @click="navigate"></span>
      </div>
    </div>
    <div class="flex">
      {{ info.description }}
    </div>
    <div class="font-semibold mt-5 mb-3">Địa chỉ</div>
    <div v-for="(item, index) in info.address" :key="index" class="flex gap-3 mb-4">
      <div
        class="p-1 rounded-full text-white bg-primary h-[20px] w-[20px] flex-shrink-0 flex items-center justify-center">
        {{
        index + 1
      }}</div>
      <!-- <div><span class="pi pi-map-marker"></span></div> -->
      <div class="flex flex-col gap-1">
        <div>{{ item.address }}</div>
        <div>Giờ hoạt động: {{ item.openingHours }}</div>
        <div class="flex items-center gap-2">
          Liên hệ: <span class="text-primary">{{ item.phone }}</span>
        </div>
        <!-- <div class="flex items-center gap-2">
          <div>Map:</div>
          <a :href="item.map" target="_blank" class="text-primary whitespace-nowrap truncate w-[50vw]">{{ item.map
            }}</a>
        </div> -->
      </div>
    </div>
  </div>
</template>
