import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const STAFF = [
  {
    category: "Plantel Superior (Rugby)",
    members: [
      { role: "Head Coach", name: "Pablo García" },
      { role: "Entrenador de Forwards", name: "Marcelo Gómez" },
      { role: "Entrenador de Backs", name: "Diego Fernández" },
      { role: "Preparador Físico", name: "Lic. Martín Ruiz" },
    ],
  },
  {
    category: "Bloque Juveniles (Rugby)",
    members: [
      { role: "Coordinador General", name: "Luis Navarro" },
      { role: "Entrenador M19", name: "Carlos 'Charly' Vega" },
      { role: "Entrenador M17", name: "Andrés Silva" },
      { role: "Entrenador M16", name: "Hernán Rojas" },
    ],
  },
  {
    category: "Hockey Femenino",
    members: [
      { role: "Head Coach Primera", name: "Laura Martínez" },
      { role: "Asistente Técnico", name: "Carla López" },
      { role: "Preparador Físico", name: "Andrés Silva" },
      { role: "Coordinadora Juveniles", name: "Mariana Paz" },
    ],
  },
];

const CuerpoTecnico = () => {
  return (
    <div className="w-full bg-white pb-20">
      {/* Cabecera / Hero alineado con Historia */}
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
            Cuerpo Técnico
          </h1>
          <p className="text-xl md:text-2xl text-nyg-red font-bold tracking-widest uppercase">
            Los formadores del club
          </p>
        </motion.div>
      </div>

      {/* Contenido abierto sin cards */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <Link
          to="/el-club"
          className="inline-flex items-center gap-2 text-nyg-red font-semibold hover:text-red-700 mb-10 transition-colors"
        >
          <ArrowLeft size={20} /> Volver a El Club
        </Link>

        <div className="space-y-20 mt-8">
          {STAFF.map((group, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-black text-nyg-blue uppercase tracking-tight mb-8 border-b-2 border-gray-100 pb-4">
                {group.category}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10 pl-2">
                {group.members.map((member, i) => (
                  <div
                    key={i}
                    className="flex flex-col border-l-4 border-nyg-gold pl-5"
                  >
                    <span className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">
                      {member.role}
                    </span>
                    <span className="text-2xl font-black text-gray-800">
                      {member.name}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CuerpoTecnico;
