<template>
  <section class="max-w-7xl mx-auto p-6 font-sans">
    <!-- ======================================================= -->
    <!-- ESTADO DE CARGA Y VALIDACIÓN DE PERMISOS                -->
    <!-- ======================================================= -->
    <div
      v-if="cargandoPermisos"
      class="text-center py-20 text-slate-500 font-medium animate-pulse"
    >
      Verificando credenciales de acceso...
    </div>

    <!-- ======================================================= -->
    <!-- PANTALLA DE ACCESO DENEGADO                             -->
    <!-- ======================================================= -->
    <div
      v-else-if="!esAdmin"
      class="text-center py-20 bg-white rounded-2xl border border-slate-100 shadow-xl shadow-slate-200/40 animate-fade-in"
    >
      <div class="inline-flex p-3 bg-red-50 text-red-600 rounded-xl mb-3">
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
            d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
          />
        </svg>
      </div>
      <h3 class="text-lg font-bold text-slate-800">Acceso Restringido</h3>
      <p class="text-sm text-slate-500 mt-1">
        Este módulo de control financiero y operativo es exclusivo para
        administradores.
      </p>
    </div>

    <!-- ======================================================= -->
    <!-- MÓDULO COMPLETO (SÓLO VISIBLE PARA ADMINISTRADORES)     -->
    <!-- ======================================================= -->
    <div v-else class="animate-fade-in">
      <!-- ENCABEZADO PRINCIPAL -->
      <header
        class="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
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
                  d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71-.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0 .55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <h2 class="text-2xl font-bold text-slate-800 tracking-tight">
              Control de Mantenimientos
            </h2>
          </div>
          <p class="text-sm text-slate-500 ml-14">
            Administración financiera y operativa del cuidado de la flotilla.
          </p>
        </div>
      </header>

      <!-- ======================================================= -->
      <!-- KPIS DINÁMICOS SEGÚN LA PESTAÑA                         -->
      <!-- ======================================================= -->

      <!-- KPIs: Taller -->
      <div
        v-if="pestañaActiva === 'taller'"
        class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 animate-fade-in"
      >
        <div
          class="bg-white border border-slate-100 rounded-2xl p-5 shadow-xl shadow-slate-200/40 md:col-span-2 flex flex-col justify-center relative overflow-hidden"
        >
          <div
            class="absolute -right-6 -top-6 w-24 h-24 bg-institucional-primario/5 rounded-full blur-2xl"
          ></div>
          <div class="flex justify-between items-end mb-3 relative z-10">
            <div>
              <p
                class="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1.5"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2.5"
                  stroke="currentColor"
                  class="w-3.5 h-3.5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Gasto Estatal (Vehículos Propios)
              </p>
              <h4 class="text-3xl font-black text-slate-700">
                {{ formatearMoneda(kpisTaller.consumoReal) }}
                <span class="text-base font-bold text-slate-400"
                  >/ {{ formatearMoneda(kpisTaller.presupuestoAsignado) }}</span
                >
              </h4>
            </div>
            <div class="text-right">
              <span
                class="px-2.5 py-1 rounded-lg text-xs font-bold"
                :class="
                  porcentajeTaller > 90
                    ? 'bg-red-50 text-red-600'
                    : porcentajeTaller > 75
                      ? 'bg-amber-50 text-amber-600'
                      : 'bg-emerald-50 text-emerald-600'
                "
              >
                {{ porcentajeTaller.toFixed(1) }}% Consumido
              </span>
            </div>
          </div>
          <div
            class="w-full bg-slate-100 rounded-full h-2.5 relative z-10 overflow-hidden"
          >
            <div
              class="h-2.5 rounded-full transition-all duration-1000 ease-out"
              :class="
                porcentajeTaller > 90
                  ? 'bg-red-500'
                  : porcentajeTaller > 75
                    ? 'bg-amber-500'
                    : 'bg-institucional-primario'
              "
              :style="{ width: `${Math.min(porcentajeTaller, 100)}%` }"
            ></div>
          </div>
        </div>

        <div
          class="bg-white border border-slate-100 rounded-2xl p-5 shadow-xl shadow-slate-200/40 flex items-center gap-4"
        >
          <div class="p-3 bg-blue-50 rounded-xl text-blue-600">
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
                d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
              />
            </svg>
          </div>
          <div>
            <p
              class="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1"
            >
              Absorbido Arrendadoras
            </p>
            <h4 class="text-2xl font-black text-slate-700">
              {{ formatearMoneda(kpisTaller.consumoArrendadoras) }}
            </h4>
          </div>
        </div>

        <div
          class="bg-white border border-slate-100 rounded-2xl p-5 shadow-xl shadow-slate-200/40 flex items-center gap-4"
        >
          <div class="p-3 bg-amber-50 rounded-xl text-amber-600">
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
                d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.835M11.42 15.17l-4.962 4.963c-.456.455-1.19.455-1.646 0l-1.59-1.59a1.163 1.163 0 010-1.645l4.963-4.963M11.42 15.17l3.418-3.418m-3.418 3.418L8.14 11.89m3.28 3.28l1.314-1.314m-1.314 1.314l-1.314-1.314m1.314 1.314l1.314 1.314M14.25 8.25l2.625-2.625a1.875 1.875 0 012.652 2.652l-2.625 2.625m-2.652-2.652l-2.625-2.625a1.875 1.875 0 00-2.652 2.652l2.625 2.625"
              />
            </svg>
          </div>
          <div>
            <p
              class="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1"
            >
              Reparaciones Activas
            </p>
            <h4 class="text-2xl font-black text-slate-700">
              {{ kpisTaller.enTaller }}
              <span class="text-sm font-medium text-slate-500">Unidades</span>
            </h4>
          </div>
        </div>
      </div>

      <!-- KPIs: Gastos e Insumos -->
      <div
        v-else-if="pestañaActiva === 'insumos'"
        class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 animate-fade-in"
      >
        <div
          class="bg-white border border-slate-100 rounded-2xl p-5 shadow-xl shadow-slate-200/40 md:col-span-2 flex flex-col justify-center relative overflow-hidden"
        >
          <div
            class="absolute -right-6 -top-6 w-24 h-24 bg-institucional-secundario/5 rounded-full blur-2xl"
          ></div>
          <div class="flex justify-between items-end mb-3 relative z-10">
            <div>
              <p
                class="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1.5"
              >
                Presupuesto Mensual de Insumos
              </p>
              <h4 class="text-3xl font-black text-slate-700">
                {{ formatearMoneda(kpisInsumos.consumoTotalMes) }}
                <span class="text-base font-bold text-slate-400"
                  >/
                  {{ formatearMoneda(kpisInsumos.presupuestoAsignado) }}</span
                >
              </h4>
            </div>
            <div class="text-right">
              <span
                class="px-2.5 py-1 rounded-lg text-xs font-bold"
                :class="
                  porcentajeInsumos > 90
                    ? 'bg-red-50 text-red-600'
                    : porcentajeInsumos > 75
                      ? 'bg-amber-50 text-amber-600'
                      : 'bg-emerald-50 text-emerald-600'
                "
              >
                {{ porcentajeInsumos.toFixed(1) }}% Consumido
              </span>
            </div>
          </div>
          <div
            class="w-full bg-slate-100 rounded-full h-2.5 relative z-10 overflow-hidden"
          >
            <div
              class="h-2.5 rounded-full transition-all duration-1000 ease-out"
              :class="
                porcentajeInsumos > 90
                  ? 'bg-red-500'
                  : porcentajeInsumos > 75
                    ? 'bg-amber-500'
                    : 'bg-institucional-secundario'
              "
              :style="{ width: `${Math.min(porcentajeInsumos, 100)}%` }"
            ></div>
          </div>
        </div>

        <div
          class="bg-white border border-slate-100 rounded-2xl p-5 shadow-xl shadow-slate-200/40 flex items-center gap-4"
        >
          <div class="p-3 bg-blue-50 rounded-xl text-blue-600">
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
                d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
          </div>
          <div>
            <p
              class="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1"
            >
              Compras Realizadas
            </p>
            <h4 class="text-2xl font-black text-slate-700">
              {{ kpisInsumos.totalCompras }}
              <span class="text-sm font-medium text-slate-500">Tickets</span>
            </h4>
          </div>
        </div>
      </div>

      <!-- ======================================================= -->
      <!-- MENÚ DE PESTAÑAS (TABS)                                 -->
      <!-- ======================================================= -->
      <div class="border-b border-slate-200 mb-6">
        <nav class="-mb-px flex space-x-8" aria-label="Tabs">
          <button
            @click="pestañaActiva = 'taller'"
            :class="
              pestañaActiva === 'taller'
                ? 'border-institucional-primario text-institucional-primario'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            "
            class="whitespace-nowrap py-4 px-2 border-b-2 font-bold text-[13px] flex items-center gap-2 transition-colors outline-none tracking-wide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2.5"
              stroke="currentColor"
              class="w-5 h-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
              />
            </svg>
            Ingresos a Taller
          </button>

          <button
            @click="pestañaActiva = 'insumos'"
            :class="
              pestañaActiva === 'insumos'
                ? 'border-institucional-primario text-institucional-primario'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            "
            class="whitespace-nowrap py-4 px-2 border-b-2 font-bold text-[13px] flex items-center gap-2 transition-colors outline-none tracking-wide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2.5"
              stroke="currentColor"
              class="w-5 h-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>
            Gastos e Insumos
          </button>
        </nav>
      </div>

      <!-- ======================================================= -->
      <!-- COMPONENTES HIJOS (TABLAS Y FORMULARIOS)                -->
      <!-- ======================================================= -->
      <!-- Al interactuar con el backend, le avisan al Padre que actualice los números (@actualizar-kpis) -->
      <TabTaller
        v-if="pestañaActiva === 'taller'"
        @actualizar-kpis="cargarKpisTaller"
      />
      <TabGastosInsumos
        v-else-if="pestañaActiva === 'insumos'"
        @actualizar-kpis="cargarKpisInsumos"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import TabTaller from "./TabTaller.vue";
import TabGastosInsumos from "./TabGastosInsumos.vue";

// Importaciones de servicios
import { supabase } from "../lib/supabaseClient";
import { MantenimientoService } from "../services/MantenimientoService";
import { GastosService } from "../services/GastosService";

// Estados Globales
const pestañaActiva = ref("taller");
const esAdmin = ref(false);
const cargandoPermisos = ref(true);

// Formateador de moneda MXN
const formatearMoneda = (cantidad: number) =>
  new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(
    cantidad,
  );

// =======================================================
// VALIDACIÓN DE SEGURIDAD (Capa Frontend)
// =======================================================
const verificarPermisos = async () => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      esAdmin.value = false;
      return;
    }

    const { data: perfil, error } = await supabase
      .from("perfiles")
      .select("rol")
      .eq("id", user.id)
      .single();

    if (error) throw error;

    // Coincidencia exacta con el valor guardado en tu BD Supabase
    esAdmin.value = perfil?.rol === "admin";
  } catch (error) {
    console.error("Error al verificar permisos de administrador:", error);
    esAdmin.value = false;
  } finally {
    cargandoPermisos.value = false;
  }
};

// =======================================================
// ESTADO Y LÓGICA DE KPIS: TALLER
// =======================================================
const kpisTaller = ref({
  presupuestoAsignado: 150000,
  consumoReal: 0,
  consumoArrendadoras: 0,
  enTaller: 0,
});
const porcentajeTaller = computed(() =>
  kpisTaller.value.presupuestoAsignado === 0
    ? 0
    : (kpisTaller.value.consumoReal / kpisTaller.value.presupuestoAsignado) *
      100,
);

const cargarKpisTaller = async () => {
  const hoy = new Date();
  const respuesta = await MantenimientoService.obtenerEstadisticasMensuales(
    hoy.getMonth() + 1,
    hoy.getFullYear(),
  );
  if (respuesta.success && respuesta.data) {
    kpisTaller.value = respuesta.data as any;
  }
};

// =======================================================
// ESTADO Y LÓGICA DE KPIS: INSUMOS
// =======================================================
const kpisInsumos = ref({
  presupuestoAsignado: 30000,
  consumoTotalMes: 0,
  totalCompras: 0,
});
const porcentajeInsumos = computed(() =>
  kpisInsumos.value.presupuestoAsignado === 0
    ? 0
    : (kpisInsumos.value.consumoTotalMes /
        kpisInsumos.value.presupuestoAsignado) *
      100,
);

const cargarKpisInsumos = async () => {
  const hoy = new Date();
  const respuesta = await GastosService.obtenerKPIsMensuales(
    hoy.getMonth() + 1,
    hoy.getFullYear(),
  );
  if (respuesta.success && respuesta.data) {
    kpisInsumos.value = respuesta.data as any;
  }
};

// =======================================================
// CICLO DE VIDA (INIT)
// =======================================================
onMounted(async () => {
  // Primero verificamos que sea administrador
  await verificarPermisos();

  // Si la verificación es exitosa, cargamos la información financiera
  if (esAdmin.value) {
    cargarKpisTaller();
    cargarKpisInsumos();
  }
});
</script>

<style scoped>
.font-sans {
  font-family: "Inter", sans-serif !important;
}
.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
.animate-fade-in {
  animation: fadeIn 0.3s ease-out forwards;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
