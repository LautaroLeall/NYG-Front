import axios from 'axios';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000',
  withCredentials: true // Permite recibir cookies cross-origin (Refresh Token)
});

// Para llevar un registro de los timeouts por petición
const pendingRequests = new Map();

// Interceptor de Peticiones
axiosInstance.interceptors.request.use(
  (config) => {
    // Inyectar Token
    const token = useAuthStore.getState().accessToken;
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    // Configurar timeout de 8s para mostrar el mensaje gracioso
    const requestKey = Symbol();
    config.requestKey = requestKey;

    const timeoutId = setTimeout(() => {
      toast("Precalentando al pack de forwards... aguantá unos segundos.", {
        icon: '🏉',
        duration: 5000,
        style: {
          borderRadius: '10px',
          background: '#0A1128',
          color: '#fff',
        },
      });
    }, 8000); // 8 segundos

    pendingRequests.set(requestKey, timeoutId);

    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor de Respuestas
axiosInstance.interceptors.response.use(
  (response) => {
    const timeoutId = pendingRequests.get(response.config.requestKey);
    if (timeoutId) {
      clearTimeout(timeoutId);
      pendingRequests.delete(response.config.requestKey);
    }
    return response;
  },
  (error) => {
    if (error.config && error.config.requestKey) {
      const timeoutId = pendingRequests.get(error.config.requestKey);
      if (timeoutId) {
        clearTimeout(timeoutId);
        pendingRequests.delete(error.config.requestKey);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
