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

const Palmares = () => {
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
            Palmarés
          </h1>
          <p className="text-xl md:text-2xl text-nyg-red font-bold tracking-widest uppercase">
            Nuestra Vitrina de Gloria
          </p>
        </motion.div>
      </div>

      {/* Contenido sin cards */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <Link
          to="/el-club"
          className="inline-flex items-center gap-2 text-nyg-red font-semibold hover:text-red-700 mb-10 transition-colors"
        >
          <ArrowLeft size={20} /> Volver a El Club
        </Link>

        {/* Contenedor Abierto tipo Museo */}
        <div className="space-y-32">
          {/* Campeonato Anual Tucumano */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row items-center gap-12 md:gap-20 border-b border-gray-100 pb-24"
          >
            <div className="w-full md:w-1/3 flex flex-col items-center justify-center text-center">
              <motion.div
                animate={{ rotateY: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="mb-6 relative"
              >
                <div className="absolute inset-0 bg-nyg-gold opacity-20 blur-2xl rounded-full"></div>
                <Trophy
                  size={140}
                  strokeWidth={1}
                  className="text-nyg-gold relative z-10"
                />
              </motion.div>
              <h2 className="text-8xl md:text-9xl font-black text-gray-100 tracking-tighter -mt-6 relative z-0">
                10
              </h2>
              <p className="text-nyg-blue font-black tracking-widest uppercase text-xl md:text-2xl -mt-8 relative z-10">
                Títulos
              </p>
            </div>

            <div className="w-full md:w-2/3">
              <div className="flex flex-wrap gap-2 mb-6">
                {[...Array(10)].map((_, i) => (
                  <Star
                    key={i}
                    className="text-nyg-gold fill-nyg-gold"
                    size={24}
                  />
                ))}
              </div>
              <h3 className="text-4xl md:text-6xl font-black text-nyg-blue uppercase tracking-tight mb-6 leading-none">
                Campeonato <br />
                <span className="text-nyg-red">Anual Tucumano</span>
              </h3>
              <p className="text-xl md:text-2xl text-gray-500 font-light leading-relaxed mb-10">
                El certamen más prestigioso y tradicional de la provincia nos ha
                visto coronarnos campeones en 10 ocasiones, marcando distintas
                épocas doradas de la institución.
              </p>

              <div className="flex flex-wrap gap-x-6 gap-y-4">
                {ANUAL_YEARS.map((year, idx) => (
                  <span
                    key={idx}
                    className="text-3xl md:text-4xl font-black text-gray-300 hover:text-nyg-blue transition-colors cursor-default"
                  >
                    {year}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Torneo Regional del NOA */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row-reverse items-center gap-12 md:gap-20 pb-12"
          >
            <div className="w-full md:w-1/3 flex flex-col items-center justify-center text-center">
              <motion.div
                animate={{ rotateY: -360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="mb-6 relative"
              >
                <div className="absolute inset-0 bg-nyg-red opacity-20 blur-2xl rounded-full"></div>
                <Award
                  size={140}
                  strokeWidth={1}
                  className="text-nyg-red relative z-10"
                />
              </motion.div>
              <h2 className="text-8xl md:text-9xl font-black text-gray-100 tracking-tighter -mt-6 relative z-0">
                1
              </h2>
              <p className="text-nyg-blue font-black tracking-widest uppercase text-xl md:text-2xl -mt-8 relative z-10">
                Título
              </p>
            </div>

            <div className="w-full md:w-2/3 md:text-right">
              <div className="flex flex-wrap md:justify-end gap-2 mb-6">
                <Star className="text-nyg-red fill-nyg-red" size={28} />
              </div>
              <h3 className="text-4xl md:text-6xl font-black text-nyg-blue uppercase tracking-tight mb-6 leading-none">
                Torneo Regional <br />
                <span className="text-nyg-gold">del NOA</span>
              </h3>
              <p className="text-xl md:text-2xl text-gray-500 font-light leading-relaxed mb-10 md:ml-auto md:max-w-xl">
                En 2017 el club alcanzó la gloria máxima a nivel regional,
                conquistando el noroeste argentino y cortando una sequía de 21
                años sin títulos con un equipo inolvidable.
              </p>

              <div className="flex flex-wrap md:justify-end gap-x-6 gap-y-4">
                {REGIONAL_YEARS.map((year, idx) => (
                  <span
                    key={idx}
                    className="text-3xl md:text-4xl font-black text-gray-300 hover:text-nyg-red transition-colors cursor-default"
                  >
                    {year}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Palmares;
