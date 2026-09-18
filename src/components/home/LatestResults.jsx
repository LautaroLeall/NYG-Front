import { Calendar, MapPin, ChevronRight, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../../api/axiosConfig";
import dayjs from "dayjs";
import "dayjs/locale/es";
dayjs.locale("es");

// DICCIONARIO DE ESCUDOS
const getShield = (teamName, shieldUrl) => {
  if (shieldUrl) return shieldUrl;
  if (!teamName)
    return "https://ui-avatars.com/api/?name=NA&background=F3F4F6&color=9CA3AF&size=150";

  const name = teamName.toLowerCase();
  if (name.includes("nataci") || name.includes("gimnasia"))
    return "/escudos/nyg.png";
  if (name.includes("tucumán rugby") || name.includes("tucuman rugby"))
    return "/escudos/tucumanrugby.png";
  if (name.includes("universitario")) return "/escudos/universitario.png";
  if (name.includes("huirapuca")) return "/escudos/huirapuca.png";
  if (name.includes("tarcos")) return "/escudos/lostarcos.png";
  if (name.includes("lawn tennis")) return "/escudos/lawntennis.png";
  if (name.includes("jockey")) return "/escudos/jockeyclub.png";
  if (name.includes("cardenales")) return "/escudos/cardenales.png";
  if (name.includes("corsarios")) return "/escudos/corsarios.png";
  if (name.includes("linses") || name.includes("lince"))
    return "/escudos/lince.png";

  return `https://ui-avatars.com/api/?name=${encodeURIComponent(
    teamName,
  )}&background=F3F4F6&color=9CA3AF&size=150`;
};

const ResultCard = ({ match }) => {
  const isHomeNYG =
    match.homeTeam?.name?.includes("Natación") || match.homeTeam?.isNyg;
  const isAwayNYG =
    match.awayTeam?.name?.includes("Natación") || match.awayTeam?.isNyg;

  const localClass = isHomeNYG ? "font-bold text-nyg-blue" : "text-gray-600";
  const awayClass = isAwayNYG ? "font-bold text-nyg-blue" : "text-gray-600";

  const locationText = match.isHomeMatch
    ? "Sede Natación y Gimnasia"
    : `Visitante - ${match.homeTeam?.name}`;

  return (
    <div className="bg-white rounded-xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-100 hover:shadow-[0_4px_25px_rgba(0,0,0,0.1)] transition-shadow">
      {/* Header de la tarjeta */}
      <div className="flex justify-between items-center text-xs text-gray-500 mb-4 pb-3 border-b border-gray-100">
        <span className="font-semibold text-nyg-red uppercase tracking-wider truncate mr-2">
          {match.tournament?.name || "Torneo"}
        </span>
        <div className="flex items-center gap-1 shrink-0">
          <Calendar size={14} />
          <span>{dayjs(match.date).format("DD MMM YYYY")}</span>
        </div>
      </div>

      {/* Resultados */}
      <div className="flex flex-col gap-4 my-6">
        <div className="flex justify-between items-center gap-4">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <img
              src={getShield(
                match.homeTeam?.name,
                match.homeTeam?.shieldUrl || match.homeTeam?.logo,
              )}
              alt={match.homeTeam?.name}
              className="w-8 h-8 object-contain drop-shadow-sm shrink-0"
            />
            <span className={`text-lg truncate ${localClass}`}>
              {match.homeTeam?.name || "Local"}
            </span>
          </div>
          <span
            className={`text-2xl font-black shrink-0 ${match.homeScore > match.awayScore ? "text-nyg-blue" : "text-gray-400"}`}
          >
            {match.homeScore !== null ? match.homeScore : "-"}
          </span>
        </div>
        <div className="flex justify-between items-center gap-4">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <img
              src={getShield(
                match.awayTeam?.name,
                match.awayTeam?.shieldUrl || match.awayTeam?.logo,
              )}
              alt={match.awayTeam?.name}
              className="w-8 h-8 object-contain drop-shadow-sm shrink-0"
            />
            <span className={`text-lg truncate ${awayClass}`}>
              {match.awayTeam?.name || "Visitante"}
            </span>
          </div>
          <span
            className={`text-2xl font-black shrink-0 ${match.awayScore > match.homeScore ? "text-nyg-blue" : "text-gray-400"}`}
          >
            {match.awayScore !== null ? match.awayScore : "-"}
          </span>
        </div>
      </div>

      {/* Footer de la tarjeta */}
      <div className="flex justify-between items-center text-sm text-gray-500 pt-3 border-t border-gray-100">
        <div className="flex items-center gap-1 truncate max-w-[70%]">
          <MapPin size={16} className="shrink-0" />
          <span className="truncate">{locationText}</span>
        </div>
        <Link
          to={`/rugby/partido/${match._id}`}
          className="text-nyg-red hover:text-red-700 font-semibold flex items-center gap-1 shrink-0"
        >
          Detalles <ChevronRight size={16} />
        </Link>
      </div>
    </div>
  );
};

const LatestResults = () => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get("/api/matches/latest-results");
        setResults(res.data.data ? res.data.data.slice(0, 3) : []);
      } catch (error) {
        console.error("Error fetching latest results", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchResults();
  }, []);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-nyg-blue mb-2">
              Últimos Resultados
            </h2>
            <p className="text-gray-600">El desempeño del plantel superior.</p>
          </div>
          <Link
            to="/partidos"
            className="hidden md:flex items-center gap-2 text-nyg-red font-semibold hover:text-red-700 transition-colors"
          >
            Ver fixture completo <ChevronRight size={20} />
          </Link>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 text-nyg-blue animate-spin" />
          </div>
        ) : results.length === 0 ? (
          <div className="text-center py-12 text-gray-500 bg-white rounded-xl shadow-sm border border-gray-100">
            No hay resultados recientes para mostrar.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {results.map((match) => (
              <ResultCard key={match._id} match={match} />
            ))}
          </div>
        )}

        <div className="mt-8 text-center md:hidden">
          <Link
            to="/rugby/fixture"
            className="inline-flex items-center gap-2 text-nyg-red font-semibold hover:text-red-700"
          >
            Ver fixture completo <ChevronRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LatestResults;
