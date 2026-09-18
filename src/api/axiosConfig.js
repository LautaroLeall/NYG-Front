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

    // Configurar timeout de 5s para mostrar el mensaje gracioso
    const requestKey = Symbol();
    config.requestKey = requestKey;

    const timeoutId = setTimeout(() => {
      toast("Precalentando al pack de forwards... aguantá unos segundos.", {
        id: 'slow-request-toast',
        icon: '🏉',
        duration: 3000,
        style: {
          borderRadius: '10px',
          background: '#0A1128',
          color: '#fff',
        },
      });
    }, 5000); // 5 segundos

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

    // Manejo global de expiración de sesión (401 Unauthorized)
    if (error.response && error.response.status === 401) {
      // Evitar loop infinito si ya estamos en la página de login
      if (window.location.pathname !== '/admin/login') {
        toast.error("Tu sesión ha expirado. Por favor, vuelve a iniciar sesión.");
        useAuthStore.getState().logout();
        window.location.href = '/admin/login';
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
