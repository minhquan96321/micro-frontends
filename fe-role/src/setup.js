import { shallowRef } from "vue";
import en from "/src/languages/en";
import vi from "/src/languages/vi";
import "./style.scss";
import Role from "./views/role/Role.vue";

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
    label: window.remoteApp["role"].label || "Phân quyền",
    icon: window.remoteApp["role"].icon ||"pi pi-users",
    position: window.remoteApp["role"].position,
    component: shallowRef(Role),
    role: ["owner"]
  });

}
