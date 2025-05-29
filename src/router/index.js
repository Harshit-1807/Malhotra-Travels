import { createRouter, createWebHistory } from "vue-router";
import AdminLogin from "../views/AdminLogin.vue";
import AdminDashboard from "../views/AdminDashboard.vue";
import PrivacyPolicy from "../views/PrivacyPolicy.vue"; 
import TermsAndConditions from "../views/TermsAndConditions.vue"; 
import Home from "../views/Home.vue";
import AdminBooking from "../views/AdminBooking.vue";
import AdminCarOwner from "../views/AdminCarOwner.vue";
import AdminAffiliate from "../views/AdminAffiliate.vue";

const routes = [
  { 
    path: "/", 
    component: Home,
    meta: { showHeaderFooter: true } 
  },
  { 
    path: "/admin-login", 
    component: AdminLogin,
    meta: { requiresAdmin: false } 
  },
  { 
    path: "/privacy-policy", 
    component: PrivacyPolicy,
    meta: { showHeaderFooter: false } 
  },
  { 
    path: "/terms-and-conditions", 
    component: TermsAndConditions,
    meta: { showHeaderFooter: false } 
  },
  {
    path: "/admin-dashboard",
    component: AdminDashboard,
    meta: { requiresAdmin: true },
  },
  {
    path: "/admin-bookings",
    component: AdminBooking,
    meta: { requiresAdmin: true },
  },
  {
    path: "/admin-carOwner",
    component: AdminCarOwner,
    meta: { requiresAdmin: true },
  },
  {
    path: "/admin-affiliate",
    component: AdminAffiliate,
    meta: { requiresAdmin: true },
  },
  { path: "/:pathMatch(.*)*", redirect: "/" },
];

// ...existing router configuration...

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  if (to.path === "/admin-login" && isAdmin) {
    next("/admin-dashboard");
  } else if (to.meta.requiresAdmin && !isAdmin) {
    next("/admin-login");
  } else {
    next();
  }
});

export default router;
