import { motion } from "framer-motion";
import HeroScene from "../components/3d/HeroScene";

const Home = () => {
  return (
    <div
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-center bg-cover bg-no-repeat"
      style={{ backgroundImage: "url('/img-club1.png')" }}
    >
      {/* Capa de oscurecimiento (Overlay) para que el texto resalte perfecto */}
      <div className="absolute inset-0 bg-linear-to-b from-[#0A192F]/80 via-black/50 to-[#0A192F]/90 z-0"></div>

      {/* Fondo 3D interactivo (Partículas y efectos sobre la foto) */}
      <div className="absolute inset-0 z-0">
        <HeroScene />
      </div>

      {/* Contenido Frontal superpuesto al 3D y a la foto */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto pointer-events-none mt-16">
        {/* Título Principal */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white tracking-tight drop-shadow-[0_5px_15px_rgba(0,0,0,0.8)] mb-6 uppercase">
            Club Natación y Gimnasia
          </h1>
        </motion.div>

        {/* Subtítulo */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
        >
          <p className="text-xl md:text-3xl text-gray-200 font-light drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)] mb-10">
            Más de un siglo de gloria,{" "}
            <span className="text-red-500 font-bold">pasión</span> y valores.
          </p>
        </motion.div>

        {/* Botón Call to Action */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1, ease: "backOut" }}
          className="pointer-events-auto"
        >
          <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-10 rounded-full shadow-[0_0_20px_rgba(220,38,38,0.6)] transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(220,38,38,1)] active:scale-95 text-lg cursor-pointer">
            Asociate Hoy
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
