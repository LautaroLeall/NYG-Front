import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Activity,
  Trophy,
  Shield,
  Calendar,
  Loader2,
} from "lucide-react";
import axios from "../../api/axiosConfig";
import dayjs from "dayjs";

const FichaJugador = () => {
  const { id } = useParams();
  const [player, setPlayer] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPlayer = async () => {
      try {
        const res = await axios.get(`/api/players/${id}`);
        setPlayer(res.data.data);
      } catch (error) {
        console.error("Error fetching player", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPlayer();
  }, [id]);

  if (isLoading) {
    return (
      <div className="w-full bg-gray-50 min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-nyg-blue" />
      </div>
    );
  }

  if (!player) {
    return (
      <div className="w-full bg-gray-50 min-h-screen flex items-center justify-center flex-col gap-4">
        <h2 className="text-2xl font-bold text-nyg-blue">
          Jugador no encontrado
        </h2>
        <Link
          to="/rugby/plantel-superior"
          className="text-nyg-red font-bold flex items-center gap-2"
        >
          <ArrowLeft size={20} /> Volver al Plantel
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full bg-gray-50 pb-20 overflow-hidden">
      {/* Cabecera / Hero dividida */}
      <div className="relative bg-nyg-blue overflow-hidden pt-24 min-h-[60vh] flex items-center">
        {/* Fondo decorativo */}
        <div className="absolute inset-0 opacity-10 bg-[url('/img-club1.png')] bg-cover mix-blend-overlay"></div>

        {/* Marca de agua NYG / Número */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-full max-w-7xl flex items-center justify-start pointer-events-none opacity-10 overflow-hidden pl-4 md:pl-20">
          <span className="text-[10rem] sm:text-[14rem] md:text-[18rem] font-black text-white leading-none">
            {player.number || "NYG"}
          </span>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Info Izquierda */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-white pt-10 pb-20 md:pb-0"
          >
            <Link
              to="/rugby/plantel-superior"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white font-semibold mb-8 transition-colors"
            >
              <ArrowLeft size={20} /> Volver al Plantel
            </Link>

            <div className="flex items-center gap-4 mb-4">
              <span className="bg-nyg-red text-white font-black px-4 py-1 rounded-full uppercase tracking-widest text-sm">
                {player.position}
              </span>
              <span className="text-nyg-gold font-bold uppercase tracking-widest text-sm border border-nyg-gold px-4 py-1 rounded-full">
                {player.category}
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tight leading-none mb-2 drop-shadow-lg">
              {player.name}
            </h1>
          </motion.div>

          {/* Imagen Derecha */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative h-96 md:h-150 flex items-end justify-center"
          >
            <div className="absolute bottom-0 w-64 h-64 bg-nyg-red opacity-20 blur-3xl rounded-full"></div>
            <img
              src={
                player.imageUrl ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(player.name)}&background=DC2626&color=fff&size=512`
              }
              alt={player.name}
              className="relative z-10 w-full h-full object-contain object-bottom drop-shadow-[0_20px_20px_rgba(0,0,0,0.5)]"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://ui-avatars.com/api/?name=" +
                  encodeURIComponent(player.name) +
                  "&background=DC2626&color=fff&size=512";
                e.target.className =
                  "relative z-10 w-64 h-64 rounded-full border-8 border-white/10 object-cover shadow-2xl mb-12";
              }}
            />
          </motion.div>
        </div>
      </div>

      {/* Contenido / Estadísticas */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 md:-mt-24 relative z-20">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Ficha Física */}
            <div className="flex flex-col justify-center">
              <h3 className="text-xl font-black text-nyg-blue uppercase tracking-widest mb-8 flex items-center gap-3 border-b border-gray-200 pb-4">
                <Activity className="text-nyg-red" /> Ficha del Jugador
              </h3>

              <div className="grid grid-cols-2 gap-8">
                <div>
                  <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">
                    Altura
                  </span>
                  <span className="text-3xl font-black text-gray-800">
                    {player.height ? `${player.height} cm` : "-"}
                  </span>
                </div>
                <div>
                  <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">
                    Peso
                  </span>
                  <span className="text-3xl font-black text-gray-800">
                    {player.weight ? `${player.weight} kg` : "-"}
                  </span>
                </div>
                <div>
                  <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">
                    Nacimiento
                  </span>
                  <span className="text-2xl font-black text-gray-800">
                    {player.dateOfBirth
                      ? dayjs(player.dateOfBirth).format("DD/MM/YYYY")
                      : "-"}
                  </span>
                </div>
                <div>
                  <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">
                    Estado
                  </span>
                  <span
                    className={`text-2xl font-black ${player.isActive ? "text-nyg-red" : "text-gray-400"}`}
                  >
                    {player.isActive ? "Activo" : "Inactivo"}
                  </span>
                </div>
              </div>
            </div>

            {/* Estadísticas */}
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
              <h3 className="text-xl font-black text-nyg-blue uppercase tracking-widest mb-8 flex items-center gap-3 border-b border-gray-200 pb-4">
                <Trophy className="text-nyg-gold" /> Estadísticas
              </h3>

              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">
                    Partidos Jugados (Caps)
                  </span>
                  <span className="text-2xl font-black text-nyg-blue">
                    {player.stats?.caps || 0}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">
                    Minutos Jugados
                  </span>
                  <span className="text-2xl font-black text-nyg-blue">
                    {player.stats?.minutesPlayed || 0}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">
                    Tries Anotados
                  </span>
                  <span className="text-2xl font-black text-nyg-blue">
                    {player.stats?.tries || 0}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium flex items-center gap-2">
                    <span className="w-3 h-4 bg-yellow-400 rounded-sm"></span>{" "}
                    Amarillas
                  </span>
                  <span className="text-xl font-black text-gray-800">
                    {player.stats?.yellowCards || 0}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium flex items-center gap-2">
                    <span className="w-3 h-4 bg-red-600 rounded-sm"></span>{" "}
                    Rojas
                  </span>
                  <span className="text-xl font-black text-gray-800">
                    {player.stats?.redCards || 0}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FichaJugador;
