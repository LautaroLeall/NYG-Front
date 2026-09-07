import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Save, Loader2, AlertTriangle, Users } from "lucide-react";
import axios from "../../../api/axiosConfig";
import toast from "react-hot-toast";

const MatchStatsForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [match, setMatch] = useState(null);
  const [players, setPlayers] = useState([]);
  const [stats, setStats] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Primera");

  // Para permitir cambiar de equipo local a visitante (sus categorías)
  const [homeCategory, setHomeCategory] = useState("Primera");
  const [awayCategory, setAwayCategory] = useState("Primera");

  useEffect(() => {
    fetchData();
  }, [id]);

  useEffect(() => {
    if (match) {
      fetchPlayersAndStats(selectedCategory);
    }
  }, [selectedCategory]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      // 1. Fetch match to know category
      const matchRes = await axios.get(`/api/matches/${id}`);
      const matchData = matchRes.data.data;
      setMatch(matchData);

      const homeCat = matchData.homeTeam?.category || "Primera";
      const awayCat = matchData.awayTeam?.category || "Primera";

      setHomeCategory(homeCat);
      setAwayCategory(awayCat);
      setSelectedCategory(homeCat);

      await fetchPlayersAndStats(homeCat, matchData);
    } catch (error) {
      console.error(error);
      toast.error("Error al cargar datos del partido");
      setIsLoading(false);
    }
  };

  const fetchPlayersAndStats = async (category, matchDataOverride = null) => {
    try {
      setIsLoading(true);
      const currentMatch = matchDataOverride || match;

      // 2. Fetch existing stats for the match
      const statsRes = await axios.get(`/api/matches/${id}/stats`);
      const existingStats = statsRes.data.data;

      // 3. Fetch players for this category
      const playersRes = await axios.get(
        `/api/players?category=${category}&isActive=true`,
      );
      const activePlayers = playersRes.data.data;

      setPlayers(activePlayers);

      // Build initial state for the form
      const initialStats = {};
      activePlayers.forEach((p) => {
        const found = existingStats.find(
          (s) => s.player?._id === p._id || s.player === p._id,
        );
        if (found) {
          initialStats[p._id] = {
            isStarter: found.isStarter || false,
            minutesPlayed: found.minutesPlayed || 0,
            tries: found.tries || 0,
            conversions: found.conversions || 0,
            penalties: found.penalties || 0,
            drops: found.drops || 0,
            yellowCards: found.yellowCards || 0,
            redCards: found.redCards || 0,
          };
        } else {
          initialStats[p._id] = {
            isStarter: false,
            minutesPlayed: 0,
            tries: 0,
            conversions: 0,
            penalties: 0,
            drops: 0,
            yellowCards: 0,
            redCards: 0,
          };
        }
      });
      setStats(initialStats);
    } catch (error) {
      console.error(error);
      toast.error("Error al cargar jugadores y estadísticas");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (playerId, field, value) => {
    let parsedValue = value;
    if (field !== "isStarter") {
      parsedValue = parseInt(value) || 0;
      if (parsedValue < 0) parsedValue = 0;
    }

    setStats((prev) => ({
      ...prev,
      [playerId]: {
        ...prev[playerId],
        [field]: parsedValue,
      },
    }));
  };

  const calculatePoints = (playerStats) => {
    if (!playerStats) return 0;
    return (
      playerStats.tries * 5 +
      playerStats.conversions * 2 +
      playerStats.penalties * 3 +
      playerStats.drops * 3
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert stats object to array, but only for those who played (minutes > 0 or has stats)
    const statsArray = Object.keys(stats)
      .map((playerId) => ({
        player: playerId,
        ...stats[playerId],
      }))
      .filter(
        (s) =>
          s.isStarter ||
          s.minutesPlayed > 0 ||
          s.tries > 0 ||
          s.conversions > 0 ||
          s.penalties > 0 ||
          s.drops > 0 ||
          s.yellowCards > 0 ||
          s.redCards > 0,
      );

    if (statsArray.length === 0) {
      if (
        !window.confirm(
          "No has ingresado estadísticas. ¿Deseas guardar la planilla vacía (borrará stats previas)?",
        )
      ) {
        return;
      }
    }

    try {
      setIsSaving(true);
      await axios.post(`/api/matches/${id}/stats`, { stats: statsArray });
      toast.success("Estadísticas guardadas con éxito");
      navigate("/admin/partidos");
    } catch (error) {
      toast.error(
        error.response?.data?.error || "Error al guardar estadísticas",
      );
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading && !match) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-gray-400">
        <Loader2 className="w-10 h-10 animate-spin mb-4 text-nyg-blue" />
        <p className="text-sm font-bold tracking-widest uppercase">
          Cargando partido...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in max-w-7xl mx-auto">
      {/* Encabezado */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Link
            to="/admin/partidos"
            className="inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-nyg-blue mb-2 transition-colors uppercase tracking-widest"
          >
            <ArrowLeft size={16} /> Volver a Partidos
          </Link>
          <h1 className="text-2xl font-black text-nyg-blue uppercase tracking-widest flex items-center gap-3">
            Planilla de Estadísticas
          </h1>
          <p className="text-sm font-bold text-gray-400 tracking-wider">
            {match?.homeTeam?.name} vs {match?.awayTeam?.name}
          </p>
        </div>
        <button
          onClick={handleSubmit}
          disabled={isSaving || isLoading}
          className="flex items-center justify-center gap-2 px-8 py-3 bg-nyg-blue hover:bg-blue-800 text-white rounded-full font-black uppercase tracking-widest text-sm shadow-md hover:shadow-xl transition-all disabled:opacity-50"
        >
          {isSaving ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Save size={18} />
          )}
          Guardar Planilla
        </button>
      </div>

      <div className="bg-white border border-gray-100 shadow-sm rounded-3xl p-6">
        {/* Filtro de Equipo */}
        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
          <div className="flex items-center gap-2 text-gray-500 font-bold uppercase tracking-wider text-sm">
            <Users size={18} />
            <span>Mostrar jugadores de:</span>
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-full font-bold text-nyg-blue text-sm focus:outline-none focus:border-nyg-blue"
          >
            <option value={homeCategory}>
              {match?.homeTeam?.name} ({homeCategory})
            </option>
            {homeCategory !== awayCategory && (
              <option value={awayCategory}>
                {match?.awayTeam?.name} ({awayCategory})
              </option>
            )}
          </select>
        </div>

        {isLoading && match ? (
          <div className="flex justify-center py-10">
            <Loader2 className="w-8 h-8 animate-spin text-nyg-blue" />
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-gray-100">
            <table className="w-full text-left border-collapse min-w-200">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-[10px] sm:text-xs font-black text-gray-500 uppercase tracking-widest">
                  <th className="p-3 text-center w-12">Titular</th>
                  <th className="p-3 min-w-45">Jugador</th>
                  <th className="p-3 text-center w-20">Minutos</th>
                  <th className="p-3 text-center w-16">Tries</th>
                  <th className="p-3 text-center w-16">Conv.</th>
                  <th className="p-3 text-center w-16">Pen.</th>
                  <th className="p-3 text-center w-16">Drops</th>
                  <th
                    className="p-3 text-center w-16"
                    title="Tarjetas Amarillas"
                  >
                    <img
                      src="/tarjetas/tarjeta-amarrilla.jpg"
                      alt="Amarilla"
                      className="h-7 w-auto object-contain mx-auto rounded-sm shadow-sm"
                    />
                  </th>
                  <th className="p-3 text-center w-16" title="Tarjetas Rojas">
                    <img
                      src="/tarjetas/tarjeta-roja.jpg"
                      alt="Roja"
                      className="h-7 w-auto object-contain mx-auto rounded-sm shadow-sm"
                    />
                  </th>
                  <th className="p-3 text-center w-16 text-nyg-blue">Pts</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {players.map((player) => {
                  const playerStats = stats[player._id];
                  if (!playerStats) return null;

                  const points = calculatePoints(playerStats);
                  const hasCardsWarning =
                    playerStats.yellowCards >= 2 || playerStats.redCards >= 1;

                  return (
                    <tr
                      key={player._id}
                      className={`hover:bg-gray-50 transition-colors ${hasCardsWarning ? "bg-red-50" : ""}`}
                    >
                      <td className="p-3 text-center">
                        <input
                          type="checkbox"
                          checked={playerStats.isStarter}
                          onChange={(e) =>
                            handleInputChange(
                              player._id,
                              "isStarter",
                              e.target.checked,
                            )
                          }
                          className="w-5 h-5 rounded border-gray-300 text-nyg-blue focus:ring-nyg-blue cursor-pointer"
                        />
                      </td>
                      <td className="p-3">
                        <div className="flex flex-col">
                          <span className="font-bold text-gray-800 text-sm truncate max-w-45">
                            {player.name}
                          </span>
                          <span className="text-xs text-gray-400 font-medium truncate">
                            {player.position}
                          </span>
                        </div>
                      </td>
                      <td className="p-3 text-center">
                        <input
                          type="number"
                          min="0"
                          max="120"
                          value={playerStats.minutesPlayed || ""}
                          onChange={(e) =>
                            handleInputChange(
                              player._id,
                              "minutesPlayed",
                              e.target.value,
                            )
                          }
                          className="w-14 px-1 py-1.5 text-center bg-white border border-gray-200 rounded-md text-sm font-bold focus:border-nyg-blue focus:ring-1 focus:ring-nyg-blue outline-none"
                        />
                      </td>
                      <td className="p-3 text-center">
                        <input
                          type="number"
                          min="0"
                          value={playerStats.tries || ""}
                          onChange={(e) =>
                            handleInputChange(
                              player._id,
                              "tries",
                              e.target.value,
                            )
                          }
                          className="w-12 px-1 py-1.5 text-center bg-white border border-gray-200 rounded-md text-sm font-bold focus:border-nyg-blue focus:ring-1 focus:ring-nyg-blue outline-none"
                        />
                      </td>
                      <td className="p-3 text-center">
                        <input
                          type="number"
                          min="0"
                          value={playerStats.conversions || ""}
                          onChange={(e) =>
                            handleInputChange(
                              player._id,
                              "conversions",
                              e.target.value,
                            )
                          }
                          className="w-12 px-1 py-1.5 text-center bg-white border border-gray-200 rounded-md text-sm font-bold focus:border-nyg-blue focus:ring-1 focus:ring-nyg-blue outline-none"
                        />
                      </td>
                      <td className="p-3 text-center">
                        <input
                          type="number"
                          min="0"
                          value={playerStats.penalties || ""}
                          onChange={(e) =>
                            handleInputChange(
                              player._id,
                              "penalties",
                              e.target.value,
                            )
                          }
                          className="w-12 px-1 py-1.5 text-center bg-white border border-gray-200 rounded-md text-sm font-bold focus:border-nyg-blue focus:ring-1 focus:ring-nyg-blue outline-none"
                        />
                      </td>
                      <td className="p-3 text-center">
                        <input
                          type="number"
                          min="0"
                          value={playerStats.drops || ""}
                          onChange={(e) =>
                            handleInputChange(
                              player._id,
                              "drops",
                              e.target.value,
                            )
                          }
                          className="w-12 px-1 py-1.5 text-center bg-white border border-gray-200 rounded-md text-sm font-bold focus:border-nyg-blue focus:ring-1 focus:ring-nyg-blue outline-none"
                        />
                      </td>
                      <td className="p-3 text-center relative">
                        <input
                          type="number"
                          min="0"
                          max="2"
                          value={playerStats.yellowCards || ""}
                          onChange={(e) =>
                            handleInputChange(
                              player._id,
                              "yellowCards",
                              e.target.value,
                            )
                          }
                          className={`w-12 px-1 py-1.5 text-center bg-white border rounded-md text-sm font-bold focus:ring-1 outline-none ${playerStats.yellowCards >= 2 ? "border-red-500 focus:border-red-500 focus:ring-red-500 text-red-600" : "border-gray-200 focus:border-nyg-blue focus:ring-nyg-blue"}`}
                        />
                        {playerStats.yellowCards >= 2 && (
                          <AlertTriangle
                            size={14}
                            className="absolute top-2 right-2 text-red-500 pointer-events-none"
                          />
                        )}
                      </td>
                      <td className="p-3 text-center relative">
                        <input
                          type="number"
                          min="0"
                          max="1"
                          value={playerStats.redCards || ""}
                          onChange={(e) =>
                            handleInputChange(
                              player._id,
                              "redCards",
                              e.target.value,
                            )
                          }
                          className={`w-12 px-1 py-1.5 text-center bg-white border rounded-md text-sm font-bold focus:ring-1 outline-none ${playerStats.redCards >= 1 ? "border-red-500 focus:border-red-500 focus:ring-red-500 text-red-600" : "border-gray-200 focus:border-nyg-blue focus:ring-nyg-blue"}`}
                        />
                        {playerStats.redCards >= 1 && (
                          <AlertTriangle
                            size={14}
                            className="absolute top-2 right-2 text-red-500 pointer-events-none"
                          />
                        )}
                      </td>
                      <td className="p-3 text-center">
                        <span className="text-base font-black text-nyg-blue">
                          {points}
                        </span>
                      </td>
                    </tr>
                  );
                })}
                {players.length === 0 && (
                  <tr>
                    <td
                      colSpan="10"
                      className="p-8 text-center text-gray-400 font-bold tracking-widest uppercase text-sm"
                    >
                      No hay jugadores activos en la categoría{" "}
                      {selectedCategory}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchStatsForm;
