import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ShieldCheck, Mail, Lock, AlertCircle, Loader2 } from "lucide-react";
import { useAuthStore } from "../../../store/authStore";
import axios from "axios";

const loginSchema = z.object({
  email: z.string().email({ message: "Debe ser un email válido" }),
  password: z
    .string()
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
});

const Login = () => {
  const navigate = useNavigate();
  const setCredentials = useAuthStore((state) => state.setCredentials);
  const [authError, setAuthError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    setAuthError("");

    try {
      // Conexión real con el backend
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email: data.email,
          password: data.password,
        },
        {
          withCredentials: true, // Importante para recibir la cookie del refresh token
        },
      );

      // El backend devuelve { accessToken, user, message }
      setCredentials(res.data.user, res.data.accessToken);
      navigate("/admin");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setAuthError(
          "Credenciales incorrectas. Verifique su email y contraseña.",
        );
      } else {
        setAuthError(
          error.response?.data?.message || "Error de conexión con el servidor.",
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden bg-[url('/img-club1.png')] bg-cover bg-center bg-fixed">
      {/* Capa superpuesta blanca para mantener la luminosidad del diseño */}
      <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-0"></div>

      {/* Elemento decorativo sutil (opcional) */}
      <div className="absolute top-0 left-0 w-full h-96 bg-linear-to-b from-nyg-blue/10 to-transparent z-0"></div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center"
        >
          <div className="w-28 h-28 flex items-center justify-center p-2 relative overflow-hidden group">
            <div className="absolute inset-0"></div>
            <img
              src="/escudo_nyg.png"
              alt="Escudo NYG"
              className="w-full h-full object-contain drop-shadow-md relative z-10"
            />
          </div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mt-6 text-center text-4xl font-black text-nyg-blue uppercase tracking-wider drop-shadow-sm"
        >
          Acceso Staff
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-2 text-center text-sm font-bold text-nyg-gold uppercase tracking-widest"
        >
          Natación y Gimnasia
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-12 sm:mx-auto sm:w-full sm:max-w-md relative z-10"
      >
        <div className="bg-white py-10 px-6 shadow-2xl sm:rounded-4xl sm:px-12 border border-gray-100">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 ml-2">
                Correo Electrónico
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  {...register("email")}
                  className={`block w-full pl-12 bg-gray-50 border-2 ${
                    errors.email ? "border-nyg-red" : "border-transparent"
                  } rounded-full py-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-nyg-blue sm:text-sm transition-all shadow-inner font-medium`}
                  placeholder="admin@nygrugby.com"
                />
              </div>
              {errors.email && (
                <p className="mt-2 text-xs font-bold text-nyg-red flex items-center gap-1 ml-2">
                  <AlertCircle size={14} /> {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 ml-2">
                Contraseña
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  {...register("password")}
                  className={`block w-full pl-12 bg-gray-50 border-2 ${
                    errors.password ? "border-nyg-red" : "border-transparent"
                  } rounded-full py-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-nyg-blue sm:text-sm transition-all shadow-inner font-medium`}
                  placeholder="••••••••"
                />
              </div>
              {errors.password && (
                <p className="mt-2 text-xs font-bold text-nyg-red flex items-center gap-1 ml-2">
                  <AlertCircle size={14} /> {errors.password.message}
                </p>
              )}
            </div>

            {authError && (
              <div className="rounded-2xl bg-red-50 border border-nyg-red p-4 flex items-start gap-3 mt-4">
                <AlertCircle className="h-5 w-5 text-nyg-red mt-0.5 shrink-0" />
                <p className="text-sm text-nyg-red font-bold">{authError}</p>
              </div>
            )}

            <div className="pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-4 px-4 rounded-full shadow-lg text-sm font-black uppercase tracking-widest text-white bg-nyg-blue hover:bg-nyg-red hover:shadow-xl hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-nyg-blue/30 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <Loader2 className="animate-spin h-5 w-5" />
                ) : (
                  "Ingresar"
                )}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
