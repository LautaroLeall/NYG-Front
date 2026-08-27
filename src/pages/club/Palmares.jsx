import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Trophy, Star, Award } from "lucide-react";

const ANUAL_YEARS = [
  "1947",
  "1949",
  "1955",
  "1957",
  "1961",
  "1995",
  "1996",
  "2021",
  "2024",
  "2026",
];
const REGIONAL_YEARS = ["2017"];

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.9 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, type: "spring", bounce: 0.4 },
  },
};

const Palmares = () => {
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
            Palmarés
          </h1>
          <p className="text-xl md:text-2xl text-nyg-red font-bold tracking-widest uppercase">
            Nuestra Vitrina de Gloria
          </p>
        </motion.div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <Link
          to="/el-club"
          className="inline-flex items-center gap-2 text-nyg-red font-semibold hover:text-red-700 mb-10 transition-colors"
        >
          <ArrowLeft size={20} /> Volver a El Club
        </Link>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {/* Tarjeta 1: Campeonato Anual */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -10 }}
            className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl border-t-8 border-nyg-gold relative overflow-hidden flex flex-col items-center text-center transition-all duration-300"
          >
            {/* Fondo decorativo sutil */}
            <Trophy
              className="absolute -bottom-10 -right-10 text-gray-50 opacity-40 transform -rotate-12"
              size={250}
            />

            <div className="relative z-10 w-full flex flex-col items-center">
              {/* Icono Flotante */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 3,
                  ease: "easeInOut",
                }}
                className="w-24 h-24 bg-linear-to-br from-yellow-50 to-yellow-100 rounded-full flex items-center justify-center text-nyg-gold mb-6 shadow-inner"
              >
                <Trophy size={48} />
              </motion.div>

              <h2 className="text-3xl font-black text-nyg-blue leading-tight mb-2">
                Campeonato <br />
                Anual Tucumano
              </h2>
              <p className="text-nyg-gold font-bold uppercase tracking-widest text-sm mb-6">
                10 Títulos
              </p>

              <div className="flex flex-wrap justify-center gap-1.5 mb-6">
                {[...Array(10)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, type: "spring" }}
                  >
                    <Star className="text-nyg-gold fill-nyg-gold" size={22} />
                  </motion.div>
                ))}
              </div>

              <p className="text-gray-500 mb-8 text-sm leading-relaxed px-4">
                El certamen más prestigioso y tradicional de la provincia nos ha
                visto coronarnos campeones en 10 ocasiones, marcando distintas
                épocas doradas.
              </p>

              <div className="flex flex-wrap justify-center gap-2 mt-auto w-full">
                {ANUAL_YEARS.map((year, idx) => (
                  <span
                    key={idx}
                    className="bg-nyg-blue text-white px-4 py-1.5 text-sm rounded-full font-bold shadow-sm hover:bg-nyg-gold transition-colors cursor-default"
                  >
                    {year}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Tarjeta 2: Torneo Regional */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -10 }}
            className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl border-t-8 border-nyg-red relative overflow-hidden flex flex-col items-center text-center transition-all duration-300"
          >
            {/* Fondo decorativo sutil */}
            <Award
              className="absolute -bottom-10 -left-10 text-gray-50 opacity-40 transform rotate-12"
              size={250}
            />

            <div className="relative z-10 w-full flex flex-col items-center h-full">
              {/* Icono Flotante */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 3.5,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
                className="w-24 h-24 bg-linear-to-br from-red-50 to-red-100 rounded-full flex items-center justify-center text-nyg-red mb-6 shadow-inner"
              >
                <Award size={48} />
              </motion.div>

              <h2 className="text-3xl font-black text-nyg-blue leading-tight mb-2">
                Torneo Regional <br />
                del NOA
              </h2>
              <p className="text-nyg-red font-bold uppercase tracking-widest text-sm mb-6">
                1 Título
              </p>

              <div className="flex flex-wrap justify-center gap-1.5 mb-6">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, type: "spring" }}
                >
                  <Star className="text-nyg-red fill-nyg-red" size={32} />
                </motion.div>
              </div>

              <p className="text-gray-500 mb-8 text-sm leading-relaxed px-4">
                En 2017 el club alcanzó la gloria máxima a nivel regional,
                conquistando el noroeste argentino y cortando una sequía de 21
                años sin festejos.
              </p>

              <div className="flex flex-wrap justify-center gap-2 mt-auto w-full">
                {REGIONAL_YEARS.map((year, idx) => (
                  <span
                    key={idx}
                    className="bg-nyg-red text-white px-8 py-2 text-lg rounded-full font-black shadow-sm hover:bg-nyg-gold transition-colors cursor-default"
                  >
                    {year}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Palmares;
