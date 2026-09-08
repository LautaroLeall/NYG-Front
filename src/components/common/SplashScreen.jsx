import React, { useEffect, useState } from "react";

const SplashScreen = ({ onFinish }) => {
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    let isMounted = true;

    // Ping invisible para despertar a Render en segundo plano
    const wakeUpBackend = async () => {
      try {
        const backendUrl =
          import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
        fetch(`${backendUrl}/health?t=${new Date().getTime()}`).catch(() => {});
      } catch (error) {
        // Ignoramos errores, es solo un ping
      }
    };

    wakeUpBackend();

    // El splash screen dura exactamente 5 segundos visualmente y se va
    const timer = setTimeout(() => {
      if (isMounted) {
        setIsFadingOut(true);
        setTimeout(() => {
          if (isMounted) onFinish();
        }, 500); // 500ms para la animación de opacidad
      }
    }, 5000);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-gray-50 transition-opacity duration-500 ${
        isFadingOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="relative flex flex-col items-center max-w-md px-6 text-center">
        <div className="relative animate-pulse">
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
          <p className="mt-6 text-xs text-gray-500 font-bold uppercase tracking-widest">
            Procesando el exceso de talento del plantel.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
