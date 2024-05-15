<script setup>
import backPage from "@/components/BackPage.vue";
import { reactive, ref } from "vue";
import { numberToVnd, convertDateTime } from "@/helper/convert.js";

const { shop, user } = window.$stores;
const listBank = [
  { label: "VCB - Ngoại Thương (VCB)", value: "vcb" },
  { label: "MB - Ngân hàng quân đội", value: "mb" },
];
const bankExists = [
  { label: "VCB -***8888", value: "vcb" },
  { label: "MB -***8888", value: "mb" },
];
const withDrawInfo = reactive({
  name: shop.name || "",
  money: 0,
  bankName: ""
});
const addBankInfo = reactive({
  bankName: "",
  accountNumber: "",
  accountName: ""

});
const selectionBank = ref(false);
const addBank = ref(false);
const transactionDetail = ref(false); // transaction when user requested withdraw

const withDraw = () => {
  // if (withDrawInfo.money <= 0 || withDrawInfo.bankName === "") {
  //   window.$toast.add({ severity: "error", summary: "Vui lòng điền đúng và đầy đủ thông tin", life: 3000 });
  //   return;
  // }
  //call api withDraw
  window.$toast.add({ severity: "success", summary: "Tạo yêu cầu rút tiền thành công", life: 3000 });
  transactionDetail.value = true;

};

const cancelTransaction = () => {
  //call api cancel Transaction
};

const saveBank = () => {
  console.log("save bank");
  addBank.value = false;
  //call api saveBank
};

const backScreen = () => {
  addBank.value = false;
};

</script>

<template>
  <div v-if="!addBank && !transactionDetail" class="wrapper"
    :class="selectionBank ? 'opacity-30 h-screen bg-zinc-300' : ''">
    <backPage name="Rút tiền" class="bg-primary" />
    <div class="content px-3 mt-5">
      <div class="input flex flex-col gap-2">
        <label for="money">Từ ví cửa hàng</label>
        <input id="money" v-model="withDrawInfo.name" class="border px-3 py-1 rounded" disabled type="text" />
        <div class="flex gap-2 opacity-50 text-xs py-2">
          <span>Số dư khả dụng</span>
          <span>{{ numberToVnd(user.balance) }}</span>
        </div>
      </div>
      <div class="input flex flex-col mt-3 gap-2">
        <label for="money">Nhập số tiền rút</label>
        <input id="money" v-model="withDrawInfo.money" class="border px-3 py-1 rounded" type="number"
          placeholder="Nhập số tiền rút" />
      </div>
      <div class="input flex flex-col mt-3 gap-2">
        <label for="money">Tài khoản nhận tiền</label>
        <div class="border border-gray-300 h-10 rounded-lg flex items-center" @click="selectionBank = true">
          <input v-model="withDrawInfo.bankName" class="rounded-lg w-[calc(100%-30px)] pl-2 outline-none bg-transparent"
            placeholder="Chọn tài khoản ngân hàng" readonly />
          <div class="w-[30px] flex justify-center items-center">
            <span class="pi pi-angle-down" />
          </div>
        </div>
      </div>
      <div class="btn flex justify-center mt-10">
        <button class="bg-primary text-white border-transparent rounded px-20 py-2" @click="withDraw()">Xác
          nhận</button>
      </div>
    </div>
  </div>

  <div v-if="selectionBank" class="selection-bank p-4 bg-white w-full absolute bottom-0">
    <div class="header flex justify-between items-center mb-7">
      <span class="font-bold text-lg">Chọn tài khoản ngân hàng</span>
      <i class="pi pi-times text-lg" @click="selectionBank = false"></i>
    </div>
    <div class="bank-default text-lg py-3">
      <i class="pi pi-apple mr-3"></i>
      <span>VCB -***8888</span>
    </div>
    <div class="add-bank flex items-center gap-2 text-red-500 h-[80px]" @click="addBank = true; selectionBank = false">
      <i class="pi pi-plus"></i>
      <span>Thêm tài khoản ngân hàng</span>
    </div>
  </div>

  <div v-if="addBank" class="add-bank">
    <backPage name="Thêm tài khoản ngân hàng" class="bg-primary" :isRouter="false" @back-screen="backScreen()" />
    <div class="content-add-bank px-3 mt-5">
      <div class="input flex flex-col mt-3 gap-2">
        <label for="money">Ngân hàng</label>
        <Dropdown v-model="addBankInfo.bankName" :options="listBank" optionLabel="label" optionValue="value"
          placeholder="Chọn ngân hàng" class="w-full border" />
      </div>
      <div class="input flex flex-col mt-3 gap-2">
        <label for="money">Số tài khoản</label>
        <input id="money" v-model="addBankInfo.accountNumber" class="border px-3 py-2 rounded-md" type="number"
          placeholder="Số tài khoản" />
      </div>
      <div class="input flex flex-col mt-3 gap-2">
        <label for="money">Tên chủ tài khoản</label>
        <input id="money" v-model="addBankInfo.accountName" class="border px-3 py-2 rounded-md" type="text"
          placeholder="Chủ tài khoản" />
      </div>
      <div class="flex justify-center mt-5">
        <button class="bg-primary text-white border-transparent rounded-md px-20 py-2" @click="saveBank()">Lưu</button>
      </div>
    </div>
  </div>

  <div v-if="transactionDetail" class="transaction-detail">
    <backPage name="Chi tiết giao dịch" class="bg-primary" />
    <div class="content px-3 mt-5">
      <Card>
        <template #content>
          <div class="flex flex-col items-center gap-4">
            <div class="note text-lg">Rút về tài khoản ngân hàng</div>
            <div class="font-bold text-3xl">{{ numberToVnd(-100000) }}</div>
            <div class="code-transaction opacity-50">
              <span>Mã giao dịch:</span>
              <span class="ml-2">123456789</span>
            </div>
          </div>
        </template>
      </Card>
      <Card class="mt-3">
        <template #content>
          <div class="flex justify-between">
            <div class="font-semibold">Trạng thái</div>
            <div class="text-yellow-400">Chờ xác nhận</div>
          </div>
        </template>
      </Card>
      <Card class="mt-3">
        <template #content>
          <div class="flex justify-between gap-3">
            <div class="whitespace-nowrap font-semibold">Từ ví cửa hàng</div>
            <div style="margin-right: -20px;">{{ shop.name }}</div>
          </div>
        </template>
      </Card>
      <Card class="mt-3">
        <template #content>
          <div class="flex justify-between gap-3">
            <div class="whitespace-nowrap font-semibold">Đến tài khoản</div>
            <div>VIB-***8888</div>
          </div>
        </template>
      </Card>
      <Card class="mt-3">
        <template #content>
          <div class="flex justify-between gap-3">
            <div class="whitespace-nowrap font-semibold">Thời gian tạo</div>
            <div>{{ convertDateTime(new Date()) }}</div>
          </div>
          <div class="flex justify-between gap-3 mt-3">
            <div class="whitespace-nowrap font-semibold">Tạo bởi</div>
            <div>Tôi-***888</div>
          </div>
        </template>
      </Card>
      <div class="flex justify-center mt-5">
        <button class="bg-primary text-white border-transparent rounded-md px-20 py-2" @click="cancelTransaction()">
          Huỷ giao dịch
        </button>
      </div>
    </div>
  </div>




</template>

<style lang="scss" scoped>
.bank-default {
  border-bottom: 1px solid #eee;
}

.selection-bank {
  border-radius: 20px 20px 0 0;
  transition: .25s linear;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;

}
</style>