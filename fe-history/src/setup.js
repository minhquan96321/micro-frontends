import { shallowRef } from "vue";
import en from "/src/languages/en";
import vi from "/src/languages/vi";
import "./style.scss";
import History from "./views/history/History.vue"

if (window.i18n) {
  window.i18n.setLocaleMessage("vi", vi);
  window.i18n.setLocaleMessage("en", en);
}

// Install routes
if (window.$router) {
  const addedRoute = window.$router.getRoutes();
  const routes = [
  ];
  routes.forEach((r) => {
    const existed = addedRoute.find((r2) => r2.path === r.path);
    if (!existed) {
      window.$router.addRoute(r);
    }
  });
}

if (window.$stores) {
  window.$stores.layout.tab.push({
    label: window.remoteApp["history"].label || "Lịch sử",
    icon: window.remoteApp["history"].icon || "pi pi-history",
    position: window.remoteApp["history"].position,
    component: shallowRef(History),
    role: [ "user"]
  });
}
