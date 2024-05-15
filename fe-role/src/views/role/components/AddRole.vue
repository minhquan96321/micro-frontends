<script setup>
import { ref, reactive } from "vue";
import { formatPhoneRead, formatPhoneWrite } from "@/helper/hook";

const props = defineProps(["closeModal", "role"]);
const stateAdd = reactive({ phone: undefined, role: props.role });

const state = reactive({ isLoadingAdd: false });

// const categories = [
//   { name: "Nhân viên", role: "staff" },
//   { name: "Quản lý", role: "manage" }
// ];

const submit = () => {
  if (!stateAdd.phone || !stateAdd.role) return window.$toastError(" Số điện thoại không được để trống!");
  state.isLoadingAdd = true;
  stateAdd.phone = formatPhoneWrite(stateAdd.phone);
  window.$api
    .call("shop/addRole", stateAdd)
    .then(async (res) => {
      if (res.success) {
        window.$toastSuccess("Thành công");
        await window.$stores.shop.info();
        props.closeModal();
      } else window.$toastError(JSON.stringify(res));
    })
    .catch((e) => {
      window.$toastError(e?.message);
    })
    .finally(() => (state.isLoadingAdd = false));
};
</script>

<template>
  <div class="modal-add-role">
    <div>
      <div>Số điện thoại</div>
      <InputText v-model="stateAdd.phone" class="border border-gray-300 px-2 py-[6px] w-full mt-1" />
    </div>
    <!-- <div class="mt-4">
      <div>Quyền</div>
      <div class="card flex justify-content-center mt-1">
        <div class="flex justify-between w-full gap-3">
          <div v-for="category in categories" :key="category.role" class="flex align-items-center">
            <RadioButton v-model="stateAdd.role" :inputId="category.role" name="dynamic" :value="category.role" />
            <label :for="category.role" class="ml-2">{{ category.name }}</label>
          </div>
        </div>
      </div>
    </div> -->
    <div class="flex justify-center mt-4">
      <Button :disabled="state.isLoadingAdd" class="items-center flex gap-2 text-white bg-primary py-2 px-5"
        @click="submit"><span v-if="state.isLoadingAdd" class="pi pi-spin pi-spinner" />Thêm</Button>
    </div>
  </div>
</template>
<style lang="scss">
.modal-add-role {
  .p-radiobutton {
    background: grey;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 100%;

    input {
      width: 16px;
      height: 16px;
    }

    .p-radiobutton-box {
      height: 16px;
      width: 16px;
    }

    .p-radiobutton-icon {
      background-color: #c73301;
    }
  }
}
</style>
