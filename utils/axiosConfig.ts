import axios from 'axios';
import { authService } from '../services/authService';
import { navigateToLogin } from './navigation';

// URL base de la API
export const API_URL = 'https://mascotas-api-1012225346599.us-central1.run.app';

// Crear instancia de axios con configuración base
const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para añadir el token a las solicitudes
axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      const token = await authService.getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores de autenticación
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // Si el error es 401 (Unauthorized), el token ha expirado o es inválido
    if (error.response && error.response.status === 401) {
      // Cerrar sesión y redirigir al login
      await authService.logout();
      navigateToLogin();
      return Promise.reject(new Error('Tu sesión ha expirado. Por favor, inicia sesión nuevamente.'));
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
