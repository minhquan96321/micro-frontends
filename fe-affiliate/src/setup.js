import { shallowRef } from "vue";
import en from "/src/languages/en";
import vi from "/src/languages/vi";
import "./style.scss";
import { discountStore } from "./stores/discount";
import Affiliate from "./views/affiliate/Affiliate.vue";

if (window.$i18n) {
  console.log(window.$i18n, "window.i18n");
  window.$i18n.setLocaleMessage("vi", vi);
  window.$i18n.setLocaleMessage("en", en);
}

// Install routes
if (window.$router) {
  const addedRoute = window.$router.getRoutes();
  const routes = [
    {
      path: "/dashboard/affiliate/edit",
      component: () => import("@/views/affiliate/pageEdit/EditAffiliate.vue")
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
    label: "affiliate.label" || window.remoteApp["affiliate"].label || "Ưu đãi",
    icon: window.remoteApp["affiliate"].icon || "pi pi-list",
    position: window.remoteApp["affiliate"].position,
    component: shallowRef(Affiliate),
    role: ["owner", "manage", "staff", "user"]
  });

  window.$stores.discount = discountStore();
}
