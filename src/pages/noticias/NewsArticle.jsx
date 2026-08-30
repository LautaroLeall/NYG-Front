import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Calendar, Tag, User, Share2 } from "lucide-react";

const NewsArticle = () => {
  const { slug } = useParams();

  // Mock data temporal
  const article = {
    title: "¡Triunfazo en el clásico de la fecha!",
    category: "Rugby",
    date: "29 AGO 2026",
    author: "Prensa NYG",
    img: "/img-club5.png",
    content: `
      <p>En una tarde soñada a pleno sol en nuestras instalaciones, el Plantel Superior de Natación y Gimnasia logró una victoria fundamental frente a uno de los clásicos rivales de la provincia, afianzándose en los puestos de arriba del Anual Tucumano.</p>
      
      <p>El partido fue durísimo desde el minuto cero. La visita planteó un juego físico cerrado con sus forwards, intentando asfixiar la salida de los nuestros. Sin embargo, la defensa de los Blancos estuvo implacable, con un porcentaje de tackle del 92% en la primera mitad.</p>
      
      <h3>El momento clave</h3>
      <p>A falta de 5 minutos para el final, y con el marcador 21-21, una excelente jugada combinada de los backs terminó en un penal forzado a cinco yardas del in-goal visitante. Nuestro apertura no dudó: pidió palos, y con una frialdad absoluta, sentenció el 24-21 definitivo que hizo estallar a toda la tribuna.</p>
      
      <blockquote>"Este grupo se merece estas alegrías. Venimos entrenando durísimo martes, jueves y sábados. Sabíamos que iba a ser un partido de ajedrez y lo supimos resolver con cabeza fría en los momentos calientes", declaró el capitán post partido.</blockquote>
      
      <p>Ahora, la mirada está puesta en el próximo sábado, donde el equipo deberá viajar para defender la racha ganadora. ¡Vamos Blancos!</p>
    `,
  };

  return (
    <div className="w-full bg-white pb-32">
      {/* Portada */}
      <div
        className="relative h-[60vh] min-h-125 flex items-end justify-center bg-center bg-cover"
        style={{ backgroundImage: `url('${article.img}')` }}
      >
        <div className="absolute inset-0 bg-linear-to-t from-gray-900 via-gray-900/60 to-transparent"></div>

        <div className="absolute top-28 left-4 md:left-8 z-20">
          <Link
            to="/noticias"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white font-bold bg-black/20 hover:bg-black/40 backdrop-blur-md px-5 py-2 rounded-full transition-all text-sm uppercase tracking-wider border border-white/10"
          >
            <ArrowLeft size={16} /> Volver a Noticias
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 w-full max-w-4xl mx-auto px-4 pb-16"
        >
          <div className="flex flex-wrap items-center gap-4 text-sm font-bold text-gray-300 uppercase tracking-widest mb-6">
            <span className="bg-nyg-red text-white px-3 py-1 rounded-full">
              {article.category}
            </span>
            <span className="flex items-center gap-1">
              <Calendar size={14} /> {article.date}
            </span>
            <span className="flex items-center gap-1">
              <User size={14} /> {article.author}
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight drop-shadow-lg">
            {article.title}
          </h1>
        </motion.div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 relative z-20 flex flex-col md:flex-row gap-12">
        {/* Sidebar Social (Desktop) */}
        <div className="hidden md:flex flex-col gap-4 w-16 shrink-0 pt-4">
          <div className="sticky top-32 flex flex-col gap-4">
            <button className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-nyg-blue hover:text-white transition-colors">
              <Share2 size={20} />
            </button>
          </div>
        </div>

        {/* Contenido de la nota */}
        <motion.article
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="prose prose-lg prose-blue max-w-none w-full
            prose-headings:font-black prose-headings:text-nyg-blue
            prose-p:text-gray-600 prose-p:leading-relaxed
            prose-a:text-nyg-red prose-a:no-underline hover:prose-a:underline
            prose-blockquote:border-l-nyg-red prose-blockquote:bg-gray-50 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:not-italic prose-blockquote:text-gray-700 prose-blockquote:rounded-r-2xl
          "
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </div>
    </div>
  );
};

export default NewsArticle;
