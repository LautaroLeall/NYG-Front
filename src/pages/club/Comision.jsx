import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const DIRECTIVA = [
  { role: "Presidente", name: "Dr. Juan Pérez" },
  { role: "Vicepresidente", name: "Ing. Carlos Gómez" },
  { role: "Secretario", name: "Lic. Roberto Silva" },
  { role: "Prosecretario", name: "Martín López" },
  { role: "Tesorero", name: "Cr. Diego Torres" },
  { role: "Protesorero", name: "Javier Rodríguez" },
];

const VOCALES = [
  "Ana Martínez",
  "Luis Fernández",
  "Mario Sánchez",
  "Elena Rojas",
  "Fernando Vega",
];

const Comision = () => {
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
            Comisión Directiva
          </h1>
          <p className="text-xl md:text-2xl text-nyg-red font-bold tracking-widest uppercase">
            Gestión 2026 - 2028
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

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <p className="text-2xl font-light text-gray-500 mb-16 leading-relaxed">
            Nuestra Comisión Directiva está formada por un grupo de socios
            comprometidos con el crecimiento sostenido de la institución,
            trabajando ad honorem para llevar al club a lo más alto.
          </p>

          {/* Lista de la mesa directiva */}
          <div className="space-y-6 border-l-4 border-nyg-red pl-6 md:pl-8">
            {DIRECTIVA.map((miembro, idx) => (
              <div
                key={idx}
                className="flex flex-col md:flex-row md:items-baseline justify-between border-b border-gray-100 pb-4 last:border-0"
              >
                <span className="text-lg md:text-xl font-bold text-gray-400 uppercase tracking-widest">
                  {miembro.role}
                </span>
                <span className="text-2xl md:text-3xl font-black text-nyg-blue">
                  {miembro.name}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Vocales */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 pt-16 border-t border-gray-200"
        >
          <h3 className="text-2xl font-black text-nyg-red uppercase tracking-widest mb-8">
            Vocales Titulares y Suplentes
          </h3>
          <div className="flex flex-wrap gap-x-8 gap-y-4">
            {VOCALES.map((vocal, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-nyg-gold"></div>
                <span className="text-xl font-bold text-gray-700">{vocal}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Comision;
