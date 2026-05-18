import api from './api';

export const login = async (username: string, password: string): Promise<boolean> => {
  const credentials = btoa(`${username}:${password}`);
  localStorage.setItem('authCredentials', credentials);

  try {
    await api.get('/asistencias');
    return true;
  } catch {
    localStorage.removeItem('authCredentials');
    return false;
  }
};

export const logout = (): void => {
  localStorage.removeItem('authCredentials');
  window.location.href = '/login';
};

export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem('authCredentials');
};
