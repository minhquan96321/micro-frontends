<script setup>
import backPage from "@/components/BackPage.vue";
import { numberToVnd } from "@/helper/convert.js";
import { ref, shallowRef, onMounted } from "vue";
import ListTransaction from "@/components/ListTransaction.vue";
import ShowBalance from "@/components/ShowBalance.vue";

defineProps(["historyTab"]);

// const tabs = shallowRef([
// 	{ label: "Tất cả", component: Transaction },
// 	// { label: "Rút tiền", component: transactionWithDraw },
// ]);

const { user } = window.$stores;
const activeTabIndex = ref(0);

const redirect = (path) => {
  window.$router.push(path);
};

onMounted(() => {});
</script>

<template>
  <div :class="!historyTab && 'pt-back'">
    <backPage v-if="!historyTab" name="Ví của tôi" class="bg-primary" />
    <!-- card -->
    <div v-if="!historyTab" class="card mt-3 bg-primary mx-2 p-2 rounded-lg">
      <ShowBalance :balance="user.balance" tabCurrent="profile" />
    </div>
    <!-- tabs  -->
    <!-- <TabView v-model:activeIndex="activeTabIndex" class="tab-home mt-2 px-2" :class="historyTab && 'border-t mt-4'"> -->
    <!-- <TabPanel v-for="(tab, index) in tabs" :key="tab.title" :header="tab.title"> -->
    <!-- <template #header>
					<div class="flex justify-center flex-col items-center" :class="index === activeTabIndex ? 'text-primary' : ''"
						@click="activeTab = tab">
						<span class="whitespace-nowrap text-[13px] mt-1">{{ tab.label }}</span>
					</div>
				</template> -->
    <!-- <component :is="tab.component" v-if="index === activeTabIndex" /> -->
    <!-- </TabPanel> -->
    <!-- </TabView> -->
    <!-- <Transaction :historyTab="historyTab" /> -->
    <div class="mx-4">
      <ListTransaction :showType="'profile'" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.p-tabview-ink-bar {
  height: 2px !important;
}
</style>
