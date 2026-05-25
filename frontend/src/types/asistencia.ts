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

export const ESTADOS: { value: EstadoAsistencia; label: string; color: string; bgColor: string; icon: string }[] = [
  { value: 'PRESENTE', label: 'Presente', color: 'text-green-800', bgColor: 'bg-green-100', icon: '✓' },
  { value: 'AUSENTE', label: 'Ausente', color: 'text-red-800', bgColor: 'bg-red-100', icon: '✗' },
  { value: 'TARDANZA', label: 'Tardanza', color: 'text-yellow-800', bgColor: 'bg-yellow-100', icon: '⏰' },
  { value: 'PERMISO', label: 'Permiso', color: 'text-blue-800', bgColor: 'bg-blue-100', icon: '📋' },
  { value: 'JUSTIFICADO', label: 'Justificado', color: 'text-purple-800', bgColor: 'bg-purple-100', icon: '📝' },
];

export interface PageResponse<T> {
  content: T[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  totalElements: number;
  totalPages: number;
  last: boolean;
  first: boolean;
  size: number;
  number: number;
  numberOfElements: number;
  empty: boolean;
}

export interface AsistenciaFilters {
  userId?: string;
  estado?: string;
  fecha?: string;
  fechaInicio?: string;
  fechaFin?: string;
}
