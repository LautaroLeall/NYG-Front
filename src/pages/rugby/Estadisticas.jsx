import { motion } from "framer-motion";
import { useState } from "react";
import { Trophy } from "lucide-react";

// Mocks
const TOURNAMENTS = ["Campeonato Anual Tucumano", "General Temporada"];

const STAT_TYPES = [
  { id: "tries", label: "Triman (Tries)" },
  { id: "points", label: "Goleadores (Puntos)" },
  { id: "caps", label: "Partidos Jugados" },
];

const STATS_DATA = {
  tries: [
    {
      rank: 1,
      name: "Gabriel Ascárate",
      pos: "Centro",
      val: 12,
      img: "/gabrielAscarate.png",
    },
    {
      rank: 2,
      name: "Lucas Santamarina",
      pos: "Fullback",
      val: 9,
      img: "https://ui-avatars.com/api/?name=LS&background=DC2626&color=fff&size=150",
    },
    {
      rank: 3,
      name: "Joaquín Bustos",
      pos: "Wing",
      val: 7,
      img: "https://ui-avatars.com/api/?name=JB&background=DC2626&color=fff&size=150",
    },
  ],
  points: [
    {
      rank: 1,
      name: "Máximo Ledesma",
      pos: "Apertura",
      val: 145,
      img: "https://ui-avatars.com/api/?name=ML&background=DC2626&color=fff&size=150",
    },
    {
      rank: 2,
      name: "Gabriel Ascárate",
      pos: "Centro",
      val: 60,
      img: "/gabrielAscarate.png",
    },
    {
      rank: 3,
      name: "Lucas Santamarina",
      pos: "Fullback",
      val: 45,
      img: "https://ui-avatars.com/api/?name=LS&background=DC2626&color=fff&size=150",
    },
  ],
  caps: [
    {
      rank: 1,
      name: "Gonzalo García",
      pos: "Medio Scrum",
      val: 14,
      img: "/gonzaloGarcia.png",
    },
    {
      rank: 2,
      name: "Lucas Santamarina",
      pos: "Fullback",
      val: 13,
      img: "https://ui-avatars.com/api/?name=LS&background=DC2626&color=fff&size=150",
    },
    {
      rank: 3,
      name: "Gabriel Ascárate",
      pos: "Centro",
      val: 12,
      img: "/gabrielAscarate.png",
    },
  ],
};

const Estadisticas = () => {
  const [selectedTournament, setSelectedTournament] = useState(TOURNAMENTS[0]);
  const [activeStat, setActiveStat] = useState("tries");

  const currentData = STATS_DATA[activeStat] || [];

  return (
    <div className="w-full bg-white pb-32">
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
        {/* Selector de Torneo (Pills) */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 flex justify-center"
        >
          <div className="flex flex-wrap items-center justify-center gap-2 bg-white p-1.5 rounded-full shadow-lg border border-gray-100">
            {TOURNAMENTS.map((t) => (
              <button
                key={t}
                onClick={() => setSelectedTournament(t)}
                className={`px-5 py-2 rounded-full font-bold uppercase tracking-widest text-xs transition-all duration-300 ${
                  selectedTournament === t
                    ? "bg-nyg-blue text-white shadow-md"
                    : "bg-transparent text-gray-400 hover:text-nyg-blue hover:bg-gray-50"
                }`}
              >
                {t}
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

        {/* Podio 1-2-3 Minimalista */}
        {currentData.length >= 3 ? (
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
                  src={currentData[1].img}
                  alt={currentData[1].name}
                  className="w-full h-full object-cover rounded-full border-2 border-white"
                />
              </div>
              <span className="font-black text-gray-800 text-center leading-tight mb-1">
                {currentData[1].name}
              </span>
              <span className="text-3xl font-black text-gray-400 mb-4">
                {currentData[1].val}
              </span>
              <div className="w-full h-24 md:h-32 bg-gray-100 rounded-t-xl flex justify-center pt-3 border-t-4 border-gray-300 shadow-inner">
                <span className="text-3xl font-black text-gray-300">2</span>
              </div>
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
                  src={currentData[0].img}
                  alt={currentData[0].name}
                  className="w-full h-full object-cover rounded-full border-4 border-white"
                />
              </div>
              <span className="text-xl font-black text-nyg-blue text-center leading-tight mb-1">
                {currentData[0].name}
              </span>
              <span className="text-5xl font-black text-nyg-red mb-4 drop-shadow-sm">
                {currentData[0].val}
              </span>
              <div className="w-full h-24 md:h-40 bg-nyg-blue rounded-t-xl flex justify-center pt-4 border-t-4 border-nyg-gold shadow-2xl">
                <span className="text-5xl font-black text-nyg-gold">1</span>
              </div>
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
                  src={currentData[2].img}
                  alt={currentData[2].name}
                  className="w-full h-full object-cover rounded-full border-2 border-white"
                />
              </div>
              <span className="text-sm font-black text-gray-700 text-center leading-tight mb-1">
                {currentData[2].name}
              </span>
              <span className="text-2xl font-black text-amber-700 mb-4">
                {currentData[2].val}
              </span>
              <div className="w-full h-24 md:h-24 bg-gray-50 rounded-t-xl flex justify-center pt-2 border-t-4 border-amber-700 shadow-inner">
                <span className="text-2xl font-black text-amber-700/30">3</span>
              </div>
            </motion.div>
          </div>
        ) : (
          <div className="py-20 text-center text-gray-400 font-medium">
            No hay suficientes datos para armar el podio.
          </div>
        )}
      </div>
    </div>
  );
};

export default Estadisticas;
