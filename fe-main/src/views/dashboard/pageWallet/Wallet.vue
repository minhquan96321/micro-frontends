<script setup>
import backPage from "@/components/BackPage.vue";
import { numberToVnd } from "@/helper/convert.js";
import { ref, shallowRef } from "vue";
import ListTransaction from "@/components/ListTransaction.vue";
import ShowBalance from "@/components/ShowBalance.vue";

// import transactionWithDraw from "./Withdraws.vue";

// const tabs = shallowRef([
//   { label: "Tất cả", component: Transaction },
//   // { label: "Hoa hồng & chiết khấu", component: Commission },
//   // { label: "Nạp tiền", component: TransactionTopUp },
//   // { label: "Rút tiền", component: transactionWithDraw },
// ]);

const { shop } = window.$stores;
const activeTabIndex = ref(0);

const redirect = (path) => {
  window.$router.push(path);
};

</script>

<template>
  <div class="pt-back">
    <backPage name="Ví cửa hàng" class="bg-primary" />
    <!-- card -->
    <div class="card mt-5 bg-primary mx-2 p-2 rounded-lg">
      <ShowBalance :balance="shop.balance" tabCurrent="shopWallet" />
    </div>
    <!-- tabs  -->
    <!-- <TabView v-model:activeIndex="activeTabIndex" class="tab-home mt-2 px-2">
      <TabPanel v-for="(tab, index) in tabs" :key="tab.title" :header="tab.title">
        <template #header>
          <div class="flex justify-center flex-col items-center" :class="index === activeTabIndex ? 'text-primary' : ''"
            @click="activeTab = tab">
            <span class="whitespace-nowrap text-[13px] mt-1">{{ tab.label }}</span>
          </div>
        </template>
        <component :is="tab.component" v-if="index === activeTabIndex" />
      </TabPanel>
    </TabView> -->
    <div class="px-4">
      <ListTransaction :showType="'shop'" />
    </div>
  </div>
</template>