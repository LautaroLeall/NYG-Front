import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const CountdownCentenario = () => {
  const [daysRemaining, setDaysRemaining] = useState(0);

  useEffect(() => {
    // Calculamos los días hasta el 1 de Enero de 2030
    const targetDate = new Date("2030-01-01T00:00:00");
    const today = new Date();
    const difference = targetDate.getTime() - today.getTime();

    // Convertimos milisegundos a días
    setDaysRemaining(Math.ceil(difference / (1000 * 3600 * 24)));
  }, []);

  return (
    <section className="relative py-24 bg-nyg-blue overflow-hidden">
      {/* Fondo con marca de agua usando la foto del club */}
      <div
        className="absolute inset-0 bg-center bg-cover opacity-10 mix-blend-screen"
        style={{ backgroundImage: "url('/img-club5.png')" }}
      ></div>

      {/* Contenido Frontal */}
      <div className="max-w-5xl mx-auto px-4 relative z-10 text-center">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-nyg-gold mb-8 uppercase tracking-widest drop-shadow-lg">
          #RumboAlCentenario
        </h2>

        <div className="flex flex-col md:flex-row justify-center items-center md:items-baseline gap-2 md:gap-4 mb-8">
          <span className="text-8xl md:text-[150px] font-black text-white leading-none drop-shadow-2xl">
            {daysRemaining}
          </span>
          <span className="text-3xl md:text-5xl text-gray-300 font-light uppercase tracking-widest">
            días
          </span>
        </div>

        <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-12 font-light leading-relaxed">
          Estamos cada vez más cerca de cumplir 100 años haciendo historia. Sé
          parte de la gran familia de Natación y Gimnasia.
        </p>

        <Link
          to="/el-club/historia"
          className="inline-block bg-nyg-gold hover:bg-yellow-500 text-nyg-blue font-black py-4 px-12 rounded-full transition-all hover:scale-105 shadow-[0_0_20px_rgba(212,175,55,0.4)] text-lg uppercase tracking-wider"
        >
          Conocé Nuestra Historia
        </Link>
      </div>
    </section>
  );
};

export default CountdownCentenario;
