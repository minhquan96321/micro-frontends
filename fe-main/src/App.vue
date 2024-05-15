<script setup>
import { onMounted, ref, watch, reactive, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { getUserInfo, getPhoneNumber, getAccessToken, getSetting } from "zmp-sdk/apis";
import { useToast } from "primevue/usetoast";
import "primevue/resources/themes/aura-light-green/theme.css";

import Permission from "@/components/SetupPermission.vue";
import Loading from "@/views/loading/Loading.vue";
import "@/style.scss";
import config from "@/config";
import { useI18n } from "vue-i18n-lite";


const { t } = useI18n();
const toast = useToast();
const stepSetup = computed(() => window.$stores.layout.stepSetup);
window.$route = useRoute();

const getShopAndCheckPermission = async () => {
  if (window.chrome) return setupUserZalo();
  const data = await getSetting({}).catch((e) => console.error(e, "get setting"));
  const { authSetting } = data;
  // const permission = authSetting["scope.userInfo"] && authSetting["scope.userPhonenumber"];
  const permission = authSetting["scope.userInfo"];
  if (permission) setupUserZalo();
  else {
    await window.$stores.shop.firstly();
    setColor();
    window.$stores.layout.stepSetup = 2;
  }
};

const setColor = () => {
  document.documentElement.style.setProperty("--primary", window.$stores.shop.primaryColor);
  document.documentElement.style.setProperty("--secondary", window.$stores.shop.secondaryColor);
};

const setupUserZalo = async (setupFromPermission) => {
  if (setupFromPermission) window.$stores.layout.stepSetup = 1;
  let userZalo;
  if (window.chrome) {
    console.log("from window.chrome");
    userZalo = { id: "5540369410881283712" };
    // userZalo = { id: "7432321163900839341" }; // "nguyen owner";
  } else {
    userZalo = await getUserInfo({})
      .then((info) => {
        console.log("info zalo:", info);
        return info.userInfo;
      })
      .catch((e) => {
        console.error(e);
        window.$toast.add({ severity: "error", summary: JSON.stringify(e), life: 3000 });
      });
  }
  console.log(userZalo, "userZalo");
  const user = await window.$api.currentUser(userZalo);
  console.log("user server db:", user);
  window.$stores.user.update(user);
  await window.$stores.shop.info();
  setColor();

  // if (!user.phone) {
  //   await getPhoneNumber({
  //     success: async ({ token }) => {
  //       await decodeToken(token);
  //     },
  //     fail: (error) => {
  //       window.$toast.add({ severity: "error", summary: JSON.stringify(error), life: 3000 });
  //       console.log(error);
  //     }
  //   });
  // } else {
  window.$stores.layout.stepSetup = 3;
  window.$router.push("/dashboard");
  window.$route.path === "/" && window.$router.push("/dashboard");
  // }
};

const decodeToken = async (token) => {
  const userAccessToken = await getAccessToken({});
  const response = await window.$api.call("user.decodeZaloPhone", { token, userAccessToken }).catch((e) => {
    window.$toast.add({ severity: "error", summary: JSON.stringify(e), life: 3000 });
  });
  if (response.status) {
    window.$toast.add({ severity: "success", summary: "Thêm số điện thoại thành công!", life: 3000 });
    window.location.reload();
  } else {
    window.$toast.add({ severity: "error", summary: JSON.stringify(response), life: 3000 });
  }
};

onMounted(() => {
  window.$toast = toast;
  window.$t = t;
  window.$toastError = (summary) => window.$toast.add({ severity: "error", summary, life: 3000 });
  window.$toastSuccess = (summary) => window.$toast.add({ severity: "success", summary, life: 3000 });
  getShopAndCheckPermission();
});

watch(stepSetup, () => {
  if(stepSetup.value === 1) {
    getShopAndCheckPermission();
  }
});
</script>

<template>
  <Loading v-if="stepSetup === 1" />
  <Permission v-if="stepSetup === 2" :requestPermission="(success) => success && setupUserZalo(true)" />
  <router-view v-else-if="stepSetup === 3" />
  <div class="pb-[120px]" />
  <Toast />
</template>
