<script setup>
import { onMounted } from "vue";
import QrcodeVue from "qrcode.vue";
import BackPage from "@/components/BackPage.vue";
import config from "@/config";

const qrValue = `${config.moleculerServer}/share/?user=${window.$stores.user.id}&phone=${window.$stores.user.phone}`;
// const qrValue = `${config.moleculerServer}/share/?user=66066fe4ad91f544346b75c2`;

onMounted(() => {
  if (!window.$stores.user.phone) window.$router.push("/permission/phone");
});
</script>
<template>
  <BackPage name="Mã QR của tôi" class="bg-primary" />

  <div class="pt-4 px-4 flex flex-col pt-back">
    <div class="font-semibold mx-auto pt-10">Sử dụng mã QR và chia sẻ cho bạn bè để nhận ưu đãi khi thanh toán</div>
    <div class="flex items-center justify-center mt-10">
      <QrcodeVue :value="qrValue" :size="200" level="H" />
    </div>
    <div class="flex mt-10">
      <div class="mx-auto">
        <ol>
          <li>1. Giới thiệu bạn bè sử dụng app và tới "Lão Trư - Street Food BBQ & Beer" trải nghiệm</li>
          <li>2. Hướng dẫn bạn bè sử dụng mã này để ghi nhận Người giới thiệu khi thanh toán tại quán</li>
          <li>3. Hệ thống ghi nhận, phần thưởng sẽ được chuyển vào Ví của tôi (ấn avatar góc trái để xem)</li>
        </ol>
      </div>
    </div>
  </div>
</template>
