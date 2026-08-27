import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const MainLayout = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div className="flex flex-col min-h-screen bg-nyg-white">
      {/* Header Fijo con efecto Glassmorphism */}
      <Header />

      {/* Contenido Dinámico (Las páginas se renderizarán aquí) */}
      <main className={`grow ${isHome ? "" : "pt-20"}`}>
        <Outlet />
      </main>

      {/* Footer Institucional */}
      <Footer />
    </div>
  );
};

export default MainLayout;
