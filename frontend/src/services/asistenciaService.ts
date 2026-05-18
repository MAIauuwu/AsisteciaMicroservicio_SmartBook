import api from './api';
import { Asistencia, AsistenciaRequest, AsistenciaUpdate } from '../types/asistencia';

export const getAsistencias = async (): Promise<Asistencia[]> => {
  const { data } = await api.get<Asistencia[]>('/asistencias');
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

export const getAsistenciasByFecha = async (fecha: string): Promise<Asistencia[]> => {
  const { data } = await api.get<Asistencia[]>(`/asistencias/fecha/${fecha}`);
  return data;
};

export const getAsistenciasByEstado = async (estado: string): Promise<Asistencia[]> => {
  const { data } = await api.get<Asistencia[]>(`/asistencias/estado/${estado}`);
  return data;
};
