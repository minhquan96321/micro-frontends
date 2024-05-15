<script setup>
import { reactive, ref } from "vue";
const props = defineProps(["addRowRule", "discountActive", "closeModal"]);

const isLoading = ref(false);

const newField = reactive({ minAmount: undefined, maxAmount: undefined, value: undefined, discountMethod: "percent" });

const optionSelect = [
  { name: "%", value: "percent" },
  { name: "VND", value: "cash" }
];

const checkRowAddValid = (config, list) => {
  let messageError = "";
  if (config.minAmount >= config.maxAmount) messageError = "Mức tối thiểu không được nhỏ hơn hoặc bằng mức tối đa";
  if (!config.minAmount || !config.maxAmount || !config.value) messageError = "Hãy nhập giá trị hợp lệ";

  if(config.discountMethod === "percent" && config.value > 100) messageError = "Mức thưởng không được quá 100%";
  if(config.discountMethod === "cash" && config.value > config.minAmount) messageError = "Mức thưởng không được quá mức tối thiểu";

  if(config.discountMethod === "cash" && (config.value % 1 !== 0)) messageError = "Mức thưởng không được lẻ nhỏ hơn 1 đồng";


  for (const rule of list) {
    if (config.minAmount < rule.minAmount && config.maxAmount >= rule.minAmount) {
      messageError = "Giá trị tối thiểu không hợp lệ";
    }
    if (config.minAmount >= rule.minAmount && config.minAmount <= rule.maxAmount) {
      messageError = "Giá trị tối thiểu không hợp lệ";
    }
    if (config.maxAmount >= rule.minAmount && config.maxAmount <= rule.maxAmount) {
      messageError = "Giá trị tối đa không hợp lệ";
    }
  }
  return messageError;
};

const save = async () => {
  console.log(props.discountActive, "props.discountActive");
  const error = checkRowAddValid(newField, props.discountActive.discountRule);
  if (error) return window.$toast.add({ severity: "error", summary: error, life: 3000 });
  isLoading.value = true;
  await window.$api.call("discount.addRule", { id: props.discountActive._id, rule: newField });
  await window.$stores.discount.list();
  isLoading.value = false;
  props.closeModal();
};
</script>

<template>
  <div class="modal-add-row-aff-all">
    <span class="p-text-secondary block mb-5">Dành cho hóa đơn có thông tin như sau</span>
    <div class="mb-4">
      <label for="locale-us" class="font-bold block">Từ</label>
      <InputText
        v-model="newField.minAmount"
        class="border-gray-300 border px-1 py-2 w-full"
        placeholder="Nhập giá sản phẩm"
        type="number"
        :step="1"
        @update:modelValue="newField.minAmount = Number(newField.minAmount) || undefined"
      />
    </div>
    <div class="mb-4">
      <label for="locale-us" class="font-bold block"> Đến </label>
      <InputText
        v-model="newField.maxAmount"
        class="border-gray-300 border px-1 py-2 w-full"
        placeholder="Nhập giá sản phẩm"
        type="number"
        :step="1"
        @update:modelValue="newField.maxAmount = Number(newField.maxAmount) || undefined"
      />
    </div>
    <div class="">
      <label for="locale-us" class="font-bold block"> Mức thưởng </label>
      <div class="flex items-center">
        <InputText
          v-model="newField.value"
          class="border-gray-300 border px-1 py-2 !border-r-0 w-2/3 rounded-r-[0px]"
          placeholder="Nhập mức thưởng"
          type="number"
          :step="1"
          @update:modelValue="newField.value = Number(newField.value) || undefined"
        />
        <Dropdown
          v-model="newField.discountMethod"
          :options="optionSelect"
          optionValue="value"
          optionLabel="name"
          class="border border-l rounded-none rounded-r outline-none ring-0 w-1/3 h-10"
        />
      </div>
    </div>

    <div class="flex justify-center mt-6 gap-2">
      <span v-if="isLoading" class="pi pi-spin pi-spinner" />
      <Button v-else type="button" label="Lưu" @click="save"></Button>
    </div>
  </div>
</template>
