<script setup>
import { ref, onMounted, reactive } from "vue";
import backPage from "@/components/BackPage.vue";
import { numberToVnd, convertDateTime } from "@/helper/convert";
import { colorMoney } from "@/helper/hook";

const { shop, user } = window.$stores;
const bill = ref({});
const transactionProfile = window.$stores.transaction.transactionShow;
const transactionShop = ref();
const transactionFee = ref();

const modeCustomer = transactionProfile.note === "Bonus for using service";

const stateShow = reactive({ bonusTemporary: 0, myFee: 0 });

onMounted(() => {
  window.$stores.bill.detail({ id: window.$route.params.id, showType: "profile" }).then((res) => {
    // res.customerPhone = ` _****${res.customerPhone.slice(-4)}`;
    // res.affiliaterPhone = ` _****${res.affiliaterPhone.slice(-4)}`;
    transactionShop.value = res.transaction.find((item) => item.note === "Bonus for user");
    transactionFee.value = res.transaction.find((item) => item.note === "Transaction fee");
    bill.value = res;

    console.log(transactionShop.value.amount, transactionFee.value.metadata.affiliaterBonus)

    stateShow.bonusTemporary = parseInt(
      Math.abs(transactionShop.value.amount) *
        (modeCustomer ? 1 - transactionFee.value.metadata.affiliaterBonus : transactionFee.value.metadata.affiliaterBonus)
    );
    stateShow.myFee = parseInt(stateShow.bonusTemporary - transactionProfile.amount);
  });
});
</script>

<template>
  <div class="transaction-detail pt-back">
    <backPage name="Chi tiết giao dịch" class="bg-primary" />
    <div v-if="bill._id" class="content p-3">
      <Card class="mt-3">
        <template #content>
          <div class="flex flex-col items-center gap-4">
            <div class="note">Tiền thưởng</div>
            <div :class="colorMoney(transactionProfile.amount)" class="font-bold text-3xl">+{{ numberToVnd(transactionProfile.amount) }}</div>
          </div>
          <!-- <div class="code-transaction opacity-50">
            <span>Mã giao dịch:</span>
            <span class="ml-2">{{ transactionProfile._id }}</span>
          </div> -->
        </template>
      </Card>

      <Card class="mt-3">
        <template #content>
          <div class="flex justify-between">
            <div class="">Trạng thái</div>
            <div v-if="bill.status === 'success'" class="text-yellow-400">Thành công</div>
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
          <div class="flex justify-between">
            <div class="">Cửa hàng</div>
            <div>
              <div class="max-w-[200px] whitespace-nowrap overflow-hidden text-ellipsis">{{ shop.name }}</div>
            </div>
          </div>
          <div class="flex justify-between pt-4">
            <div class="">Giá trị đơn hàng</div>
            <div class="font-bold">{{ numberToVnd(transactionShop.metadata.totalAmount) }}</div>
          </div>
        </template>
      </Card>

      <!-- <Card class="mt-3">
        <template #content>
          <div class="flex justify-between py-3">
            <div class="">Giá trị đơn hàng</div>
            <div class="font-bold">{{ numberToVnd(transactionShop.metadata.totalAmount) }}</div>
          </div>
          <div class="flex justify-between items-center py-3">
            <div class="">Chiết khấu áp dụng</div>
            <div>
              {{ stateShow.bonusTemporary }}
            </div>
          </div>
          <div class="flex justify-between items-center py-3">
            <div class="">Hoa hồng tạm tính</div>
            <div>
              {{ numberToVnd(stateShow.bonusTemporary) }}
            </div>
          </div>
          <div class="flex justify-between py-3">
            <div class="">Phí nền tảng</div>
            <div class="font-bold">{{ transactionProfile.metadata.fee }}%</div>
          </div>
          <div class="flex justify-between py-3">
            <div class="flex gap-1">Thực nhận</div>
            <div>
              {{ numberToVnd(transactionProfile.amount) }}
            </div>
          </div>
        </template>
      </Card> -->

      <Card class="mt-3">
        <template #content>
          <div class="flex justify-between py-3">
            <div class="">Thời gian tạo</div>
            <div>{{ convertDateTime(bill.createdAt) }}</div>
          </div>
        </template>
      </Card>

      <!-- <Card class="mt-3">
        <template #content>
          <div class="flex justify-between px-3">
            <div class="flex gap-2 items-center">
              <i class="pi pi-question text-sm text-white bg-red-500 border rounded-full p-1 px-2"></i>
              <span>Liên hệ hỗ trợ</span>
            </div>
          </div>
        </template>
      </Card> -->
    </div>
    <div class="m-4" v-else>
      <Skeleton width="100%" height="4rem" borderRadius="16px"></Skeleton>
      <Skeleton width="100%" class="mb-2 mt-4" borderRadius="16px"></Skeleton>
      <Skeleton width="50%" borderRadius="16px" class="mb-2"></Skeleton>
      <Skeleton height="20%" class="mb-2" borderRadius="16px"></Skeleton>
      <Skeleton width="100%" height="50vh" borderRadius="16px"></Skeleton>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
