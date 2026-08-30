import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Calendar, Tag, ArrowRight } from "lucide-react";

// Mock data (hasta que conectemos con el endpoint GET /api/news)
const MOCK_NEWS = [
  {
    id: 1,
    slug: "triunfo-historico-primera",
    title: "¡Triunfazo en el clásico de la fecha!",
    category: "Rugby",
    date: "29 AGO 2026",
    img: "/img-club5.png",
    summary:
      "La Primera bajó al puntero en un partido electrizante que se definió en la última jugada con un penal histórico de nuestro apertura.",
    featured: true,
  },
  {
    id: 2,
    slug: "obras-cancha-auxiliar",
    title: "Avanzan las obras en el anexo",
    category: "Institucional",
    date: "15 AGO 2026",
    img: "/img-club2.png",
    summary:
      "Comenzó la remoción de tierra en la cancha auxiliar. El sueño de renovar nuestras instalaciones sigue en marcha gracias al apoyo de los socios.",
  },
  {
    id: 3,
    slug: "encuentro-infantiles-2026",
    title: "Encuentro Regional de Infantiles",
    category: "Infantiles",
    date: "10 AGO 2026",
    img: "/img-club4.png",
    summary:
      "Recibiremos a más de 1500 chicos de toda la provincia y la región en una jornada espectacular a puro deporte, juego y amistad.",
  },
  {
    id: 4,
    slug: "convocatoria-seleccion-tucumana",
    title: "Tres jugadores convocados al seleccionado",
    category: "Rugby",
    date: "02 AGO 2026",
    img: "/img-club1.png",
    summary:
      "Orgullo inmenso para el club: tres de nuestros baluartes fueron llamados para defender la camiseta Naranja en el próximo Campeonato Argentino.",
  },
];

const NewsFeed = () => {
  const featuredNews = MOCK_NEWS.find((n) => n.featured) || MOCK_NEWS[0];
  const regularNews = MOCK_NEWS.filter((n) => !n.featured);

  return (
    <div className="w-full bg-gray-50 pb-32">
      {/* Cabecera */}
      <div className="bg-nyg-blue pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/img-club1.png')] opacity-10 bg-cover bg-center mix-blend-overlay"></div>
        <div className="max-w-6xl mx-auto relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black text-white uppercase tracking-wider drop-shadow-sm mb-4"
          >
            Noticias
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl text-nyg-gold font-bold tracking-widest uppercase"
          >
            Toda la actualidad del club
          </motion.p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        {/* Filtros (Visuales por ahora) */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {["Todas", "Institucional", "Rugby", "Infantiles", "Club"].map(
            (cat, idx) => (
              <button
                key={idx}
                className={`px-6 py-2 rounded-full font-bold text-sm uppercase tracking-wider transition-colors shadow-sm ${idx === 0 ? "bg-nyg-red text-white" : "bg-white text-gray-600 hover:bg-gray-100"}`}
              >
                {cat}
              </button>
            ),
          )}
        </div>

        {/* Noticia Destacada */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-4xl shadow-2xl overflow-hidden mb-12 group cursor-pointer border border-gray-100 flex flex-col md:flex-row"
        >
          <div className="md:w-1/2 h-64 md:h-auto relative overflow-hidden">
            <img
              src={featuredNews.img}
              alt={featuredNews.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute top-4 left-4 bg-nyg-red text-white px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest shadow-md">
              Destacada
            </div>
          </div>
          <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
            <div className="flex items-center gap-4 text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
              <span className="flex items-center gap-1 text-nyg-blue">
                <Tag size={14} /> {featuredNews.category}
              </span>
              <span className="flex items-center gap-1">
                <Calendar size={14} /> {featuredNews.date}
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 group-hover:text-nyg-red transition-colors leading-tight">
              <Link to={`/noticias/${featuredNews.slug}`}>
                {featuredNews.title}
              </Link>
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              {featuredNews.summary}
            </p>
            <Link
              to={`/noticias/${featuredNews.slug}`}
              className="inline-flex items-center gap-2 text-nyg-blue font-black uppercase tracking-wider hover:text-nyg-red transition-colors w-max"
            >
              Leer Nota Completa <ArrowRight size={18} />
            </Link>
          </div>
        </motion.div>

        {/* Grilla de Noticias */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularNews.map((news) => (
            <motion.div
              key={news.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl shadow-lg overflow-hidden group hover:shadow-2xl transition-all hover:-translate-y-1 border border-gray-100 flex flex-col"
            >
              <Link
                to={`/noticias/${news.slug}`}
                className="block h-48 relative overflow-hidden"
              >
                <img
                  src={news.img}
                  alt={news.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-nyg-blue/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  {news.category}
                </div>
              </Link>
              <div className="p-6 md:p-8 flex-1 flex flex-col">
                <div className="flex items-center gap-2 text-xs font-bold text-gray-400 mb-3 uppercase tracking-wider">
                  <Calendar size={14} /> {news.date}
                </div>
                <h3 className="text-2xl font-black text-gray-800 mb-3 leading-tight group-hover:text-nyg-blue transition-colors">
                  <Link to={`/noticias/${news.slug}`}>{news.title}</Link>
                </h3>
                <p className="text-gray-500 mb-6 flex-1">{news.summary}</p>
                <Link
                  to={`/noticias/${news.slug}`}
                  className="inline-flex items-center gap-1.5 text-sm font-black text-nyg-red hover:text-red-700 uppercase tracking-widest mt-auto"
                >
                  Leer Más <ArrowRight size={16} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Cargar más */}
        <div className="mt-16 text-center">
          <button className="bg-white border-2 border-gray-200 text-gray-500 font-bold uppercase tracking-widest px-8 py-3 rounded-full hover:border-nyg-blue hover:text-nyg-blue transition-colors">
            Cargar más noticias
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsFeed;
