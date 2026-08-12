import { supabase } from "../lib/supabaseClient";

export const MantenimientoService = {
  async finalizarMantenimientoPreventivo(
    mantenimientoId: string,
    unidadId: string,
    kilometrajeIngreso: number,
    intervaloKm: number = 5000,
    intervaloMeses: number = 6,
  ) {
    try {
      const nuevoProximoKm = kilometrajeIngreso + intervaloKm;

      const fechaActual = new Date();
      fechaActual.setMonth(fechaActual.getMonth() + intervaloMeses);
      const nuevaFechaLimite = fechaActual.toISOString().split("T")[0];

      const actualizarMantenimiento = supabase
        .from("control_mantenimientos")
        .update({ estatus_servicio: "Finalizado" })
        .eq("id_mantenimiento", mantenimientoId);

      const actualizarUnidad = supabase
        .from("catalogo_unidades")
        .update({
          kilometraje_actual: kilometrajeIngreso,
          proximo_mantenimiento_km: nuevoProximoKm,
          proximo_mantenimiento_fecha: nuevaFechaLimite,
        })
        .eq("id_unidad", unidadId);

      const [resMantenimiento, resUnidad] = await Promise.all([
        actualizarMantenimiento,
        actualizarUnidad,
      ]);

      if (resMantenimiento.error) throw resMantenimiento.error;
      if (resUnidad.error) throw resUnidad.error;

      return {
        success: true,
        mensaje: "Mantenimiento finalizado y unidad actualizada correctamente.",
      };
    } catch (error) {
      console.error("Error en la transacción de mantenimiento:", error);
      return { success: false, error };
    }
  },

  async registrarIngresoTaller(datosMantenimiento: {
    id_unidad: string;
    categoria: string;
    descripcion_servicio: string;
    proveedor_taller: string;
    costo_total: number;
    kilometraje_ingreso: number;
    url_cotizacion: string;
    url_orden_trabajo: string;
    conductor_id: string;
    estatus_servicio: string;
  }) {
    try {
      const { data, error } = await supabase
        .from("control_mantenimientos")
        .insert([
          {
            id_unidad: datosMantenimiento.id_unidad,
            categoria: datosMantenimiento.categoria,
            descripcion_servicio: datosMantenimiento.descripcion_servicio,
            proveedor_taller: datosMantenimiento.proveedor_taller,
            costo_total: datosMantenimiento.costo_total,
            kilometraje_ingreso: datosMantenimiento.kilometraje_ingreso,
            url_cotizacion: datosMantenimiento.url_cotizacion,
            url_orden_trabajo: datosMantenimiento.url_orden_trabajo,
            conductor_id: datosMantenimiento.conductor_id,
            estatus_servicio: datosMantenimiento.estatus_servicio,
            fecha_ingreso: new Date().toISOString().split("T")[0],
          },
        ]);

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error("Error al registrar el ingreso al taller:", error);
      return { success: false, error };
    }
  },

  async obtenerMantenimientosActivos() {
    try {
      const { data, error } = await supabase
        .from("control_mantenimientos")
        .select(
          `
          id_mantenimiento,
          id_unidad,
          categoria,
          descripcion_servicio,
          proveedor_taller,
          estatus_servicio,
          kilometraje_ingreso,
          costo_total,
          url_cotizacion,
          url_orden_trabajo,
          catalogo_unidades (
            numero_economico,
            modelo,
            tipo_propiedad
          )
        `,
        )
        .neq("estatus_servicio", "Finalizado")
        .order("fecha_ingreso", { ascending: false });

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error("Error al obtener mantenimientos activos:", error);
      return { success: false, error };
    }
  },

  async evaluarMantenimiento(id_mantenimiento: string, nuevoEstatus: string) {
    try {
      const { error } = await supabase
        .from("control_mantenimientos")
        .update({ estatus_servicio: nuevoEstatus })
        .eq("id_mantenimiento", id_mantenimiento);

      if (error) throw error;
      return { success: true };
    } catch (error) {
      console.error("Error al evaluar el mantenimiento:", error);
      return { success: false, error };
    }
  },

  /**
   * NUEVO: Calcula los indicadores financieros del mes actual,
   * separando la inversión estatal del presupuesto absorbido por arrendadoras.
   */
  async obtenerEstadisticasMensuales(mes: number, anio: number) {
    // Formatear el rango de fechas del mes solicitado
    const fechaInicio = `${anio}-${mes.toString().padStart(2, "0")}-01`;
    const fechaFin = new Date(anio, mes, 0).toISOString().split("T")[0];

    try {
      const { data, error } = await supabase
        .from("control_mantenimientos")
        .select(
          `
          costo_total,
          estatus_servicio,
          catalogo_unidades (tipo_propiedad)
        `,
        )
        .gte("fecha_ingreso", fechaInicio)
        .lte("fecha_ingreso", fechaFin);

      if (error) throw error;

      let consumoReal = 0;
      let consumoArrendadoras = 0;
      let enTaller = 0;

      // Presupuesto global base fijo de $150,000 para demostración (configurable futuro)
      const presupuestoAsignado = 150000;

      data.forEach((item) => {
        // Contamos los vehículos que no han sido entregados o rechazados
        if (
          item.estatus_servicio === "Por Autorizar" ||
          item.estatus_servicio === "Autorizado (En Taller)"
        ) {
          enTaller++;
        }

        // Sumamos dinero solo si está aprobado o finalizado
        if (
          item.estatus_servicio === "Autorizado (En Taller)" ||
          item.estatus_servicio === "Finalizado"
        ) {
          // Extraemos de forma segura el tipo de propiedad del JOIN
          const esArrendado = Array.isArray(item.catalogo_unidades)
            ? item.catalogo_unidades[0]?.tipo_propiedad === "Arrendado"
            : (item.catalogo_unidades as any)?.tipo_propiedad === "Arrendado";

          if (esArrendado) {
            consumoArrendadoras += Number(item.costo_total || 0);
          } else {
            consumoReal += Number(item.costo_total || 0);
          }
        }
      });

      return {
        success: true,
        data: {
          consumoReal,
          consumoArrendadoras,
          enTaller,
          presupuestoAsignado,
        },
      };
    } catch (error) {
      console.error("Error al obtener estadísticas:", error);
      return { success: false, error };
    }
  },
};
