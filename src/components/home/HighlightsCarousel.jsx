import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

// Datos de prueba (mock)
const MOCK_HIGHLIGHTS = [
  {
    id: 1,
    image: "/img-club2.png",
    title: "#RumboAlCentenario",
    subtitle:
      "Comenzamos a vivir los preparativos para la gran fiesta de los 100 años del club.",
    link: "/el-club/historia",
    tag: "Institucional",
  },
  {
    id: 2,
    image: "/img-club3.png",
    title: "Nueva Indumentaria Oficial",
    subtitle:
      "Conocé la nueva piel del plantel superior para la temporada 2026.",
    link: "/noticias/nueva-camiseta",
    tag: "Rugby",
  },
  {
    id: 3,
    image: "/img-club4.png",
    title: "Clásico de Hockey",
    subtitle:
      "Este sábado recibimos a Universitario en nuestra sede. ¡Vení a alentar!",
    link: "/hockey",
    tag: "Hockey",
  },
];

const HighlightsCarousel = () => {
  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <h2 className="text-3xl md:text-4xl font-extrabold text-nyg-blue mb-2">
          Destacados
        </h2>
        <p className="text-gray-600">
          Novedades y momentos clave de Natación y Gimnasia.
        </p>
      </div>

      {/* Contenedor del Carrusel (Scroll Horizontal Nativo) */}
      <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-6 px-4 sm:px-6 lg:px-8 pb-8 max-w-350 mx-auto">
        {MOCK_HIGHLIGHTS.map((item) => (
          <div
            key={item.id}
            className="relative flex-none w-[85vw] sm:w-[60vw] md:w-[45vw] lg:w-[30vw] h-100 snap-center rounded-2xl overflow-hidden group cursor-pointer shadow-lg"
          >
            {/* Imagen de fondo */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: `url(${item.image})` }}
            ></div>

            {/* Gradiente oscuro para lectura */}
            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent"></div>

            {/* Contenido */}
            <div className="absolute bottom-0 left-0 p-6 w-full flex flex-col justify-end">
              <span className="inline-block bg-nyg-red text-white text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full mb-3 self-start">
                {item.tag}
              </span>
              <h3 className="text-2xl font-bold text-white mb-2 leading-tight">
                {item.title}
              </h3>
              <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                {item.subtitle}
              </p>

              <Link
                to={item.link}
                className="inline-flex items-center gap-2 text-white font-semibold hover:text-nyg-gold transition-colors"
              >
                Leer más <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* CSS extra inyectado para ocultar la scrollbar pero permitir scroll */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `,
        }}
      />
    </section>
  );
};

export default HighlightsCarousel;
