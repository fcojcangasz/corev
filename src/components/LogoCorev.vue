<template>
  <div class="flex items-center gap-3">
    <!-- ISOTIPO CLÁSICO (LA "C" ESTÁNDAR) -->
    <div
      class="flex items-center justify-center font-black rounded-xl shadow-md shrink-0 select-none"
      :class="[tamanioClases[size].contenedor, colorFondo, colorIcono]"
    >
      C
    </div>

    <!-- Tipografía Institucional en Inter -->
    <span
      v-if="mostrarTexto"
      class="font-black tracking-tight font-sans"
      :class="[tamanioClases[size].texto, colorTexto]"
    >
      COREV
    </span>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    size?: "sm" | "md" | "lg" | "xl";
    mostrarTexto?: boolean;
    colorTexto?: string;
    colorIcono?: string;
    colorFondo?: string;
  }>(),
  {
    size: "md",
    mostrarTexto: true,
    colorTexto: "text-slate-800",
    colorIcono: "text-white",
    colorFondo: "bg-institucional-primario",
  },
);

const tamanioClases = {
  sm: { contenedor: "w-8 h-8 text-lg", texto: "text-xl" },
  md: { contenedor: "w-10 h-10 text-xl", texto: "text-2xl" },
  lg: { contenedor: "w-14 h-14 text-3xl", texto: "text-4xl" },
  xl: { contenedor: "w-20 h-20 text-5xl", texto: "text-6xl" },
};
</script>
