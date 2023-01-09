import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/home-view.vue";
import { useAuthStore } from "@/stores/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: () => import("@/components/layout/main/main-layout.vue"),
      children: [
        {
          path: "/",
          name: "home",
          component: HomeView,
        },
        {
          path: "/users",
          component: () => import("../views/users-list-view.vue"),
        },
        {
          path: "/q/:id",
          name: "question",
          component: () => import("../views/question-view.vue"),
        },
        {
          path: "/about",
          name: "about",
          component: () => import("../views/about-view.vue"),
        },
        {
          path: "/login",
          name: "login",
          component: () => import("../views/login-view.vue"),
          meta: {
            guest: true,
          },
        },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (to.matched.some((route) => route.meta.guest)) {
    if (authStore.isLoggedIn) {
      return next({ name: "home" });
    } else {
      return next();
    }
  }
  next();
});

export default router;
