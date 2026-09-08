import React, { useEffect, useState } from "react";
import { Loader2, AlertCircle } from "lucide-react";

const SplashScreen = ({ onFinish }) => {
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isTakingLong, setIsTakingLong] = useState(false);

  useEffect(() => {
    let isMounted = true;

    // Si tarda más de 10 segundos, mostramos el mensaje de servidor dormido
    const timeoutId = setTimeout(() => {
      if (isMounted) setIsTakingLong(true);
    }, 10000);

    const wakeUpBackend = async () => {
      try {
        const backendUrl =
          import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
        // Hacemos un ping a la ruta /health que está en el index.js del backend
        // Le pasamos un parámetro para evitar el caché del navegador
        await fetch(`${backendUrl}/health?t=${new Date().getTime()}`);
      } catch (error) {
        console.warn("Backend still waking up or error:", error);
      } finally {
        clearTimeout(timeoutId);
        // Minimum time to show the loader to let images load smoothly
        setTimeout(() => {
          if (isMounted) {
            setIsFadingOut(true);
            setTimeout(() => {
              if (isMounted) onFinish();
            }, 500); // 500ms duration for the CSS fade-out animation
          }
        }, 1500); // 1.5 second minimum splash screen time
      }
    };

    wakeUpBackend();

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-gray-50 transition-opacity duration-500 ${
        isFadingOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="relative flex flex-col items-center max-w-md px-6 text-center">
        {/* Escudo del club con animación de latido suave */}
        <div className={`relative ${!isTakingLong ? "animate-pulse" : ""}`}>
          <img
            src="/escudo_nyg.png"
            alt="Club Natación y Gimnasia Logo"
            className="w-32 h-32 md:w-40 md:h-40 object-contain drop-shadow-xl"
            width="160"
            height="160"
          />
        </div>

        <h2 className="mt-8 text-2xl font-black tracking-wider text-nyg-blue uppercase">
          Natación y Gimnasia
        </h2>

        <div className="mt-8 h-24 flex flex-col items-center justify-start">
          {!isTakingLong ? (
            <>
              {/* Spinner animado rápido */}
              <div className="flex items-center justify-center space-x-2">
                <div
                  className="w-3 h-3 rounded-full bg-nyg-red animate-bounce"
                  style={{ animationDelay: "0s" }}
                ></div>
                <div
                  className="w-3 h-3 rounded-full bg-nyg-white border-2 border-nyg-gold animate-bounce"
                  style={{ animationDelay: "0.4s" }}
                ></div>
                <div
                  className="w-3 h-3 rounded-full bg-nyg-blue animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
              <p className="mt-6 text-sm text-gray-500 font-bold uppercase tracking-widest">
                Iniciando sistema...
              </p>
            </>
          ) : (
            <div className="flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-500">
              <Loader2 className="w-8 h-8 animate-spin text-nyg-red mb-4" />
              <div className="bg-blue-50/80 border border-blue-100 rounded-2xl p-4 shadow-sm">
                <p className="text-sm text-nyg-blue font-bold flex items-center justify-center gap-2 mb-1">
                  <AlertCircle size={16} className="text-nyg-gold" />{" "}
                  Despertando al servidor
                </p>
                <p className="text-xs text-gray-500 max-w-xs">
                  Como la app usa la nube gratuita, el sistema se duerme tras
                  inactividad. Esto puede demorar hasta{" "}
                  <span className="font-bold text-gray-700">60 segundos</span>.
                  ¡No cierres la pestaña!
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
