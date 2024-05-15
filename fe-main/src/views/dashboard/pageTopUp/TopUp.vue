<script setup>
import QrcodeVue from "qrcode.vue";
import { onUnmounted, reactive } from "vue";
import backPage from "@/components/BackPage.vue";
import { numberToVnd } from "@/helper/convert.js";
import config from "@/config";

const topUpInfo = reactive({
  cost: undefined,
  name: window.$stores.shop.name,
  code: "",
  accountNumber: config.bankAccountNumber,
  bankCode: config.bankCode
});

const stateView = reactive({
  showQr: false,
  isLoadingShowQr: false
});

let intervalCheck;

const topUp = () => {
  if (topUpInfo.cost <= 0 || typeof topUpInfo.cost !== "number") {
    window.$toast.add({ severity: "error", summary: "Số tiền không hợp lệ", life: 3000 });
  } else {
    stateView.isLoadingShowQr = true;
    window.$api
      .call("transaction/bank", { amount: topUpInfo.cost })
      .then((tran) => {
        if (tran.success) {
          stateView.showQr = true;
          topUpInfo.code = tran.code;

          clearInterval(intervalCheck);
          intervalCheck = setInterval(() => {
            getStatus(tran.code);
          }, 5000);
        }
      })
      .finally(() => {
        stateView.isLoadingShowQr = false;
      });
  }
  // call api topUp
};

const getStatus = (code) => {
  window.$api.call("transaction/statusBank", { code }).then((res) => {
    if (res.success) {
      window.$toastSuccess("Thành công");
      window.$stores.shop.info();
      window.$router.push("/dashboard");
    }
  });
};

onUnmounted(() => {
  clearInterval(intervalCheck);
});
</script>

<template>
  <div class="wrapper pt-back">
    <backPage name="Nạp tiền vào Ví" class="bg-primary" />
    <div class="form mt-5 px-3">
      <div class="input flex flex-col">
        <label for="money">Số tiền</label>
        <InputText
          v-model="topUpInfo.cost"
          inputId="locale-german"
          class="border px-3 py-1 rounded"
          locale="de-DE"
          placeholder="Nhập số tiền cần nạp"
          type="number"
          :step="1"
          @update:modelValue="topUpInfo.cost = Number(topUpInfo.cost) || undefined"
        />
        <!-- <InputNumber v-model="topUpInfo.cost" class="[&>*]:border [&>*]:px-3 [&>*]:py-1 rounded mt-2" locale="de-DE" placeholder="Nhập số tiền cần nạp" /> -->
      </div>
      <div class="input flex flex-col mt-3">
        <label for="shopName">Tên cửa hàng</label>
        <div class="font-semibold mt-2 mx-2">{{ topUpInfo.name }}</div>
        <!-- <input id="shopName" v-model="topUpInfo.name" type="text" class="border px-3 py-1 rounded" disabled /> -->
      </div>
      <div class="py-2 flex justify-center">
        <Button
          :disable="stateView.isLoadingShowQr"
          :class="stateView.isLoadingShowQr && 'opacity-50'"
          class="bg-primary text-white border-transparent mt-3 rounded px-12 py-2 flex items-center gap-2"
          @click="topUp()"
        >
          <span v-if="stateView.isLoadingShowQr" class="pi pi-spin pi-spinner" />
          Xác nhận</Button
        >
      </div>
      <div v-if="stateView.showQr" class="info-QR mt-3">
        <div class="note-qr">Quét mã QR dưới đây để thực hiện thanh toán. Vui lòng không thay đổi bất kỳ thông tin nào kể cả nội dung chuyển khoản</div>
        <div class="flex items-center justify-center my-4">
          <img
            style="max-width: 200px; margin-top: 10px"
            :src="`https://img.vietqr.io/image/${topUpInfo.bankCode}-${topUpInfo.accountNumber}-qr_only.png?amount=${topUpInfo.cost}&addInfo=viref${topUpInfo.code}`"
          />
        </div>

        <div class="info-bank-success">
          <div class="flex justify-between py-2">
            <span>STK</span>
            <span>{{ topUpInfo.accountNumber }}</span>
          </div>
          <div class="flex justify-between py-2">
            <span>Tên ngân hàng</span>
            <span>{{ topUpInfo.bankCode }}</span>
          </div>
          <div class="flex justify-between py-2">
            <span>Chủ tài khoản</span>
            <span>{{ config.bankOwner }}</span>
          </div>
          <div class="flex justify-between py-2">
            <span>Số tiền</span>
            <span class="font-bold">{{ numberToVnd(topUpInfo.cost) }}</span>
          </div>
          <div class="flex justify-between py-2">
            <span>Nội dung chuyển khoản</span>
            <span>viref{{ topUpInfo.code }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
