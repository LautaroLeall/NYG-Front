import { motion } from "framer-motion";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Calendar, Trophy, MapPin, Loader2 } from "lucide-react";
import axios from "../../api/axiosConfig";
import dayjs from "dayjs";
import "dayjs/locale/es"; // Importar español para dayjs
dayjs.locale("es"); // Usar español

// DICCIONARIO DE ESCUDOS
const getShield = (teamName, shieldUrl) => {
  if (shieldUrl) return shieldUrl;
  if (!teamName)
    return "https://ui-avatars.com/api/?name=NA&background=F3F4F6&color=9CA3AF&size=150";

  const name = teamName.toLowerCase();
  if (name.includes("nataci") || name.includes("gimnasia"))
    return "/escudos/nyg.png";
  if (name.includes("tucumán rugby") || name.includes("tucuman rugby"))
    return "/escudos/tuc-rugby.png";
  if (name.includes("lince")) return "/escudos/lince.png";
  if (name.includes("huirapuca")) return "/escudos/huirapuca.png";
  if (name.includes("universitario")) return "/escudos/universitario-tuc.png";
  if (name.includes("cardenales")) return "/escudos/cardenales.png";
  if (name.includes("jockey")) return "/escudos/jockey-rosario.png";
  if (name.includes("lawn tennis")) return "/escudos/tuc-lawn-tenis.png";
  if (name.includes("tarcos")) return "/escudos/tarcos.png";

  return `https://ui-avatars.com/api/?name=${encodeURIComponent(teamName)}&background=f3f4f6&color=9ca3af&rounded=true`;
};

const Fixture = () => {
  const [upcoming, setUpcoming] = useState([]);
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        setIsLoading(true);
        // Traer próximos partidos
        const resUpcoming = await axios.get("/api/matches/upcoming");
        // Traer últimos resultados
        const resResults = await axios.get("/api/matches/latest-results");

        // Filtramos solo los de Primera y de la disciplina Rugby (aunque el backend podría devolverlos mezclados si no le pasamos query)
        const filterRugbyPrimera = (matches) =>
          matches.filter(
            (m) =>
              m.tournament?.discipline === "Rugby" &&
              m.tournament?.category === "Primera",
          );

        setUpcoming(filterRugbyPrimera(resUpcoming.data.data || []));
        setResults(filterRugbyPrimera(resResults.data.data || []));
      } catch (error) {
        console.error("Error fetching matches", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMatches();
  }, []);
  return (
    <div className="w-full bg-gray-50 pb-20 overflow-hidden">
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
            {isLoading ? (
              <div className="flex justify-center items-center h-48">
                <Loader2 className="w-8 h-8 animate-spin text-nyg-blue" />
              </div>
            ) : upcoming.length === 0 ? (
              <div className="flex justify-center items-center h-48">
                <span className="text-gray-400 font-bold">
                  No hay partidos programados.
                </span>
              </div>
            ) : (
              upcoming.map((match, idx) => {
                const isLocal =
                  match.homeTeam?.name?.toLowerCase().includes("nataci") ||
                  match.homeTeam?.name?.toLowerCase().includes("gimnasia");
                const locationText = isLocal ? "Local" : "Visitante";

                return (
                  <div
                    key={match._id}
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
                        {dayjs(match.date).format("MMM")}
                      </span>
                      <span className="text-4xl font-black text-nyg-blue leading-none my-1">
                        {dayjs(match.date).format("DD")}
                      </span>
                      <span className="text-xs font-bold text-gray-500">
                        {dayjs(match.date).format("HH:mm")} hs
                      </span>
                    </div>

                    {/* Bloque de Escudos (Sustituyendo Nombres) */}
                    <div className="flex-1 flex flex-row items-center justify-center gap-8 md:gap-12 w-full px-4 mb-6 md:mb-0">
                      <div className="flex-1 flex justify-end">
                        <img
                          src={getShield(
                            match.homeTeam?.name,
                            match.homeTeam?.shieldUrl || match.homeTeam?.logo,
                          )}
                          alt={match.homeTeam?.name}
                          title={match.homeTeam?.name}
                          className="w-20 h-20 md:w-24 md:h-24 object-contain drop-shadow-md hover:scale-110 transition-transform"
                        />
                      </div>

                      <div className="bg-gray-100 text-gray-400 font-black px-4 py-1.5 rounded-full text-sm shrink-0">
                        VS
                      </div>

                      <div className="flex-1 flex justify-start">
                        <img
                          src={getShield(
                            match.awayTeam?.name,
                            match.awayTeam?.shieldUrl || match.awayTeam?.logo,
                          )}
                          alt={match.awayTeam?.name}
                          title={match.awayTeam?.name}
                          className="w-20 h-20 md:w-24 md:h-24 object-contain drop-shadow-md hover:scale-110 transition-transform"
                        />
                      </div>
                    </div>

                    {/* Bloque de Información / Ubicación */}
                    <div className="w-full md:w-48 flex flex-col items-center md:items-end text-sm text-gray-500 gap-2 border-t md:border-t-0 md:border-l border-gray-200 pt-6 md:pt-0 md:pl-6 text-center md:text-right shrink-0">
                      <span className="font-bold text-nyg-blue bg-nyg-blue/10 px-3 py-1 rounded-full text-xs">
                        {match.tournament?.name}
                      </span>
                      <span className="flex items-center gap-1.5 mt-1 font-black text-nyg-gold uppercase tracking-widest text-xs">
                        <MapPin size={16} /> {locationText}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
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
            {isLoading ? (
              <div className="flex justify-center items-center h-48">
                <Loader2 className="w-8 h-8 animate-spin text-nyg-blue" />
              </div>
            ) : results.length === 0 ? (
              <div className="flex justify-center items-center h-48">
                <span className="text-gray-400 font-bold">
                  No hay resultados recientes.
                </span>
              </div>
            ) : (
              results.map((match, idx) => {
                const isHomeUs =
                  match.homeTeam?.name?.toLowerCase().includes("nataci") ||
                  match.homeTeam?.name?.toLowerCase().includes("gimnasia");
                const isAwayUs =
                  match.awayTeam?.name?.toLowerCase().includes("nataci") ||
                  match.awayTeam?.name?.toLowerCase().includes("gimnasia");
                const won =
                  (isHomeUs && match.homeScore > match.awayScore) ||
                  (isAwayUs && match.awayScore > match.homeScore);

                return (
                  <div
                    key={match._id}
                    className={`flex flex-col md:flex-row items-center border-b border-gray-100 last:border-b-0 p-6 md:p-8 hover:bg-gray-50 transition-colors relative md:border-l-8 ${idx === 0 ? "md:border-l-nyg-red" : idx === 1 ? "md:border-l-gray-300" : "md:border-l-nyg-blue"}`}
                  >
                    {/* Cinta indicadora en móviles */}
                    <div
                      className={`absolute top-0 left-0 w-full h-2 md:hidden ${idx === 0 ? "bg-nyg-red" : idx === 1 ? "bg-gray-300" : "bg-nyg-blue"}`}
                    ></div>

                    {/* Bloque de Fecha */}
                    <div className="flex flex-col items-center justify-center w-full md:w-32 shrink-0 mb-6 md:mb-0 mt-2 md:mt-0">
                      <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                        {dayjs(match.date).format("MMM")}
                      </span>
                      <span className="text-3xl font-black text-gray-600">
                        {dayjs(match.date).format("DD")}
                      </span>
                    </div>

                    {/* Bloque de Escudos y Puntuación */}
                    <div className="flex-1 flex flex-row items-center justify-center gap-3 sm:gap-6 md:gap-10 w-full px-2 sm:px-4 mb-6 md:mb-0">
                      <div className="flex-1 flex justify-end">
                        <img
                          src={getShield(
                            match.homeTeam?.name,
                            match.homeTeam?.shieldUrl || match.homeTeam?.logo,
                          )}
                          alt={match.homeTeam?.name}
                          title={match.homeTeam?.name}
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
                          src={getShield(
                            match.awayTeam?.name,
                            match.awayTeam?.shieldUrl || match.awayTeam?.logo,
                          )}
                          alt={match.awayTeam?.name}
                          title={match.awayTeam?.name}
                          className={`w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain drop-shadow-md hover:scale-110 transition-transform shrink-0 ${match.awayScore < match.homeScore ? "opacity-60 grayscale-50" : ""}`}
                        />
                      </div>
                    </div>

                    {/* Bloque de Información / Estado */}
                    <div className="w-full md:w-48 flex flex-col items-center md:items-end text-sm gap-2 border-t md:border-t-0 md:border-l border-gray-200 pt-6 md:pt-0 md:pl-6 text-center md:text-right shrink-0">
                      <span className="font-bold text-gray-700 text-center md:text-right text-xs">
                        {match.tournament?.name}
                      </span>
                      <span
                        className={`mt-1 font-black uppercase tracking-wider px-4 py-1.5 rounded-md ${won ? "bg-nyg-gold/10 text-nyg-gold" : "bg-nyg-red/10 text-nyg-red"}`}
                      >
                        {won ? "Victoria" : "Derrota"}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Fixture;
