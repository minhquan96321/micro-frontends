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
  const remoteApp = res.rows;
  console.log('remoteApp :', remoteApp);

  window.remoteApp = remoteApp.reduce((prev, cur) => ((prev[cur.name] = cur), prev), {});
  for (const remote of remoteApp) __federation_method_setRemote(remote.name, { url: () => Promise.resolve(remote.url), format: "esm", from: "vite" });
  const preloads = remoteApp.map((remote) => __federation_method_getRemote(remote.name, `./setup`));
  console.log(preloads, "preloads");
  Promise.all(preloads).then(() => {
    window.app.mount("#app");
  });
});
