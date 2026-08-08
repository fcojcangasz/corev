<template>
  <section class="max-w-6xl mx-auto">
    <!-- Encabezado del Módulo -->
    <header class="mb-8">
      <div class="flex items-center gap-3 mb-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-8 h-8 text-institucional-secundario"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 0 0 -2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0 -1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
        </svg>
        <h2 class="text-2xl font-bold text-texto-oscuro tracking-tight">
          Control de Mantenimientos
        </h2>
      </div>
      <p class="text-sm text-texto-secundario">
        Gestión de reparaciones y seguimiento de seguros de la flotilla
        vehicular.
      </p>
    </header>

    <!-- Contenedor Principal -->
    <div
      class="bg-institucional-superficie border border-borde-fuerte rounded-institucional shadow-tarjeta p-6 sm:p-8"
    >
      <!-- Placeholder / Skeleton Loader Premium -->
      <div v-if="cargando" class="animate-pulse space-y-6">
        <div class="h-6 bg-borde-fuerte rounded w-1/4 mb-8"></div>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div class="h-10 bg-borde-suave rounded col-span-1"></div>
          <div class="h-10 bg-borde-suave rounded col-span-1"></div>
          <div class="h-10 bg-borde-suave rounded col-span-1"></div>
        </div>
        <div class="h-32 bg-borde-suave rounded w-full mt-4"></div>
      </div>

      <!-- Aquí irá el formulario real -->
      <div v-else>
        <!-- Formulario de mantenimientos próximamente -->
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

// Simulamos una carga de datos de 1 segundo para mostrar el esqueleto
const cargando = ref(true);

onMounted(() => {
  setTimeout(() => {
    cargando.value = false;
  }, 1000);
});
</script>
