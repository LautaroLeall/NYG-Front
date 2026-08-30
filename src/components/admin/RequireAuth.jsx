import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

const RequireAuth = () => {
  const { isAuthenticated } = useAuthStore();
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirige al login y guarda la ruta intentada
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return <Outlet />; // Renderiza las rutas hijas del panel
};

export default RequireAuth;
