import React, { useEffect, useState } from "react";

const SplashScreen = ({ onFinish }) => {
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const wakeUpBackend = async () => {
      try {
        const backendUrl =
          import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
        // Hacemos un ping a la ruta /health que está en el index.js del backend
        await fetch(`${backendUrl}/health`);
      } catch (error) {
        console.warn("Backend still waking up or error:", error);
      } finally {
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
    };
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-gray-50 transition-opacity duration-500 ${
        isFadingOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="relative flex flex-col items-center">
        {/* Escudo del club con animación de latido suave */}
        <div className="relative animate-pulse">
          <img
            src="/escudo_nyg.png"
            alt="Club Natación y Gimnasia Logo"
            className="w-32 h-32 md:w-40 md:h-40 object-contain drop-shadow-xl"
            width="160"
            height="160"
          />
        </div>

        <h2 className="mt-8 text-xl font-bold tracking-wider text-nyg-blue uppercase">
          Natación y Gimnasia
        </h2>

        {/* Spinner animado */}
        <div className="mt-6 flex items-center justify-center space-x-2">
          <div
            className="w-2 h-2 rounded-full bg-nyg-blue animate-bounce"
            style={{ animationDelay: "0s" }}
          ></div>
          <div
            className="w-2 h-2 rounded-full bg-nyg-blue animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
          <div
            className="w-2 h-2 rounded-full bg-nyg-blue animate-bounce"
            style={{ animationDelay: "0.4s" }}
          ></div>
        </div>
        <p className="mt-4 text-sm text-gray-500 font-medium">
          Iniciando sistema...
        </p>
      </div>
    </div>
  );
};

export default SplashScreen;
