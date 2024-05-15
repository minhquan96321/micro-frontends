<script setup>
import { reactive, onMounted, watch } from "vue";
const { uploadSingleImage } = window.$stores.helper;
const props = defineProps(["closeModal"]);

const state = reactive({ name: "", price: undefined, category: "", picture: "", loadingUpload: false, loadingSubmit: false });

const chooseFile = () => {
  document.getElementById("choose").value = "";
  state.picture = "";
  document.getElementById("choose").click();
};

const uploadFile = async (event) => {
  state.loadingUpload = true;
  const file = event.target.files;
  if (file && file.length) {
    state.picture = await uploadSingleImage(file[0]);
  }
  state.loadingUpload = false;
};

const submit = async () => {
  if (!state.price) return window.$toast.add({ severity: "error", summary: "Giá sản phẩm không hợp lệ!", life: 3000 });
  if (!state.name) return window.$toast.add({ severity: "error", summary: "Tên sản phẩm không được để trống!", life: 3000 });
  if (!state.picture) return window.$toast.add({ severity: "error", summary: "Ảnh sản phẩm không được để trống!", life: 3000 });
  if (!state.category) return window.$toast.add({ severity: "error", summary: "Category sản phẩm không được để trống!", life: 3000 });
  state.loadingSubmit = true;
  const { name, price, category, picture } = state;
  window.$api
    .call("product/create", { name, price, category, picture })
    .catch((e) => window.$toast.add({ severity: "error", summary: JSON.stringify(e), life: 3000 }))
    .finally(async () => {
      await window.$stores.product.list();
      state.loadingSubmit = false;
      props.closeModal();
    });
};

watch(
  () => state.price,
  () => {
    console.log(state.price, "state.price");
  }
);

// onMounted(() => {
//   document.getElementById("locale-german").addEventListener("text")
//   $('input').on('textInput', e => {
//      var keyCode = e.originalEvent.data.charCodeAt(0);
//      // keyCode is ASCII of character entered.
// })
// })
</script>

<template>
  <div>
    <div class="mb-4">
      <div class="font-semibold">Tên sản phẩm</div>
      <InputText v-model="state.name" class="border border-gray-300 px-2 py-[6px] w-full mt-1" placeholder="Nhập tên sản phẩm" />
    </div>
    <div class="mb-4">
      <div class="font-semibold">Giá sản phẩm</div>
      <InputText
        v-model="state.price"
        inputId="locale-german"
        class="w-full p-[6px] border border-gray-300 mt-1"
        locale="de-DE"
        placeholder="Nhập giá sản phẩm"
        type="number"
        :step="1"
        @update:modelValue="state.price = Number(state.price) || undefined"
      />
    </div>
    <div class="mb-4">
      <div class="font-semibold">Nhóm hàng</div>
      <InputText
        v-model="state.category"
        class="border border-gray-300 px-2 py-[6px] w-full mt-1"
        currency="VND"
        currencyDisplay="VND"
        placeholder="Nhập tên nhóm hàng"
      />
    </div>
    <div class="flex justify-center mb-4">
      <div class="w-[80px] h-[80px] border border-dashed border-gray-300">
        <input id="choose" class="hidden" type="file" accept="image/*" @change="uploadFile" />
        <label v-if="!state.picture" for="choose" class="w-full h-full flex items-center justify-center cursor-pointer">
          <span v-if="state.loadingUpload" class="pi pi-spin pi-spinner" />
          <span v-else> Chọn ảnh </span>
        </label>
        <img v-else class="object-cover w-full h-full" :src="state.picture" @click="chooseFile" />
      </div>
    </div>
    <div class="flex items-center justify-center">
      <Button class="flex gap-2" :disabled="state.loadingSubmit" @click="submit">
        <span v-if="state.loadingSubmit" class="pi pi-spin pi-spinner" />
        <span> Thêm </span>
      </Button>
    </div>
  </div>
</template>
