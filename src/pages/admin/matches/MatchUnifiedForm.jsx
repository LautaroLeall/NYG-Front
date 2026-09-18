import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import axios from "../../../api/axiosConfig";
import toast from "react-hot-toast";

import RosterManager from "./components/RosterManager";
import TimelineEventsManager from "./components/TimelineEventsManager";

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

      <RosterManager
        players={players}
        roster={roster}
        handleRosterChange={handleRosterChange}
      />

      <TimelineEventsManager
        events={events}
        setEvents={setEvents}
        players={players}
        roster={roster}
      />

      {/* FOOTER ACCIONES */}
      <div className="flex items-center justify-end gap-4 mt-8 pb-12">
        <button
          onClick={() => navigate("/admin/partidos")}
          className="px-6 py-3 bg-gray-100 text-gray-700 font-bold rounded-full hover:bg-gray-200 transition-colors"
        >
          Cancelar
        </button>
        <button
          onClick={handleSubmit}
          disabled={isSaving}
          className="px-8 py-3 bg-nyg-blue text-white font-bold rounded-full hover:bg-blue-900 transition-colors flex items-center gap-2 shadow-lg disabled:opacity-70"
        >
          {isSaving ? (
            <Loader2 className="animate-spin" size={20} />
          ) : (
            <Save size={20} />
          )}
          {isSaving ? "Guardando..." : "Guardar Ficha Técnica"}
        </button>
      </div>
    </div>
  );
};

export default MatchUnifiedForm;
