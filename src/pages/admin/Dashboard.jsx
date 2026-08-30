import React from "react";
import { motion } from "framer-motion";
import {
  Trophy,
  Calendar,
  Users,
  Newspaper,
  ShieldAlert,
  CheckCircle2,
} from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="space-y-8">
      {/* Título */}
      <div>
        <h1 className="text-3xl md:text-4xl font-black text-nyg-blue uppercase tracking-wider">
          Dashboard
        </h1>
        <p className="text-gray-400 font-bold uppercase tracking-widest text-sm mt-1">
          Resumen general del club
        </p>
      </div>

      {/* FE-120: Accesos Directos (Quick Actions) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <Link
          to="/admin/partidos/nuevo"
          className="bg-white border-2 border-transparent shadow-sm rounded-3xl p-6 hover:border-nyg-blue hover:shadow-xl transition-all duration-300 group"
        >
          <div className="w-14 h-14 bg-nyg-blue/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
            <Calendar className="text-nyg-blue" size={28} />
          </div>
          <h3 className="text-xl font-black text-nyg-blue mb-1">
            Cargar Partido
          </h3>
          <p className="text-sm font-medium text-gray-400">
            Registrar nuevo resultado
          </p>
        </Link>

        <Link
          to="/admin/noticias/nueva"
          className="bg-white border-2 border-transparent shadow-sm rounded-3xl p-6 hover:border-nyg-red hover:shadow-xl transition-all duration-300 group"
        >
          <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
            <Newspaper className="text-nyg-red" size={28} />
          </div>
          <h3 className="text-xl font-black text-nyg-blue mb-1">
            Crear Noticia
          </h3>
          <p className="text-sm font-medium text-gray-400">
            Publicar en el feed
          </p>
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

        <Link
          to="/admin/torneos"
          className="bg-white border-2 border-transparent shadow-sm rounded-3xl p-6 hover:border-nyg-gold hover:shadow-xl transition-all duration-300 group"
        >
          <div className="w-14 h-14 bg-yellow-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
            <Trophy className="text-nyg-gold" size={28} />
          </div>
          <h3 className="text-xl font-black text-nyg-blue mb-1">Torneos</h3>
          <p className="text-sm font-medium text-gray-400">Reglas y puntajes</p>
        </Link>
      </div>

      {/* Grid Inferior: Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        {/* FE-121: Widget de Alertas Disciplinarias (Prioridad Alta) */}
        <div className="lg:col-span-2 bg-white border border-gray-100 shadow-sm rounded-3xl p-6 md:p-8">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
            <h2 className="text-2xl font-black text-gray-800 uppercase tracking-wide flex items-center gap-3">
              <ShieldAlert className="text-amber-500" size={28} />
              Alertas Disciplinarias
            </h2>
            <Link
              to="/admin/alertas"
              className="text-xs font-bold uppercase tracking-widest text-nyg-blue hover:text-nyg-red transition-colors"
            >
              Ver todas
            </Link>
          </div>

          <div className="space-y-4">
            {/* Mock Data */}
            <div className="flex items-center justify-between bg-red-50 p-5 rounded-2xl border-l-4 border-nyg-red shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4">
                <img
                  src="/gabrielAscarate.png"
                  className="w-12 h-12 rounded-full border-2 border-white shadow-sm object-cover object-top"
                  alt="Jugador"
                />
                <div>
                  <h4 className="font-black text-gray-900 text-lg">
                    Gabriel Ascárate
                  </h4>
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
                    Primera División
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span className="inline-block px-4 py-1.5 bg-nyg-red text-white text-xs font-black uppercase tracking-widest rounded-full shadow-sm">
                  Suspendido (1 Fecha)
                </span>
                <p className="text-xs font-medium text-red-400 mt-2">
                  Acumulación: 5 amarillas
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between bg-amber-50 p-5 rounded-2xl border-l-4 border-amber-500 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4">
                <img
                  src="https://ui-avatars.com/api/?name=TB&background=1E3A8A&color=fff"
                  className="w-12 h-12 rounded-full border-2 border-white shadow-sm"
                  alt="Jugador"
                />
                <div>
                  <h4 className="font-black text-gray-900 text-lg">
                    Tomás Brainovich
                  </h4>
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
                    Intermedia
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span className="inline-block px-4 py-1.5 bg-amber-500 text-white text-xs font-black uppercase tracking-widest rounded-full shadow-sm">
                  En Alerta (2 Amarillas)
                </span>
                <p className="text-xs font-medium text-amber-600 mt-2">
                  A una de suspensión
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FE-122: Widget "Sumate" / FE-123: Borradores */}
        <div className="space-y-8">
          {/* Tareas Pendientes */}
          <div className="bg-white border border-gray-100 shadow-sm rounded-3xl p-6 md:p-8">
            <h2 className="text-xl font-black text-gray-800 uppercase tracking-wide mb-6 pb-4 border-b border-gray-100">
              Tareas Pendientes
            </h2>
            <div className="space-y-5">
              <div className="flex items-start gap-4 p-3 hover:bg-gray-50 rounded-xl transition-colors">
                <div className="mt-1">
                  <div className="w-3 h-3 rounded-full bg-nyg-blue shadow-sm"></div>
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-800">
                    Aprobar nota "Victoria en el clásico"
                  </p>
                  <p className="text-xs font-medium text-gray-400 mt-1">
                    De: Editor Web
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-3 hover:bg-gray-50 rounded-xl transition-colors">
                <div className="mt-1">
                  <div className="w-3 h-3 rounded-full bg-nyg-red shadow-sm"></div>
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-800">
                    Contactar a 3 inscritos en "Sumate"
                  </p>
                  <p className="text-xs font-medium text-gray-400 mt-1">
                    Último: Juan Pérez (M17)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
