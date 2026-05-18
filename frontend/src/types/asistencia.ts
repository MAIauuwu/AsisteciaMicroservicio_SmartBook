export interface Asistencia {
  id: number;
  userId: string;
  fecha: string;
  horaEntrada?: string;
  horaSalida?: string;
  estado: string;
  observaciones?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AsistenciaRequest {
  userId: string;
  fecha: string;
  horaEntrada?: string;
  horaSalida?: string;
  estado: string;
  observaciones?: string;
}

export interface AsistenciaUpdate {
  fecha?: string;
  horaEntrada?: string;
  horaSalida?: string;
  estado?: string;
  observaciones?: string;
}

export interface ErrorResponse {
  status: number;
  error: string;
  message: string;
  timestamp: string;
  validationErrors?: Record<string, string>;
}

export type EstadoAsistencia = 'PRESENTE' | 'AUSENTE' | 'TARDANZA' | 'PERMISO' | 'JUSTIFICADO';

export const ESTADOS: { value: EstadoAsistencia; label: string; color: string }[] = [
  { value: 'PRESENTE', label: 'Presente', color: 'bg-green-100 text-green-800' },
  { value: 'AUSENTE', label: 'Ausente', color: 'bg-red-100 text-red-800' },
  { value: 'TARDANZA', label: 'Tardanza', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'PERMISO', label: 'Permiso', color: 'bg-blue-100 text-blue-800' },
  { value: 'JUSTIFICADO', label: 'Justificado', color: 'bg-purple-100 text-purple-800' },
];
