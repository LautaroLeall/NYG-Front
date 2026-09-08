import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Users, Loader2 } from "lucide-react";
import axios from "../../api/axiosConfig";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, type: "spring" },
  },
};

const PlayerCard = ({ player }) => (
  <Link to={`/rugby/jugador/${player._id}`} className="block h-full">
    <motion.div
      variants={cardVariants}
      className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 group h-full flex flex-col"
    >
      <div className="aspect-square bg-gray-100 overflow-hidden relative">
        <img
          src={
            player.imageUrl ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(player.name)}&background=DC2626&color=fff&size=512`
          }
          alt={player.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(player.name)}&background=DC2626&color=fff&size=512`;
          }}
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          <span className="text-white font-bold text-sm tracking-widest uppercase mb-1">
            Ver Perfil
          </span>
        </div>
      </div>
      <div className="p-5 text-center bg-white relative z-10 flex-1 flex flex-col justify-center">
        <h4 className="text-xl font-bold text-nyg-blue mb-1 leading-tight">
          {player.name}
        </h4>
        <p className="text-nyg-red font-black text-xs uppercase tracking-widest mt-1">
          {player.position}
        </p>
      </div>
    </motion.div>
  </Link>
);

const PlantelSuperior = () => {
  const [forwards, setForwards] = useState([]);
  const [backs, setBacks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        setIsLoading(true);
        // Traemos todos los jugadores (sin restringir por isActive porque quizás los cargaste como Inactivos por defecto)
        const res = await axios.get("/api/players");

        // Filtramos Primera, Intermedia y Pre-Intermedia
        const allowedCategories = ["Primera", "Intermedia", "Pre-Intermedia"];
        const players = (res.data.data || []).filter((p) =>
          allowedCategories.includes(p.category),
        );

        const forwardKeywords = [
          "pilar",
          "hooker",
          "segunda",
          "tercera",
          "octavo",
          "ala",
          "forward",
        ];
        const isForward = (pos) => {
          const lowerPos = pos?.toLowerCase() || "";
          return forwardKeywords.some((keyword) => lowerPos.includes(keyword));
        };

        const f = players.filter((p) => isForward(p.position));
        const b = players.filter((p) => !isForward(p.position));

        setForwards(f);
        setBacks(b);
      } catch (error) {
        console.error("Error fetching players", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlayers();
  }, []);
  return (
    <div className="w-full bg-gray-50 pb-20 overflow-hidden">
      {/* Cabecera / Hero Unificada */}
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
            Plantel Superior
          </h1>
          <p className="text-xl md:text-2xl text-nyg-red font-bold tracking-widest uppercase">
            La Primera División
          </p>
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 -mt-10">
        <Link
          to="/rugby"
          className="inline-flex items-center gap-2 text-nyg-red font-semibold hover:text-red-700 mb-10 transition-colors"
        >
          <ArrowLeft size={20} /> Volver a Rugby
        </Link>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-12 h-12 animate-spin text-nyg-blue" />
          </div>
        ) : (
          <>
            {/* Sección: FORWARDS */}
            <div className="mb-20">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="mb-8"
              >
                <h2 className="text-3xl font-black text-nyg-blue border-l-8 border-nyg-gold pl-4 uppercase tracking-tight">
                  Forwards
                </h2>
                <p className="text-gray-500 mt-2 ml-6">
                  El motor y la fuerza de nuestro equipo.
                </p>
              </motion.div>

              {forwards.length === 0 ? (
                <p className="text-gray-400 font-bold ml-6">
                  No hay forwards registrados.
                </p>
              ) : (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
                >
                  {forwards.map((player) => (
                    <PlayerCard key={player._id} player={player} />
                  ))}
                </motion.div>
              )}
            </div>

            {/* Sección: BACKS */}
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="mb-8"
              >
                <h2 className="text-3xl font-black text-nyg-blue border-l-8 border-nyg-red pl-4 uppercase tracking-tight">
                  Backs
                </h2>
                <p className="text-gray-500 mt-2 ml-6">
                  Velocidad, destreza y definición.
                </p>
              </motion.div>

              {backs.length === 0 ? (
                <p className="text-gray-400 font-bold ml-6">
                  No hay backs registrados.
                </p>
              ) : (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
                >
                  {backs.map((player) => (
                    <PlayerCard key={player._id} player={player} />
                  ))}
                </motion.div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PlantelSuperior;
