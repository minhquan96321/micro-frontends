<script setup>
import { ref, reactive, onMounted, computed, watch, onUnmounted } from "vue";
import TableShow from "./components/Table.vue";
import ModalAddGroup from "./components/ModalAddGroup.vue";
import ModalAddRule from "./components/ModalAddRule.vue";
import ModalEditProduct from "./components/ModalEditProduct.vue";
import ListProduct from "./components/ListProduct.vue";
import BackPage from "@/components/BackPage.vue";

const listDiscount = computed(() => window.$stores.discount.listDiscount);
const stateConfig = reactive({
  openGroup: false,
  openRule: false,
  openProduct: false,
  editProductActive: null,
  discountActive: null
});

// start setting shop
const affiliaterBonus = reactive({ affiliater: Number(((1 - window.$stores.shop.affiliaterBonus) * 100).toFixed(0)) });
const selectRuleAff = ref(window.$stores.shop.affiliater);
const caseRuleAff = [
  { text: "Bất kỳ ai cũng có thể giới thiệu", value: "everyone" },
  { text: "Người giới thiệu đã phát sinh hoá đơn tại cửa hàng", value: "customer" }
];

const changeRuleSettingShop = async () => {
  window.$api.call("shop/setting", { affiliaterBonus: (100 - affiliaterBonus.affiliater) / 100, affiliater: selectRuleAff.value }).then(() => {
    window.$toast.add({ severity: "success", summary: "Thành công", life: 3000 });
    window.$stores.shop.info();
  });
};

watch(selectRuleAff, () => {
  changeRuleSettingShop();
});
// end setting shop

// start setting discount

onMounted(() => {
  if (!window.$stores.discount.listDiscount) {
    window.$stores.discount.list();
  }
  if (!window.$stores.product.listProduct.length) {
    window.$stores.product.list();
  }
});

</script>
<template>
  <BackPage className="bg-primary" name="Chỉnh sửa ưu đãi giới thiệu" />
  <div class="pt-back edit-affiliate">
    <div class="pb-[87px] py-3 px-4">
      <div>
        <div class="mt-4 flex flex-col gap-2">
          <div class="font-semibold">Tỉ lệ nhận thưởng</div>
          <div class="flex justify-between">
            <div>Người mua hàng {{ affiliaterBonus.affiliater }} %</div>
            <div>Người giới thiệu {{ 100 - affiliaterBonus.affiliater }} %</div>
          </div>
          <div class="mx-5">
            <Slider v-model="affiliaterBonus.affiliater" @slideend="changeRuleSettingShop" />
          </div>
        </div>
        <div class="mt-8 flex flex-col gap-2 mb-4">
          <div class="font-semibold">Điều kiện giới thiệu</div>
          <div v-for="rule in caseRuleAff" :key="rule.value" class="flex align-items-center">
            <RadioButton
              v-model="selectRuleAff"
              class="border rounded-full w-5 h-5 flex items-center justify-center"
              :inputId="rule.text"
              name="dynamic"
              :value="rule.value"
            />
            <label :for="rule.text" class="ml-2">{{ rule.text }}</label>
          </div>
        </div>
        <div class="bg-[#ffe6d6] text-[#CC5F12] flex items-center p-2 gap-4 rounded">
          <span class="pi pi-thumbs-up-fill" />
          <ul class="text-xs pl-3" style="list-style-type: disc">
            <li>
              Nếu đơn hàng có người giới thiệu<span
                ><span v-if="affiliaterBonus.affiliater">
                  <span class="font-semibold">, người mua hàng </span>được {{ affiliaterBonus.affiliater }}% mức thưởng</span
                >
              </span>
              <span v-if="100 - affiliaterBonus.affiliater"
                ><span class="font-semibold">, người giới thiệu</span> được {{ 100 - affiliaterBonus.affiliater }}% mức thưởng</span
              >.
            </li>
            <li v-if="selectRuleAff === 'customer'" class="mt-2">
              <span class="font-semibold">Người giới thiệu</span> cần phát sinh hóa đơn tại cửa hàng mới có thể giới thiệu bạn bè và nhận thưởng.
            </li>
          </ul>
        </div>
        <div class="mt-4 flex flex-col gap-2">
          <div class="font-semibold">Ưu đãi giới thiệu</div>
        </div>
      </div>
      <div v-for="(discount, index) in listDiscount" :key="discount._id" class="border-b pb-4">
        <!-- <div v-if="!index" class="font-semibold text-base mt-4">Nhóm thưởng</div> -->
        <div v-if="index === 1" class="font-semibold text-base mt-4">Nhóm thưởng đặc biệt</div>
        <ListProduct
          v-if="index"
          :discount="discount"
          :activeEditProduct="() => (stateConfig.editProductActive = discount) && (stateConfig.openProduct = true)"
        />
        <TableShow :discount="discount" />
        <Button class="mx-auto mt-4 text-primary px-3 py-2 rounded-lg" @click="(stateConfig.openRule = true) && (discountActive = discount)"
          >Thêm mức thưởng</Button
        >
      </div>
      <div class="flex justify-center">
        <!-- <Button class="mx-auto mt-4" @click="stateConfig.openGroup = true">Thêm nhóm thưởng</Button> -->
      </div>
    </div>
  </div>
  <Dialog
    v-model:visible="stateConfig.openProduct"
    :editProductActive="stateConfig.editProductActive"
    modal
    header="Chỉnh sửa sản phẩm"
    :style="{ width: '25rem', maxWidth: 'calc(100vw - 32px)' }"
  >
    <ModalEditProduct :closeModal="() => (stateConfig.openProduct = false)" :editProductActive="stateConfig.editProductActive" />
  </Dialog>
  <Dialog v-model:visible="stateConfig.openGroup" modal header="Thêm nhóm thưởng" :style="{ width: '25rem', maxWidth: 'calc(100vw - 32px)' }">
    <ModalAddGroup :closeModal="() => (stateConfig.openGroup = false)" />
  </Dialog>
  <Dialog v-model:visible="stateConfig.openRule" modal header="Thêm mức thưởng" :style="{ width: '25rem', maxWidth: 'calc(100vw - 32px)' }">
    <ModalAddRule :discountActive="discountActive" :closeModal="() => (stateConfig.openRule = false)" />
  </Dialog>
</template>