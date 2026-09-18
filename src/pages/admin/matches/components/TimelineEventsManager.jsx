import React from "react";
import { Clock, Plus, Trash2 } from "lucide-react";

const TimelineEventsManager = ({ events, setEvents, players, roster }) => {
  const selectedPlayers = players.filter((p) => roster[p._id]?.isSelected);

  const handleAddEvent = () => {
    setEvents([
      ...events,
      {
        team: "NYG",
        type: "Try",
        minute: 1,
        player: "",
        playerOut: "",
      },
    ]);
  };

  const handleRemoveEvent = (index) => {
    setEvents(events.filter((_, i) => i !== index));
  };

  const handleEventChange = (index, field, value) => {
    const updated = [...events];
    updated[index][field] = value;
    setEvents(updated);
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-6">
      <div className="bg-gray-50 border-b border-gray-100 p-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Clock className="text-nyg-blue" size={24} />
          <h2 className="text-lg font-black text-gray-800 uppercase tracking-wide">
            2. Línea de Tiempo
          </h2>
        </div>
        <button
          onClick={handleAddEvent}
          className="flex items-center gap-2 px-4 py-2 bg-nyg-red/10 text-nyg-red rounded-lg font-bold hover:bg-nyg-red hover:text-white transition-colors text-sm"
        >
          <Plus size={16} /> Agregar Evento
        </button>
      </div>

      <div className="p-6">
        {events.length === 0 ? (
          <div className="text-center py-12 text-gray-400 font-bold border-2 border-dashed border-gray-100 rounded-2xl">
            No hay eventos cargados en este partido.
          </div>
        ) : (
          <div className="space-y-4">
            {events.map((event, idx) => {
              const isCambio = event.type === "Cambio" && event.team === "NYG";
              return (
                <div
                  key={idx}
                  className="flex flex-col md:flex-row items-center gap-4 bg-gray-50 p-4 rounded-xl border border-gray-200"
                >
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="font-bold text-gray-400 uppercase text-[10px] w-8">
                      Minuto
                    </span>
                    <input
                      type="number"
                      min="0"
                      max="120"
                      value={event.minute}
                      onChange={(e) =>
                        handleEventChange(idx, "minute", Number(e.target.value))
                      }
                      className="w-16 p-2 border border-gray-300 rounded-lg text-center font-bold focus:ring-nyg-blue"
                    />
                  </div>

                  <div className="w-full md:w-40 shrink-0">
                    <select
                      value={event.team}
                      onChange={(e) =>
                        handleEventChange(idx, "team", e.target.value)
                      }
                      className="w-full p-2 border border-gray-300 rounded-lg font-bold"
                    >
                      <option value="NYG">Natación (Local)</option>
                      <option value="RIVAL">Equipo Rival</option>
                    </select>
                  </div>

                  <div className="w-full md:w-40 shrink-0">
                    <select
                      value={event.type}
                      onChange={(e) =>
                        handleEventChange(idx, "type", e.target.value)
                      }
                      className="w-full p-2 border border-gray-300 rounded-lg font-bold"
                    >
                      <option value="Try">Try</option>
                      <option value="Conversión">Conversión</option>
                      <option value="Penal">Penal</option>
                      <option value="Drop">Drop</option>
                      <option value="Try Penal">Try Penal</option>
                      <option value="Tarjeta Amarilla">Tarjeta Amarilla</option>
                      <option value="Tarjeta Roja">Tarjeta Roja</option>
                      <option value="Cambio">Cambio</option>
                    </select>
                  </div>

                  <div className="w-full flex-1 flex flex-col sm:flex-row gap-2">
                    {event.team === "NYG" ? (
                      <>
                        <div className="flex-1 relative">
                          {isCambio && (
                            <span className="absolute -top-2 left-2 bg-gray-50 text-[10px] font-black text-gray-500 px-1">
                              ENTRA
                            </span>
                          )}
                          <select
                            value={
                              typeof event.player === "object"
                                ? event.player?._id
                                : event.player || ""
                            }
                            onChange={(e) =>
                              handleEventChange(idx, "player", e.target.value)
                            }
                            className="w-full p-2 border border-gray-300 rounded-lg font-medium"
                          >
                            <option value="">Seleccionar Jugador...</option>
                            {selectedPlayers.map((p) => (
                              <option key={p._id} value={p._id}>
                                {p.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        {isCambio && (
                          <div className="flex-1 relative">
                            <span className="absolute -top-2 left-2 bg-gray-50 text-[10px] font-black text-gray-500 px-1">
                              SALE
                            </span>
                            <select
                              value={
                                typeof event.playerOut === "object"
                                  ? event.playerOut?._id
                                  : event.playerOut || ""
                              }
                              onChange={(e) =>
                                handleEventChange(
                                  idx,
                                  "playerOut",
                                  e.target.value
                                )
                              }
                              className="w-full p-2 border border-gray-300 rounded-lg font-medium text-gray-500"
                            >
                              <option value="">Seleccionar Jugador...</option>
                              {selectedPlayers.map((p) => (
                                <option key={p._id} value={p._id}>
                                  {p.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="w-full p-2 bg-gray-200 rounded-lg font-medium text-gray-400 text-center cursor-not-allowed text-sm">
                        {event.type} del Rival
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => handleRemoveEvent(idx)}
                    className="p-2 text-gray-400 hover:text-nyg-red transition-colors shrink-0"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default TimelineEventsManager;
