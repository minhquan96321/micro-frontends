<script setup>
import { onMounted, reactive, ref } from "vue";
import BackPage from "@/components/BackPage.vue";

const { name, address, description } = window.$stores.shop;

const form = reactive({ name, description, address });
const newAddress = reactive({ address: "", openingHours: "", phone: "", map: "" });
const state = reactive({ saveLoading: false, isOpenAddress: false });

const addressEdit = ref(JSON.parse(JSON.stringify(address)));

const addAddress = () => {
  if (!newAddress.address || !newAddress.openingHours || !newAddress.phone) {
    window.$toastError("Vui lòng điền đầy đủ thông tin");
    return;
  }
  if (newAddress.phone.length < 10 || !newAddress.phone.startsWith("0")) {
    window.$toastError("Số điện thoại không hợp lệ");
    return;
  }
  if (newAddress.address.length < 8) {
    window.$toastError("Địa chỉ phải nhiều hơn 8 ký tự");
    return;
  }
  if (newAddress.map && !isValidURL(newAddress.map)) {
    window.$toastError("Link map không hợp lệ");
    return;
  }
  addressEdit.value.push(JSON.parse(JSON.stringify(newAddress)));
  newAddress.address = "";
  newAddress.openingHours = "";
  newAddress.phone = "";
  newAddress.map = "";
  state.isOpenAddress = false;
};

const submit = () => {
  if (!form.name || !form.description) {
    window.$toastError("Vui lòng điền đầy đủ thông tin");
    return;
  }
  state.saveLoading = true;
  form.address = addressEdit.value;
  window.$api
    .call("shop/updateInfo", form)
    .then(async (res) => {
      if (res.success) {
        window.$toastSuccess("Thành công");
        await window.$stores.shop.info();
      } else window.$toastSuccess(JSON.stringify(res));
    })
    .catch((e) => {
      window.$toastError("Cập nhật thất bại vui lòng kiểm tra lại thông tin");
      console.error("error:::", e);
    })
    .finally(() => {
      window.$router.back();
      state.saveLoading = false;
    });
};

const isValidURL = (url) => url.startsWith("http://") || url.startsWith("https://");

onMounted(() => { });
</script>
<template>
  <div>
    <BackPage name="Chỉnh sửa giới thiệu" class="bg-primary" />
    <div class="mx-4 pt-back">
      <div class="flex justify-between pt-4 pb-1">
        <div class="font-semibold">Tên cửa hàng
          <span class="text-red-500">*</span>
        </div>
      </div>
      <div class="flex w-full">
        <Textarea v-model="form.name" rows="2" class="w-full border-gray-300 border p-1" />
      </div>
      <div class="flex justify-between py-4">
        <div class="font-semibold">Về chúng tôi
          <span class="text-red-500">*</span>
        </div>
      </div>
      <div class="flex w-full flex-col">
        <Textarea v-model="form.description" rows="10" class="w-full border-gray-300 border p-2 rounded-lg"
          maxlength="1000" />
        <span v-if="form.description.length === 1000" class="text-red-500 text-xs italic">Tối đa 1000 ký tự </span>
      </div>
      <div class="font-semibold mt-5 mb-3">Địa chỉ</div>
      <div v-for="(item, index) in addressEdit" :key="item" class="flex items-center justify-between">
        <div :class="index && 'border-t w-full pt-4 border-gray-300'" class="flex gap-3 mb-4 mx-2">
          <div
            class="p-1 rounded-full text-white bg-primary h-[20px] w-[20px] flex-shrink-0 flex items-center justify-center">
            {{
          index + 1
        }}</div>
          <!-- <div><span class="pi pi-map-marker"></span></div> -->
          <div class="flex flex-col gap-1 w-full">
            <div>{{ item.address }}</div>
            <div class="gap-2 flex items-center">
              Giờ hoạt động:
              <div>{{ item.openingHours }}</div>
            </div>
            <div class="flex gap-2 ">
              <!-- <span> Map:</span> -->
              <!-- <span class="max-w-[60vw] overflow-hidden overflow-ellipsis whitespace-nowrap">{{ item.map }}</span> -->
            </div>
            <div class="flex items-center gap-2">
              Liên hệ:
              <div class="text-primary">{{ item.phone }}</div>
            </div>
          </div>
        </div>

        <span class="pi pi-trash h-5 w-5 flex" @click="addressEdit.splice(index, 1)" />
      </div>
      <div class="w-full flex mt-4">
        <Button class="mx-auto text-primary px-3 py-2" @click="state.isOpenAddress = true">
          <i class="pi pi-plus pr-1"></i>
          Thêm địa chỉ
        </Button>
      </div>
    </div>
    <div
      class="fixed bottom-0 pb-10 w-full justify-center flex gap-4 bg-white pt-5 rounded-tl-2xl rounded-tr-2xl shadow-footer">
      <Button :disabled="state.saveLoading" class="flex items-center gap-4 text-white bg-primary rounded-lg px-4 py-2"
        @click="submit">
        <span v-if="state.saveLoading" class="pi pi-spin pi-spinner" />
        Lưu chỉnh sửa
      </Button>
    </div>
  </div>
  <Dialog v-model:visible="state.isOpenAddress" modal header="Thêm địa chỉ"
    :style="{ width: '25rem', maxWidth: 'calc(100vw - 32px)' }">
    <div class="modal-add-role">
      <div class="py-1">
        <div>
          Địa chỉ
          <span class="text-red-500">*</span>
        </div>
        <InputText v-model="newAddress.address" placeholder="Nhập địa chỉ"
          class="border border-gray-300 px-2 py-[6px] w-full mt-1" maxlength="200" />
      </div>
      <div class="py-1">
        <div>
          Giờ hoạt động
          <span class="text-red-500">*</span>
        </div>
        <InputText v-model="newAddress.openingHours" placeholder="Nhập giờ hoạt động"
          class="border border-gray-300 px-2 py-[6px] w-full mt-1" />
      </div>
      <div class="py-1">
        <div> Liên hệ
          <span class="text-red-500">*</span>
        </div>
        <InputText v-model="newAddress.phone" placeholder="Nhập số điện thoại"
          class="border border-gray-300 px-2 py-[6px] w-full mt-1" maxlength="13" />
      </div>
      <!-- <div class="py-1">
        <div>Link map</div>
        <InputText v-model="newAddress.map" placeholder="Nhập link maps"
          class="border border-gray-300 px-2 py-[6px] w-full mt-1" />
      </div> -->
      <div class="flex justify-center mt-4">
        <Button class="items-center flex gap-2 px-6 py-2 text-white bg-primary rounded-lg" @click="addAddress"><span
            v-if="state.isLoadingAdd" class="pi pi-spin pi-spinner" />Thêm</Button>
      </div>
    </div>
  </Dialog>
</template>
