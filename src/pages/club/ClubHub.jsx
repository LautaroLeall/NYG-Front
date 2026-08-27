import { Link } from "react-router-dom";
import { History, Clock, Trophy, MapPin, Users, UserCog } from "lucide-react";
import { motion } from "framer-motion";

const SECTIONS = [
  {
    title: "Historia",
    desc: "Desde 1930 forjando valores y pasión en Tucumán.",
    icon: <History size={40} />,
    to: "/el-club/historia",
  },
  {
    title: "Línea de Tiempo",
    desc: "Un viaje interactivo por nuestros mayores hitos.",
    icon: <Clock size={40} />,
    to: "/el-club/timeline",
  },
  {
    title: "Palmarés",
    desc: "La vitrina con todos nuestros campeonatos.",
    icon: <Trophy size={40} />,
    to: "/el-club/palmares",
  },
  {
    title: "Instalaciones",
    desc: "Nuestra sede central y el predio deportivo.",
    icon: <MapPin size={40} />,
    to: "/el-club/instalaciones",
  },
  {
    title: "Cuerpo Técnico",
    desc: "Los formadores de nuestros planteles.",
    icon: <UserCog size={40} />,
    to: "/el-club/cuerpo-tecnico",
  },
  {
    title: "Comisión Directiva",
    desc: "Quienes conducen el rumbo de la institución.",
    icon: <Users size={40} />,
    to: "/el-club/comision",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const ClubHub = () => {
  return (
    <div className="w-full bg-white pb-20">
      {/* Cabecera / Hero de la sección */}
      <div
        className="relative h-[40vh] min-h-87.5 flex items-center justify-center bg-center bg-cover"
        style={{ backgroundImage: "url('/img-club3.png')" }}
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
            El Club
          </h1>
          <p className="text-xl md:text-2xl text-nyg-gold font-light tracking-wide">
            Identidad, Gloria y Pasión
          </p>
        </motion.div>
      </div>

      {/* Contenido / Grilla de navegación */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl font-bold text-nyg-blue mb-6">
            Nuestra Institución
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            El Club Natación y Gimnasia es una institución deportiva de hockey
            sobre césped femenino y rugby masculino con sede en San Miguel de
            Tucumán. Más que un club, somos una gran familia con más de un siglo
            de historia viva.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {SECTIONS.map((sec, idx) => (
            <motion.div key={idx} variants={itemVariants} className="h-full">
              <Link
                to={sec.to}
                className="group p-8 md:p-10 rounded-2xl bg-gray-50 border border-gray-100 hover:bg-nyg-blue transition-all duration-300 shadow-sm hover:shadow-2xl hover:-translate-y-2 flex flex-col items-center text-center h-full"
              >
                <div className="text-nyg-red group-hover:text-nyg-gold mb-6 transition-colors duration-300">
                  {sec.icon}
                </div>
                <h3 className="text-2xl font-bold text-nyg-blue group-hover:text-white mb-3 transition-colors duration-300">
                  {sec.title}
                </h3>
                <p className="text-gray-600 group-hover:text-gray-200 transition-colors duration-300">
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

export default ClubHub;
