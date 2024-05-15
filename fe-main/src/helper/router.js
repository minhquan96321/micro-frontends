import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    // {
    //   path: "/",
    //   component: () => import("@/views/loading/Loading.vue")
    // },
    {
      path: "/dashboard",
      component: () => import("@/views/dashboard/Dashboard.vue")
    },
    {
      path: "/dashboard/wallet",
      component: () => import("@/views/dashboard/pageWallet/Wallet.vue")
    },
    {
      path: "/dashboard/topup",
      component: () => import("@/views/dashboard/pageTopUp/TopUp.vue")
    },
    {
      path: "/dashboard/withdraw",
      component: () => import("@/views/dashboard/pageWithdraw/Withdraw.vue")
    },
    {
      path: "/bill",
      component: () => import("@/views/bill/Bill.vue")
    },
    {
      path: "/bill/detail-profile/:id",
      component: () => import("@/views/bill/detail/DetailProfile.vue")
    },
    {
      path: "/bill/detail-shop/:id",
      component: () => import("@/views/bill/detail/DetailShop.vue")
    },
    {
      path: "/profile",
      component: () => import("@/views/profile/Profile.vue")
    },
    {
      path: "/profile/preview",
      component: () => import("@/views/profile/preview/Preview.vue")
    },
    {
      path: "/profile/withdraw",
      component: () => import("@/views/profile/withdraw/WithDraw.vue")
    },
    {
      path: "/profile/wallet",
      component: () => import("@/views/profile/wallet/Wallet.vue")
    },
    {
      path: "/profile/info",
      component: () => import("@/views/profile/info/Info.vue")
    },
    {
      path: "/referral-code",
      component: () => import("@/views/referral-code/ReferralCode.vue")
    },
    {
      path: "/permission/phone",
      component: () => import("@/views/permission/phone/RequestPhoneNumber.vue")
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (document.documentElement.scrollTop) window.scrollTo(0, 0);
  next();
});
window.$router = router;
export default router;
