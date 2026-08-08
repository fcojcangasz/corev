<template>
  <section class="max-w-7xl mx-auto p-6 font-sans">
    <!-- ======================================================= -->
    <!-- ENCABEZADO DEL MÓDULO                                   -->
    <!-- ======================================================= -->
    <header class="mb-8">
      <div class="flex items-center gap-3 mb-2">
        <div
          class="p-2.5 bg-institucional-primario/10 rounded-xl text-institucional-primario"
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
              d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
            />
          </svg>
        </div>
        <h2 class="text-2xl font-bold text-slate-800 tracking-tight">
          Historial de Viajes
        </h2>
      </div>
      <p class="text-sm text-slate-500 ml-14">
        Consulta general de movimientos y registros concluidos.
      </p>
    </header>

    <!-- ======================================================= -->
    <!-- TABLA DE DATOS CON TOOLBAR INTEGRADO                    -->
    <!-- ======================================================= -->
    <div
      class="bg-white border border-slate-100 rounded-2xl shadow-xl shadow-slate-200/40 overflow-hidden relative z-10"
    >
      <!-- Indicador de Carga Superpuesto -->
      <div
        v-if="cargando"
        class="absolute inset-0 bg-white/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center"
      >
        <svg
          class="animate-spin h-8 w-8 text-institucional-secundario mb-3"
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
        <span class="text-sm font-bold text-slate-600 uppercase tracking-wider"
          >Consultando base de datos...</span
        >
      </div>

      <!-- Cabecera de la Tarjeta (Título + Filtros Integrados) -->
      <div
        class="bg-slate-50 border-b border-slate-100 px-6 py-4 flex flex-col xl:flex-row xl:items-center justify-between gap-4"
      >
        <!-- Título y Contador -->
        <div class="flex items-center gap-3">
          <div
            class="p-2 bg-institucional-primario/10 rounded-lg text-institucional-primario"
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
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <div>
            <h3
              class="text-sm font-bold text-slate-700 uppercase tracking-wider"
            >
              {{
                isAdmin ? "Todos los Movimientos" : "Mis Movimientos Recientes"
              }}
            </h3>
            <p class="text-xs font-medium text-slate-500 mt-0.5">
              {{ historial.length }} Registros encontrados
            </p>
          </div>
        </div>

        <!-- Filtros Integrados (Solo Administradores) -->
        <div
          v-if="isAdmin"
          class="flex flex-wrap items-center justify-end gap-2 relative flex-1"
        >
          <!-- ============================================== -->
          <!-- FILTRO CUSTOM: Selector de Mes Premium         -->
          <!-- ============================================== -->
          <div class="relative w-full sm:w-56 z-30">
            <button
              @click="toggleSelectorMes"
              type="button"
              class="w-full flex items-center justify-between pl-3 pr-3 py-1.5 text-sm bg-white border text-left transition-all rounded-lg outline-none cursor-pointer"
              :class="
                selectorMesAbierto
                  ? 'border-institucional-primario ring-2 ring-institucional-primario/20'
                  : 'border-slate-200 text-slate-700 hover:border-slate-300'
              "
            >
              <div class="flex items-center gap-2 truncate">
                <svg
                  class="w-4 h-4 text-slate-400 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                  />
                </svg>
                <span
                  :class="
                    filtros.mes
                      ? 'text-slate-800 font-medium'
                      : 'text-slate-500'
                  "
                >
                  {{ textoMesSeleccionado }}
                </span>
              </div>
              <svg
                class="w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200"
                :class="{ 'rotate-180': selectorMesAbierto }"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </button>

            <!-- Dropdown Menú de Meses -->
            <Transition name="dropdown">
              <div
                v-if="selectorMesAbierto"
                class="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-slate-100 z-50 overflow-hidden"
              >
                <div
                  class="flex items-center justify-between px-4 py-3 border-b border-slate-50 bg-slate-50/50"
                >
                  <button
                    @click="anioNavegacion--"
                    class="p-1 text-slate-400 hover:text-institucional-primario hover:bg-white rounded-md transition-colors"
                  >
                    <svg
                      class="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                  <span class="font-bold text-slate-700">{{
                    anioNavegacion
                  }}</span>
                  <button
                    @click="anioNavegacion++"
                    class="p-1 text-slate-400 hover:text-institucional-primario hover:bg-white rounded-md transition-colors"
                  >
                    <svg
                      class="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
                <div class="p-3 grid grid-cols-3 gap-2">
                  <button
                    v-for="(mes, index) in mesesNombres"
                    :key="index"
                    @click="seleccionarMesPersonalizado(index + 1)"
                    class="py-2 text-sm font-medium rounded-lg transition-all"
                    :class="
                      esMesSeleccionado(index + 1)
                        ? 'bg-institucional-primario text-white shadow-md shadow-institucional-primario/20'
                        : 'text-slate-600 hover:bg-slate-100'
                    "
                  >
                    {{ mes }}
                  </button>
                </div>
              </div>
            </Transition>
            <!-- Overlay Mes -->
            <div
              v-if="selectorMesAbierto"
              @click="selectorMesAbierto = false"
              class="fixed inset-0 z-40"
            ></div>
          </div>

          <!-- ============================================== -->
          <!-- FILTRO CUSTOM: Selector de Unidades Premium    -->
          <!-- ============================================== -->
          <div class="relative w-full sm:w-56 z-20">
            <button
              @click="toggleSelectorUnidad"
              type="button"
              class="w-full flex items-center justify-between pl-3 pr-3 py-1.5 text-sm bg-white border text-left transition-all rounded-lg outline-none cursor-pointer"
              :class="
                selectorUnidadAbierto
                  ? 'border-institucional-primario ring-2 ring-institucional-primario/20'
                  : 'border-slate-200 text-slate-700 hover:border-slate-300'
              "
            >
              <div class="flex items-center gap-2 truncate">
                <svg
                  class="w-4 h-4 text-slate-400 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                  />
                </svg>
                <span
                  :class="
                    filtros.unidad
                      ? 'text-slate-800 font-medium'
                      : 'text-slate-500'
                  "
                >
                  {{ textoUnidadSeleccionada }}
                </span>
              </div>
              <svg
                class="w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200"
                :class="{ 'rotate-180': selectorUnidadAbierto }"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </button>

            <!-- Dropdown Menú de Unidades -->
            <Transition name="dropdown">
              <div
                v-if="selectorUnidadAbierto"
                class="absolute top-full right-0 mt-2 w-full min-w-[200px] bg-white rounded-xl shadow-2xl border border-slate-100 z-50 overflow-hidden flex flex-col"
              >
                <div class="max-h-64 overflow-y-auto hide-scrollbar py-1">
                  <!-- Opción: Todas -->
                  <button
                    @click="seleccionarUnidad('')"
                    class="w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center gap-2"
                    :class="
                      !filtros.unidad
                        ? 'bg-institucional-primario/10 text-institucional-primario font-bold'
                        : 'text-slate-600 hover:bg-slate-50'
                    "
                  >
                    Todas las unidades
                  </button>

                  <!-- Iteración de Unidades -->
                  <button
                    v-for="unidad in unidadesFiltro"
                    :key="unidad.id_unidad"
                    @click="seleccionarUnidad(unidad.id_unidad)"
                    class="w-full text-left px-4 py-2 transition-colors border-t border-slate-50/50 flex flex-col items-start gap-0.5"
                    :class="
                      filtros.unidad === unidad.id_unidad
                        ? 'bg-institucional-primario/10'
                        : 'hover:bg-slate-50'
                    "
                  >
                    <span
                      class="text-sm"
                      :class="
                        filtros.unidad === unidad.id_unidad
                          ? 'text-institucional-primario font-bold'
                          : 'text-slate-700 font-medium'
                      "
                    >
                      {{ unidad.numero_economico }}
                    </span>
                    <span
                      v-if="unidad.modelo"
                      class="text-[11px] truncate w-full"
                      :class="
                        filtros.unidad === unidad.id_unidad
                          ? 'text-institucional-primario/70'
                          : 'text-slate-400'
                      "
                    >
                      {{ unidad.modelo }}
                    </span>
                  </button>
                </div>
              </div>
            </Transition>
            <!-- Overlay Unidades -->
            <div
              v-if="selectorUnidadAbierto"
              @click="selectorUnidadAbierto = false"
              class="fixed inset-0 z-40"
            ></div>
          </div>

          <!-- Botones de Acción (Filtros y Excel) -->
          <div class="flex items-center gap-1.5 w-full sm:w-auto z-10">
            <!-- Botón de Excel (Nuevo) -->
            <button
              v-if="isAdmin"
              @click="exportarReporteFisico"
              :disabled="descargandoReporte"
              class="flex-1 sm:flex-none flex items-center justify-center gap-1.5 bg-emerald-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors active:scale-95 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              title="Descargar Formato Físico Administrativo"
            >
              <svg
                v-if="!descargandoReporte"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                class="w-4 h-4"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                />
              </svg>
              <svg
                v-else
                class="animate-spin h-4 w-4 text-white"
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
              <span class="hidden md:inline">{{
                descargandoReporte ? "Procesando..." : "Excel"
              }}</span>
            </button>

            <button
              @click="aplicarFiltros"
              class="flex-1 sm:flex-none flex items-center justify-center gap-1.5 bg-institucional-primario text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors active:scale-95 shadow-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                class="w-4 h-4"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z"
                />
              </svg>
              Filtrar
            </button>

            <button
              v-if="filtros.mes || filtros.unidad"
              @click="limpiarFiltros"
              class="flex-1 sm:flex-none px-3 py-1.5 text-sm text-slate-500 bg-white border border-slate-200 hover:bg-slate-100 hover:text-slate-700 rounded-lg transition-colors font-medium active:scale-95"
              title="Limpiar filtros"
            >
              Limpiar
            </button>
          </div>
        </div>
      </div>

      <!-- Contenedor de la Tabla -->
      <div class="overflow-x-auto z-10 relative">
        <table class="w-full text-left border-collapse min-w-[900px]">
          <thead>
            <tr class="border-b border-slate-100 bg-white">
              <th
                class="py-4 px-6 font-bold text-[11px] text-institucional-primario uppercase tracking-wider"
              >
                ID
              </th>
              <th
                class="py-4 px-6 font-bold text-[11px] text-institucional-primario uppercase tracking-wider"
              >
                Fecha
              </th>
              <th
                class="py-4 px-6 font-bold text-[11px] text-institucional-primario uppercase tracking-wider"
              >
                Unidad
              </th>
              <th
                class="py-4 px-6 font-bold text-[11px] text-institucional-primario uppercase tracking-wider"
              >
                Conductor
              </th>
              <th
                class="py-4 px-6 font-bold text-[11px] text-institucional-primario uppercase tracking-wider"
              >
                Hora Llegada
              </th>
              <th
                class="py-4 px-6 font-bold text-[11px] text-institucional-primario uppercase tracking-wider"
              >
                Km Llegada
              </th>
              <th
                class="py-4 px-6 font-bold text-[11px] text-institucional-primario uppercase tracking-wider text-center"
              >
                Estatus
              </th>
            </tr>
          </thead>

          <tbody class="divide-y divide-slate-100 bg-white">
            <!-- Estado sin datos -->
            <tr v-if="!cargando && historial.length === 0">
              <td colspan="7" class="py-12 text-center text-slate-500">
                <div class="flex flex-col items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-12 h-12 text-slate-300 mb-3"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                    />
                  </svg>
                  <span class="font-medium text-slate-600"
                    >No se encontraron viajes completados</span
                  >
                  <span class="text-xs mt-1"
                    >Intenta con otros filtros si estás buscando un registro
                    específico.</span
                  >
                </div>
              </td>
            </tr>

            <!-- Filas de datos (v-for) -->
            <tr
              v-else
              v-for="viaje in historial"
              :key="viaje.id_viaje"
              class="hover:bg-slate-50/80 transition-colors group"
            >
              <td class="py-3 px-6">
                <span class="font-bold text-slate-700 text-sm"
                  >#{{ viaje.id_viaje || "---" }}</span
                >
              </td>
              <td class="py-3 px-6 text-sm text-slate-600">
                {{ viaje.fecha || viaje.fecha_salida || "---" }}
              </td>
              <td class="py-3 px-6 text-sm text-slate-700 font-medium">
                {{ viaje.catalogo_unidades?.numero_economico }} -
                {{ viaje.catalogo_unidades?.modelo }}
              </td>
              <td class="py-3 px-6 text-sm text-slate-600">
                {{
                  viaje.catalogo_personal?.nombre_completo ||
                  viaje.conductor ||
                  "---"
                }}
              </td>
              <td class="py-3 px-6 text-sm text-slate-600 font-mono">
                {{ formatHora(viaje.hora_llegada) }}
              </td>
              <td class="py-3 px-6 text-sm text-slate-600 font-mono">
                {{ formatearNumero(viaje.km_final) }}
              </td>
              <td class="py-3 px-6 text-center">
                <span
                  class="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[10px] uppercase tracking-wider font-bold border border-emerald-200 shadow-sm inline-block"
                >
                  {{ viaje.estado || "CERRADO" }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { supabase } from "../lib/supabaseClient";
import * as XLSX from "xlsx"; // NUEVA IMPORTACIÓN

// --- Estado Global ---
const historial = ref<any[]>([]);
const unidadesFiltro = ref<any[]>([]);
const cargando = ref(true);
const descargandoReporte = ref(false); // NUEVO ESTADO PARA EXCEL

// --- Control de Sesión y Rol ---
const isAdmin = ref(false);
const userId = ref<string | null>(null);

// --- Estado de Filtros Central ---
const filtros = ref({
  mes: "",
  unidad: "",
});

// --- Estado y Lógica del Selector de Mes Custom ---
const selectorMesAbierto = ref(false);
const anioNavegacion = ref(new Date().getFullYear());
const mesesNombres = [
  "Ene",
  "Feb",
  "Mar",
  "Abr",
  "May",
  "Jun",
  "Jul",
  "Ago",
  "Sep",
  "Oct",
  "Nov",
  "Dic",
];
const mesesNombresCompletos = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

const toggleSelectorMes = () => {
  if (selectorUnidadAbierto.value) selectorUnidadAbierto.value = false;
  selectorMesAbierto.value = !selectorMesAbierto.value;
};

const textoMesSeleccionado = computed(() => {
  if (!filtros.value.mes) return "Seleccionar mes...";
  const [year, month] = filtros.value.mes.split("-");
  return `${mesesNombresCompletos[parseInt(month) - 1]} ${year}`;
});

const esMesSeleccionado = (mesNumero: number) => {
  if (!filtros.value.mes) return false;
  const [year, month] = filtros.value.mes.split("-");
  return (
    parseInt(year) === anioNavegacion.value && parseInt(month) === mesNumero
  );
};

const seleccionarMesPersonalizado = (mesNumero: number) => {
  const mesFormateado = mesNumero.toString().padStart(2, "0");
  filtros.value.mes = `${anioNavegacion.value}-${mesFormateado}`;
  selectorMesAbierto.value = false;
};

// --- Estado y Lógica del Selector de Unidades Custom ---
const selectorUnidadAbierto = ref(false);

const toggleSelectorUnidad = () => {
  if (selectorMesAbierto.value) selectorMesAbierto.value = false;
  selectorUnidadAbierto.value = !selectorUnidadAbierto.value;
};

const textoUnidadSeleccionada = computed(() => {
  if (!filtros.value.unidad) return "Todas las unidades";
  const unidadEncontrada = unidadesFiltro.value.find(
    (u) => u.id_unidad === filtros.value.unidad,
  );
  return unidadEncontrada
    ? unidadEncontrada.numero_economico
    : "Todas las unidades";
});

const seleccionarUnidad = (id_unidad: string) => {
  filtros.value.unidad = id_unidad;
  selectorUnidadAbierto.value = false;
};

// --- Métodos de formateo visual ---
const formatHora = (hora: string | null) => {
  if (!hora) return "---";
  return hora.substring(0, 8);
};

const formatearNumero = (num: number | string | null) => {
  if (!num) return "---";
  return Number(num).toLocaleString("es-MX");
};

// --- Lógica Principal de Base de Datos ---
const inicializarModulo = async () => {
  cargando.value = true;
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session?.user) {
    userId.value = session.user.id;
    const { data: perfil } = await supabase
      .from("perfiles")
      .select("rol")
      .eq("id", userId.value)
      .single();

    if (perfil && perfil.rol === "admin") {
      isAdmin.value = true;
      await cargarCatalogoUnidades();
    }
    await cargarHistorial();
  } else {
    cargando.value = false;
  }
};

const cargarCatalogoUnidades = async () => {
  try {
    const { data, error } = await supabase
      .from("catalogo_unidades")
      .select("id_unidad, numero_economico, modelo")
      .order("numero_economico", { ascending: true });
    if (!error && data) {
      unidadesFiltro.value = data;
    }
  } catch (err) {
    console.error("Error al cargar unidades para el filtro", err);
  }
};

const cargarHistorial = async () => {
  cargando.value = true;
  try {
    let query = supabase
      .from("viajes_operativos")
      .select(
        `*, catalogo_unidades (numero_economico, modelo), catalogo_personal (nombre_completo)`,
      )
      .eq("estado", "CERRADO")
      .order("id_viaje", { ascending: false });

    if (!isAdmin.value && userId.value) {
      query = query.eq("perfil_id", userId.value);
    }

    if (isAdmin.value) {
      if (filtros.value.mes) {
        const [year, month] = filtros.value.mes.split("-");
        const ultimoDia = new Date(
          parseInt(year),
          parseInt(month),
          0,
        ).getDate();
        const fechaInicio = `${filtros.value.mes}-01`;
        const fechaFin = `${filtros.value.mes}-${ultimoDia}`;
        query = query
          .gte("fecha_salida", fechaInicio)
          .lte("fecha_salida", fechaFin);
      }
      if (filtros.value.unidad) {
        query = query.eq("id_unidad", filtros.value.unidad);
      }
    }

    const { data, error } = await query;
    if (error) throw error;
    historial.value = data || [];
  } catch (error) {
    console.error("Error al ejecutar el query del historial:", error);
  } finally {
    cargando.value = false;
  }
};

// --- Lógica de Exportación a Excel (Nueva) ---
const exportarReporteFisico = async () => {
  descargandoReporte.value = true;

  try {
    // Llamamos a la vista SQL global (aquí se podría aplicar lógica de fechas si se requiere a futuro)
    const { data, error } = await supabase
      .from("reporte_bitacora_fisica")
      .select("*");

    if (error) throw error;
    if (!data || data.length === 0) {
      alert("No hay registros en la bitácora para exportar.");
      return;
    }

    // Mapeamos los datos imitando el formato físico exacto
    const datosFormateados = data.map((viaje) => {
      const fechaObj = new Date(viaje.fecha_registro);
      const fechaCorta = fechaObj.toLocaleDateString("es-MX");

      return {
        "N. ECONÓMICO": viaje.numero_economico,
        FECHA: fechaCorta,
        HORA: viaje.hora_salida,
        "KILOMETRAJE INICIAL": viaje.km_inicial,
        "KILOMETRAJE FINAL": viaje.km_final || "EN RUTA",
        DESTINO: viaje.destino || "N/A",
        MOTIVO: viaje.motivo_viaje,
        "NOMBRE DEL CONDUCTOR": viaje.nombre_conductor || "N/A",
        "NO. DE TICKET": viaje.folio_ticket || "N/A",
        "MONTO ($)": viaje.costo_total ? Number(viaje.costo_total) : "",
        "COMBUSTIBLE CARGADO (L)": viaje.litros ? Number(viaje.litros) : "",
      };
    });

    // Procesamos y descargamos el Excel
    const hojaDeTrabajo = XLSX.utils.json_to_sheet(datosFormateados);
    const libroDeTrabajo = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      libroDeTrabajo,
      hojaDeTrabajo,
      "BITÁCORA OPERATIVA",
    );
    XLSX.writeFile(libroDeTrabajo, "Bitacora_Uso_Vehiculo_COREV.xlsx");
  } catch (error) {
    console.error("Error exportando bitácora:", error);
    alert("Ocurrió un error al generar el documento.");
  } finally {
    descargandoReporte.value = false;
  }
};

const aplicarFiltros = () => {
  cargarHistorial();
};

const limpiarFiltros = () => {
  filtros.value.mes = "";
  filtros.value.unidad = "";
  anioNavegacion.value = new Date().getFullYear();
  cargarHistorial();
};

onMounted(() => {
  inicializarModulo();
});
</script>

<style scoped>
.font-sans {
  font-family: "Inter", sans-serif !important;
}

/* Ocultar barra de desplazamiento para mantener estética premium */
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

/* Animación de entrada y salida para los dropdowns */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}
.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-5px) scale(0.98);
}
</style>
