<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { supabase } from "./lib/supabaseClient";

const route = useRoute();
const router = useRouter();

// --- Estado de Interfaz ---
const isExpanded = ref(false);

// --- Estado de Usuario Activo ---
const usuarioNombre = ref("Cargando...");
const usuarioRol = ref("");
const usuarioInicial = ref("");

// --- Estado del Toast ---
const toastActivo = ref(false);

// Función para actualizar los datos desde la tabla 'perfiles' vía UUID
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

// Función para el Toast
const lanzarToast = () => {
  toastActivo.value = true;
  setTimeout(() => {
    toastActivo.value = false;
  }, 4500);
};

// Función para Cerrar Sesión Real en Supabase
const cerrarSesion = async () => {
  try {
    await supabase.auth.signOut();
    router.push("/");
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
  }
};

// Escuchador global de Autenticación
onMounted(() => {
  supabase.auth.onAuthStateChange(async (event, session) => {
    if (event === "SIGNED_IN" && session?.user) {
      await actualizarDatosUsuario(session.user);
      lanzarToast();
    }
  });
});
</script>

<template>
  <!-- font-sans aplicará tu fuente Inter configurada globalmente -->
  <div class="flex h-screen bg-slate-50 font-sans overflow-hidden">
    <!-- ========================================== -->
    <!-- BARRA LATERAL (SIDEBAR PREMIUM)            -->
    <!-- ========================================== -->
    <aside
      v-if="route.path !== '/'"
      @mouseenter="isExpanded = true"
      @mouseleave="isExpanded = false"
      :class="isExpanded ? 'w-72' : 'w-20'"
      class="bg-white border-r border-slate-100 flex flex-col py-6 shadow-sm z-40 transition-all duration-300 ease-in-out relative overflow-hidden shrink-0"
    >
      <!-- Logo y Título -->
      <div class="flex items-center px-5 mb-8 w-full">
        <div
          class="min-w-[40px] h-10 bg-institucional-primario rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-md shrink-0"
        >
          C
        </div>
        <span
          :class="isExpanded ? 'opacity-100 ml-4' : 'opacity-0 w-0'"
          class="font-bold text-slate-800 text-2xl tracking-tight transition-all duration-300 whitespace-nowrap"
        >
          COREV
        </span>
      </div>

      <!-- Rutas de Navegación -->
      <nav
        class="flex flex-col gap-2 px-3 text-slate-400 w-full overflow-y-auto hide-scrollbar"
      >
        <!-- 1. Bitácora -->
        <router-link
          to="/bitacora"
          class="flex items-center p-3 rounded-xl w-full hover:bg-slate-50 hover:text-institucional-secundario transition-colors group cursor-pointer"
          active-class="text-institucional-secundario bg-institucional-secundario/10"
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
            :class="isExpanded ? 'opacity-100 ml-4' : 'opacity-0 w-0'"
            class="whitespace-nowrap font-medium transition-all duration-300 pointer-events-none"
            >Bitácora Diaria</span
          >
        </router-link>

        <!-- 2. Historial de Viajes -->
        <router-link
          to="/historial"
          class="flex items-center p-3 rounded-xl w-full hover:bg-slate-50 hover:text-institucional-secundario transition-colors group cursor-pointer"
          active-class="text-institucional-secundario bg-institucional-secundario/10"
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
            :class="isExpanded ? 'opacity-100 ml-4' : 'opacity-0 w-0'"
            class="whitespace-nowrap font-medium transition-all duration-300 pointer-events-none"
            >Historial de Viajes</span
          >
        </router-link>

        <!-- 3. Control de Combustibles -->
        <router-link
          to="/combustibles"
          class="flex items-center p-3 rounded-xl w-full hover:bg-slate-50 hover:text-institucional-secundario transition-colors group cursor-pointer"
          active-class="text-institucional-secundario bg-institucional-secundario/10"
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
            :class="isExpanded ? 'opacity-100 ml-4' : 'opacity-0 w-0'"
            class="whitespace-nowrap font-medium transition-all duration-300 pointer-events-none"
            >Combustibles</span
          >
        </router-link>

        <!-- 4. Control de Mantenimientos -->
        <router-link
          to="/mantenimientos"
          class="flex items-center p-3 rounded-xl w-full hover:bg-slate-50 hover:text-institucional-secundario transition-colors group cursor-pointer"
          active-class="text-institucional-secundario bg-institucional-secundario/10"
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
            :class="isExpanded ? 'opacity-100 ml-4' : 'opacity-0 w-0'"
            class="whitespace-nowrap font-medium transition-all duration-300 pointer-events-none"
            >Control de Mantenimientos</span
          >
        </router-link>

        <!-- 5. Dashboard -->
        <router-link
          to="/dashboard"
          class="flex items-center p-3 rounded-xl w-full hover:bg-slate-50 hover:text-institucional-secundario transition-colors group cursor-pointer"
          active-class="text-institucional-secundario bg-institucional-secundario/10"
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
            :class="isExpanded ? 'opacity-100 ml-4' : 'opacity-0 w-0'"
            class="whitespace-nowrap font-medium transition-all duration-300 pointer-events-none"
            >Dashboard</span
          >
        </router-link>
      </nav>

      <!-- ========================================== -->
      <!-- PIE DEL SIDEBAR: PERFIL Y LOGOUT           -->
      <!-- ========================================== -->
      <div class="mt-auto pt-5 border-t border-slate-100 px-4 w-full pb-2">
        <div class="flex items-center justify-between w-full">
          <div class="flex items-center gap-3 overflow-hidden w-full">
            <div
              class="min-w-[36px] h-9 bg-institucional-secundario text-white rounded-full flex items-center justify-center font-bold text-sm shadow-sm shrink-0"
            >
              {{ usuarioInicial }}
            </div>
            <div
              :class="isExpanded ? 'opacity-100' : 'opacity-0 w-0'"
              class="flex flex-col transition-all duration-300 whitespace-nowrap overflow-hidden"
            >
              <span
                class="text-sm font-bold text-slate-700 truncate capitalize"
                >{{ usuarioNombre }}</span
              >
              <span
                class="text-[11px] font-semibold text-slate-400 uppercase tracking-wider truncate"
                >{{ usuarioRol }}</span
              >
            </div>
          </div>

          <button
            v-show="isExpanded"
            @click="cerrarSesion"
            class="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all shrink-0 ml-2"
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
    </aside>

    <!-- ========================================== -->
    <!-- ÁREA PRINCIPAL DINÁMICA                    -->
    <!-- ========================================== -->
    <div class="flex-1 flex flex-col h-screen relative">
      <header
        v-if="route.path !== '/'"
        class="bg-white border-b border-slate-100 h-[72px] flex items-center px-8 shadow-sm shrink-0"
      >
        <h1 class="text-slate-800 font-bold text-lg tracking-tight">
          Sistema Institucional COREV
        </h1>
      </header>

      <main
        class="flex-1 overflow-x-hidden overflow-y-auto bg-slate-50 relative"
      >
        <router-view />
      </main>
    </div>

    <!-- ========================================== -->
    <!-- TOAST DE BIENVENIDA                        -->
    <!-- ========================================== -->
    <Teleport to="body">
      <Transition name="toast-slide">
        <div
          v-if="toastActivo"
          class="fixed top-6 right-6 z-[100] flex items-center gap-4 bg-[#0f172a] border border-slate-700/50 text-white pl-4 pr-6 py-3.5 rounded-2xl shadow-2xl shadow-slate-900/20"
        >
          <div
            class="w-10 h-10 bg-institucional-secundario rounded-full flex items-center justify-center shrink-0 shadow-inner"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              class="w-5 h-5 text-white"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div class="flex flex-col">
            <span
              class="text-[11px] font-bold uppercase tracking-wider text-institucional-secundario"
              >{{ usuarioRol }}</span
            >
            <span class="text-sm font-medium text-slate-100"
              >Sesión iniciada, {{ usuarioNombre }}.</span
            >
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style>
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.toast-slide-enter-active,
.toast-slide-leave-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}
.toast-slide-enter-from,
.toast-slide-leave-to {
  opacity: 0;
  transform: translateX(50px) scale(0.95);
}
</style>
