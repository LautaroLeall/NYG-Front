import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, Users, Trophy, Heart } from "lucide-react";
import SponsorsBar from "../../components/home/SponsorsBar";
import axios from "../../api/axiosConfig";

const Sumate = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    type: "Jugador",
    message: "",
  });
  const [status, setStatus] = useState("idle");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      await axios.post("/api/contact", formData);
      setStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        type: "Jugador",
        message: "",
      });
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-nyg-white overflow-hidden pb-16">
      {/* Hero Section */}
      <div
        className="relative h-[55vh] min-h-87.5 flex items-center justify-center bg-center bg-cover"
        style={{ backgroundImage: "url('/img-club2.png')" }}
      >
        <div className="absolute inset-0 bg-nyg-blue/85 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-linear-to-t from-nyg-blue to-transparent opacity-80"></div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-4 mt-16"
        >
          <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-wider drop-shadow-lg mb-4">
            Sumate al <span className="text-nyg-red">Club</span>
          </h1>
          <p className="text-xl md:text-2xl text-nyg-gold font-light tracking-wide">
            Formá parte de la familia de Natación y Gimnasia.
            <br />
            Ya sea para jugar al rugby, hockey, o acompañarnos como sponsor, te
            estamos esperando.
          </p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mb-15 -mt-16 relative z-20">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Columna Izquierda: Información / Beneficios */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100"
            >
              <h3 className="text-2xl font-black text-nyg-blue uppercase tracking-wide mb-6">
                ¿Por qué elegir <span className="text-nyg-red">NyG?</span>
              </h3>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-50 text-nyg-blue flex items-center justify-center shrink-0">
                    <Trophy size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">
                      Historia y Prestigio
                    </h4>
                    <p className="text-sm text-gray-500 mt-1">
                      Más de 85 años formando grandes jugadores y mejores
                      personas en la provincia.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-red-50 text-nyg-red flex items-center justify-center shrink-0">
                    <Users size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Comunidad</h4>
                    <p className="text-sm text-gray-500 mt-1">
                      Un ambiente familiar y seguro donde la amistad y el
                      respeto son nuestros pilares fundamentales.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-yellow-50 text-nyg-gold flex items-center justify-center shrink-0">
                    <Heart size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">
                      Pasión por el Deporte
                    </h4>
                    <p className="text-sm text-gray-500 mt-1">
                      Entrenadores capacitados y dedicados al desarrollo físico
                      y humano de cada jugador.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Columna Derecha: Formulario */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-3 bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100"
          >
            <div className="mb-8">
              <h2 className="text-3xl font-black text-gray-900 mb-2">
                Completá tus datos
              </h2>
              <p className="text-gray-500 font-medium">
                Nos pondremos en contacto con vos a la brevedad.
              </p>
            </div>

            {status === "success" ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center py-16"
              >
                <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                  <CheckCircle size={48} />
                </div>
                <h3 className="text-3xl font-black text-gray-800 mb-3">
                  ¡Mensaje enviado!
                </h3>
                <p className="text-gray-500 text-lg max-w-sm mx-auto">
                  Gracias por contactarte con el Club. Te responderemos pronto.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-8 bg-nyg-blue text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-900 transition-colors shadow-lg"
                >
                  Enviar otro mensaje
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-black text-gray-700 uppercase tracking-widest mb-2">
                      Nombre Completo <span className="text-nyg-red">*</span>
                    </label>
                    <input
                      required
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full p-4 bg-gray-50 border-2 border-gray-100 rounded-xl focus:outline-none focus:border-nyg-blue focus:bg-white transition-colors"
                      placeholder="Juan Pérez"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-black text-gray-700 uppercase tracking-widest mb-2">
                      Teléfono <span className="text-nyg-red">*</span>
                    </label>
                    <input
                      required
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full p-4 bg-gray-50 border-2 border-gray-100 rounded-xl focus:outline-none focus:border-nyg-blue focus:bg-white transition-colors"
                      placeholder="381 123 4567"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-black text-gray-700 uppercase tracking-widest mb-2">
                      Correo Electrónico <span className="text-nyg-red">*</span>
                    </label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full p-4 bg-gray-50 border-2 border-gray-100 rounded-xl focus:outline-none focus:border-nyg-blue focus:bg-white transition-colors"
                      placeholder="juan@ejemplo.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-black text-gray-700 uppercase tracking-widest mb-2">
                      Motivo de Contacto <span className="text-nyg-red">*</span>
                    </label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      className="w-full p-4 bg-gray-50 border-2 border-gray-100 rounded-xl focus:outline-none focus:border-nyg-blue focus:bg-white transition-colors font-bold text-gray-700"
                    >
                      <option value="Jugador">
                        Quiero jugar (Rugby/Hockey)
                      </option>
                      <option value="Sponsor">Quiero ser Sponsor</option>
                      <option value="Otro">Otra consulta</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-black text-gray-700 uppercase tracking-widest mb-2">
                    Mensaje <span className="text-nyg-red">*</span>
                  </label>
                  <textarea
                    required
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    className="w-full p-4 bg-gray-50 border-2 border-gray-100 rounded-xl focus:outline-none focus:border-nyg-blue focus:bg-white transition-colors resize-none"
                    placeholder="Escribí tu mensaje acá..."
                  ></textarea>
                </div>

                {status === "error" && (
                  <div className="bg-red-50 text-nyg-red p-4 rounded-xl text-sm font-bold border border-red-100 flex items-center justify-center">
                    Hubo un error al enviar el mensaje. Por favor intentá
                    nuevamente.
                  </div>
                )}

                <button
                  disabled={status === "loading"}
                  type="submit"
                  className="w-full bg-nyg-red hover:bg-red-700 text-white font-black uppercase tracking-widest py-5 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3 disabled:opacity-70 mt-4 text-lg"
                >
                  {status === "loading" ? "Enviando..." : "Enviar Mensaje"}{" "}
                  <Send size={22} />
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>

      {/* Sponsors */}
      <SponsorsBar />
    </div>
  );
};

export default Sumate;
