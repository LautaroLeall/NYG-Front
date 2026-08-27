import { Link } from 'react-router-dom';
import { ArrowLeft, Quote } from 'lucide-react';
import { motion } from 'framer-motion';

const Historia = () => {
  return (
    <div className="w-full bg-white pb-24">
      {/* Cabecera / Hero de Historia */}
      <div 
        className="relative h-[50vh] min-h-100 flex items-center justify-center bg-center bg-cover" 
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
            Nuestra Historia
          </h1>
          <p className="text-xl md:text-2xl text-nyg-red font-bold tracking-widest uppercase">
            Desde 1930
          </p>
        </motion.div>
      </div>
      
      {/* Contenido del Artículo */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        
        <Link to="/el-club" className="inline-flex items-center gap-2 text-nyg-red font-semibold hover:text-red-700 mb-10 transition-colors">
          <ArrowLeft size={20} /> Volver a El Club
        </Link>

        <article className="prose prose-lg md:prose-xl prose-blue max-w-none prose-headings:text-nyg-blue prose-p:text-gray-700 prose-p:leading-relaxed">
          
          <motion.p 
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="text-2xl font-light text-gray-500 mb-12 leading-relaxed"
          >
            El Club Natación y Gimnasia es una institución deportiva argentina de <strong className="text-nyg-blue">hockey sobre césped</strong> femenino y <strong className="text-nyg-blue">rugby</strong> masculino con sede en la ciudad de San Miguel de Tucumán.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 id="inicios" className="text-3xl font-extrabold text-nyg-blue border-b-2 border-gray-100 pb-4 mb-6 scroll-mt-24">Los Inicios (1930 - 1939)</h2>
            <p>
              El Club Natación y Gimnasia se fundó el <strong>21 de febrero de 1930</strong> en el local de "Pileta y baños públicos 9 de Julio", hoy Club Tucumán de Gimnasia. La sede propia se plasmó en el solar de Avenida Benjamín Aráoz al 700, y fue inaugurada el <strong>29 de diciembre de 1939</strong>.
            </p>
            <p>
              Las obras se promovieron con gran pompa; por entonces eran las instalaciones más modernas e importantes del norte del país. En su cancha comenzó a jugarse seriamente al rugby y el campo que hoy perdura en la Escuela Universitaria, es testigo del nacimiento de ese deporte en estas tierras.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 id="rugby" className="text-3xl font-extrabold text-nyg-blue border-b-2 border-gray-100 pb-4 mt-12 mb-6 scroll-mt-24">El Establecimiento del Rugby (1941)</h2>
            <p>
              El <strong>17 de julio de 1941</strong> se constituyó la Subcomisión de Rugby de la mano de un socio del club, el profesor Mario Santamarina, un exjugador del San Isidro Club (SIC) de Buenos Aires que había llegado a Tucumán junto a su amigo Girio Berzero. 
            </p>
            <p>
              Acompañados por Isaías Nougués y Mario Leal Santillán, se convirtieron en puntales del nuevo deporte. De ellos fue la idea de poner los primeros arcos en forma de "Hache" y de traer las primeras pelotas ovaladas, con las cuales la juventud tucumana comenzó a desgranar los secretos de este deporte. Así se fueron integrando los equipos que luego permitirían el nacimiento de otros clubes hermanos (Tucumán Rugby, Universitario y Cardenales) y la posterior fundación de la Unión de Rugby del Norte en 1944.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="my-12 p-8 bg-gray-50 rounded-2xl border-l-4 border-nyg-red relative"
          >
            <Quote className="absolute top-4 right-4 text-gray-200" size={60} />
            <p className="italic text-gray-600 mb-0 relative z-10">
              "Hablar de Natación y Gimnasia es recordar también a la familia Ascárate... Toda una dinastía en la historia de nuestro rugby."
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 id="resurgimiento" className="text-3xl font-extrabold text-nyg-blue border-b-2 border-gray-100 pb-4 mt-12 mb-6 scroll-mt-24">Tiempos Difíciles y Resurgimiento</h2>
            <p>
              En 1947, circunstancias de orden político y financiero determinaron la entrega de la sede social a la Universidad Nacional de Tucumán. Sin embargo, lejos de desanimar a sus dirigentes, los que constituían la subcomisión de rugby habilitaron una cancha en la ex Sección Hípica y reiniciaron con esfuerzo el derrotero del club. Comandados por Carlos De La Serna —el hombre de mayor erudición rugbystica en Tucumán en aquel entonces— evitaron que el rugby de Natación se perdiera.
            </p>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 id="actualidad" className="text-3xl font-extrabold text-nyg-blue border-b-2 border-gray-100 pb-4 mt-12 mb-6 scroll-mt-24">Actualidad e Instalaciones</h2>
            <p>
              En la actualidad, contamos con una buena cancha, amplias tribunas y luz artificial, además de un confortable salón. En la década del '90 se sumó el complejo deportivo “Juan Luis Aráoz” (en homenaje a uno de sus más activos dirigentes) de cuatro hectáreas, donde contamos con varias canchas de rugby, hockey y un cómodo quincho.
            </p>
            <p>
              La pujanza de los pioneros se vio premiada con la obtención de diez títulos de primera en los torneos anuales organizados por la URT (1947, 1949, 1955, 1957, 1961, 1995, 1996, 2021, 2024 y 2026) y en un aporte constante de jugadores a los diferentes seleccionados. Su presidente actual, Raúl Basilio, continúa la tradición de dirigentes de gran envergadura.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 id="jugadores" className="text-3xl font-extrabold text-nyg-blue border-b-2 border-gray-100 pb-4 mt-12 mb-8 scroll-mt-24">Jugadores Destacados (Los Pumas)</h2>
            
            <div className="flex flex-wrap justify-center gap-6 not-prose mb-10">
              {/* Jugador 1 */}
              <div className="w-full sm:w-[30%] min-w-[250px] bg-gray-50 rounded-xl p-6 text-center border border-gray-100 hover:shadow-lg transition-shadow">
                <img 
                  src="/omarHasan.png" 
                  alt="Omar Hasan" 
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover shadow-md border-4 border-white" 
                />
                <h4 className="font-bold text-nyg-blue text-lg">Omar Hasan</h4>
                <p className="text-xs text-nyg-red font-bold mb-2">1990–1996</p>
                <p className="text-sm text-gray-600">65 partidos con Los Pumas. Disputó los Mundiales de Gales 1999, Australia 2003 y Francia 2007.</p>
              </div>

              {/* Jugador 2 */}
              <div className="w-full sm:w-[30%] min-w-[250px] bg-gray-50 rounded-xl p-6 text-center border border-gray-100 hover:shadow-lg transition-shadow">
                <img 
                  src="/gabrielAscarate.png" 
                  alt="Gabriel Ascárate" 
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover shadow-md border-4 border-white" 
                />
                <h4 className="font-bold text-nyg-blue text-lg">Gabriel Ascárate</h4>
                <p className="text-xs text-nyg-red font-bold mb-2">2006–2009</p>
                <p className="text-sm text-gray-600">Jugador histórico con participaciones internacionales en Los Pumas y en la franquicia Jaguares.</p>
              </div>

              {/* Jugador 3 */}
              <div className="w-full sm:w-[30%] min-w-[250px] bg-gray-50 rounded-xl p-6 text-center border border-gray-100 hover:shadow-lg transition-shadow">
                <img 
                  src="/javierDiaz.png" 
                  alt="Javier Díaz" 
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover shadow-md border-4 border-white" 
                />
                <h4 className="font-bold text-nyg-blue text-lg">Javier Díaz</h4>
                <p className="text-xs text-nyg-red font-bold mb-2">2015–2017</p>
                <p className="text-sm text-gray-600">Primera línea forjado en nuestro club con gran trayectoria en el seleccionado mayor y Jaguares.</p>
              </div>
              
              {/* Jugador 4 */}
              <div className="w-full sm:w-[30%] min-w-[250px] bg-gray-50 rounded-xl p-6 text-center border border-gray-100 hover:shadow-lg transition-shadow">
                <img 
                  src="/gonzaloGarcia.png" 
                  alt="Gonzalo García" 
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover shadow-md border-4 border-white" 
                />
                <h4 className="font-bold text-nyg-blue text-lg">Gonzalo García</h4>
                <p className="text-xs text-nyg-red font-bold mb-2">Medio Scrum</p>
                <p className="text-sm text-gray-600">Figura en el título Regional NOA 2017. Actual jugador en el Top 14 francés. Debutó en Los Pumas en 2021.</p>
              </div>
            </div>
          </motion.div>
          
        </article>
      </div>
    </div>
  );
};

export default Historia;
