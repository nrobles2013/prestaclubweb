// src/app/models/operacion.model.ts

export interface Operacion {
    id: number;
    numero_operacion: string;
    nombre_cliente: string;
    tipo_documento: string;
    numero_documento: string;
    tipo_operacion: string;
    tipo_operacion_id: number;
    fase_operacion: string;
    fase_operacion_id: number;
    id_padre: string;
  }
  