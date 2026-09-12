import { Trophy, ChevronRight, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../../api/axiosConfig";

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

const StandingsPreview = () => {
  const [standings, setStandings] = useState([]);
  const [tournamentName, setTournamentName] = useState("Torneo Actual");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStandings = async () => {
      try {
        setIsLoading(true);
        // Primero obtener el torneo destacado (isFeatured=true)
        const tourRes = await axios.get("/api/tournaments?isFeatured=true");
        const tournaments = tourRes.data; // El controlador devuelve directamente el array

        if (tournaments && tournaments.length > 0) {
          const activeTournament = tournaments[0];
          setTournamentName(activeTournament.name);

          // Obtener las posiciones para ese torneo
          const standRes = await axios.get(
            `/api/standings/${activeTournament._id}`,
          );
          if (standRes.data && standRes.data.data) {
            setStandings(standRes.data.data.slice(0, 5)); // Mostrar solo el Top 5
          }
        } else {
          // Fallback por si no hay ninguno marcado como destacado
          setTournamentName("Torneo Actual (No seleccionado)");
        }
      } catch (error) {
        console.error("Error fetching standings preview", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStandings();
  }, []);

  return (
    <section className="py-16 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Columna Izquierda: Título y Contexto */}
          <div className="md:w-1/3 flex flex-col justify-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-nyg-blue mb-4">
              Posiciones
            </h2>
            <p className="text-gray-600 mb-8 text-lg">
              Así está la tabla del{" "}
              <span className="font-bold text-nyg-red">{tournamentName}</span>.
              Acompañá al plantel en cada fecha para seguir sumando.
            </p>
            <Link
              to="/rugby/posiciones"
              className="inline-flex items-center justify-center gap-2 bg-nyg-blue hover:bg-blue-900 text-white font-bold uppercase tracking-widest px-8 py-4 rounded-xl transition-all shadow-lg hover:shadow-xl w-max"
            >
              Ver Tabla Completa <ChevronRight size={20} />
            </Link>
          </div>

          {/* Columna Derecha: Tabla */}
          <div className="md:w-2/3">
            <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-125">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100 text-gray-400 text-xs uppercase tracking-widest">
                      <th className="p-4 md:p-6 font-bold w-16 text-center">
                        Pos
                      </th>
                      <th className="p-4 md:p-6 font-bold">Equipo</th>
                      <th className="p-4 md:p-6 font-bold text-center w-20">
                        PJ
                      </th>
                      <th className="p-4 md:p-6 font-bold text-center w-20 text-nyg-blue">
                        PTS
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {isLoading ? (
                      <tr>
                        <td colSpan="4" className="py-16 text-center">
                          <Loader2 className="w-10 h-10 text-nyg-blue animate-spin mx-auto" />
                        </td>
                      </tr>
                    ) : standings.length === 0 ? (
                      <tr>
                        <td
                          colSpan="4"
                          className="py-16 text-center text-gray-500 font-medium"
                        >
                          Aún no hay posiciones para este torneo.
                        </td>
                      </tr>
                    ) : (
                      standings.map((team, index) => {
                        const isNYG =
                          team.teamName.includes("Natación") ||
                          team.teamName.includes("Gimnasia");

                        return (
                          <tr
                            key={team.teamId}
                            className={`transition-colors hover:bg-gray-50 ${isNYG ? "bg-nyg-blue/5" : ""}`}
                          >
                            <td className="p-4 md:p-6">
                              <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center font-black mx-auto ${
                                  index === 0
                                    ? "bg-nyg-gold text-white"
                                    : index < 4
                                      ? "bg-gray-800 text-white"
                                      : "bg-gray-100 text-gray-500"
                                }`}
                              >
                                {team.pos}
                              </div>
                            </td>
                            <td className="p-4 md:p-6">
                              <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-white rounded-full border border-gray-100 flex items-center justify-center shadow-sm overflow-hidden shrink-0">
                                  <img
                                    src={getShield(
                                      team.teamName,
                                      team.shieldUrl,
                                    )}
                                    alt={team.teamName}
                                    className="w-6 h-6 object-contain"
                                  />
                                </div>
                                <span
                                  className={`font-bold text-lg md:text-xl truncate ${isNYG ? "text-nyg-red" : "text-gray-800"}`}
                                >
                                  {team.teamName}
                                </span>
                              </div>
                            </td>
                            <td className="p-4 md:p-6 text-center font-semibold text-gray-500 text-lg">
                              {team.played}
                            </td>
                            <td className="p-4 md:p-6 text-center font-black text-xl md:text-2xl text-nyg-blue">
                              {team.pts}
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StandingsPreview;
