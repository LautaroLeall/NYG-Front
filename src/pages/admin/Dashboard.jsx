import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Trophy,
  Calendar,
  Users,
  Newspaper,
  ShieldAlert,
  Mail,
  Loader2,
  Activity,
} from "lucide-react";
import { Link } from "react-router-dom";
import axios from "../../api/axiosConfig";

const Dashboard = () => {
  const [stats, setStats] = useState({
    unreadMessages: 0,
    totalMatches: 0,
    totalNews: 0,
    alerts: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("/api/dashboard/stats");
        if (res.data.success) {
          setStats(res.data.data);
        }
      } catch (error) {
        console.error("Error al cargar estadisticas", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="space-y-8">
      {/* Título */}
      <div>
        <h1 className="text-2xl font-black text-nyg-blue uppercase tracking-widest flex items-center gap-3">
          <Activity className="w-8 h-8" />
          Dashboard
        </h1>
        <p className="text-sm font-bold text-gray-400 tracking-wider">
          Resumen general del club
        </p>
      </div>

      {/* Accesos Directos (Quick Actions) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <Link
          to="/admin/partidos"
          className="bg-white border-2 border-transparent shadow-sm rounded-3xl p-6 hover:border-nyg-blue hover:shadow-xl transition-all duration-300 group"
        >
          <div className="flex justify-between items-start mb-6">
            <div className="w-14 h-14 bg-nyg-blue/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Calendar className="text-nyg-blue" size={28} />
            </div>
            {isLoading ? null : (
              <span className="text-3xl font-black text-gray-200">
                {stats.totalMatches}
              </span>
            )}
          </div>
          <h3 className="text-xl font-black text-nyg-blue mb-1">Partidos</h3>
          <p className="text-sm font-medium text-gray-400">
            Registrar o editar
          </p>
        </Link>

        <Link
          to="/admin/noticias"
          className="bg-white border-2 border-transparent shadow-sm rounded-3xl p-6 hover:border-nyg-red hover:shadow-xl transition-all duration-300 group"
        >
          <div className="flex justify-between items-start mb-6">
            <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Newspaper className="text-nyg-red" size={28} />
            </div>
            {isLoading ? null : (
              <span className="text-3xl font-black text-gray-200">
                {stats.totalNews}
              </span>
            )}
          </div>
          <h3 className="text-xl font-black text-nyg-blue mb-1">Noticias</h3>
          <p className="text-sm font-medium text-gray-400">
            Publicar en el feed
          </p>
        </Link>

        <Link
          to="/admin/mensajes"
          className="bg-white border-2 border-transparent shadow-sm rounded-3xl p-6 hover:border-nyg-gold hover:shadow-xl transition-all duration-300 group relative"
        >
          <div className="flex justify-between items-start mb-6">
            <div className="w-14 h-14 bg-yellow-50 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Mail className="text-nyg-gold" size={28} />
            </div>
            {stats.unreadMessages > 0 && (
              <span className="absolute top-6 right-6 bg-nyg-red text-white text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full animate-pulse shadow-md">
                Nuevos
              </span>
            )}
          </div>
          <h3 className="text-xl font-black text-nyg-blue mb-1">Mensajes</h3>
          <p className="text-sm font-medium text-gray-400">Formulario Sumate</p>
        </Link>

        <Link
          to="/admin/planteles"
          className="bg-white border-2 border-transparent shadow-sm rounded-3xl p-6 hover:border-purple-500 hover:shadow-xl transition-all duration-300 group"
        >
          <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
            <Users className="text-purple-600" size={28} />
          </div>
          <h3 className="text-xl font-black text-nyg-blue mb-1">Planteles</h3>
          <p className="text-sm font-medium text-gray-400">
            Gestionar jugadores
          </p>
        </Link>
      </div>

      {/* Grid Inferior: Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        {/* Widget de Alertas Disciplinarias */}
        <div className="lg:col-span-2 bg-white border border-gray-100 shadow-sm rounded-3xl p-6 md:p-8 flex flex-col h-full">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
            <div>
              <h2 className="text-2xl font-black text-gray-800 uppercase tracking-wide flex items-center gap-3">
                <ShieldAlert className="text-amber-500" size={28} />
                Alertas Disciplinarias
              </h2>
              <p className="text-sm font-medium text-gray-400 mt-1">
                Jugadores con tarjetas acumuladas
              </p>
            </div>
            <Link
              to="/admin/alertas"
              className="text-xs font-bold uppercase tracking-widest text-nyg-blue hover:text-nyg-red transition-colors bg-blue-50 px-4 py-2 rounded-full"
            >
              Ver todas
            </Link>
          </div>

          <div className="flex-1 space-y-4">
            {isLoading ? (
              <div className="flex justify-center items-center h-full min-h-50">
                <Loader2 className="w-8 h-8 animate-spin text-nyg-blue" />
              </div>
            ) : stats.alerts.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full min-h-50 text-gray-400 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                <ShieldAlert size={40} className="mb-3 text-gray-300" />
                <p className="font-bold">
                  No hay alertas activas en este momento.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {stats.alerts.slice(0, 4).map((alert, idx) => (
                  <div
                    key={idx}
                    className={`relative overflow-hidden flex flex-col p-5 rounded-2xl border ${alert.redCards > 0 ? "bg-red-50/50 border-nyg-red/20" : "bg-amber-50/50 border-amber-500/20"} shadow-[0_4px_15px_rgba(0,0,0,0.02)] hover:shadow-md transition-shadow group`}
                  >
                    {/* Indicador lateral */}
                    <div
                      className={`absolute top-0 left-0 bottom-0 w-1 ${alert.redCards > 0 ? "bg-nyg-red" : "bg-amber-500"}`}
                    ></div>

                    <div className="flex items-center gap-4 mb-4">
                      {alert.player?.imageUrl ? (
                        <img
                          src={alert.player.imageUrl}
                          className="w-12 h-12 rounded-full border-2 border-white shadow-sm object-cover object-top"
                          alt="Jugador"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-nyg-blue text-white flex items-center justify-center font-bold shadow-sm border-2 border-white">
                          {alert.player?.name
                            ? alert.player.name.charAt(0)
                            : "J"}
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-black text-gray-900 text-lg truncate">
                          {alert.player?.name}
                        </h4>
                        <p className="text-xs font-bold uppercase tracking-wider text-gray-500 truncate">
                          {alert.player?.category || "Plantel Superior"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-auto">
                      {alert.redCards > 0 && (
                        <span className="flex-1 text-center px-2 py-1.5 bg-nyg-red text-white text-xs font-black uppercase tracking-widest rounded-lg shadow-sm">
                          {alert.redCards} Roja{alert.redCards > 1 ? "s" : ""}
                        </span>
                      )}
                      {alert.yellowCards > 0 && (
                        <span className="flex-1 text-center px-2 py-1.5 bg-amber-500 text-white text-xs font-black uppercase tracking-widest rounded-lg shadow-sm">
                          {alert.yellowCards} Amarilla
                          {alert.yellowCards > 1 ? "s" : ""}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Atajos Rápidos */}
        <div className="bg-white border border-gray-100 shadow-sm rounded-3xl p-6 md:p-8 flex flex-col h-full">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
            <div>
              <h2 className="text-2xl font-black text-nyg-blue uppercase tracking-widest flex items-center gap-3">
                Atajos Rápidos
              </h2>
              <p className="text-sm font-bold text-gray-400 mt-1">
                Configuraciones principales
              </p>
            </div>
          </div>

          <div className="space-y-4 flex-1">
            <Link
              to="/admin/torneos"
              className="group flex items-center justify-between bg-gray-50 hover:bg-gray-100 p-5 rounded-2xl transition-all border border-gray-100 shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-nyg-blue text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
                  <Trophy size={20} />
                </div>
                <span className="font-bold text-gray-700 tracking-wide">
                  Configurar Torneos
                </span>
              </div>
              <span className="text-nyg-blue opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                ➔
              </span>
            </Link>

            <Link
              to="/admin/equipos"
              className="group flex items-center justify-between bg-gray-50 hover:bg-gray-100 p-5 rounded-2xl transition-all border border-gray-100 shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-nyg-blue text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
                  <Users size={20} />
                </div>
                <span className="font-bold text-gray-700 tracking-wide">
                  Gestión de Equipos
                </span>
              </div>
              <span className="text-nyg-blue opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                ➔
              </span>
            </Link>
          </div>

          <div className="mt-8">
            <Link
              to="/"
              target="_blank"
              className="group w-full flex items-center justify-center gap-2 bg-nyg-blue hover:bg-blue-800 text-white p-4 rounded-full transition-all font-black text-sm uppercase tracking-widest shadow-md hover:shadow-lg"
            >
              Ir al Sitio Público{" "}
              <span className="group-hover:translate-x-1 transition-transform">
                ➔
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
