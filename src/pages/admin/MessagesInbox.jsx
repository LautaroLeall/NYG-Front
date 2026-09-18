import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Check, AlertCircle, Loader2 } from "lucide-react";
import axios from "../../api/axiosConfig";
import toast from "react-hot-toast";
import dayjs from "dayjs";

const MessagesInbox = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get("/api/contact");
      setMessages(res.data.data);
    } catch (error) {
      toast.error("Error al cargar mensajes");
    } finally {
      setIsLoading(false);
    }
  };

  const markAsRead = async (id) => {
    try {
      await axios.patch(`/api/contact/${id}/read`);
      toast.success("Mensaje marcado como leído");
      fetchMessages();
    } catch (error) {
      toast.error("Error al actualizar estado");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="w-10 h-10 animate-spin text-nyg-blue" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-nyg-blue uppercase tracking-widest flex items-center gap-3">
          <Mail className="w-8 h-8" /> Bandeja de Entrada
        </h1>
        <p className="text-sm font-bold text-gray-400 tracking-wider">
          Mensajes recibidos desde el formulario Sumate
        </p>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        {messages.length === 0 ? (
          <div className="p-12 text-center text-gray-400 font-bold">
            No hay mensajes recibidos aún.
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {messages.map((msg) => (
              <div
                key={msg._id}
                className={`p-6 flex flex-col md:flex-row gap-6 hover:bg-gray-50 transition-colors ${msg.status === "Pendiente" ? "bg-blue-50/30" : ""}`}
              >
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3">
                    {msg.status === "Pendiente" ? (
                      <span className="bg-nyg-red text-white text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-md">
                        Nuevo
                      </span>
                    ) : (
                      <span className="bg-gray-200 text-gray-500 text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-md">
                        Leído
                      </span>
                    )}
                    <span className="font-bold text-gray-900">{msg.name}</span>
                    <span className="text-sm text-gray-400">
                      • {dayjs(msg.createdAt).format("DD MMM YYYY, HH:mm")}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <div>
                      <span className="text-gray-400">Email:</span>{" "}
                      <a
                        href={`mailto:${msg.email}`}
                        className="font-bold text-nyg-blue hover:underline"
                      >
                        {msg.email}
                      </a>
                    </div>
                    <div>
                      <span className="text-gray-400">Teléfono:</span>{" "}
                      <span className="font-bold">{msg.phone}</span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-gray-400">Motivo:</span>{" "}
                      <span className="font-bold bg-nyg-gold/20 text-nyg-gold px-2 py-0.5 rounded">
                        {msg.type}
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-700 whitespace-pre-wrap p-4 bg-white border border-gray-100 rounded-xl shadow-inner text-sm">
                    {msg.message}
                  </p>
                </div>

                <div className="flex md:flex-col justify-end gap-3">
                  {msg.status === "Pendiente" && (
                    <button
                      onClick={() => markAsRead(msg._id)}
                      className="bg-nyg-blue hover:bg-blue-900 text-white p-3 rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 text-sm font-bold"
                    >
                      <Check size={18} /> Marcar Leído
                    </button>
                  )}
                  <a
                    href={`https://wa.me/${msg.phone.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-[#25D366] hover:bg-[#1ebd5a] text-white p-3 rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 text-sm font-bold text-center"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesInbox;
