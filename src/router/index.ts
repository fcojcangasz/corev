// src/router/index.ts
import { createRouter, createWebHistory } from "vue-router";
import RegistroBitacora from "../components/RegistroBitacora.vue";
import LoginView from "../components/LoginView.vue";
import HistorialViajes from "../components/HistorialViajes.vue";
import { supabase } from "../lib/supabaseClient"; // 👈 Asegúrate de que esta ruta sea correcta

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
    meta: { requiereAuth: true }, // 👈 Solo usuarios logueados
  },
  {
    path: "/historial",
    name: "HistorialViajes",
    component: HistorialViajes,
    meta: { requiereAuth: true },
  },
  {
    path: "/mantenimientos",
    name: "Mantenimientos",
    component: () => import("../components/ControlMantenimientos.vue"),
    meta: { requiereAuth: true, requiereAdmin: true }, // 👈 ETIQUETAS DE PROTECCIÓN
  },
  {
    path: "/combustibles",
    name: "Combustibles",
    component: () => import("../components/ControlCombustibles.vue"),
    meta: { requiereAuth: true, requiereAdmin: true }, // 👈 ETIQUETAS DE PROTECCIÓN
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    // MODIFICACIÓN: Ahora apunta correctamente al nuevo archivo
    component: () => import("../components/Dashboard.vue"),
    meta: { requiereAuth: true, requiereAdmin: true }, // 👈 ETIQUETAS DE PROTECCIÓN
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// ==========================================
// EL GUARDIA DE NAVEGACIÓN (ROUTER GUARD)
// ==========================================
router.beforeEach(async (to, _from, next) => {
  // 1. Leemos las etiquetas de la ruta a la que el usuario quiere ir
  const requiereAuth = to.matched.some((record) => record.meta.requiereAuth);
  const requiereAdmin = to.matched.some((record) => record.meta.requiereAdmin);

  // 2. Obtenemos la sesión actual de Supabase
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Regla A: Si el usuario ya inició sesión y quiere ir al Login ("/"), lo mandamos a la app
  if (to.path === "/" && session) {
    return next("/bitacora");
  }

  // Regla B: Si la ruta requiere estar logueado y NO hay sesión, lo botamos al Login
  if (requiereAuth && !session) {
    return next("/");
  }

  // Regla C: Si la ruta exige ser ADMINISTRADOR
  if (requiereAdmin && session) {
    // Consultamos el rol a la base de datos
    const { data: perfil } = await supabase
      .from("perfiles")
      .select("rol")
      .eq("id", session.user.id)
      .single();

    // Validamos si tiene los superpoderes
    if (perfil && (perfil.rol === "admin" || perfil.rol === "administrador")) {
      next(); // Pasa, es el jefe.
    } else {
      next("/bitacora"); // ¡Rebotado! Es conductor, lo regresamos a su área operativa.
    }
  } else {
    // Si la ruta no exige ser admin (como la bitácora o historial), pasa normal
    next();
  }
});

export default router;
