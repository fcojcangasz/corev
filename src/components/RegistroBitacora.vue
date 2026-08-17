<template>
  <section class="max-w-5xl mx-auto p-6 font-sans">
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
          Registro de Bitácora Diaria
        </h2>
      </div>
      <p class="text-sm text-slate-500 ml-14">
        Control operativo de salidas y retornos de unidades.
      </p>
    </header>

    <!-- ======================================================= -->
    <!-- FORMULARIO DE SALIDA                                    -->
    <!-- ======================================================= -->
    <form
      @submit.prevent="registrarSalida"
      novalidate
      class="bg-white border border-slate-100 rounded-2xl shadow-xl shadow-slate-200/40 relative z-10 flex flex-col"
    >
      <!-- ENCABEZADO PREMIUM DE LA TARJETA -->
      <div
        class="bg-slate-50 border-b border-slate-100 px-6 sm:px-8 py-5 flex items-center gap-3 rounded-t-2xl"
      >
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
            d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
          />
        </svg>
        <h3 class="text-sm font-bold text-slate-700 uppercase tracking-wider">
          Datos de Salida
        </h3>
      </div>

      <!-- CUERPO DEL FORMULARIO -->
      <div class="p-6 sm:p-8 pb-12">
        <div class="grid grid-cols-1 sm:grid-cols-6 gap-6">
          <!-- CAMPO 1: Vehículo -->
          <div
            class="sm:col-span-3 relative"
            :class="selectorUnidadAbierto ? 'z-[100]' : 'z-10'"
          >
            <label
              class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2"
              >Vehículo <span class="text-red-500">*</span></label
            >
            <button
              @click="toggleSelectorUnidad"
              type="button"
              :disabled="enviando || cargandoVehiculos"
              class="w-full flex items-center justify-between pl-4 pr-4 py-3 bg-white border text-left transition-all rounded-xl outline-none cursor-pointer disabled:bg-slate-50 disabled:cursor-not-allowed"
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
                <span v-else class="text-slate-400 text-sm">
                  {{
                    cargandoVehiculos
                      ? "Cargando vehículos..."
                      : "Seleccione una unidad..."
                  }}
                </span>
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
                <div class="max-h-64 overflow-y-auto hide-scrollbar py-2">
                  <button
                    v-for="unidad in unidadesOperativas"
                    :key="unidad.id_unidad"
                    @click="seleccionarUnidad(unidad)"
                    type="button"
                    class="w-full text-left px-4 py-2.5 transition-colors flex flex-col items-start gap-0.5 border-b border-slate-50 last:border-0"
                    :class="
                      formulario.id_unidad === unidad.id_unidad.toString()
                        ? 'bg-institucional-primario/10'
                        : 'hover:bg-slate-50'
                    "
                  >
                    <span
                      class="text-sm"
                      :class="
                        formulario.id_unidad === unidad.id_unidad.toString()
                          ? 'text-institucional-primario font-bold'
                          : 'text-slate-700 font-bold'
                      "
                    >
                      {{ unidad.numero_economico }}
                    </span>
                    <span
                      class="text-[11px] truncate w-full"
                      :class="
                        formulario.id_unidad === unidad.id_unidad.toString()
                          ? 'text-institucional-primario/80'
                          : 'text-slate-500'
                      "
                    >
                      {{ unidad.modelo }} ({{ unidad.placas }})
                    </span>
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

          <!-- CAMPO 2: Conductor -->
          <div class="sm:col-span-3 relative z-40">
            <label
              class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2"
              >Nombre del Conductor</label
            >
            <div class="relative">
              <svg
                class="absolute left-4 top-3.5 w-5 h-5 text-slate-400"
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
              <input
                type="text"
                v-model="formulario.nombre_conductor"
                readonly
                placeholder="Identificando usuario..."
                class="w-full pl-12 pr-4 py-3 bg-slate-50/50 border border-slate-200 text-slate-600 rounded-xl outline-none cursor-not-allowed font-medium text-sm"
              />
            </div>
          </div>

          <!-- CAMPO 3: FECHA -->
          <div class="sm:col-span-2 relative z-40">
            <label
              class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2"
              >Fecha <span class="text-red-500">*</span></label
            >
            <button
              @click="toggleSelectorFecha"
              type="button"
              :disabled="enviando"
              class="w-full flex items-center justify-between pl-4 pr-4 py-3 bg-white border text-left transition-all rounded-xl outline-none cursor-pointer disabled:bg-slate-50 disabled:cursor-not-allowed"
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
                    formulario.fecha
                      ? 'text-slate-800 font-bold text-sm'
                      : 'text-slate-400 text-sm'
                  "
                >
                  {{ textoFechaSeleccionada || "Seleccione una fecha..." }}
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
                class="absolute top-full left-0 mt-2 w-72 bg-white rounded-xl shadow-2xl border border-slate-100 z-50 flex flex-col p-4"
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
                  <span class="font-bold text-slate-700 text-sm capitalize">{{
                    mesAnioActualText
                  }}</span>
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
                        d="M9 5l7 7-7 7"
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
                    class="xs font-bold text-institucional-primario hover:text-institucional-secundario transition-colors uppercase tracking-wider text-xs"
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

          <!-- CAMPO 4: HORA DE SALIDA -->
          <div class="sm:col-span-2 relative z-50">
            <label
              class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2"
              >Hora de Salida <span class="text-red-500">*</span></label
            >
            <button
              @click="toggleSelectorHoraSalida"
              type="button"
              :disabled="enviando"
              class="w-full flex items-center justify-between pl-4 pr-4 py-3 bg-white border text-left transition-all rounded-xl outline-none cursor-pointer disabled:bg-slate-50 disabled:cursor-not-allowed"
              :class="
                selectorHoraSalidaAbierto
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
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span
                  :class="
                    formulario.hora_salida
                      ? 'text-slate-800 font-bold text-sm'
                      : 'text-slate-400 text-sm'
                  "
                >
                  {{
                    formulario.hora_salida
                      ? formatHoraAmPm(formulario.hora_salida)
                      : "--:--"
                  }}
                </span>
              </div>
              <svg
                class="w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200"
                :class="{ 'rotate-180': selectorHoraSalidaAbierto }"
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
                v-if="selectorHoraSalidaAbierto"
                class="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-slate-100 z-50 flex flex-col overflow-hidden"
              >
                <div class="flex h-56">
                  <div
                    class="flex-1 overflow-y-auto hide-scrollbar border-r border-slate-100 p-2 scroll-smooth"
                  >
                    <div
                      class="text-[10px] font-bold text-slate-400 uppercase text-center mb-2 sticky top-0 bg-white/90 backdrop-blur py-1 z-10"
                    >
                      Hora
                    </div>
                    <button
                      v-for="h in horasArray"
                      :key="`h-${h}`"
                      @click="setHoraSalida(h)"
                      type="button"
                      class="w-full py-2 mb-1 rounded-lg text-sm transition-all"
                      :class="
                        horaSalidaActiva === h
                          ? 'bg-institucional-primario text-white font-bold shadow-md shadow-institucional-primario/30'
                          : 'text-slate-600 hover:bg-slate-100 font-medium'
                      "
                    >
                      {{ h }}
                    </button>
                  </div>
                  <div
                    class="flex-1 overflow-y-auto hide-scrollbar p-2 scroll-smooth"
                  >
                    <div
                      class="text-[10px] font-bold text-slate-400 uppercase text-center mb-2 sticky top-0 bg-white/90 backdrop-blur py-1 z-10"
                    >
                      Minuto
                    </div>
                    <button
                      v-for="m in minutosArray"
                      :key="`m-${m}`"
                      @click="setMinutoSalida(m)"
                      type="button"
                      class="w-full py-2 mb-1 rounded-lg text-sm transition-all"
                      :class="
                        minutoSalidaActivo === m
                          ? 'bg-institucional-primario text-white font-bold shadow-md shadow-institucional-primario/30'
                          : 'text-slate-600 hover:bg-slate-100 font-medium'
                      "
                    >
                      {{ m }}
                    </button>
                  </div>
                </div>
                <div
                  class="p-3 border-t border-slate-100 flex justify-center bg-slate-50"
                >
                  <button
                    @click="setHoraSalidaActual"
                    type="button"
                    class="xs font-bold text-institucional-primario hover:text-institucional-secundario transition-colors uppercase tracking-wider text-xs"
                  >
                    Hora Actual
                  </button>
                </div>
              </div>
            </Transition>
            <div
              v-if="selectorHoraSalidaAbierto"
              @click="selectorHoraSalidaAbierto = false"
              class="fixed inset-0 z-40"
            ></div>
          </div>

          <!-- CAMPO 5: Kilometraje Inicial -->
          <div class="sm:col-span-2 relative z-20">
            <label
              class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2"
              >Kilometraje Inicial <span class="text-red-500">*</span></label
            >
            <div class="relative">
              <span
                class="absolute left-4 top-3.5 text-slate-400 font-bold font-mono"
                >+</span
              >
              <input
                type="text"
                v-model="formulario.km_inicial"
                required
                placeholder="Ej. 50000"
                :readonly="kmInicialBloqueado"
                :disabled="enviando"
                class="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 text-slate-700 focus:ring-4 focus:ring-institucional-primario/10 focus:border-institucional-primario outline-none transition-all rounded-xl font-mono text-sm disabled:bg-slate-50 read-only:bg-slate-50/50 read-only:text-slate-500"
              />
            </div>
          </div>

          <!-- CAMPO 6: Destino -->
          <div class="sm:col-span-3 relative z-30">
            <label
              class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2"
              >Destino <span class="text-red-500">*</span></label
            >
            <button
              @click="toggleSelectorDestino"
              type="button"
              :disabled="enviando || cargandoDestinos"
              class="w-full flex items-center justify-between pl-4 pr-4 py-3 bg-white border text-left transition-all rounded-xl outline-none cursor-pointer disabled:bg-slate-50 disabled:cursor-not-allowed"
              :class="
                selectorDestinoAbierto
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
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <div
                  class="flex flex-col truncate"
                  v-if="destinoSeleccionadoObj"
                >
                  <span class="text-slate-800 font-bold text-sm">{{
                    destinoSeleccionadoObj.nombre_edificio
                  }}</span>
                </div>
                <span v-else class="text-slate-400 text-sm">
                  {{
                    cargandoDestinos
                      ? "Cargando destinos..."
                      : "Seleccione el destino..."
                  }}
                </span>
              </div>
              <svg
                class="w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200"
                :class="{ 'rotate-180': selectorDestinoAbierto }"
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
                v-if="selectorDestinoAbierto"
                class="absolute top-full left-0 mt-2 w-full bg-white rounded-xl shadow-2xl border border-slate-100 z-50 overflow-hidden flex flex-col"
              >
                <div class="max-h-64 overflow-y-auto hide-scrollbar py-2">
                  <button
                    v-for="destino in destinosCatalogo"
                    :key="destino.id_destino"
                    @click="seleccionarDestino(destino)"
                    type="button"
                    class="w-full text-left px-4 py-2.5 transition-colors flex flex-col items-start gap-0.5 border-b border-slate-50 last:border-0"
                    :class="
                      formulario.destino === destino.id_destino.toString()
                        ? 'bg-institucional-primario/10'
                        : 'hover:bg-slate-50'
                    "
                  >
                    <span
                      class="text-sm"
                      :class="
                        formulario.destino === destino.id_destino.toString()
                          ? 'text-institucional-primario font-bold'
                          : 'text-slate-700 font-bold'
                      "
                    >
                      {{ destino.nombre_edificio }}
                    </span>
                    <span
                      class="text-[11px] truncate w-full"
                      :class="
                        formulario.destino === destino.id_destino.toString()
                          ? 'text-institucional-primario/80'
                          : 'text-slate-500'
                      "
                    >
                      Tipo: {{ destino.tipo }}
                    </span>
                  </button>
                </div>
              </div>
            </Transition>
            <div
              v-if="selectorDestinoAbierto"
              @click="selectorDestinoAbierto = false"
              class="fixed inset-0 z-40"
            ></div>
          </div>

          <!-- CAMPO 7: Motivo -->
          <div class="sm:col-span-3 relative z-30">
            <label
              class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2"
              >Motivo del Viaje <span class="text-red-500">*</span></label
            >
            <button
              @click="toggleSelectorMotivo"
              type="button"
              :disabled="enviando"
              class="w-full flex items-center justify-between pl-4 pr-4 py-3 bg-white border text-left transition-all rounded-xl outline-none cursor-pointer disabled:bg-slate-50 disabled:cursor-not-allowed"
              :class="
                selectorMotivoAbierto
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
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <span
                  :class="
                    formulario.motivo_viaje
                      ? 'text-slate-800 font-bold text-sm'
                      : 'text-slate-400 text-sm'
                  "
                >
                  {{ formulario.motivo_viaje || "-- Selecciona un Motivo --" }}
                </span>
              </div>
              <svg
                class="w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200"
                :class="{ 'rotate-180': selectorMotivoAbierto }"
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
                v-if="selectorMotivoAbierto"
                class="absolute top-full left-0 mt-2 w-full bg-white rounded-xl shadow-2xl border border-slate-100 z-50 overflow-hidden flex flex-col"
              >
                <div class="py-2">
                  <button
                    v-for="motivo in motivosCatalogo"
                    :key="motivo"
                    @click="seleccionarMotivo(motivo)"
                    type="button"
                    class="w-full text-left px-4 py-2.5 text-sm transition-colors border-b border-slate-50 last:border-0"
                    :class="
                      formulario.motivo_viaje === motivo
                        ? 'bg-institucional-primario/10 text-institucional-primario font-bold'
                        : 'text-slate-700 hover:bg-slate-50 font-medium'
                    "
                  >
                    {{ motivo }}
                  </button>
                </div>
              </div>
            </Transition>
            <div
              v-if="selectorMotivoAbierto"
              @click="selectorMotivoAbierto = false"
              class="fixed inset-0 z-40"
            ></div>
          </div>
        </div>

        <!-- Botón de Envío -->
        <div
          class="mt-10 pt-6 border-t border-slate-100 flex justify-end relative z-10"
        >
          <button
            type="submit"
            :disabled="enviando || !perfilIdSesion"
            class="w-full md:w-auto flex items-center justify-center gap-2 bg-institucional-secundario text-white px-8 py-3.5 rounded-xl font-bold shadow-lg shadow-institucional-secundario/30 hover:bg-orange-600 transition-all active:scale-95 text-sm uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ enviando ? "Registrando..." : "Confirmar y Registrar Salida" }}
            <svg
              v-if="!enviando"
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
                d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
              />
            </svg>
          </button>
        </div>
      </div>
    </form>

    <!-- ======================================================= -->
    <!-- TABLA: VIAJES EN CURSO (Pendientes de Cierre)           -->
    <!-- ======================================================= -->
    <div
      class="mt-12 bg-white border border-slate-100 rounded-2xl p-6 shadow-xl shadow-slate-200/40 max-w-5xl relative z-0"
    >
      <div class="flex items-center gap-2 mb-6 text-institucional-secundario">
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
            d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
        <h3 class="text-lg font-bold text-slate-800">
          Viajes en Curso
          <span class="font-normal text-slate-400 text-sm ml-1"
            >(Pendientes de Cierre)</span
          >
        </h3>
      </div>

      <div class="overflow-x-auto rounded-xl border border-slate-100">
        <table class="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr class="bg-slate-50 border-b border-slate-100">
              <th
                class="py-3 px-5 font-semibold text-xs text-slate-500 uppercase tracking-wider"
              >
                ID
              </th>
              <th
                class="py-3 px-5 font-semibold text-xs text-slate-500 uppercase tracking-wider"
              >
                Unidad
              </th>
              <th
                class="py-3 px-5 font-semibold text-xs text-slate-500 uppercase tracking-wider"
              >
                Hora Salida
              </th>
              <th
                class="py-3 px-5 font-semibold text-xs text-slate-500 uppercase tracking-wider"
              >
                Km Inicial
              </th>
              <th
                class="py-3 px-5 font-semibold text-xs text-slate-500 uppercase tracking-wider text-right"
              >
                Acción
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr
              v-if="cargandoViajes"
              class="hover:bg-slate-50/80 transition-colors"
            >
              <td colspan="5" class="py-8 text-center text-slate-500 text-sm">
                Cargando viajes en curso...
              </td>
            </tr>
            <tr
              v-else-if="viajesActivos.length === 0"
              class="hover:bg-slate-50/80 transition-colors"
            >
              <td colspan="5" class="py-8 text-center text-slate-500 text-sm">
                No hay viajes en curso en este momento.
              </td>
            </tr>
            <tr
              v-else
              v-for="viaje in viajesActivos"
              :key="viaje.id_viaje"
              class="hover:bg-slate-50/80 transition-colors group"
            >
              <td class="py-4 px-5">
                <span
                  class="px-2.5 py-1 rounded-full bg-institucional-secundario/10 text-institucional-secundario text-xs font-bold border border-institucional-secundario/20"
                >
                  #{{ viaje.id_viaje }}
                </span>
              </td>
              <td class="py-4 px-5 text-sm font-medium text-slate-700">
                {{ viaje.catalogo_unidades?.numero_economico || "N/D" }} -
                {{ viaje.catalogo_unidades?.modelo || "N/D" }}
              </td>
              <td class="py-4 px-5 text-sm text-slate-600">
                {{ formatHoraAmPm(viaje.hora_salida) }}
              </td>
              <td class="py-4 px-5 text-sm text-slate-600 font-mono">
                {{ viaje.km_inicial }}
              </td>
              <td class="py-4 px-5 text-right">
                <button
                  @click="abrirModalCierre(viaje)"
                  type="button"
                  class="bg-institucional-secundario text-white px-4 py-2 text-sm font-medium rounded-lg hover:bg-orange-600 transition-colors shadow-sm shadow-orange-500/20 active:scale-95"
                >
                  Completar Retorno
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- ======================================================= -->
    <!-- MODAL: CIERRE DE VIAJE Y COMBUSTIBLE                    -->
    <!-- ======================================================= -->
    <Teleport to="body">
      <Transition name="modal">
        <div
          v-if="viajeActivo && viajeSeleccionado"
          class="fixed inset-0 z-[100] flex items-center justify-center px-4 sm:px-0"
        >
          <div
            class="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
            @click="cerrarModal"
          ></div>

          <div
            class="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl flex flex-col transform transition-all"
          >
            <div
              class="bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between rounded-t-2xl z-20"
            >
              <h3 class="text-institucional-primario text-lg font-bold">
                Cierre de Viaje y Combustible
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
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div
              class="p-6 sm:p-8 overflow-y-auto max-h-[80vh] hide-scrollbar relative z-10"
            >
              <div
                class="mb-6 px-4 py-3 bg-orange-50 border border-orange-100/50 rounded-xl flex items-center gap-3 text-institucional-secundario"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  class="w-5 h-5 shrink-0"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                  />
                </svg>
                <span class="text-sm"
                  >Registrando retorno para la unidad:
                  <strong class="font-bold">{{
                    viajeSeleccionado.catalogo_unidades?.numero_economico
                  }}</strong>
                </span>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <!-- HORA DE LLEGADA -->
                <div class="relative z-50">
                  <label class="block text-sm font-medium text-slate-600 mb-1.5"
                    >Hora de Llegada <span class="text-red-500">*</span></label
                  >
                  <button
                    @click="toggleSelectorHoraLlegada"
                    type="button"
                    class="w-full flex items-center justify-between pl-4 pr-4 py-2.5 bg-white border text-left transition-all rounded-lg outline-none cursor-pointer"
                    :class="
                      selectorHoraLlegadaAbierto
                        ? 'border-institucional-secundario ring-4 ring-institucional-secundario/10'
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
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span
                        :class="
                          formularioCierre.hora_llegada
                            ? 'text-slate-800 font-bold text-sm'
                            : 'text-slate-400 text-sm'
                        "
                      >
                        {{
                          formularioCierre.hora_llegada
                            ? formatHoraAmPm(formularioCierre.hora_llegada)
                            : "--:--"
                        }}
                      </span>
                    </div>
                    <svg
                      class="w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200"
                      :class="{ 'rotate-180': selectorHoraLlegadaAbierto }"
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
                      v-if="selectorHoraLlegadaAbierto"
                      class="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-slate-100 z-50 flex flex-col overflow-hidden"
                    >
                      <div class="flex h-48">
                        <div
                          class="flex-1 overflow-y-auto hide-scrollbar border-r border-slate-100 p-2 scroll-smooth"
                        >
                          <div
                            class="text-[10px] font-bold text-slate-400 uppercase text-center mb-2 sticky top-0 bg-white/90 backdrop-blur py-1 z-10"
                          >
                            Hora
                          </div>
                          <button
                            v-for="h in horasArray"
                            :key="`hl-${h}`"
                            @click="setHoraLlegada(h)"
                            type="button"
                            class="w-full py-2 mb-1 rounded-lg text-sm transition-all"
                            :class="
                              horaLlegadaActiva === h
                                ? 'bg-institucional-secundario text-white font-bold shadow-md shadow-institucional-secundario/30'
                                : 'text-slate-600 hover:bg-slate-100 font-medium'
                            "
                          >
                            {{ h }}
                          </button>
                        </div>
                        <div
                          class="flex-1 overflow-y-auto hide-scrollbar p-2 scroll-smooth"
                        >
                          <div
                            class="text-[10px] font-bold text-slate-400 uppercase text-center mb-2 sticky top-0 bg-white/90 backdrop-blur py-1 z-10"
                          >
                            Minuto
                          </div>
                          <button
                            v-for="m in minutosArray"
                            :key="`ml-${m}`"
                            @click="setMinutoLlegada(m)"
                            type="button"
                            class="w-full py-2 mb-1 rounded-lg text-sm transition-all"
                            :class="
                              minutoLlegadaActivo === m
                                ? 'bg-institucional-secundario text-white font-bold shadow-md shadow-institucional-secundario/30'
                                : 'text-slate-600 hover:bg-slate-100 font-medium'
                            "
                          >
                            {{ m }}
                          </button>
                        </div>
                      </div>
                      <div
                        class="p-3 border-t border-slate-100 flex justify-center bg-slate-50"
                      >
                        <button
                          @click="setHoraLlegadaActual"
                          type="button"
                          class="xs font-bold text-institucional-secundario hover:text-orange-600 transition-colors uppercase tracking-wider text-xs"
                        >
                          Hora Actual
                        </button>
                      </div>
                    </div>
                  </Transition>
                  <div
                    v-if="selectorHoraLlegadaAbierto"
                    @click="selectorHoraLlegadaAbierto = false"
                    class="fixed inset-0 z-40"
                  ></div>
                </div>

                <div class="relative z-40">
                  <label class="block text-sm font-medium text-slate-600 mb-1.5"
                    >Kilometraje Final
                    <span class="text-red-500">*</span></label
                  >
                  <input
                    type="number"
                    v-model="formularioCierre.km_final"
                    placeholder="Ej. 50010"
                    class="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:ring-4 focus:ring-institucional-primario/15 focus:border-institucional-primario text-slate-700 outline-none transition-all"
                  />
                </div>
              </div>

              <div
                class="mt-8 bg-slate-50/50 border border-slate-100 p-5 rounded-xl relative z-10"
              >
                <h4
                  class="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    class="w-4 h-4 text-slate-400"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                    />
                  </svg>
                  Justificación de Combustible (Opcional)
                </h4>
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label class="block text-xs font-medium text-slate-500 mb-1"
                      >ID de Ticket</label
                    >
                    <input
                      type="text"
                      v-model="formularioCierre.ticket_id"
                      placeholder="000000001"
                      class="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-4 focus:ring-institucional-secundario/15 focus:border-institucional-secundario outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label class="block text-xs font-medium text-slate-500 mb-1"
                      >Monto ($)</label
                    >
                    <input
                      type="number"
                      v-model="formularioCierre.ticket_monto"
                      placeholder="1000.00"
                      class="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-4 focus:ring-institucional-secundario/15 focus:border-institucional-secundario outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label class="block text-xs font-medium text-slate-500 mb-1"
                      >Litros</label
                    >
                    <input
                      type="number"
                      v-model="formularioCierre.ticket_litros"
                      placeholder="100.00"
                      class="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-4 focus:ring-institucional-secundario/15 focus:border-institucional-secundario outline-none transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div
              class="bg-slate-50 px-6 py-4 flex justify-end gap-3 border-t border-slate-100 rounded-b-2xl z-20"
            >
              <button
                @click="cerrarModal"
                type="button"
                class="px-5 py-2.5 text-sm font-medium text-slate-500 hover:text-slate-700 hover:bg-slate-200/50 rounded-lg transition-colors"
              >
                Cancelar
              </button>
              <button
                @click="registrarRetorno"
                :disabled="guardandoRetorno"
                type="button"
                class="bg-institucional-secundario hover:bg-orange-600 text-white text-sm font-medium py-2.5 px-6 rounded-lg shadow-md shadow-orange-500/20 transition-all duration-200 transform hover:-translate-y-0.5 active:scale-95 disabled:opacity-50"
              >
                {{ guardandoRetorno ? "Cerrando..." : "Confirmar Cierre" }}
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- ======================================================= -->
    <!-- TOAST DE NOTIFICACIÓN                                   -->
    <!-- ======================================================= -->
    <Teleport to="body">
      <Transition name="toast">
        <div
          v-if="toast.visible"
          class="fixed bottom-6 right-6 z-[200] flex items-center gap-3.5 px-6 py-4 rounded-2xl shadow-2xl border text-white transition-all transform backdrop-blur-md"
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
            >
              {{
                toast.tipo === "success"
                  ? "Notificación COREV"
                  : "Aviso del Sistema"
              }}
            </span>
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

    <!-- ======================================================= -->
    <!-- MODAL DE ERROR CRÍTICO (Glassmorphism Central)          -->
    <!-- ======================================================= -->
    <Teleport to="body">
      <Transition name="modal">
        <div
          v-if="alertaCritica.visible"
          class="fixed inset-0 z-[300] flex items-center justify-center px-4"
        >
          <div
            class="absolute inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity"
            @click="cerrarAlertaCritica"
          ></div>

          <div
            class="relative bg-white/95 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8 max-w-md w-full flex flex-col items-center text-center transform transition-all"
          >
            <div
              class="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center text-red-600 mb-5 shadow-inner"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                class="w-8 h-8"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                />
              </svg>
            </div>

            <h3 class="text-xl font-bold text-slate-800 tracking-tight mb-2">
              {{ alertaCritica.titulo }}
            </h3>

            <p class="text-sm text-slate-500 mb-8 leading-relaxed">
              {{ alertaCritica.mensaje }}
            </p>

            <button
              @click="cerrarAlertaCritica"
              type="button"
              class="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-slate-900/20 transition-all active:scale-95 text-sm uppercase tracking-wider"
            >
              Entendido, Reintentar
            </button>
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { supabase } from "../lib/supabaseClient";

const router = useRouter();

interface Unidad {
  id_unidad: number | string;
  numero_economico: string;
  modelo: string;
  placas: string;
}

interface Destino {
  id_destino: number | string;
  nombre_edificio: string;
  tipo: string;
}

interface ViajeActivo {
  id_viaje: number;
  id_unidad: number | string;
  hora_salida: string;
  km_inicial: number;
  catalogo_unidades?: {
    numero_economico: string;
    modelo: string;
  };
}

const enviando = ref(false);
const kmInicialBloqueado = ref(false);
const viajeActivo = ref(false);
const guardandoRetorno = ref(false);
const perfilIdSesion = ref<string | null>(null);

const conductorIdNumerico = ref<number | null>(null);

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

const alertaCritica = ref({
  visible: false,
  titulo: "",
  mensaje: "",
});

const mostrarAlertaCritica = (titulo: string, mensaje: string) => {
  alertaCritica.value = { visible: true, titulo, mensaje };
};

const cerrarAlertaCritica = () => {
  alertaCritica.value.visible = false;
};

const formulario = ref({
  id_unidad: "",
  nombre_conductor: "",
  fecha: "",
  hora_salida: "",
  km_inicial: "" as string | number,
  destino: "",
  motivo_viaje: "",
});

const formularioCierre = ref({
  hora_llegada: "",
  km_final: "",
  ticket_id: "",
  ticket_monto: "",
  ticket_litros: "",
});
const viajeSeleccionado = ref<ViajeActivo | null>(null);

const unidadesOperativas = ref<Unidad[]>([]);
const destinosCatalogo = ref<Destino[]>([]);
const viajesActivos = ref<ViajeActivo[]>([]);

const cargandoVehiculos = ref(false);
const cargandoDestinos = ref(false);
const cargandoViajes = ref(false);

const selectorUnidadAbierto = ref(false);
const selectorDestinoAbierto = ref(false);
const selectorMotivoAbierto = ref(false);
const selectorFechaAbierto = ref(false);
const selectorHoraSalidaAbierto = ref(false);
const selectorHoraLlegadaAbierto = ref(false);

const unidadSeleccionadaObj = ref<Unidad | null>(null);
const destinoSeleccionadoObj = ref<Destino | null>(null);

const motivosCatalogo = [
  "Carga de Combustible",
  "Envío de Documentación",
  "Traslado de Servidores Públicos",
  "Traslado para Soporte en Sitio",
];

const horasArray = Array.from({ length: 24 }, (_, i) =>
  i.toString().padStart(2, "0"),
);
const minutosArray = Array.from({ length: 60 }, (_, i) =>
  i.toString().padStart(2, "0"),
);

const cerrarTodosLosSelectores = () => {
  selectorUnidadAbierto.value = false;
  selectorDestinoAbierto.value = false;
  selectorMotivoAbierto.value = false;
  selectorFechaAbierto.value = false;
  selectorHoraSalidaAbierto.value = false;
  selectorHoraLlegadaAbierto.value = false;
};

const toggleSelectorUnidad = () => {
  const estado = !selectorUnidadAbierto.value;
  cerrarTodosLosSelectores();
  selectorUnidadAbierto.value = estado;
};
const toggleSelectorDestino = () => {
  const estado = !selectorDestinoAbierto.value;
  cerrarTodosLosSelectores();
  selectorDestinoAbierto.value = estado;
};
const toggleSelectorMotivo = () => {
  const estado = !selectorMotivoAbierto.value;
  cerrarTodosLosSelectores();
  selectorMotivoAbierto.value = estado;
};
const toggleSelectorFecha = () => {
  const estado = !selectorFechaAbierto.value;
  cerrarTodosLosSelectores();
  selectorFechaAbierto.value = estado;
  if (estado && formulario.value.fecha) {
    const [y, m, d] = formulario.value.fecha.split("-");
    fechaVisualizacion.value = new Date(parseInt(y), parseInt(m) - 1, 1);
  }
};
const toggleSelectorHoraSalida = () => {
  const estado = !selectorHoraSalidaAbierto.value;
  cerrarTodosLosSelectores();
  selectorHoraSalidaAbierto.value = estado;
};
const toggleSelectorHoraLlegada = () => {
  selectorHoraLlegadaAbierto.value = !selectorHoraLlegadaAbierto.value;
};

const seleccionarUnidad = (unidad: Unidad) => {
  formulario.value.id_unidad = unidad.id_unidad.toString();
  unidadSeleccionadaObj.value = unidad;
  selectorUnidadAbierto.value = false;
  obtenerUltimoKilometraje();
};
const seleccionarDestino = (destino: Destino) => {
  formulario.value.destino = destino.id_destino.toString();
  destinoSeleccionadoObj.value = destino;
  selectorDestinoAbierto.value = false;
};
const seleccionarMotivo = (motivo: string) => {
  formulario.value.motivo_viaje = motivo;
  selectorMotivoAbierto.value = false;
};

const horaSalidaActiva = computed(
  () => formulario.value.hora_salida.split(":")[0] || "00",
);
const minutoSalidaActivo = computed(
  () => formulario.value.hora_salida.split(":")[1] || "00",
);

const setHoraSalida = (hora: string) => {
  const actual = formulario.value.hora_salida || "00:00";
  const m = actual.split(":")[1] || "00";
  formulario.value.hora_salida = `${hora}:${m}`;
};
const setMinutoSalida = (minuto: string) => {
  const actual = formulario.value.hora_salida || "00:00";
  const h = actual.split(":")[0] || "00";
  formulario.value.hora_salida = `${h}:${minuto}`;
};
const setHoraSalidaActual = () => {
  const hoy = new Date();
  formulario.value.hora_salida = hoy.toTimeString().slice(0, 5);
  selectorHoraSalidaAbierto.value = false;
};

const horaLlegadaActiva = computed(
  () => formularioCierre.value.hora_llegada.split(":")[0] || "00",
);
const minutoLlegadaActivo = computed(
  () => formularioCierre.value.hora_llegada.split(":")[1] || "00",
);

const setHoraLlegada = (hora: string) => {
  const actual = formularioCierre.value.hora_llegada || "00:00";
  const m = actual.split(":")[1] || "00";
  formularioCierre.value.hora_llegada = `${hora}:${m}`;
};
const setMinutoLlegada = (minuto: string) => {
  const actual = formularioCierre.value.hora_llegada || "00:00";
  const h = actual.split(":")[0] || "00";
  formularioCierre.value.hora_llegada = `${h}:${minuto}`;
};
const setHoraLlegadaActual = () => {
  const hoy = new Date();
  formularioCierre.value.hora_llegada = hoy.toTimeString().slice(0, 5);
  selectorHoraLlegadaAbierto.value = false;
};

const formatHoraAmPm = (timeStr: string) => {
  if (!timeStr) return "";
  let [h, m] = timeStr.split(":");
  let hour = parseInt(h);
  const ampm = hour >= 12 ? "p. m." : "a. m.";
  hour = hour % 12;
  hour = hour ? hour : 12;
  return `${hour.toString().padStart(2, "0")}:${m} ${ampm}`;
};

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
const mesAnioActualText = computed(() => {
  return `${mesesNombres[fechaVisualizacion.value.getMonth()]} ${fechaVisualizacion.value.getFullYear()}`;
});
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
  formulario.value.fecha = `${year}-${month}-${dayStr}`;
  selectorFechaAbierto.value = false;
};
const esDiaSeleccionado = (dia: number) => {
  if (!formulario.value.fecha) return false;
  const [y, m, d] = formulario.value.fecha.split("-");
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
  formulario.value.fecha = `${y}-${m}-${d}`;
  fechaVisualizacion.value = new Date(y, hoy.getMonth(), 1);
  selectorFechaAbierto.value = false;
};
const textoFechaSeleccionada = computed(() => {
  if (!formulario.value.fecha) return "";
  const [y, m, d] = formulario.value.fecha.split("-");
  return `${d}/${m}/${y}`;
});

const obtenerUsuarioActivo = async () => {
  try {
    const {
      data: { session },
      error: authError,
    } = await supabase.auth.getSession();
    if (authError) throw authError;

    if (session && session.user) {
      const userId = session.user.id;
      perfilIdSesion.value = userId;

      const { data: personalData, error: personalError } = await supabase
        .from("catalogo_personal")
        .select("id_conductor, nombre_completo")
        .eq("perfil_id", userId)
        .single();

      if (personalError) {
        console.warn(
          "El usuario no está registrado en el catálogo de personal:",
          personalError.message,
        );
        formulario.value.nombre_conductor = "Usuario sin ID operativo asignado";
      } else if (personalData) {
        formulario.value.nombre_conductor = personalData.nombre_completo;
        conductorIdNumerico.value = personalData.id_conductor;
      }
    } else {
      router.push("/");
    }
  } catch (error) {
    console.error("Error de sesión:", error);
    formulario.value.nombre_conductor = "Error de validación";
  }
};

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
    console.error("Error cargando unidades:", error);
  } finally {
    cargandoVehiculos.value = false;
  }
};

const cargarDestinos = async () => {
  cargandoDestinos.value = true;
  try {
    const { data, error } = await supabase
      .from("catalogo_destinos")
      .select("id_destino, nombre_edificio, tipo")
      .order("nombre_edificio", { ascending: true });

    if (error) throw error;
    destinosCatalogo.value = data || [];
  } catch (error) {
    console.error("Error cargando destinos:", error);
  } finally {
    cargandoDestinos.value = false;
  }
};

const cargarViajesActivos = async () => {
  cargandoViajes.value = true;
  try {
    const { data, error } = await supabase
      .from("viajes_operativos")
      .select(
        `
        id_viaje,
        id_unidad,
        id_conductor, 
        hora_salida,
        km_inicial,
        catalogo_unidades (numero_economico, modelo)
      `,
      ) // <-- Aquí agregamos id_conductor,
      .eq("estado", "EN_RUTA")
      .order("created_at", { ascending: false });

    if (error) throw error;
    viajesActivos.value = data || [];
  } catch (error) {
    console.error("Error cargando viajes en curso:", error);
  } finally {
    cargandoViajes.value = false;
  }
};

// ==========================================
// FIX 1: Lectura segura de Kilometraje (RPC)
// ==========================================
const obtenerUltimoKilometraje = async () => {
  if (!formulario.value.id_unidad) return;

  kmInicialBloqueado.value = true;
  formulario.value.km_inicial = "Buscando...";

  try {
    const { data, error } = await supabase.rpc("obtener_kilometraje_vehiculo", {
      p_id_unidad: parseInt(formulario.value.id_unidad),
    });

    if (error) throw error;

    formulario.value.km_inicial = data || 0;

    if (data > 0) {
      kmInicialBloqueado.value = true;
    } else {
      kmInicialBloqueado.value = false;
    }
  } catch (error: any) {
    console.error("Error buscando kilometraje mediante RPC:", error);
    formulario.value.km_inicial = 0;
    kmInicialBloqueado.value = false;
  }
};

// ==========================================
// FIX 2: Candado Anti-Duplicados en Ruta
// ==========================================
const registrarSalida = async () => {
  if (
    !formulario.value.id_unidad ||
    !formulario.value.destino ||
    !formulario.value.motivo_viaje ||
    !formulario.value.hora_salida ||
    !formulario.value.fecha
  ) {
    mostrarToast("Por favor completa los campos obligatorios.", "warning");
    return;
  }

  // Validación: ¿Está el vehículo ya en ruta?
  const vehiculoOcupado = viajesActivos.value.some(
    (viaje) =>
      viaje.id_unidad.toString() === formulario.value.id_unidad.toString(),
  );

  if (vehiculoOcupado) {
    mostrarToast("Error: Esta unidad ya se encuentra en ruta.", "warning");
    return;
  }

  enviando.value = true;
  try {
    const km_enviar =
      typeof formulario.value.km_inicial === "string"
        ? parseInt(formulario.value.km_inicial) || 0
        : formulario.value.km_inicial;

    const { error } = await supabase.from("viajes_operativos").insert([
      {
        perfil_id: perfilIdSesion.value,
        id_conductor: conductorIdNumerico.value,
        id_unidad: formulario.value.id_unidad,
        fecha: formulario.value.fecha,
        hora_salida: formulario.value.hora_salida,
        km_inicial: km_enviar,
        id_destino: formulario.value.destino,
        motivo_viaje: formulario.value.motivo_viaje,
        estado: "EN_RUTA",
      },
    ]);

    if (error) throw error;

    mostrarToast("¡Salida registrada exitosamente en COREV!", "success");

    formulario.value.id_unidad = "";
    unidadSeleccionadaObj.value = null;
    formulario.value.km_inicial = "";
    formulario.value.destino = "";
    destinoSeleccionadoObj.value = null;
    formulario.value.motivo_viaje = "";
    kmInicialBloqueado.value = false;

    await cargarViajesActivos();
  } catch (error: any) {
    console.error("Error al registrar salida:", error.message);
    mostrarAlertaCritica(
      "Error de Base de Datos",
      error.message ||
        "Ocurrió un error al guardar la salida en la plataforma.",
    );
  } finally {
    enviando.value = false;
  }
};

const abrirModalCierre = (viaje: ViajeActivo) => {
  viajeSeleccionado.value = viaje;
  const ahora = new Date();
  formularioCierre.value.hora_llegada = ahora.toTimeString().slice(0, 5);
  viajeActivo.value = true;
};

const cerrarModal = () => {
  viajeActivo.value = false;
  selectorHoraLlegadaAbierto.value = false;
  setTimeout(() => {
    viajeSeleccionado.value = null;
    formularioCierre.value = {
      hora_llegada: "",
      km_final: "",
      ticket_id: "",
      ticket_monto: "",
      ticket_litros: "",
    };
  }, 200);
};

const registrarRetorno = async () => {
  if (
    !viajeSeleccionado.value ||
    !formularioCierre.value.hora_llegada ||
    !formularioCierre.value.km_final
  ) {
    mostrarToast(
      "Completa la hora de llegada y el kilometraje final.",
      "warning",
    );
    return;
  }

  if (
    parseInt(formularioCierre.value.km_final) <
    viajeSeleccionado.value.km_inicial
  ) {
    mostrarToast(
      "El kilometraje final no puede ser menor al inicial.",
      "warning",
    );
    return;
  }

  guardandoRetorno.value = true;
  try {
    // 1. Cerramos el viaje (ya no actualizamos aquí los campos de gasolina)
    const { error: errorViaje } = await supabase
      .from("viajes_operativos")
      .update({
        hora_llegada: formularioCierre.value.hora_llegada,
        km_final: parseInt(formularioCierre.value.km_final),
        estado: "CERRADO",
      })
      .eq("id_viaje", viajeSeleccionado.value.id_viaje);

    if (errorViaje) throw errorViaje;

    // 2. Evaluamos si el conductor capturó algún dato del ticket
    const tieneTicket =
      formularioCierre.value.ticket_id || formularioCierre.value.ticket_monto;

    // 3. Si hay ticket, insertamos en la nueva tabla
    if (tieneTicket) {
      const { error: errorCombustible } = await supabase
        .from("cargas_combustible")
        .insert({
          id_viaje: viajeSeleccionado.value.id_viaje,
          id_unidad: viajeSeleccionado.value.id_unidad,
          id_conductor: viajeSeleccionado.value.id_conductor, // Asumiendo que viene en viajeSeleccionado
          fecha_carga: new Date().toISOString(),
          litros: parseFloat(formularioCierre.value.ticket_litros) || 0,
          costo_total: parseFloat(formularioCierre.value.ticket_monto) || 0,
          kilometraje_carga: parseInt(formularioCierre.value.km_final) || 0,
          folio_ticket: formularioCierre.value.ticket_id || "S/F",
          estado: "pendiente",
        });

      if (errorCombustible) {
        console.error("Error guardando el ticket:", errorCombustible);
        mostrarToast(
          "Viaje cerrado, pero hubo un error al guardar el ticket de combustible.",
          "warning",
        );
      }
    }

    mostrarToast("¡Retorno registrado correctamente!", "success");
    cerrarModal();
    await cargarViajesActivos();
  } catch (error: any) {
    console.error("Error al registrar retorno:", error.message);
    mostrarAlertaCritica(
      "Error de Base de Datos",
      error.message || "Ocurrió un error al actualizar el viaje.",
    );
  } finally {
    guardandoRetorno.value = false;
  }
};

onMounted(() => {
  obtenerUsuarioActivo();
  cargarVehiculos();
  cargarDestinos();
  cargarViajesActivos();

  const hoy = new Date();
  const y = hoy.getFullYear();
  const m = (hoy.getMonth() + 1).toString().padStart(2, "0");
  const d = hoy.getDate().toString().padStart(2, "0");

  formulario.value.fecha = `${y}-${m}-${d}`;
  formulario.value.hora_salida = hoy.toTimeString().slice(0, 5);
});
</script>

<style>
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
  transform: translateY(20px) scale(0.95);
}
</style>
