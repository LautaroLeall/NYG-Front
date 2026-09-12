import {
  Calendar,
  MapPin,
  Trophy,
  Clock,
  Loader2,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../../api/axiosConfig";
import dayjs from "dayjs";
import "dayjs/locale/es";
dayjs.locale("es");

const NextMatch = () => {
  const [match, setMatch] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNextMatch = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get("/api/matches/upcoming");
        if (res.data.data && res.data.data.length > 0) {
          // Tomar solo el primero
          setMatch(res.data.data[0]);
        }
      } catch (error) {
        console.error("Error fetching next match", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNextMatch();
  }, []);

  if (isLoading) {
    return (
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 flex justify-center">
          <Loader2 className="w-10 h-10 text-nyg-red animate-spin" />
        </div>
      </section>
    );
  }

  if (!match) return null;

  const locationText = match.isHomeMatch
    ? "Sede Natación y Gimnasia"
    : `Visitante - ${match.homeTeam?.name}`;

  return (
    <section className="py-12 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-bl from-gray-50 to-transparent skew-x-12 translate-x-32 -z-10"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center mb-8">
          <span className="bg-nyg-red text-white text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 animate-pulse shadow-md">
            Próximo Partido
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-nyg-blue text-center">
            ¡Agendá la fecha!
          </h2>
        </div>

        <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100 max-w-4xl mx-auto relative group">
          {/* Faja superior de torneo */}
          <div className="bg-nyg-blue text-white py-3 px-6 flex justify-between items-center text-sm font-black uppercase tracking-wider">
            <span className="flex items-center gap-2">
              <Trophy size={16} className="text-nyg-gold" />
              {match.tournament?.name || "Torneo"}
            </span>
            <span className="opacity-80">Primera División</span>
          </div>

          <div className="p-8 md:p-12 flex flex-col items-center relative">
            <div className="flex flex-col md:flex-row items-center justify-between w-full gap-8 md:gap-4 relative z-10">
              {/* Equipo Local */}
              <div className="flex flex-col items-center flex-1 text-center">
                <div className="w-24 h-24 md:w-32 md:h-32 bg-gray-50 rounded-full flex items-center justify-center shadow-lg border-4 border-white mb-4 overflow-hidden relative group-hover:scale-105 transition-transform">
                  {match.homeTeam?.shieldUrl || match.homeTeam?.logo ? (
                    <img
                      src={match.homeTeam?.shieldUrl || match.homeTeam?.logo}
                      alt={match.homeTeam?.name}
                      className="w-full h-full object-contain p-4"
                    />
                  ) : (
                    <span className="text-3xl font-black text-gray-300">
                      {match.homeTeam?.name?.substring(0, 3).toUpperCase()}
                    </span>
                  )}
                </div>
                <h3 className="text-xl md:text-2xl font-black text-gray-800 leading-tight">
                  {match.homeTeam?.name}
                </h3>
              </div>

              {/* Centro: VS y Fecha */}
              <div className="flex flex-col items-center justify-center shrink-0 w-32 md:w-48 text-center">
                <span className="text-5xl md:text-6xl font-black text-gray-200 italic mb-4">
                  VS
                </span>
                <div className="bg-gray-50 rounded-2xl p-4 shadow-inner w-full border border-gray-100">
                  <div className="flex items-center justify-center gap-1.5 text-nyg-red font-black uppercase tracking-widest text-sm mb-2">
                    <Calendar size={16} />
                    {dayjs(match.date).format("DD MMM YYYY")}
                  </div>
                  <div className="flex items-center justify-center gap-1.5 text-gray-600 font-bold text-sm">
                    <Clock size={16} />
                    {dayjs(match.date).format("HH:mm")} hs
                  </div>
                </div>
              </div>

              {/* Equipo Visitante */}
              <div className="flex flex-col items-center flex-1 text-center">
                <div className="w-24 h-24 md:w-32 md:h-32 bg-gray-50 rounded-full flex items-center justify-center shadow-lg border-4 border-white mb-4 overflow-hidden relative group-hover:scale-105 transition-transform">
                  {match.awayTeam?.shieldUrl || match.awayTeam?.logo ? (
                    <img
                      src={match.awayTeam?.shieldUrl || match.awayTeam?.logo}
                      alt={match.awayTeam?.name}
                      className="w-full h-full object-contain p-4"
                    />
                  ) : (
                    <span className="text-3xl font-black text-gray-300">
                      {match.awayTeam?.name?.substring(0, 3).toUpperCase()}
                    </span>
                  )}
                </div>
                <h3 className="text-xl md:text-2xl font-black text-gray-800 leading-tight">
                  {match.awayTeam?.name}
                </h3>
              </div>
            </div>

            {/* Footer interno */}
            <div className="mt-10 pt-6 border-t border-gray-100 w-full flex flex-col md:flex-row items-center justify-between gap-4 text-gray-500">
              <div className="flex items-center gap-2 font-medium">
                <MapPin className="text-gray-400" size={20} />
                {locationText}
              </div>
              <Link
                to="/rugby/fixture"
                className="inline-flex items-center gap-2 text-nyg-blue font-black uppercase tracking-widest hover:text-nyg-red transition-colors"
              >
                Ver Fixture <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NextMatch;
