<script setup>
import { ref } from "vue";
// import { getPhoneNumber, getAccessToken, authorize } from "zmp-sdk/apis";

const loading = ref(false);

const requestPhone = () => {
  if (loading.value) return;
  loading.value = true;
  // getPhoneNumber({
  //   success: async ({ token }) => {
  //     decodeToken(token);
  //   },
  //   fail: (error) => {
  //     loading.value = false;
  //     window.$toast.add({ severity: "error", summary: JSON.stringify(error), life: 3000 });
  //     console.log(error);
  //   }
  // });
};

// const decodeToken = async (token) => {
//   const userAccessToken = await getAccessToken({});
//   const response = await window.$api
//     .call("user.decodeZaloPhone", { token, userAccessToken })
//     .catch((e) => {
//       window.$toast.add({ severity: "error", summary: JSON.stringify(e), life: 3000 });
//     })
//     .finally(() => {
//       loading.value = false;
//     });
//   if (response.status) {
//     window.$stores.user.phone = response.phone;
//     window.$router.push("/dashboard");
//     window.$toast.add({ severity: "success", summary: "Thêm số điện thoại thành công!", life: 3000 });
//   } else window.$toast.add({ severity: "error", summary: JSON.stringify(response), life: 3000 });
// };

const reject = () => {
  // window.$stores.user.requestPhoneReject = true;
  window.$router.push("/dashboard");
};
</script>
<template>
  <!-- <div class="pt-notch">
    <div class="flex justify-center my-10">
      <span class="pi pi-phone text-primary" style="font-size: 100px"></span>
    </div>
    <div class="flex flex-col items-center px-4">
      <div class="text-3xl text-center mb-10">Chào mừng bạn đến với với chúng tôi!</div>
      <div class="flex items-center gap-4 mb-4 w-full px-4">
        <span class="pi pi-qrcode text-primary" style="font-size: 30px"></span>
        <div>Tạo mã QR giới thiệu bạn bè từ số điện thoại của bạn</div>
      </div>
      <div class="flex items-center gap-4 mb-4 justify-start w-full px-4">
        <span class="pi pi-phone" style="font-size: 30px; color: green"></span>
        <div>Hiển thị tên và ảnh đại diện của bạn</div>
      </div>
      <div class="mt-4">
        Để chia sẻ mã giới thiệu cho bạn bè, chúng tôi cần biết thông tin về số điện thoại của bạn. Bạn vui lòng đồng ý chia sẻ số điện thoại để chúng tôi có
        thể tạo mã giới thiệu dành cho bạn!
      </div>
      <div
        class="mt-10 rounded-3xl py-2 px-8 text-base font-semibold bg-primary text-white flex items-center gap-4"
        :class="loading && 'opacity-50'"
        @click="requestPhone"
      >
        <span v-if="loading" class="pi pi-spin pi-spinner" />Liên kết số điện thoại
      </div>
      <div class="mt-8 text-red-500" @click="reject">Từ chối</div>
    </div>
  </div> -->
  <div>hello</div>
</template>
