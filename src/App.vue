<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { supabase } from "./lib/supabaseClient";

import PantallaCarga from "./components/PantallaCarga.vue";
import LogoCorev from "./components/LogoCorev.vue";

const route = useRoute();
const router = useRouter();

const isExpanded = ref(false);
const navegandoEntreModulos = ref(false);

// NUEVA VARIABLE PARA EL MENÚ MÓVIL
const menuMovilAbierto = ref(false);

const usuarioNombre = ref("Cargando...");
const usuarioRol = ref("");
const usuarioInicial = ref("");
const toastActivo = ref(false);

const actualizarDatosUsuario = async (user: any) => {
  try {
    const { data: perfil, error } = await supabase
      .from("perfiles")
      .select("nombre_completo, rol")
      .eq("id", user.id)
      .single();

    if (error) throw error;

    if (perfil) {
      usuarioNombre.value = perfil.nombre_completo;
      usuarioInicial.value = perfil.nombre_completo.charAt(0).toUpperCase();

      if (perfil.rol === "admin") {
        usuarioRol.value = "Administrador";
      } else if (perfil.rol) {
        usuarioRol.value =
          perfil.rol.charAt(0).toUpperCase() + perfil.rol.slice(1);
      } else {
        usuarioRol.value = "Usuario";
      }
    }
  } catch (error) {
    console.error("Error al obtener perfil global:", error);
    usuarioNombre.value = "Usuario Registrado";
    usuarioRol.value = "Conductor";
  }
};

const lanzarToast = () => {
  toastActivo.value = true;
  setTimeout(() => {
    toastActivo.value = false;
  }, 4500);
};

const cerrarSesion = async () => {
  try {
    await supabase.auth.signOut();
    router.push("/");
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
  }
};

onMounted(() => {
  supabase.auth.onAuthStateChange(async (event, session) => {
    if (event === "SIGNED_IN" && session?.user) {
      await actualizarDatosUsuario(session.user);
      lanzarToast();
    }
  });
});

router.beforeEach((to, from, next) => {
  if (to.path !== from.path) {
    navegandoEntreModulos.value = true;
  }
  next();
});

router.afterEach(() => {
  // Cuando el usuario cambia de ruta en móvil, cerramos el menú automáticamente
  menuMovilAbierto.value = false;

  setTimeout(() => {
    navegandoEntreModulos.value = false;
  }, 500);
});
</script>

<template>
  <div class="flex h-screen bg-slate-50 font-sans overflow-hidden relative">
    <!-- OVERLAY OSCURO PARA MÓVIL (Fondo semi-transparente al abrir el menú) -->
    <div
      v-if="menuMovilAbierto && route.path !== '/'"
      @click="menuMovilAbierto = false"
      class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 md:hidden transition-opacity"
    ></div>

    <!-- ========================================== -->
    <!-- BARRA LATERAL RESPONSIVA                   -->
    <!-- ========================================== -->
    <aside
      v-if="route.path !== '/'"
      @mouseenter="isExpanded = true"
      @mouseleave="isExpanded = false"
      :class="[
        isExpanded || menuMovilAbierto ? 'w-72' : 'w-20',
        menuMovilAbierto
          ? 'translate-x-0'
          : '-translate-x-full md:translate-x-0',
      ]"
      class="flex flex-col py-6 shadow-2xl z-50 transition-all duration-300 ease-in-out absolute md:relative h-full shrink-0 bg-[#042f2e] border-r border-[#042f2e]"
    >
      <!-- Fondo Abstracto (GPU Accelerated) -->
      <div class="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div
          class="absolute top-[-10%] left-[-10%] w-[120%] h-[40%] bg-[darkcyan]/60 rounded-full mix-blend-screen filter blur-[80px] animate-blob"
        ></div>
        <div
          class="absolute top-[40%] right-[-20%] w-[100%] h-[50%] bg-teal-400/20 rounded-full mix-blend-screen filter blur-[90px] animate-blob animation-delay-2000"
        ></div>
        <div
          class="absolute bottom-[-10%] left-[10%] w-[100%] h-[40%] bg-cyan-600/30 rounded-full mix-blend-screen filter blur-[80px] animate-blob animation-delay-4000"
        ></div>
      </div>

      <!-- Capa de cristal -->
      <div
        class="absolute inset-0 z-0 bg-[#042f2e]/40 backdrop-blur-2xl pointer-events-none"
      ></div>

      <!-- CONTENIDO DEL SIDEBAR -->
      <div class="relative z-10 flex flex-col h-full w-full">
        <!-- Logo y Título -->
        <div
          class="flex items-center justify-between px-5 mb-8 w-full overflow-hidden"
        >
          <div class="flex items-center">
            <LogoCorev
              size="md"
              :mostrarTexto="false"
              colorIcono="text-[#042f2e]"
              colorFondo="bg-white"
              class="shrink-0"
            />
            <span
              :class="
                isExpanded || menuMovilAbierto
                  ? 'opacity-100 ml-4'
                  : 'opacity-0 w-0'
              "
              class="font-bold text-white text-2xl tracking-tight transition-all duration-300 whitespace-nowrap"
            >
              COREV
            </span>
          </div>
          <!-- Botón de cerrar menú solo en móvil -->
          <button
            @click="menuMovilAbierto = false"
            class="md:hidden text-white/50 hover:text-white p-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <!-- Rutas de Navegación -->
        <nav
          class="flex flex-col gap-2 px-3 text-white/60 w-full overflow-y-auto hide-scrollbar"
        >
          <router-link
            to="/bitacora"
            class="flex items-center p-3 rounded-xl w-full hover:bg-white/10 hover:text-white transition-colors group cursor-pointer"
            active-class="text-teal-300 bg-white/10 shadow-inner"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              class="min-w-[24px] h-6 shrink-0"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184M7.5 14.25h2.25m-2.25-3h2.25m3 3h3m-3-3h3m-6-3h6"
              />
            </svg>
            <span
              :class="
                isExpanded || menuMovilAbierto
                  ? 'opacity-100 ml-4'
                  : 'opacity-0 w-0'
              "
              class="whitespace-nowrap font-medium transition-all duration-300 overflow-hidden"
              >Bitácora</span
            >
          </router-link>

          <router-link
            to="/historial"
            class="flex items-center p-3 rounded-xl w-full hover:bg-white/10 hover:text-white transition-colors group cursor-pointer"
            active-class="text-teal-300 bg-white/10 shadow-inner"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              class="min-w-[24px] h-6 shrink-0"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span
              :class="
                isExpanded || menuMovilAbierto
                  ? 'opacity-100 ml-4'
                  : 'opacity-0 w-0'
              "
              class="whitespace-nowrap font-medium transition-all duration-300 overflow-hidden"
              >Viajes</span
            >
          </router-link>

          <template v-if="usuarioRol === 'Administrador'">
            <router-link
              to="/combustibles"
              class="flex items-center p-3 rounded-xl w-full hover:bg-white/10 hover:text-white transition-colors group cursor-pointer admin-only"
              active-class="text-teal-300 bg-white/10 shadow-inner"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                class="min-w-[24px] h-6 shrink-0"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                />
              </svg>
              <span
                :class="
                  isExpanded || menuMovilAbierto
                    ? 'opacity-100 ml-4'
                    : 'opacity-0 w-0'
                "
                class="whitespace-nowrap font-medium transition-all duration-300 overflow-hidden"
                >Combustibles</span
              >
            </router-link>

            <router-link
              to="/mantenimientos"
              class="flex items-center p-3 rounded-xl w-full hover:bg-white/10 hover:text-white transition-colors group cursor-pointer admin-only"
              active-class="text-teal-300 bg-white/10 shadow-inner"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                class="min-w-[24px] h-6 shrink-0"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281zM12 15a3 3 0 100-6 3 3 0 000 6z"
                />
              </svg>
              <span
                :class="
                  isExpanded || menuMovilAbierto
                    ? 'opacity-100 ml-4'
                    : 'opacity-0 w-0'
                "
                class="whitespace-nowrap font-medium transition-all duration-300 overflow-hidden"
                >Mantenimientos</span
              >
            </router-link>

            <router-link
              to="/dashboard"
              class="flex items-center p-3 rounded-xl w-full hover:bg-white/10 hover:text-white transition-colors group cursor-pointer admin-only"
              active-class="text-teal-300 bg-white/10 shadow-inner"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                class="min-w-[24px] h-6 shrink-0"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
                />
              </svg>
              <span
                :class="
                  isExpanded || menuMovilAbierto
                    ? 'opacity-100 ml-4'
                    : 'opacity-0 w-0'
                "
                class="whitespace-nowrap font-medium transition-all duration-300 overflow-hidden"
                >Dashboard</span
              >
            </router-link>
          </template>
        </nav>

        <!-- PIE DEL SIDEBAR -->
        <div class="mt-auto pt-5 border-t border-white/10 px-4 w-full pb-2">
          <div class="flex items-center justify-between w-full">
            <div class="flex items-center gap-3 overflow-hidden w-full">
              <div
                class="min-w-[36px] h-9 bg-institucional-secundario text-white rounded-full flex items-center justify-center font-bold text-sm shadow-sm shrink-0"
              >
                {{ usuarioInicial }}
              </div>
              <div
                :class="
                  isExpanded || menuMovilAbierto
                    ? 'opacity-100 w-auto'
                    : 'opacity-0 w-0'
                "
                class="flex flex-col transition-all duration-300 whitespace-nowrap overflow-hidden"
              >
                <span
                  class="text-sm font-bold text-white truncate capitalize"
                  >{{ usuarioNombre }}</span
                >
                <span
                  class="text-[11px] font-semibold text-teal-300 uppercase tracking-wider truncate"
                  >{{ usuarioRol }}</span
                >
              </div>
            </div>
            <button
              v-show="isExpanded || menuMovilAbierto"
              @click="cerrarSesion"
              class="p-2 text-white/50 hover:text-white hover:bg-white/10 rounded-xl transition-all shrink-0 ml-2"
              title="Cerrar Sesión"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                class="w-5 h-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </aside>

    <!-- ÁREA PRINCIPAL DINÁMICA -->
    <div class="flex-1 flex flex-col h-screen relative w-full">
      <header
        v-if="route.path !== '/'"
        class="bg-white border-b border-slate-100 h-[72px] flex items-center px-4 sm:px-8 shadow-sm shrink-0 gap-3 z-10"
      >
        <!-- BOTÓN HAMBURGUESA (SÓLO MÓVIL) -->
        <button
          @click="menuMovilAbierto = true"
          class="md:hidden p-2 -ml-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>

        <h1 class="text-slate-800 font-bold text-lg tracking-tight truncate">
          Sistema Institucional COREV
        </h1>
      </header>

      <main
        class="flex-1 overflow-x-hidden overflow-y-auto bg-slate-50 relative"
      >
        <transition name="fade">
          <PantallaCarga v-if="navegandoEntreModulos" />
        </transition>
        <router-view />
      </main>
    </div>

    <!-- TOAST DE BIENVENIDA -->
    <Teleport to="body">
      <!-- Mantenemos el toast igual -->
    </Teleport>
  </div>
</template>

<style>
/* Los mismos estilos de antes se mantienen intactos */
</style>
