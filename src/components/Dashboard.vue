<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { supabase } from "../lib/supabaseClient";
// @ts-ignore
import html2pdf from "html2pdf.js";

const router = useRouter();

// =========================================================================
// SISTEMA DE NOTIFICACIONES (TOAST)
// =========================================================================
const toast = ref({ visible: false, mensaje: "", tipo: "success" });
let toastTimer: any = null;

const mostrarToast = (mensaje: string, tipo = "success") => {
  if (toastTimer) clearTimeout(toastTimer);
  toast.value = { visible: true, mensaje, tipo };
  toastTimer = setTimeout(() => {
    toast.value.visible = false;
  }, 3000);
};

// =========================================================================
// ACCIÓN: DESCARGA DIRECTA DE REPORTE PDF (1 Sola Página Forzada)
// =========================================================================
const reportePdfRef = ref<HTMLElement | null>(null);
const generandoPDF = ref(false);
const fechaReporteFormateada = ref("");
const fechaLargaFormateada = ref("");

const generarReportePDF = () => {
  generandoPDF.value = true;
  mostrarToast("Estructurando y descargando documento PDF...", "success");

  const ahora = new Date();
  fechaReporteFormateada.value = ahora.toLocaleDateString("es-MX", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  fechaLargaFormateada.value = ahora.toLocaleDateString("es-MX", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  setTimeout(() => {
    const elemento = reportePdfRef.value;

    const opciones = {
      margin: 0,
      filename: `Reporte_COREV_${ahora.getTime()}.pdf`,
      image: { type: "jpeg", quality: 1 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        windowWidth: 816, // Ancho exacto Carta en píxeles
      },
      jsPDF: { unit: "px", format: [816, 1056], orientation: "portrait" },
    };

    html2pdf()
      .set(opciones)
      .from(elemento)
      .save()
      .then(() => {
        generandoPDF.value = false;
        mostrarToast("Reporte descargado exitosamente.", "success");
      });
  }, 500);
};

// =========================================================================
// 1. ESTADO REACTIVO: PRESUPUESTO (Consumo y Tope Dinámicos)
// =========================================================================
const presupuestoConsumido = ref(0);
const presupuestoTotal = ref(0);
const cargandoPresupuesto = ref(true);

const porcentajePresupuesto = computed(() => {
  if (presupuestoTotal.value === 0) return 0;
  const porcentaje =
    (presupuestoConsumido.value / presupuestoTotal.value) * 100;
  return Math.min(Math.round(porcentaje), 100);
});

const cargarPresupuestoMensual = async () => {
  try {
    cargandoPresupuesto.value = true;

    const fechaActual = new Date();
    // Para consumo (tickets) usamos rangos de fecha de created_at
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

    // Para el presupuesto, extraemos año y mes
    const anioActual = fechaActual.getFullYear();
    const mesActualNumero = fechaActual.getMonth() + 1;

    const [consultaConsumo, consultaAsignacion] = await Promise.all([
      // A. Consultar el Gasto Real
      supabase
        .from("cargas_combustible")
        .select("costo_total")
        .gte("created_at", primerDiaMes)
        .lte("created_at", ultimoDiaMes),

      // B. Consultar el Presupuesto Asignado del mes
      supabase
        .from("presupuestos_combustible")
        .select("monto_presupuesto")
        .eq("anio", anioActual)
        .eq("mes", mesActualNumero),
    ]);

    if (consultaConsumo.error) throw consultaConsumo.error;
    if (consultaAsignacion.error) throw consultaAsignacion.error;

    // 1. Sumarizamos el Consumo Real
    if (consultaConsumo.data && consultaConsumo.data.length > 0) {
      presupuestoConsumido.value = consultaConsumo.data.reduce(
        (acc, reg) => acc + (Number(reg.costo_total) || 0),
        0,
      );
    } else {
      presupuestoConsumido.value = 0;
    }

    // 2. Sumarizamos el Presupuesto Total Autorizado en el mes
    if (consultaAsignacion.data && consultaAsignacion.data.length > 0) {
      presupuestoTotal.value = consultaAsignacion.data.reduce(
        (acc, reg) => acc + (Number(reg.monto_presupuesto) || 0),
        0,
      );
    } else {
      presupuestoTotal.value = 0;
    }
  } catch (error: any) {
    console.error("Error al cargar el presupuesto:", error.message);
  } finally {
    cargandoPresupuesto.value = false;
  }
};

// =========================================================================
// 2. ESTADO REACTIVO: OPERACIÓN
// =========================================================================
const unidadesEnRuta = ref(0);
const unidadesTotales = ref(0);
const cargandoOperacion = ref(true);

const cargarOperacionEnRuta = async () => {
  try {
    cargandoOperacion.value = true;
    const [cViajes, cUnidades] = await Promise.all([
      supabase
        .from("viajes_operativos")
        .select("*", { count: "exact", head: true })
        .eq("estado", "EN_RUTA"),
      supabase
        .from("catalogo_unidades")
        .select("*", { count: "exact", head: true }),
    ]);
    unidadesEnRuta.value = cViajes.count || 0;
    unidadesTotales.value = cUnidades.count || 0;
  } catch (error: any) {
    console.error("Error operación:", error.message);
  } finally {
    cargandoOperacion.value = false;
  }
};

// =========================================================================
// 3. ESTADO REACTIVO: ALERTAS
// =========================================================================
const alertasPreventivas = ref(0);
const alertasCriticas = ref(0);
const cargandoAlertas = ref(true);
const totalAlertas = computed(
  () => alertasPreventivas.value + alertasCriticas.value,
);

const cargarAlertasMantenimiento = async () => {
  try {
    cargandoAlertas.value = true;
    const estatus = ["PENDIENTE", "EN TALLER", "EN PROCESO"];
    const [cCorr, cPrev, vVenc] = await Promise.all([
      supabase
        .from("control_mantenimientos")
        .select("*", { count: "exact", head: true })
        .in("estatus_servicio", estatus)
        .ilike("categoria", "%CORRECTIVO%"),
      supabase
        .from("control_mantenimientos")
        .select("*", { count: "exact", head: true })
        .in("estatus_servicio", estatus)
        .ilike("categoria", "%PREVENTIVO%"),
      supabase
        .from("catalogo_unidades")
        .select("kilometraje_actual, proximo_mantenimiento_km"),
    ]);

    let aKm = 0;
    if (vVenc.data) {
      aKm = vVenc.data.filter(
        (u) =>
          Number(u.proximo_mantenimiento_km) > 0 &&
          Number(u.kilometraje_actual) >=
            Number(u.proximo_mantenimiento_km) - 500,
      ).length;
    }
    alertasCriticas.value = cCorr.count || 0;
    alertasPreventivas.value = (cPrev.count || 0) + aKm;
  } catch (error: any) {
    console.error("Error alertas:", error.message);
  } finally {
    cargandoAlertas.value = false;
  }
};

// =========================================================================
// 4. ESTADO REACTIVO: TENDENCIA SEMANAL
// =========================================================================
const tendenciaDatos = ref<any[]>([]);
const cargandoTendencia = ref(true);
const selectorFiltroAbierto = ref(false);
const filtroTendencia = ref("7dias");
const filtrosTendencia = [
  { id: "7dias", label: "Últimos 7 días" },
  { id: "semana_pasada", label: "Semana Anterior" },
];

const filtroSeleccionadoLabel = computed(
  () =>
    filtrosTendencia.find((f) => f.id === filtroTendencia.value)?.label ||
    "Últimos 7 días",
);
const toggleSelectorFiltro = () => {
  selectorFiltroAbierto.value = !selectorFiltroAbierto.value;
};

const seleccionarFiltro = async (id: string) => {
  filtroTendencia.value = id;
  selectorFiltroAbierto.value = false;
  if (tendenciaDatos.value.length > 0) {
    tendenciaDatos.value.forEach((dia) => {
      dia.porcentaje = 0;
      dia.totalFormateado = "";
    });
  }
  setTimeout(() => {
    cargarTendenciaSemanal();
  }, 300);
};

const cargarTendenciaSemanal = async () => {
  try {
    if (tendenciaDatos.value.length === 0) cargandoTendencia.value = true;
    const nombres = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
    const bloque = [];
    const offset = filtroTendencia.value === "semana_pasada" ? 7 : 0;
    const inicio = new Date();
    inicio.setDate(inicio.getDate() - 6 - offset);
    inicio.setHours(0, 0, 0, 0);
    const fin = new Date();
    fin.setDate(fin.getDate() - offset);
    fin.setHours(23, 59, 59, 999);

    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i - offset);
      bloque.push({
        diaNombre: nombres[d.getDay()],
        fechaCorta: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`,
        total: 0,
        porcentaje: 0,
        esMaximo: false,
        totalFormateado: "",
      });
    }
    tendenciaDatos.value = bloque;
    cargandoTendencia.value = false;

    const { data } = await supabase
      .from("cargas_combustible")
      .select("costo_total, created_at")
      .gte("created_at", inicio.toISOString())
      .lte("created_at", fin.toISOString());
    if (data) {
      data.forEach((carga) => {
        const fc = new Date(carga.created_at);
        const dia = bloque.find(
          (d) =>
            d.fechaCorta ===
            `${fc.getFullYear()}-${String(fc.getMonth() + 1).padStart(2, "0")}-${String(fc.getDate()).padStart(2, "0")}`,
        );
        if (dia) dia.total += Number(carga.costo_total) || 0;
      });
    }

    const max = Math.max(...bloque.map((d) => d.total));
    setTimeout(() => {
      bloque.forEach((dia) => {
        dia.totalFormateado =
          dia.total >= 1000
            ? "$" + (dia.total / 1000).toFixed(1) + "k"
            : "$" + dia.total.toFixed(0);
        dia.porcentaje = max === 0 ? 5 : Math.max((dia.total / max) * 90, 5);
        dia.esMaximo = dia.total === max && max > 0;
      });
      tendenciaDatos.value = [...bloque];
    }, 50);
  } catch (error) {
    console.error("Error tendencia:", error);
  }
};

// =========================================================================
// 5. ESTADO REACTIVO: MONITOR EN VIVO
// =========================================================================
const actividadReciente = ref<any[]>([]);
const cargandoMonitor = ref(true);

const obtenerTiempoRelativo = (fechaISO: string) => {
  const diff = Math.floor(
    (new Date().getTime() - new Date(fechaISO).getTime()) / 60000,
  );
  if (diff < 1) return "Hace un momento";
  if (diff < 60) return `Hace ${diff} min`;
  if (diff / 60 < 24) return `Hace ${Math.floor(diff / 60)} horas`;
  return `Hace ${Math.floor(diff / 1440)} días`;
};

const cargarMonitorEnVivo = async () => {
  try {
    cargandoMonitor.value = true;
    const eventos: any[] = [];
    const [rComb, rViajes, rMant] = await Promise.all([
      supabase
        .from("cargas_combustible")
        .select("created_at, costo_total, catalogo_unidades(numero_economico)")
        .order("created_at", { ascending: false })
        .limit(5),
      supabase
        .from("viajes_operativos")
        .select("created_at, estado, catalogo_unidades(numero_economico)")
        .order("created_at", { ascending: false })
        .limit(5),
      supabase
        .from("control_mantenimientos")
        .select(
          "created_at, categoria, estatus_servicio, catalogo_unidades(numero_economico)",
        )
        .order("created_at", { ascending: false })
        .limit(5),
    ]);

    rComb.data?.forEach((c: any) =>
      eventos.push({
        id: `c-${c.created_at}`,
        f: new Date(c.created_at),
        t: obtenerTiempoRelativo(c.created_at),
        tit: "Carga Combustible",
        det: `Unidad ${c.catalogo_unidades?.numero_economico || "N/D"} | $${Number(c.costo_total).toLocaleString("es-MX")} MXN`,
        col: "bg-teal-500",
      }),
    );
    rViajes.data?.forEach((v: any) => {
      const sal = v.estado === "EN_RUTA";
      eventos.push({
        id: `v-${v.created_at}`,
        f: new Date(v.created_at),
        t: obtenerTiempoRelativo(v.created_at),
        tit: sal ? "Salida de Unidad" : "Retorno a Base",
        det: `Unidad ${v.catalogo_unidades?.numero_economico || "N/D"} | ${sal ? "En operación" : "Finalizado"}`,
        col: sal ? "bg-blue-500" : "bg-slate-400",
      });
    });
    rMant.data?.forEach((m: any) => {
      const crit = m.categoria?.toUpperCase().includes("CORRECTIVO");
      eventos.push({
        id: `m-${m.created_at}`,
        f: new Date(m.created_at),
        t: obtenerTiempoRelativo(m.created_at),
        tit: "Mantenimiento",
        det: `Unidad ${m.catalogo_unidades?.numero_economico || "N/D"} | Estatus: ${m.estatus_servicio}`,
        col: crit ? "bg-rose-500" : "bg-amber-500",
      });
    });

    eventos.sort((a, b) => b.f.getTime() - a.f.getTime());
    actividadReciente.value = eventos.slice(0, 6);
  } catch (error) {
    console.error("Error monitor:", error);
  } finally {
    cargandoMonitor.value = false;
  }
};

onMounted(() => {
  cargarPresupuestoMensual();
  cargarOperacionEnRuta();
  cargarAlertasMantenimiento();
  cargarTendenciaSemanal();
  cargarMonitorEnVivo();
});
</script>

<template>
  <div>
    <!-- ======================================================================= -->
    <!-- INTERFAZ: DASHBOARD VISUAL                                              -->
    <!-- ======================================================================= -->
    <div class="p-8 max-w-7xl mx-auto space-y-8 animate-fade-in">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-2xl font-black text-slate-800 tracking-tight">
            Panel Central
          </h2>
          <p class="text-slate-500 text-sm font-medium mt-1">
            Resumen operativo y financiero de la flotilla.
          </p>
        </div>

        <button
          @click="generarReportePDF"
          :disabled="generandoPDF"
          class="bg-[#042f2e] hover:bg-[#042f2e]/90 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-md shadow-darkcyan/20 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-wait"
        >
          <svg
            v-if="!generandoPDF"
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
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
            />
          </svg>
          <svg
            v-else
            class="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
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
          {{ generandoPDF ? "Procesando..." : "Descargar Reporte PDF" }}
        </button>
      </div>

      <!-- Z-PATTERN: FILA 1 -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- KPI 1 -->
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
              class="text-xs font-bold px-2.5 py-1 rounded-lg"
              :class="
                porcentajePresupuesto > 90
                  ? 'bg-rose-50 text-rose-600'
                  : 'bg-teal-50 text-teal-600'
              "
              >Mes Actual</span
            >
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

        <!-- KPI 2 -->
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
            ></span>
            {{ unidadesEnRuta }} retornos esperados hoy.
          </div>
        </div>

        <!-- KPI 3 -->
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
            <div
              v-if="cargandoAlertas"
              class="h-9 w-1/2 bg-slate-200 animate-pulse rounded-lg mt-1"
            ></div>
            <div v-else class="flex items-baseline gap-2">
              <h3 class="text-3xl font-black text-slate-800">
                {{ totalAlertas }}
              </h3>
              <span class="text-sm font-medium text-slate-400"
                >alertas activas</span
              >
            </div>
          </div>
          <div class="mt-5 flex gap-2">
            <div class="flex-1 bg-amber-50 rounded-xl p-2 text-center">
              <span
                v-if="cargandoAlertas"
                class="block h-6 w-8 bg-amber-200 animate-pulse rounded mx-auto mb-1"
              ></span>
              <span v-else class="block text-lg font-black text-amber-600">{{
                alertasPreventivas
              }}</span>
              <span class="block text-[10px] font-bold text-amber-700 uppercase"
                >Preventivos</span
              >
            </div>
            <div class="flex-1 bg-rose-50 rounded-xl p-2 text-center">
              <span
                v-if="cargandoAlertas"
                class="block h-6 w-8 bg-rose-200 animate-pulse rounded mx-auto mb-1"
              ></span>
              <span v-else class="block text-lg font-black text-rose-600">{{
                alertasCriticas
              }}</span>
              <span class="block text-[10px] font-bold text-rose-700 uppercase"
                >Críticos</span
              >
            </div>
          </div>
        </div>
      </div>

      <!-- Z-PATTERN: FILA 2 -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- TENDENCIA -->
        <div
          class="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col relative overflow-hidden group"
        >
          <div class="flex justify-between items-center mb-6 relative z-30">
            <div>
              <h3 class="text-lg font-bold text-slate-800">
                Tendencia de Combustible
              </h3>
              <p class="text-sm text-slate-400 font-medium">
                Gasto diario por periodo
              </p>
            </div>
            <div class="relative">
              <button
                @click="toggleSelectorFiltro"
                type="button"
                class="flex items-center justify-between gap-3 bg-white border border-slate-200 text-slate-700 text-sm font-bold rounded-xl px-4 py-2 hover:border-[#042f2e]/50 focus:ring-4 focus:ring-[#042f2e]/10 transition-all outline-none min-w-[170px]"
                :class="
                  selectorFiltroAbierto
                    ? 'border-[#042f2e] ring-4 ring-[#042f2e]/10'
                    : ''
                "
              >
                <span>{{ filtroSeleccionadoLabel }}</span>
                <svg
                  class="w-4 h-4 text-slate-400 transition-transform duration-200"
                  :class="{ 'rotate-180': selectorFiltroAbierto }"
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
              <Transition name="dropdown">
                <div
                  v-if="selectorFiltroAbierto"
                  class="absolute top-full right-0 mt-2 w-full bg-white rounded-xl shadow-xl border border-slate-100 z-50 overflow-hidden flex flex-col"
                >
                  <button
                    v-for="o in filtrosTendencia"
                    :key="o.id"
                    @click="seleccionarFiltro(o.id)"
                    type="button"
                    class="text-left px-4 py-2.5 text-sm transition-colors border-b border-slate-50 last:border-0"
                    :class="
                      filtroTendencia === o.id
                        ? 'bg-[#042f2e]/10 text-[#042f2e] font-bold'
                        : 'text-slate-600 hover:bg-slate-50 font-medium'
                    "
                  >
                    {{ o.label }}
                  </button>
                </div>
              </Transition>
            </div>
            <div
              v-if="selectorFiltroAbierto"
              @click="selectorFiltroAbierto = false"
              class="fixed inset-0 z-20"
            ></div>
          </div>
          <div
            class="flex-1 flex items-end gap-4 h-64 mt-4 border-b border-slate-100 pb-2 relative z-10"
          >
            <div
              v-if="cargandoTendencia"
              class="absolute inset-0 flex items-end gap-4 pb-0"
            >
              <div
                v-for="i in 7"
                :key="i"
                class="flex-1 bg-slate-100 animate-pulse rounded-t-lg"
                :style="`height: ${Math.random() * 60 + 20}%`"
              ></div>
            </div>
            <div
              v-else
              v-for="dia in tendenciaDatos"
              :key="dia.fechaCorta"
              class="flex-1 flex flex-col justify-end items-center gap-2 group/bar h-full"
            >
              <div
                class="w-full rounded-t-lg transition-all duration-[1000ms] ease-out relative flex justify-center"
                :class="
                  dia.esMaximo
                    ? 'bg-[#042f2e] shadow-lg shadow-darkcyan/30 hover:bg-[#042f2e]/90'
                    : 'bg-teal-400 hover:bg-teal-500 shadow-sm shadow-teal-400/20'
                "
                :style="`height: ${dia.porcentaje}%`"
              >
                <span
                  class="absolute -top-7 text-[11px] font-black opacity-0 group-hover/bar:opacity-100 transition-all duration-300 transform translate-y-2 group-hover/bar:translate-y-0"
                  :class="dia.esMaximo ? 'text-[#042f2e]' : 'text-slate-600'"
                  >{{ dia.totalFormateado }}</span
                >
              </div>
              <span
                class="text-xs font-bold transition-colors"
                :class="dia.esMaximo ? 'text-slate-800' : 'text-slate-400'"
                >{{ dia.diaNombre }}</span
              >
            </div>
          </div>
        </div>

        <!-- MONITOR EN VIVO -->
        <div
          class="lg:col-span-1 bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col relative"
        >
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-lg font-bold text-slate-800">Monitor en Vivo</h3>
            <span class="flex h-3 w-3 relative"
              ><span
                class="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"
              ></span
              ><span
                class="relative inline-flex rounded-full h-3 w-3 bg-teal-500"
              ></span
            ></span>
          </div>
          <div
            class="flex-1 overflow-y-auto hide-scrollbar pr-2 min-h-[250px] relative"
          >
            <div
              v-if="cargandoMonitor"
              class="absolute inset-0 flex flex-col gap-6 justify-center"
            >
              <div v-for="i in 4" :key="i" class="flex gap-4">
                <div
                  class="w-2 h-2 rounded-full bg-slate-200 mt-2 shrink-0"
                ></div>
                <div class="flex flex-col gap-2 w-full">
                  <div
                    class="h-2 w-16 bg-slate-200 rounded animate-pulse"
                  ></div>
                  <div
                    class="h-3 w-3/4 bg-slate-200 rounded animate-pulse"
                  ></div>
                </div>
              </div>
            </div>
            <div
              v-else-if="actividadReciente.length === 0"
              class="flex items-center justify-center h-full text-sm text-slate-400 font-medium text-center"
            >
              Aún no hay actividad reciente en el sistema.
            </div>
            <div
              v-else
              class="relative border-l-2 border-slate-100 ml-3 space-y-6"
            >
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
                    item.t
                  }}</span>
                  <span class="text-sm font-bold text-slate-800">{{
                    item.tit
                  }}</span>
                  <span class="text-xs font-medium text-slate-500 mt-1">{{
                    item.det
                  }}</span>
                </div>
              </div>
            </div>
          </div>
          <button
            @click="router.push('/historial')"
            class="w-full mt-4 py-3 bg-slate-50 hover:bg-slate-100 text-slate-600 text-sm font-bold rounded-xl transition-colors cursor-pointer border border-transparent hover:border-slate-200"
          >
            Ver todo el historial
          </button>
        </div>
      </div>
    </div>

    <!-- ======================================================================= -->
    <!-- MODO PANTALLA: CONTENEDOR FANTASMA PARA PDF (1 Sola Página Rígida)      -->
    <!-- ======================================================================= -->
    <div class="pdf-ghost-container">
      <div
        ref="reportePdfRef"
        class="w-[816px] h-[1056px] bg-white text-black font-sans leading-relaxed p-10 mx-auto flex flex-col"
      >
        <!-- Encabezado del Documento -->
        <div
          class="border-b-[3px] border-[#042f2e] pb-4 mb-5 flex items-end justify-between shrink-0"
        >
          <div class="flex items-center gap-4">
            <div
              class="w-12 h-12 bg-[#042f2e] rounded-xl flex items-center justify-center shrink-0"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="white"
                class="w-7 h-7"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                />
              </svg>
            </div>
            <div>
              <h1
                class="text-2xl font-black text-[#042f2e] uppercase tracking-tight leading-none"
              >
                COREV
              </h1>
              <p
                class="text-[10px] text-slate-500 font-bold tracking-widest uppercase mt-1"
              >
                Control Operativo y Rastreo de Vehículos
              </p>
            </div>
          </div>
          <div class="text-right">
            <p
              class="text-base font-bold text-slate-800 uppercase tracking-wide"
            >
              Reporte Ejecutivo de Operaciones
            </p>
            <p class="text-xs text-slate-500 mt-1">
              Folio:
              <span class="font-mono text-slate-700 font-bold"
                >#{{ new Date().getTime().toString().slice(-6) }}</span
              >
            </p>
          </div>
        </div>

        <!-- Lugar y Fecha -->
        <div class="text-right mb-6 text-slate-700 text-sm shrink-0">
          <p>Monterrey, Nuevo León, a {{ fechaLargaFormateada }}.</p>
        </div>

        <!-- Introducción -->
        <p
          class="text-justify text-slate-700 mb-6 leading-relaxed text-sm shrink-0"
        >
          A quien corresponda:<br /><br />
          Por medio del presente documento, se expide el informe oficial
          correspondiente al estado operativo, financiero y de mantenimiento de
          la flotilla administrada bajo la plataforma COREV. Los datos
          presentados a continuación son un reflejo exacto de la base de datos
          central al momento de la emisión de este reporte ({{
            fechaReporteFormateada
          }}).
        </p>

        <!-- Bloques de Información -->
        <div class="space-y-6 flex-1">
          <!-- Estado Financiero -->
          <div>
            <h2
              class="text-base font-black text-[#042f2e] border-b border-slate-300 pb-1 mb-3 uppercase tracking-wider"
            >
              1. Estado Financiero (Combustible)
            </h2>
            <p class="text-slate-700 mb-3 text-sm">
              Durante el periodo operativo actual, se ha registrado un nivel de
              consumo detallado de la siguiente manera:
            </p>
            <div
              class="bg-slate-50/50 p-4 rounded-xl border border-slate-200 flex justify-between items-center"
            >
              <div>
                <p
                  class="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1"
                >
                  Presupuesto Consumido
                </p>
                <p class="text-2xl font-black text-slate-800">
                  ${{
                    presupuestoConsumido.toLocaleString("es-MX", {
                      minimumFractionDigits: 2,
                    })
                  }}
                  MXN
                </p>
              </div>
              <div class="text-right">
                <p
                  class="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1"
                >
                  Tope Autorizado
                </p>
                <p class="text-lg font-bold text-slate-600">
                  ${{ presupuestoTotal.toLocaleString("es-MX") }} MXN
                </p>
              </div>
              <div class="text-right pl-6 border-l-2 border-slate-200">
                <p
                  class="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1"
                >
                  Desgaste Actual
                </p>
                <p
                  class="text-2xl font-black"
                  :class="
                    porcentajePresupuesto > 90
                      ? 'text-red-600'
                      : 'text-teal-600'
                  "
                >
                  {{ porcentajePresupuesto }}%
                </p>
              </div>
            </div>
          </div>

          <!-- Estado Operativo -->
          <div>
            <h2
              class="text-base font-black text-[#042f2e] border-b border-slate-300 pb-1 mb-3 uppercase tracking-wider"
            >
              2. Capacidad Operativa
            </h2>
            <p
              class="text-sm text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-lg border-l-4 border-blue-500"
            >
              De un parque vehicular registrado de
              <strong>{{ unidadesTotales }} unidades activas</strong>, el
              sistema telemático reporta que actualmente
              <strong
                >{{ unidadesEnRuta }} vehículos se encuentran
                desplegados</strong
              >
              y en operación activa (en ruta).
            </p>
          </div>

          <!-- Estado de Mantenimiento -->
          <div>
            <h2
              class="text-base font-black text-[#042f2e] border-b border-slate-300 pb-1 mb-3 uppercase tracking-wider"
            >
              3. Alertas de Mantenimiento
            </h2>
            <p class="text-sm text-slate-700 mb-3">
              El módulo central ha identificado un total de
              <strong
                >{{ totalAlertas }} atenciones mecánicas en proceso o
                requeridas</strong
              >, clasificadas según su prioridad institucional:
            </p>
            <div class="grid grid-cols-2 gap-4">
              <div
                class="border border-rose-200 bg-rose-50/30 p-3.5 rounded-xl"
              >
                <p
                  class="text-[10px] text-rose-600 uppercase font-bold tracking-widest mb-1"
                >
                  Mantenimiento Correctivo
                </p>
                <p class="text-xl font-black text-slate-800">
                  {{ alertasCriticas }} Unidades
                </p>
                <p class="text-[10px] text-slate-500 mt-1">
                  Requieren atención inmediata por falla reportada.
                </p>
              </div>
              <div
                class="border border-amber-200 bg-amber-50/30 p-3.5 rounded-xl"
              >
                <p
                  class="text-[10px] text-amber-600 uppercase font-bold tracking-widest mb-1"
                >
                  Mantenimiento Preventivo
                </p>
                <p class="text-xl font-black text-slate-800">
                  {{ alertasPreventivas }} Unidades
                </p>
                <p class="text-[10px] text-slate-500 mt-1">
                  Próximas a rebasar límite de kilometraje de seguridad.
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Firmas -->
        <div class="mt-auto pt-6 grid grid-cols-2 gap-12 text-center shrink-0">
          <div>
            <div class="border-b-2 border-slate-400 w-full mx-auto mb-2"></div>
            <p
              class="text-xs font-black text-[#042f2e] uppercase tracking-wider"
            >
              Francisco Javier Cangas Zúñiga
            </p>
            <p class="text-[10px] text-slate-500 font-medium mt-1 uppercase">
              Auxiliar Administrativo
            </p>
          </div>
          <div>
            <div class="border-b-2 border-slate-400 w-full mx-auto mb-2"></div>
            <p
              class="text-xs font-black text-[#042f2e] uppercase tracking-wider"
            >
              Vo. Bo. Autorización
            </p>
            <p class="text-[10px] text-slate-500 font-medium mt-1 uppercase">
              Dirección Operativa
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- TOAST DE NOTIFICACIÓN GLOBAL -->
  <Teleport to="body">
    <Transition name="toast">
      <div
        v-if="toast.visible"
        class="fixed bottom-6 right-6 z-[200] flex items-center gap-3.5 px-6 py-4 rounded-2xl shadow-2xl border text-white transition-all transform backdrop-blur-md bg-slate-900/95 border-slate-800"
      >
        <div
          class="p-2 rounded-xl shrink-0"
          :class="
            toast.tipo === 'success'
              ? 'bg-teal-500/20 text-teal-400'
              : 'bg-white/20 text-white'
          "
        >
          <svg
            class="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2.5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <div class="flex flex-col pr-2">
          <span
            class="text-[11px] font-bold uppercase tracking-wider text-slate-400"
            >Notificación COREV</span
          >
          <span class="text-sm font-medium text-white">{{
            toast.mensaje
          }}</span>
        </div>
      </div>
    </Transition>
  </Teleport>
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

.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}
.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-5px) scale(0.98);
}
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}

/* CLASE MAGISTRAL PARA EL PDF INVISIBLE */
.pdf-ghost-container {
  position: absolute;
  top: -9999px;
  left: 0;
  width: 816px;
  height: 1056px;
  z-index: -100;
  opacity: 0;
  pointer-events: none;
}
</style>
