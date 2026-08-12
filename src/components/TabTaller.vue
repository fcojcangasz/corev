<template>
  <div class="animate-fade-in">
    <!-- TABLA PRINCIPAL VIVA -->
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
              d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
            />
          </svg>
          <div>
            <h3
              class="text-sm font-bold text-slate-700 uppercase tracking-wider"
            >
              Unidades en Taller
            </h3>
          </div>
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
          Registrar Ingreso
        </button>
      </div>

      <div class="overflow-x-auto rounded-b-2xl">
        <table class="w-full text-left border-collapse min-w-[900px]">
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
                Taller Automotriz
              </th>
              <th
                class="py-3 px-6 font-semibold text-xs text-slate-500 uppercase tracking-wider"
              >
                Categoría
              </th>
              <th
                class="py-3 px-6 font-semibold text-xs text-slate-500 uppercase tracking-wider text-center"
              >
                Estatus
              </th>
              <th
                class="py-3 px-6 font-semibold text-xs text-slate-500 uppercase tracking-wider text-center"
              >
                Acción
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 bg-white">
            <tr v-if="cargandoTabla">
              <td
                colspan="5"
                class="py-12 text-center text-slate-500 text-sm font-medium"
              >
                Consultando taller...
              </td>
            </tr>

            <tr v-else-if="listaMantenimientos.length === 0">
              <td
                colspan="5"
                class="py-12 text-center text-slate-500 text-sm font-medium"
              >
                No hay unidades en el taller en este momento.
              </td>
            </tr>

            <tr
              v-else
              v-for="mant in listaMantenimientos"
              :key="mant.id_mantenimiento"
              class="hover:bg-slate-50/80 transition-colors group"
            >
              <td class="py-4 px-6">
                <div class="flex items-center gap-2">
                  <span
                    class="font-bold text-slate-700 text-sm group-hover:text-institucional-primario transition-colors"
                    >{{
                      mant.catalogo_unidades?.numero_economico || "Desconocida"
                    }}</span
                  >
                  <span
                    v-if="
                      mant.catalogo_unidades?.tipo_propiedad === 'Arrendado'
                    "
                    class="px-1.5 py-0.5 bg-blue-100 text-blue-700 text-[9px] font-bold uppercase rounded border border-blue-200"
                    >Arrendado</span
                  >
                </div>
                <span class="block text-xs text-slate-500 mt-0.5"
                  >{{ mant.kilometraje_ingreso.toLocaleString() }} km</span
                >
              </td>
              <td class="py-4 px-6 text-sm font-medium text-slate-600">
                {{ mant.proveedor_taller }}
                <span
                  v-if="mant.descripcion_servicio"
                  class="block text-[10px] text-slate-400 mt-1 truncate max-w-[200px]"
                  :title="mant.descripcion_servicio"
                  >{{ mant.descripcion_servicio }}</span
                >
              </td>
              <td class="py-4 px-6 text-sm text-slate-600">
                {{ mant.categoria }}
              </td>
              <td class="py-4 px-6 text-center">
                <span
                  class="px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider font-bold border inline-block"
                  :class="
                    mant.estatus_servicio === 'Por Autorizar'
                      ? 'bg-amber-50 text-amber-600 border-amber-200'
                      : 'bg-blue-50 text-blue-600 border-blue-200'
                  "
                >
                  {{ mant.estatus_servicio }}
                </span>
              </td>
              <td class="py-4 px-6 text-center">
                <button
                  v-if="mant.estatus_servicio === 'Por Autorizar'"
                  @click="abrirModalEvaluacion(mant)"
                  class="px-4 py-1.5 text-xs font-bold text-amber-700 bg-amber-100 hover:bg-amber-200 border border-amber-300 rounded-lg transition-colors uppercase tracking-wider"
                >
                  Evaluar
                </button>
                <button
                  v-else-if="mant.estatus_servicio === 'Autorizado (En Taller)'"
                  @click="
                    ejecutarFinalizacion(
                      mant.id_mantenimiento,
                      String(mant.id_unidad),
                      mant.kilometraje_ingreso,
                    )
                  "
                  :disabled="isLoading"
                  class="px-4 py-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors disabled:opacity-50 uppercase tracking-wider"
                >
                  {{ isLoading ? "Procesando..." : "Finalizar" }}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- MODAL: REGISTRO DE INGRESO A TALLER -->
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
                  Registrar Ingreso a Taller
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

              <!-- AVISO ARRENDADO -->
              <div
                v-if="unidadSeleccionadaObj?.tipo_propiedad === 'Arrendado'"
                class="bg-blue-50 px-6 py-3 border-b border-blue-100 flex items-start gap-3"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="w-5 h-5 text-blue-500 shrink-0 mt-0.5"
                >
                  <path
                    fill-rule="evenodd"
                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                    clip-rule="evenodd"
                  />
                </svg>
                <p class="text-xs text-blue-800 font-medium">
                  <strong>Unidad Arrendada:</strong> Este registro se enviará
                  directo a "En Taller". El costo capturado no se descontará del
                  presupuesto estatal.
                </p>
              </div>

              <div class="p-6 sm:p-8 overflow-visible relative z-30">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <!-- SELECTOR UNIDAD -->
                  <div
                    class="sm:col-span-1 relative"
                    :class="selectorUnidadAbierto ? 'z-[100]' : 'z-40'"
                  >
                    <label
                      class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2"
                      >Vehículo <span class="text-red-500">*</span></label
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
                            class="w-full text-left px-4 py-2.5 transition-colors flex flex-col items-start gap-0.5 border-b border-slate-50 last:border-0"
                            :class="
                              formulario.id_unidad ===
                              unidad.id_unidad.toString()
                                ? 'bg-institucional-primario/10'
                                : 'hover:bg-slate-50'
                            "
                          >
                            <div
                              class="flex items-center justify-between w-full"
                            >
                              <span
                                class="text-sm"
                                :class="
                                  formulario.id_unidad ===
                                  unidad.id_unidad.toString()
                                    ? 'text-institucional-primario font-bold'
                                    : 'text-slate-700 font-bold'
                                "
                                >{{ unidad.numero_economico }}</span
                              >
                              <span
                                v-if="unidad.tipo_propiedad === 'Arrendado'"
                                class="text-[9px] text-blue-500 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-100"
                                >Arrendado</span
                              >
                            </div>
                            <span
                              class="text-[11px] truncate w-full text-slate-500"
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

                  <!-- SELECTOR CONDUCTOR -->
                  <div
                    class="sm:col-span-1 relative"
                    :class="selectorConductorAbierto ? 'z-[90]' : 'z-30'"
                  >
                    <label
                      class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2"
                      >Conductor que ingresa
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
                              class="text-sm"
                              :class="
                                formulario.conductor_id ===
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

                  <!-- SELECTOR CATEGORÍA -->
                  <div
                    class="sm:col-span-1 relative"
                    :class="selectorCategoriaAbierto ? 'z-[80]' : 'z-20'"
                  >
                    <label
                      class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2"
                      >Categoría <span class="text-red-500">*</span></label
                    >
                    <button
                      @click="toggleSelectorCategoria"
                      type="button"
                      class="w-full flex items-center justify-between px-4 py-3 bg-white border text-left transition-all rounded-xl outline-none cursor-pointer"
                      :class="
                        selectorCategoriaAbierto
                          ? 'border-institucional-primario ring-4 ring-institucional-primario/10'
                          : 'border-slate-200 text-slate-700 hover:border-slate-300'
                      "
                    >
                      <span
                        :class="
                          formulario.categoria
                            ? 'text-slate-800 font-bold text-sm'
                            : 'text-slate-400 text-sm'
                        "
                      >
                        {{ formulario.categoria || "Seleccione una..." }}
                      </span>
                      <svg
                        class="w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200"
                        :class="{ 'rotate-180': selectorCategoriaAbierto }"
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
                        v-if="selectorCategoriaAbierto"
                        class="absolute top-full left-0 mt-2 w-full bg-white rounded-xl shadow-2xl border border-slate-100 z-50 overflow-hidden flex flex-col"
                      >
                        <div
                          class="max-h-56 overflow-y-auto hide-scrollbar py-2"
                        >
                          <button
                            v-for="cat in opcionesCategoria"
                            :key="cat"
                            @click="seleccionarCategoria(cat)"
                            type="button"
                            class="w-full text-left px-4 py-2.5 transition-colors border-b border-slate-50 last:border-0 hover:bg-slate-50"
                            :class="
                              formulario.categoria === cat
                                ? 'bg-institucional-primario/10 text-institucional-primario font-bold'
                                : 'text-slate-700 font-bold text-sm'
                            "
                          >
                            {{ cat }}
                          </button>
                        </div>
                      </div>
                    </Transition>
                    <div
                      v-if="selectorCategoriaAbierto"
                      @click="selectorCategoriaAbierto = false"
                      class="fixed inset-0 z-40"
                    ></div>
                  </div>

                  <!-- SELECTOR TALLER AUTOMOTRIZ -->
                  <div
                    class="sm:col-span-1 relative"
                    :class="selectorTallerAbierto ? 'z-[70]' : 'z-20'"
                  >
                    <label
                      class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2"
                      >Taller Automotriz
                      <span class="text-red-500">*</span></label
                    >
                    <button
                      @click="toggleSelectorTaller"
                      type="button"
                      class="w-full flex items-center justify-between px-4 py-3 bg-white border text-left transition-all rounded-xl outline-none cursor-pointer"
                      :class="
                        selectorTallerAbierto
                          ? 'border-institucional-primario ring-4 ring-institucional-primario/10'
                          : 'border-slate-200 text-slate-700 hover:border-slate-300'
                      "
                    >
                      <div class="flex items-center gap-3 truncate w-full">
                        <span
                          :class="
                            formulario.proveedor_taller
                              ? 'text-slate-800 font-bold text-sm truncate'
                              : 'text-slate-400 text-sm truncate'
                          "
                        >
                          {{
                            formulario.proveedor_taller ||
                            (cargandoTalleres
                              ? "Cargando talleres..."
                              : "Seleccione taller...")
                          }}
                        </span>
                      </div>
                      <svg
                        class="w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200"
                        :class="{ 'rotate-180': selectorTallerAbierto }"
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
                        v-if="selectorTallerAbierto"
                        class="absolute top-full left-0 mt-2 w-full bg-white rounded-xl shadow-2xl border border-slate-100 z-50 overflow-hidden flex flex-col"
                      >
                        <div
                          class="max-h-56 overflow-y-auto hide-scrollbar py-2"
                        >
                          <button
                            v-for="taller in catalogoTalleres"
                            :key="taller.id_destino"
                            @click="seleccionarTaller(taller)"
                            type="button"
                            class="w-full text-left px-4 py-2.5 transition-colors border-b border-slate-50 last:border-0 hover:bg-slate-50"
                            :class="
                              formulario.proveedor_taller ===
                              taller.nombre_edificio
                                ? 'bg-institucional-primario/10 text-institucional-primario font-bold'
                                : 'text-slate-700 font-bold text-sm'
                            "
                          >
                            {{ taller.nombre_edificio }}
                          </button>
                        </div>
                      </div>
                    </Transition>
                    <div
                      v-if="selectorTallerAbierto"
                      @click="selectorTallerAbierto = false"
                      class="fixed inset-0 z-40"
                    ></div>
                  </div>

                  <!-- TEXTAREA DE DESCRIPCIÓN -->
                  <div class="sm:col-span-2 relative z-10">
                    <label
                      class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2"
                      >Descripción de los Trabajos
                      <span class="text-red-500">*</span></label
                    >
                    <textarea
                      v-model="formulario.descripcion_servicio"
                      rows="2"
                      placeholder="Ej. Afinación mayor, cambio de aceite sintético, balatas delanteras..."
                      class="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-institucional-primario/15 focus:border-institucional-primario text-slate-700 outline-none transition-all text-sm resize-none"
                    ></textarea>
                  </div>

                  <div class="sm:col-span-1 relative z-10">
                    <label
                      class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2"
                      >Odómetro de Ingreso
                      <span class="text-red-500">*</span></label
                    >
                    <input
                      type="number"
                      v-model="formulario.kilometraje_ingreso"
                      placeholder="Ej. 120500"
                      class="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-institucional-primario/15 focus:border-institucional-primario text-slate-700 outline-none transition-all font-mono text-sm"
                    />
                  </div>

                  <div class="sm:col-span-1 relative z-10">
                    <label
                      class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2"
                    >
                      {{
                        unidadSeleccionadaObj?.tipo_propiedad === "Arrendado"
                          ? "Costo Ref. (Arrendadora)"
                          : "Costo Cotizado"
                      }}
                      <span class="text-red-500">*</span>
                    </label>
                    <div class="relative">
                      <span
                        class="absolute inset-y-0 left-0 flex items-center pl-4 text-sm font-bold text-slate-400 pointer-events-none"
                        >$</span
                      >
                      <input
                        type="number"
                        step="0.01"
                        v-model="formulario.costo_total"
                        placeholder="0.00"
                        class="w-full pl-8 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-institucional-primario/15 focus:border-institucional-primario text-slate-700 outline-none transition-all font-mono text-sm"
                      />
                    </div>
                  </div>

                  <div class="sm:col-span-2 relative z-10">
                    <label
                      class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2"
                      >Enlace de Cotización (Google Drive)</label
                    >
                    <input
                      type="url"
                      v-model="formulario.url_cotizacion"
                      placeholder="https://drive.google.com/..."
                      class="w-full px-4 py-3 bg-blue-50 border border-blue-100 rounded-xl focus:ring-4 focus:ring-blue-500/15 focus:border-blue-500 text-blue-900 outline-none transition-all text-sm"
                    />
                  </div>

                  <div class="sm:col-span-2 relative z-10 -mt-2">
                    <label
                      class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2"
                      >Enlace de Orden de Trabajo / Evidencia</label
                    >
                    <input
                      type="url"
                      v-model="formulario.url_orden_trabajo"
                      placeholder="https://drive.google.com/..."
                      class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-slate-500/15 focus:border-slate-500 text-slate-700 outline-none transition-all text-sm"
                    />
                    <p class="text-[10px] text-slate-400 mt-2 font-medium">
                      Capture al menos un enlace documental. Los vehículos
                      propios requieren cotización para autorizarse.
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
                  @click="procesarIngreso"
                  :disabled="isSaving"
                  type="button"
                  class="bg-institucional-secundario hover:bg-orange-600 text-white text-sm font-bold py-2.5 px-6 rounded-lg shadow-md shadow-orange-500/20 transition-all duration-200 transform hover:-translate-y-0.5 active:scale-95 disabled:opacity-50 flex items-center gap-2"
                >
                  <span v-if="isSaving">Procesando...</span>
                  <span v-else>Confirmar Registro</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- MODAL: EVALUACIÓN DE COTIZACIÓN -->
    <Teleport to="body">
      <Transition name="modal">
        <div
          v-if="modalEvaluacionAbierto"
          class="fixed inset-0 z-[100] overflow-y-auto"
        >
          <div
            class="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
            @click="cerrarModalEvaluacion"
          ></div>
          <div class="flex min-h-full items-center justify-center p-4 sm:p-0">
            <div
              class="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg flex flex-col transform transition-all font-sans my-8"
            >
              <div
                class="bg-slate-50 border-b border-slate-100 px-6 py-4 flex items-center justify-between rounded-t-2xl relative z-20"
              >
                <div class="flex items-center gap-3">
                  <div class="p-2 bg-amber-100 text-amber-600 rounded-lg">
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
                        d="M9 12h3.75M9 15h3.75M9 15.75h3.75M18 19.5a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 00-9-9z"
                      />
                    </svg>
                  </div>
                  <h3 class="text-slate-800 text-lg font-bold">
                    Evaluar Cotización
                  </h3>
                </div>
                <button
                  @click="cerrarModalEvaluacion"
                  class="text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors rounded-full p-1.5 active:scale-95"
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

              <div class="p-6" v-if="mantenimientoAEvaluar">
                <div
                  class="bg-white border border-slate-100 rounded-xl p-4 mb-6 shadow-sm"
                >
                  <div class="grid grid-cols-2 gap-4">
                    <div>
                      <span
                        class="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1"
                        >Unidad Operativa</span
                      >
                      <span class="font-bold text-slate-800">{{
                        mantenimientoAEvaluar.catalogo_unidades
                          ?.numero_economico
                      }}</span>
                    </div>
                    <div>
                      <span
                        class="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1"
                        >Taller</span
                      >
                      <span class="font-medium text-slate-600">{{
                        mantenimientoAEvaluar.proveedor_taller
                      }}</span>
                    </div>
                    <div>
                      <span
                        class="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1"
                        >Categoría</span
                      >
                      <span class="font-medium text-slate-600">{{
                        mantenimientoAEvaluar.categoria
                      }}</span>
                    </div>
                    <div>
                      <span
                        class="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1"
                        >Costo Cotizado</span
                      >
                      <span
                        class="font-black text-institucional-primario text-lg"
                        >{{
                          formatearMoneda(mantenimientoAEvaluar.costo_total)
                        }}</span
                      >
                    </div>
                    <div
                      class="col-span-2 mt-2"
                      v-if="mantenimientoAEvaluar.descripcion_servicio"
                    >
                      <span
                        class="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1"
                        >Descripción de los Trabajos a Realizar</span
                      >
                      <div
                        class="p-3 bg-slate-50 border border-slate-100 rounded-lg"
                      >
                        <p class="text-sm text-slate-700 italic">
                          "{{ mantenimientoAEvaluar.descripcion_servicio }}"
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  class="flex flex-col items-center justify-center p-6 bg-blue-50 border border-blue-100 rounded-xl mb-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-10 h-10 text-blue-500 mb-3"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path
                      d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm.53 14.286v-3.75h1.22a.75.75 0 00.53-1.28l-2.28-2.28a.75.75 0 00-1.06 0l-2.28 2.28a.75.75 0 00.53 1.28h1.22v3.75a.75.75 0 001.5 0z"
                    />
                  </svg>
                  <p class="text-sm text-blue-900 font-medium mb-4 text-center">
                    Para aprobar este gasto, puedes consultar el archivo PDF o
                    imagen de la cotización original proporcionada por el
                    taller.
                  </p>

                  <a
                    v-if="mantenimientoAEvaluar.url_cotizacion"
                    :href="mantenimientoAEvaluar.url_cotizacion"
                    target="_blank"
                    class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-6 rounded-lg shadow-md transition-all active:scale-95 flex items-center gap-2 mb-2 w-full justify-center"
                  >
                    Ver Cotización Original
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
                        d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                      />
                    </svg>
                  </a>

                  <a
                    v-if="mantenimientoAEvaluar.url_orden_trabajo"
                    :href="mantenimientoAEvaluar.url_orden_trabajo"
                    target="_blank"
                    class="bg-slate-600 hover:bg-slate-700 text-white font-bold py-2.5 px-6 rounded-lg shadow-md transition-all active:scale-95 flex items-center gap-2 w-full justify-center"
                  >
                    Ver Orden de Trabajo / Evidencia
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
                        d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                      />
                    </svg>
                  </a>
                </div>
              </div>

              <div
                class="bg-slate-50 px-6 py-4 flex justify-between gap-3 border-t border-slate-100 rounded-b-2xl"
              >
                <button
                  @click="procesarEvaluacion('Rechazado')"
                  :disabled="isEvaluating"
                  type="button"
                  class="px-5 py-2.5 text-sm font-bold text-red-600 hover:bg-red-50 border border-transparent hover:border-red-200 rounded-lg transition-colors disabled:opacity-50"
                >
                  Rechazar Ingreso
                </button>
                <div class="flex gap-3">
                  <button
                    @click="cerrarModalEvaluacion"
                    type="button"
                    class="px-5 py-2.5 text-sm font-medium text-slate-500 hover:bg-slate-200/50 rounded-lg transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    @click="procesarEvaluacion('Autorizado (En Taller)')"
                    :disabled="isEvaluating"
                    type="button"
                    class="bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold py-2.5 px-6 rounded-lg shadow-md transition-all active:scale-95 disabled:opacity-50"
                  >
                    <span v-if="isEvaluating">Guardando...</span
                    ><span v-else>Autorizar Reparación</span>
                  </button>
                </div>
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
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { supabase } from "../lib/supabaseClient";
import { MantenimientoService } from "../services/MantenimientoService";

// El componente hijo se comunica con el padre mediante este evento
const emit = defineEmits(["actualizar-kpis"]);

// INTERFACES
interface Unidad {
  id_unidad: number | string;
  numero_economico: string;
  modelo: string;
  placas: string;
  tipo_propiedad: string;
}

interface Conductor {
  id_conductor: number | string;
  nombre_completo: string;
}

interface Destino {
  id_destino: number | string;
  nombre_edificio: string;
}

interface MantenimientoActivo {
  id_mantenimiento: string;
  id_unidad: string | number;
  categoria: string;
  descripcion_servicio: string;
  proveedor_taller: string;
  estatus_servicio: string;
  kilometraje_ingreso: number;
  costo_total: number;
  url_cotizacion?: string;
  url_orden_trabajo?: string;
  catalogo_unidades: {
    numero_economico: string;
    modelo: string;
    tipo_propiedad: string;
  };
}

// ESTADOS GENERALES
const isLoading = ref(false);
const isSaving = ref(false);
const mostrarModal = ref(false);
const cargandoTabla = ref(true);

const formatearMoneda = (cantidad: number) => {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
  }).format(cantidad);
};

// ESTADOS DE EVALUACIÓN
const modalEvaluacionAbierto = ref(false);
const mantenimientoAEvaluar = ref<MantenimientoActivo | null>(null);
const isEvaluating = ref(false);

// ESTADOS DE CATÁLOGOS, TABLA Y SELECTORES
const unidadesOperativas = ref<Unidad[]>([]);
const catalogoConductores = ref<Conductor[]>([]);
const catalogoTalleres = ref<Destino[]>([]);
const listaMantenimientos = ref<MantenimientoActivo[]>([]);
const opcionesCategoria = [
  "Preventivo Menor",
  "Preventivo Mayor",
  "Correctivo",
  "Siniestro",
];

const cargandoVehiculos = ref(false);
const cargandoConductores = ref(false);
const cargandoTalleres = ref(false);

const selectorUnidadAbierto = ref(false);
const selectorConductorAbierto = ref(false);
const selectorCategoriaAbierto = ref(false);
const selectorTallerAbierto = ref(false);

const unidadSeleccionadaObj = ref<Unidad | null>(null);
const conductorSeleccionadoObj = ref<Conductor | null>(null);

// ESTADO DEL FORMULARIO DE INGRESO
const formulario = ref({
  id_unidad: "",
  conductor_id: "",
  categoria: "",
  descripcion_servicio: "",
  proveedor_taller: "",
  costo_total: "",
  kilometraje_ingreso: "",
  url_cotizacion: "",
  url_orden_trabajo: "",
});

// ESTADO DEL TOAST
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

// FETCH DE CATÁLOGOS, TABLA
const cargarVehiculos = async () => {
  cargandoVehiculos.value = true;
  try {
    const { data, error } = await supabase
      .from("catalogo_unidades")
      .select("id_unidad, numero_economico, modelo, placas, tipo_propiedad")
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

const cargarTalleres = async () => {
  cargandoTalleres.value = true;
  try {
    const { data, error } = await supabase
      .from("catalogo_destinos")
      .select("id_destino, nombre_edificio")
      .eq("tipo", "Taller Automotriz")
      .order("nombre_edificio", { ascending: true });

    if (error) throw error;
    catalogoTalleres.value = data || [];
  } catch (error) {
    console.error(error);
  } finally {
    cargandoTalleres.value = false;
  }
};

const cargarMantenimientosActivos = async () => {
  cargandoTabla.value = true;
  const respuesta = await MantenimientoService.obtenerMantenimientosActivos();

  if (respuesta.success && respuesta.data) {
    listaMantenimientos.value = respuesta.data as any;
  } else {
    mostrarToast("No se pudo cargar la lista del taller.", "warning");
  }
  cargandoTabla.value = false;
};

// CONTROL DE SELECTORES
const cerrarTodosLosSelectores = () => {
  selectorUnidadAbierto.value = false;
  selectorConductorAbierto.value = false;
  selectorCategoriaAbierto.value = false;
  selectorTallerAbierto.value = false;
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

const toggleSelectorCategoria = () => {
  const estado = !selectorCategoriaAbierto.value;
  cerrarTodosLosSelectores();
  selectorCategoriaAbierto.value = estado;
};

const toggleSelectorTaller = () => {
  const estado = !selectorTallerAbierto.value;
  cerrarTodosLosSelectores();
  selectorTallerAbierto.value = estado;
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

const seleccionarCategoria = (categoria: string) => {
  formulario.value.categoria = categoria;
  selectorCategoriaAbierto.value = false;
};

const seleccionarTaller = (taller: Destino) => {
  formulario.value.proveedor_taller = taller.nombre_edificio;
  selectorTallerAbierto.value = false;
};

// CONTROLADORES DEL MODAL DE REGISTRO
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
      categoria: "",
      descripcion_servicio: "",
      proveedor_taller: "",
      costo_total: "",
      kilometraje_ingreso: "",
      url_cotizacion: "",
      url_orden_trabajo: "",
    };
    unidadSeleccionadaObj.value = null;
    conductorSeleccionadoObj.value = null;
    cerrarTodosLosSelectores();
  }, 300);
};

// CONTROLADORES DEL MODAL DE EVALUACIÓN
const abrirModalEvaluacion = (mant: MantenimientoActivo) => {
  mantenimientoAEvaluar.value = mant;
  modalEvaluacionAbierto.value = true;
};

const cerrarModalEvaluacion = () => {
  modalEvaluacionAbierto.value = false;
  setTimeout(() => {
    mantenimientoAEvaluar.value = null;
  }, 300);
};

// PROCESAR NUEVO INGRESO
const procesarIngreso = async () => {
  if (
    !formulario.value.id_unidad ||
    !formulario.value.conductor_id ||
    !formulario.value.categoria ||
    !formulario.value.proveedor_taller ||
    !formulario.value.descripcion_servicio ||
    !formulario.value.costo_total ||
    !formulario.value.kilometraje_ingreso
  ) {
    mostrarToast(
      "Por favor, completa los campos básicos y la descripción.",
      "warning",
    );
    return;
  }

  if (!formulario.value.url_cotizacion && !formulario.value.url_orden_trabajo) {
    mostrarToast(
      "Debes ingresar al menos un enlace de respaldo documental.",
      "warning",
    );
    return;
  }

  isSaving.value = true;

  const esArrendado =
    unidadSeleccionadaObj.value?.tipo_propiedad === "Arrendado";
  const estatusCalculado = esArrendado
    ? "Autorizado (En Taller)"
    : "Por Autorizar";

  const paqueteDeDatos = {
    id_unidad: formulario.value.id_unidad,
    conductor_id: formulario.value.conductor_id,
    categoria: formulario.value.categoria,
    descripcion_servicio: formulario.value.descripcion_servicio,
    proveedor_taller: formulario.value.proveedor_taller,
    costo_total: Number(formulario.value.costo_total),
    kilometraje_ingreso: Number(formulario.value.kilometraje_ingreso),
    url_cotizacion: formulario.value.url_cotizacion,
    url_orden_trabajo: formulario.value.url_orden_trabajo,
    estatus_servicio: estatusCalculado,
  };

  const respuesta =
    await MantenimientoService.registrarIngresoTaller(paqueteDeDatos);

  if (respuesta.success) {
    mostrarToast(
      esArrendado
        ? "Orden registrada (Directo a Taller)."
        : "Ingreso a taller registrado. En espera de autorización.",
      "success",
    );
    cerrarModal();
    await cargarMantenimientosActivos();
    emit("actualizar-kpis"); // Avisa al padre que actualice los números
  } else {
    mostrarToast("Hubo un error al registrar el mantenimiento.", "warning");
    console.error(respuesta.error);
  }

  isSaving.value = false;
};

// PROCESAR EVALUACIÓN DE COTIZACIÓN
const procesarEvaluacion = async (
  nuevoEstatus: "Autorizado (En Taller)" | "Rechazado",
) => {
  if (!mantenimientoAEvaluar.value) return;

  isEvaluating.value = true;
  const respuesta = await MantenimientoService.evaluarMantenimiento(
    mantenimientoAEvaluar.value.id_mantenimiento,
    nuevoEstatus,
  );

  if (respuesta.success) {
    mostrarToast(
      `El mantenimiento ha sido ${nuevoEstatus.toLowerCase()}.`,
      "success",
    );
    cerrarModalEvaluacion();
    await cargarMantenimientosActivos();
    emit("actualizar-kpis"); // Avisa al padre que actualice los números
  } else {
    mostrarToast("Error al actualizar el estatus.", "warning");
  }
  isEvaluating.value = false;
};

// FINALIZAR MANTENIMIENTO
const ejecutarFinalizacion = async (
  id_mantenimiento: string,
  id_unidad: string,
  kilometraje: number,
) => {
  isLoading.value = true;

  const respuesta = await MantenimientoService.finalizarMantenimientoPreventivo(
    id_mantenimiento,
    id_unidad,
    kilometraje,
  );

  if (respuesta.success) {
    mostrarToast("Mantenimiento finalizado y límites actualizados.", "success");
    await cargarMantenimientosActivos();
    emit("actualizar-kpis"); // Avisa al padre que actualice los números
  } else {
    mostrarToast("Error al finalizar el mantenimiento.", "warning");
  }

  isLoading.value = false;
};

onMounted(() => {
  cargarVehiculos();
  cargarConductores();
  cargarTalleres();
  cargarMantenimientosActivos();
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
