// src/types/corev.types.ts

export interface Unidad {
  id_unidad: number;
  numero_economico: string;
  placas: string;
  modelo: string;
  km_ultimo_servicio: number;
  frecuencia_servicio_km: number;
  km_proximo_servicio: number;
  estatus_unidad: string;
  created_at: string; // Supabase devuelve las fechas (timestamptz) como strings ISO
}

export interface ControlMantenimiento {
  id_mantenimiento: number;
  id_unidad: number;
  categoria: string;
  estatus_servicio: string;
  proveedor_taller: string;
  costo_total: number;
  fecha_ingreso: string; // date
  fecha_salida: string; // date
  comentarios: string;
  created_at: string;
}

export interface Personal {
  id_conductor: number;
  nombre_completo: string;
  numero_empleado: string;
  rol: string;
  estatus: string;
  correo: string;
  created_at: string;
}

export interface ViajeOperativo {
  id_viaje: number;
  id_conductor: number;
  id_unidad: number;
  id_destino: number;
  motivo_viaje: string;
  fecha: string;
  hora_salida: string;
  km_inicial: number;
  hora_llegada: string;
  km_final: number;
  ticket_gas?: string; // El signo ? indica que puede ser nulo u opcional
  monto_gas?: number;
  litros_gas?: number;
  estado: string;
  perfil_id: string; // UUID referenciado a auth.users
  created_at: string;
}
