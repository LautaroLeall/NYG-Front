import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Info } from "lucide-react";
import axios from "../../../api/axiosConfig";
import dayjs from "dayjs";

// Helper para obtener escudos
const getShield = (teamName, shieldUrl) => {
  if (shieldUrl) return shieldUrl;
  
  const shields = {
    "Natación y Gimnasia": "/escudos/nyg.png",
    "Tucumán Rugby": "/escudos/tuc-rugby.png",
    "Lince RC": "/escudos/lince.png",
    Huirapuca: "/escudos/huirapuca.png",
    "Universitario (T)": "/escudos/universitario-tuc.png",
    Universitario: "/escudos/universitario-tuc.png",
    "Cardenales RC": "/escudos/cardenales.png",
    Cardenales: "/escudos/cardenales.png",
    "Jockey Club (R)": "/escudos/jockey-rosario.png",
    "Jockey Club": "/escudos/jockey-rosario.png",
    "Tucumán Lawn Tennis": "/escudos/tuc-lawn-tenis.png",
    "Lawn Tennis": "/escudos/tuc-lawn-tenis.png",
    "Los Tarcos": "/escudos/tarcos.png",
  };
  return (
    shields[teamName] ||
    "https://ui-avatars.com/api/?name=" +
      encodeURIComponent(teamName) +
      "&background=F3F4F6&color=9CA3AF&size=150"
  );
};

const Posiciones = () => {
  const [tournaments, setTournaments] = useState([]);
  const [selectedTournament, setSelectedTournament] = useState(null);
  const [standings, setStandings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // 1. Cargar Torneos
  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const res = await axios.get("/api/tournaments");
        // Filtramos solo los activos de Rugby Primera para esta vista
        const activeTournaments = res.data.filter(
          (t) => !t.isArchived && t.discipline === "Rugby" && t.category === "Primera"
        );
        setTournaments(activeTournaments);
        if (activeTournaments.length > 0) {
          setSelectedTournament(activeTournaments[0]);
        }
      } catch (error) {
        console.error("Error cargando torneos", error);
      }
    };
    fetchTournaments();
  }, []);

  // 2. Cargar Tabla de Posiciones cuando cambia el torneo seleccionado
  useEffect(() => {
    const fetchStandings = async () => {
      if (!selectedTournament) return;
      try {
        setIsLoading(true);
        const res = await axios.get(`/api/standings/${selectedTournament._id}`);
        setStandings(res.data.data || []);
      } catch (error) {
        console.error("Error cargando posiciones", error);
        setStandings([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStandings();
  }, [selectedTournament]);

  return (
    <div className="w-full bg-gray-50 pb-20 overflow-hidden">
      {/* Cabecera */}
      <div
        className="relative h-[50vh] min-h-87.5 flex items-center justify-center bg-center bg-cover bg-fixed"
        style={{ backgroundImage: "url('/img-club5.png')" }}
      >
        <div className="absolute inset-0 bg-nyg-blue/90 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-linear-to-t from-white to-transparent opacity-100"></div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-4 mt-20"
        >
          <h1 className="text-5xl md:text-7xl font-black text-nyg-blue uppercase tracking-wider drop-shadow-sm mb-4">
            Posiciones
          </h1>
          <p className="text-xl md:text-2xl text-nyg-red font-bold tracking-widest uppercase">
            Camino a la gloria
          </p>
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <Link
          to="/rugby"
          className="inline-flex items-center gap-2 text-nyg-red font-semibold hover:text-red-700 mb-10 transition-colors"
        >
          <ArrowLeft size={20} /> Volver a Rugby
        </Link>
        {/* Selector de Torneo (Tabs / Botones) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 flex flex-col md:flex-row items-center justify-between gap-6 bg-white p-2 rounded-full shadow-lg border border-gray-100"
        >
          <div className="flex flex-wrap items-center justify-center gap-2 w-full md:w-auto">
            {TOURNAMENTS.map((t) => (
              <button
                key={t}
                onClick={() => setSelectedTournament(t)}
                className={`px-6 py-3 rounded-full font-bold uppercase tracking-widest text-xs md:text-sm transition-all duration-300 ${
                  selectedTournament === t
                    ? "bg-nyg-blue text-white shadow-md"
                    : "bg-transparent text-gray-500 hover:text-nyg-blue hover:bg-gray-50"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <Link
            to="/rugby/fixture"
            className="hidden md:inline-flex px-6 py-3 bg-nyg-red text-white rounded-full font-black uppercase tracking-widest text-xs hover:bg-nyg-gold hover:text-nyg-blue transition-colors shrink-0 shadow-md mr-2"
          >
            Ver Fixture
          </Link>
        </motion.div>

        {/* Tabla Responsive Mejorada (Estilo Natación) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl shadow-2xl border-t-8 border-t-nyg-blue overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-175">
              <thead>
                <tr className="bg-gray-100 text-nyg-blue text-sm uppercase tracking-wider">
                  <th className="p-4 text-center w-16 rounded-tl-2xl">#</th>
                  <th className="p-4 font-black">Equipo</th>
                  <th
                    className="p-4 text-center text-gray-500"
                    title="Partidos Jugados"
                  >
                    PJ
                  </th>
                  <th className="p-4 text-center text-gray-500" title="Ganados">
                    G
                  </th>
                  <th
                    className="p-4 text-center text-gray-500"
                    title="Empatados"
                  >
                    E
                  </th>
                  <th
                    className="p-4 text-center text-gray-500"
                    title="Perdidos"
                  >
                    P
                  </th>
                  <th
                    className="p-4 text-center text-gray-400"
                    title="Tantos a Favor"
                  >
                    TF
                  </th>
                  <th
                    className="p-4 text-center text-gray-400"
                    title="Tantos en Contra"
                  >
                    TC
                  </th>
                  <th
                    className="p-4 text-center text-gray-400"
                    title="Diferencia"
                  >
                    DIF
                  </th>
                  <th
                    className="p-4 text-center text-nyg-red"
                    title="Bonus Ofensivo"
                  >
                    BO
                  </th>
                  <th
                    className="p-4 text-center text-nyg-red"
                    title="Bonus Defensivo"
                  >
                    BD
                  </th>
                  <th className="p-4 text-center text-lg font-black text-white bg-nyg-blue rounded-tr-2xl shadow-inner">
                    PTS
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {POSITIONS_DATA.map((row) => (
                  <tr
                    key={row.team}
                    className={`
                      ${row.isOwn ? "bg-nyg-blue/5" : "hover:bg-gray-50"} 
                      ${row.pos <= 4 ? "border-l-4 border-l-nyg-gold" : "border-l-4 border-l-transparent"}
                      transition-colors
                    `}
                  >
                    <td
                      className={`p-4 text-center font-black ${row.isOwn ? "text-nyg-blue" : "text-gray-400"}`}
                    >
                      {row.pos}
                    </td>

                    <td className="p-2 md:p-4 font-bold flex items-center gap-4">
                      {/* En lugar del texto, mostramos el escudo grande y destacamos si es propio */}
                      <div
                        className={`w-12 h-12 md:w-16 md:h-16 flex items-center justify-center bg-white rounded-full p-2 shadow-sm ${row.isOwn ? "border-2 border-nyg-blue shadow-md scale-110 ml-2" : "border border-gray-100"}`}
                      >
                        <img
                          src={getShield(row.team)}
                          alt={row.team}
                          title={row.team}
                          className="w-full h-full object-contain drop-shadow-sm"
                        />
                      </div>
                      {row.isOwn && (
                        <span className="hidden md:inline-block bg-nyg-blue text-white text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full ml-2">
                          Nosotros
                        </span>
                      )}
                    </td>

                    <td className="p-4 text-center text-gray-600 font-medium">
                      {row.played}
                    </td>
                    <td className="p-4 text-center text-gray-600">{row.won}</td>
                    <td className="p-4 text-center text-gray-600">
                      {row.drawn}
                    </td>
                    <td className="p-4 text-center text-gray-600">
                      {row.lost}
                    </td>
                    <td className="p-4 text-center text-gray-400">{row.pf}</td>
                    <td className="p-4 text-center text-gray-400">{row.pa}</td>
                    <td className="p-4 text-center text-gray-400 font-medium">
                      {row.diff > 0 ? `+${row.diff}` : row.diff}
                    </td>
                    <td className="p-4 text-center text-nyg-red font-bold">
                      {row.bo}
                    </td>
                    <td className="p-4 text-center text-nyg-red font-bold">
                      {row.bd}
                    </td>

                    <td
                      className={`p-4 text-center text-2xl font-black border-l border-gray-100 ${row.isOwn ? "text-nyg-blue bg-nyg-blue/10" : "text-nyg-blue bg-gray-50"}`}
                    >
                      {row.pts}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-white p-4 sm:px-8 border-t border-gray-100 flex flex-wrap items-center gap-6 text-sm text-gray-500 font-medium">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-nyg-gold rounded-sm shadow-inner"></div>
              <span className="text-nyg-blue">Zona de Campeonato (Top 4)</span>
            </div>
            <div className="flex items-center gap-2 ml-auto text-xs md:text-sm">
              <Info size={16} className="text-nyg-red" />
              <span>BO: 3 tries de dif. | BD: Pierde por 7 o menos</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Posiciones;
