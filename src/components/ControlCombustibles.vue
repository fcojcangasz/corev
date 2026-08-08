<template>
  <section class="max-w-7xl mx-auto p-6 font-sans">
    <!-- ======================================================= -->
    <!-- ENCABEZADO DEL MÓDULO                                   -->
    <!-- ======================================================= -->
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
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <h2 class="text-2xl font-bold text-slate-800 tracking-tight">
            Control de Combustibles
          </h2>
        </div>
        <p class="text-sm text-slate-500 ml-14">
          Auditoría, conciliación y gestión de presupuesto operativo.
        </p>
      </div>
    </header>

    <!-- ======================================================= -->
    <!-- CENTRO DE MANDO FINANCIERO (KPIs)                       -->
    <!-- ======================================================= -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <!-- KPI 1: PRESUPUESTO MENSUAL (BARRA DE PROGRESO) -->
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
                  d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3"
                />
              </svg>
              Presupuesto Global Asignado
            </p>
            <h4 class="text-3xl font-black text-slate-700">
              {{ formatearMoneda(consumoGlobalMes) }}
              <span class="text-base font-bold text-slate-400"
                >/ {{ formatearMoneda(presupuestoGlobalMes) }}</span
              >
            </h4>
          </div>
          <div class="text-right">
            <span
              class="px-2.5 py-1 rounded-lg text-xs font-bold"
              :class="
                porcentajeConsumoGlobal > 90
                  ? 'bg-red-50 text-red-600'
                  : porcentajeConsumoGlobal > 75
                    ? 'bg-amber-50 text-amber-600'
                    : 'bg-emerald-50 text-emerald-600'
              "
            >
              {{ porcentajeConsumoGlobal.toFixed(1) }}% Consumido
            </span>
          </div>
        </div>

        <div
          class="w-full bg-slate-100 rounded-full h-2.5 relative z-10 overflow-hidden"
        >
          <div
            class="h-2.5 rounded-full transition-all duration-1000 ease-out"
            :class="
              porcentajeConsumoGlobal > 90
                ? 'bg-red-500'
                : porcentajeConsumoGlobal > 75
                  ? 'bg-amber-500'
                  : 'bg-institucional-primario'
            "
            :style="{ width: `${Math.min(porcentajeConsumoGlobal, 100)}%` }"
          ></div>
        </div>
      </div>

      <!-- KPI 2: LITROS APROBADOS -->
      <div
        class="bg-white border border-slate-100 rounded-2xl p-5 shadow-xl shadow-slate-200/40 flex items-center gap-4"
      >
        <div class="p-3 bg-blue-50 rounded-xl text-blue-600">
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            stroke-width="2.5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
            ></path>
          </svg>
        </div>
        <div>
          <p
            class="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1"
          >
            Litros del Mes
          </p>
          <h4 class="text-2xl font-black text-slate-700">
            {{ litrosGlobalMes.toFixed(2) }} L
          </h4>
        </div>
      </div>

      <!-- KPI 3: TICKETS PENDIENTES -->
      <div
        class="bg-white border border-slate-100 rounded-2xl p-5 shadow-xl shadow-slate-200/40 flex items-center gap-4"
      >
        <div class="p-3 bg-amber-50 rounded-xl text-amber-600">
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            stroke-width="2.5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            ></path>
          </svg>
        </div>
        <div>
          <p
            class="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1"
          >
            Por Conciliar
          </p>
          <h4 class="text-2xl font-black text-slate-700">
            {{ ticketsPendientes.length }}
          </h4>
        </div>
      </div>
    </div>

    <!-- ======================================================= -->
    <!-- SISTEMA DE PESTAÑAS (TABS CON ICONOGRAFÍA)              -->
    <!-- ======================================================= -->
    <div class="mb-6 border-b border-slate-200 overflow-x-auto hide-scrollbar">
      <nav class="-mb-px flex space-x-8 min-w-max" aria-label="Tabs">
        <button
          @click="pestanaActiva = 'conciliacion'"
          :class="[
            pestanaActiva === 'conciliacion'
              ? 'border-institucional-primario text-institucional-primario'
              : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300',
            'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors flex items-center gap-2',
          ]"
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
              d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75"
            />
          </svg>
          Conciliación (Pendientes)
        </button>
        <button
          @click="pestanaActiva = 'historial'"
          :class="[
            pestanaActiva === 'historial'
              ? 'border-institucional-primario text-institucional-primario'
              : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300',
            'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors flex items-center gap-2',
          ]"
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
              d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          Historial de Cargas
        </button>
        <button
          @click="pestanaActiva = 'presupuesto'"
          :class="[
            pestanaActiva === 'presupuesto'
              ? 'border-institucional-primario text-institucional-primario'
              : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300',
            'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors flex items-center gap-2',
          ]"
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
              d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          Presupuesto y Transferencias
        </button>
      </nav>
    </div>

    <!-- ======================================================= -->
    <!-- TABLA PRINCIPAL (MUTABLE SEGÚN PESTAÑA)                  -->
    <!-- ======================================================= -->
    <div
      class="bg-white border border-slate-100 rounded-2xl shadow-xl shadow-slate-200/40 relative z-10 flex flex-col"
    >
      <div
        class="bg-slate-50 border-b border-slate-100 px-6 sm:px-8 py-5 flex items-center justify-between rounded-t-2xl"
      >
        <div class="flex items-center gap-3">
          <svg
            v-if="pestanaActiva === 'presupuesto'"
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
              d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <svg
            v-else
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
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <div>
            <h3
              class="text-sm font-bold text-slate-700 uppercase tracking-wider"
            >
              {{
                pestanaActiva === "conciliacion"
                  ? "Tickets Pendientes de Revisión"
                  : pestanaActiva === "historial"
                    ? "Registro de Cargas Operativas"
                    : "Asignación Presupuestal por Unidad"
              }}
            </h3>
          </div>
        </div>

        <!-- BOTONES DE ACCIÓN SEGÚN PESTAÑA -->
        <div class="flex items-center">
          <!-- Botón de Historial (Normal) -->
          <button
            v-if="pestanaActiva === 'historial'"
            @click="abrirModalNuevaCarga"
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
            Registrar Carga
          </button>

          <!-- Botones Estratégicos de Presupuesto (Dos Acciones Separadas) -->
          <div
            v-if="pestanaActiva === 'presupuesto'"
            class="flex items-center gap-3"
          >
            <span
              v-if="esVentanaTransferencia"
              class="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[10px] font-bold text-blue-600 uppercase tracking-wider"
            >
              <span
                class="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"
              ></span>
              Modificaciones Abiertas
            </span>
            <span
              v-else-if="esVentanaAsignacion"
              class="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-[10px] font-bold text-emerald-600 uppercase tracking-wider"
            >
              <span
                class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"
              ></span>
              Asignación Base Abierta
            </span>
            <span
              v-else
              class="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-[10px] font-bold text-slate-500 uppercase tracking-wider"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                class="w-3 h-3"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 1a4.5 4.5 0 0 0-4.5 4.5V9H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-.5V5.5A4.5 4.5 0 0 0 10 1Zm3 8V5.5a3 3 0 1 0-6 0V9h6Z"
                  clip-rule="evenodd"
                />
              </svg>
              Ventanas Cerradas
            </span>

            <!-- Botón de Transferir (Solo ventanas 7-10 y 17-20) -->
            <button
              @click="intentarTransferir"
              class="px-5 py-2.5 text-xs font-bold bg-white text-institucional-secundario border-2 border-institucional-secundario hover:bg-orange-50 rounded-lg transition-all active:scale-95 flex items-center gap-2 uppercase tracking-wider"
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
                  d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
                />
              </svg>
              Transferir Saldo
            </button>

            <!-- Botón de Asignar Base (Solo ventana 23-26) -->
            <button
              @click="intentarAsignarBase(null)"
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
              Asignar Base
            </button>
          </div>
        </div>
      </div>

      <div class="overflow-x-auto rounded-b-2xl">
        <!-- TABLA: CONCILIACIÓN E HISTORIAL -->
        <table
          v-if="pestanaActiva !== 'presupuesto'"
          class="w-full text-left border-collapse min-w-[900px]"
        >
          <thead>
            <tr class="bg-white border-b border-slate-100">
              <th
                class="py-3 px-6 font-semibold text-xs text-slate-500 uppercase tracking-wider"
              >
                Folio Ticket
              </th>
              <th
                class="py-3 px-6 font-semibold text-xs text-slate-500 uppercase tracking-wider"
              >
                Fecha Carga
              </th>
              <th
                class="py-3 px-6 font-semibold text-xs text-slate-500 uppercase tracking-wider"
              >
                Unidad
              </th>
              <th
                class="py-3 px-6 font-semibold text-xs text-slate-500 uppercase tracking-wider"
              >
                Conductor
              </th>
              <th
                class="py-3 px-6 font-semibold text-xs text-slate-500 uppercase tracking-wider text-right"
              >
                Litros
              </th>
              <th
                class="py-3 px-6 font-semibold text-xs text-slate-500 uppercase tracking-wider text-right"
              >
                Monto
              </th>
              <th
                class="py-3 px-6 font-semibold text-xs text-slate-500 uppercase tracking-wider text-center"
              >
                Estatus
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 bg-white">
            <tr v-if="cargando">
              <td colspan="7" class="py-12 text-center text-slate-500">
                <div class="flex flex-col items-center justify-center">
                  <svg
                    class="animate-spin h-8 w-8 text-institucional-primario mb-3"
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
                  <p class="text-sm font-medium">Cargando registros...</p>
                </div>
              </td>
            </tr>
            <tr v-else-if="cargasVisibles.length === 0">
              <td colspan="7" class="py-12 text-center text-slate-500">
                <p class="text-sm font-medium">
                  {{
                    pestanaActiva === "conciliacion"
                      ? "¡Todo al día! No hay tickets pendientes de conciliación."
                      : "No hay registros de combustible capturados aún."
                  }}
                </p>
              </td>
            </tr>
            <tr
              v-else
              v-for="carga in cargasVisibles"
              :key="carga.id_carga"
              @click="
                pestanaActiva === 'conciliacion'
                  ? abrirModalAuditoria(carga)
                  : null
              "
              :class="[
                pestanaActiva === 'conciliacion'
                  ? 'cursor-pointer hover:bg-slate-50/80 transition-colors group'
                  : 'hover:bg-slate-50/80 transition-colors',
              ]"
            >
              <td class="py-4 px-6">
                <span
                  class="font-bold text-slate-700 text-sm group-hover:text-institucional-primario transition-colors"
                  >#{{ carga.folio_ticket }}</span
                >
              </td>
              <td class="py-4 px-6 text-sm font-medium text-slate-600">
                {{
                  formatearFecha(
                    carga.fecha_carga || carga.viajes_operativos?.created_at,
                  )
                }}
              </td>
              <td class="py-4 px-6 text-sm text-slate-700 font-medium">
                {{
                  carga.catalogo_unidades?.numero_economico ||
                  carga.viajes_operativos?.catalogo_unidades
                    ?.numero_economico ||
                  "N/A"
                }}
              </td>
              <td class="py-4 px-6 text-sm text-slate-600">
                {{
                  carga.catalogo_personal?.nombre_completo ||
                  carga.viajes_operativos?.catalogo_personal?.nombre_completo ||
                  "N/A"
                }}
              </td>
              <td class="py-4 px-6 text-sm text-slate-600 font-mono text-right">
                {{ carga.litros }} L
              </td>
              <td
                class="py-4 px-6 text-sm font-bold text-slate-700 font-mono text-right"
              >
                {{ formatearMoneda(carga.costo_total) }}
              </td>
              <td class="py-4 px-6 text-center">
                <span
                  :class="[
                    'px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider font-bold border inline-block',
                    carga.estatus === 'Pendiente'
                      ? 'bg-amber-50 text-amber-600 border-amber-200'
                      : carga.estatus === 'Aprobado'
                        ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
                        : 'bg-red-50 text-red-600 border-red-200',
                  ]"
                  >{{ carga.estatus }}</span
                >
              </td>
            </tr>
          </tbody>
        </table>

        <!-- TABLA: PRESUPUESTOS -->
        <table
          v-if="pestanaActiva === 'presupuesto'"
          class="w-full text-left border-collapse min-w-[900px]"
        >
          <thead>
            <tr class="bg-white border-b border-slate-100">
              <th
                class="py-3 px-6 font-semibold text-xs text-slate-500 uppercase tracking-wider"
              >
                Unidad
              </th>
              <th
                class="py-3 px-6 font-semibold text-xs text-slate-500 uppercase tracking-wider"
              >
                Periodo
              </th>
              <th
                class="py-3 px-6 font-semibold text-xs text-slate-500 uppercase tracking-wider text-right"
              >
                Asignado
              </th>
              <th
                class="py-3 px-6 font-semibold text-xs text-slate-500 uppercase tracking-wider text-right"
              >
                Consumido
              </th>
              <th
                class="py-3 px-6 font-semibold text-xs text-slate-500 uppercase tracking-wider text-right"
              >
                Disponible
              </th>
              <th
                class="py-3 px-6 font-semibold text-xs text-slate-500 uppercase tracking-wider text-center"
              >
                Modificar Base
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 bg-white">
            <tr v-if="cargandoPresupuestos">
              <td colspan="6" class="py-12 text-center text-slate-500">
                <div class="flex flex-col items-center justify-center">
                  <svg
                    class="animate-spin h-8 w-8 text-institucional-primario mb-3"
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
                  <p class="text-sm font-medium">Cargando presupuestos...</p>
                </div>
              </td>
            </tr>
            <tr v-else-if="presupuestosTabla.length === 0">
              <td colspan="6" class="py-12 text-center text-slate-500">
                <p class="text-sm font-medium">
                  No hay presupuestos base asignados para este mes.
                </p>
              </td>
            </tr>
            <tr
              v-else
              v-for="item in presupuestosTabla"
              :key="item.id_presupuesto"
              class="hover:bg-slate-50/80 transition-colors"
            >
              <td class="py-4 px-6">
                <span class="font-bold text-slate-700 text-sm">{{
                  item.catalogo_unidades?.numero_economico
                }}</span>
                <span class="block text-xs text-slate-500">{{
                  item.catalogo_unidades?.modelo
                }}</span>
              </td>
              <td
                class="py-4 px-6 text-sm text-slate-600 font-medium capitalize"
              >
                {{ obtenerNombreMes(item.mes) }} {{ item.anio }}
              </td>
              <td
                class="py-4 px-6 text-sm font-bold text-slate-700 font-mono text-right"
              >
                {{ formatearMoneda(item.monto_presupuesto) }}
              </td>
              <td
                class="py-4 px-6 text-sm text-orange-500 font-mono text-right font-medium"
              >
                {{
                  formatearMoneda(
                    calcularConsumoUnidadMes(
                      item.id_unidad,
                      item.mes,
                      item.anio,
                    ),
                  )
                }}
              </td>
              <td
                class="py-4 px-6 text-sm font-black font-mono text-right"
                :class="
                  item.monto_presupuesto -
                    calcularConsumoUnidadMes(
                      item.id_unidad,
                      item.mes,
                      item.anio,
                    ) <
                  0
                    ? 'text-red-600'
                    : 'text-emerald-600'
                "
              >
                {{
                  formatearMoneda(
                    item.monto_presupuesto -
                      calcularConsumoUnidadMes(
                        item.id_unidad,
                        item.mes,
                        item.anio,
                      ),
                  )
                }}
              </td>
              <td class="py-4 px-6 text-center">
                <!-- Solo se puede editar el techo base en ventana de asignación o con override -->
                <button
                  @click="intentarAsignarBase(item)"
                  class="p-2 rounded-lg transition-colors inline-block"
                  :class="
                    esVentanaAsignacion || modoExtraordinarioConcedido === '1'
                      ? 'text-slate-400 hover:text-institucional-primario hover:bg-institucional-primario/10'
                      : 'text-slate-300 hover:bg-red-50 hover:text-red-500'
                  "
                  :title="
                    esVentanaAsignacion || modoExtraordinarioConcedido === '1'
                      ? 'Modificar Presupuesto Base'
                      : 'Bloqueado. Fuera de ventana de asignación.'
                  "
                >
                  <svg
                    v-if="
                      esVentanaAsignacion || modoExtraordinarioConcedido === '1'
                    "
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
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
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
                      d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                    />
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- ======================================================= -->
    <!-- MODAL: AUTORIZACIÓN EXTRAORDINARIA                      -->
    <!-- ======================================================= -->
    <Teleport to="body">
      <Transition name="modal">
        <div
          v-if="modalAutorizacionExtraAbierto"
          class="fixed inset-0 z-[110] overflow-y-auto"
        >
          <div
            class="fixed inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity"
            @click="modalAutorizacionExtraAbierto = false"
          ></div>

          <div class="flex min-h-full items-center justify-center p-4 sm:p-0">
            <div
              class="relative bg-white rounded-3xl shadow-2xl w-full max-w-md flex flex-col transform transition-all font-sans my-8 overflow-hidden"
            >
              <div
                class="bg-red-50 px-6 py-6 border-b border-red-100 flex flex-col items-center justify-center text-center"
              >
                <div
                  class="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mb-3"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="w-8 h-8"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
                <h3 class="text-red-700 text-xl font-black tracking-tight">
                  Acceso Restringido
                </h3>
                <p class="text-sm text-red-600/80 mt-1 font-medium px-4">
                  Esta acción se encuentra bloqueada por calendario. Requiere
                  credenciales de un Administrador para realizar un "Override"
                  de las reglas operativas.
                </p>
              </div>

              <div class="p-6 sm:p-8 space-y-6">
                <div>
                  <label
                    class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-3"
                    >Tipo de Operación Extraordinaria</label
                  >
                  <div class="grid grid-cols-1 gap-3">
                    <label
                      class="relative flex cursor-pointer rounded-xl border bg-white p-4 shadow-sm hover:bg-slate-50"
                      :class="
                        formularioAutorizacion.tipoAccion === '1'
                          ? 'border-institucional-primario ring-1 ring-institucional-primario'
                          : 'border-slate-200'
                      "
                    >
                      <input
                        type="radio"
                        name="tipo_accion"
                        value="1"
                        v-model="formularioAutorizacion.tipoAccion"
                        class="sr-only"
                      />
                      <span class="flex flex-col">
                        <span class="block text-sm font-bold text-slate-800"
                          >1. Asignar Presupuesto Base</span
                        >
                        <span class="block text-xs text-slate-500 mt-0.5"
                          >Autorizar inyección fuera del día 23-26.</span
                        >
                      </span>
                      <svg
                        v-if="formularioAutorizacion.tipoAccion === '1'"
                        class="h-5 w-5 text-institucional-primario absolute right-4 top-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </label>
                    <label
                      class="relative flex cursor-pointer rounded-xl border bg-white p-4 shadow-sm hover:bg-slate-50"
                      :class="
                        formularioAutorizacion.tipoAccion === '2'
                          ? 'border-institucional-primario ring-1 ring-institucional-primario'
                          : 'border-slate-200'
                      "
                    >
                      <input
                        type="radio"
                        name="tipo_accion"
                        value="2"
                        v-model="formularioAutorizacion.tipoAccion"
                        class="sr-only"
                      />
                      <span class="flex flex-col">
                        <span class="block text-sm font-bold text-slate-800"
                          >2. Transferir Saldo (Suma Cero)</span
                        >
                        <span class="block text-xs text-slate-500 mt-0.5"
                          >Mover dinero fuera del día 7-10 o 17-20.</span
                        >
                      </span>
                      <svg
                        v-if="formularioAutorizacion.tipoAccion === '2'"
                        class="h-5 w-5 text-institucional-primario absolute right-4 top-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </label>
                  </div>
                </div>

                <div class="space-y-4">
                  <div>
                    <label
                      class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2"
                      >Correo de Administrador
                      <span class="text-red-500">*</span></label
                    >
                    <input
                      type="email"
                      v-model="formularioAutorizacion.email"
                      placeholder="ej. daniel@institucion.gob.mx"
                      class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-institucional-primario/15 focus:border-institucional-primario focus:bg-white text-slate-700 outline-none transition-all text-sm"
                    />
                  </div>
                  <div>
                    <label
                      class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2"
                      >Contraseña Institucional
                      <span class="text-red-500">*</span></label
                    >
                    <input
                      type="password"
                      v-model="formularioAutorizacion.password"
                      placeholder="••••••••"
                      class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-institucional-primario/15 focus:border-institucional-primario focus:bg-white text-slate-700 outline-none transition-all text-sm"
                    />
                  </div>
                </div>
              </div>

              <div
                class="bg-slate-50 px-6 py-5 flex justify-end gap-3 border-t border-slate-100"
              >
                <button
                  @click="modalAutorizacionExtraAbierto = false"
                  type="button"
                  class="px-5 py-2.5 text-sm font-medium text-slate-500 hover:text-slate-700 hover:bg-slate-200/50 rounded-lg transition-colors"
                >
                  Cancelar
                </button>
                <button
                  @click="validarAutorizacionExtra"
                  :disabled="validandoAutorizacion"
                  type="button"
                  class="bg-slate-800 hover:bg-slate-900 text-white text-sm font-bold py-2.5 px-6 rounded-lg shadow-md shadow-slate-900/20 transition-all duration-200 transform hover:-translate-y-0.5 active:scale-95 disabled:opacity-50 flex items-center gap-2"
                >
                  <svg
                    v-if="validandoAutorizacion"
                    class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                  <span>{{
                    validandoAutorizacion
                      ? "Verificando..."
                      : "Validar y Continuar"
                  }}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- ======================================================= -->
    <!-- MODAL: GESTIÓN DE PRESUPUESTO (ASIGNACIÓN BASE)         -->
    <!-- ======================================================= -->
    <Teleport to="body">
      <Transition name="modal">
        <div
          v-if="modalPresupuestoAbierto"
          class="fixed inset-0 z-[100] overflow-y-auto"
        >
          <div
            class="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
            @click="cerrarModalPresupuesto"
          ></div>

          <div class="flex min-h-full items-center justify-center p-4 sm:p-0">
            <div
              class="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg flex flex-col transform transition-all font-sans my-8"
            >
              <div
                class="bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between rounded-t-2xl relative z-20"
              >
                <h3 class="text-institucional-primario text-lg font-bold">
                  Asignación Presupuestal Base
                </h3>
                <button
                  @click="cerrarModalPresupuesto"
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
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div
                class="bg-amber-50 px-6 py-3 border-b border-amber-100 flex items-start gap-3"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="w-5 h-5 text-amber-500 shrink-0 mt-0.5"
                >
                  <path
                    fill-rule="evenodd"
                    d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                    clip-rule="evenodd"
                  />
                </svg>
                <p class="text-xs text-amber-700 font-medium">
                  Estás asignando dinero base. Esta acción incrementará el
                  presupuesto global del mes. Si solo deseas mover saldo entre
                  unidades, utiliza la herramienta de
                  <strong>Transferir Saldo</strong>.
                </p>
              </div>

              <div class="p-6 sm:p-8 overflow-visible relative z-30">
                <div class="space-y-6">
                  <!-- Vehículo -->
                  <div
                    class="relative"
                    :class="
                      selectorPresupuestoUnidadAbierto ? 'z-[100]' : 'z-30'
                    "
                  >
                    <label
                      class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2"
                      >Vehículo <span class="text-red-500">*</span></label
                    >
                    <button
                      @click="
                        selectorPresupuestoUnidadAbierto =
                          !selectorPresupuestoUnidadAbierto;
                        selectorPresupuestoMesAbierto = false;
                      "
                      type="button"
                      :disabled="modoEdicionPresupuesto"
                      class="w-full flex items-center justify-between pl-4 pr-4 py-3 bg-white border text-left transition-all rounded-xl outline-none disabled:bg-slate-50 disabled:cursor-not-allowed"
                      :class="
                        selectorPresupuestoUnidadAbierto
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
                          v-if="formularioAsignacion.id_unidad"
                        >
                          <span class="text-slate-800 font-bold text-sm">{{
                            unidadesOperativas.find(
                              (u) =>
                                u.id_unidad.toString() ===
                                formularioAsignacion.id_unidad,
                            )?.numero_economico
                          }}</span>
                          <span class="text-slate-500 text-[11px] truncate">{{
                            unidadesOperativas.find(
                              (u) =>
                                u.id_unidad.toString() ===
                                formularioAsignacion.id_unidad,
                            )?.modelo
                          }}</span>
                        </div>
                        <span v-else class="text-slate-400 text-sm"
                          >Seleccione una unidad...</span
                        >
                      </div>
                      <svg
                        class="w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200"
                        :class="{
                          'rotate-180': selectorPresupuestoUnidadAbierto,
                        }"
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
                        v-if="selectorPresupuestoUnidadAbierto"
                        class="absolute top-full left-0 mt-2 w-full bg-white rounded-xl shadow-2xl border border-slate-100 z-50 overflow-hidden flex flex-col"
                      >
                        <div
                          class="max-h-56 overflow-y-auto hide-scrollbar py-2"
                        >
                          <button
                            v-for="unidad in unidadesOperativas"
                            :key="unidad.id_unidad"
                            @click="
                              formularioAsignacion.id_unidad =
                                unidad.id_unidad.toString();
                              selectorPresupuestoUnidadAbierto = false;
                            "
                            type="button"
                            class="w-full text-left px-4 py-2.5 transition-colors flex flex-col items-start gap-0.5 border-b border-slate-50 last:border-0"
                            :class="
                              formularioAsignacion.id_unidad ===
                              unidad.id_unidad.toString()
                                ? 'bg-institucional-primario/10'
                                : 'hover:bg-slate-50'
                            "
                          >
                            <span
                              class="text-sm"
                              :class="
                                formularioAsignacion.id_unidad ===
                                unidad.id_unidad.toString()
                                  ? 'text-institucional-primario font-bold'
                                  : 'text-slate-700 font-bold'
                              "
                              >{{ unidad.numero_economico }}</span
                            >
                            <span
                              class="text-[11px] truncate w-full"
                              :class="
                                formularioAsignacion.id_unidad ===
                                unidad.id_unidad.toString()
                                  ? 'text-institucional-primario/80'
                                  : 'text-slate-500'
                              "
                              >{{ unidad.modelo }} ({{ unidad.placas }})</span
                            >
                          </button>
                        </div>
                      </div>
                    </Transition>
                    <div
                      v-if="selectorPresupuestoUnidadAbierto"
                      @click="selectorPresupuestoUnidadAbierto = false"
                      class="fixed inset-0 z-40"
                    ></div>
                  </div>

                  <div class="grid grid-cols-2 gap-6">
                    <!-- Mes -->
                    <div
                      class="relative"
                      :class="selectorPresupuestoMesAbierto ? 'z-[90]' : 'z-20'"
                    >
                      <label
                        class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2"
                        >Mes <span class="text-red-500">*</span></label
                      >
                      <button
                        @click="
                          selectorPresupuestoMesAbierto =
                            !selectorPresupuestoMesAbierto;
                          selectorPresupuestoUnidadAbierto = false;
                        "
                        type="button"
                        :disabled="modoEdicionPresupuesto"
                        class="w-full flex items-center justify-between px-4 py-3 bg-white border text-left transition-all rounded-xl outline-none disabled:bg-slate-50 disabled:cursor-not-allowed"
                        :class="
                          selectorPresupuestoMesAbierto
                            ? 'border-institucional-primario ring-4 ring-institucional-primario/10'
                            : 'border-slate-200 text-slate-700 hover:border-slate-300'
                        "
                      >
                        <span class="text-sm font-bold text-slate-700">{{
                          mesesNombres[formularioAsignacion.mes - 1]
                        }}</span>
                        <svg
                          class="w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200"
                          :class="{
                            'rotate-180': selectorPresupuestoMesAbierto,
                          }"
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
                          v-if="selectorPresupuestoMesAbierto"
                          class="absolute top-full left-0 mt-2 w-full bg-white rounded-xl shadow-2xl border border-slate-100 z-50 overflow-hidden flex flex-col"
                        >
                          <div
                            class="max-h-56 overflow-y-auto hide-scrollbar py-2"
                          >
                            <button
                              v-for="(nombre, idx) in mesesNombres"
                              :key="idx"
                              @click="
                                formularioAsignacion.mes = idx + 1;
                                selectorPresupuestoMesAbierto = false;
                              "
                              type="button"
                              class="w-full text-left px-4 py-2.5 transition-colors border-b border-slate-50 last:border-0 hover:bg-slate-50"
                              :class="
                                formularioAsignacion.mes === idx + 1
                                  ? 'bg-institucional-primario/10 text-institucional-primario font-bold'
                                  : 'text-slate-700'
                              "
                            >
                              <span
                                class="text-sm"
                                :class="
                                  formularioAsignacion.mes === idx + 1
                                    ? 'font-bold'
                                    : 'font-medium'
                                "
                                >{{ nombre }}</span
                              >
                            </button>
                          </div>
                        </div>
                      </Transition>
                      <div
                        v-if="selectorPresupuestoMesAbierto"
                        @click="selectorPresupuestoMesAbierto = false"
                        class="fixed inset-0 z-40"
                      ></div>
                    </div>

                    <!-- Año -->
                    <div class="relative z-10">
                      <label
                        class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2"
                        >Año <span class="text-red-500">*</span></label
                      >
                      <input
                        type="number"
                        v-model="formularioAsignacion.anio"
                        :disabled="modoEdicionPresupuesto"
                        class="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-institucional-primario/15 focus:border-institucional-primario text-slate-700 outline-none transition-all font-mono text-sm disabled:bg-slate-50 disabled:cursor-not-allowed"
                      />
                    </div>
                  </div>

                  <!-- Monto Autorizado -->
                  <div class="relative z-10">
                    <label
                      class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2"
                      >Monto Autorizado
                      <span class="text-red-500">*</span></label
                    >
                    <div class="relative">
                      <span
                        class="absolute inset-y-0 left-0 flex items-center pl-4 text-lg font-bold text-slate-400 pointer-events-none"
                        >$</span
                      >
                      <input
                        type="number"
                        step="0.01"
                        v-model="formularioAsignacion.monto"
                        placeholder="Ej. 3500.00"
                        class="w-full pl-8 pr-4 py-4 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-institucional-primario/15 focus:border-institucional-primario text-slate-800 outline-none transition-all font-mono text-lg font-bold"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <!-- BOTÓN DE ACCIÓN (NARANJA PREMIUM) -->
              <div
                class="bg-slate-50 px-6 py-4 flex justify-end gap-3 border-t border-slate-100 rounded-b-2xl relative z-10"
              >
                <button
                  @click="cerrarModalPresupuesto"
                  type="button"
                  class="px-5 py-2.5 text-sm font-medium text-slate-500 hover:text-slate-700 hover:bg-slate-200/50 rounded-lg transition-colors"
                >
                  Cancelar
                </button>
                <button
                  @click="guardarPresupuesto"
                  :disabled="guardandoPresupuesto"
                  type="button"
                  class="bg-institucional-secundario hover:bg-orange-600 text-white text-sm font-bold py-2.5 px-6 rounded-lg shadow-md shadow-orange-500/20 transition-all duration-200 transform hover:-translate-y-0.5 active:scale-95 disabled:opacity-50 flex items-center gap-2"
                >
                  <span v-if="guardandoPresupuesto">Guardando...</span>
                  <span v-else>{{
                    modoEdicionPresupuesto
                      ? "Actualizar Techo"
                      : "Crear Presupuesto Base"
                  }}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- ======================================================= -->
    <!-- MODAL: TRANSFERENCIA (SUMA CERO) NUEVO                  -->
    <!-- ======================================================= -->
    <Teleport to="body">
      <Transition name="modal">
        <div
          v-if="modalTransferenciaAbierto"
          class="fixed inset-0 z-[100] overflow-y-auto"
        >
          <div
            class="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
            @click="cerrarModalTransferencia"
          ></div>

          <div class="flex min-h-full items-center justify-center p-4 sm:p-0">
            <div
              class="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg flex flex-col transform transition-all font-sans my-8"
            >
              <div
                class="bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between rounded-t-2xl relative z-20"
              >
                <h3 class="text-institucional-primario text-lg font-bold">
                  Transferencia de Saldo (Modificación)
                </h3>
                <button
                  @click="cerrarModalTransferencia"
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
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div class="p-6 sm:p-8 overflow-visible relative z-30">
                <div class="space-y-6">
                  <!-- Vehículo Origen -->
                  <div
                    class="relative"
                    :class="
                      selectorTransferenciaOrigenAbierto ? 'z-[100]' : 'z-30'
                    "
                  >
                    <label
                      class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2"
                      >Unidad Origen (Quitar Dinero)
                      <span class="text-red-500">*</span></label
                    >
                    <button
                      @click="
                        selectorTransferenciaOrigenAbierto =
                          !selectorTransferenciaOrigenAbierto;
                        selectorTransferenciaDestinoAbierto = false;
                      "
                      type="button"
                      class="w-full flex items-center justify-between pl-4 pr-4 py-3 bg-white border text-left transition-all rounded-xl outline-none"
                      :class="
                        selectorTransferenciaOrigenAbierto
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
                            d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                          />
                        </svg>
                        <div
                          class="flex flex-col truncate"
                          v-if="formularioTransferencia.origen"
                        >
                          <span class="text-slate-800 font-bold text-sm">{{
                            unidadesOperativas.find(
                              (u) =>
                                u.id_unidad.toString() ===
                                formularioTransferencia.origen,
                            )?.numero_economico
                          }}</span>
                        </div>
                        <span v-else class="text-slate-400 text-sm"
                          >Seleccione unidad origen...</span
                        >
                      </div>
                      <svg
                        class="w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200"
                        :class="{
                          'rotate-180': selectorTransferenciaOrigenAbierto,
                        }"
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
                    <!-- Indicador de Saldo Disponible Origen -->
                    <div
                      v-if="formularioTransferencia.origen"
                      class="mt-2 text-right"
                    >
                      <span class="text-[11px] font-medium text-slate-500"
                        >Disponible:
                      </span>
                      <span class="text-sm font-bold text-emerald-600">{{
                        formatearMoneda(disponibleOrigenTransferencia)
                      }}</span>
                    </div>

                    <Transition name="dropdown">
                      <div
                        v-if="selectorTransferenciaOrigenAbierto"
                        class="absolute top-[3.5rem] left-0 mt-2 w-full bg-white rounded-xl shadow-2xl border border-slate-100 z-50 overflow-hidden flex flex-col"
                      >
                        <div
                          class="max-h-56 overflow-y-auto hide-scrollbar py-2"
                        >
                          <button
                            v-for="unidad in unidadesOperativas"
                            :key="unidad.id_unidad"
                            @click="
                              formularioTransferencia.origen =
                                unidad.id_unidad.toString();
                              selectorTransferenciaOrigenAbierto = false;
                            "
                            type="button"
                            class="w-full text-left px-4 py-2.5 transition-colors flex flex-col items-start gap-0.5 border-b border-slate-50 last:border-0"
                            :class="
                              formularioTransferencia.origen ===
                              unidad.id_unidad.toString()
                                ? 'bg-institucional-primario/10'
                                : 'hover:bg-slate-50'
                            "
                          >
                            <span
                              class="text-sm"
                              :class="
                                formularioTransferencia.origen ===
                                unidad.id_unidad.toString()
                                  ? 'text-institucional-primario font-bold'
                                  : 'text-slate-700 font-bold'
                              "
                              >{{ unidad.numero_economico }}</span
                            >
                            <span
                              class="text-[11px] truncate w-full"
                              :class="
                                formularioTransferencia.origen ===
                                unidad.id_unidad.toString()
                                  ? 'text-institucional-primario/80'
                                  : 'text-slate-500'
                              "
                              >{{ unidad.modelo }} ({{ unidad.placas }})</span
                            >
                          </button>
                        </div>
                      </div>
                    </Transition>
                    <div
                      v-if="selectorTransferenciaOrigenAbierto"
                      @click="selectorTransferenciaOrigenAbierto = false"
                      class="fixed inset-0 z-40"
                    ></div>
                  </div>

                  <!-- Vehículo Destino -->
                  <div
                    class="relative"
                    :class="
                      selectorTransferenciaDestinoAbierto ? 'z-[90]' : 'z-20'
                    "
                  >
                    <label
                      class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2"
                      >Unidad Destino (Recibir Dinero)
                      <span class="text-red-500">*</span></label
                    >
                    <button
                      @click="
                        selectorTransferenciaDestinoAbierto =
                          !selectorTransferenciaDestinoAbierto;
                        selectorTransferenciaOrigenAbierto = false;
                      "
                      type="button"
                      class="w-full flex items-center justify-between pl-4 pr-4 py-3 bg-white border text-left transition-all rounded-xl outline-none"
                      :class="
                        selectorTransferenciaDestinoAbierto
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
                            d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                          />
                        </svg>
                        <div
                          class="flex flex-col truncate"
                          v-if="formularioTransferencia.destino"
                        >
                          <span class="text-slate-800 font-bold text-sm">{{
                            unidadesOperativas.find(
                              (u) =>
                                u.id_unidad.toString() ===
                                formularioTransferencia.destino,
                            )?.numero_economico
                          }}</span>
                        </div>
                        <span v-else class="text-slate-400 text-sm"
                          >Seleccione unidad destino...</span
                        >
                      </div>
                      <svg
                        class="w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200"
                        :class="{
                          'rotate-180': selectorTransferenciaDestinoAbierto,
                        }"
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
                        v-if="selectorTransferenciaDestinoAbierto"
                        class="absolute top-full left-0 mt-2 w-full bg-white rounded-xl shadow-2xl border border-slate-100 z-50 overflow-hidden flex flex-col"
                      >
                        <div
                          class="max-h-56 overflow-y-auto hide-scrollbar py-2"
                        >
                          <!-- Filtrar para no poder enviarse a sí mismo -->
                          <button
                            v-for="unidad in unidadesOperativas.filter(
                              (u) =>
                                u.id_unidad.toString() !==
                                formularioTransferencia.origen,
                            )"
                            :key="unidad.id_unidad"
                            @click="
                              formularioTransferencia.destino =
                                unidad.id_unidad.toString();
                              selectorTransferenciaDestinoAbierto = false;
                            "
                            type="button"
                            class="w-full text-left px-4 py-2.5 transition-colors flex flex-col items-start gap-0.5 border-b border-slate-50 last:border-0"
                            :class="
                              formularioTransferencia.destino ===
                              unidad.id_unidad.toString()
                                ? 'bg-institucional-primario/10'
                                : 'hover:bg-slate-50'
                            "
                          >
                            <span
                              class="text-sm"
                              :class="
                                formularioTransferencia.destino ===
                                unidad.id_unidad.toString()
                                  ? 'text-institucional-primario font-bold'
                                  : 'text-slate-700 font-bold'
                              "
                              >{{ unidad.numero_economico }}</span
                            >
                            <span
                              class="text-[11px] truncate w-full"
                              :class="
                                formularioTransferencia.destino ===
                                unidad.id_unidad.toString()
                                  ? 'text-institucional-primario/80'
                                  : 'text-slate-500'
                              "
                              >{{ unidad.modelo }} ({{ unidad.placas }})</span
                            >
                          </button>
                        </div>
                      </div>
                    </Transition>
                    <div
                      v-if="selectorTransferenciaDestinoAbierto"
                      @click="selectorTransferenciaDestinoAbierto = false"
                      class="fixed inset-0 z-40"
                    ></div>
                  </div>

                  <!-- Monto a Transferir -->
                  <div class="relative z-10">
                    <label
                      class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2"
                      >Monto a Transferir
                      <span class="text-red-500">*</span></label
                    >
                    <div class="relative">
                      <span
                        class="absolute inset-y-0 left-0 flex items-center pl-4 text-lg font-bold text-slate-400 pointer-events-none"
                        >$</span
                      >
                      <input
                        type="number"
                        step="0.01"
                        v-model="formularioTransferencia.monto"
                        placeholder="Ej. 1000.00"
                        class="w-full pl-8 pr-4 py-4 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-institucional-primario/15 focus:border-institucional-primario text-slate-800 outline-none transition-all font-mono text-lg font-bold"
                      />
                    </div>
                    <p
                      v-if="
                        formularioTransferencia.monto &&
                        Number(formularioTransferencia.monto) >
                          disponibleOrigenTransferencia
                      "
                      class="text-xs text-red-500 mt-2 font-bold flex items-center gap-1"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        class="w-4 h-4"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-8-5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5A.75.75 0 0 1 10 5Zm0 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      Saldo insuficiente en la Unidad Origen.
                    </p>
                  </div>
                </div>
              </div>

              <!-- BOTÓN DE ACCIÓN -->
              <div
                class="bg-slate-50 px-6 py-4 flex justify-end gap-3 border-t border-slate-100 rounded-b-2xl relative z-10"
              >
                <button
                  @click="cerrarModalTransferencia"
                  type="button"
                  class="px-5 py-2.5 text-sm font-medium text-slate-500 hover:text-slate-700 hover:bg-slate-200/50 rounded-lg transition-colors"
                >
                  Cancelar
                </button>
                <button
                  @click="guardarTransferencia"
                  :disabled="
                    guardandoTransferencia ||
                    !formularioTransferencia.monto ||
                    Number(formularioTransferencia.monto) <= 0 ||
                    Number(formularioTransferencia.monto) >
                      disponibleOrigenTransferencia
                  "
                  type="button"
                  class="bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold py-2.5 px-6 rounded-lg shadow-md shadow-blue-600/20 transition-all duration-200 transform hover:-translate-y-0.5 active:scale-95 disabled:opacity-50 flex items-center gap-2"
                >
                  <span v-if="guardandoTransferencia">Procesando...</span>
                  <span v-else>Confirmar Transferencia</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- ======================================================= -->
    <!-- MODALES DE AUDITORÍA, NUEVA CARGA Y TOAST AQUÍ ABAJO    -->
    <!-- ======================================================= -->
    <Teleport to="body">
      <Transition name="modal">
        <div
          v-if="modalAuditoriaAbierto"
          class="fixed inset-0 z-[100] overflow-y-auto"
        >
          <div
            class="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
            @click="cerrarModalAuditoria"
          ></div>
          <div class="flex min-h-full items-center justify-center p-4 sm:p-0">
            <div
              class="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl flex flex-col transform transition-all font-sans my-8"
            >
              <div
                class="bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between rounded-t-2xl relative z-20"
              >
                <h3 class="text-institucional-primario text-lg font-bold">
                  Auditoría de Ticket de Combustible
                </h3>
                <button
                  @click="cerrarModalAuditoria"
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
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div
                v-if="cargaSeleccionada"
                class="p-6 sm:p-8 overflow-visible relative z-30 space-y-6"
              >
                <div
                  class="flex items-center justify-between p-5 bg-slate-50 rounded-xl border border-slate-100"
                >
                  <div>
                    <p
                      class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1"
                    >
                      Costo Total Auditado
                    </p>
                    <p class="text-3xl font-black text-emerald-600">
                      {{ formatearMoneda(cargaSeleccionada.costo_total) }}
                    </p>
                  </div>
                  <div class="text-right">
                    <p
                      class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1"
                    >
                      Volumen de Carga
                    </p>
                    <p class="text-2xl font-bold text-slate-700 font-mono">
                      {{ cargaSeleccionada.litros }} L
                    </p>
                  </div>
                </div>

                <div
                  class="grid grid-cols-2 gap-6 bg-white border border-slate-100 p-5 rounded-xl"
                >
                  <div>
                    <span
                      class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1"
                      >Folio Ticket</span
                    >
                    <span
                      class="font-medium text-slate-800 font-mono text-base"
                      >{{ cargaSeleccionada.folio_ticket }}</span
                    >
                  </div>
                  <div>
                    <span
                      class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1"
                      >Estatus Actual</span
                    >
                    <span
                      :class="[
                        'px-2.5 py-1 rounded-full text-[11px] uppercase tracking-wider font-bold border inline-block',
                        cargaSeleccionada.estatus === 'Pendiente'
                          ? 'bg-amber-50 text-amber-600 border-amber-200'
                          : cargaSeleccionada.estatus === 'Aprobado'
                            ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
                            : 'bg-red-50 text-red-600 border-red-200',
                      ]"
                      >{{ cargaSeleccionada.estatus }}</span
                    >
                  </div>
                  <div>
                    <span
                      class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1"
                      >Unidad Operativa</span
                    >
                    <span class="font-medium text-slate-800">{{
                      cargaSeleccionada.catalogo_unidades?.numero_economico ||
                      cargaSeleccionada.viajes_operativos?.catalogo_unidades
                        ?.numero_economico ||
                      "N/A"
                    }}</span>
                  </div>
                  <div>
                    <span
                      class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1"
                      >Conductor Asignado</span
                    >
                    <span class="font-medium text-slate-800">{{
                      cargaSeleccionada.catalogo_personal?.nombre_completo ||
                      cargaSeleccionada.viajes_operativos?.catalogo_personal
                        ?.nombre_completo ||
                      "N/A"
                    }}</span>
                  </div>
                  <div class="col-span-2">
                    <span
                      class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1"
                      >Fecha y Hora de Carga</span
                    >
                    <span class="font-medium text-slate-800">{{
                      formatearFecha(
                        cargaSeleccionada.fecha_carga ||
                          cargaSeleccionada.viajes_operativos?.created_at,
                      )
                    }}</span>
                  </div>
                </div>
              </div>

              <div
                class="bg-slate-50 px-6 py-4 flex justify-end gap-3 border-t border-slate-100 rounded-b-2xl relative z-10"
              >
                <button
                  @click="auditarTicket('Rechazado')"
                  type="button"
                  class="px-5 py-2.5 text-sm font-bold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors border border-red-100"
                >
                  Rechazar Ticket
                </button>
                <button
                  @click="auditarTicket('Aprobado')"
                  type="button"
                  class="bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold py-2.5 px-6 rounded-lg shadow-md shadow-emerald-500/20 transition-all duration-200 transform hover:-translate-y-0.5 active:scale-95"
                >
                  Aprobar Carga
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- MODAL NUEVA CARGA OPERATIVA -->
    <Teleport to="body">
      <Transition name="modal">
        <div
          v-if="modalNuevaCargaAbierto"
          class="fixed inset-0 z-[100] overflow-y-auto"
        >
          <div
            class="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
            @click="cerrarModalNuevaCarga"
          ></div>

          <div class="flex min-h-full items-center justify-center p-4 sm:p-0">
            <div
              class="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl flex flex-col transform transition-all font-sans my-8"
            >
              <div
                class="bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between rounded-t-2xl relative z-20"
              >
                <h3 class="text-institucional-primario text-lg font-bold">
                  Captura Manual de Combustible
                </h3>
                <button
                  @click="cerrarModalNuevaCarga"
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
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div class="p-6 sm:p-8 overflow-visible relative z-30">
                <div class="grid grid-cols-1 sm:grid-cols-6 gap-6">
                  <div
                    class="sm:col-span-6 relative"
                    :class="selectorUnidadAbierto ? 'z-[100]' : 'z-30'"
                  >
                    <label
                      class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2"
                      >Vehículo <span class="text-red-500">*</span></label
                    >
                    <button
                      @click="toggleSelectorUnidad"
                      type="button"
                      class="w-full flex items-center justify-between pl-4 pr-4 py-3 bg-white border text-left transition-all rounded-xl outline-none cursor-pointer"
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
                          <span class="text-slate-500 text-[11px] truncate"
                            >{{ unidadSeleccionadaObj.modelo }} ({{
                              unidadSeleccionadaObj.placas
                            }})</span
                          >
                        </div>
                        <span v-else class="text-slate-400 text-sm">{{
                          cargandoVehiculos
                            ? "Cargando vehículos..."
                            : "Seleccione una unidad..."
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

                    <div
                      v-if="unidadSeleccionadaObj"
                      class="mt-3 p-3 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-between shadow-sm"
                    >
                      <div class="flex items-center gap-2">
                        <div
                          class="p-1.5 bg-institucional-primario/10 rounded-md text-institucional-primario"
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
                              d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3"
                            />
                          </svg>
                        </div>
                        <span
                          class="text-[10px] font-bold text-slate-500 uppercase tracking-wider"
                          >Bolsa Mensual</span
                        >
                      </div>
                      <div class="flex items-center gap-4">
                        <div class="text-right hidden sm:block">
                          <p class="text-[10px] text-slate-400 font-medium">
                            Asignado
                          </p>
                          <p class="text-xs font-bold text-slate-600">
                            {{ formatearMoneda(presupuestoUnidadSeleccionada) }}
                          </p>
                        </div>
                        <div class="text-right hidden sm:block">
                          <p class="text-[10px] text-slate-400 font-medium">
                            Consumido
                          </p>
                          <p class="text-xs font-bold text-orange-500">
                            {{ formatearMoneda(consumoUnidadSeleccionada) }}
                          </p>
                        </div>
                        <div
                          class="text-right pl-4 sm:border-l border-slate-200"
                        >
                          <p class="text-[10px] text-slate-400 font-medium">
                            Disponible
                          </p>
                          <p
                            class="text-sm font-black"
                            :class="
                              saldoRestanteDespuesDeCarga < 0
                                ? 'text-red-600'
                                : 'text-emerald-600'
                            "
                          >
                            {{ formatearMoneda(saldoRestanteDespuesDeCarga) }}
                          </p>
                        </div>
                      </div>
                    </div>

                    <Transition name="dropdown">
                      <div
                        v-if="selectorUnidadAbierto"
                        class="absolute top-[3.5rem] left-0 mt-2 w-full bg-white rounded-xl shadow-2xl border border-slate-100 z-50 overflow-hidden flex flex-col"
                      >
                        <div
                          class="max-h-56 overflow-y-auto hide-scrollbar py-2"
                        >
                          <button
                            v-for="unidad in unidadesOperativas"
                            :key="unidad.id_unidad"
                            @click="seleccionarUnidad(unidad)"
                            type="button"
                            class="w-full text-left px-4 py-2.5 transition-colors flex flex-col items-start gap-0.5 border-b border-slate-50 last:border-0"
                            :class="
                              formularioCarga.id_unidad ===
                              unidad.id_unidad.toString()
                                ? 'bg-institucional-primario/10'
                                : 'hover:bg-slate-50'
                            "
                          >
                            <span
                              class="text-sm"
                              :class="
                                formularioCarga.id_unidad ===
                                unidad.id_unidad.toString()
                                  ? 'text-institucional-primario font-bold'
                                  : 'text-slate-700 font-bold'
                              "
                              >{{ unidad.numero_economico }}</span
                            >
                            <span
                              class="text-[11px] truncate w-full"
                              :class="
                                formularioCarga.id_unidad ===
                                unidad.id_unidad.toString()
                                  ? 'text-institucional-primario/80'
                                  : 'text-slate-500'
                              "
                              >{{ unidad.modelo }} ({{ unidad.placas }})</span
                            >
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

                  <!-- SELECTOR DE CONDUCTOR -->
                  <div
                    class="sm:col-span-6 relative"
                    :class="selectorConductorAbierto ? 'z-[90]' : 'z-20'"
                  >
                    <label
                      class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2"
                      >Conductor Asignado
                      <span class="text-red-500">*</span></label
                    >
                    <button
                      @click="toggleSelectorConductor"
                      type="button"
                      class="w-full flex items-center justify-between pl-4 pr-4 py-3 bg-white border text-left transition-all rounded-xl outline-none cursor-pointer"
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
                            ? "Cargando conductores..."
                            : "Seleccione un conductor..."
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
                            class="w-full text-left px-4 py-2.5 transition-colors border-b border-slate-50 last:border-0"
                            :class="
                              formularioCarga.id_conductor ===
                              conductor.id_conductor.toString()
                                ? 'bg-institucional-primario/10'
                                : 'hover:bg-slate-50'
                            "
                          >
                            <span
                              class="text-sm"
                              :class="
                                formularioCarga.id_conductor ===
                                conductor.id_conductor.toString()
                                  ? 'text-institucional-primario font-bold'
                                  : 'text-slate-700 font-bold'
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

                  <!-- SELECTOR DE FECHA PREMIUM -->
                  <div
                    class="sm:col-span-3 relative"
                    :class="selectorFechaAbierto ? 'z-[80]' : 'z-10'"
                  >
                    <label
                      class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2"
                      >Fecha de Carga <span class="text-red-500">*</span></label
                    >
                    <button
                      @click="toggleSelectorFecha"
                      type="button"
                      class="w-full flex items-center justify-between pl-4 pr-4 py-3 bg-white border text-left transition-all rounded-xl outline-none cursor-pointer"
                      :class="
                        selectorFechaAbierto
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
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <span
                          :class="
                            formularioCarga.fecha
                              ? 'text-slate-800 font-bold text-sm'
                              : 'text-slate-400 text-sm'
                          "
                        >
                          {{
                            textoFechaSeleccionada || "Seleccione una fecha..."
                          }}
                        </span>
                      </div>
                      <svg
                        class="w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200"
                        :class="{ 'rotate-180': selectorFechaAbierto }"
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
                        v-if="selectorFechaAbierto"
                        class="absolute top-full left-0 mt-2 w-72 bg-white rounded-xl shadow-2xl border border-slate-100 z-[100] flex flex-col p-4 origin-top"
                      >
                        <div class="flex items-center justify-between mb-4">
                          <button
                            @click="mesAnterior"
                            type="button"
                            class="p-1.5 text-slate-400 hover:text-institucional-primario hover:bg-slate-50 rounded-lg transition-colors"
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
                          <span
                            class="font-bold text-slate-700 text-sm capitalize"
                            >{{ mesAnioActualText }}</span
                          >
                          <button
                            @click="mesSiguiente"
                            type="button"
                            class="p-1.5 text-slate-400 hover:text-institucional-primario hover:bg-slate-50 rounded-lg transition-colors"
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
                                d="M9 5l7 7-7-7"
                              />
                            </svg>
                          </button>
                        </div>
                        <div class="grid grid-cols-7 gap-1 mb-2">
                          <div
                            v-for="dia in diasSemana"
                            :key="dia"
                            class="text-center text-[10px] font-bold text-slate-400 uppercase tracking-wider py-1"
                          >
                            {{ dia }}
                          </div>
                        </div>
                        <div class="grid grid-cols-7 gap-1">
                          <div
                            v-for="(dia, index) in diasDelMes"
                            :key="index"
                            class="aspect-square flex items-center justify-center"
                          >
                            <button
                              v-if="dia"
                              @click="seleccionarDia(dia)"
                              type="button"
                              class="w-8 h-8 rounded-full flex items-center justify-center text-sm transition-all"
                              :class="[
                                esDiaSeleccionado(dia)
                                  ? 'bg-institucional-primario text-white font-bold shadow-md shadow-institucional-primario/30'
                                  : esHoy(dia)
                                    ? 'bg-institucional-primario/10 text-institucional-primario font-bold hover:bg-institucional-primario/20'
                                    : 'text-slate-600 hover:bg-slate-100 font-medium',
                              ]"
                            >
                              {{ dia }}
                            </button>
                          </div>
                        </div>
                        <div
                          class="mt-4 pt-3 border-t border-slate-100 flex justify-center"
                        >
                          <button
                            @click="setHoy"
                            type="button"
                            class="font-bold text-institucional-primario hover:text-institucional-secundario transition-colors uppercase tracking-wider text-xs"
                          >
                            Ir a Hoy
                          </button>
                        </div>
                      </div>
                    </Transition>
                    <div
                      v-if="selectorFechaAbierto"
                      @click="selectorFechaAbierto = false"
                      class="fixed inset-0 z-40"
                    ></div>
                  </div>

                  <!-- FOLIO DEL TICKET -->
                  <div class="sm:col-span-3 relative z-10">
                    <label
                      class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2"
                      >Folio del Ticket
                      <span class="text-red-500">*</span></label
                    >
                    <input
                      type="text"
                      v-model="formularioCarga.folio"
                      placeholder="Ej. 657384645"
                      class="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-institucional-primario/15 focus:border-institucional-primario text-slate-700 outline-none transition-all font-mono text-sm"
                    />
                  </div>

                  <!-- LITROS -->
                  <div class="sm:col-span-2 relative z-10">
                    <label
                      class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2"
                      >Volumen <span class="text-red-500">*</span></label
                    >
                    <div class="relative">
                      <input
                        type="number"
                        step="0.01"
                        v-model="formularioCarga.litros"
                        placeholder="0.00"
                        class="w-full pl-4 pr-10 py-3 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-institucional-primario/15 focus:border-institucional-primario text-slate-700 outline-none transition-all font-mono text-sm"
                      />
                      <span
                        class="absolute inset-y-0 right-0 flex items-center pr-4 text-sm font-bold text-slate-400 pointer-events-none"
                        >L</span
                      >
                    </div>
                  </div>

                  <!-- COSTO TOTAL -->
                  <div class="sm:col-span-2 relative z-10">
                    <label
                      class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2"
                      >Costo Total <span class="text-red-500">*</span></label
                    >
                    <div class="relative">
                      <span
                        class="absolute inset-y-0 left-0 flex items-center pl-4 text-sm font-bold text-slate-400 pointer-events-none"
                        >$</span
                      >
                      <input
                        type="number"
                        step="0.01"
                        v-model="formularioCarga.costo"
                        placeholder="0.00"
                        class="w-full pl-8 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-institucional-primario/15 focus:border-institucional-primario text-slate-700 outline-none transition-all font-mono text-sm"
                      />
                    </div>
                  </div>

                  <!-- ODÓMETRO -->
                  <div class="sm:col-span-2 relative z-10">
                    <label
                      class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2"
                      >Odómetro (Km) <span class="text-red-500">*</span></label
                    >
                    <input
                      type="number"
                      v-model="formularioCarga.kilometraje"
                      placeholder="Ej. 125000"
                      class="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-institucional-primario/15 focus:border-institucional-primario text-slate-700 outline-none transition-all font-mono text-sm"
                    />
                  </div>
                </div>
              </div>

              <div
                class="bg-slate-50 px-6 py-4 flex justify-end gap-3 border-t border-slate-100 rounded-b-2xl relative z-10"
              >
                <button
                  @click="cerrarModalNuevaCarga"
                  type="button"
                  class="px-5 py-2.5 text-sm font-medium text-slate-500 hover:text-slate-700 hover:bg-slate-200/50 rounded-lg transition-colors"
                >
                  Cancelar
                </button>
                <button
                  @click="guardarNuevaCarga"
                  :disabled="
                    guardandoCarga ||
                    (unidadSeleccionadaObj && saldoRestanteDespuesDeCarga < 0)
                  "
                  type="button"
                  class="text-white text-sm font-bold py-2.5 px-6 rounded-lg transition-all duration-200 flex items-center gap-2"
                  :class="
                    unidadSeleccionadaObj && saldoRestanteDespuesDeCarga < 0
                      ? 'bg-red-500 hover:bg-red-500 cursor-not-allowed opacity-80'
                      : 'bg-institucional-secundario hover:bg-orange-600 shadow-md shadow-orange-500/20 transform hover:-translate-y-0.5 active:scale-95 disabled:opacity-50'
                  "
                >
                  <span v-if="guardandoCarga">Guardando...</span>
                  <span
                    v-else-if="
                      unidadSeleccionadaObj && saldoRestanteDespuesDeCarga < 0
                    "
                    >Saldo Insuficiente</span
                  >
                  <span v-else>Confirmar Registro</span>
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
              >{{
                toast.tipo === "success"
                  ? "Notificación COREV"
                  : "Aviso del Sistema"
              }}</span
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
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { supabase } from "../lib/supabaseClient";

// INTERFACES
interface Unidad {
  id_unidad: number | string;
  numero_economico: string;
  modelo: string;
  placas: string;
}

interface Conductor {
  id_conductor: number | string;
  nombre_completo: string;
}

interface CargaCombustible {
  id_carga: number;
  id_unidad?: number;
  folio_ticket: string;
  litros: number;
  costo_total: number;
  estatus: "Pendiente" | "Aprobado" | "Rechazado";
  fecha_carga?: string;
  catalogo_unidades?: { numero_economico: string; modelo?: string };
  catalogo_personal?: { nombre_completo: string };
  viajes_operativos?: {
    created_at: string;
    catalogo_unidades: { numero_economico: string };
    catalogo_personal: { nombre_completo: string };
  };
}

interface Presupuesto {
  id_presupuesto: number;
  id_unidad: number;
  anio: number;
  mes: number;
  monto_presupuesto: number;
  catalogo_unidades?: { numero_economico: string; modelo: string };
}

// ESTADO GENERAL
const cargas = ref<CargaCombustible[]>([]);
const cargando = ref(true);
const pestanaActiva = ref<"conciliacion" | "historial" | "presupuesto">(
  "conciliacion",
);

// ESTADO FINANCIERO (PRESUPUESTOS)
const presupuestoGlobalMes = ref(0);
const presupuestoUnidadSeleccionada = ref(0);
const presupuestosTabla = ref<Presupuesto[]>([]);
const cargandoPresupuestos = ref(false);

// ESTADO TOAST
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

// ESTADO DE MODALES
const modalAuditoriaAbierto = ref(false);
const modalNuevaCargaAbierto = ref(false);
const cargaSeleccionada = ref<CargaCombustible | null>(null);
const guardandoCarga = ref(false);

// MODAL PRESUPUESTO BASE
const modalPresupuestoAbierto = ref(false);
const guardandoPresupuesto = ref(false);
const modoEdicionPresupuesto = ref(false);
const selectorPresupuestoUnidadAbierto = ref(false);
const selectorPresupuestoMesAbierto = ref(false);

const formularioAsignacion = ref({
  id_unidad: "",
  mes: new Date().getMonth() + 1,
  anio: new Date().getFullYear(),
  monto: "" as string | number,
});

// MODAL TRANSFERENCIA (SUMA CERO)
const modalTransferenciaAbierto = ref(false);
const guardandoTransferencia = ref(false);
const selectorTransferenciaOrigenAbierto = ref(false);
const selectorTransferenciaDestinoAbierto = ref(false);

const formularioTransferencia = ref({
  origen: "",
  destino: "",
  monto: "" as string | number,
});

// MODAL AUTORIZACIÓN EXTRAORDINARIA
const modalAutorizacionExtraAbierto = ref(false);
const validandoAutorizacion = ref(false);
const itemPendientePresupuesto = ref<Presupuesto | null>(null);
const modoExtraordinarioConcedido = ref<"1" | "2" | null>(null);

const formularioAutorizacion = ref({
  email: "",
  password: "",
  tipoAccion: "2",
});

// FORMULARIO DE NUEVA CARGA PREMIUM
const formularioCarga = ref({
  id_unidad: "",
  id_conductor: "",
  fecha: "",
  folio: "",
  litros: "",
  costo: "",
  kilometraje: "",
});

const unidadesOperativas = ref<Unidad[]>([]);
const catalogoConductores = ref<Conductor[]>([]);
const cargandoVehiculos = ref(false);
const cargandoConductores = ref(false);

const selectorUnidadAbierto = ref(false);
const selectorConductorAbierto = ref(false);
const selectorFechaAbierto = ref(false);

const unidadSeleccionadaObj = ref<Unidad | null>(null);
const conductorSeleccionadoObj = ref<Conductor | null>(null);

// LÓGICA DE CALENDARIO PREMIUM
const fechaVisualizacion = ref(new Date());
const diasSemana = ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"];
const mesesNombres = [
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

const obtenerNombreMes = (mesNum: number) => mesesNombres[mesNum - 1] || "";

const mesAnterior = () => {
  fechaVisualizacion.value = new Date(
    fechaVisualizacion.value.getFullYear(),
    fechaVisualizacion.value.getMonth() - 1,
    1,
  );
};
const mesSiguiente = () => {
  fechaVisualizacion.value = new Date(
    fechaVisualizacion.value.getFullYear(),
    fechaVisualizacion.value.getMonth() + 1,
    1,
  );
};
const mesAnioActualText = computed(
  () =>
    `${mesesNombres[fechaVisualizacion.value.getMonth()]} ${fechaVisualizacion.value.getFullYear()}`,
);
const diasDelMes = computed(() => {
  const year = fechaVisualizacion.value.getFullYear();
  const month = fechaVisualizacion.value.getMonth();
  const primerDia = new Date(year, month, 1).getDay();
  const diasEnMes = new Date(year, month + 1, 0).getDate();
  const dias = [];
  for (let i = 0; i < primerDia; i++) dias.push(null);
  for (let i = 1; i <= diasEnMes; i++) dias.push(i);
  return dias;
});

const seleccionarDia = (dia: number) => {
  const year = fechaVisualizacion.value.getFullYear();
  const month = (fechaVisualizacion.value.getMonth() + 1)
    .toString()
    .padStart(2, "0");
  const dayStr = dia.toString().padStart(2, "0");
  formularioCarga.value.fecha = `${year}-${month}-${dayStr}`;
  selectorFechaAbierto.value = false;
};

const esDiaSeleccionado = (dia: number) => {
  if (!formularioCarga.value.fecha) return false;
  const [y, m, d] = formularioCarga.value.fecha.split("-");
  return (
    parseInt(y) === fechaVisualizacion.value.getFullYear() &&
    parseInt(m) === fechaVisualizacion.value.getMonth() + 1 &&
    parseInt(d) === dia
  );
};

const esHoy = (dia: number) => {
  const hoy = new Date();
  return (
    hoy.getFullYear() === fechaVisualizacion.value.getFullYear() &&
    hoy.getMonth() === fechaVisualizacion.value.getMonth() &&
    hoy.getDate() === dia
  );
};

const setHoy = () => {
  const hoy = new Date();
  const y = hoy.getFullYear();
  const m = (hoy.getMonth() + 1).toString().padStart(2, "0");
  const d = hoy.getDate().toString().padStart(2, "0");
  formularioCarga.value.fecha = `${y}-${m}-${d}`;
  fechaVisualizacion.value = new Date(y, hoy.getMonth(), 1);
  selectorFechaAbierto.value = false;
};

const textoFechaSeleccionada = computed(() => {
  if (!formularioCarga.value.fecha) return "";
  const [y, m, d] = formularioCarga.value.fecha.split("-");
  return `${d}/${m}/${y}`;
});

// CONTROL DE SELECTORES
const cerrarTodosLosSelectores = () => {
  selectorUnidadAbierto.value = false;
  selectorConductorAbierto.value = false;
  selectorFechaAbierto.value = false;
  selectorPresupuestoUnidadAbierto.value = false;
  selectorPresupuestoMesAbierto.value = false;
  selectorTransferenciaOrigenAbierto.value = false;
  selectorTransferenciaDestinoAbierto.value = false;
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

const toggleSelectorFecha = () => {
  const estado = !selectorFechaAbierto.value;
  cerrarTodosLosSelectores();
  selectorFechaAbierto.value = estado;
  if (estado && formularioCarga.value.fecha) {
    const [y, m, d] = formularioCarga.value.fecha.split("-");
    fechaVisualizacion.value = new Date(parseInt(y), parseInt(m) - 1, 1);
  }
};

const seleccionarUnidad = async (unidad: Unidad) => {
  formularioCarga.value.id_unidad = unidad.id_unidad.toString();
  unidadSeleccionadaObj.value = unidad;
  selectorUnidadAbierto.value = false;
  await cargarPresupuestoUnidad(unidad.id_unidad.toString());
};

const seleccionarConductor = (conductor: Conductor) => {
  formularioCarga.value.id_conductor = conductor.id_conductor.toString();
  conductorSeleccionadoObj.value = conductor;
  selectorConductorAbierto.value = false;
};

// =======================================================
// LÓGICA DE PRESUPUESTOS Y KPIs FINANCIEROS
// =======================================================

const cargarPresupuestoGlobal = async () => {
  const hoy = new Date();
  const anioActual = hoy.getFullYear();
  const mesActual = hoy.getMonth() + 1;

  try {
    const { data, error } = await supabase
      .from("presupuestos_combustible")
      .select("monto_presupuesto")
      .eq("anio", anioActual)
      .eq("mes", mesActual);

    if (!error && data) {
      presupuestoGlobalMes.value = data.reduce(
        (acc, curr) => acc + Number(curr.monto_presupuesto),
        0,
      );
    }
  } catch (error) {
    console.error(error);
  }
};

const cargarPresupuestosTabla = async () => {
  cargandoPresupuestos.value = true;
  const hoy = new Date();
  const anioActual = hoy.getFullYear();
  const mesActual = hoy.getMonth() + 1;
  try {
    const { data, error } = await supabase
      .from("presupuestos_combustible")
      .select(
        `id_presupuesto, id_unidad, anio, mes, monto_presupuesto, catalogo_unidades(numero_economico, modelo)`,
      )
      .eq("anio", anioActual)
      .eq("mes", mesActual)
      .order("id_unidad", { ascending: true });

    if (error) throw error;
    presupuestosTabla.value = data as any;
  } catch (error) {
    console.error("Error cargando presupuestos", error);
  } finally {
    cargandoPresupuestos.value = false;
  }
};

const cargarPresupuestoUnidad = async (id_unidad: string) => {
  const hoy = new Date();
  try {
    const { data, error } = await supabase
      .from("presupuestos_combustible")
      .select("monto_presupuesto")
      .eq("id_unidad", id_unidad)
      .eq("anio", hoy.getFullYear())
      .eq("mes", hoy.getMonth() + 1)
      .single();

    if (!error && data)
      presupuestoUnidadSeleccionada.value = Number(data.monto_presupuesto);
    else presupuestoUnidadSeleccionada.value = 0;
  } catch (error) {
    presupuestoUnidadSeleccionada.value = 0;
  }
};

// =======================================================
// LÓGICA DE VENTANAS Y AUTORIZACIÓN EXTRAORDINARIA
// =======================================================

const diaActual = new Date().getDate();
const esVentanaAsignacion = computed(() => diaActual >= 23 && diaActual <= 26);
const esVentanaTransferencia = computed(
  () =>
    (diaActual >= 7 && diaActual <= 10) || (diaActual >= 17 && diaActual <= 20),
);

// FLUJO 1: ASIGNAR BASE (Crea dinero de la nada)
const intentarAsignarBase = (item: Presupuesto | null) => {
  if (esVentanaAsignacion.value || modoExtraordinarioConcedido.value === "1") {
    abrirModalGestionPresupuesto(item);
  } else {
    formularioAutorizacion.value = { email: "", password: "", tipoAccion: "1" };
    itemPendientePresupuesto.value = item;
    modalAutorizacionExtraAbierto.value = true;
  }
};

// FLUJO 2: TRANSFERIR (Suma cero)
const intentarTransferir = () => {
  if (
    esVentanaTransferencia.value ||
    modoExtraordinarioConcedido.value === "2"
  ) {
    abrirModalTransferencia();
  } else {
    formularioAutorizacion.value = { email: "", password: "", tipoAccion: "2" };
    modalAutorizacionExtraAbierto.value = true;
  }
};

const validarAutorizacionExtra = async () => {
  if (
    !formularioAutorizacion.value.email ||
    !formularioAutorizacion.value.password
  ) {
    mostrarToast("Ingresa tus credenciales de administrador.", "warning");
    return;
  }

  validandoAutorizacion.value = true;
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: formularioAutorizacion.value.email,
      password: formularioAutorizacion.value.password,
    });

    if (error) throw error;

    mostrarToast("Autorización exitosa. Reglas desbloqueadas.", "success");
    modalAutorizacionExtraAbierto.value = false;

    // Guardar el permiso concedido
    modoExtraordinarioConcedido.value = formularioAutorizacion.value
      .tipoAccion as "1" | "2";

    // Abrir el modal correspondiente
    if (modoExtraordinarioConcedido.value === "1") {
      abrirModalGestionPresupuesto(itemPendientePresupuesto.value);
    } else {
      abrirModalTransferencia();
    }
  } catch (error: any) {
    mostrarToast("Credenciales inválidas o sin permisos.", "warning");
  } finally {
    validandoAutorizacion.value = false;
  }
};

// =======================================================
// GESTIÓN DE MODALES
// =======================================================

// 1. MODAL ASIGNAR BASE
const abrirModalGestionPresupuesto = (item: Presupuesto | null) => {
  cerrarTodosLosSelectores();
  if (item) {
    modoEdicionPresupuesto.value = true;
    formularioAsignacion.value = {
      id_unidad: item.id_unidad.toString(),
      mes: item.mes,
      anio: item.anio,
      monto: item.monto_presupuesto,
    };
  } else {
    modoEdicionPresupuesto.value = false;
    const hoy = new Date();
    formularioAsignacion.value = {
      id_unidad: "",
      mes: hoy.getMonth() + 1,
      anio: hoy.getFullYear(),
      monto: "",
    };
  }
  modalPresupuestoAbierto.value = true;
};

const cerrarModalPresupuesto = () => {
  modalPresupuestoAbierto.value = false;
  selectorPresupuestoUnidadAbierto.value = false;
  selectorPresupuestoMesAbierto.value = false;
};

const guardarPresupuesto = async () => {
  if (
    !formularioAsignacion.value.id_unidad ||
    !formularioAsignacion.value.monto
  ) {
    mostrarToast("Selecciona una unidad y especifica el monto.", "warning");
    return;
  }

  guardandoPresupuesto.value = true;
  try {
    const { data: existente } = await supabase
      .from("presupuestos_combustible")
      .select("id_presupuesto")
      .eq("id_unidad", formularioAsignacion.value.id_unidad)
      .eq("mes", formularioAsignacion.value.mes)
      .eq("anio", formularioAsignacion.value.anio)
      .single();

    if (existente) {
      await supabase
        .from("presupuestos_combustible")
        .update({
          monto_presupuesto: Number(formularioAsignacion.value.monto),
        })
        .eq("id_presupuesto", existente.id_presupuesto);
    } else {
      await supabase.from("presupuestos_combustible").insert({
        id_unidad: parseInt(formularioAsignacion.value.id_unidad),
        mes: formularioAsignacion.value.mes,
        anio: formularioAsignacion.value.anio,
        monto_presupuesto: Number(formularioAsignacion.value.monto),
      });
    }

    mostrarToast("Presupuesto base guardado correctamente.", "success");
    cerrarModalPresupuesto();
    await cargarPresupuestosTabla();
    await cargarPresupuestoGlobal();
    if (
      unidadSeleccionadaObj.value &&
      unidadSeleccionadaObj.value.id_unidad.toString() ===
        formularioAsignacion.value.id_unidad
    ) {
      await cargarPresupuestoUnidad(formularioAsignacion.value.id_unidad);
    }
  } catch (error: any) {
    console.error(error);
    mostrarToast("Error al guardar presupuesto.", "warning");
  } finally {
    guardandoPresupuesto.value = false;
  }
};

// 2. MODAL TRANSFERENCIA (SUMA CERO)
const abrirModalTransferencia = () => {
  cerrarTodosLosSelectores();
  formularioTransferencia.value = { origen: "", destino: "", monto: "" };
  modalTransferenciaAbierto.value = true;
};

const cerrarModalTransferencia = () => {
  modalTransferenciaAbierto.value = false;
  selectorTransferenciaOrigenAbierto.value = false;
  selectorTransferenciaDestinoAbierto.value = false;
};

const disponibleOrigenTransferencia = computed(() => {
  if (!formularioTransferencia.value.origen) return 0;
  const hoy = new Date();
  const pres = presupuestosTabla.value.find(
    (p) =>
      p.id_unidad.toString() === formularioTransferencia.value.origen &&
      p.mes === hoy.getMonth() + 1 &&
      p.anio === hoy.getFullYear(),
  );
  if (!pres) return 0;
  const consumido = calcularConsumoUnidadMes(
    pres.id_unidad,
    pres.mes,
    pres.anio,
  );
  return pres.monto_presupuesto - consumido;
});

const guardarTransferencia = async () => {
  const montoTransferir = Number(formularioTransferencia.value.monto);
  if (
    !formularioTransferencia.value.origen ||
    !formularioTransferencia.value.destino ||
    montoTransferir <= 0
  ) {
    mostrarToast("Completa los datos de origen, destino y monto.", "warning");
    return;
  }
  if (
    formularioTransferencia.value.origen ===
    formularioTransferencia.value.destino
  ) {
    mostrarToast(
      "La unidad origen y destino no pueden ser la misma.",
      "warning",
    );
    return;
  }
  if (montoTransferir > disponibleOrigenTransferencia.value) {
    mostrarToast("Saldo insuficiente en la unidad origen.", "warning");
    return;
  }

  guardandoTransferencia.value = true;
  const hoy = new Date();
  const mesActual = hoy.getMonth() + 1;
  const anioActual = hoy.getFullYear();

  try {
    const presOrigen = presupuestosTabla.value.find(
      (p) =>
        p.id_unidad.toString() === formularioTransferencia.value.origen &&
        p.mes === mesActual &&
        p.anio === anioActual,
    );
    const presDestino = presupuestosTabla.value.find(
      (p) =>
        p.id_unidad.toString() === formularioTransferencia.value.destino &&
        p.mes === mesActual &&
        p.anio === anioActual,
    );

    if (!presOrigen)
      throw new Error(
        "La unidad origen no tiene presupuesto base asignado este mes.",
      );

    // Restar a origen
    await supabase
      .from("presupuestos_combustible")
      .update({
        monto_presupuesto: presOrigen.monto_presupuesto - montoTransferir,
      })
      .eq("id_presupuesto", presOrigen.id_presupuesto);

    // Sumar a destino
    if (presDestino) {
      await supabase
        .from("presupuestos_combustible")
        .update({
          monto_presupuesto: presDestino.monto_presupuesto + montoTransferir,
        })
        .eq("id_presupuesto", presDestino.id_presupuesto);
    } else {
      // Si el destino no tenía presupuesto, se le crea uno nuevo con el saldo transferido
      await supabase.from("presupuestos_combustible").insert({
        id_unidad: parseInt(formularioTransferencia.value.destino),
        mes: mesActual,
        anio: anioActual,
        monto_presupuesto: montoTransferir,
      });
    }

    mostrarToast("Transferencia realizada con éxito.", "success");
    cerrarModalTransferencia();
    await cargarPresupuestosTabla();
    await cargarPresupuestoGlobal();
    if (
      unidadSeleccionadaObj.value &&
      (unidadSeleccionadaObj.value.id_unidad.toString() ===
        formularioTransferencia.value.origen ||
        unidadSeleccionadaObj.value.id_unidad.toString() ===
          formularioTransferencia.value.destino)
    ) {
      await cargarPresupuestoUnidad(
        unidadSeleccionadaObj.value.id_unidad.toString(),
      );
    }
  } catch (error: any) {
    console.error(error);
    mostrarToast("Error procesando la transferencia.", "warning");
  } finally {
    guardandoTransferencia.value = false;
  }
};

// KPIs CÁLCULOS
const consumoGlobalMes = computed(() => {
  const hoy = new Date();
  const anioActual = hoy.getFullYear();
  const mesActual = hoy.getMonth() + 1;
  return cargas.value
    .filter((c) => {
      if (c.estatus !== "Aprobado") return false;
      const fecha = new Date(
        c.fecha_carga || c.viajes_operativos?.created_at || "",
      );
      return (
        fecha.getMonth() + 1 === mesActual && fecha.getFullYear() === anioActual
      );
    })
    .reduce((acc, curr) => acc + Number(curr.costo_total), 0);
});

const porcentajeConsumoGlobal = computed(() => {
  if (presupuestoGlobalMes.value === 0) return 0;
  return (consumoGlobalMes.value / presupuestoGlobalMes.value) * 100;
});

const litrosGlobalMes = computed(() => {
  const hoy = new Date();
  const anioActual = hoy.getFullYear();
  const mesActual = hoy.getMonth() + 1;
  return cargas.value
    .filter((c) => {
      if (c.estatus !== "Aprobado") return false;
      const fecha = new Date(
        c.fecha_carga || c.viajes_operativos?.created_at || "",
      );
      return (
        fecha.getMonth() + 1 === mesActual && fecha.getFullYear() === anioActual
      );
    })
    .reduce((acc, curr) => acc + Number(curr.litros), 0);
});

const calcularConsumoUnidadMes = (
  id_unidad: number,
  mes: number,
  anio: number,
) => {
  return cargas.value
    .filter((c) => {
      if (c.estatus !== "Aprobado") return false;
      const esMismaUnidad =
        c.id_unidad === id_unidad ||
        c.viajes_operativos?.catalogo_unidades?.numero_economico ===
          unidadesOperativas.value.find((u) => u.id_unidad === id_unidad)
            ?.numero_economico;
      const fecha = new Date(
        c.fecha_carga || c.viajes_operativos?.created_at || "",
      );
      return (
        esMismaUnidad &&
        fecha.getMonth() + 1 === mes &&
        fecha.getFullYear() === anio
      );
    })
    .reduce((acc, curr) => acc + Number(curr.costo_total), 0);
};

const consumoUnidadSeleccionada = computed(() => {
  if (!formularioCarga.value.id_unidad) return 0;
  const hoy = new Date();
  return calcularConsumoUnidadMes(
    parseInt(formularioCarga.value.id_unidad),
    hoy.getMonth() + 1,
    hoy.getFullYear(),
  );
});

const saldoRestanteDespuesDeCarga = computed(() => {
  const disponibleReal =
    presupuestoUnidadSeleccionada.value - consumoUnidadSeleccionada.value;
  const costoSiendoCapturado = Number(formularioCarga.value.costo) || 0;
  return disponibleReal - costoSiendoCapturado;
});

const ticketsPendientes = computed(() => {
  return cargas.value.filter((c) => c.estatus === "Pendiente");
});

const cargasVisibles = computed(() => {
  if (pestanaActiva.value === "conciliacion") return ticketsPendientes.value;
  return cargas.value;
});

// UTILIDADES
const formatearMoneda = (cantidad: number) => {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
  }).format(cantidad);
};
const formatearFecha = (fechaString?: string) => {
  if (!fechaString) return "Sin fecha";
  const fecha = new Date(fechaString);
  return fecha.toLocaleDateString("es-MX", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// FETCH DATA
const cargarVehiculos = async () => {
  cargandoVehiculos.value = true;
  try {
    const { data, error } = await supabase
      .from("catalogo_unidades")
      .select("id_unidad, numero_economico, modelo, placas")
      .order("id_unidad", { ascending: true });
    if (error) throw error;
    unidadesOperativas.value = data || [];
  } catch (error) {
    console.error(error);
  } finally {
    cargandoVehiculos.value = false;
  }
};

const cargarConductores = async () => {
  cargandoConductores.value = true;
  try {
    const { data, error } = await supabase
      .from("catalogo_personal")
      .select("id_conductor, nombre_completo")
      .order("nombre_completo", { ascending: true });
    if (error) throw error;
    catalogoConductores.value = data || [];
  } catch (error) {
    console.error(error);
  } finally {
    cargandoConductores.value = false;
  }
};

const obtenerCargas = async () => {
  cargando.value = true;
  try {
    const { data, error } = await supabase
      .from("cargas_combustible")
      .select(
        `id_carga, id_unidad, folio_ticket, litros, costo_total, estatus, fecha_carga, viajes_operativos ( created_at, catalogo_unidades (numero_economico), catalogo_personal (nombre_completo) ), catalogo_unidades ( numero_economico ), catalogo_personal ( nombre_completo )`,
      )
      .order("id_carga", { ascending: false });
    if (error) throw error;
    cargas.value = data as any;
  } catch (error) {
    console.error(error);
  } finally {
    cargando.value = false;
  }
};

const abrirModalAuditoria = (carga: CargaCombustible) => {
  cargaSeleccionada.value = carga;
  modalAuditoriaAbierto.value = true;
};
const cerrarModalAuditoria = () => {
  modalAuditoriaAbierto.value = false;
  setTimeout(() => {
    cargaSeleccionada.value = null;
  }, 300);
};

const abrirModalNuevaCarga = () => {
  const hoy = new Date();
  const y = hoy.getFullYear();
  const m = (hoy.getMonth() + 1).toString().padStart(2, "0");
  const d = hoy.getDate().toString().padStart(2, "0");
  formularioCarga.value.fecha = `${y}-${m}-${d}`;
  modalNuevaCargaAbierto.value = true;
};

const cerrarModalNuevaCarga = () => {
  modalNuevaCargaAbierto.value = false;
  setTimeout(() => {
    formularioCarga.value = {
      id_unidad: "",
      id_conductor: "",
      fecha: "",
      folio: "",
      litros: "",
      costo: "",
      kilometraje: "",
    };
    unidadSeleccionadaObj.value = null;
    conductorSeleccionadoObj.value = null;
    presupuestoUnidadSeleccionada.value = 0;
  }, 300);
};

const guardarNuevaCarga = async () => {
  if (
    !formularioCarga.value.id_unidad ||
    !formularioCarga.value.id_conductor ||
    !formularioCarga.value.fecha ||
    !formularioCarga.value.folio ||
    !formularioCarga.value.litros ||
    !formularioCarga.value.costo ||
    !formularioCarga.value.kilometraje
  ) {
    mostrarToast(
      "Por favor completa todos los campos obligatorios.",
      "warning",
    );
    return;
  }
  guardandoCarga.value = true;
  try {
    const { error } = await supabase.from("cargas_combustible").insert({
      id_unidad: parseInt(formularioCarga.value.id_unidad),
      id_conductor: parseInt(formularioCarga.value.id_conductor),
      fecha_carga: formularioCarga.value.fecha,
      folio_ticket: formularioCarga.value.folio,
      litros: parseFloat(formularioCarga.value.litros),
      costo_total: parseFloat(formularioCarga.value.costo),
      kilometraje_carga: parseInt(formularioCarga.value.kilometraje),
      estatus: "Aprobado",
    });
    if (error) throw error;

    mostrarToast("Carga manual registrada y aprobada con éxito.", "success");
    cerrarModalNuevaCarga();
    await obtenerCargas();
  } catch (error: any) {
    mostrarToast(
      `Error BD: ${error.message || error.details || "Revisa la consola"}`,
      "warning",
    );
  } finally {
    guardandoCarga.value = false;
  }
};

const auditarTicket = async (nuevoEstatus: "Aprobado" | "Rechazado") => {
  if (!cargaSeleccionada.value) return;
  try {
    const { error } = await supabase
      .from("cargas_combustible")
      .update({ estatus: nuevoEstatus })
      .eq("id_carga", cargaSeleccionada.value.id_carga);
    if (error) throw error;
    const indice = cargas.value.findIndex(
      (c) => c.id_carga === cargaSeleccionada.value?.id_carga,
    );
    if (indice !== -1) {
      cargas.value[indice].estatus = nuevoEstatus;
    }
    mostrarToast(
      `El ticket ha sido ${nuevoEstatus.toLowerCase()} correctamente.`,
      "success",
    );
    cerrarModalAuditoria();
  } catch (error) {
    mostrarToast("Hubo un problema al auditar el ticket.", "warning");
  }
};

onMounted(async () => {
  await cargarVehiculos();
  cargarConductores();
  await obtenerCargas();
  await cargarPresupuestoGlobal();
  await cargarPresupuestosTabla();
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
</style>
