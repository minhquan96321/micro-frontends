import { shallowRef } from "vue";
import en from "/src/languages/en";
import vi from "/src/languages/vi";
import "./style.scss";
import Statistic from "@/views/statistic/Statistic.vue";

if (window.i18n) {
  window.i18n.setLocaleMessage("vi", vi);
  window.i18n.setLocaleMessage("en", en);
}

// Install routes
if (window.$router) {
  const addedRoute = window.$router.getRoutes();
  const routes = [];
  routes.forEach((r) => {
    const existed = addedRoute.find((r2) => r2.path === r.path);
    if (!existed) {
      window.$router.addRoute(r);
    }
  });
}

if (window.$stores) {
  window.$stores.layout.tab.push({
    label: window.remoteApp["statistic"].label || "Thống kê",
    icon: window.remoteApp["statistic"].icon || "pi pi-chart-line",
    position: window.remoteApp["statistic"].position,
    component: shallowRef(Statistic),
    role: ["owner", "manage", "staff"]
  });

}
