import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "../../api/axiosConfig";
import { ArrowLeft, Loader2 } from "lucide-react";
import dayjs from "dayjs";
import "dayjs/locale/es";
dayjs.locale("es");

import { getShield } from "../../utils/shieldDictionary";
import MatchHeader from "./components/MatchHeader";
import MatchTimeline from "./components/MatchTimeline";
import MatchSquadView from "./components/MatchSquadView";

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

      let val = 0;
      if (e.type === "Try") val = 5;
      if (e.type === "Conversión") val = 2;
      if (e.type === "Penal" || e.type === "Drop") val = 3;
      if (e.type === "Try Penal") val = 7;

      return {
        team: e.team,
        type: e.type,
        minute: e.minute,
        player: playerName,
        playerOut: playerOutName,
        val,
        isCard: e.type === "Tarjeta Amarilla" || e.type === "Tarjeta Roja",
      };
    });

    timelineEvents.sort((a, b) => a.minute - b.minute);
  } else if (stats.length > 0 || match.status === "Finalizado") {
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

        <MatchHeader
          match={match}
          homeTeam={homeTeam}
          awayTeam={awayTeam}
          venue={venue}
        />

        <MatchTimeline
          match={match}
          timelineEvents={timelineEvents}
          isHome={isHome}
          rivalTeamName={rivalTeamName}
        />

        <MatchSquadView match={match} />
      </div>
    </div>
  );
};

export default DetallePartido;
