import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Calendar, Trophy, MapPin } from "lucide-react";

// DICCIONARIO DE ESCUDOS: Mapea el nombre exacto del equipo con el archivo png que subiste.
// Al extraer esto en un objeto, en el futuro la Tabla de Posiciones podrá usar este mismo mapeo.
const getShield = (teamName) => {
  const shields = {
    "Natación y Gimnasia": "/escudos/nyg.png",
    "Tucumán Rugby": "/escudos/tuc-rugby.png",
    "Lince RC": "/escudos/lince.png",
    Huirapuca: "/escudos/huirapuca.png",
    "Universitario (T)": "/escudos/universitario-tuc.png",
    "Cardenales RC": "/escudos/cardenales.png",
    "Jockey Club (R)": "/escudos/jockey-rosario.png",
    "Tucumán Lawn Tennis": "/escudos/tuc-lawn-tenis.png",
    "Los Tarcos": "/escudos/tarcos.png",
  };
  // Fallback por si falta algún escudo
  return (
    shields[teamName] ||
    "https://ui-avatars.com/api/?name=" +
      teamName +
      "&background=f3f4f6&color=9ca3af&rounded=true"
  );
};

const UPCOMING = [
  {
    id: 1,
    competition: "Anual Tucumano",
    day: "05",
    month: "SEP",
    time: "16:00 hs",
    homeTeam: "Natación y Gimnasia",
    awayTeam: "Tucumán Rugby",
    location: "Local",
  },
  {
    id: 2,
    competition: "Anual Tucumano",
    day: "12",
    month: "SEP",
    time: "16:00 hs",
    homeTeam: "Lince RC",
    awayTeam: "Natación y Gimnasia",
    location: "Visitante",
  },
  {
    id: 3,
    competition: "Torneo del Interior",
    day: "19",
    month: "SEP",
    time: "15:30 hs",
    homeTeam: "Natación y Gimnasia",
    awayTeam: "Jockey Club (R)",
    location: "Local",
  },
];

const RESULTS = [
  {
    id: 4,
    competition: "Anual Tucumano",
    day: "29",
    month: "AGO",
    homeTeam: "Natación y Gimnasia",
    awayTeam: "Huirapuca",
    homeScore: 24,
    awayScore: 19,
    location: "Local",
    won: true,
  },
  {
    id: 5,
    competition: "Anual Tucumano",
    day: "22",
    month: "AGO",
    homeTeam: "Universitario (T)",
    awayTeam: "Natación y Gimnasia",
    homeScore: 28,
    awayScore: 21,
    location: "Visitante",
    won: false,
  },
  {
    id: 6,
    competition: "Anual Tucumano",
    day: "15",
    month: "AGO",
    homeTeam: "Natación y Gimnasia",
    awayTeam: "Cardenales RC",
    homeScore: 35,
    awayScore: 10,
    location: "Local",
    won: true,
  },
];

const Fixture = () => {
  return (
    <div className="w-full bg-gray-50 pb-32">
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
            Fixture
          </h1>
          <p className="text-xl md:text-2xl text-nyg-red font-bold tracking-widest uppercase">
            Calendario y Resultados
          </p>
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 -mt-10">
        <Link
          to="/rugby"
          className="inline-flex items-center gap-2 text-nyg-red font-semibold hover:text-red-700 mb-10 transition-colors"
        >
          <ArrowLeft size={20} /> Volver a Rugby
        </Link>

        {/* SECCIÓN 1: PRÓXIMOS PARTIDOS */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-6 border-b-2 border-gray-200 pb-4">
            <Calendar className="text-nyg-blue" size={32} />
            <h2 className="text-3xl font-black text-nyg-blue uppercase tracking-tight">
              Próximos Partidos
            </h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-4xl shadow-xl overflow-hidden border border-gray-100"
          >
            {UPCOMING.map((match, idx) => (
              <div
                key={match.id}
                className={`flex flex-col md:flex-row items-center border-b border-gray-100 last:border-b-0 p-6 md:p-8 hover:bg-gray-50 transition-colors relative md:border-l-8 
                  ${idx === 0 ? "md:border-l-nyg-red" : idx === 1 ? "md:border-l-gray-300" : "md:border-l-nyg-blue"}
                  `}
              >
                {/* Cinta indicadora en móviles */}
                <div
                  className={`absolute top-0 left-0 w-full h-2 md:hidden ${idx === 0 ? "bg-nyg-red" : idx === 1 ? "bg-gray-300" : "bg-nyg-blue"}`}
                ></div>

                {/* Bloque de Fecha */}
                <div className="flex flex-col items-center justify-center bg-gray-50 rounded-2xl px-6 py-4 w-full md:w-32 shrink-0 mb-6 md:mb-0 shadow-inner mt-2 md:mt-0">
                  <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                    {match.month}
                  </span>
                  <span className="text-4xl font-black text-nyg-blue leading-none my-1">
                    {match.day}
                  </span>
                  <span className="text-xs font-bold text-gray-500">
                    {match.time}
                  </span>
                </div>

                {/* Bloque de Escudos (Sustituyendo Nombres) */}
                <div className="flex-1 flex flex-row items-center justify-center gap-8 md:gap-12 w-full px-4 mb-6 md:mb-0">
                  <div className="flex-1 flex justify-end">
                    <img
                      src={getShield(match.homeTeam)}
                      alt={match.homeTeam}
                      title={match.homeTeam}
                      className="w-20 h-20 md:w-24 md:h-24 object-contain drop-shadow-md hover:scale-110 transition-transform"
                    />
                  </div>

                  <div className="bg-gray-100 text-gray-400 font-black px-4 py-1.5 rounded-full text-sm shrink-0">
                    VS
                  </div>

                  <div className="flex-1 flex justify-start">
                    <img
                      src={getShield(match.awayTeam)}
                      alt={match.awayTeam}
                      title={match.awayTeam}
                      className="w-20 h-20 md:w-24 md:h-24 object-contain drop-shadow-md hover:scale-110 transition-transform"
                    />
                  </div>
                </div>

                {/* Bloque de Información / Ubicación */}
                <div className="w-full md:w-48 flex flex-col items-center md:items-end text-sm text-gray-500 gap-2 border-t md:border-t-0 md:border-l border-gray-200 pt-6 md:pt-0 md:pl-6 text-center md:text-right shrink-0">
                  <span className="font-bold text-nyg-blue bg-nyg-blue/10 px-3 py-1 rounded-full">
                    {match.competition}
                  </span>
                  <span className="flex items-center gap-1.5 mt-1 font-black text-nyg-gold uppercase tracking-widest">
                    <MapPin size={16} /> {match.location}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* SECCIÓN 2: ÚLTIMOS RESULTADOS */}
        <div>
          <div className="flex items-center gap-3 mb-6 border-b-2 border-gray-200 pb-4">
            <Trophy className="text-nyg-red" size={32} />
            <h2 className="text-3xl font-black text-nyg-red uppercase tracking-tight">
              Últimos Resultados
            </h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-4xl shadow-xl overflow-hidden border border-gray-100"
          >
            {RESULTS.map((match, idx) => (
              <div
                key={match.id}
                className={`flex flex-col md:flex-row items-center border-b border-gray-100 last:border-b-0 p-6 md:p-8 hover:bg-gray-50 transition-colors relative md:border-l-8 ${idx === 0 ? "md:border-l-nyg-red" : idx === 1 ? "md:border-l-gray-300" : "md:border-l-nyg-blue"}`}
              >
                {/* Cinta indicadora en móviles */}
                <div
                  className={`absolute top-0 left-0 w-full h-2 md:hidden ${idx === 0 ? "bg-nyg-red" : idx === 1 ? "bg-gray-300" : "bg-nyg-blue"}`}
                ></div>

                {/* Bloque de Fecha */}
                <div className="flex flex-col items-center justify-center w-full md:w-32 shrink-0 mb-6 md:mb-0 mt-2 md:mt-0">
                  <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                    {match.month}
                  </span>
                  <span className="text-3xl font-black text-gray-600">
                    {match.day}
                  </span>
                </div>

                {/* Bloque de Escudos y Puntuación */}
                <div className="flex-1 flex flex-row items-center justify-center gap-3 sm:gap-6 md:gap-10 w-full px-2 sm:px-4 mb-6 md:mb-0">
                  <div className="flex-1 flex justify-end">
                    <img
                      src={getShield(match.homeTeam)}
                      alt={match.homeTeam}
                      title={match.homeTeam}
                      className={`w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain drop-shadow-md hover:scale-110 transition-transform shrink-0 ${match.homeScore < match.awayScore ? "opacity-60 grayscale-50" : ""}`}
                    />
                  </div>

                  {/* Marcador Central */}
                  <div className="flex items-center bg-gray-900 text-white rounded-xl md:rounded-2xl overflow-hidden font-black text-xl sm:text-3xl md:text-4xl shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)] shrink-0">
                    <div
                      className={`px-3 py-2 sm:px-5 sm:py-3 md:px-6 md:py-4 ${match.homeScore > match.awayScore ? "text-nyg-gold bg-black/60" : "text-gray-400"}`}
                    >
                      {match.homeScore}
                    </div>
                    <div className="text-gray-700 px-1">-</div>
                    <div
                      className={`px-3 py-2 sm:px-5 sm:py-3 md:px-6 md:py-4 ${match.awayScore > match.homeScore ? "text-nyg-gold bg-black/60" : "text-gray-400"}`}
                    >
                      {match.awayScore}
                    </div>
                  </div>

                  <div className="flex-1 flex justify-start">
                    <img
                      src={getShield(match.awayTeam)}
                      alt={match.awayTeam}
                      title={match.awayTeam}
                      className={`w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain drop-shadow-md hover:scale-110 transition-transform shrink-0 ${match.awayScore < match.homeScore ? "opacity-60 grayscale-50" : ""}`}
                    />
                  </div>
                </div>

                {/* Bloque de Información / Estado */}
                <div className="w-full md:w-48 flex flex-col items-center md:items-end text-sm gap-2 border-t md:border-t-0 md:border-l border-gray-200 pt-6 md:pt-0 md:pl-6 text-center md:text-right shrink-0">
                  <span className="font-bold text-gray-700 text-center md:text-right">
                    {match.competition}
                  </span>
                  <span
                    className={`mt-1 font-black uppercase tracking-wider px-4 py-1.5 rounded-md ${match.won ? "bg-nyg-gold/10 text-nyg-gold" : "bg-nyg-red/10 text-nyg-red"}`}
                  >
                    {match.won ? "Victoria" : "Derrota"}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Fixture;
