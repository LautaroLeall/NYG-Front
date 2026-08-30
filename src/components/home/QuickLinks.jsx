import { Users, BarChart2, Trophy, Image as ImageIcon } from "lucide-react";
import { Link } from "react-router-dom";

const LINKS = [
  {
    title: "Planteles",
    icon: <Users size={32} />,
    to: "/rugby/plantel-superior",
    color: "bg-nyg-red text-white",
  },
  {
    title: "Estadísticas",
    icon: <BarChart2 size={32} />,
    to: "/rugby/estadisticas",
    color: "bg-white text-nyg-blue border border-gray-200",
  },
  {
    title: "Posiciones",
    icon: <Trophy size={32} />,
    to: "/rugby/posiciones",
    color: "bg-white text-nyg-blue border border-gray-200",
  },
  {
    title: "Galería",
    icon: <ImageIcon size={32} />,
    to: "/el-club/instalaciones",
    color: "bg-nyg-blue text-white",
  },
];

const QuickLinks = () => {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {LINKS.map((link, idx) => (
            <Link
              key={idx}
              to={link.to}
              className={`flex flex-col items-center justify-center p-6 md:p-8 rounded-2xl hover:-translate-y-2 transition-transform shadow-sm hover:shadow-md ${link.color}`}
            >
              <div className="mb-4 opacity-90">{link.icon}</div>
              <span className="font-bold text-lg">{link.title}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuickLinks;
