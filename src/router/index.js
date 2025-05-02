import { createRouter, createWebHistory } from "vue-router";
import AdminLogin from "../views/AdminLogin.vue";
import AdminDashboard from "../views/AdminDashboard.vue";
import Home from "../views/Home.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/admin-login", component: AdminLogin },
  {
    path: "/admin-dashboard",
    component: AdminDashboard,
    meta: { requiresAdmin: true },
  },
  { path: "/:pathMatch(.*)*", redirect: "/" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation Guard
router.beforeEach((to, from, next) => {
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  if (to.meta.requiresAdmin && !isAdmin) {
    next("/admin-login");
  } else {
    next();
  }
});

export default router;
