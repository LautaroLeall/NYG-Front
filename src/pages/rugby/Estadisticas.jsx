import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Trophy, Loader2 } from "lucide-react";
import axios from "../../api/axiosConfig";

const STAT_TYPES = [
  { id: "anotadores", label: "Triman (Tries)" },
  { id: "goleadores", label: "Goleadores (Puntos)" },
  { id: "partidos", label: "Partidos Jugados (Caps)" },
  { id: "minutos", label: "Minutos Jugados" },
];

const Estadisticas = () => {
  const [tournaments, setTournaments] = useState([]);
  const [selectedTournamentId, setSelectedTournamentId] = useState("Todos");
  const [activeStat, setActiveStat] = useState("anotadores");

  const [rankings, setRankings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Cargar Torneos
  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const res = await axios.get("/api/tournaments");
        // El endpoint /api/tournaments devuelve un array directamente, no un objeto {data: []}
        setTournaments(res.data || []);
      } catch (error) {
        console.error("Error al cargar torneos", error);
        setTournaments([]);
      }
    };
    fetchTournaments();
  }, []);

  // Cargar Rankings
  useEffect(() => {
    const fetchRankings = async () => {
      setIsLoading(true);
      try {
        const url = `/api/stats/rankings?tipo=${activeStat}${
          selectedTournamentId !== "Todos"
            ? `&tournamentId=${selectedTournamentId}`
            : ""
        }&limit=3`;
        const res = await axios.get(url);
        setRankings(res.data.data || []);
      } catch (error) {
        console.error("Error al cargar rankings", error);
        setRankings([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRankings();
  }, [activeStat, selectedTournamentId]);

  return (
    <div className="w-full bg-gray-50 pb-20 overflow-hidden min-h-screen">
      {/* Cabecera / Hero Unificada */}
      <div
        className="relative h-[50vh] min-h-87.5 flex items-center justify-center bg-center bg-cover bg-fixed"
        style={{ backgroundImage: "url('/img-club5.png')" }}
      >
        <div className="absolute inset-0 bg-nyg-blue/90 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-linear-to-t from-white to-transparent opacity-100"></div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-4 mt-20"
        >
          <h1 className="text-5xl md:text-7xl font-black text-nyg-blue uppercase tracking-wider drop-shadow-sm mb-4">
            Estadísticas
          </h1>
          <p className="text-xl md:text-2xl text-nyg-red font-bold tracking-widest uppercase">
            Top 3 del Plantel
          </p>
        </motion.div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        <Link
          to="/rugby"
          className="inline-flex items-center gap-2 text-nyg-red font-semibold hover:text-red-700 mb-10 transition-colors"
        >
          <ArrowLeft size={20} /> Volver a Rugby
        </Link>

        {/* Selector de Torneo (Pills) */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 flex justify-center"
        >
          <div className="flex flex-wrap items-center justify-center gap-2 bg-white p-1.5 rounded-full shadow-lg border border-gray-100">
            <button
              onClick={() => setSelectedTournamentId("Todos")}
              className={`px-5 py-2 rounded-full font-bold uppercase tracking-widest text-xs transition-all duration-300 ${
                selectedTournamentId === "Todos"
                  ? "bg-nyg-blue text-white shadow-md"
                  : "bg-transparent text-gray-400 hover:text-nyg-blue hover:bg-gray-50"
              }`}
            >
              General Histórico
            </button>
            {tournaments.map((t) => (
              <button
                key={t._id}
                onClick={() => setSelectedTournamentId(t._id)}
                className={`px-5 py-2 rounded-full font-bold uppercase tracking-widest text-xs transition-all duration-300 ${
                  selectedTournamentId === t._id
                    ? "bg-nyg-blue text-white shadow-md"
                    : "bg-transparent text-gray-400 hover:text-nyg-blue hover:bg-gray-50"
                }`}
              >
                {t.name}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Selector de Estadística (Horizontal Inline) */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-20 border-b border-gray-100 pb-6">
          {STAT_TYPES.map((type) => (
            <button
              key={type.id}
              onClick={() => setActiveStat(type.id)}
              className={`px-4 py-2 uppercase tracking-widest text-xs font-black transition-colors ${
                activeStat === type.id
                  ? "text-nyg-red border-b-2 border-nyg-red"
                  : "text-gray-400 hover:text-gray-800"
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>

        {/* Loading State o Podio */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-12 h-12 text-nyg-blue animate-spin" />
          </div>
        ) : rankings.length >= 3 ? (
          <div className="flex flex-col md:flex-row items-end justify-center gap-4 md:gap-8 mt-12 md:mt-32 h-auto md:h-80 max-w-3xl mx-auto">
            {/* 2do Puesto */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col items-center order-2 md:order-1 w-full md:w-1/3 mt-8 md:mt-0"
            >
              <div className="w-20 h-20 rounded-full p-1 bg-linear-to-br from-gray-300 to-gray-400 shadow-md mb-3">
                <img
                  src={
                    rankings[1].playerInfo?.imageUrl ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(rankings[1].playerInfo?.name)}&background=0A1128&color=fff&size=150`
                  }
                  alt={rankings[1].playerInfo?.name}
                  className="w-full h-full object-cover rounded-full border-2 border-white"
                />
              </div>
              <span className="font-black text-gray-800 text-center leading-tight mb-1">
                {rankings[1].playerInfo?.name}
              </span>
              <span className="text-3xl font-black text-gray-400 mb-4">
                {rankings[1].value}
              </span>
              <div className="w-full h-24 md:h-32 bg-gray-100 rounded-t-xl flex justify-center pt-3 border-t-4 border-gray-300 shadow-inner"></div>
            </motion.div>

            {/* 1er Puesto */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex flex-col items-center order-1 md:order-2 w-full md:w-1/3 relative z-10"
            >
              <Trophy className="text-nyg-gold mb-2 drop-shadow-md" size={32} />
              <div className="w-28 h-28 rounded-full p-1 bg-linear-to-br from-nyg-gold to-yellow-600 shadow-xl mb-3">
                <img
                  src={
                    rankings[0].playerInfo?.imageUrl ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(rankings[0].playerInfo?.name)}&background=0A1128&color=fff&size=200`
                  }
                  alt={rankings[0].playerInfo?.name}
                  className="w-full h-full object-cover rounded-full border-4 border-white"
                />
              </div>
              <span className="text-xl font-black text-nyg-blue text-center leading-tight mb-1">
                {rankings[0].playerInfo?.name}
              </span>
              <span className="text-5xl font-black text-nyg-red mb-4 drop-shadow-sm">
                {rankings[0].value}
              </span>
              <div className="w-full h-24 md:h-40 bg-nyg-blue rounded-t-xl flex justify-center pt-4 border-t-4 border-nyg-gold shadow-2xl"></div>
            </motion.div>

            {/* 3er Puesto */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col items-center order-3 md:order-3 w-full md:w-1/3 mt-8 md:mt-0"
            >
              <div className="w-16 h-16 rounded-full p-1 bg-linear-to-br from-amber-600 to-amber-800 shadow-md mb-3">
                <img
                  src={
                    rankings[2].playerInfo?.imageUrl ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(rankings[2].playerInfo?.name)}&background=0A1128&color=fff&size=150`
                  }
                  alt={rankings[2].playerInfo?.name}
                  className="w-full h-full object-cover rounded-full border-2 border-white"
                />
              </div>
              <span className="text-sm font-black text-gray-700 text-center leading-tight mb-1">
                {rankings[2].playerInfo?.name}
              </span>
              <span className="text-2xl font-black text-amber-700 mb-4">
                {rankings[2].value}
              </span>
              <div className="w-full h-24 md:h-24 bg-gray-50 rounded-t-xl flex justify-center pt-2 border-t-4 border-amber-700 shadow-inner"></div>
            </motion.div>
          </div>
        ) : (
          <div className="py-20 text-center flex flex-col items-center">
            <Trophy className="text-gray-200 mb-4" size={48} />
            <h3 className="text-xl font-bold text-gray-400">
              Sin datos suficientes
            </h3>
            <p className="text-gray-400 mt-2">
              Se necesitan al menos 3 jugadores con estadísticas cargadas para
              formar el podio.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Estadisticas;
