export interface LiquidacionCostosTransaccion{
  id: number;
  num_operacion: number;
  nro_firmantes: number;
  tipo_contrato_id: number;
  nro_cheques_gerencia_extra: number;
  inversionista_id: number;
  prestamo_neto: number;
  gravamen_a_levantar: number;
  monto_adeudado: number;
  fecha_adeudado: string;  // ISO 8601 DateTime
  tipo_cambio_peritaje: number;
  tipo_valorizacion: number;
  certificado_registral_inmobiliario: number;
  bloqueo_registral: number ;
  peritaje: number;
  costo_inspeccion: number;
  cri_bloqueo_peritaje: number;
  derechos_notariales: number;
  derechos_registrales: number;
  asesoria_prestaclub: number;
  pagos_descontados_cheque: number;
  registrales_levantamiento: number;
  toma_firmas_biometrico: number;
  otorgamiento_poder: number;
  cheque_gerencia_extra: number;
  costos_adicionales: number;
  pagado_cliente: number;
  total_costos_transaccion: number;
  financiamiento_total: number;
  updated_by: number;
  updated_date: string;  // ISO 8601 DateTime
  created_by: number;
  created_date: string;  // ISO 8601 DateTime
  deleted_by?: number;
  deleted_date?: string;  // ISO 8601 DateTime
}
