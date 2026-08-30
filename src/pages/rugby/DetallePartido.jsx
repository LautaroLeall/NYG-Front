import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Clock,
  Trophy,
  Award,
} from "lucide-react";

const DetallePartido = () => {
  const { id } = useParams();

  // Mock de datos del partido
  const match = {
    id,
    competition: "Campeonato Anual Tucumano",
    date: "15 AGO 2026",
    time: "16:00",
    venue: "Cancha Principal, Club Natación y Gimnasia",
    status: "Finalizado",
    isHomeMatch: true,
    homeTeam: {
      name: "Natación y Gimnasia",
      shortName: "NYG",
      logo: "/escudos/nyg.png",
      score: 24,
    },
    awayTeam: {
      name: "Universitario",
      shortName: "UNI",
      logo: "/escudos/universitario.png",
      score: 21,
    },
    manOfTheMatch: "Gabriel Ascárate",
    timeline: [
      {
        time: "12'",
        team: "NYG",
        player: "G. Ascárate",
        action: "Try",
        score: "5-0",
      },
      {
        time: "13'",
        team: "NYG",
        player: "M. Ledesma",
        action: "Conversión",
        score: "7-0",
      },
      {
        time: "25'",
        team: "UNI",
        player: "N. Sánchez",
        action: "Penal",
        score: "7-3",
      },
      {
        time: "38'",
        team: "UNI",
        player: "N. Sánchez",
        action: "Penal",
        score: "7-6",
      },
      {
        time: "42'",
        team: "NYG",
        player: "G. García",
        action: "Try",
        score: "12-6",
      },
      {
        time: "55'",
        team: "UNI",
        player: "T. Vanni",
        action: "Try",
        score: "12-11",
      },
      {
        time: "56'",
        team: "UNI",
        player: "N. Sánchez",
        action: "Conversión",
        score: "12-13",
      },
      {
        time: "68'",
        team: "NYG",
        player: "M. Ledesma",
        action: "Penal",
        score: "15-13",
      },
      {
        time: "72'",
        team: "UNI",
        player: "J. Novillo",
        action: "Try",
        score: "15-18",
      },
      {
        time: "75'",
        team: "UNI",
        player: "N. Sánchez",
        action: "Penal",
        score: "15-21",
      },
      {
        time: "82'",
        team: "NYG",
        player: "J. Bustos",
        action: "Try",
        score: "20-21",
      },
      {
        time: "83'",
        team: "NYG",
        player: "M. Ledesma",
        action: "Conversión",
        score: "22-21",
      },
      {
        time: "85'",
        team: "NYG",
        player: "M. Ledesma",
        action: "Penal",
        score: "25-21",
      },
    ],
  };

  const isNygWinner = match.homeTeam.score > match.awayTeam.score;

  return (
    <div className="w-full bg-gray-50 pb-32">
      {/* Marcador Principal */}
      <div className="bg-nyg-blue pt-32 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 bg-[url('/img-club2.png')] bg-cover bg-center mix-blend-overlay opacity-30"></div>

        <div className="max-w-5xl mx-auto px-4 relative z-10 text-white">
          <Link
            to="/rugby/fixture"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white font-semibold mb-8 transition-colors uppercase tracking-widest text-sm"
          >
            <ArrowLeft size={16} /> Volver al Fixture
          </Link>

          <div className="text-center mb-12">
            <span className="bg-nyg-red px-4 py-1.5 rounded-full font-bold uppercase tracking-widest text-sm shadow-lg inline-block mb-4">
              {match.competition}
            </span>
            <div className="flex flex-wrap justify-center items-center gap-6 text-white/80 font-medium text-sm md:text-base uppercase tracking-widest">
              <span className="flex items-center gap-2">
                <Calendar size={18} /> {match.date}
              </span>
              <span className="flex items-center gap-2">
                <Clock size={18} /> {match.time}
              </span>
              <span className="flex items-center gap-2">
                <MapPin size={18} /> {match.venue}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 md:gap-16">
            {/* Equipo Local */}
            <div className="flex flex-col items-center w-1/3">
              <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-full p-2 shadow-2xl flex items-center justify-center mb-4">
                <img
                  src={match.homeTeam.logo}
                  alt={match.homeTeam.name}
                  className="w-20 h-20 md:w-24 md:h-24 object-contain"
                />
              </div>
              <h2 className="text-xl md:text-3xl font-black uppercase tracking-tight text-center hidden md:block">
                {match.homeTeam.name}
              </h2>
              <h2 className="text-2xl font-black uppercase tracking-tight text-center md:hidden">
                {match.homeTeam.shortName}
              </h2>
            </div>

            {/* Resultado */}
            <div className="flex flex-col items-center justify-center">
              <div className="flex items-center gap-2 md:gap-6 bg-black/30 backdrop-blur-sm px-6 py-4 rounded-3xl border border-white/10">
                <span
                  className={`text-5xl md:text-7xl font-black ${isNygWinner ? "text-nyg-gold" : "text-white"}`}
                >
                  {match.homeTeam.score}
                </span>
                <span className="text-2xl md:text-3xl font-light text-white/50">
                  -
                </span>
                <span
                  className={`text-5xl md:text-7xl font-black ${!isNygWinner ? "text-nyg-gold" : "text-white"}`}
                >
                  {match.awayTeam.score}
                </span>
              </div>
              <span className="mt-4 text-nyg-gold font-bold uppercase tracking-widest text-sm bg-black/40 px-4 py-1 rounded-full">
                {match.status}
              </span>
            </div>

            {/* Equipo Visitante */}
            <div className="flex flex-col items-center w-1/3">
              <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-full p-2 shadow-2xl flex items-center justify-center mb-4">
                <img
                  src={match.awayTeam.logo}
                  alt={match.awayTeam.name}
                  className="w-20 h-20 md:w-24 md:h-24 object-contain"
                />
              </div>
              <h2 className="text-xl md:text-3xl font-black uppercase tracking-tight text-center hidden md:block">
                {match.awayTeam.name}
              </h2>
              <h2 className="text-2xl font-black uppercase tracking-tight text-center md:hidden">
                {match.awayTeam.shortName}
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido / Línea de Tiempo */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12">
          <div className="flex flex-col md:flex-row justify-between items-center bg-gray-50 rounded-2xl p-6 border border-gray-200 mb-12">
            <div className="flex items-center gap-4 mb-4 md:mb-0">
              <div className="w-12 h-12 bg-nyg-gold rounded-full flex items-center justify-center text-nyg-blue">
                <Award size={24} />
              </div>
              <div>
                <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest">
                  Man of the Match
                </span>
                <span className="text-xl font-black text-nyg-blue">
                  {match.manOfTheMatch}
                </span>
              </div>
            </div>
            <Link
              to={`/rugby/jugador/1`}
              className="text-nyg-red font-bold text-sm uppercase hover:underline tracking-widest"
            >
              Ver Perfil
            </Link>
          </div>

          <h3 className="text-2xl font-black text-nyg-blue uppercase tracking-tight mb-8 text-center border-b-2 border-gray-100 pb-4">
            Línea de Tiempo
          </h3>

          <div className="space-y-4">
            {match.timeline.map((event, idx) => (
              <div
                key={idx}
                className={`flex items-center ${event.team === "NYG" ? "justify-start" : "justify-end"}`}
              >
                {/* Contenido Izquierda (Local) */}
                <div
                  className={`w-[45%] text-right ${event.team === "NYG" ? "block" : "hidden"}`}
                >
                  <span className="block font-bold text-nyg-blue text-lg">
                    {event.player}
                  </span>
                  <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                    {event.action}
                  </span>
                </div>

                {/* Centro */}
                <div className="w-[10%] flex flex-col items-center justify-center relative">
                  <div className="h-full w-px bg-gray-200 absolute inset-0 left-1/2 -translate-x-1/2 z-0"></div>
                  <div className="relative z-10 w-10 h-10 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center text-xs font-bold text-gray-500">
                    {event.time}
                  </div>
                </div>

                {/* Contenido Derecha (Visitante) */}
                <div
                  className={`w-[45%] text-left ${event.team !== "NYG" ? "block" : "hidden"}`}
                >
                  <span className="block font-bold text-gray-800 text-lg">
                    {event.player}
                  </span>
                  <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                    {event.action}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center pt-8 border-t border-gray-100">
            <span className="bg-gray-100 text-gray-800 px-6 py-2 rounded-full font-black text-xl border border-gray-200">
              Resultado Final: {match.homeTeam.score} - {match.awayTeam.score}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetallePartido;
