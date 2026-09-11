import React from "react";
import { motion } from "framer-motion";

const SPONSORS = [
  {
    id: 1,
    name: "Macro",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Banco_Macro_logo.svg/2560px-Banco_Macro_logo.svg.png",
  },
  {
    id: 2,
    name: "Gatorade",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Gatorade_logo.svg/1024px-Gatorade_logo.svg.png",
  },
  {
    id: 3,
    name: "Imperial",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Imperial_logo.svg/2560px-Imperial_logo.svg.png",
  },
  {
    id: 4,
    name: "Gilbert",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Gilbert_Rugby_logo.svg/2560px-Gilbert_Rugby_logo.svg.png",
  },
  {
    id: 5,
    name: "OSDE",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/OSDE_logo.svg/2560px-OSDE_logo.svg.png",
  },
];

const SponsorsBar = () => {
  return (
    <section className="py-12 bg-white border-t border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <h3 className="text-center text-sm font-black text-gray-400 uppercase tracking-widest">
          Acompañan al Club
        </h3>
      </div>

      {/* Carrusel infinito css-only para sponsors */}
      <div className="relative w-full flex overflow-x-hidden">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-16 md:gap-32 py-4 px-8">
          {SPONSORS.map((s) => (
            <img
              key={s.id}
              src={s.logo}
              alt={s.name}
              className="h-10 md:h-14 object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer"
            />
          ))}
          {/* Duplicamos para el efecto infinito */}
          {SPONSORS.map((s) => (
            <img
              key={`dup-${s.id}`}
              src={s.logo}
              alt={s.name}
              className="h-10 md:h-14 object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SponsorsBar;
