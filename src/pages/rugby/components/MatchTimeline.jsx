import React from "react";
import { motion } from "framer-motion";
import { Trophy } from "lucide-react";

const MatchTimeline = ({ match, timelineEvents, isHome, rivalTeamName }) => {
  if (match.status !== "Finalizado") return null;

  return (
    <div className="bg-white rounded-3xl shadow-soft p-8 md:p-12 mb-8">
      <h3 className="text-2xl font-black text-nyg-blue uppercase tracking-wide mb-8 flex items-center gap-3">
        <Trophy className="text-nyg-gold" size={28} />
        Resumen del Partido
      </h3>

      {timelineEvents.length === 0 ? (
        <p className="text-gray-400 text-center font-bold">
          No hay eventos registrados para este partido.
        </p>
      ) : (
        <div className="relative space-y-8 py-4">
          {/* Línea vertical */}
          <div className="absolute top-0 bottom-0 left-4 md:left-1/2 w-1 bg-gray-100 md:-translate-x-1/2"></div>

          {timelineEvents.map((event, index) => {
            const isNYG = event.team === "NYG";
            const isLeftEvent = isHome ? isNYG : !isNYG;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative flex items-center ${
                  !isLeftEvent ? "md:flex-row-reverse" : "md:flex-row"
                } w-full justify-start md:justify-between`}
              >
                {/* Punto Central */}
                <div
                  className="absolute left-1 md:left-1/2 md:-translate-x-1/2 w-6 h-6 rounded-full border-4 border-white shadow-sm z-10"
                  style={{
                    backgroundColor: isNYG ? "#002A50" : "#9CA3AF",
                  }}
                ></div>

                <div
                  className={`w-full md:w-[45%] pl-12 md:pl-0 ${
                    isLeftEvent ? "md:text-right md:pr-10" : "md:text-left md:pl-10"
                  }`}
                >
                  <div
                    className={`p-4 rounded-2xl shadow-sm border ${
                      isNYG ? "bg-blue-50/50 border-nyg-blue/10" : "bg-gray-50 border-gray-100"
                    }`}
                  >
                    <div
                      className={`flex items-center gap-2 mb-1 ${
                        isLeftEvent ? "md:justify-end" : "md:justify-start"
                      }`}
                    >
                      {event.minute && (
                        <span className="text-xs font-bold text-gray-400 mr-1">
                          {event.minute}'
                        </span>
                      )}
                      <span
                        className={`text-xs font-black uppercase tracking-widest px-2 py-0.5 rounded-md ${
                          event.type === "Tarjeta Amarilla"
                            ? "bg-amber-100 text-amber-700"
                            : event.type === "Tarjeta Roja"
                            ? "bg-red-100 text-red-700"
                            : isNYG
                            ? "bg-nyg-blue text-white"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {event.type} {event.val > 0 && `(+${event.val})`}
                      </span>
                    </div>
                    {isNYG ? (
                      event.type === "Cambio" ? (
                        <div className="flex flex-col gap-0.5">
                          <h4 className="font-bold text-gray-900 text-sm">
                            ↑ Entra: {event.player}
                          </h4>
                          {event.playerOut && (
                            <h4 className="font-bold text-gray-500 text-sm">
                              ↓ Sale: {event.playerOut}
                            </h4>
                          )}
                        </div>
                      ) : (
                        <h4 className="font-bold text-gray-900 text-lg">
                          {event.player}
                        </h4>
                      )
                    ) : (
                      <h4 className="font-bold text-gray-600 text-lg">
                        {event.type} Rival
                      </h4>
                    )}
                    {!event.isCard && (
                      <p className="text-sm font-medium text-gray-500 mt-1">
                        {isNYG ? "Natación y Gimnasia" : rivalTeamName || "Rival"}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MatchTimeline;
