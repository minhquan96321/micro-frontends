import { shallowRef } from "vue";
import en from "/src/languages/en";
import vi from "/src/languages/vi";
import Info from "@/views/info/Info.vue";
import "./style.scss";

if (window.$i18n) {
  window.$i18n.setLocaleMessage("vi", vi);
  window.$i18n.setLocaleMessage("en", en);

  // setTimeout(() => {
    // window.$i18n.changeLocale("en");
  // }, 5000);

}

// Install routes
if (window.$router) {
  const addedRoute = window.$router.getRoutes();
  const routes = [
    {
      path: "/dashboard/info/edit",
      component: () => import("@/views/info/pageEdit/EditInfo.vue")
    }
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
    label: "info.label" || window.remoteApp["info"].label || "Giới thiệu",
    icon: window.remoteApp["info"].icon || "pi pi-home",
    position: window.remoteApp["info"].position,
    component: Info,
    role: ["owner", "manage", "staff", "user"]
  });
}
