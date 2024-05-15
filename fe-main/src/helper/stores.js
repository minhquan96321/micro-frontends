import { billStore } from "../stores/bill";
import { layoutStore } from "../stores/layout";
import { shopStore } from "../stores/shop";
import { transactionStore } from "../stores/transaction";
import { userStore } from "../stores/user";
import { helperStore } from "../stores/helper";

const setupStores = () => {
  if (window.$stores) {
    window.location.reload();
  }
  window.$stores = {
    user: userStore(),
    shop: shopStore(),
    layout: layoutStore(),
    transaction: transactionStore(),
    bill: billStore(),
    helper: helperStore(),
  };
};

setTimeout(setupStores);

export default {
  install: (app, options) => {
    app.config.globalProperties.$stores = window.$stores;
  }
};
