<template>
  <!-- Velo translúcido con desenfoque para no perder el contexto de la app -->
  <div
    class="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white/70 backdrop-blur-md transition-opacity duration-300"
  >
    <!-- Animación: El Motor Digital de COREV -->
    <div class="relative w-28 h-28 flex justify-center items-center mb-6">
      <!-- Pista estática del engranaje -->
      <div
        class="absolute inset-0 rounded-full border-[3px] border-slate-100"
      ></div>

      <!-- 1. EL MOTOR DIGITAL (Movimiento vehicular de la flotilla) -->
      <div
        class="absolute inset-0 rounded-full border-[3px] border-institucional-primario border-r-transparent border-t-transparent animate-[spin_1.2s_linear_infinite]"
      ></div>

      <!-- 2. CONVERGENCIA DE DATOS (Telemetría, combustible, bitácoras fluyendo al núcleo) -->
      <div
        class="absolute inset-4 rounded-full border-[3px] border-dashed border-institucional-secundario/70 animate-[spin_4s_linear_infinite_reverse]"
      ></div>

      <!-- 3. EL "CORE" (El núcleo de decisiones y Dashboard) -->
      <div
        class="w-6 h-6 bg-institucional-primario rounded-full animate-pulse shadow-[0_0_20px_rgba(0,0,0,0.15)] flex justify-center items-center"
      >
        <!-- Pequeño destello interno en el núcleo -->
        <div class="w-2 h-2 bg-white/60 rounded-full"></div>
      </div>
    </div>

    <!-- Tipografía Institucional COREV -->
    <h2 class="text-2xl font-black text-slate-800 tracking-tight mb-1">
      COREV
    </h2>
    <div class="flex items-center gap-2">
      <!-- Indicador de procesamiento de datos -->
      <span class="flex space-x-1">
        <span
          class="w-1.5 h-1.5 bg-institucional-secundario rounded-full animate-bounce"
          style="animation-delay: 0s"
        ></span>
        <span
          class="w-1.5 h-1.5 bg-institucional-secundario rounded-full animate-bounce"
          style="animation-delay: 0.15s"
        ></span>
        <span
          class="w-1.5 h-1.5 bg-institucional-secundario rounded-full animate-bounce"
          style="animation-delay: 0.3s"
        ></span>
      </span>
      <p
        class="text-[11px] font-bold text-slate-500 tracking-[0.2em] uppercase"
      >
        Sincronizando Motor Digital
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
// Componente de representación visual (Stateless)
</script>
