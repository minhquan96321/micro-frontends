<script setup>
import { ref } from "vue";
import { numberToVnd } from "@/helper/convert.js";

const props = defineProps(["discount"]);

const deleteLoading = ref(false);

const deleteRule = (id, rule, index) => {
  deleteLoading.value = id + index;
  window.$api.call("discount/removeRule", { id, rule }).finally(async () => {
    await window.$stores.discount.list();
    deleteLoading.value = false;
  });
};

const modeEdit = window.location.pathname.includes("edit");
</script>

<template>
  <div class="border-gray-300 w-full mt-4">
    <table class="w-full font-normal mb-10 [&>*]:border-gray-300">
      <tr class="border h-10 [&>*]:bg-gray-300">
        <th class="border-r min-w-6">#</th>
        <th class="border-r">Giá trị mua hàng</th>
        <th class="border-r">Mức thưởng</th>
        <th v-if="modeEdit" class="px-1">Xóa</th>
      </tr>
      <tr
        v-for="(rule, index) in JSON.parse(JSON.stringify(discount.discountRule)).sort((a, b) => a.minAmount - b.minAmount)"
        :key="rule"
        class="border h-8 text-xs [&>*]:border-gray-300"
      >
        <td class="border-r p-1 text-center">{{ index + 1 }}</td>
        <td class="border-r p-1">
          {{ numberToVnd(rule.minAmount) }}

          <span>-</span>
          {{ numberToVnd(rule.maxAmount) }}
        </td>
        <td class="border-r p-1">{{ rule.discountMethod === "percent" ? rule.value + "%" : numberToVnd(rule.value) }}</td>
        <td v-if="modeEdit" style="text-align: center; vertical-align: middle">
          <span :class="deleteLoading === discount._id + index ? 'pi pi-spin pi-spinner' : 'pi pi-trash'" @click="deleteRule(discount._id, rule, index)" />
        </td>
      </tr>
    </table>

    <!-- <div class="flex w-full h-10 items-center [&>*]:bg-gray-200">
      <div class="h-full flex items-center border justify-center border-gray-300 w-8 rounded-tl-lg">#</div>
      <div class="h-full flex items-center justify-center border-r border-t border-b border-gray-300 w-1/2">Giá trị mua hàng</div>
      <div :class="!modeEdit && 'border-r rounded-tr-lg'" class="h-full flex items-center justify-center border-t border-b border-gray-300 flex-1">
        Hoa Hồng
      </div>
      <div v-if="modeEdit" class="h-full flex items-center justify-center border-r border-l border-t border-b border-gray-300 w-12 rounded-tr-lg">Xóa</div>
    </div>

    <div v-for="(rule, index) in discount.discountRule" :key="rule" class="flex w-full h-10 items-center">
      <div class="h-full flex items-center border-l border-r border-b justify-center border-gray-300 w-8">
        {{ index + 1 }}
      </div>
      <div class="h-full flex items-center justify-start border-r border-b border-gray-300 w-1/2 px-1">
        {{ numberToVnd(rule.minAmount) }}

        <span>-</span>
        {{ numberToVnd(rule.maxAmount) }}
      </div>
      <div :class="!modeEdit && 'border-r'" class="h-full flex items-center justify-center border-b border-gray-300 flex-1">
        {{ rule.discountMethod === "percent" ? rule.value + "%" : numberToVnd(rule.value) }}
      </div>
      <div v-if="modeEdit" class="h-full flex items-center justify-center border-l border-r border-b border-gray-300 w-12">
        <span :class="deleteLoading === discount._id + index ? 'pi pi-spin pi-spinner' : 'pi pi-trash'" @click="deleteRule(discount._id, rule, index)" />
      </div>
    </div> -->
  </div>
</template>
