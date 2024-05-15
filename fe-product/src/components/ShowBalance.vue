<script setup>
import { onMounted, reactive } from "vue";
import { numberToVnd } from "@/helper/convert";
const { shop } = window.$stores;
const props = defineProps(["balance", "tabCurrent"]);



const stateShow = reactive({ btnDeposit: false, btnDetail: false, btnWithdraw: false });
const link = {
  detail: "",
  widthDraw: ""
};
const setUp = () => {
  if (props.tabCurrent === "statistic") {
    stateShow.btnDeposit = true;
    stateShow.btnDetail = true;
    link.detail = "dashboard/wallet";
    link.widthDraw = "/shop/withdraw";
  } else if (props.tabCurrent === "profile") {
    link.detail = "dashboard/wallet";
    link.widthDraw = "/profile/withdraw";
  } else if (props.tabCurrent === "shopWallet") {
    stateShow.btnDeposit = true;
  }
};
const redirectRouter = (path) => {
  window.$router.push(path);
};
onMounted(() => {
  setUp();
});
</script>

<template>
  <div class="py-4">
    <div class="flex justify-between items-center px-4">
      <div class="card-balance flex flex-col text-white">
        <span class="font-semibold">Số dư khả dụng</span>
        <span class="font-bold text-xl">{{ numberToVnd(balance) }}</span>
      </div>
      <div class="card-action flex flex-col gap-3">
        <button v-if="stateShow.btnDeposit" class="btn rounded-lg border border-white px-2 text-white" @click="redirectRouter('/dashboard/topup')">
          Nạp tiền
        </button>
        <button v-if="stateShow.btnDetail" class="btn rounded-lg border border-white px-2 text-white" @click="redirectRouter(link.detail)">Xem chi tiết</button>
        <button v-if="stateShow.btnWithdraw" class="btn rounded-lg border border-white px-2 text-white" @click="redirectRouter(link.widthDraw)">Rút Tiền</button>
      </div>
    </div>
  </div>
</template>
