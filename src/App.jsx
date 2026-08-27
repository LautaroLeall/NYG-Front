import React from "react";

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-nyg-white">
      <div className="text-center p-8 bg-white shadow-soft rounded-xl border-t-4 border-nyg-red">
        <h1 className="text-4xl font-display text-nyg-blue mb-2 uppercase">
          Club Natación y Gimnasia
        </h1>
        <p className="text-nyg-black font-body">
          El frontend (React + Vite + Tailwind + 3D) está inicializado
          correctamente.
        </p>
        <div className="mt-4 flex justify-center gap-4">
          <span className="w-4 h-4 bg-nyg-blue rounded-full"></span>
          <span className="w-4 h-4 bg-nyg-white border border-gray-300 rounded-full"></span>
          <span className="w-4 h-4 bg-nyg-red rounded-full"></span>
          <span className="w-4 h-4 bg-nyg-gold rounded-full"></span>
        </div>
      </div>
    </div>
  );
}

export default App;
