<template>
  <!-- Contenedor principal que ocupa toda la pantalla -->
  <div class="min-h-screen w-full flex bg-slate-50 absolute top-0 left-0 z-50">
    <!-- LADO IZQUIERDO: Branding COREV (Oculto en móviles) -->
    <div
      class="hidden lg:flex lg:w-1/2 bg-institucional-primario justify-center items-center relative overflow-hidden"
    >
      <!-- Decoración de fondo -->
      <div
        class="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent z-10"
      ></div>
      <div class="relative z-20 text-center text-white p-12">
        <h1 class="text-6xl font-extrabold mb-4 tracking-tight drop-shadow-md">
          COREV
        </h1>
        <p class="text-2xl text-white/90 font-light tracking-wide">
          Sistema de Control Vehicular
        </p>
        <div
          class="mt-8 w-16 h-1 bg-institucional-secundario mx-auto rounded-full"
        ></div>
      </div>
    </div>

    <!-- LADO DERECHO: Formulario de Acceso -->
    <div class="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12">
      <div
        class="w-full max-w-md bg-white p-8 sm:p-10 rounded-3xl shadow-2xl shadow-slate-200/50 border border-slate-100"
      >
        <div class="mb-10 text-center">
          <h2 class="text-3xl font-bold text-slate-800 tracking-tight mb-2">
            Iniciar Sesión
          </h2>
          <p class="text-slate-500">Ingresa tus credenciales institucionales</p>
        </div>

        <form @submit.prevent="procesarLogin" class="space-y-6">
          <!-- Alerta de Error -->
          <div
            v-if="errorMensaje"
            class="bg-red-50 text-red-600 p-4 rounded-xl text-sm border border-red-100 text-center flex items-center justify-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              class="w-5 h-5"
            >
              <path
                fill-rule="evenodd"
                d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-8-5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5A.75.75 0 0 1 10 5Zm0 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
                clip-rule="evenodd"
              />
            </svg>
            {{ errorMensaje }}
          </div>

          <!-- Correo -->
          <div>
            <label class="block text-sm font-semibold text-slate-700 mb-2"
              >Correo Electrónico</label
            >
            <input
              type="email"
              v-model="credenciales.email"
              required
              :disabled="cargando"
              class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-institucional-primario/15 focus:border-institucional-primario outline-none transition-all text-slate-700"
              placeholder="usuario@institucion.gob.mx"
            />
          </div>

          <!-- Contraseña -->
          <div>
            <label class="block text-sm font-semibold text-slate-700 mb-2"
              >Contraseña</label
            >
            <div class="relative">
              <input
                :type="mostrarPassword ? 'text' : 'password'"
                v-model="credenciales.password"
                required
                :disabled="cargando"
                class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-institucional-primario/15 focus:border-institucional-primario outline-none transition-all text-slate-700"
                placeholder="••••••••"
              />

              <!-- Botón mostrar/ocultar contraseña -->
              <button
                type="button"
                @click="mostrarPassword = !mostrarPassword"
                class="absolute right-3 top-3.5 text-slate-400 hover:text-slate-600"
              >
                <svg
                  v-if="!mostrarPassword"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-5 h-5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
                <svg
                  v-else
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-5 h-5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              </button>
            </div>
          </div>

          <button
            type="submit"
            :disabled="cargando"
            class="w-full bg-institucional-primario hover:bg-[#0f172a] text-white font-semibold py-3.5 px-4 rounded-xl transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed shadow-xl shadow-institucional-primario/20 active:scale-95 mt-4"
          >
            {{
              cargando ? "Verificando credenciales..." : "Acceder al Sistema"
            }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { supabase } from "../lib/supabaseClient";

const router = useRouter();

const cargando = ref(false);
const errorMensaje = ref("");
const mostrarPassword = ref(false);

const credenciales = ref({
  email: "",
  password: "",
});

const procesarLogin = async () => {
  if (!credenciales.value.email || !credenciales.value.password) {
    errorMensaje.value = "Por favor, ingresa tu correo y contraseña.";
    return;
  }

  cargando.value = true;
  errorMensaje.value = "";

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: credenciales.value.email,
      password: credenciales.value.password,
    });

    if (error) throw error;

    // Login exitoso, enviamos al usuario a su bitácora
    router.push("/bitacora");
  } catch (error: any) {
    console.error("Error de autenticación:", error.message);
    if (error.message.includes("Invalid login credentials")) {
      errorMensaje.value =
        "Correo o contraseña incorrectos. Verifica tus datos.";
    } else {
      errorMensaje.value = "Error de conexión. Intenta nuevamente.";
    }
  } finally {
    cargando.value = false;
  }
};
</script>
