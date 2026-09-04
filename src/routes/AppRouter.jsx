import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import Home from "../pages/Home";
import ClubHub from "../pages/club/ClubHub";
import Historia from "../pages/club/Historia";
import Timeline from "../pages/club/Timeline";
import Palmares from "../pages/club/Palmares";
import RugbyHub from "../pages/rugby/RugbyHub";
import PlantelSuperior from "../pages/rugby/PlantelSuperior";
import Juveniles from "../pages/rugby/Juveniles";
import Infantiles from "../pages/rugby/Infantiles";
import Fixture from "../pages/rugby/Fixture";
import Posiciones from "../pages/rugby/Posiciones";
import Estadisticas from "../pages/rugby/Estadisticas";
import FichaJugador from "../pages/rugby/FichaJugador";
import DetallePartido from "../pages/rugby/DetallePartido";
import NewsFeed from "../pages/noticias/NewsFeed";
import NewsArticle from "../pages/noticias/NewsArticle";

import Instalaciones from "../pages/club/Instalaciones";
import Comision from "../pages/club/Comision";
import CuerpoTecnico from "../pages/club/CuerpoTecnico";

import Login from "../pages/admin/auth/Login";
import AdminLayout from "../components/layout/AdminLayout";
import RequireAuth from "../components/admin/RequireAuth";
import Dashboard from "../pages/admin/Dashboard";

// Admin - Planteles
import PlayerList from "../pages/admin/players/PlayerList";
import PlayerForm from "../pages/admin/players/PlayerForm";

// Admin - Equipos
import TeamList from "../pages/admin/teams/TeamList";
import TeamForm from "../pages/admin/teams/TeamForm";

// Admin - Torneos
import TournamentList from "../pages/admin/tournaments/TournamentList";
import TournamentForm from "../pages/admin/tournaments/TournamentForm";

// Admin - Partidos
import MatchList from "../pages/admin/matches/MatchList";
import MatchForm from "../pages/admin/matches/MatchForm";
import MatchResultForm from "../pages/admin/matches/MatchResultForm";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas de Administración Públicas */}
        <Route path="/admin/login" element={<Login />} />

        {/* Rutas de Administración Privadas */}
        <Route element={<RequireAuth />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            {/* Rutas ABM Planteles */}
            <Route path="planteles" element={<PlayerList />} />
            <Route path="planteles/nuevo" element={<PlayerForm />} />
            <Route path="planteles/editar/:id" element={<PlayerForm />} />

            {/* Rutas ABM Equipos */}
            <Route path="equipos" element={<TeamList />} />
            <Route path="equipos/nuevo" element={<TeamForm />} />
            <Route path="equipos/editar/:id" element={<TeamForm />} />

            {/* Rutas ABM Torneos */}
            <Route path="torneos" element={<TournamentList />} />
            <Route path="torneos/nuevo" element={<TournamentForm />} />
            <Route path="torneos/editar/:id" element={<TournamentForm />} />

            {/* Rutas ABM Partidos */}
            <Route path="partidos" element={<MatchList />} />
            <Route path="partidos/nuevo" element={<MatchForm />} />
            <Route path="partidos/editar/:id" element={<MatchForm />} />
            <Route
              path="partidos/resultado/:id"
              element={<MatchResultForm />}
            />

            <Route
              path="noticias"
              element={
                <div className="text-gray-800 p-4">Sección Noticias</div>
              }
            />
            <Route
              path="alertas"
              element={
                <div className="text-gray-800 p-4">
                  Sección Alertas Disciplinarias
                </div>
              }
            />
          </Route>
        </Route>

        {/* Rutas Públicas de la Web */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />

          {/* El Club */}
          <Route path="/el-club" element={<ClubHub />} />
          <Route path="/el-club/historia" element={<Historia />} />
          <Route path="/el-club/timeline" element={<Timeline />} />
          <Route path="/el-club/palmares" element={<Palmares />} />
          <Route path="/el-club/instalaciones" element={<Instalaciones />} />
          <Route path="/el-club/comision" element={<Comision />} />
          <Route path="/el-club/cuerpo-tecnico" element={<CuerpoTecnico />} />

          {/* Noticias */}
          <Route path="/noticias" element={<NewsFeed />} />
          <Route path="/noticias/:slug" element={<NewsArticle />} />

          {/* Bloque Rugby */}
          <Route path="/rugby" element={<RugbyHub />} />
          <Route path="/rugby/plantel-superior" element={<PlantelSuperior />} />
          <Route path="/rugby/jugador/:id" element={<FichaJugador />} />
          <Route path="/rugby/juveniles" element={<Juveniles />} />
          <Route path="/rugby/infantiles" element={<Infantiles />} />
          <Route path="/rugby/fixture" element={<Fixture />} />
          <Route path="/rugby/partido/:id" element={<DetallePartido />} />
          <Route path="/rugby/posiciones" element={<Posiciones />} />
          <Route path="/rugby/estadisticas" element={<Estadisticas />} />

          <Route
            path="*"
            element={
              <div className="flex items-center justify-center min-h-[60vh]">
                <h2 className="text-2xl font-bold text-gray-500">
                  Página en construcción (404)
                </h2>
              </div>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
