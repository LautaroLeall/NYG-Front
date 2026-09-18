import React from "react";
import dayjs from "dayjs";
import { Calendar, Clock, MapPin } from "lucide-react";
import { getShield } from "../../../utils/shieldDictionary";

const MatchHeader = ({ match, homeTeam, awayTeam, venue }) => {
  return (
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
            <Clock size={16} /> {dayjs(match.date).format("HH:mm")} hs
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
  );
};

export default MatchHeader;
