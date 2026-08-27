import { Calendar, MapPin, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

// Datos de prueba (mock) hasta conectar el Backend (Epic 5)
const MOCK_RESULTS = [
  {
    id: 1,
    torneo: "Torneo Regional del NOA",
    fecha: "22 Ago 2026",
    local: "Natación y Gimnasia",
    visitante: "Tucumán Rugby",
    scoreLocal: 28,
    scoreVisitante: 24,
    lugar: "Sede Natación y Gimnasia",
  },
  {
    id: 2,
    torneo: "Torneo Regional del NOA",
    fecha: "15 Ago 2026",
    local: "Huirapuca",
    visitante: "Natación y Gimnasia",
    scoreLocal: 15,
    scoreVisitante: 32,
    lugar: "Cancha Huirapuca",
  },
  {
    id: 3,
    torneo: "Torneo Regional del NOA",
    fecha: "08 Ago 2026",
    local: "Natación y Gimnasia",
    visitante: "Universitario",
    scoreLocal: 21,
    scoreVisitante: 21,
    lugar: "Sede Natación y Gimnasia",
  },
];

const ResultCard = ({ match }) => {
  const isHomeNYG = match.local === "Natación y Gimnasia";
  const isAwayNYG = match.visitante === "Natación y Gimnasia";

  // Lógica para destacar visualmente a nuestro club
  const localClass = isHomeNYG ? "font-bold text-nyg-blue" : "text-gray-600";
  const awayClass = isAwayNYG ? "font-bold text-nyg-blue" : "text-gray-600";

  return (
    <div className="bg-white rounded-xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-100 hover:shadow-[0_4px_25px_rgba(0,0,0,0.1)] transition-shadow">
      {/* Header de la tarjeta */}
      <div className="flex justify-between items-center text-xs text-gray-500 mb-4 pb-3 border-b border-gray-100">
        <span className="font-semibold text-nyg-red uppercase tracking-wider">
          {match.torneo}
        </span>
        <div className="flex items-center gap-1">
          <Calendar size={14} />
          <span>{match.fecha}</span>
        </div>
      </div>

      {/* Resultados */}
      <div className="flex flex-col gap-3 my-6">
        <div className="flex justify-between items-center">
          <span className={`text-lg ${localClass}`}>{match.local}</span>
          <span
            className={`text-2xl font-black ${match.scoreLocal > match.scoreVisitante ? "text-nyg-blue" : "text-gray-400"}`}
          >
            {match.scoreLocal}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className={`text-lg ${awayClass}`}>{match.visitante}</span>
          <span
            className={`text-2xl font-black ${match.scoreVisitante > match.scoreLocal ? "text-nyg-blue" : "text-gray-400"}`}
          >
            {match.scoreVisitante}
          </span>
        </div>
      </div>

      {/* Footer de la tarjeta */}
      <div className="flex justify-between items-center text-sm text-gray-500 pt-3 border-t border-gray-100">
        <div className="flex items-center gap-1">
          <MapPin size={16} />
          <span className="truncate max-w-37.5">{match.lugar}</span>
        </div>
        <Link
          to={`/partidos/${match.id}`}
          className="text-nyg-red hover:text-red-700 font-semibold flex items-center gap-1"
        >
          Detalle <ChevronRight size={16} />
        </Link>
      </div>
    </div>
  );
};

const LatestResults = () => {
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MOCK_RESULTS.map((match) => (
            <ResultCard key={match.id} match={match} />
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link
            to="/partidos"
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
