import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Calendar, Tag, ArrowRight, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "../../api/axiosConfig";
import dayjs from "dayjs";
import "dayjs/locale/es";
dayjs.locale("es");

const CATEGORIES = [
  "Todas",
  "Institucional",
  "Rugby",
  "Hockey",
  "Infantiles",
  "Club",
];

const NewsFeed = () => {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("Todas");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    fetchNews(1, true);
  }, [activeCategory]);

  const fetchNews = async (pageNumber, reset = false) => {
    try {
      setIsLoading(true);
      const url = `/api/news?page=${pageNumber}&limit=10${
        activeCategory !== "Todas" ? `&category=${activeCategory}` : ""
      }`;
      const res = await axios.get(url);
      const newItems = res.data.data;

      if (reset) {
        setNews(newItems);
      } else {
        setNews((prev) => [...prev, ...newItems]);
      }

      setHasMore(res.data.pagination && res.data.pagination.next);
      setPage(pageNumber);
    } catch (error) {
      console.error("Error al cargar noticias", error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMore = () => {
    if (hasMore && !isLoading) {
      fetchNews(page + 1);
    }
  };

  // Separar la nota destacada (la primera del array o la primera marcada como destacada)
  const featuredNews = news.find((n) => n.isFeatured) || news[0];
  const regularNews = featuredNews
    ? news.filter((n) => n._id !== featuredNews._id)
    : [];

  return (
    <div className="w-full bg-gray-50 pb-32 min-h-screen">
      {/* Cabecera */}
      <div
        className="relative h-[55vh] min-h-87.5 flex items-center justify-center bg-center bg-cover"
        style={{ backgroundImage: "url('/img-club5.png')" }}
      >
        <div className="absolute inset-0 bg-nyg-blue/85 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-linear-to-t from-nyg-blue to-transparent opacity-80"></div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-4 mt-16"
        >
          <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-wider drop-shadow-lg mb-4">
            Noticias
          </h1>
          <p className="text-xl md:text-2xl text-nyg-gold font-light tracking-wide">
            Toda la actualidad del club
          </p>
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20">
        {/* Filtros Llamativos (Tipográficos y Elegantes) */}
        <div className="bg-white rounded-2xl shadow-xl p-4 md:p-6 mb-16 flex overflow-x-auto hide-scrollbar gap-8 md:gap-12 items-center md:justify-center border border-gray-100">
          {CATEGORIES.map((cat, idx) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={idx}
                onClick={() => setActiveCategory(cat)}
                className={`relative whitespace-nowrap text-lg md:text-xl font-black uppercase tracking-widest transition-all duration-300 ${
                  isActive
                    ? "text-nyg-red"
                    : "text-gray-400 hover:text-nyg-blue"
                }`}
              >
                {cat}
                {isActive && (
                  <motion.div
                    layoutId="activeFilter"
                    className="absolute -bottom-2 left-0 right-0 h-1 bg-nyg-red rounded-full"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {news.length === 0 && !isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24"
          >
            <Tag className="mx-auto h-16 w-16 text-gray-200 mb-6" />
            <h3 className="text-3xl font-black text-gray-400 uppercase tracking-wider">
              Sin Noticias
            </h3>
            <p className="text-gray-400 mt-3 font-medium text-lg">
              No hay artículos publicados en esta categoría.
            </p>
          </motion.div>
        )}

        {/* Noticia Destacada (Immersiva / Estilo Portada de Revista) */}
        {featuredNews && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full relative h-125 md:h-150 rounded-4xl overflow-hidden mb-16 group cursor-pointer"
          >
            {/* Imagen de Fondo */}
            <div className="absolute inset-0 bg-nyg-blue">
              {featuredNews.imageUrl && (
                <img
                  src={featuredNews.imageUrl}
                  alt={featuredNews.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              )}
            </div>

            {/* Degradados */}
            <div className="absolute inset-0 bg-linear-to-t from-gray-900 via-gray-900/40 to-transparent opacity-90"></div>
            <div className="absolute inset-0 bg-linear-to-r from-gray-900/80 via-transparent to-transparent opacity-80"></div>

            {/* Etiqueta Destacada */}
            {featuredNews.isFeatured && (
              <div className="absolute top-6 right-6 md:top-8 md:right-8 bg-nyg-red text-white px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                Destacada
              </div>
            )}

            {/* Contenido Flotante */}
            <div className="absolute inset-0 p-8 md:p-16 flex flex-col justify-end">
              <div className="flex items-center gap-4 text-xs font-black text-white/80 uppercase tracking-widest mb-4">
                <span className="text-nyg-gold">{featuredNews.category}</span>
                <span className="w-1 h-1 rounded-full bg-white/50"></span>
                <span>
                  {dayjs(featuredNews.publishDate).format("DD MMM YYYY")}
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-[1.1] max-w-4xl drop-shadow-lg group-hover:text-nyg-gold transition-colors">
                <Link to={`/noticias/${featuredNews.slug}`}>
                  {featuredNews.title}
                </Link>
              </h2>

              <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-8 max-w-3xl line-clamp-2 md:line-clamp-3">
                {featuredNews.subtitle}
              </p>

              <Link
                to={`/noticias/${featuredNews.slug}`}
                className="inline-flex items-center gap-3 text-white font-black uppercase tracking-widest hover:text-nyg-gold transition-colors w-max"
              >
                Leer Artículo{" "}
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-2 transition-transform"
                />
              </Link>
            </div>
          </motion.div>
        )}

        {/* Listado Editorial Clásico (Sin Cards) */}
        {regularNews.length > 0 && (
          <div className="flex flex-col gap-12 border-t-2 border-gray-100 pt-12">
            {regularNews.map((item, index) => (
              <motion.article
                key={item._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                className="group flex flex-col md:flex-row gap-8 items-center"
              >
                {/* Imagen del Artículo */}
                <Link
                  to={`/noticias/${item.slug}`}
                  className="w-full md:w-5/12 lg:w-4/12 h-64 md:h-56 relative overflow-hidden rounded-2xl bg-gray-100 shrink-0"
                >
                  {item.imageUrl && (
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  )}
                  {/* Etiqueta de Categoría Flotante (estilo bandera) */}
                  <div className="absolute top-0 left-0 bg-nyg-blue text-white px-4 py-2 text-xs font-black uppercase tracking-widest rounded-br-2xl">
                    {item.category}
                  </div>
                  {item.isFeatured && (
                    <div className="absolute bottom-4 right-4 bg-nyg-gold text-nyg-black w-8 h-8 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-lg">★</span>
                    </div>
                  )}
                </Link>

                {/* Texto del Artículo */}
                <div className="w-full md:w-7/12 lg:w-8/12 flex flex-col justify-center">
                  <div className="flex items-center gap-3 text-xs font-black text-gray-400 mb-4 uppercase tracking-widest">
                    <Calendar size={14} className="text-nyg-red" />
                    {dayjs(item.publishDate).format("DD MMM YYYY")}
                  </div>

                  <h3 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 leading-[1.15] group-hover:text-nyg-blue transition-colors line-clamp-2">
                    <Link to={`/noticias/${item.slug}`}>{item.title}</Link>
                  </h3>

                  <p className="text-gray-500 text-lg mb-6 line-clamp-3 leading-relaxed">
                    {item.subtitle}
                  </p>

                  <Link
                    to={`/noticias/${item.slug}`}
                    className="inline-flex items-center gap-2 text-nyg-red font-black uppercase tracking-widest hover:text-red-800 transition-colors w-max"
                  >
                    Leer Más{" "}
                    <ArrowRight
                      size={18}
                      className="group-hover:translate-x-2 transition-transform"
                    />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        )}

        {/* Cargar más o Loader */}
        <div className="mt-20 mb-10 text-center border-t border-gray-100 pt-16">
          {isLoading && news.length > 0 && (
            <div className="flex justify-center mb-6">
              <Loader2 className="w-10 h-10 text-nyg-red animate-spin" />
            </div>
          )}
          {hasMore && !isLoading && (
            <button
              onClick={loadMore}
              className="group relative inline-flex items-center justify-center px-12 py-4 font-black uppercase tracking-widest text-white transition-all bg-nyg-blue rounded-full hover:bg-gray-900 active:scale-95"
            >
              Cargar más noticias
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsFeed;
