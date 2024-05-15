<script setup>
import Header from "@/layout/Header.vue";
import TabMenu from "primevue/tabmenu";
import { ref, reactive, shallowRef, onMounted } from "vue";
import { useI18n } from "vue-i18n-lite";

const { mode } = window.$stores.shop;
const { t } = useI18n();
const tabs = shallowRef(window.$stores.layout.tab.sort((a, b) => a.position - b.position));

const activeTabIndex = ref(0);
const navigateRouter = (param) => {
  window.$router.push(param);
};

const shopInfo = window.$stores.shop;

const initData = () => {
  if (!window.$stores.discount.listDiscount) {
    window.$stores.discount.list();
  }
  if (!window.$stores.product?.listProduct.length) {
    window.$stores.product?.list();
  }
};

const onTabChange = (event) => {
  window.$stores.layout.lastTab = event.index;
  if (event.index === 0) {
    window.$stores.shop.info();
  }
};

onMounted(() => {
  initData();
  activeTabIndex.value = window.$stores.layout.lastTab;
});

const checkIn = ref(null);
const checkOut = ref(null);
const files = ref([]);
const date = new Date();
</script>

<template>
  <div>
    <Header class="fixed top-0 pt-notch bg-common w-full z-10" />
    <div class="px-5 pt-notch mt-[76px]">
      <div class="flex">
        <img
          class="rounded-lg max-h-[300px] w-[calc(100vw-40px)] object-cover mx-auto"
          src="https://biggerbetterbanner.com/wp-content/uploads/2021/03/BUSINESS-FOOD-BUFFET.png"
        />
      </div>
      <div class="flex justify-between items-center mt-5">
        <div class="font-semibold">{{ shopInfo.name }}</div>
        <!-- <div class="border rounded-full bg-[#FEF3F0] h-8 flex items-center justify-center w-8">
          <i class="pi pi-share-alt text-primary"></i>
        </div> -->
        <div class="h-8" />
      </div>
      <!-- <div class="flex mt-4">
        <div v-for="tab in tabs" :key="tab.label" :class="tab.label === activeTab.label ? 'bg-primary' : ''" class="flex-1 flex justify-center flex-col items-center" @click="activeTab = tab">
          <span :class="tab.icon"></span>
          <div>{{ tab.label }}</div>
        </div>
      </div> -->
      <TabView v-model:activeIndex="activeTabIndex" class="tab-home" @tab-change="onTabChange">
        <TabPanel v-for="(tab, index) in tabs.filter((item) => item.role.includes(mode))" :key="tab.title" :header="tab.title">
          <template #header>
            <div class="flex justify-center flex-col items-center" :class="index === activeTabIndex ? 'text-primary' : ''" @click="activeTab = tab">
              <span :class="tab.icon"></span>
              <span class="whitespace-nowrap text-[10px] mt-1">{{ t(tab.label) }}</span>
            </div>
          </template>
          <component :is="tab.component" v-if="index === activeTabIndex" />
        </TabPanel>
      </TabView>
      <!-- <div>
        <component :is="activeTab.component" />
      </div> -->
    </div>
    <div v-if="mode !== 'user'" class="fixed right-4 bottom-10 flex items-center">
      <div class="flex items-center gap-5 relative opacity-90">
        <div class="px-3 bg-gray-400 bg-opacity-100 h-10 flex items-center relative z-10 rounded-lg">Thêm đơn hàng mới</div>
        <div class="bg-gray-400 bg-opacity-100 absolute h-5 w-5 right-14 rotate-45 z-0" />
        <div class="bg-primary w-10 h-10 rounded-full text-white flex items-center justify-center">
          <span class="pi pi-plus" @click="navigateRouter('/bill')" />
        </div>
      </div>
    </div>
    <div v-else class="fixed right-4 bottom-10 flex items-center">
      <div class="flex items-center gap-5 relative opacity-90">
        <div class="px-3 bg-gray-400 bg-opacity-100 h-10 flex items-center relative z-10">Mã QR của tôi</div>
        <div class="bg-gray-400 bg-opacity-100 absolute h-5 w-5 right-14 rotate-45 z-0" />
        <div class="bg-primary w-10 h-10 rounded-full text-white flex items-center justify-center">
          <span class="pi pi-qrcode" @click="navigateRouter('/referral-code')" />
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.tab-home {
  .p-tabview {
    background: transparent;
  }

  .p-tabview-nav {
    background: transparent;
  }

  .p-tabview-selected {
    background: transparent;
  }

  .p-tabview-panels {
    background: transparent;
    padding: 0;
  }

  .p-tabview-panel {
    background: transparent;
  }

  background-color: transparent;

  a {
    padding: 0 !important;
    background: transparent;
  }

  ul {
    display: flex;
    padding: 10px 0 5px 0;

    li {
      flex: 1;
      display: flex;
      justify-content: center;
    }
  }

  .p-tabview-ink-bar {
    background-color: var(--primary);
  }
}
</style>
