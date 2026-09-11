import { motion } from "framer-motion";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Tag, User, Share2, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "../../api/axiosConfig";
import dayjs from "dayjs";
import "dayjs/locale/es";
dayjs.locale("es");

const NewsArticle = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(`/api/news/${slug}`);
        setArticle(res.data.data);
      } catch (error) {
        console.error("Error al cargar la noticia:", error);
        // Si no existe, redirigir al listado
        navigate("/noticias");
      } finally {
        setIsLoading(false);
      }
    };
    fetchArticle();
  }, [slug, navigate]);

  if (isLoading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-12 h-12 text-nyg-blue animate-spin" />
      </div>
    );
  }

  if (!article) return null;

  return (
    <div className="w-full bg-white pb-32">
      {/* Portada */}
      <div
        className="relative h-[60vh] min-h-125 flex items-end justify-center bg-center bg-cover bg-gray-100"
        style={{
          backgroundImage: article.imageUrl
            ? `url('${article.imageUrl}')`
            : "none",
        }}
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
              <Calendar size={14} />{" "}
              {dayjs(article.publishDate).format("DD MMM YYYY")}
            </span>
            <span className="flex items-center gap-1">
              <User size={14} /> {article.author || "Prensa NYG"}
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight drop-shadow-lg mb-4">
            {article.title}
          </h1>
          {article.subtitle && (
            <p className="text-xl md:text-2xl text-gray-300 font-medium">
              {article.subtitle}
            </p>
          )}
        </motion.div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 relative z-20 flex flex-col md:flex-row gap-12">
        {/* Sidebar Social (Desktop) */}
        <div className="hidden md:flex flex-col gap-4 w-16 shrink-0 pt-4">
          <div className="sticky top-32 flex flex-col gap-4">
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: article.title,
                    url: window.location.href,
                  });
                }
              }}
              className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-nyg-blue hover:text-white transition-colors"
            >
              <Share2 size={20} />
            </button>
          </div>
        </div>

        {/* Contenido de la nota */}
        <motion.article
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="prose prose-lg prose-blue max-w-none w-full wrap-break-word overflow-hidden
            prose-headings:font-black prose-headings:text-nyg-blue
            prose-p:text-gray-600 prose-p:leading-relaxed
            prose-a:text-nyg-red prose-a:no-underline hover:prose-a:underline
          "
        >
          {article.content.split("\n").map((paragraph, index) => {
            if (!paragraph.trim()) return <br key={index} />;
            return <p key={index}>{paragraph}</p>;
          })}
        </motion.article>
      </div>
    </div>
  );
};

export default NewsArticle;
