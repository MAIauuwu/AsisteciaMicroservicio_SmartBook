import api from './api';
import { Asistencia, AsistenciaRequest, AsistenciaUpdate, PageResponse, AsistenciaFilters } from '../types/asistencia';

export const getAsistencias = async (): Promise<Asistencia[]> => {
  const { data } = await api.get<Asistencia[]>('/asistencias');
  return data;
};

export const getAsistenciasPaginadas = async (page: number, size: number = 20): Promise<PageResponse<Asistencia>> => {
  const { data } = await api.get<PageResponse<Asistencia>>('/asistencias/paginadas', {
    params: { page, size, sort: 'fecha,desc' },
  });
  return data;
};

export const getAsistenciaById = async (id: number): Promise<Asistencia> => {
  const { data } = await api.get<Asistencia>(`/asistencias/${id}`);
  return data;
};

export const createAsistencia = async (request: AsistenciaRequest): Promise<Asistencia> => {
  const { data } = await api.post<Asistencia>('/asistencias', request);
  return data;
};

export const updateAsistencia = async (id: number, update: AsistenciaUpdate): Promise<Asistencia> => {
  const { data } = await api.put<Asistencia>(`/asistencias/${id}`, update);
  return data;
};

export const deleteAsistencia = async (id: number): Promise<void> => {
  await api.delete(`/asistencias/${id}`);
};

export const getAsistenciasByUsuario = async (userId: string): Promise<Asistencia[]> => {
  const { data } = await api.get<Asistencia[]>(`/asistencias/usuario/${userId}`);
  return data;
};

export const getAsistenciasByUsuarioPaginadas = async (userId: string, page: number, size: number = 20): Promise<PageResponse<Asistencia>> => {
  const { data } = await api.get<PageResponse<Asistencia>>(`/asistencias/usuario/${userId}/paginadas`, {
    params: { page, size, sort: 'fecha,desc' },
  });
  return data;
};

export const getAsistenciasByFecha = async (fecha: string): Promise<Asistencia[]> => {
  const { data } = await api.get<Asistencia[]>(`/asistencias/fecha/${fecha}`);
  return data;
};

export const getAsistenciasByFechaPaginadas = async (fecha: string, page: number, size: number = 20): Promise<PageResponse<Asistencia>> => {
  const { data } = await api.get<PageResponse<Asistencia>>(`/asistencias/fecha/${fecha}/paginadas`, {
    params: { page, size, sort: 'fecha,desc' },
  });
  return data;
};

export const getAsistenciasByEstado = async (estado: string): Promise<Asistencia[]> => {
  const { data } = await api.get<Asistencia[]>(`/asistencias/estado/${estado}`);
  return data;
};

export const getAsistenciasByUsuarioYRango = async (userId: string, fechaInicio: string, fechaFin: string): Promise<Asistencia[]> => {
  const { data } = await api.get<Asistencia[]>(`/asistencias/usuario/${userId}/rango`, {
    params: { fechaInicio, fechaFin },
  });
  return data;
};

export const getAsistenciasByRangoPaginadas = async (fechaInicio: string, fechaFin: string, page: number, size: number = 20): Promise<PageResponse<Asistencia>> => {
  const { data } = await api.get<PageResponse<Asistencia>>('/asistencias/rango', {
    params: { fechaInicio, fechaFin, page, size, sort: 'fecha,desc' },
  });
  return data;
};

export const getFilteredAsistencias = async (filters: AsistenciaFilters, page: number, size: number = 20): Promise<PageResponse<Asistencia>> => {
  if (filters.userId && filters.fechaInicio && filters.fechaFin) {
    const items = await getAsistenciasByUsuarioYRango(filters.userId, filters.fechaInicio, filters.fechaFin);
    return {
      content: items,
      totalElements: items.length,
      totalPages: 1,
      number: 0,
      size: items.length,
      numberOfElements: items.length,
      first: true,
      last: true,
      empty: items.length === 0,
      pageable: { pageNumber: 0, pageSize: size, sort: { empty: true, sorted: false, unsorted: true }, offset: 0, paged: true, unpaged: false },
    };
  }

  if (filters.userId) {
    return getAsistenciasByUsuarioPaginadas(filters.userId, page, size);
  }

  if (filters.fechaInicio && filters.fechaFin) {
    return getAsistenciasByRangoPaginadas(filters.fechaInicio, filters.fechaFin, page, size);
  }

  if (filters.fecha) {
    return getAsistenciasByFechaPaginadas(filters.fecha, page, size);
  }

  return getAsistenciasPaginadas(page, size);
};
