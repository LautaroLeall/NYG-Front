import React, { useState, useEffect } from "react";
import { ShieldAlert, Loader2 } from "lucide-react";
import axios from "../../api/axiosConfig";

const AlertasList = () => {
  const [alerts, setAlerts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const res = await axios.get("/api/stats/alerts");
        if (res.data.success) {
          setAlerts(res.data.data);
        }
      } catch (error) {
        console.error("Error fetching alerts", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAlerts();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-nyg-blue uppercase tracking-widest flex items-center gap-3">
          <ShieldAlert className="w-8 h-8" /> Alertas Disciplinarias
        </h1>
        <p className="text-sm font-bold text-gray-400 tracking-wider">
          Jugadores con tarjetas amarillas o rojas acumuladas
        </p>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-nyg-blue" />
          </div>
        ) : alerts.length === 0 ? (
          <div className="p-12 text-center text-gray-400 font-bold">
            No hay jugadores con tarjetas registradas.
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {alerts.map((alert, idx) => (
              <div
                key={idx}
                className={`p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-gray-50 transition-colors ${alert.redCards > 0 ? "bg-red-50/20" : ""}`}
              >
                <div className="flex items-center gap-4">
                  {alert.player?.imageUrl ? (
                    <img
                      src={alert.player.imageUrl}
                      className="w-12 h-12 rounded-full border-2 border-white shadow-sm object-cover object-top"
                      alt="Jugador"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-nyg-blue text-white flex items-center justify-center font-bold shadow-sm border-2 border-white">
                      {alert.player?.name ? alert.player.name.charAt(0) : "J"}
                    </div>
                  )}
                  <div>
                    <h4 className="font-black text-gray-900 text-lg">
                      {alert.player?.name}
                    </h4>
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
                      {alert.player?.category || "Plantel Superior"}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {alert.redCards > 0 && (
                    <span className="bg-nyg-red text-white text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-sm">
                      {alert.redCards} Roja{alert.redCards > 1 ? "s" : ""}
                    </span>
                  )}
                  {alert.yellowCards > 0 && (
                    <span className="bg-amber-500 text-white text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-sm">
                      {alert.yellowCards} Amarilla
                      {alert.yellowCards > 1 ? "s" : ""}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AlertasList;
