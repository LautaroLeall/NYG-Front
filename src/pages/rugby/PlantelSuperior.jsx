import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Users } from "lucide-react";

// Datos de prueba (Mocks). Algunos usan las fotos reales que subiste para que se vea espectacular.
const FORWARDS = [
  { name: "Javier Díaz", position: "Pilar", img: "/javierDiaz.png" },
  { name: "Omar Hasan", position: "Pilar", img: "/omarHasan.png" },
  {
    name: "Tomás Gallina",
    position: "Hooker",
    img: "https://ui-avatars.com/api/?name=TG&background=0A1128&color=fff&size=400",
  },
  {
    name: "Santiago García",
    position: "Segunda Línea",
    img: "https://ui-avatars.com/api/?name=SG&background=0A1128&color=fff&size=400",
  },
  {
    name: "Matías López",
    position: "Tercera Línea",
    img: "https://ui-avatars.com/api/?name=ML&background=0A1128&color=fff&size=400",
  },
  {
    name: "Nicolás Orlande",
    position: "Octavo",
    img: "https://ui-avatars.com/api/?name=NO&background=0A1128&color=fff&size=400",
  },
];

const BACKS = [
  {
    name: "Gonzalo García",
    position: "Medio Scrum",
    img: "/gonzaloGarcia.png",
  },
  {
    name: "Máximo Ledesma",
    position: "Apertura",
    img: "https://ui-avatars.com/api/?name=ML&background=DC2626&color=fff&size=400",
  },
  { name: "Gabriel Ascárate", position: "Centro", img: "/gabrielAscarate.png" },
  {
    name: "Joaquín Bustos",
    position: "Wing",
    img: "https://ui-avatars.com/api/?name=JB&background=DC2626&color=fff&size=400",
  },
  {
    name: "Lucas Santamarina",
    position: "Fullback",
    img: "https://ui-avatars.com/api/?name=LS&background=DC2626&color=fff&size=400",
  },
];

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
  <Link to={`/rugby/jugador/1`} className="block">
    <motion.div
      variants={cardVariants}
      className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 group h-full"
    >
      <div className="aspect-square bg-gray-100 overflow-hidden relative">
        <img
          src={player.img}
          alt={player.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://ui-avatars.com/api/?name=" + player.name + "&background=DC2626&color=fff&size=512";
          }}
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          <span className="text-white font-bold text-sm tracking-widest uppercase mb-1">
            Ver Perfil
          </span>
        </div>
      </div>
      <div className="p-5 text-center bg-white relative z-10">
        <h4 className="text-xl font-bold text-nyg-blue mb-1">{player.name}</h4>
        <p className="text-nyg-red font-black text-xs uppercase tracking-widest">
          {player.position}
        </p>
      </div>
    </motion.div>
  </Link>
);

const PlantelSuperior = () => {
  return (
    <div className="w-full bg-gray-50 pb-32">
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

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
          >
            {FORWARDS.map((player, idx) => (
              <PlayerCard key={idx} player={player} />
            ))}
          </motion.div>
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

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
          >
            {BACKS.map((player, idx) => (
              <PlayerCard key={idx} player={player} />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PlantelSuperior;
