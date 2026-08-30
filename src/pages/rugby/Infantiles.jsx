import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Smile, Heart, Shield, Users } from "lucide-react";

// Icono personalizado de Pelota de Rugby (SVG)
const RugbyBallIcon = ({ size = 24, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <ellipse cx="12" cy="12" rx="6" ry="11" transform="rotate(45 12 12)" />
    <path d="M8.5 8.5 L15.5 15.5" />
    <path d="M10 9 L11.5 10.5" />
    <path d="M12 11 L13.5 12.5" />
    <path d="M14 13 L15.5 14.5" />
  </svg>
);

// Clases de Tailwind estáticas para evitar que desaparezcan con el hover
const PILARES = [
  {
    title: "Diversión",
    desc: "El objetivo número uno. A través del juego lúdico, los chicos aprenden a amar el deporte sin presiones.",
    icon: <Smile size={36} />,
    iconStyle:
      "text-nyg-blue bg-nyg-blue/10 group-hover:bg-nyg-blue group-hover:text-white",
  },
  {
    title: "Seguridad",
    desc: "Entrenadores capacitados para enseñar técnicas seguras de contacto y caídas, priorizando el bienestar.",
    icon: <Shield size={36} />,
    iconStyle:
      "text-nyg-red bg-nyg-red/10 group-hover:bg-nyg-red group-hover:text-white",
  },
  {
    title: "Amistad",
    desc: "En el club no hacemos solo equipos, forjamos camadas de amigos que los acompañarán para toda la vida.",
    icon: <Users size={36} />,
    iconStyle:
      "text-nyg-gold bg-nyg-gold/10 group-hover:bg-nyg-gold group-hover:text-white",
  },
  {
    title: "Familia",
    desc: "El rugby infantil no existe sin los padres. Somos un club familiar donde el Tercer Tiempo se vive todos juntos.",
    icon: <Heart size={36} />,
    iconStyle:
      "text-red-500 bg-red-100 group-hover:bg-red-500 group-hover:text-white",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, type: "spring" },
  },
};

const Infantiles = () => {
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
            Rugby Infantil
          </h1>
          <p className="text-xl md:text-2xl text-nyg-red font-bold tracking-widest uppercase">
            Amigos para toda la vida
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

        {/* Introducción Libre (Sin Card) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24 text-center relative max-w-4xl mx-auto px-4"
        >
          {/* Decoración: Pelota de Rugby gigante y sutil de fondo */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="absolute -top-10 -right-10 md:-right-20 text-nyg-blue/5 z-0"
          >
            <RugbyBallIcon size={250} />
          </motion.div>

          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-black text-nyg-blue mb-8 uppercase tracking-tight">
              Jugar, Aprender y Compartir
            </h2>
            <div className="w-24 h-2 bg-nyg-red mx-auto mb-8 rounded-full"></div>

            <p className="text-gray-700 text-xl md:text-2xl leading-relaxed mb-6 font-medium">
              Nuestras divisiones infantiles abarcan desde la{" "}
              <strong className="text-nyg-blue font-black">
                M6 (Escuelita)
              </strong>{" "}
              hasta la <strong className="text-nyg-blue font-black">M14</strong>
              . Es el espacio más alegre e importante del club, donde los chicos
              dan sus primeros pasos con una pelota ovalada.
            </p>
            <p className="text-gray-500 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
              No buscamos resultados deportivos; buscamos sonrisas de chicos
              corriendo y padres orgullosos compartiendo mates a un costado de
              la cancha.
            </p>
          </div>
        </motion.div>

        {/* Pilares del Rugby Infantil */}
        <h3 className="text-3xl font-black text-center text-nyg-blue mb-12 uppercase tracking-tight">
          Nuestros Pilares
        </h3>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {PILARES.map((pilar, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all hover:-translate-y-2 flex flex-col items-center text-center group"
            >
              <div
                className={`p-5 rounded-full mb-6 transition-colors duration-300 shadow-inner ${pilar.iconStyle}`}
              >
                {pilar.icon}
              </div>
              <h4 className="text-2xl font-black text-gray-800 mb-3">
                {pilar.title}
              </h4>
              <p className="text-gray-500 leading-relaxed">{pilar.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA para Padres (Formato Abierto) */}
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
            Traé a tu hijo al club
          </h2>
          <p className="text-gray-500 text-xl md:text-2xl font-light max-w-2xl mx-auto mb-10 leading-relaxed">
            Vení a probar un entrenamiento sin compromiso. Te aseguramos que él
            va a encontrar un grupo espectacular, y vos, una gran familia.
          </p>
          <Link
            to="/contacto"
            className="inline-block border-2 border-nyg-red text-nyg-red font-black text-lg px-12 py-4 rounded-full hover:bg-nyg-red hover:text-white transition-colors duration-300 uppercase tracking-widest shadow-sm"
          >
            Consultar Horarios
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Infantiles;
