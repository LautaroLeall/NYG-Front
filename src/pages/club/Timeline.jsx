import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Calendar, Trophy, MapPin, Flag, Users } from "lucide-react";

const MILESTONES = [
  {
    year: "1930",
    title: "Fundación del Club",
    desc: "El 21 de febrero nace el Club Natación y Gimnasia en los baños públicos 9 de Julio.",
    icon: <Calendar size={24} />,
    color: "bg-nyg-blue text-white",
  },
  {
    year: "1939",
    title: "Sede Propia",
    desc: "El 29 de diciembre se inaugura la emblemática sede en Av. Benjamín Aráoz al 700, la más moderna del norte del país.",
    icon: <MapPin size={24} />,
    color: "bg-nyg-red text-white",
  },
  {
    year: "1941",
    title: "Nacimiento del Rugby",
    desc: 'Se constituye la Subcomisión de Rugby liderada por Mario Santamarina. Llegan las primeras pelotas ovaladas y arcos en "H".',
    icon: <Flag size={24} />,
    color: "bg-nyg-gold text-nyg-blue",
  },
  {
    year: "1944",
    title: "Fundación URT",
    desc: "Natación y Gimnasia, junto a otros tres clubes, funda la Unión de Rugby del Norte (actual URT).",
    icon: <Users size={24} />,
    color: "bg-nyg-blue text-white",
  },
  {
    year: "1947",
    title: "Primer Campeonato Anual",
    desc: "El esfuerzo de los pioneros da sus frutos con la primera consagración en el torneo Anual Tucumano.",
    icon: <Trophy size={24} />,
    color: "bg-nyg-gold text-nyg-blue",
  },
  {
    year: "Años 90s",
    title: "Complejo Juan Luis Aráoz",
    desc: "Inauguración del predio de 4 hectáreas con canchas de rugby, hockey y el tradicional quincho.",
    icon: <MapPin size={24} />,
    color: "bg-nyg-red text-white",
  },
  {
    year: "2017",
    title: "Campeones Regionales",
    desc: "Día histórico: Primer título del Torneo Regional del NOA cortando una larga sequía de campeonatos.",
    icon: <Trophy size={24} />,
    color: "bg-nyg-gold text-nyg-blue",
  },
  {
    year: "2026",
    title: "La Décima Estrella",
    desc: "Consolidación de nuestra supremacía local al conquistar el 10° Campeonato Anual Tucumano.",
    icon: <Trophy size={24} />,
    color: "bg-nyg-blue text-white",
  },
];

const Timeline = () => {
  return (
    <div className="w-full bg-gray-50 pb-32 overflow-hidden">
      {/* Parallax Hero */}
      <div
        className="relative h-[50vh] min-h-87.5 flex items-center justify-center bg-center bg-cover"
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
            Nuestros Hitos
          </h1>
          <p className="text-xl md:text-2xl text-nyg-red font-bold tracking-widest uppercase">
            Línea de Tiempo
          </p>
        </motion.div>
      </div>

      {/* Contenido del Artículo */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 -mt-10">
        <Link
          to="/el-club"
          className="inline-flex items-center gap-2 text-nyg-red font-semibold hover:text-red-700 mb-10 transition-colors"
        >
          <ArrowLeft size={20} /> Volver a El Club
        </Link>

        {/* TIMELINE CONTAINER */}
        <div className="relative">
          {/* Línea central (Desktop) o lateral (Mobile) */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gray-200 transform md:-translate-x-1/2 rounded-full"></div>

          {MILESTONES.map((milestone, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={index}
                className={`relative flex flex-col md:flex-row items-center w-full mb-16 md:mb-24 ${isEven ? "md:flex-row-reverse" : ""}`}
              >
                {/* Espacio vacío para empujar al otro lado en Desktop */}
                <div className="hidden md:block w-1/2"></div>

                {/* Marcador Central (Icono circular) */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
                  className={`absolute left-8 md:left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full border-4 border-white shadow-lg flex items-center justify-center z-10 ${milestone.color}`}
                >
                  {milestone.icon}
                </motion.div>

                {/* Tarjeta de Contenido con efecto 3D */}
                <div className="w-full md:w-1/2 pl-24 md:pl-0">
                  <div
                    className={`flex ${isEven ? "md:justify-start md:pl-16" : "md:justify-end md:pr-16"}`}
                  >
                    {/* Contenedor de perspectiva 3D */}
                    <div
                      style={{ perspective: "1000px" }}
                      className="w-full max-w-lg"
                    >
                      <motion.div
                        initial={{
                          opacity: 0,
                          rotateX: 45,
                          y: 50,
                          rotateY: isEven ? -15 : 15, // Efecto de bisagra 3D
                        }}
                        whileInView={{
                          opacity: 1,
                          rotateX: 0,
                          y: 0,
                          rotateY: 0,
                        }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{
                          duration: 0.8,
                          type: "spring",
                          bounce: 0.3,
                        }}
                        className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 hover:shadow-2xl transition-shadow"
                      >
                        <div className="text-nyg-red font-black text-4xl md:text-5xl mb-2 opacity-20 absolute top-4 right-6">
                          {milestone.year}
                        </div>
                        <h3 className="text-3xl font-black text-nyg-blue mb-1 relative z-10">
                          {milestone.year}
                        </h3>
                        <h4 className="text-xl font-bold text-gray-800 mb-4 relative z-10">
                          {milestone.title}
                        </h4>
                        <p className="text-gray-600 leading-relaxed relative z-10">
                          {milestone.desc}
                        </p>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Timeline;
