import React, { useState } from "react";
import { Link } from "react-router-dom";

const TACTICAL_POSITIONS = {
  1: { top: "15%", left: "30%" },
  2: { top: "15%", left: "50%" },
  3: { top: "15%", left: "70%" },
  4: { top: "27%", left: "40%" },
  5: { top: "27%", left: "60%" },
  6: { top: "39%", left: "20%" },
  8: { top: "39%", left: "50%" },
  7: { top: "39%", left: "80%" },
  9: { top: "50%", left: "35%" },
  10: { top: "60%", left: "50%" },
  12: { top: "70%", left: "65%" },
  13: { top: "80%", left: "80%" },
  14: { top: "80%", left: "20%" },
  11: { top: "80%", left: "90%" },
  15: { top: "92%", left: "50%" },
};

const MatchSquadView = ({ match }) => {
  const [viewMode, setViewMode] = useState("lista");

  if (!match.roster || match.roster.length === 0) return null;

  return (
    <div className="bg-white rounded-3xl shadow-soft p-8 md:p-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <h3 className="text-2xl font-black text-nyg-blue uppercase tracking-wide flex items-center gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-nyg-gold"
          >
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
          Formación NYG
        </h3>

        <div className="flex items-center bg-gray-100 p-1 rounded-xl">
          <button
            onClick={() => setViewMode("lista")}
            className={`px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-widest transition-all ${
              viewMode === "lista"
                ? "bg-white text-nyg-blue shadow-sm"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            Lista
          </button>
          <button
            onClick={() => setViewMode("tactica")}
            className={`px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-widest transition-all ${
              viewMode === "tactica"
                ? "bg-white text-nyg-blue shadow-sm"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            Cancha
          </button>
        </div>
      </div>

      {viewMode === "lista" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-4 border-b border-gray-100 pb-2">
              Titulares
            </h4>
            <div className="space-y-3">
              {match.roster
                .filter((r) => r.isStarter)
                .sort((a, b) => (a.shirtNumber || 99) - (b.shirtNumber || 99))
                .map((r, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-100 overflow-hidden shrink-0">
                      {r.player?.imageUrl ? (
                        <img
                          src={r.player.imageUrl}
                          className="w-full h-full object-cover"
                          alt=""
                        />
                      ) : null}
                    </div>
                    <div>
                      <p className="font-bold text-gray-800 text-sm flex items-center gap-2">
                        {r.shirtNumber && (
                          <span className="text-[10px] bg-gray-200 text-gray-600 px-1.5 py-0.5 rounded font-black">
                            {r.shirtNumber}
                          </span>
                        )}
                        {r.player?.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {r.player?.position}
                      </p>
                    </div>
                  </div>
                ))}
              {match.roster.filter((r) => r.isStarter).length === 0 && (
                <p className="text-sm text-gray-400 italic">No asignados</p>
              )}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-4 border-b border-gray-100 pb-2">
              Suplentes
            </h4>
            <div className="space-y-3">
              {match.roster
                .filter((r) => !r.isStarter)
                .sort((a, b) => (a.shirtNumber || 99) - (b.shirtNumber || 99))
                .map((r, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-100 overflow-hidden shrink-0">
                      {r.player?.imageUrl ? (
                        <img
                          src={r.player.imageUrl}
                          className="w-full h-full object-cover"
                          alt=""
                        />
                      ) : null}
                    </div>
                    <div>
                      <p className="font-bold text-gray-800 text-sm flex items-center gap-2">
                        {r.shirtNumber && (
                          <span className="text-[10px] bg-gray-200 text-gray-600 px-1.5 py-0.5 rounded font-black">
                            {r.shirtNumber}
                          </span>
                        )}
                        {r.player?.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {r.player?.position}
                      </p>
                    </div>
                  </div>
                ))}
              {match.roster.filter((r) => !r.isStarter).length === 0 && (
                <p className="text-sm text-gray-400 italic">No asignados</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="relative w-full max-w-2xl mx-auto rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-[#5f8742]">
          <img
            src="/cancha-rugby.jpg"
            alt="Cancha de Rugby"
            className="w-full h-auto object-cover block"
          />
          <div className="absolute inset-0">
            {match.roster
              .filter(
                (r) =>
                  r.isStarter &&
                  r.shirtNumber &&
                  TACTICAL_POSITIONS[r.shirtNumber]
              )
              .map((r, i) => {
                const pos = TACTICAL_POSITIONS[r.shirtNumber];
                const parts = r.player?.name?.split(" ") || ["Jugador"];
                const shortName =
                  parts.length > 1
                    ? `${parts[0].charAt(0)}. ${parts[parts.length - 1]}`
                    : parts[0];

                return (
                  <div
                    key={i}
                    className="absolute flex flex-col items-center justify-center -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-transform cursor-default"
                    style={{ top: pos.top, left: pos.left }}
                    title={r.player?.name}
                  >
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-white rounded-full border-2 border-nyg-blue shadow-lg overflow-hidden flex items-center justify-center relative">
                      <Link
                        to={`/rugby/jugador/${r.player?._id}`}
                        className="block h-full"
                      >
                        {r.player?.imageUrl ? (
                          <img
                            src={r.player.imageUrl}
                            className="w-full h-full object-cover"
                            alt=""
                          />
                        ) : (
                          <span className="text-xs font-black text-nyg-blue">
                            {r.shirtNumber}
                          </span>
                        )}
                      </Link>
                    </div>
                    <span className="mt-1 bg-black/70 backdrop-blur-sm text-white text-[9px] md:text-[11px] font-bold px-2 py-0.5 rounded shadow-sm whitespace-nowrap">
                      {shortName}
                    </span>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
};

export default MatchSquadView;
