import { ArrowRight, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../../api/axiosConfig";
import dayjs from "dayjs";
import "dayjs/locale/es";
dayjs.locale("es");

const FeaturedNews = () => {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedNews = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get("/api/news/destacadas");
        setNews(res.data.data || []);
      } catch (error) {
        console.error("Error fetching featured news", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFeaturedNews();
  }, []);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-nyg-blue mb-2">
              Noticias Destacadas
            </h2>
            <p className="text-gray-600">Enterate de la actualidad del club.</p>
          </div>
          <Link
            to="/noticias"
            className="hidden md:flex items-center gap-2 text-nyg-red font-semibold hover:text-red-700 transition-colors"
          >
            Ver todas <ArrowRight size={20} />
          </Link>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 text-nyg-red animate-spin" />
          </div>
        ) : news.length === 0 ? (
          <div className="text-center py-12 text-gray-500 bg-white rounded-2xl shadow-sm border border-gray-100">
            No hay noticias destacadas en este momento.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {news.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow flex flex-col border border-gray-100 group"
              >
                <div className="h-48 relative overflow-hidden bg-nyg-blue">
                  {item.imageUrl && (
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  )}
                </div>
                <div className="p-6 flex flex-col grow relative bg-white z-10">
                  <div className="flex justify-between items-center text-xs text-gray-500 mb-3">
                    <span className="font-bold text-nyg-red uppercase tracking-wider">
                      {item.category}
                    </span>
                    <span>{dayjs(item.publishDate).format("DD MMM YYYY")}</span>
                  </div>
                  <h3 className="text-xl font-bold text-nyg-blue mb-4 leading-snug line-clamp-2">
                    {item.title}
                  </h3>
                  <Link
                    to={`/noticias/${item.slug}`}
                    className="mt-auto text-nyg-red hover:text-red-700 font-semibold inline-flex items-center gap-1"
                  >
                    Leer nota <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedNews;
