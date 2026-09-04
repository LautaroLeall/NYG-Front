import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import {
  LogOut,
  LayoutDashboard,
  Calendar,
  Users,
  Shield,
  Trophy,
  Newspaper,
  Bell,
  Settings,
} from "lucide-react";

const AdminLayout = () => {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    // TODO: Llamar a la API para invalidar cookie (BE-015)
    logout();
    navigate("/admin/login");
  };

  const navItems = [
    { name: "Dashboard", path: "/admin", icon: <LayoutDashboard size={20} /> },
    { name: "Torneos", path: "/admin/torneos", icon: <Trophy size={20} /> },
    { name: "Partidos", path: "/admin/partidos", icon: <Calendar size={20} /> },
    { name: "Equipos", path: "/admin/equipos", icon: <Shield size={20} /> },
    { name: "Planteles", path: "/admin/planteles", icon: <Users size={20} /> },
    {
      name: "Noticias",
      path: "/admin/noticias",
      icon: <Newspaper size={20} />,
    },
    { name: "Alertas", path: "/admin/alertas", icon: <Bell size={20} /> },
  ];

  return (
    <div className="h-screen overflow-hidden bg-gray-50 flex text-gray-800 font-sans">
      {/* Sidebar Claro (Fijo) */}
      <aside className="w-64 h-full bg-white border-r border-gray-100 hidden md:flex flex-col shadow-sm relative z-20 shrink-0">
        <div className="h-20 flex items-center px-6 border-b border-gray-50 bg-white shrink-0">
          <span className="text-nyg-blue font-black uppercase tracking-widest text-lg flex items-center gap-3">
            <img
              src="/escudo_nyg.png"
              alt="Escudo NYG"
              className="w-10 h-10 object-contain drop-shadow-sm"
            />
            Admin
          </span>
        </div>

        <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-full font-bold text-sm uppercase tracking-wider transition-all duration-300 ${
                  isActive
                    ? "bg-nyg-blue text-white shadow-md"
                    : "text-gray-400 hover:bg-gray-50 hover:text-nyg-blue"
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-6 border-t border-gray-50 bg-white shrink-0">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-50 text-nyg-red hover:bg-nyg-red hover:text-white rounded-full font-bold text-sm uppercase tracking-wider transition-all shadow-sm"
          >
            <LogOut size={18} /> Salir
          </button>
        </div>
      </aside>

      {/* Contenido Principal (Scrolleable) */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-6 md:px-8 shadow-sm relative z-10 shrink-0">
          <div className="md:hidden text-nyg-blue font-black uppercase tracking-widest flex items-center gap-3">
            <img
              src="/escudo_nyg.png"
              alt="Escudo NYG"
              className="w-10 h-10 object-contain drop-shadow-sm"
            />
            Admin
          </div>
          <div className="hidden md:block flex-1">
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest">
              Panel de Control
            </h2>
          </div>
          <div className="flex items-center gap-6">
            <button className="text-gray-400 hover:text-nyg-blue transition-colors">
              <Settings size={22} />
            </button>
            <div className="w-10 h-10 rounded-full bg-gray-100 border-2 border-white shadow-sm overflow-hidden flex items-center justify-center">
              <img
                src="https://ui-avatars.com/api/?name=Admin&background=1E3A8A&color=fff"
                alt="Admin"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </header>

        {/* Área de trabajo renderizada dinámicamente con scroll */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
