import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../stores/auth";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import BooksView from "../views/BooksView.vue";
import AuthorsView from "../views/AuthorsView.vue";
import PersonalView from "../views/PersonalView.vue";
import ReadersView from "../views/ReadersView.vue";
import LibrariansView from "../views/LibrariansView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      beforeEnter: (to, from) => {
        if (!useAuthStore().auth) {
          router.push("/login");
          return false;
        }
      },
    },
    {
      path: "/personal",
      name: "personal",
      component: PersonalView,
      beforeEnter: (to, from) => {
        if (!useAuthStore().auth) {
          router.push("/login");
          return false;
        }
      },
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
      beforeEnter: (to, from) => {
        if (useAuthStore().auth) {
          return false;
        }
      },
    },
    {
      path: "/register",
      name: "register",
      component: RegisterView,
      beforeEnter: (to, from) => {
        if (useAuthStore().auth) {
          return false;
        }
      },
    },
    {
      path: "/books",
      name: "books",
      component: BooksView,
      beforeEnter: (to, from) => {
        if (!useAuthStore().auth) {
          router.push("/login");
          return false;
        }
      },
    },
    {
      path: "/authors",
      name: "authors",
      component: AuthorsView,
      beforeEnter: (to, from) => {
        if (!useAuthStore().auth) {
          router.push("/login");
          return false;
        }
      },
    },
    {
      path: "/readers",
      name: "readers",
      component: ReadersView,
      beforeEnter: (to, from) => {
        if (!useAuthStore().auth) {
          router.push("/login");
          return false;
        }
      },
    },
    {
      path: "/librarians",
      name: "librarians",
      component: LibrariansView,
      beforeEnter: (to, from) => {
        if (!useAuthStore().auth) {
          router.push("/login");
          return false;
        }
      },
    },
  ],
});

export default router;
