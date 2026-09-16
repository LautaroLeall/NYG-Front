import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const STAFF_DATA = {
  superior: {
    title: "Plantel Superior (Rugby)",
    groups: [
      {
        title: "Staff 2026",
        members: [
          { role: "Head Coach", name: "Cristian Fernandez" },
          { role: "Revisor General", name: "Pablo Brainovich" },
          {
            role: "Entrenadores de Forwards",
            name: "Ramon Sanchez, Guillermo Villagra, El okdy Ezequiel",
          },
          {
            role: "Entrenadores de Backs",
            name: "Enrique Brizuela, Salustiano Vergara, Nahuel Majolli",
          },
          {
            role: "Preparadores Fisicos",
            name: "Lucas Espasa, Ariel Abregu, Matias Lencina",
          },
          {
            role: "Managers",
            name: "Horacio Lazarte, Franco Molina, Daniel Robledo, Daniel Caneppa, Alfredo Costa, Gonzalo Toranzo",
          },
        ],
      },
    ],
  },
  juveniles: {
    title: "Bloque Juveniles (Rugby)",
    groups: [
      {
        title: "Categoria M19",
        members: [
          { role: "Head Coach", name: "Pablo Sastre" },
          {
            role: "Entrenadores Forwards",
            name: "Raul Basilio, Diego Juarez, Rodrigo Garcia",
          },
          {
            role: "Entrenadores Backs",
            name: "Gonzalo Garcia Aguilar, Esteban Ferre, Martin Barros, Alvaro Zelarayan",
          },
          { role: "PF", name: "Sofia Lomenzo" },
          {
            role: "Managers",
            name: "Marcelo Macias, Martin Cardozo, Eugenia Paz, Pedro Porta",
          },
        ],
      },
      {
        title: "Categoria M17",
        members: [
          { role: "Head Coach", name: "Mauricio Alvarez" },
          {
            role: "Entrenadores Forwards",
            name: "Pablo Rodriguez, Daniel Acosta, Esteban Hoyos",
          },
          { role: "Entrenadores Backs", name: "Esteban Hoyos" },
          { role: "PF", name: "Santiago Molinero" },
          {
            role: "Managers",
            name: "Maxi Vionnet, Sergio Rodriguez, Martin Balceda",
          },
        ],
      },
      {
        title: "Categoria M16",
        members: [
          { role: "Head Coach", name: "Leandro Marquesto" },
          {
            role: "Entrenadores Forwards",
            name: "Juan Serra, Raul Vega, Enzo Perez Santos",
          },
          {
            role: "Entrenadores Backs",
            name: "Santiago Musumecci, Juan Araoz",
          },
          { role: "PF", name: "Juan Araoz" },
          {
            role: "Managers",
            name: "Belen Tarcaya, Alfredo Ramasco, Juan Pablo Araoz Martinez, Alejandro Davalos",
          },
        ],
      },
      {
        title: "Categoria M15",
        members: [
          { role: "Head Coach", name: "Pablo Martinez" },
          {
            role: "Entrenadores Forwards",
            name: "Mauricio Diarte, Silvio Ibarra, Juan Terraf",
          },
          {
            role: "Entrenadores Backs",
            name: "Ezequiel Herrera, Jorge Perondi",
          },
          { role: "PF", name: "Alejandra Quiroga" },
          { role: "Managers", name: "Alejandra Coronel, Pablo Perez" },
        ],
      },
    ],
  },
  infantiles: {
    title: "Rugby Infantil",
    groups: [
      {
        title: "Coordinacion",
        members: [
          { role: "Coordinador Gral. y Rep. URT", name: "Santiago Ahumada" },
          { role: "CoordinaciÃ³n Pre Juveniles", name: "Alejandro Rodriguez" },
          { role: "Coordinador Infantiles", name: "Gonzalo Perez Rojas" },
        ],
      },
      {
        title: "Categoria M14",
        members: [
          {
            role: "Entrenadores",
            name: "Rodrigo Nieto, Ricardo Ascarate, Augusto Altobelli, Lisandro Balbi",
          },
          { role: "Managers", name: "Mariana Lopez, Jorge Navarro" },
        ],
      },
      {
        title: "Categoria M13",
        members: [
          {
            role: "Entrenadores",
            name: "Lucas Rodriguez, Martin Cajal, Agustin Garcia",
          },
          { role: "Managers", name: "Celeste Caselles" },
        ],
      },
      {
        title: "Categoria M12",
        members: [
          {
            role: "Entrenadores",
            name: "Alejandro Rodriguez, Daniel Ibañez, Ivan Suarez",
          },
          { role: "Managers", name: "Diego Corbalan" },
        ],
      },
      {
        title: "Categoria M11",
        members: [
          { role: "Entrenadores", name: "Jose Rubino, Osvaldo Martin" },
          { role: "Managers", name: "Ivana Luna" },
        ],
      },
      {
        title: "Categoria M10",
        members: [
          {
            role: "Entrenadores",
            name: "Gaston Rocha, Franco Canal, Hernando Gomez",
          },
          { role: "Managers", name: "Julia Varela Acosta" },
        ],
      },
      {
        title: "Categoria M9",
        members: [
          { role: "Entrenadores", name: "Ezequiel Soria, Dario Perea" },
          { role: "Managers", name: "Olga Abregu" },
        ],
      },
      {
        title: "Categoria M8",
        members: [
          { role: "Entrenadores", name: "Hernan Arch, Manuel Ruiz" },
          { role: "Managers", name: "Luciana Velazquez" },
        ],
      },
      {
        title: "Categorias M5, M6 y M7",
        members: [
          {
            role: "Entrenadores",
            name: "Gonzalo Perez Rojas, Miguel Saade, Facundo Diaz Alvillos",
          },
          { role: "Managers", name: "Luciana Velazquez" },
        ],
      },
    ],
  },
};

const CuerpoTecnico = () => {
  const [activeTab, setActiveTab] = useState("superior");

  return (
    <div className="w-full bg-gray-50 pb-20 overflow-hidden">
      {/* Cabecera / Hero alineado con Historia */}
      <div
        className="relative h-[50vh] min-h-87.5 flex items-center justify-center bg-center bg-cover md:bg-fixed"
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
            Cuerpo Técnico
          </h1>
          <p className="text-xl md:text-2xl text-nyg-red font-bold tracking-widest uppercase">
            Los formadores del club
          </p>
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <Link
          to="/el-club"
          className="inline-flex items-center gap-2 text-nyg-red font-semibold hover:text-red-700 mb-10 transition-colors"
        >
          <ArrowLeft size={20} /> Volver a El Club
        </Link>

        {/* Selector de Categorías (Tabs) */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 flex justify-center"
        >
          <div className="flex flex-wrap items-center justify-center gap-2 bg-white p-1.5 rounded-full shadow-lg border border-gray-100">
            {Object.keys(STAFF_DATA).map((key) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`px-5 py-2 rounded-full font-bold uppercase tracking-widest text-xs md:text-sm transition-all duration-300 ${
                  activeTab === key
                    ? "bg-nyg-blue text-white shadow-md"
                    : "bg-transparent text-gray-400 hover:text-nyg-blue hover:bg-gray-50"
                }`}
              >
                {STAFF_DATA[key].title}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Contenido Activo */}
        <div className="min-h-[50vh]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-10"
            >
              {STAFF_DATA[activeTab].groups.map((group, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100"
                >
                  <h2 className="text-2xl font-black text-nyg-blue uppercase tracking-tight mb-8 border-b-2 border-gray-100 pb-4">
                    {group.title}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8 pl-2">
                    {group.members.map((member, i) => (
                      <div
                        key={i}
                        className="flex flex-col border-l-4 border-nyg-gold pl-4"
                      >
                        <span className="text-xs font-bold text-nyg-red uppercase tracking-widest mb-1.5">
                          {member.role}
                        </span>
                        <div className="text-sm font-black text-gray-800 leading-relaxed">
                          {member.name.split(",").map((name, index) => (
                            <span key={index} className="block">
                              {name.trim()}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default CuerpoTecnico;
