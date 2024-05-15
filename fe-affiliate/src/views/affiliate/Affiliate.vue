<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import ListProduct from "./pageEdit/components/ListProduct.vue";
import TableShow from "./pageEdit/components/Table.vue";

const { listDiscount } = window.$stores.discount;
const { mode, affiliater, affiliaterBonus } = window.$stores.shop;
const navigateEditAff = () => {
  window.$router.push("/dashboard/affiliate/edit");
};

onMounted(() => {});
</script>
<template>
  <div class="flex items-center justify-between my-4">
    <div class="font-semibold">Ưu đãi giới thiệu</div>
    <div v-if="mode === 'owner'" class="border w-6 h-6 border-primary rounded text-primary flex justify-center items-center" @click="navigateEditAff">
      <span class="pi pi-file-edit"></span>
    </div>
  </div>
  <div class="bg-[#ffe6d6] text-[#CC5F12] flex items-center p-2 gap-4 rounded">
    <span class="pi pi-thumbs-up-fill" />
    <ul class="text-xs pl-3 flex flex-col" style="list-style-type: disc">
      <li class="inline">
        <span>
          <span>
            Nếu đơn hàng có người giới thiệu<span v-if="affiliaterBonus" class="font-semibold">, người mua hàng </span>được
            {{ 100 - parseInt(affiliaterBonus * 100) }}% mức thưởng</span
          >
          <span v-if="100 - affiliaterBonus * 100"
            ><span class="font-semibold">, người giới thiệu</span> được {{ parseInt(affiliaterBonus * 100) }}% mức thưởng</span
          >
        </span>
      </li>
      <li v-if="affiliater === 'customer'" class="mt-2 inline">
        <span> <span class="font-semibold">Người giới thiệu</span> cần phát sinh hóa đơn tại cửa hàng mới có thể giới thiệu bạn bè và nhận thưởng. </span>
      </li>
    </ul>
  </div>
  <div v-if="listDiscount" id="aff-show" class="mb-4">
    <!-- <div class="font-semibold mb-2">Nhóm thưởng đặc biệt</div> -->
    <div v-for="(discount, index) in listDiscount" :key="discount._id" class="border-b pb-4">
      <!-- <div v-if="!index" class="font-semibold text-base mt-4">Nhóm thưởng</div> -->
      <div v-if="index === 1" class="font-semibold text-base mt-4">Nhóm thưởng đặc biệt</div>
      <ListProduct
        v-if="index"
        :discount="discount"
        :activeEditProduct="() => (stateConfig.editProductActive = discount) && (stateConfig.openProduct = true)"
      />
      <TableShow :discount="discount" />
    </div>
  </div>
</template>
<style lang="scss">
#aff-show {
  .p-datatable-thead {
    tr {
      th {
        background-color: #fafafb;
      }
    }
  }
}
</style>
