<template>
  <div class="min-h-screen flex font-sans bg-slate-50 overflow-hidden">
    <!-- ========================================== -->
    <!-- PANEL IZQUIERDO: MESH GRADIENT DARKCYAN    -->
    <!-- ========================================== -->
    <div
      class="hidden lg:flex lg:w-5/12 relative overflow-hidden bg-[#042f2e] flex-col justify-center items-center p-12"
    >
      <!-- Fondo Abstracto Animado (Mesh Gradient en tonos DarkCyan) -->
      <div class="absolute inset-0 z-0 overflow-hidden">
        <!-- Esfera principal DarkCyan -->
        <div
          class="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-[darkcyan]/60 rounded-full mix-blend-screen filter blur-[100px] animate-blob"
        ></div>
        <!-- Esfera secundaria (iluminación teal sutil) -->
        <div
          class="absolute top-[20%] right-[-20%] w-[80%] h-[80%] bg-teal-400/30 rounded-full mix-blend-screen filter blur-[120px] animate-blob animation-delay-2000"
        ></div>
        <!-- Esfera terciaria (profundidad cyan) -->
        <div
          class="absolute bottom-[-20%] left-[10%] w-[60%] h-[60%] bg-cyan-600/40 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-4000"
        ></div>
      </div>

      <!-- Tarjeta de Cristal (Glassmorphism) -->
      <div
        class="relative z-10 bg-white/10 backdrop-blur-2xl border border-white/20 p-12 rounded-[2rem] shadow-2xl w-full max-w-md transform transition-transform hover:scale-[1.02] duration-500"
      >
        <!-- Logo Institucional en la Tarjeta -->
        <!-- Envolvemos el LogoCorev en el mismo cuadro blanco redondeado para mantener el contraste y diseño -->
        <LogoCorev
          size="lg"
          :mostrarTexto="false"
          class="bg-white rounded-2xl p-2.5 shadow-lg mb-8 w-fit inline-flex"
        />

        <h1 class="text-4xl font-black text-white tracking-tight mb-2">
          COREV
        </h1>
        <div class="h-1.5 w-12 bg-white/80 rounded-full mb-6"></div>

        <h2 class="text-lg font-medium text-white/90 leading-relaxed">
          Control de Rendimiento y Bitácora Vehicular.
        </h2>
        <p class="text-sm text-white/70 mt-4 leading-loose">
          Plataforma ejecutiva para la sincronización logística, gestión de
          combustible y supervisión operativa de la flotilla.
        </p>

        <!-- Indicador de estado -->
        <div
          class="mt-10 flex items-center gap-3 bg-black/20 w-fit px-4 py-2 rounded-full border border-white/10"
        >
          <span class="relative flex h-2.5 w-2.5">
            <span
              class="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"
            ></span>
            <span
              class="relative inline-flex rounded-full h-2.5 w-2.5 bg-teal-400"
            ></span>
          </span>
          <span
            class="text-white/80 text-[10px] font-bold uppercase tracking-[0.15em]"
            >Conexión Segura</span
          >
        </div>
      </div>
    </div>

    <!-- ========================================== -->
    <!-- PANEL DERECHO: FORMULARIO EJECUTIVO        -->
    <!-- ========================================== -->
    <div
      class="w-full lg:w-7/12 flex items-center justify-center p-8 sm:p-12 lg:p-24 relative bg-white"
    >
      <!-- Decoración de fondo sutil derecha -->
      <div
        class="absolute top-0 right-0 w-[500px] h-[500px] bg-slate-50 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2"
      ></div>

      <div class="w-full max-w-md relative z-10">
        <!-- Encabezado del Formulario -->
        <div class="mb-12 text-center lg:text-left">
          <h3 class="text-3xl font-black text-slate-800 tracking-tight mb-3">
            Iniciar Sesión
          </h3>
          <p class="text-slate-500 font-medium leading-relaxed">
            Ingresa tus credenciales institucionales para acceder al centro de
            mando.
          </p>
        </div>

        <!-- Formulario -->
        <form @submit.prevent="manejarLogin" class="space-y-6">
          <!-- Campo: Correo -->
          <div class="space-y-2 text-left">
            <label
              for="email"
              class="block text-xs font-bold text-slate-700 uppercase tracking-wide"
              >Correo Electrónico</label
            >
            <div class="relative group">
              <div
                class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[darkcyan] transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  class="w-5 h-5"
                >
                  <path
                    d="M3 4a2 2 0 00-2 2v8a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2H3zm0 1.068l6.638 3.983a2 2 0 001.724 0L18 5.068V14a1 1 0 01-1 1H3a1 1 0 01-1-1V5.068z"
                  />
                </svg>
              </div>
              <input
                id="email"
                type="email"
                v-model="email"
                placeholder="francisco.cangas@nuevoleon.gob.mx"
                class="block w-full pl-12 pr-4 py-3.5 bg-slate-50/50 border border-slate-200 rounded-xl text-slate-800 text-sm font-medium transition-all placeholder:text-slate-400 focus:bg-white focus:border-[darkcyan] focus:ring-4 focus:ring-[darkcyan]/15 outline-none"
                required
              />
            </div>
          </div>

          <!-- Campo: Contraseña -->
          <div class="space-y-2 text-left">
            <div class="flex items-center justify-between">
              <label
                for="password"
                class="block text-xs font-bold text-slate-700 uppercase tracking-wide"
                >Contraseña</label
              >
            </div>
            <div class="relative group">
              <div
                class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[darkcyan] transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  class="w-5 h-5"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <input
                id="password"
                :type="mostrarPassword ? 'text' : 'password'"
                v-model="password"
                placeholder="••••••••••••"
                class="block w-full pl-12 pr-12 py-3.5 bg-slate-50/50 border border-slate-200 rounded-xl text-slate-800 text-sm font-medium transition-all placeholder:text-slate-400 focus:bg-white focus:border-[darkcyan] focus:ring-4 focus:ring-[darkcyan]/15 outline-none"
                required
              />
              <button
                type="button"
                @click="mostrarPassword = !mostrarPassword"
                class="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-[darkcyan] transition-colors outline-none"
              >
                <svg
                  v-if="!mostrarPassword"
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
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <svg
                  v-else
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
                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              </button>
            </div>
          </div>

          <!-- Botón de Acceso -->
          <button
            type="submit"
            :disabled="cargando"
            class="w-full relative flex items-center justify-center gap-2 bg-[darkcyan] hover:bg-[darkcyan]/90 text-white font-bold text-sm py-4 rounded-xl shadow-lg shadow-[darkcyan]/30 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden group mt-4"
          >
            <span :class="{ 'opacity-0': cargando }">Acceder al Sistema</span>
            <svg
              :class="{ 'opacity-0': cargando }"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2.5"
              stroke="currentColor"
              class="w-4 h-4 transition-transform group-hover:translate-x-1"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
            <svg
              v-if="cargando"
              class="animate-spin absolute w-5 h-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </button>
        </form>

        <!-- Pie del panel derecho -->
        <p class="mt-12 text-center text-xs font-semibold text-slate-400">
          Gobierno del Estado de Nuevo León &copy;
          {{ new Date().getFullYear() }} <br />
          Todos los derechos reservados.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import LogoCorev from "../components/LogoCorev.vue";
// 1. IMPORTANTE: Descomentamos la conexión a tu base de datos
import { supabase } from "../lib/supabaseClient";

const router = useRouter();
const email = ref("");
const password = ref("");
const mostrarPassword = ref(false);
const cargando = ref(false);

// 2. Integramos la lógica real de Autenticación
const manejarLogin = async () => {
  cargando.value = true;

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    });

    if (error) {
      throw error;
    }

    // Si el login es exitoso, te mandamos al Dashboard (o a tu ruta principal)
    router.push("/bitacora");
  } catch (error: any) {
    console.error("Error al iniciar sesión:", error.message);
    alert(
      "Credenciales incorrectas. Por favor verifica tu correo y contraseña.",
    );
  } finally {
    cargando.value = false;
  }
};
</script>
