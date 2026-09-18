import React from "react";
import { Users } from "lucide-react";

const RosterManager = ({ players, roster, handleRosterChange }) => {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-6">
      <div className="bg-gray-50 border-b border-gray-100 p-6 flex items-center gap-3">
        <Users className="text-nyg-blue" size={24} />
        <h2 className="text-lg font-black text-gray-800 uppercase tracking-wide">
          1. Plantel del Partido
        </h2>
      </div>
      <div className="p-6">
        <p className="text-sm text-gray-500 mb-6">
          Selecciona los jugadores convocados y marca quiénes son titulares.
        </p>

        {players.length === 0 ? (
          <div className="text-center py-8 text-gray-400 font-bold">
            No hay jugadores disponibles en la categoría del equipo.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {players.map((player) => (
              <div
                key={player._id}
                className={`p-4 rounded-xl border-2 transition-all ${
                  roster[player._id]?.isSelected
                    ? "border-nyg-blue bg-nyg-blue/5"
                    : "border-gray-100 bg-white hover:border-gray-200"
                }`}
              >
                <label className="flex items-start gap-3 cursor-pointer">
                  <div className="pt-1">
                    <input
                      type="checkbox"
                      checked={roster[player._id]?.isSelected || false}
                      onChange={(e) =>
                        handleRosterChange(
                          player._id,
                          "isSelected",
                          e.target.checked
                        )
                      }
                      className="w-5 h-5 rounded text-nyg-blue focus:ring-nyg-blue"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-gray-800">{player.name}</p>
                    <p className="text-xs text-gray-500 font-medium">
                      {player.position}
                    </p>
                  </div>
                </label>

                <div
                  className={`mt-4 pt-3 border-t border-gray-200 flex items-center justify-between transition-opacity ${
                    roster[player._id]?.isSelected
                      ? "opacity-100"
                      : "opacity-30 pointer-events-none"
                  }`}
                >
                  <label className="flex items-center gap-2 cursor-pointer">
                    <span className="text-xs font-bold text-gray-600 uppercase">
                      Titular
                    </span>
                    <input
                      type="checkbox"
                      checked={roster[player._id]?.isStarter || false}
                      onChange={(e) =>
                        handleRosterChange(
                          player._id,
                          "isStarter",
                          e.target.checked
                        )
                      }
                      className="w-4 h-4 text-nyg-gold rounded"
                    />
                  </label>
                  {roster[player._id]?.isSelected && (
                    <div className="flex flex-col items-center gap-1 ml-2 pl-2 border-l border-gray-100">
                      <span className="text-[10px] font-black uppercase text-gray-400">
                        Camiseta
                      </span>
                      <input
                        type="number"
                        min="1"
                        max="99"
                        value={roster[player._id]?.shirtNumber || ""}
                        onChange={(e) =>
                          handleRosterChange(
                            player._id,
                            "shirtNumber",
                            e.target.value
                          )
                        }
                        className="w-12 p-1 border border-gray-300 rounded-md text-center font-bold text-sm focus:ring-2 focus:ring-nyg-blue focus:outline-none bg-white"
                      />
                    </div>
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

export default RosterManager;
