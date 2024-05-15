<script setup>
import { onMounted, ref, reactive, computed } from "vue";
import { numberToVnd, convertDateTime } from "@/helper/convert";
import { colorMoney } from "@/helper/hook";
const { shop } = window.$stores;

const props = defineProps(["showType"]);

const stateLoad = reactive({ isLoading: false, loadFull: false });
const payload = reactive({ page: 1, showType: props.showType, billType: "all" });

const listTransaction = computed(() => {
  if (props.showType === "profile") {
    return window.$stores.transaction.listProfile;
  }
  return window.$stores.transaction.listShop;
});

const getList = () => {
  stateLoad.isLoading = true;
  window.$stores.transaction.getList(payload).then((res) => {
    if (res.page >= res.totalPages) stateLoad.loadFull = true;
    stateLoad.isLoading = false;
    return res;
  });
};

onMounted(() => {
  getList();
});

const nextDetail = (bill) => {
  window.$stores.transaction.transactionShow = bill;
  bill.metadata.billId && window.$router.push(`/bill/detail-${props.showType}/${bill.metadata.billId}`);
};

const textTitle = {
  bank: "Nạp tiền vào ví",
  "Bonus for user": "Thưởng cho khách hàng",
  "Bonus for refer customer": "Thưởng cho người giới thiệu",
  "Bonus for using service": "Tiền thưởng"
};
</script>

<template>
  <div v-if="listTransaction.length" class="my-4">
    <div v-for="item in listTransaction" :key="item._id" class="border-b flex items-center gap-2 mt-3 py-4" @click="nextDetail(item)">
      <i class="pi pi-book p-3 border rounded-full text-primary bg-gray-200"></i>
      <div class="transaction-info">
        <div class="whitespace-nowrap">{{ textTitle[item.note] }}</div>
        <div class="text-[10px] mt-[6px]">
          <span class="opacity-50">{{ convertDateTime(item.createdAt) }}</span>
          <span v-if="item.metadata.rewardByCash" class="ml-2 px-2 py-1 border bg-gray-200 font-semibold rounded-lg">Tiền mặt</span>
        </div>
      </div>
      <div class="flex-1">
        <div :class="colorMoney(item.amount > 0)" class="font-bold text-right">
          {{ (item.amount > 0 ? "+" : "") + numberToVnd(item.metadata.transferAmount ? item.metadata.transferAmount : item.amount) }}
        </div>
        <div class="text-[10px] text-right mt-[6px] text-emerald-600 relative">
          {{ item.status === "success" ? "Thành công" : "" }}
          <!-- <span v-if="item.customerPreferCash" class="text-[10px] absolute top-3 right-0 text-gray-950 italic"> Đã bao gồm tiền mặt </span> -->
        </div>
      </div>
    </div>
    <div v-if="!stateLoad.loadFull" class="flex mt-4">
      <Button class="mx-auto" @click="(payload.page += 1) && getList()">Xem thêm</Button>
    </div>
  </div>
  <div v-if="stateLoad.isLoading" class="flex justify-center my-4">
    <i class="pi pi-spin pi-spinner" style="font-size: 3rem"></i>
  </div>
  <div v-if="!stateLoad.isLoading && !listTransaction.length">
    <div class="flex flex-col items-center mt-10">
      <svg
        fill="#000000"
        width="36px"
        height="36px"
        viewBox="0 0 36 36"
        version="1.1"
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
      >
        <title>sad-face-line</title>
        <path d="M18,2A16,16,0,1,0,34,18,16,16,0,0,0,18,2Zm0,30A14,14,0,1,1,32,18,14,14,0,0,1,18,32Z" class="clr-i-outline clr-i-outline-path-1"></path>
        <circle cx="25.16" cy="14.28" r="1.8" class="clr-i-outline clr-i-outline-path-2"></circle>
        <circle cx="11.41" cy="14.28" r="1.8" class="clr-i-outline clr-i-outline-path-3"></circle>
        <path
          d="M18.16,20a9,9,0,0,0-7.33,3.78,1,1,0,1,0,1.63,1.16,7,7,0,0,1,11.31-.13,1,1,0,0,0,1.6-1.2A9,9,0,0,0,18.16,20Z"
          class="clr-i-outline clr-i-outline-path-4"
        ></path>
        <rect x="0" y="0" width="36" height="36" fill-opacity="0" />
      </svg>
      <div>Bạn chưa có giao dịch nào</div>
      <!-- <div>Giới thiệu bạn bè đến với {{ shop.name }} để cả 2 cùng nhận ưu đãi</div> -->
      <!-- <Button class="text-primary">Giới thiệu ngay</Button> -->
    </div>
  </div>
</template>
