<script setup>
import { computed } from "vue";
import { numberToVnd } from "@/helper/convert.js";
const props = defineProps(["dataTable"]);
const value = JSON.parse(JSON.stringify(props.dataTable));
value.forEach((item, index) => {
  item.no = index + 1;
});
</script>
<template>
  <DataTable :value="value" showGridlines tableStyle="max-width: calc(100vw - 40px)">
    <Column class="w-10" field="no" header="#" />
    <Column header="Giá trị mua hàng">
      <template #body="{ data }"> {{ numberToVnd(data.minAmount) }} - {{ numberToVnd(data.maxAmount) }} </template>
    </Column>
    <Column class="max-w-[100px] w-[100px]" header="Hoa hồng">
      <template #body="{ data }"> {{ data.discountMethod === "percent" ? data.value + "%" : numberToVnd(data.value) }} </template>
    </Column>
  </DataTable>
</template>
