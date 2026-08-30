import axios from 'axios';
import { useAuthStore } from '../store/authStore';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000',
  withCredentials: true // Permite recibir cookies cross-origin (Refresh Token)
});

// Interceptor de Peticiones: Inyectar Access Token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().accessToken;
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// NOTA: Acá a futuro (Épica 11 FE-112) irá el interceptor de Respuesta
// para atrapar el error 401 y disparar la recarga del Token usando el Refresh Token.

export default axiosInstance;
