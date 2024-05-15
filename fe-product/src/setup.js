import { shallowRef } from "vue";
import en from "/src/languages/en";
import vi from "/src/languages/vi";
import Product from "@/views/product/Product.vue";
import { productStore } from "./stores/product";
import "./style.scss";

if (window.i18n) {
  window.i18n.setLocaleMessage("vi", vi);
  window.i18n.setLocaleMessage("en", en);
}

// Install routes
if (window.$router) {
  const addedRoute = window.$router.getRoutes();
  const routes = [
    {
      path: "/dashboard/product/edit",
      component: () => import("@/views/product/pageEdit/EditProduct.vue")
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
    label: window.remoteApp["product"].label || "Sản phẩm",
    icon: window.remoteApp["product"].icon || "pi pi-inbox",
    position: window.remoteApp["product"].position,
    component: shallowRef(Product),
    role: ["owner", "manage", "staff", "user"]
  });
  window.$stores.product = productStore();
}
