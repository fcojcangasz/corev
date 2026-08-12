<template>
  <div class="animate-fade-in">
    <!-- ======================================================= -->
    <!-- TABLA DE HISTORIAL DE COMPRAS                           -->
    <!-- ======================================================= -->
    <div
      class="bg-white border border-slate-100 rounded-2xl shadow-xl shadow-slate-200/40 relative z-10 flex flex-col"
    >
      <div
        class="bg-slate-50 border-b border-slate-100 px-6 sm:px-8 py-5 flex items-center justify-between rounded-t-2xl"
      >
        <div class="flex items-center gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2.5"
            stroke="currentColor"
            class="w-5 h-5 text-institucional-primario"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
          <h3 class="text-sm font-bold text-slate-700 uppercase tracking-wider">
            Historial de Compras
          </h3>
        </div>
        <button
          @click="abrirModal"
          class="px-5 py-2.5 text-xs font-bold text-white bg-institucional-secundario hover:bg-orange-600 rounded-lg shadow-md shadow-orange-500/20 transition-all active:scale-95 flex items-center gap-2 uppercase tracking-wider"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2.5"
            stroke="currentColor"
            class="w-4 h-4"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Registrar Compra
        </button>
      </div>

      <div class="overflow-x-auto rounded-b-2xl">
        <table class="w-full text-left border-collapse min-w-[900px]">
          <thead>
            <tr class="bg-white border-b border-slate-100">
              <th
                class="py-3 px-6 font-semibold text-xs text-slate-500 uppercase tracking-wider"
              >
                Fecha / Unidad
              </th>
              <th
                class="py-3 px-6 font-semibold text-xs text-slate-500 uppercase tracking-wider"
              >
                Concepto de Insumo
              </th>
              <th
                class="py-3 px-6 font-semibold text-xs text-slate-500 uppercase tracking-wider"
              >
                Comercio
              </th>
              <th
                class="py-3 px-6 font-semibold text-xs text-slate-500 uppercase tracking-wider"
              >
                Inversión
              </th>
              <th
                class="py-3 px-6 font-semibold text-xs text-slate-500 uppercase tracking-wider text-center"
              >
                Factura
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 bg-white">
            <tr v-if="cargandoTabla">
              <td
                colspan="5"
                class="py-12 text-center text-slate-500 text-sm font-medium"
              >
                Consultando registros...
              </td>
            </tr>
            <tr v-else-if="listaGastos.length === 0">
              <td
                colspan="5"
                class="py-12 text-center text-slate-500 text-sm font-medium"
              >
                No hay compras registradas en el periodo.
              </td>
            </tr>
            <tr
              v-else
              v-for="gasto in listaGastos"
              :key="gasto.id_gasto"
              class="hover:bg-slate-50/80 transition-colors group"
            >
              <td class="py-4 px-6">
                <span class="font-bold text-slate-700 text-sm block">{{
                  gasto.fecha_compra
                }}</span>
                <span
                  class="text-xs text-slate-500 mt-0.5 group-hover:text-institucional-primario transition-colors font-medium"
                >
                  {{ gasto.catalogo_unidades?.numero_economico || "General" }}
                </span>
              </td>
              <td
                class="py-4 px-6 text-sm font-medium text-slate-700 max-w-xs truncate"
                :title="gasto.concepto"
              >
                {{ gasto.concepto }}
              </td>
              <td class="py-4 px-6 text-sm text-slate-600">
                {{ gasto.proveedor_comercio }}
              </td>
              <td
                class="py-4 px-6 text-sm font-black text-institucional-secundario"
              >
                {{ formatearMoneda(gasto.monto_factura) }}
              </td>
              <td class="py-4 px-6 text-center">
                <a
                  :href="gasto.url_factura"
                  target="_blank"
                  class="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors uppercase tracking-wider"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    class="w-3.5 h-3.5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                    />
                  </svg>
                  Evidencia
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- ======================================================= -->
    <!-- MODAL: REGISTRO DE COMPRA / INSUMO                      -->
    <!-- ======================================================= -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="mostrarModal" class="fixed inset-0 z-[100] overflow-y-auto">
          <div
            class="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
            @click="cerrarModal"
          ></div>
          <div class="flex min-h-full items-center justify-center p-4 sm:p-0">
            <div
              class="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl flex flex-col transform transition-all font-sans my-8"
            >
              <div
                class="bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between rounded-t-2xl relative z-20"
              >
                <h3 class="text-institucional-primario text-lg font-bold">
                  Registrar Compra o Insumo
                </h3>
                <button
                  @click="cerrarModal"
                  class="text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors rounded-full p-1.5 active:scale-95"
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div class="p-6 sm:p-8 overflow-visible relative z-30">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <!-- SELECTOR UNIDAD -->
                  <div
                    class="sm:col-span-1 relative"
                    :class="selectorUnidadAbierto ? 'z-[100]' : 'z-30'"
                  >
                    <label
                      class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2"
                      >Destino / Vehículo
                      <span class="text-red-500">*</span></label
                    >
                    <button
                      @click="toggleSelectorUnidad"
                      type="button"
                      class="w-full flex items-center justify-between px-4 py-3 bg-white border text-left transition-all rounded-xl outline-none cursor-pointer"
                      :class="
                        selectorUnidadAbierto
                          ? 'border-institucional-primario ring-4 ring-institucional-primario/10'
                          : 'border-slate-200 text-slate-700 hover:border-slate-300'
                      "
                    >
                      <div class="flex items-center gap-3 truncate">
                        <svg
                          class="w-5 h-5 text-slate-400 shrink-0"
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
                        <div
                          class="flex flex-col truncate"
                          v-if="unidadSeleccionadaObj"
                        >
                          <span class="text-slate-800 font-bold text-sm">{{
                            unidadSeleccionadaObj.numero_economico
                          }}</span>
                        </div>
                        <span v-else class="text-slate-400 text-sm">{{
                          cargandoVehiculos
                            ? "Cargando..."
                            : "Seleccione unidad..."
                        }}</span>
                      </div>
                      <svg
                        class="w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200"
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
                    <Transition name="dropdown">
                      <div
                        v-if="selectorUnidadAbierto"
                        class="absolute top-full left-0 mt-2 w-full bg-white rounded-xl shadow-2xl border border-slate-100 z-50 overflow-hidden flex flex-col"
                      >
                        <div
                          class="max-h-56 overflow-y-auto hide-scrollbar py-2"
                        >
                          <button
                            v-for="unidad in unidadesOperativas"
                            :key="unidad.id_unidad"
                            @click="seleccionarUnidad(unidad)"
                            type="button"
                            class="w-full text-left px-4 py-2.5 transition-colors border-b border-slate-50 last:border-0 hover:bg-slate-50"
                            :class="
                              formulario.id_unidad ===
                              unidad.id_unidad.toString()
                                ? 'bg-institucional-primario/10'
                                : ''
                            "
                          >
                            <span
                              class="text-sm font-bold block"
                              :class="
                                formulario.id_unidad ===
                                unidad.id_unidad.toString()
                                  ? 'text-institucional-primario'
                                  : 'text-slate-700'
                              "
                              >{{ unidad.numero_economico }}</span
                            >
                            <span class="text-[11px] text-slate-500">{{
                              unidad.modelo
                            }}</span>
                          </button>
                        </div>
                      </div>
                    </Transition>
                    <div
                      v-if="selectorUnidadAbierto"
                      @click="selectorUnidadAbierto = false"
                      class="fixed inset-0 z-40"
                    ></div>
                  </div>

                  <!-- SELECTOR CONDUCTOR -->
                  <div
                    class="sm:col-span-1 relative"
                    :class="selectorConductorAbierto ? 'z-[90]' : 'z-20'"
                  >
                    <label
                      class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2"
                      >Realizó la Compra
                      <span class="text-red-500">*</span></label
                    >
                    <button
                      @click="toggleSelectorConductor"
                      type="button"
                      class="w-full flex items-center justify-between px-4 py-3 bg-white border text-left transition-all rounded-xl outline-none cursor-pointer"
                      :class="
                        selectorConductorAbierto
                          ? 'border-institucional-primario ring-4 ring-institucional-primario/10'
                          : 'border-slate-200 text-slate-700 hover:border-slate-300'
                      "
                    >
                      <div class="flex items-center gap-3 truncate">
                        <svg
                          class="w-5 h-5 text-slate-400 shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          stroke-width="2"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                          />
                        </svg>
                        <div
                          class="flex flex-col truncate"
                          v-if="conductorSeleccionadoObj"
                        >
                          <span class="text-slate-800 font-bold text-sm">{{
                            conductorSeleccionadoObj.nombre_completo
                          }}</span>
                        </div>
                        <span v-else class="text-slate-400 text-sm">{{
                          cargandoConductores
                            ? "Cargando..."
                            : "Seleccione conductor..."
                        }}</span>
                      </div>
                      <svg
                        class="w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200"
                        :class="{ 'rotate-180': selectorConductorAbierto }"
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
                        v-if="selectorConductorAbierto"
                        class="absolute top-full left-0 mt-2 w-full bg-white rounded-xl shadow-2xl border border-slate-100 z-50 overflow-hidden flex flex-col"
                      >
                        <div
                          class="max-h-56 overflow-y-auto hide-scrollbar py-2"
                        >
                          <button
                            v-for="conductor in catalogoConductores"
                            :key="conductor.id_conductor"
                            @click="seleccionarConductor(conductor)"
                            type="button"
                            class="w-full text-left px-4 py-2.5 transition-colors border-b border-slate-50 last:border-0 hover:bg-slate-50"
                            :class="
                              formulario.conductor_id ===
                              conductor.id_conductor.toString()
                                ? 'bg-institucional-primario/10'
                                : ''
                            "
                          >
                            <span
                              class="text-sm font-bold"
                              :class="
                                formulario.conductor_id ===
                                conductor.id_conductor.toString()
                                  ? 'text-institucional-primario'
                                  : 'text-slate-700'
                              "
                              >{{ conductor.nombre_completo }}</span
                            >
                          </button>
                        </div>
                      </div>
                    </Transition>
                    <div
                      v-if="selectorConductorAbierto"
                      @click="selectorConductorAbierto = false"
                      class="fixed inset-0 z-40"
                    ></div>
                  </div>

                  <div class="sm:col-span-2 relative z-10">
                    <label
                      class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2"
                      >Concepto Adquirido
                      <span class="text-red-500">*</span></label
                    >
                    <textarea
                      v-model="formulario.concepto"
                      rows="2"
                      placeholder="Ej. Juego de 2 plumas limpiaparabrisas de 22'' y 16''."
                      class="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-institucional-primario/15 focus:border-institucional-primario text-slate-700 outline-none transition-all text-sm resize-none"
                    ></textarea>
                  </div>

                  <div class="sm:col-span-1 relative z-10">
                    <label
                      class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2"
                      >Establecimiento Comercial
                      <span class="text-red-500">*</span></label
                    >
                    <input
                      type="text"
                      v-model="formulario.proveedor_comercio"
                      placeholder="Ej. AutoZone Lincoln"
                      class="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-institucional-primario/15 focus:border-institucional-primario text-slate-700 outline-none transition-all text-sm"
                    />
                  </div>

                  <div class="sm:col-span-1 relative z-10">
                    <label
                      class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2"
                      >Monto Facturado
                      <span class="text-red-500">*</span></label
                    >
                    <div class="relative">
                      <span
                        class="absolute inset-y-0 left-0 flex items-center pl-4 text-sm font-bold text-slate-400 pointer-events-none"
                        >$</span
                      >
                      <input
                        type="number"
                        step="0.01"
                        v-model="formulario.monto_factura"
                        placeholder="0.00"
                        class="w-full pl-8 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-institucional-primario/15 focus:border-institucional-primario text-slate-700 outline-none transition-all font-mono text-sm"
                      />
                    </div>
                  </div>

                  <div class="sm:col-span-2 relative z-10">
                    <label
                      class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2"
                      >Enlace de Factura (PDF/XML)
                      <span class="text-red-500">*</span></label
                    >
                    <input
                      type="url"
                      v-model="formulario.url_factura"
                      placeholder="https://drive.google.com/..."
                      class="w-full px-4 py-3 bg-blue-50 border border-blue-100 rounded-xl focus:ring-4 focus:ring-blue-500/15 focus:border-blue-500 text-blue-900 outline-none transition-all text-sm"
                    />
                    <p class="text-[10px] text-slate-400 mt-2 font-medium">
                      Requisito obligatorio para auditoría. Pegue el enlace de
                      la carpeta compartida en Drive.
                    </p>
                  </div>
                </div>
              </div>

              <div
                class="bg-slate-50 px-6 py-4 flex justify-end gap-3 border-t border-slate-100 rounded-b-2xl relative z-10"
              >
                <button
                  @click="cerrarModal"
                  type="button"
                  class="px-5 py-2.5 text-sm font-medium text-slate-500 hover:text-slate-700 hover:bg-slate-200/50 rounded-lg transition-colors"
                >
                  Cancelar
                </button>
                <button
                  @click="procesarGasto"
                  :disabled="isSaving"
                  type="button"
                  class="bg-institucional-secundario hover:bg-orange-600 text-white text-sm font-bold py-2.5 px-6 rounded-lg shadow-md shadow-orange-500/20 transition-all duration-200 transform hover:-translate-y-0.5 active:scale-95 disabled:opacity-50 flex items-center gap-2"
                >
                  <span v-if="isSaving">Guardando...</span>
                  <span v-else>Guardar Ticket</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- TOAST DE NOTIFICACIÓN -->
    <Teleport to="body">
      <Transition name="toast">
        <div
          v-if="toast.visible"
          class="fixed top-6 right-6 z-[200] flex items-center gap-3.5 px-6 py-4 rounded-2xl shadow-2xl border text-white transition-all transform backdrop-blur-md"
          :class="
            toast.tipo === 'success'
              ? 'bg-slate-900/95 border-slate-800'
              : 'bg-amber-600/95 border-amber-500'
          "
        >
          <div
            class="p-2 rounded-xl shrink-0"
            :class="
              toast.tipo === 'success'
                ? 'bg-institucional-primario/20 text-institucional-primario'
                : 'bg-white/20 text-white'
            "
          >
            <svg
              v-if="toast.tipo === 'success'"
              class="w-5 h-5 text-emerald-400"
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
            <svg
              v-else
              class="w-5 h-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2.5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
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
          <button
            @click="toast.visible = false"
            class="ml-2 text-slate-400 hover:text-white transition-colors p-1"
          >
            <svg
              class="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { supabase } from "../lib/supabaseClient";
import { GastosService } from "../services/GastosService";

// Evento para avisar al Padre que actualice los KPIs de Insumos
const emit = defineEmits(["actualizar-kpis"]);

// INTERFACES
interface Unidad {
  id_unidad: number | string;
  numero_economico: string;
  modelo: string;
}
interface Conductor {
  id_conductor: number | string;
  nombre_completo: string;
}
interface GastoActivo {
  id_gasto: string;
  concepto: string;
  proveedor_comercio: string;
  monto_factura: number;
  url_factura: string;
  fecha_compra: string;
  catalogo_unidades: { numero_economico: string; modelo: string };
}

// ESTADOS GENERALES
const isSaving = ref(false);
const mostrarModal = ref(false);
const cargandoTabla = ref(true);

const formatearMoneda = (cantidad: number) =>
  new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(
    cantidad,
  );

// CATÁLOGOS Y SELECTORES
const unidadesOperativas = ref<Unidad[]>([]);
const catalogoConductores = ref<Conductor[]>([]);
const listaGastos = ref<GastoActivo[]>([]);
const cargandoVehiculos = ref(false);
const cargandoConductores = ref(false);

const selectorUnidadAbierto = ref(false);
const selectorConductorAbierto = ref(false);
const unidadSeleccionadaObj = ref<Unidad | null>(null);
const conductorSeleccionadoObj = ref<Conductor | null>(null);

// FORMULARIO
const formulario = ref({
  id_unidad: "",
  conductor_id: "",
  concepto: "",
  proveedor_comercio: "",
  monto_factura: "",
  url_factura: "",
});

// TOAST
const toast = ref({
  visible: false,
  mensaje: "",
  tipo: "success" as "success" | "warning",
});
let toastTimer: any = null;
const mostrarToast = (
  mensaje: string,
  tipo: "success" | "warning" = "success",
) => {
  if (toastTimer) clearTimeout(toastTimer);
  toast.value = { visible: true, mensaje, tipo };
  toastTimer = setTimeout(() => {
    toast.value.visible = false;
  }, 4000);
};

// FETCH DE DATOS
const cargarDataInicial = async () => {
  cargandoVehiculos.value = true;
  cargandoConductores.value = true;
  try {
    const [resUnidades, resConductores] = await Promise.all([
      supabase
        .from("catalogo_unidades")
        .select("id_unidad, numero_economico, modelo")
        .order("numero_economico", { ascending: true }),
      supabase
        .from("catalogo_personal")
        .select("id_conductor, nombre_completo")
        .order("nombre_completo", { ascending: true }),
    ]);
    if (resUnidades.error) throw resUnidades.error;
    if (resConductores.error) throw resConductores.error;

    unidadesOperativas.value = resUnidades.data || [];
    catalogoConductores.value = resConductores.data || [];
  } catch (error) {
    console.error(error);
  } finally {
    cargandoVehiculos.value = false;
    cargandoConductores.value = false;
  }
};

const cargarHistorial = async () => {
  cargandoTabla.value = true;
  const respuesta = await GastosService.obtenerHistorialGastos();
  if (respuesta.success && respuesta.data) {
    listaGastos.value = respuesta.data as any;
  } else {
    mostrarToast("No se pudo cargar el historial.", "warning");
  }
  cargandoTabla.value = false;
};

// CONTROLADORES UI
const cerrarTodosLosSelectores = () => {
  selectorUnidadAbierto.value = false;
  selectorConductorAbierto.value = false;
};
const toggleSelectorUnidad = () => {
  const estado = !selectorUnidadAbierto.value;
  cerrarTodosLosSelectores();
  selectorUnidadAbierto.value = estado;
};
const toggleSelectorConductor = () => {
  const estado = !selectorConductorAbierto.value;
  cerrarTodosLosSelectores();
  selectorConductorAbierto.value = estado;
};

const seleccionarUnidad = (unidad: Unidad) => {
  formulario.value.id_unidad = unidad.id_unidad.toString();
  unidadSeleccionadaObj.value = unidad;
  selectorUnidadAbierto.value = false;
};

const seleccionarConductor = (conductor: Conductor) => {
  formulario.value.conductor_id = conductor.id_conductor.toString();
  conductorSeleccionadoObj.value = conductor;
  selectorConductorAbierto.value = false;
};

const abrirModal = () => {
  cerrarTodosLosSelectores();
  mostrarModal.value = true;
};
const cerrarModal = () => {
  mostrarModal.value = false;
  setTimeout(() => {
    formulario.value = {
      id_unidad: "",
      conductor_id: "",
      concepto: "",
      proveedor_comercio: "",
      monto_factura: "",
      url_factura: "",
    };
    unidadSeleccionadaObj.value = null;
    conductorSeleccionadoObj.value = null;
    cerrarTodosLosSelectores();
  }, 300);
};

// GUARDAR DATO
const procesarGasto = async () => {
  if (
    !formulario.value.id_unidad ||
    !formulario.value.conductor_id ||
    !formulario.value.concepto ||
    !formulario.value.proveedor_comercio ||
    !formulario.value.monto_factura ||
    !formulario.value.url_factura
  ) {
    mostrarToast("Por favor, completa todos los campos del ticket.", "warning");
    return;
  }
  isSaving.value = true;
  const paqueteDeDatos = {
    id_unidad: formulario.value.id_unidad,
    conductor_id: formulario.value.conductor_id,
    concepto: formulario.value.concepto,
    proveedor_comercio: formulario.value.proveedor_comercio,
    monto_factura: Number(formulario.value.monto_factura),
    url_factura: formulario.value.url_factura,
  };
  const respuesta = await GastosService.registrarCompraInsumo(paqueteDeDatos);
  if (respuesta.success) {
    mostrarToast("Compra registrada correctamente.", "success");
    cerrarModal();
    await cargarHistorial();
    emit("actualizar-kpis"); // ¡Le avisa al padre que hay nuevo gasto!
  } else {
    mostrarToast("Error al guardar el ticket.", "warning");
  }
  isSaving.value = false;
};

onMounted(() => {
  cargarDataInicial();
  cargarHistorial();
});
</script>

<style scoped>
.font-sans {
  font-family: "Inter", sans-serif !important;
}
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.95) translateY(10px);
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
  transform: translateY(-20px) scale(0.95);
}
.animate-fade-in {
  animation: fadeIn 0.4s ease-out forwards;
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
