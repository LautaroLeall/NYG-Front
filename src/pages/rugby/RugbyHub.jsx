import { Link } from "react-router-dom";
import {
  Shield,
  Users,
  Trophy,
  Calendar,
  BarChart,
  ListOrdered,
} from "lucide-react";
import { motion } from "framer-motion";

const SECTIONS = [
  {
    title: "Plantel Superior",
    desc: "Primera, Intermedia y Pre-Intermedia.",
    icon: <Shield size={40} />,
    to: "/rugby/plantel-superior",
  },
  {
    title: "Bloque Juvenil",
    desc: "De M15 a M19. El futuro del club.",
    icon: <Users size={40} />,
    to: "/rugby/juveniles",
  },
  {
    title: "Rugby Infantil",
    desc: "Donde nacen los valores y la pasión.",
    icon: <Users size={40} />,
    to: "/rugby/infantiles",
  },
  {
    title: "Fixture y Resultados",
    desc: "Calendario de partidos jugados y por jugar.",
    icon: <Calendar size={40} />,
    to: "/rugby/fixture",
  },
  {
    title: "Tabla de Posiciones",
    desc: "El camino hacia el campeonato.",
    icon: <ListOrdered size={40} />,
    to: "/rugby/posiciones",
  },
  {
    title: "Estadísticas",
    desc: "Goleadores, trymans y más números del plantel.",
    icon: <BarChart size={40} />,
    to: "/rugby/estadisticas",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, type: "spring" } },
};

const RugbyHub = () => {
  return (
    <div className="w-full bg-gray-50 pb-25">
      {/* Cabecera / Hero Unificada */}
      <div
        className="relative h-[55vh] min-h-87.5 flex items-center justify-center bg-center bg-cover"
        style={{ backgroundImage: "url('/img-club4.png')" }}
      >
        <div className="absolute inset-0 bg-nyg-blue/85 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-linear-to-t from-nyg-blue to-transparent opacity-80"></div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-4 mt-16"
        >
          <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-wider drop-shadow-lg mb-4">
            Rugby
          </h1>
          <p className="text-xl md:text-2xl text-nyg-gold font-light tracking-wide">
            Coraje, Respeto y Pasión
          </p>
        </motion.div>
      </div>

      {/* Grilla de Navegación */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <p className="text-gray-600 text-lg md:text-xl leading-relaxed">
            Desde 1941, el rugby es el corazón vibrante de Natación y Gimnasia.
            Forjamos jugadores y personas de bien, basados en la camaradería y
            la entrega incondicional por nuestros colores.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-8"
        >
          {SECTIONS.map((sec, idx) => (
            <motion.div key={idx} variants={itemVariants} className="h-full">
              <Link
                to={sec.to}
                className="group flex flex-col items-center text-center h-full hover:-translate-y-2 transition-transform duration-300 px-4"
              >
                <div className="text-nyg-red group-hover:text-nyg-gold mb-6 transition-colors duration-300 bg-white p-6 rounded-full shadow-md border border-gray-100 group-hover:shadow-lg">
                  {sec.icon}
                </div>
                <h3 className="text-2xl font-black text-nyg-blue group-hover:text-nyg-gold mb-3 transition-colors duration-300 uppercase tracking-tight">
                  {sec.title}
                </h3>
                <p className="text-gray-500 font-medium leading-relaxed max-w-sm">
                  {sec.desc}
                </p>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default RugbyHub;
