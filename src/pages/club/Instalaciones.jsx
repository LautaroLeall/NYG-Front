import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, MapPin } from "lucide-react";

const FACILITIES = [
  {
    id: 1,
    name: "Cancha Principal de Rugby",
    desc: "Césped natural cuidado al milímetro, tribuna local y medidas oficiales UAR. El corazón histórico donde se viven los clásicos de los sábados.",
    img: "/img-club1.png",
  },
  {
    id: 2,
    name: "Cancha de Sintético (Hockey)",
    desc: "Superficie de agua de nivel internacional, preparada para competencias de primera categoría. Un orgullo para el desarrollo de la disciplina.",
    img: "/img-club2.png",
  },
  {
    id: 3,
    name: "Gimnasio de Alto Rendimiento",
    desc: "Equipamiento de última generación exclusivo para la preparación física de nuestros planteles superiores y juveniles.",
    img: "/img-club3.png",
  },
  {
    id: 4,
    name: "El Quincho y Tercer Tiempo",
    desc: "El punto de encuentro por excelencia de toda la familia blanca, roja y azul. Capacidad para 300 personas, cantina y sector de asadores.",
    img: "/img-club4.png",
  },
];

const Instalaciones = () => {
  return (
    <div className="w-full bg-white pb-20">
      {/* Cabecera / Hero alineado con Historia */}
      <div
        className="relative h-[50vh] min-h-87.5 flex items-center justify-center bg-center bg-cover bg-fixed"
        style={{ backgroundImage: "url('/img-club5.png')" }}
      >
        <div className="absolute inset-0 bg-nyg-blue/90 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-linear-to-t from-white to-transparent opacity-100"></div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-4 mt-20"
        >
          <h1 className="text-5xl md:text-7xl font-black text-nyg-blue uppercase tracking-wider drop-shadow-sm mb-4">
            Instalaciones
          </h1>
          <p className="text-xl md:text-2xl text-nyg-red font-bold tracking-widest uppercase">
            Nuestra Casa
          </p>
        </motion.div>
      </div>

      {/* Contenido sin cards */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <Link
          to="/el-club"
          className="inline-flex items-center gap-2 text-nyg-red font-semibold hover:text-red-700 mb-10 transition-colors"
        >
          <ArrowLeft size={20} /> Volver a El Club
        </Link>

        {/* Lista de Instalaciones */}
        <div className="space-y-24">
          {FACILITIES.map((facility, idx) => (
            <motion.div
              key={facility.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className={`flex flex-col ${idx % 2 !== 0 ? "md:flex-row-reverse" : "md:flex-row"} items-center gap-10 md:gap-16`}
            >
              <div className="w-full md:w-1/2">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <div className="absolute inset-0 bg-nyg-blue/10 mix-blend-overlay z-10"></div>
                  <img
                    src={facility.img}
                    alt={facility.name}
                    className="w-full h-80 object-cover hover:scale-105 transition-transform duration-1000"
                  />
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <h3 className="text-3xl md:text-4xl font-black text-nyg-blue mb-6 uppercase tracking-tight leading-tight">
                  {facility.name}
                </h3>
                <p className="text-gray-600 text-lg md:text-xl leading-relaxed border-l-4 border-nyg-red pl-6">
                  {facility.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Ubicación y Mapa */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 pt-16 border-t-2 border-gray-100"
        >
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="w-full md:w-1/2">
              <h2 className="text-4xl font-black text-nyg-blue uppercase tracking-wider mb-6">
                Dónde Estamos
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Av. Benjamín Aráoz 700, San Miguel de Tucumán. <br />
                <br />
                Te esperamos con las puertas abiertas para sumar a toda tu
                familia al club. Nuestras secretarías atienden de Lunes a
                Viernes de 18:00 a 22:00hs.
              </p>
              <button className="bg-nyg-red text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-red-700 transition-colors shadow-lg inline-flex items-center gap-2">
                <MapPin size={20} /> Abrir en Google Maps
              </button>
            </div>

            <div className="w-full md:w-1/2 h-96 rounded-3xl overflow-hidden shadow-xl border border-gray-200 bg-gray-100">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3560.189823843191!2d-65.19085799999999!3d-26.833914099999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94225eaa03d83683%3A0x153ce2927a11461e!2sClub%20Nataci%C3%B3n%20y%20Gimnasia!5e0!3m2!1ses!2sar!4v1787875077518!5m2!1ses!2sar"
                className="w-full h-full border-0"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mapa del Club Natación y Gimnasia"
              ></iframe>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Instalaciones;
