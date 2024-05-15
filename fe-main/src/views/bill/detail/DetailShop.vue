<script setup>
import { ref, onMounted, reactive } from "vue";
import backPage from "@/components/BackPage.vue";
import { numberToVnd, convertDateTime } from "@/helper/convert";
import { colorMoney } from "@/helper/hook";

const { shop, user } = window.$stores;
const bill = ref({});
const transactionShop = window.$stores.transaction.transactionShow;

const showImageInvoice = ref(false);

const stateShow = reactive({ customerPay: 0, amount: transactionShop.amount, bonusCustomer: 0, bonusAffiliater: 0, fee: 0 });

const init = () => {
  const tranCustomer = bill.value.transaction.find((item) => item.note === "Bonus for using service");
  const tranAffiliater = bill.value.transaction.find((item) => item.note === "Bonus for refer customer");
  const tranFee = bill.value.transaction.find((item) => item.note === "Transaction fee");
  stateShow.bonusAffiliater = tranAffiliater.amount;
  stateShow.fee = tranFee.amount;
  // console.log({transactionShop})
  // console.log({stateShow})
  if (bill.value.customerPreferCash) {
    stateShow.bonusCustomer = Math.abs(transactionShop.amount) - stateShow.bonusAffiliater - stateShow.fee;
    stateShow.customerPay = transactionShop.metadata.totalAmount - stateShow.bonusCustomer;
  } else {
    stateShow.bonusCustomer = tranCustomer.amount;
    stateShow.customerPay = transactionShop.metadata.totalAmount;
  }
};

onMounted(() => {
  window.$stores.bill.detail({ id: window.$route.params.id, showType: "shop" }).then((res) => {
    // res.customerPhone = ` _****${res.customerPhone.slice(-4)}`;
    // res.affiliaterPhone = ` _****${res.affiliaterPhone.slice(-4)}`;
    bill.value = res;
    init();
    // console.log(transactionShop);
    // console.log(bill.value);
  });
});
</script>

<template>
  <div class="transaction-detail pt-back">
    <backPage name="Chi tiết giao dịch" class="bg-primary" />
    <div v-if="bill && bill._id" class="content p-3">
      <Card class="mt-3">
        <template #content>
          <div class="flex flex-col items-center gap-4">
            <div class="note">Tổng thưởng</div>
            <div :class="colorMoney()" class="font-bold text-3xl">{{ numberToVnd(transactionShop.amount) }}</div>
            <!-- <div v-if="!bill.customerPreferCash" :class="colorMoney()" class="font-bold text-3xl">{{ numberToVnd(transactionShop.amount) }}</div> -->
            <!-- <div v-else :class="colorMoney()" class="font-bold text-3xl">{{ numberToVnd(transactionShop.amount + stateShow.bonusCustomer) }}</div> -->
          </div>
          <!-- <div class="code-transaction opacity-50 mt-3">
            <span>Mã giao dịch:</span>
            <span class="ml-2">{{ transactionShop._id }}</span>
          </div> -->
        </template>
      </Card>

      <Card class="mt-3">
        <template #content>
          <div class="flex justify-between">
            <div class="">Trạng thái</div>
            <div v-if="bill.status === 'success'" class="text-green-600">Thành công</div>
            <div v-else class="text-yellow-400">Chờ xác nhận</div>
          </div>
        </template>
      </Card>

      <Card class="mt-3">
        <template #content>
          <div class="flex justify-between py-3">
            <div class="">Khách hàng</div>
            <div class="customer">
              <span>{{ bill.customer.name }}</span>
            </div>
          </div>
          <div class="flex justify-between py-3">
            <div class="">Người giới thiệu</div>
            <div class="customer">
              <span>{{ bill.affiliater.name }}</span>
            </div>
          </div>
        </template>
      </Card>

      <Card class="mt-3">
        <template #content>
          <div class="flex justify-between py-3">
            <div class="">Giá trị đơn hàng</div>
            <div>
              <div class="flex flex-col items-end">
                <div>{{ numberToVnd(transactionShop.metadata.totalAmount) }}</div>
                <div class="opacity-50 text-[10px]" @click="showImageInvoice = true">{{ `Ảnh hoá đơn (${bill.images.length})` }}</div>
              </div>
            </div>
          </div>
          <div class="flex justify-between py-3">
            <div class="flex flex-col">
              <span>Người mua thanh toán</span>
              <!-- <span v-if="bill.customerPreferCash" class="py-1 bg-slate-200 rounded-lg w-fit px-2">Tiền mặt</span> -->
            </div>
            <div v-if="!bill.customerPreferCash">
              {{ numberToVnd(stateShow.customerPay) }}
            </div>
          </div>
          <div class="flex justify-between py-3">
            <div>Ghi chú đơn hàng</div>
            <div v-if="bill.note">{{ bill.note }}</div>
            <div v-else class="opacity-50">Không có</div>
          </div>
        </template>
      </Card>

      <Card class="mt-3">
        <template #content>
          <div class="flex justify-between py-3">
            <div class="">Tổng thưởng</div>
            <div class="font-bold">{{ numberToVnd(transactionShop.amount) }}</div>
          </div>
          <!-- <div v-if="bill.customerId === user.id" class="flex justify-between items-center py-3">
            <div class="">Chiết khấu tạm tính</div>
            <div>
              { bill.rewardRecipient === "both" ? numberToVnd(bill.customerTotalReceive + bill.fee / 2) : numberToVnd(bill.customerTotalReceive + bill.fee) }} 
            </div>
          </div> -->
          <div class="flex justify-between items-center py-3">
            <div class="">Thưởng cho khách hàng</div>
            <div>{{ numberToVnd(stateShow.bonusCustomer) }}</div>
          </div>
          <div class="flex justify-between items-center py-3">
            <div class="">Thưởng cho người giới thiệu</div>
            <div>{{ numberToVnd(stateShow.bonusAffiliater) }}</div>
          </div>
          <div class="flex justify-between py-3">
            <div class="">Phí nền tảng (5%)</div>
            <div class="font-bold">{{ numberToVnd(stateShow.fee) }}</div>
          </div>
        </template>
      </Card>

      <Card class="mt-3">
        <template #content>
          <div class="flex justify-between py-3">
            <div class="">Thời gian tạo</div>
            <div>{{ convertDateTime(bill.createdAt) }}</div>
          </div>
          <div class="flex justify-between py-3">
            <div class="">Tạo bởi</div>
            <div>
              <span>{{ bill.created.name }}</span>
              <!-- <span>{{ bill.createdBill }}</span> -->
            </div>
          </div>
        </template>
      </Card>

      <!-- <Card class="mt-3">
        <template #content>
          <div class="flex justify-between p2-3">
            <div class="flex gap-2 items-center">
              <i class="pi pi-question text-sm text-white bg-red-500 border rounded-full p-1 px-2"></i>
              <span>Liên hệ hỗ trợ</span>
            </div>
          </div>
        </template>
      </Card> -->
      <div v-show="false" class="px-4 flex items-center justify-center h-full w-full pb-10 mb">
        <img v-for="(item, index) in bill.images" :key="index" :src="item" alt="bill" class="w-full border-round object-cover h-full" />
      </div>
    </div>
    <div class="m-4" v-else>
      <Skeleton width="100%" height="4rem" borderRadius="16px"></Skeleton>
      <Skeleton width="100%" class="mb-2 mt-4" borderRadius="16px"></Skeleton>
      <Skeleton width="50%" borderRadius="16px" class="mb-2"></Skeleton>
      <Skeleton height="20%" class="mb-2" borderRadius="16px"></Skeleton>
      <Skeleton width="100%" height="50vh" borderRadius="16px"></Skeleton>
    </div>
  </div>
  <Dialog v-model:visible="showImageInvoice" modal header="Ảnh hoá đơn" :style="{ width: 'calc(100vw - 32px)' }" contentStyle="padding: 0">
    <Carousel :value="bill.images" :numVisible="1" :numScroll="1" :showNavigators="false">
      <template #item="slotProps">
        <div class="px-4 flex items-center justify-center h-full w-full pb-10 mb">
          <img :src="slotProps.data" alt="bill" class="w-full border-round object-cover h-full" />
        </div>
      </template>
    </Carousel>
  </Dialog>
</template>

<style lang="scss" scoped></style>
