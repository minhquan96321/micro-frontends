<script setup>
import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from "vue-qrcode-reader";
const props = defineProps({ changeState: Function, qrSuccess: Function });

const onDetect = (detectedCode) => {
  const value = detectedCode[0].rawValue;
  if(value) {
    props.qrSuccess(value)
  }
};
</script>
<template>
  <div class="bg-primary w-full pt-notch flex items-end p-2">
    <div class="font-bold text-white flex items-center gap-2">
      <span class="pi pi-chevron-left" @click="changeState('qr')"></span>
      Quét mã QR
    </div>
    <div>
      <!-- <qrcode-drop-zone></qrcode-drop-zone> -->
      <!-- <qrcode-capture></qrcode-capture> -->
    </div>
  </div>

  <div class="px-5 flex flex-col">
    <QrcodeStream class="w-[300px] h-[300px]" @detect="onDetect"></QrcodeStream>
    <div class="mt-4 flex flex-col">
      <div class="mb-4 mx-auto">Đặt mã QR của Người mua vào khung để quét</div>
      <div class="flex justify-center items-center border border-primary w-[140px] gap-2 py-1 rounded-lg mx-auto border-primary">
        <div class="flex items-center"><span class="pi pi-qrcode"></span></div>
        <div class="font-semibold border-none pt-1">Tải ảnh lên</div>
      </div>
    </div>
  </div>
</template>
