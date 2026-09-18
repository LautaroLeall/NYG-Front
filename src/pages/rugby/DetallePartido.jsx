import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Clock,
  Trophy,
  Loader2,
} from "lucide-react";
import axios from "../../api/axiosConfig";
import dayjs from "dayjs";
import "dayjs/locale/es";
dayjs.locale("es");

// DICCIONARIO DE ESCUDOS
const getShield = (teamName, shieldUrl) => {
  if (shieldUrl && shieldUrl !== "/escudos/default.png" && shieldUrl !== "")
    return shieldUrl;
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

const DetallePartido = () => {
  const { id } = useParams();
  const [match, setMatch] = useState(null);
  const [stats, setStats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [matchRes, statsRes] = await Promise.all([
          axios.get(`/api/matches/${id}`),
          axios.get(`/api/matches/${id}/stats`),
        ]);

        setMatch(matchRes.data.data);
        setStats(statsRes.data.data);
      } catch (error) {
        console.error("Error fetching match details:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-nyg-white pt-24 pb-16 flex justify-center items-center">
        <Loader2 className="w-12 h-12 animate-spin text-nyg-blue" />
      </div>
    );
  }

  if (!match) {
    return (
      <div className="min-h-screen bg-nyg-white pt-24 pb-16 flex justify-center items-center">
        <h2 className="text-2xl font-bold text-gray-500">
          Partido no encontrado
        </h2>
      </div>
    );
  }

  const isHome = match.isHomeMatch;
  const homeTeam = {
    name: match.homeTeam?.name || "Local",
    shield: getShield(
      match.homeTeam?.name,
      match.homeTeam?.shieldUrl || match.homeTeam?.logo,
    ),
    score: match.homeScore,
  };
  const awayTeam = {
    name: match.awayTeam?.name || "Visitante",
    shield: getShield(
      match.awayTeam?.name,
      match.awayTeam?.shieldUrl || match.awayTeam?.logo,
    ),
    score: match.awayScore,
  };

  // Generar eventos
  let timelineEvents = [];

  if (match.events && match.events.length > 0) {
    // Usar eventos cargados manualmente desde el backend
    timelineEvents = match.events.map((e) => {
      let playerName = "Equipo";
      if (e.player && e.player.name) {
        const parts = e.player.name.split(" ");
        playerName =
          parts.length > 1
            ? `${parts[0].charAt(0)}. ${parts.slice(1).join(" ")}`
            : e.player.name;
      }
      let playerOutName = "";
      if (e.playerOut && e.playerOut.name) {
        const parts = e.playerOut.name.split(" ");
        playerOutName =
          parts.length > 1
            ? `${parts[0].charAt(0)}. ${parts.slice(1).join(" ")}`
            : e.playerOut.name;
      }

      return {
        team: e.team,
        type: e.type,
        player: playerName,
        playerOut: playerOutName,
        minute: e.minute,
        isCard: e.type.includes("Tarjeta") || e.type === "Cambio",
        val:
          e.type === "Try"
            ? 5
            : e.type === "Conversión"
              ? 2
              : e.type === "Penal" || e.type === "Drop"
                ? 3
                : e.type === "Try Penal"
                  ? 7
                  : 0,
      };
    });
    // Ordenar por minuto ascendente
    timelineEvents.sort((a, b) => a.minute - b.minute);
  } else {
    // LÓGICA SINTÉTICA (Fallback para partidos viejos o sin línea de tiempo manual)
    stats.forEach((s) => {
      let playerName = "Jugador";
      if (s.player && s.player.name) {
        const parts = s.player.name.split(" ");
        if (parts.length > 1) {
          playerName = `${parts[0].charAt(0)}. ${parts.slice(1).join(" ")}`;
        } else {
          playerName = s.player.name;
        }
      }

      for (let i = 0; i < s.tries; i++)
        timelineEvents.push({
          team: "NYG",
          type: "Try",
          player: playerName,
          val: 5,
        });
      for (let i = 0; i < s.conversions; i++)
        timelineEvents.push({
          team: "NYG",
          type: "Conversión",
          player: playerName,
          val: 2,
        });
      for (let i = 0; i < s.penalties; i++)
        timelineEvents.push({
          team: "NYG",
          type: "Penal",
          player: playerName,
          val: 3,
        });
      for (let i = 0; i < s.drops; i++)
        timelineEvents.push({
          team: "NYG",
          type: "Drop",
          player: playerName,
          val: 3,
        });
      for (let i = 0; i < s.yellowCards; i++)
        timelineEvents.push({
          team: "NYG",
          type: "Tarjeta Amarilla",
          player: playerName,
          val: 0,
          isCard: true,
        });
      for (let i = 0; i < s.redCards; i++)
        timelineEvents.push({
          team: "NYG",
          type: "Tarjeta Roja",
          player: playerName,
          val: 0,
          isCard: true,
        });
    });

    const nygPenaltyTries = isHome
      ? match.homePenaltyTries
      : match.awayPenaltyTries;
    for (let i = 0; i < nygPenaltyTries; i++)
      timelineEvents.push({
        team: "NYG",
        type: "Try Penal",
        player: "Equipo",
        val: 7,
      });

    const rivalTries = isHome ? match.awayTries : match.homeTries;
    const rivalConv = isHome ? match.awayConversions : match.homeConversions;
    const rivalPen = isHome ? match.awayPenalties : match.homePenalties;
    const rivalDrop = isHome ? match.awayDrops : match.homeDrops;
    const rivalPenaltyTries = isHome
      ? match.awayPenaltyTries
      : match.homePenaltyTries;

    for (let i = 0; i < rivalTries; i++)
      timelineEvents.push({ team: "RIVAL", type: "Try", val: 5 });
    for (let i = 0; i < rivalConv; i++)
      timelineEvents.push({ team: "RIVAL", type: "Conversión", val: 2 });
    for (let i = 0; i < rivalPen; i++)
      timelineEvents.push({ team: "RIVAL", type: "Penal", val: 3 });
    for (let i = 0; i < rivalDrop; i++)
      timelineEvents.push({ team: "RIVAL", type: "Drop", val: 3 });
    for (let i = 0; i < rivalPenaltyTries; i++)
      timelineEvents.push({ team: "RIVAL", type: "Try Penal", val: 7 });

    const orderVal = {
      "Try Penal": 1,
      Try: 2,
      Conversión: 3,
      Penal: 4,
      Drop: 5,
      "Tarjeta Amarilla": 6,
      "Tarjeta Roja": 7,
    };
    timelineEvents.sort((a, b) => orderVal[a.type] - orderVal[b.type]);
  }

  const rivalTeamName = isHome ? match.awayTeam?.name : match.homeTeam?.name;
  const venue = isHome
    ? "Sede Natación y Gimnasia"
    : `Visitante - ${match.homeTeam?.name}`;

  return (
    <div className="bg-surface-light min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/rugby/fixture"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-nyg-red font-bold mb-8 transition-colors"
        >
          <ArrowLeft size={20} /> Volver al Fixture
        </Link>

        {/* Header del Partido */}
        <div className="bg-white rounded-3xl shadow-soft p-8 md:p-12 mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-nyg-blue/5 rounded-full blur-3xl -translate-y-20 translate-x-20"></div>

          <div className="text-center mb-10 relative z-10">
            <span className="inline-block px-4 py-1.5 bg-nyg-gold/10 text-nyg-gold font-black uppercase tracking-widest text-sm rounded-full mb-4">
              {match.tournament?.name || "Amistoso"}
            </span>
            <div className="flex flex-wrap justify-center items-center gap-4 text-sm font-bold text-gray-500">
              <span className="flex items-center gap-1">
                <Calendar size={16} /> {dayjs(match.date).format("DD MMM YYYY")}
              </span>
              <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
              <span className="flex items-center gap-1">
                <Clock size={16} /> {match.time || "16:00"}
              </span>
              <span className="w-1 h-1 bg-gray-300 rounded-full hidden sm:block"></span>
              <span className="flex items-center gap-1 w-full sm:w-auto mt-2 sm:mt-0 justify-center">
                <MapPin size={16} /> {venue}
              </span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4 relative z-10">
            <div className="flex flex-col items-center gap-4 w-full md:w-1/3">
              <img
                src={getShield(
                  match.homeTeam?.name,
                  match.homeTeam?.shieldUrl || match.homeTeam?.logo,
                )}
                alt={match.homeTeam?.name}
                title={match.homeTeam?.name}
                className="w-20 h-20 md:w-24 md:h-24 object-contain drop-shadow-md hover:scale-110 transition-transform"
              />
              <h3 className="text-xl font-black text-nyg-blue text-center uppercase tracking-wide">
                {homeTeam.name}
              </h3>
            </div>

            <div className="flex flex-col items-center justify-center w-full md:w-1/3">
              {match.status === "Finalizado" ? (
                <div className="text-6xl md:text-7xl font-display font-black text-nyg-blue tracking-tighter flex items-center gap-4">
                  <span>{homeTeam.score}</span>
                  <span className="text-3xl text-gray-300 font-light">-</span>
                  <span>{awayTeam.score}</span>
                </div>
              ) : (
                <div className="text-3xl font-display font-black text-gray-400">
                  VS
                </div>
              )}
              <span className="mt-4 px-3 py-1 bg-gray-100 text-gray-500 font-bold text-xs uppercase tracking-widest rounded-md">
                {match.status}
              </span>
            </div>

            <div className="flex flex-col items-center gap-4 w-full md:w-1/3">
              <img
                src={getShield(
                  match.awayTeam?.name,
                  match.awayTeam?.shieldUrl || match.awayTeam?.logo,
                )}
                alt={match.awayTeam?.name}
                title={match.awayTeam?.name}
                className="w-20 h-20 md:w-24 md:h-24 object-contain drop-shadow-md hover:scale-110 transition-transform"
              />
              <h3 className="text-xl font-black text-gray-500 text-center uppercase tracking-wide">
                {awayTeam.name}
              </h3>
            </div>
          </div>
        </div>

        {/* Línea de Tiempo (Resumen de Anotaciones) */}
        {match.status === "Finalizado" && (
          <div className="bg-white rounded-3xl shadow-soft p-8 md:p-12 mb-8">
            <h3 className="text-2xl font-black text-nyg-blue uppercase tracking-wide mb-8 flex items-center gap-3">
              <Trophy className="text-nyg-gold" size={28} />
              Resumen del Partido
            </h3>

            {timelineEvents.length === 0 ? (
              <p className="text-gray-400 text-center font-bold">
                No hay eventos registrados para este partido.
              </p>
            ) : (
              <div className="relative space-y-8 py-4">
                {/* Línea vertical */}
                <div className="absolute top-0 bottom-0 left-4 md:left-1/2 w-1 bg-gray-100 md:-translate-x-1/2"></div>

                {timelineEvents.map((event, index) => {
                  const isNYG = event.team === "NYG";
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className={`relative flex items-center ${isNYG ? "md:flex-row-reverse" : "md:flex-row"} w-full justify-start md:justify-between`}
                    >
                      {/* Punto Central */}
                      <div
                        className="absolute left-1 md:left-1/2 md:-translate-x-1/2 w-6 h-6 rounded-full border-4 border-white shadow-sm z-10"
                        style={{
                          backgroundColor: isNYG ? "#002A50" : "#9CA3AF",
                        }}
                      ></div>

                      <div
                        className={`w-full md:w-[45%] pl-12 md:pl-0 ${isNYG ? "md:text-right md:pr-10" : "md:text-left md:pl-10"}`}
                      >
                        <div
                          className={`p-4 rounded-2xl shadow-sm border ${isNYG ? "bg-blue-50/50 border-nyg-blue/10" : "bg-gray-50 border-gray-100"}`}
                        >
                          <div
                            className={`flex items-center gap-2 mb-1 ${isNYG ? "md:justify-end" : "md:justify-start"}`}
                          >
                            {event.minute && (
                              <span className="text-xs font-bold text-gray-400 mr-1">
                                {event.minute}'
                              </span>
                            )}
                            <span
                              className={`text-xs font-black uppercase tracking-widest px-2 py-0.5 rounded-md ${
                                event.type === "Tarjeta Amarilla"
                                  ? "bg-amber-100 text-amber-700"
                                  : event.type === "Tarjeta Roja"
                                    ? "bg-red-100 text-red-700"
                                    : isNYG
                                      ? "bg-nyg-blue text-white"
                                      : "bg-gray-200 text-gray-600"
                              }`}
                            >
                              {event.type} {event.val > 0 && `(+${event.val})`}
                            </span>
                          </div>
                          {isNYG ? (
                            event.type === "Cambio" ? (
                              <div className="flex flex-col gap-0.5">
                                <h4 className="font-bold text-gray-900 text-sm">
                                  ↑ Entra: {event.player}
                                </h4>
                                {event.playerOut && (
                                  <h4 className="font-bold text-gray-500 text-sm">
                                    ↓ Sale: {event.playerOut}
                                  </h4>
                                )}
                              </div>
                            ) : (
                              <h4 className="font-bold text-gray-900 text-lg">
                                {event.player}
                              </h4>
                            )
                          ) : (
                            <h4 className="font-bold text-gray-600 text-lg">
                              {event.type} Rival
                            </h4>
                          )}
                          {!event.isCard && (
                            <p className="text-sm font-medium text-gray-500 mt-1">
                              {isNYG
                                ? "Natación y Gimnasia"
                                : rivalTeamName || "Rival"}
                            </p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Nueva Sección: Formación (Plantel) */}
        {match.roster && match.roster.length > 0 && (
          <div className="bg-white rounded-3xl shadow-soft p-8 md:p-12">
            <h3 className="text-2xl font-black text-nyg-blue uppercase tracking-wide mb-8 flex items-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-nyg-gold"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
              Formación NYG
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Titulares */}
              <div>
                <h4 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-4 border-b border-gray-100 pb-2">
                  Titulares
                </h4>
                <div className="space-y-3">
                  {match.roster
                    .filter((r) => r.isStarter)
                    .map((r, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-100 overflow-hidden shrink-0">
                          {r.player?.imageUrl ? (
                            <img
                              src={r.player.imageUrl}
                              className="w-full h-full object-cover"
                              alt=""
                            />
                          ) : null}
                        </div>
                        <div>
                          <p className="font-bold text-gray-800 text-sm">
                            {r.player?.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {r.player?.position}
                          </p>
                        </div>
                      </div>
                    ))}
                  {match.roster.filter((r) => r.isStarter).length === 0 && (
                    <p className="text-sm text-gray-400 italic">No asignados</p>
                  )}
                </div>
              </div>

              {/* Suplentes */}
              <div>
                <h4 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-4 border-b border-gray-100 pb-2">
                  Suplentes
                </h4>
                <div className="space-y-3">
                  {match.roster
                    .filter((r) => !r.isStarter)
                    .map((r, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-100 overflow-hidden shrink-0">
                          {r.player?.imageUrl ? (
                            <img
                              src={r.player.imageUrl}
                              className="w-full h-full object-cover"
                              alt=""
                            />
                          ) : null}
                        </div>
                        <div>
                          <p className="font-bold text-gray-800 text-sm">
                            {r.player?.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {r.player?.position}
                          </p>
                        </div>
                      </div>
                    ))}
                  {match.roster.filter((r) => !r.isStarter).length === 0 && (
                    <p className="text-sm text-gray-400 italic">No asignados</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetallePartido;
