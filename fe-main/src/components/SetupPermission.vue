<script setup>
import { onMounted, ref } from "vue";
import { getPhoneNumber, getAccessToken, authorize } from "zmp-sdk/apis";

const props = defineProps(["requestPermission"]);

const getPermission = async () => {
  try {
    const data = await authorize({
      // scopes: ["scope.userPhonenumber", "scope.userInfo"]
      scopes: ["scope.userInfo"]
    });
    // if (data["scope.userInfo"] && data["scope.userPhonenumber"]) {
    if (data["scope.userInfo"]) {
      props.requestPermission(true);
    } else {
      window.$toast.add({ severity: "error", summary: "Không thể vào app nếu bạn không đồng ý", life: 3000 });
      props.requestPermission(false);
    }
  } catch (error) {
    console.log(error);
    window.$toast.add({ severity: "error", summary: "Không thể vào app nếu bạn không đồng ý", life: 3000 });
  }
};

const request = () => {
  getPermission();
};

const reject = () => {
  window.$toast.add({ severity: "error", summary: "Không thể vào app nếu bạn không đồng ý", life: 3000 });
};

const { name } = window.$stores.shop;
</script>
<template>
  <div class="pt-notch relative z-10">
    <div class="flex justify-center my-14 gap-10">
      <!-- <span class="pi pi-phone text-primary text-[100px]"></span> -->
      <!-- <span class="pi pi-id-card  text-primary text-[100px]"></span> -->
    </div>
    <div class="flex flex-col items-center px-4">
      <div class="text-3xl text-center mb-10">Chào mừng bạn đến với {{ name }}</div>
      <div class="mb-8">Cho phép {{ name }} sử dụng thông tin sau để định danh và liên kết tài khoản.</div>
      <!-- <div class="flex items-center gap-4 mb-4 w-full px-4">
        <span class="pi pi-phone text-primary text-[20px]"></span>
        <div>Tạo mã QR giới thiệu bạn bè từ số điện thoại của bạn</div>
      </div> -->
      <div class="flex items-center gap-4 mb-4 justify-start w-full px-4">
        <span class="pi pi-id-card text-primary text-[20px]"></span>
        <div>Hiển thị tên và ảnh đại diện của bạn</div>
      </div>
      <div
        class="mt-10 rounded-3xl py-2 px-8 text-base font-semibold bg-primary text-white flex items-center gap-4"
        :class="loading && 'opacity-50'"
        @click="request"
      >
        Cho phép
      </div>
      <!-- <div class="mt-8 text-red-500" @click="reject">Từ chối và thoát</div> -->
    </div>
  </div>
</template>
