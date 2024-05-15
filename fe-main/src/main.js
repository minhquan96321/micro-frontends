import { createApp } from "vue";
import App from "./App.vue";
import router from "./helper/router";
import { usePrimeVue } from "./theme";
import { __federation_method_setRemote, __federation_method_getRemote } from "virtual:__federation__";

import { createPinia } from "pinia";
import api from "./helper/api";
import stores from "./helper/stores";
import config from "@/config";
import i18n from "./helper/i18n";

const pinia = createPinia();
window.app = createApp(App).use(router).use(pinia).use(stores).use(i18n).use(api);

usePrimeVue(window.app);

window.$api.call("ui/listing", { shopId: config.shopId, type: "info" }).then((res) => {
  const remoteApp = [
    {
      active: true,
      createdAt: "2024-05-05T10:19:34.899Z",
      shopId: "65f2ae3f51f9be3dd2a55bab",
      type: "tab",
      _id: "66375d363be9c940e03be9c1",
      position: 5,
      name: "info",
      url: "https://info-fe.pages.dev/assets/remoteEntry.js"
    },
    {
      active: true,
      createdAt: "2024-05-05T10:20:16.340Z",
      shopId: "65f2ae3f51f9be3dd2a55bab",
      type: "tab",
      _id: "66375d603be9c940e03be9c2",
      position: 7,
      name: "product",
      url: "https://product-eye.pages.dev/assets/remoteEntry.js"
    },
    {
      active: true,
      createdAt: "2024-05-05T10:19:34.899Z",
      shopId: "65f2ae3f51f9be3dd2a55bab",
      type: "tab",
      _id: "66375d663be9c940e03be9c3",
      position: 3,
      name: "affiliate",
      url: "https://affiliate-aft.pages.dev/assets/remoteEntry.js"
    },
    {
      active: true,
      createdAt: "2024-05-05T10:19:34.899Z",
      shopId: "65f2ae3f51f9be3dd2a55bab",
      type: "tab",
      _id: "66375d7e3be9c940e03be9c5",
      position: 5,
      name: "statistic",
      url: "https://statistic-630.pages.dev/assets/remoteEntry.js"
    },
    {
      active: true,
      createdAt: "2024-05-05T10:19:34.899Z",
      shopId: "65f2ae3f51f9be3dd2a55bab",
      type: "tab",
      _id: "663763096eedff40e01534e8",
      position: 5,
      name: "history",
      url: "https://history-9u0.pages.dev/assets/remoteEntry.js"
    },
  ]
  console.log('remoteApp :', remoteApp);

  window.remoteApp = remoteApp.reduce((prev, cur) => ((prev[cur.name] = cur), prev), {});
  for (const remote of remoteApp) __federation_method_setRemote(remote.name, { url: () => Promise.resolve(remote.url), format: "esm", from: "vite" });
  const preloads = remoteApp.map((remote) => __federation_method_getRemote(remote.name, `./setup`));
  console.log(preloads, "preloads");
  Promise.all(preloads).then(() => {
    window.app.mount("#app");
  });
});
