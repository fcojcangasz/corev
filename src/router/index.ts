// src/router/index.ts
import { createRouter, createWebHistory } from "vue-router";
import RegistroBitacora from "../components/RegistroBitacora.vue";
import LoginView from "../components/LoginView.vue";
import HistorialViajes from "../components/HistorialViajes.vue";

const routes = [
  {
    path: "/",
    name: "Login",
    component: LoginView,
  },
  {
    path: "/bitacora",
    name: "Bitacora",
    component: RegistroBitacora,
  },
  {
    path: "/historial",
    name: "HistorialViajes",
    component: HistorialViajes,
  },
  {
    path: "/mantenimientos",
    name: "Mantenimientos",
    component: () => import("../components/ControlMantenimientos.vue"),
  },
  {
    path: "/combustibles",
    name: "Combustibles",
    component: () => import("../components/ControlCombustibles.vue"),
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    // MODIFICACIÓN: Ahora apunta correctamente al nuevo archivo
    component: () => import("../components/Dashboard.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
