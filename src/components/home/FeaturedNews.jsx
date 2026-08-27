import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const MOCK_NEWS = [
  {
    id: 1,
    title: "Victoria histórica en el clásico del fin de semana",
    image: "/img-club5.png",
    date: "25 Ago 2026",
    category: "Rugby",
  },
  {
    id: 2,
    title: "Las infantiles estrenan la nueva cancha sintética",
    image: "/img-club6.png",
    date: "20 Ago 2026",
    category: "Institucional",
  },
  {
    id: 3,
    title: "Nuevas convocatorias a los seleccionados nacionales",
    image: "/img-club3.png",
    date: "18 Ago 2026",
    category: "Hockey",
  },
];

const FeaturedNews = () => {
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {MOCK_NEWS.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow flex flex-col border border-gray-100"
            >
              <div
                className="h-48 bg-cover bg-center transition-transform hover:scale-105"
                style={{ backgroundImage: `url(${item.image})` }}
              ></div>
              <div className="p-6 flex flex-col grow relative bg-white z-10">
                <div className="flex justify-between items-center text-xs text-gray-500 mb-3">
                  <span className="font-bold text-nyg-red uppercase tracking-wider">
                    {item.category}
                  </span>
                  <span>{item.date}</span>
                </div>
                <h3 className="text-xl font-bold text-nyg-blue mb-4 leading-snug">
                  {item.title}
                </h3>
                <Link
                  to={`/noticias/${item.id}`}
                  className="mt-auto text-nyg-red hover:text-red-700 font-semibold inline-flex items-center gap-1"
                >
                  Leer nota <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedNews;
