import { create } from 'zustand';

// Store para manejar la sesión del administrador
export const useAuthStore = create((set) => ({
  user: null,
  accessToken: null,
  isAuthenticated: false,

  setCredentials: (user, token) => set({
    user,
    accessToken: token,
    isAuthenticated: true
  }),

  logout: () => set({
    user: null,
    accessToken: null,
    isAuthenticated: false
  }),
}));
