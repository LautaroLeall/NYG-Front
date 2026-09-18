import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  Save,
  Plus,
  Trash2,
  Loader2,
  Users,
  Clock,
} from "lucide-react";
import axios from "../../../api/axiosConfig";
import toast from "react-hot-toast";

const MatchUnifiedForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [match, setMatch] = useState(null);
  const [players, setPlayers] = useState([]);
  const [roster, setRoster] = useState({}); // { playerId: { isSelected: true, isStarter: true } }
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const matchRes = await axios.get(`/api/matches/${id}`);
      const m = matchRes.data.data;
      setMatch(m);

      if (m.events) setEvents(m.events);

      // Fetch NYG players
      const nygCat = m.isHomeMatch
        ? m.homeTeam?.category
        : m.awayTeam?.category;
      const catQuery = nygCat ? `?category=${nygCat}` : "";
      const playersRes = await axios.get(`/api/players${catQuery}`);
      const fetchedPlayers = playersRes.data.data || [];
      setPlayers(fetchedPlayers);

      const initialRoster = {};
      fetchedPlayers.forEach((p) => {
        initialRoster[p._id] = {
          isSelected: false,
          isStarter: false,
          shirtNumber: "",
        };
      });
      if (m.roster && m.roster.length > 0) {
        m.roster.forEach((r) => {
          if (initialRoster[r.player?._id || r.player]) {
            initialRoster[r.player?._id || r.player] = {
              isSelected: true,
              isStarter: r.isStarter,
              shirtNumber: r.shirtNumber || "",
            };
          }
        });
      }
      setRoster(initialRoster);
    } catch (error) {
      console.error(error);
      toast.error("Error al cargar datos del partido");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRosterChange = (playerId, field, value) => {
    setRoster((prev) => {
      const updated = { ...prev };
      updated[playerId] = { ...updated[playerId], [field]: value };
      if (field === "isStarter" && value === true) {
        updated[playerId].isSelected = true; // Starter implies selected
      }
      if (field === "isSelected" && value === false) {
        updated[playerId].isStarter = false; // Deselect implies not starter
      }
      return updated;
    });
  };

  const handleAddEvent = () => {
    setEvents([
      ...events,
      {
        team: "NYG",
        type: "Try",
        minute: 1,
        player: "",
        playerOut: "",
      },
    ]);
  };

  const handleRemoveEvent = (index) => {
    const newEvents = [...events];
    newEvents.splice(index, 1);
    setEvents(newEvents);
  };

  const handleEventChange = (index, field, value) => {
    const newEvents = [...events];
    if (field === "team" && value === "RIVAL") {
      newEvents[index].player = null;
      newEvents[index].playerOut = null;
    }
    if (field === "type" && value !== "Cambio") {
      newEvents[index].playerOut = null;
    }
    newEvents[index][field] = value;
    setEvents(newEvents);
  };

  const handleSubmit = async () => {
    try {
      setIsSaving(true);
      // Validations Básicas de Eventos
      for (const e of events) {
        if (
          e.minute === "" ||
          e.minute === null ||
          e.minute < 0 ||
          e.minute > 120
        ) {
          setIsSaving(false);
          return toast.error("El minuto de un evento debe estar entre 0 y 120");
        }
        if (!e.team) {
          setIsSaving(false);
          return toast.error(
            "Debe asignar a qué equipo pertenece cada evento.",
          );
        }
        if (!e.type) {
          setIsSaving(false);
          return toast.error(
            "Hay eventos sin un tipo definido (ej: Try, Penal, etc).",
          );
        }
        if (e.type === "Cambio" && e.player === e.playerOut) {
          setIsSaving(false);
          return toast.error(
            `En el minuto ${e.minute}, el jugador que entra y sale no puede ser el mismo.`,
          );
        }
      }

      // Validación Extrema: Cálculo de Resultado exacto
      if (match.status === "Finalizado") {
        let calcHomeScore = 0;
        let calcAwayScore = 0;

        for (const e of events) {
          let points = 0;
          if (e.type === "Try") points = 5;
          if (e.type === "Conversión") points = 2;
          if (e.type === "Penal" || e.type === "Drop") points = 3;
          if (e.type === "Try Penal") points = 7;

          if (match.isHomeMatch) {
            if (e.team === "NYG") calcHomeScore += points;
            else if (e.team === "RIVAL") calcAwayScore += points;
          } else {
            if (e.team === "NYG") calcAwayScore += points;
            else if (e.team === "RIVAL") calcHomeScore += points;
          }
        }

        // Si el usuario cargó 0-0 y no hay eventos, lo dejamos pasar.
        // Pero si los eventos no coinciden con el tanteador oficial configurado:
        if (
          (calcHomeScore > 0 || match.homeScore > 0) &&
          (calcHomeScore !== match.homeScore ||
            calcAwayScore !== match.awayScore)
        ) {
          setIsSaving(false);
          return toast.error(
            `¡Discrepancia detectada!\n\nEl resultado configurado del partido es ${match.homeScore} - ${match.awayScore}.\nSin embargo, los eventos en la línea de tiempo suman ${calcHomeScore} - ${calcAwayScore}.\n\nPor favor, corrige los eventos de puntos (Tries, Penales, etc.) para que el cálculo sea exacto.`,
            { duration: 6000 },
          );
        }
      }

      // Validate unique shirt numbers
      const selectedNumbers = new Set();
      for (const pId of Object.keys(roster)) {
        if (roster[pId].isSelected && roster[pId].shirtNumber) {
          const num = Number(roster[pId].shirtNumber);
          if (selectedNumbers.has(num)) {
            setIsSaving(false);
            return toast.error(
              `El número de camiseta ${num} está repetido. Cada jugador convocado debe tener un número único.`,
            );
          }
          selectedNumbers.add(num);
        }
      }

      // Format Roster
      const finalRoster = [];
      Object.keys(roster).forEach((pId) => {
        if (roster[pId].isSelected) {
          finalRoster.push({
            player: pId,
            isStarter: roster[pId].isStarter,
            shirtNumber: roster[pId].shirtNumber
              ? Number(roster[pId].shirtNumber)
              : undefined,
          });
        }
      });

      // Format Events
      const formattedEvents = events.map((e) => {
        const ev = { ...e };
        if (!ev.player || ev.player === "") delete ev.player;
        else if (typeof ev.player === "object") ev.player = ev.player._id;

        if (!ev.playerOut || ev.playerOut === "") delete ev.playerOut;
        else if (typeof ev.playerOut === "object")
          ev.playerOut = ev.playerOut._id;
        return ev;
      });

      await axios.post(`/api/matches/${id}/unified-stats`, {
        roster: finalRoster,
        events: formattedEvents,
      });

      toast.success(
        "Ficha Técnica guardada. Estadísticas calculadas automáticamente.",
      );
      navigate("/admin/partidos");
    } catch (error) {
      console.error(error);
      toast.error("Error al guardar la Ficha Técnica");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-gray-400">
        <Loader2 className="w-10 h-10 animate-spin mb-4 text-nyg-blue" />
        <p className="text-sm font-bold tracking-widest uppercase">
          Cargando...
        </p>
      </div>
    );
  }

  // Get selected NYG players for dropdowns
  const selectedPlayers = players.filter((p) => roster[p._id]?.isSelected);

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Link
            to="/admin/partidos"
            className="inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-nyg-blue mb-2 transition-colors uppercase tracking-widest"
          >
            <ArrowLeft size={16} /> Volver a Partidos
          </Link>
          <h1 className="text-2xl font-black text-nyg-blue uppercase tracking-widest flex items-center gap-3">
            Ficha Técnica Unificada
          </h1>
          <p className="text-sm font-bold text-gray-400 tracking-wider">
            {match?.homeTeam?.name} vs {match?.awayTeam?.name}
          </p>
        </div>
        <button
          onClick={handleSubmit}
          disabled={isSaving}
          className="flex items-center justify-center gap-2 px-8 py-3 bg-nyg-blue hover:bg-blue-800 text-white rounded-full font-black uppercase tracking-widest text-sm shadow-md hover:shadow-xl transition-all disabled:opacity-50"
        >
          {isSaving ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Save size={18} />
          )}
          Guardar y Calcular
        </button>
      </div>

      {/* SECCIÓN 1: PLANTEL */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-gray-50 border-b border-gray-100 p-6 flex items-center gap-3">
          <Users className="text-nyg-blue" size={24} />
          <h2 className="text-lg font-black text-gray-800 uppercase tracking-wide">
            1. Plantel del Partido
          </h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {players.map((player) => (
              <div
                key={player._id}
                className={`flex items-center justify-between p-3 rounded-xl border ${roster[player._id]?.isSelected ? "bg-blue-50/50 border-nyg-blue/20" : "bg-gray-50 border-gray-100 hover:border-gray-300"} transition-colors`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-gray-200 shrink-0 overflow-hidden">
                    {player.imageUrl ? (
                      <img
                        src={player.imageUrl}
                        className="w-full h-full object-cover"
                      />
                    ) : null}
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-gray-800 text-sm truncate">
                      {player.name}
                    </p>
                    <p className="text-xs text-gray-500 font-medium">
                      {player.position}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <label className="flex flex-col items-center gap-1 cursor-pointer">
                    <span className="text-[10px] font-black uppercase text-gray-400">
                      Conv
                    </span>
                    <input
                      type="checkbox"
                      checked={roster[player._id]?.isSelected}
                      onChange={(e) =>
                        handleRosterChange(
                          player._id,
                          "isSelected",
                          e.target.checked,
                        )
                      }
                      className="w-4 h-4 text-nyg-blue rounded"
                    />
                  </label>
                  <label className="flex flex-col items-center gap-1 cursor-pointer">
                    <span className="text-[10px] font-black uppercase text-gray-400">
                      Titular
                    </span>
                    <input
                      type="checkbox"
                      checked={roster[player._id]?.isStarter}
                      onChange={(e) =>
                        handleRosterChange(
                          player._id,
                          "isStarter",
                          e.target.checked,
                        )
                      }
                      className="w-4 h-4 text-nyg-gold rounded"
                    />
                  </label>
                  {roster[player._id]?.isSelected && (
                    <div className="flex flex-col items-center gap-1 ml-2 pl-2 border-l border-gray-100">
                      <span className="text-[10px] font-black uppercase text-gray-400">
                        Camiseta
                      </span>
                      <input
                        type="number"
                        min="1"
                        max="99"
                        value={roster[player._id]?.shirtNumber}
                        onChange={(e) =>
                          handleRosterChange(
                            player._id,
                            "shirtNumber",
                            e.target.value,
                          )
                        }
                        className="w-12 p-1 border border-gray-300 rounded-md text-center font-bold text-sm focus:ring-2 focus:ring-nyg-blue focus:outline-none bg-white"
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SECCIÓN 2: LÍNEA DE TIEMPO */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-gray-50 border-b border-gray-100 p-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Clock className="text-nyg-blue" size={24} />
            <h2 className="text-lg font-black text-gray-800 uppercase tracking-wide">
              2. Línea de Tiempo
            </h2>
          </div>
          <button
            onClick={handleAddEvent}
            className="flex items-center gap-2 px-4 py-2 bg-nyg-red/10 text-nyg-red rounded-lg font-bold hover:bg-nyg-red hover:text-white transition-colors text-sm"
          >
            <Plus size={16} /> Agregar Evento
          </button>
        </div>

        <div className="p-6">
          {events.length === 0 ? (
            <div className="text-center py-12 text-gray-400 font-bold border-2 border-dashed border-gray-100 rounded-2xl">
              No hay eventos cargados en este partido.
            </div>
          ) : (
            <div className="space-y-4">
              {events.map((event, idx) => {
                const isCambio =
                  event.type === "Cambio" && event.team === "NYG";
                return (
                  <div
                    key={idx}
                    className="flex flex-col md:flex-row items-center gap-4 bg-gray-50 p-4 rounded-xl border border-gray-200"
                  >
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="font-bold text-gray-400 uppercase text-[10px] w-8">
                        Minuto
                      </span>
                      <input
                        type="number"
                        min="0"
                        max="120"
                        value={event.minute}
                        onChange={(e) =>
                          handleEventChange(
                            idx,
                            "minute",
                            Number(e.target.value),
                          )
                        }
                        className="w-16 p-2 border border-gray-300 rounded-lg text-center font-bold focus:ring-nyg-blue"
                      />
                    </div>

                    <div className="w-full md:w-40 shrink-0">
                      <select
                        value={event.team}
                        onChange={(e) =>
                          handleEventChange(idx, "team", e.target.value)
                        }
                        className="w-full p-2 border border-gray-300 rounded-lg font-bold"
                      >
                        <option value="NYG">Natación (Local)</option>
                        <option value="RIVAL">Equipo Rival</option>
                      </select>
                    </div>

                    <div className="w-full md:w-40 shrink-0">
                      <select
                        value={event.type}
                        onChange={(e) =>
                          handleEventChange(idx, "type", e.target.value)
                        }
                        className="w-full p-2 border border-gray-300 rounded-lg font-bold"
                      >
                        <option value="Try">Try</option>
                        <option value="Conversión">Conversión</option>
                        <option value="Penal">Penal</option>
                        <option value="Drop">Drop</option>
                        <option value="Try Penal">Try Penal</option>
                        <option value="Tarjeta Amarilla">
                          Tarjeta Amarilla
                        </option>
                        <option value="Tarjeta Roja">Tarjeta Roja</option>
                        <option value="Cambio">Cambio</option>
                      </select>
                    </div>

                    <div className="w-full flex-1 flex flex-col sm:flex-row gap-2">
                      {event.team === "NYG" ? (
                        <>
                          <div className="flex-1 relative">
                            {isCambio && (
                              <span className="absolute -top-2 left-2 bg-gray-50 text-[10px] font-black text-gray-500 px-1">
                                ENTRA
                              </span>
                            )}
                            <select
                              value={
                                typeof event.player === "object"
                                  ? event.player?._id
                                  : event.player || ""
                              }
                              onChange={(e) =>
                                handleEventChange(idx, "player", e.target.value)
                              }
                              className="w-full p-2 border border-gray-300 rounded-lg font-medium"
                            >
                              <option value="">Seleccionar Jugador...</option>
                              {selectedPlayers.map((p) => (
                                <option key={p._id} value={p._id}>
                                  {p.name}
                                </option>
                              ))}
                            </select>
                          </div>
                          {isCambio && (
                            <div className="flex-1 relative">
                              <span className="absolute -top-2 left-2 bg-gray-50 text-[10px] font-black text-gray-500 px-1">
                                SALE
                              </span>
                              <select
                                value={
                                  typeof event.playerOut === "object"
                                    ? event.playerOut?._id
                                    : event.playerOut || ""
                                }
                                onChange={(e) =>
                                  handleEventChange(
                                    idx,
                                    "playerOut",
                                    e.target.value,
                                  )
                                }
                                className="w-full p-2 border border-gray-300 rounded-lg font-medium text-gray-500"
                              >
                                <option value="">Seleccionar Jugador...</option>
                                {selectedPlayers.map((p) => (
                                  <option key={p._id} value={p._id}>
                                    {p.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="w-full p-2 bg-gray-200 rounded-lg font-medium text-gray-400 text-center cursor-not-allowed text-sm">
                          {event.type} del Rival
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => handleRemoveEvent(idx)}
                      className="p-2 text-gray-400 hover:text-nyg-red transition-colors shrink-0"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MatchUnifiedForm;
