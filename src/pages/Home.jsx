import { motion } from "framer-motion";
import HeroScene from "../components/3d/HeroScene";
import LatestResults from "../components/home/LatestResults";
import HighlightsCarousel from "../components/home/HighlightsCarousel";
import FeaturedNews from "../components/home/FeaturedNews";
import QuickLinks from "../components/home/QuickLinks";
import CountdownCentenario from "../components/home/CountdownCentenario";

const Home = () => {
  return (
    <div className="w-full overflow-x-hidden">
      {/* --- HERO SECTION (100vh) --- */}
      <section
        className="relative w-full h-screen flex items-center justify-center bg-center bg-cover bg-no-repeat"
        style={{ backgroundImage: "url('/img-club1.png')" }}
      >
        {/* Capa de oscurecimiento (Overlay) */}
        <div className="absolute inset-0 bg-linear-to-b from-[#0A192F]/80 via-black/50 to-[#0A192F]/90 z-0"></div>

        {/* Fondo 3D interactivo */}
        <div className="absolute inset-0 z-0">
          <HeroScene />
        </div>

        {/* Contenido Frontal superpuesto */}
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto pointer-events-none mt-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight drop-shadow-[0_5px_15px_rgba(0,0,0,0.8)] mb-6 uppercase leading-tight">
              <span className="block text-2xl md:text-3xl text-gray-300 font-bold mb-2">
                Bienvenido a
              </span>
              <span className="block">Club</span>
              <span className="block">Natación y Gimnasia</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          >
            <p className="text-xl md:text-3xl text-gray-200 font-light drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)] mb-10">
              Primero el <span className="text-red-500 font-bold">Club</span>{" "}
              siempre el <span className="text-blue-500 font-bold">Club</span>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1, ease: "backOut" }}
            className="pointer-events-auto"
          >
            <button className="bg-nyg-gold hover:bg-yellow-500 text-nyg-black font-black py-4 px-10 rounded-full shadow-[0_0_20px_rgba(212,175,55,0.6)] transition-all hover:shadow-[0_0_15px_rgba(212,175,55,1)] active:scale-95 text-lg cursor-pointer">
              Asociate Hoy
            </button>
          </motion.div>
        </div>
      </section>

      {/* --- SECCIONES DE CONTENIDO DE LA PORTADA --- */}

      {/* FE-014: Accesos Rápidos */}
      <QuickLinks />

      {/* FE-011: Últimos Resultados */}
      <LatestResults />

      {/* FE-012: Carrusel de Highlights */}
      <HighlightsCarousel />

      {/* FE-013: Noticias Destacadas */}
      <FeaturedNews />

      {/* FE-015: Campaña Centenario */}
      <CountdownCentenario />
    </div>
  );
};

export default Home;
