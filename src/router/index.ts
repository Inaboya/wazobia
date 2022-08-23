import { createWebHistory, createRouter } from "vue-router";
import RegisterComponent from "../components/RegisterComponent.vue";
import LoginComponent from "../components/LoginComponent.vue";
import DashBoard from "../components/DashBoard.vue";
const routes = [
  {
    path: "/",
    name: "RegisterComponent",
    component: RegisterComponent,
  },
  {
    path: "/login",
    name: "LoginComponent",
    component: LoginComponent,
  },
  {
    path: "/dashboard",
    name: "DashBoard",
    component: DashBoard,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
