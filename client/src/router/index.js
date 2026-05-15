import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },

  {
    path: "",
    name: "toobar",
    component: () => import("../components/Toolbar.vue"),
    children: [
      {
        path: "/logintest",
        name: "logintest",
        component: () => import("../views/LoginTest.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/profile",
    name: "profile",
    component: () => import("../views/Profile.vue"),
  },
  {
    path: "/grade",
    name: "grade",
    component: () => import("../views/GradeCalculate.vue"),
  },
  {
    path: "/products",
    name: "products",
    component: () => import("../views/ProductList.vue"),
  },
  {
    path: "/cart",
    name: "cart",
    component: () => import("../views/Cart.vue"),
  },
  {
    path: "/admin/products",
    name: "admin-products",
    component: () => import("../views/ProductManager.vue"),
  },
  {
    path: "/admin/orders",
    name: "admin-orders",
    component: () => import("../views/OrderManager.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
