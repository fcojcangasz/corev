<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { supabase } from "../lib/supabaseClient";

// =========================================================================
// 1. ESTADO REACTIVO: PRESUPUESTO (Conectado a Supabase)
// =========================================================================
const presupuestoConsumido = ref(0);
const presupuestoTotal = ref(120000); // Tope base mensual
const cargandoPresupuesto = ref(true);

const porcentajePresupuesto = computed(() => {
  if (presupuestoTotal.value === 0) return 0;
  const porcentaje =
    (presupuestoConsumido.value / presupuestoTotal.value) * 100;
  return Math.min(Math.round(porcentaje), 100); // Topado al 100% para evitar desbordamiento visual
});

const cargarPresupuestoMensual = async () => {
  try {
    cargandoPresupuesto.value = true;

    const fechaActual = new Date();
    const primerDiaMes = new Date(
      fechaActual.getFullYear(),
      fechaActual.getMonth(),
      1,
    ).toISOString();
    const ultimoDiaMes = new Date(
      fechaActual.getFullYear(),
      fechaActual.getMonth() + 1,
      0,
      23,
      59,
      59,
    ).toISOString();

    const { data, error } = await supabase
      .from("cargas_combustible")
      .select("costo_total")
      .gte("created_at", primerDiaMes)
      .lte("created_at", ultimoDiaMes);

    if (error) throw error;

    if (data && data.length > 0) {
      presupuestoConsumido.value = data.reduce((acumulador, registro) => {
        return acumulador + (Number(registro.costo_total) || 0);
      }, 0);
    } else {
      presupuestoConsumido.value = 0;
    }
  } catch (error: any) {
    console.error("Error al cargar el presupuesto:", error.message);
  } finally {
    cargandoPresupuesto.value = false;
  }
};

// =========================================================================
// 2. ESTADO REACTIVO: OPERACIÓN (UNIDADES EN RUTA)
// =========================================================================
const unidadesEnRuta = ref(0);
const unidadesTotales = ref(0);
const cargandoOperacion = ref(true);

const cargarOperacionEnRuta = async () => {
  try {
    cargandoOperacion.value = true;

    // Ejecutamos ambas consultas de conteo al mismo tiempo para máxima velocidad
    const [consultaViajes, consultaUnidades] = await Promise.all([
      // A. Contar cuántos viajes están activos (EN_RUTA) en viajes_operativos
      supabase
        .from("viajes_operativos")
        .select("*", { count: "exact", head: true })
        .eq("estado", "EN_RUTA"),

      // B. Contar cuántos vehículos totales hay en el catalogo_unidades
      supabase
        .from("catalogo_unidades")
        .select("*", { count: "exact", head: true }),
    ]);

    if (consultaViajes.error) throw consultaViajes.error;
    if (consultaUnidades.error) throw consultaUnidades.error;

    unidadesEnRuta.value = consultaViajes.count || 0;
    unidadesTotales.value = consultaUnidades.count || 0;
  } catch (error: any) {
    console.error("Error al cargar la operación en ruta:", error.message);
  } finally {
    cargandoOperacion.value = false;
  }
};

// =========================================================================
// CICLO DE VIDA (Ejecutar al cargar la pantalla)
// =========================================================================
onMounted(() => {
  cargarPresupuestoMensual();
  cargarOperacionEnRuta();
});

// =========================================================================
// DATOS SIMULADOS (MOCKS) RESTANTES
// =========================================================================
const kpis = ref({
  alertas: {
    criticas: 2,
    preventivas: 5,
  },
});

const actividadReciente = ref([
  {
    id: 1,
    tipo: "combustible",
    titulo: "Carga de Combustible",
    detalle: "U-88056 | $1,200.00 MXN",
    tiempo: "Hace 10 min",
    color: "bg-teal-500",
  },
  {
    id: 2,
    tipo: "salida",
    titulo: "Salida a Ruta",
    detalle: "U-99012 | Destino: Pabellón M",
    tiempo: "Hace 25 min",
    color: "bg-blue-500",
  },
  {
    id: 3,
    tipo: "mantenimiento",
    titulo: "Alerta Correctiva",
    detalle: "U-77421 | Falla en frenos",
    tiempo: "Hace 1 hora",
    color: "bg-rose-500",
  },
  {
    id: 4,
    tipo: "retorno",
    titulo: "Retorno a Base",
    detalle: "U-88056 | Sin incidencias",
    tiempo: "Hace 2 horas",
    color: "bg-slate-400",
  },
  {
    id: 5,
    tipo: "combustible",
    titulo: "Carga de Combustible",
    detalle: "U-33011 | $850.00 MXN",
    tiempo: "Hace 3 horas",
    color: "bg-teal-500",
  },
]);
</script>

<template>
  <div class="p-8 max-w-7xl mx-auto space-y-8 animate-fade-in">
    <!-- HEADER DEL DASHBOARD -->
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-2xl font-black text-slate-800 tracking-tight">
          Panel Central
        </h2>
        <p class="text-slate-500 text-sm font-medium mt-1">
          Resumen operativo y financiero de la flotilla.
        </p>
      </div>

      <!-- Botón de Acción Rápida -->
      <button
        class="bg-[#042f2e] hover:bg-[#042f2e]/90 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-md shadow-darkcyan/20 transition-all flex items-center gap-2"
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
            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
          />
        </svg>
        Generar Reporte
      </button>
    </div>

    <!-- ========================================================================= -->
    <!-- Z-PATTERN: FILA 1 (Tarjetas de KPI)                                       -->
    <!-- ========================================================================= -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- KPI 1: Presupuesto (Conectado a Supabase) -->
      <div
        class="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
      >
        <div
          class="absolute top-0 right-0 w-32 h-32 bg-teal-400/10 rounded-bl-full -z-10 transition-transform group-hover:scale-110"
        ></div>

        <div class="flex items-start justify-between mb-4">
          <div
            class="w-12 h-12 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center shadow-sm"
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
                d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <span
            class="text-xs font-bold px-2.5 py-1 rounded-lg transition-colors"
            :class="
              porcentajePresupuesto > 90
                ? 'bg-rose-50 text-rose-600'
                : 'bg-teal-50 text-teal-600'
            "
          >
            Mes Actual
          </span>
        </div>

        <div>
          <p
            class="text-slate-400 text-sm font-bold tracking-wider uppercase mb-1"
          >
            Presupuesto Combustible
          </p>
          <div
            v-if="cargandoPresupuesto"
            class="h-9 w-3/4 bg-slate-200 animate-pulse rounded-lg mt-1"
          ></div>
          <h3 v-else class="text-3xl font-black text-slate-800">
            ${{
              presupuestoConsumido.toLocaleString("es-MX", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
            }}
          </h3>
        </div>

        <div class="mt-5">
          <div
            class="flex justify-between text-[11px] font-bold text-slate-400 mb-2"
          >
            <span>{{ porcentajePresupuesto }}% Consumido</span>
            <span>De ${{ presupuestoTotal.toLocaleString("es-MX") }}</span>
          </div>
          <div class="w-full bg-slate-100 rounded-full h-2">
            <div
              class="h-2 rounded-full transition-all duration-1000"
              :class="
                porcentajePresupuesto > 90
                  ? 'bg-rose-500 shadow-sm shadow-rose-500/50'
                  : 'bg-teal-400'
              "
              :style="`width: ${porcentajePresupuesto}%`"
            ></div>
          </div>
        </div>
      </div>

      <!-- KPI 2: Operación (Conectado a Supabase) -->
      <div
        class="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
      >
        <div
          class="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-bl-full -z-10 transition-transform group-hover:scale-110"
        ></div>
        <div
          class="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shadow-sm mb-4"
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
              d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
            />
          </svg>
        </div>

        <div>
          <p
            class="text-slate-400 text-sm font-bold tracking-wider uppercase mb-1"
          >
            Unidades en Ruta
          </p>

          <div
            v-if="cargandoOperacion"
            class="h-9 w-1/2 bg-slate-200 animate-pulse rounded-lg mt-1"
          ></div>

          <div v-else class="flex items-baseline gap-2">
            <h3 class="text-3xl font-black text-slate-800">
              {{ unidadesEnRuta }}
            </h3>
            <span class="text-sm font-medium text-slate-400"
              >/ {{ unidadesTotales }} activas</span
            >
          </div>
        </div>

        <div
          class="mt-5 flex items-center gap-2 text-sm font-medium text-slate-500 bg-slate-50 px-3 py-2 rounded-xl"
        >
          <span
            class="w-2 h-2 rounded-full animate-pulse"
            :class="unidadesEnRuta > 0 ? 'bg-blue-500' : 'bg-slate-300'"
          >
          </span>
          {{ unidadesEnRuta }} retornos esperados hoy.
        </div>
      </div>

      <!-- KPI 3: Alertas -->
      <div
        class="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
      >
        <div
          class="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-bl-full -z-10 transition-transform group-hover:scale-110"
        ></div>
        <div class="flex items-start justify-between mb-4">
          <div
            class="w-12 h-12 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center shadow-sm"
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
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <span
            class="text-xs font-bold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-lg"
            >Requieren Atención</span
          >
        </div>
        <div>
          <p
            class="text-slate-400 text-sm font-bold tracking-wider uppercase mb-1"
          >
            Mantenimientos
          </p>
          <div class="flex items-baseline gap-2">
            <h3 class="text-3xl font-black text-slate-800">
              {{ kpis.alertas.criticas + kpis.alertas.preventivas }}
            </h3>
            <span class="text-sm font-medium text-slate-400"
              >alertas activas</span
            >
          </div>
        </div>
        <div class="mt-5 flex gap-2">
          <div class="flex-1 bg-amber-50 rounded-xl p-2 text-center">
            <span class="block text-lg font-black text-amber-600">{{
              kpis.alertas.preventivas
            }}</span>
            <span class="block text-[10px] font-bold text-amber-700 uppercase"
              >Preventivos</span
            >
          </div>
          <div class="flex-1 bg-rose-50 rounded-xl p-2 text-center">
            <span class="block text-lg font-black text-rose-600">{{
              kpis.alertas.criticas
            }}</span>
            <span class="block text-[10px] font-bold text-rose-700 uppercase"
              >Críticos</span
            >
          </div>
        </div>
      </div>
    </div>

    <!-- ========================================================================= -->
    <!-- Z-PATTERN: FILA 2 (Gráfica y Monitor)                                     -->
    <!-- ========================================================================= -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- SECCIÓN ANALÍTICA (Diagonal de la Z) -->
      <div
        class="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col"
      >
        <div class="flex justify-between items-center mb-6">
          <div>
            <h3 class="text-lg font-bold text-slate-800">
              Tendencia de Combustible
            </h3>
            <p class="text-sm text-slate-400 font-medium">
              Gasto diario de los últimos 7 días
            </p>
          </div>
          <select
            class="bg-slate-50 border-none text-sm font-bold text-slate-600 rounded-xl px-4 py-2 focus:ring-0 cursor-pointer outline-none"
          >
            <option>Esta Semana</option>
            <option>Mes Pasado</option>
          </select>
        </div>

        <!-- Placeholder de Gráfica (CSS puro para visualización rápida) -->
        <div
          class="flex-1 flex items-end gap-4 h-64 mt-4 border-b border-slate-100 pb-2"
        >
          <div
            class="flex-1 flex flex-col justify-end items-center gap-2 group"
          >
            <div
              class="w-full bg-teal-100 rounded-t-lg h-[30%] group-hover:bg-teal-200 transition-colors relative"
            >
              <span
                class="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity"
                >$1.2k</span
              >
            </div>
            <span class="text-xs font-bold text-slate-400">Lun</span>
          </div>
          <div
            class="flex-1 flex flex-col justify-end items-center gap-2 group"
          >
            <div
              class="w-full bg-teal-400 rounded-t-lg h-[70%] group-hover:bg-teal-500 transition-colors relative shadow-lg shadow-teal-400/30"
            >
              <span
                class="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity"
                >$3.8k</span
              >
            </div>
            <span class="text-xs font-bold text-slate-800">Mar</span>
          </div>
          <div
            class="flex-1 flex flex-col justify-end items-center gap-2 group"
          >
            <div
              class="w-full bg-teal-100 rounded-t-lg h-[45%] group-hover:bg-teal-200 transition-colors relative"
            >
              <span
                class="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity"
                >$2.1k</span
              >
            </div>
            <span class="text-xs font-bold text-slate-400">Mié</span>
          </div>
          <div
            class="flex-1 flex flex-col justify-end items-center gap-2 group"
          >
            <div
              class="w-full bg-teal-100 rounded-t-lg h-[60%] group-hover:bg-teal-200 transition-colors relative"
            >
              <span
                class="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity"
                >$2.8k</span
              >
            </div>
            <span class="text-xs font-bold text-slate-400">Jue</span>
          </div>
          <div
            class="flex-1 flex flex-col justify-end items-center gap-2 group"
          >
            <div
              class="w-full bg-[#042f2e] rounded-t-lg h-[90%] group-hover:bg-[#042f2e]/90 transition-colors relative shadow-lg shadow-darkcyan/30"
            >
              <span
                class="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-[#042f2e] opacity-0 group-hover:opacity-100 transition-opacity"
                >$4.5k</span
              >
            </div>
            <span class="text-xs font-bold text-slate-800">Vie</span>
          </div>
          <div
            class="flex-1 flex flex-col justify-end items-center gap-2 group"
          >
            <div
              class="w-full bg-slate-200 rounded-t-lg h-[20%] group-hover:bg-slate-300 transition-colors relative"
            >
              <span
                class="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity"
                >$0.8k</span
              >
            </div>
            <span class="text-xs font-bold text-slate-400">Sáb</span>
          </div>
          <div
            class="flex-1 flex flex-col justify-end items-center gap-2 group"
          >
            <div
              class="w-full bg-slate-200 rounded-t-lg h-[10%] group-hover:bg-slate-300 transition-colors relative"
            >
              <span
                class="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity"
                >$0.2k</span
              >
            </div>
            <span class="text-xs font-bold text-slate-400">Dom</span>
          </div>
        </div>
      </div>

      <!-- MONITOR EN TIEMPO REAL (Fin de la Z) -->
      <div
        class="lg:col-span-1 bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col"
      >
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-lg font-bold text-slate-800">Monitor en Vivo</h3>
          <span class="flex h-3 w-3 relative">
            <span
              class="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"
            ></span>
            <span
              class="relative inline-flex rounded-full h-3 w-3 bg-teal-500"
            ></span>
          </span>
        </div>

        <div class="flex-1 overflow-y-auto hide-scrollbar pr-2">
          <div class="relative border-l-2 border-slate-100 ml-3 space-y-6">
            <!-- Items del Timeline -->
            <div
              v-for="item in actividadReciente"
              :key="item.id"
              class="relative pl-6"
            >
              <div
                :class="[
                  'absolute -left-[5px] top-1.5 w-2 h-2 rounded-full ring-4 ring-white',
                  item.color,
                ]"
              ></div>

              <div class="flex flex-col">
                <span class="text-xs font-bold text-slate-400 mb-0.5">{{
                  item.tiempo
                }}</span>
                <span class="text-sm font-bold text-slate-800">{{
                  item.titulo
                }}</span>
                <span class="text-xs font-medium text-slate-500 mt-1">{{
                  item.detalle
                }}</span>
              </div>
            </div>
          </div>
        </div>

        <button
          class="w-full mt-4 py-3 bg-slate-50 hover:bg-slate-100 text-slate-600 text-sm font-bold rounded-xl transition-colors cursor-pointer"
        >
          Ver todo el historial
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Ocultar barra de desplazamiento en el monitor */
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
