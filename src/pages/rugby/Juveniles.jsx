import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Users, Target, ShieldCheck, Dumbbell } from "lucide-react";

// Utilizamos clases estáticas completas para que Tailwind las compile sin problemas
const DIVISIONS = [
  {
    title: "Menores de 19 (M19)",
    desc: "El paso previo al plantel superior. Perfeccionamiento técnico, táctico y físico para la alta competencia.",
    icon: <Target size={32} />,
    iconStyle:
      "text-nyg-blue bg-nyg-blue/10 group-hover:bg-nyg-blue group-hover:text-white group-hover:shadow-lg group-hover:shadow-nyg-blue/30 group-hover:-translate-y-1",
  },
  {
    title: "Menores de 17 (M17)",
    desc: "Consolidación del juego en equipo, toma de decisiones y fortalecimiento del carácter competitivo.",
    icon: <Dumbbell size={32} />,
    iconStyle:
      "text-nyg-red bg-nyg-red/10 group-hover:bg-nyg-red group-hover:text-white group-hover:shadow-lg group-hover:shadow-nyg-red/30 group-hover:-translate-y-1",
  },
  {
    title: "Menores de 16 (M16)",
    desc: "Desarrollo profundo de destrezas individuales y comprensión global de las estructuras de juego.",
    icon: <ShieldCheck size={32} />,
    iconStyle:
      "text-nyg-gold bg-nyg-gold/10 group-hover:bg-nyg-gold group-hover:text-white group-hover:shadow-lg group-hover:shadow-nyg-gold/30 group-hover:-translate-y-1",
  },
  {
    title: "Menores de 15 (M15)",
    desc: "Transición al rugby juvenil. Foco en la seguridad, los fundamentos del deporte y el compromiso grupal.",
    icon: <Users size={32} />,
    iconStyle:
      "text-gray-700 bg-gray-200 group-hover:bg-gray-800 group-hover:text-white group-hover:shadow-lg group-hover:shadow-gray-800/30 group-hover:-translate-y-1",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, type: "spring" } },
};

const Juveniles = () => {
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
            Bloque Juvenil
          </h1>
          <p className="text-xl md:text-2xl text-nyg-red font-bold tracking-widest uppercase">
            Formando el futuro del club
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

        {/* Introducción */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border-t-8 border-nyg-red mb-16 text-center md:text-left flex flex-col md:flex-row items-center gap-8 md:gap-16 overflow-hidden"
        >
          <div className="flex-1 relative z-10">
            <h2 className="text-3xl font-black text-nyg-blue mb-4">
              MÁS QUE UN DEPORTE,
              <br />
              UNA ESCUELA DE VIDA
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-4">
              En el Bloque Juvenil de Natación y Gimnasia (M15 a M19) nos
              enfocamos en formar no solo jugadores de excelencia técnica, sino
              personas íntegras. Es la etapa crucial donde se forja el sentido
              de pertenencia, la disciplina y el amor incondicional por la
              camiseta.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              Nuestros entrenadores trabajan bajo un sistema unificado que
              prepara a los chicos para dar el salto al Plantel Superior,
              manteniendo intactos los valores históricos del club.
            </p>
          </div>

          <div className="shrink-0 w-full md:w-1/3 flex justify-center relative z-10">
            <motion.div
              whileTap={{ scale: 0.95 }}
              animate={{ y: [0, -10, 0] }}
              transition={{
                y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
              }}
              className="cursor-pointer w-56 h-56 md:w-72 md:h-72 flex items-center justify-center"
            >
              <img
                src="/escudos/nyg.png"
                alt="Escudo Natación y Gimnasia"
                className="w-full h-full object-contain drop-shadow-2xl"
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Divisiones */}
        <h3 className="text-3xl font-black text-center text-nyg-blue mb-12 uppercase tracking-tight">
          Nuestras Divisiones
        </h3>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {DIVISIONS.map((div, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 flex flex-col h-full group hover:-translate-y-2"
            >
              <div className="flex items-center gap-5 mb-4">
                <div
                  className={`p-4 rounded-xl transition-all duration-300 ${div.iconStyle}`}
                >
                  {div.icon}
                </div>
                <h4 className="text-2xl font-black text-gray-800">
                  {div.title}
                </h4>
              </div>
              <p className="text-gray-600 leading-relaxed text-lg pl-1">
                {div.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Contacto (Formato Abierto) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 pt-16 border-t border-gray-200 text-center relative pb-10"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-8">
            <div className="w-12 h-2 bg-nyg-red rounded-full"></div>
          </div>

          <h2 className="text-4xl md:text-5xl font-black text-nyg-blue mb-6 uppercase tracking-tight">
            ¿Querés sumarte al club?
          </h2>
          <p className="text-gray-500 text-xl md:text-2xl font-light max-w-2xl mx-auto mb-10 leading-relaxed">
            Vení a entrenar con nosotros. Sin importar tu experiencia previa,
            en Natación y Gimnasia siempre hay lugar para vos.
          </p>
          <Link
            to="/contacto"
            className="inline-block border-2 border-nyg-red text-nyg-red font-black text-lg px-12 py-4 rounded-full hover:bg-nyg-red hover:text-white transition-colors duration-300 uppercase tracking-widest shadow-sm"
          >
            Contactar a Coordinación
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Juveniles;
