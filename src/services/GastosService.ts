import { supabase } from "../lib/supabaseClient";

export const GastosService = {
  /**
   * Registra una nueva compra de insumos o accesorios para un vehículo.
   */
  async registrarCompraInsumo(datosGasto: {
    id_unidad: string;
    conductor_id: string;
    concepto: string;
    proveedor_comercio: string;
    monto_factura: number;
    url_factura: string;
  }) {
    try {
      const { data, error } = await supabase
        .from("gastos_insumos_vehiculos")
        .insert([
          {
            id_unidad: datosGasto.id_unidad,
            conductor_id: datosGasto.conductor_id,
            concepto: datosGasto.concepto,
            proveedor_comercio: datosGasto.proveedor_comercio,
            monto_factura: datosGasto.monto_factura,
            url_factura: datosGasto.url_factura,
            fecha_compra: new Date().toISOString().split("T")[0],
          },
        ]);

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error("Error al registrar el gasto de insumo:", error);
      return { success: false, error };
    }
  },

  /**
   * Obtiene el historial de compras recientes cruzando la información
   * con el catálogo de unidades operativas.
   */
  async obtenerHistorialGastos() {
    try {
      const { data, error } = await supabase
        .from("gastos_insumos_vehiculos")
        .select(
          `
          id_gasto,
          concepto,
          proveedor_comercio,
          monto_factura,
          url_factura,
          fecha_compra,
          catalogo_unidades (
            numero_economico,
            modelo
          )
        `,
        )
        .order("created_at", { ascending: false })
        .limit(100);

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error("Error al obtener gastos de insumos:", error);
      return { success: false, error };
    }
  },

  /**
   * Calcula el gasto total en insumos del mes actual para el KPI Financiero
   */
  async obtenerKPIsMensuales(mes: number, anio: number) {
    const fechaInicio = `${anio}-${mes.toString().padStart(2, "0")}-01`;
    const fechaFin = new Date(anio, mes, 0).toISOString().split("T")[0];

    try {
      const { data, error } = await supabase
        .from("gastos_insumos_vehiculos")
        .select("monto_factura")
        .gte("fecha_compra", fechaInicio)
        .lte("fecha_compra", fechaFin);

      if (error) throw error;

      let consumoTotalMes = 0;
      data.forEach((item) => {
        consumoTotalMes += Number(item.monto_factura || 0);
      });

      // Techo financiero de ejemplo para Insumos (editable)
      const presupuestoAsignado = 30000;

      return {
        success: true,
        data: {
          consumoTotalMes,
          presupuestoAsignado,
          totalCompras: data.length,
        },
      };
    } catch (error) {
      console.error("Error al calcular KPIs de insumos:", error);
      return { success: false, error };
    }
  },
};
