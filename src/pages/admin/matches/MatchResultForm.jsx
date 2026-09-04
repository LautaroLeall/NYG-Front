import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "../../../api/axiosConfig";
import toast from "react-hot-toast";
import { Loader2, Save, ArrowLeft, Trophy, CheckCircle2 } from "lucide-react";

const MatchResultForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [matchData, setMatchData] = useState(null);

  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      status: "Finalizado",
      homeScore: 0,
      homeTries: 0,
      homeConversions: 0,
      homePenalties: 0,
      homeDrops: 0,
      homePenaltyTries: 0,
      awayScore: 0,
      awayTries: 0,
      awayConversions: 0,
      awayPenalties: 0,
      awayDrops: 0,
      awayPenaltyTries: 0,
    },
  });

  // Watchers to auto-calculate scores (Optional depending on business rules, but handy)
  const [
    hTries,
    hConv,
    hPen,
    hDrop,
    hPTries,
    aTries,
    aConv,
    aPen,
    aDrop,
    aPTries,
  ] = watch([
    "homeTries",
    "homeConversions",
    "homePenalties",
    "homeDrops",
    "homePenaltyTries",
    "awayTries",
    "awayConversions",
    "awayPenalties",
    "awayDrops",
    "awayPenaltyTries",
  ]);

  useEffect(() => {
    // Auto calculate home score
    const totalHome =
      (parseInt(hTries) || 0) * 5 +
      (parseInt(hConv) || 0) * 2 +
      (parseInt(hPen) || 0) * 3 +
      (parseInt(hDrop) || 0) * 3 +
      (parseInt(hPTries) || 0) * 7;
    setValue("homeScore", totalHome);

    // Auto calculate away score
    const totalAway =
      (parseInt(aTries) || 0) * 5 +
      (parseInt(aConv) || 0) * 2 +
      (parseInt(aPen) || 0) * 3 +
      (parseInt(aDrop) || 0) * 3 +
      (parseInt(aPTries) || 0) * 7;
    setValue("awayScore", totalAway);
  }, [
    hTries,
    hConv,
    hPen,
    hDrop,
    hPTries,
    aTries,
    aConv,
    aPen,
    aDrop,
    aPTries,
    setValue,
  ]);

  useEffect(() => {
    fetchMatch();
  }, [id]);

  const fetchMatch = async () => {
    try {
      const res = await axios.get(`/api/matches/${id}`);
      const data = res.data.data;
      setMatchData(data);

      setValue(
        "status",
        data.status === "Programado" ? "Finalizado" : data.status,
      );
      setValue("homeScore", data.homeScore || 0);
      setValue("homeTries", data.homeTries || 0);
      setValue("homeConversions", data.homeConversions || 0);
      setValue("homePenalties", data.homePenalties || 0);
      setValue("homeDrops", data.homeDrops || 0);
      setValue("homePenaltyTries", data.homePenaltyTries || 0);

      setValue("awayScore", data.awayScore || 0);
      setValue("awayTries", data.awayTries || 0);
      setValue("awayConversions", data.awayConversions || 0);
      setValue("awayPenalties", data.awayPenalties || 0);
      setValue("awayDrops", data.awayDrops || 0);
      setValue("awayPenaltyTries", data.awayPenaltyTries || 0);
    } catch (error) {
      toast.error("Error al cargar el partido");
      navigate("/admin/partidos");
    }
  };

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      await axios.put(`/api/matches/${id}`, data);
      toast.success("Resultado guardado con éxito");
      navigate("/admin/partidos");
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Error al guardar el resultado",
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (!matchData) return null;

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-nyg-blue uppercase tracking-widest flex items-center gap-3">
            <CheckCircle2 className="w-8 h-8" />
            Cargar Resultado
          </h1>
          <p className="text-sm font-bold text-gray-400 tracking-wider">
            {matchData.tournament?.name}
          </p>
        </div>
        <Link
          to="/admin/partidos"
          className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full font-black uppercase tracking-widest text-sm transition-all"
        >
          <ArrowLeft size={18} />
          Volver
        </Link>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-white border border-gray-100 shadow-sm rounded-3xl p-6 md:p-8 space-y-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Equipo Local */}
            <div className="flex-1 bg-gray-50 rounded-3xl p-6 border-2 border-gray-100">
              <div className="flex items-center gap-4 mb-6 border-b border-gray-200 pb-4">
                {matchData.homeTeam?.logo ? (
                  <img
                    src={matchData.homeTeam.logo}
                    alt="Local"
                    className="w-12 h-12 object-contain"
                  />
                ) : (
                  <div className="w-12 h-12 bg-gray-200 rounded-full" />
                )}
                <div>
                  <span className="block text-xs font-black text-gray-400 uppercase tracking-widest">
                    Local
                  </span>
                  <h2 className="text-xl font-bold text-gray-800">
                    {matchData.homeTeam?.name}
                  </h2>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 items-center">
                  <label className="text-sm font-bold text-gray-600 uppercase">
                    Tries (5 pts)
                  </label>
                  <input
                    type="number"
                    min="0"
                    {...register("homeTries")}
                    className="w-full px-4 py-2 bg-white border border-gray-200 rounded-xl text-center font-black text-lg focus:border-nyg-blue outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 items-center">
                  <label className="text-sm font-bold text-gray-600 uppercase">
                    Conv. (2 pts)
                  </label>
                  <input
                    type="number"
                    min="0"
                    {...register("homeConversions")}
                    className="w-full px-4 py-2 bg-white border border-gray-200 rounded-xl text-center font-black text-lg focus:border-nyg-blue outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 items-center">
                  <label className="text-sm font-bold text-gray-600 uppercase">
                    Penales (3 pts)
                  </label>
                  <input
                    type="number"
                    min="0"
                    {...register("homePenalties")}
                    className="w-full px-4 py-2 bg-white border border-gray-200 rounded-xl text-center font-black text-lg focus:border-nyg-blue outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 items-center">
                  <label className="text-sm font-bold text-gray-600 uppercase">
                    Drops (3 pts)
                  </label>
                  <input
                    type="number"
                    min="0"
                    {...register("homeDrops")}
                    className="w-full px-4 py-2 bg-white border border-gray-200 rounded-xl text-center font-black text-lg focus:border-nyg-blue outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 items-center">
                  <label className="text-sm font-bold text-gray-600 uppercase">
                    Tries Penal (7 pts)
                  </label>
                  <input
                    type="number"
                    min="0"
                    {...register("homePenaltyTries")}
                    className="w-full px-4 py-2 bg-white border border-gray-200 rounded-xl text-center font-black text-lg focus:border-nyg-blue outline-none"
                  />
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-black text-gray-400 uppercase tracking-widest">
                    Total Puntos
                  </span>
                  <span className="text-4xl font-black text-nyg-blue">
                    {watch("homeScore")}
                  </span>
                </div>
              </div>
            </div>

            {/* Equipo Visitante */}
            <div className="flex-1 bg-gray-50 rounded-3xl p-6 border-2 border-gray-100">
              <div className="flex items-center gap-4 mb-6 border-b border-gray-200 pb-4">
                {matchData.awayTeam?.logo ? (
                  <img
                    src={matchData.awayTeam.logo}
                    alt="Visitante"
                    className="w-12 h-12 object-contain"
                  />
                ) : (
                  <div className="w-12 h-12 bg-gray-200 rounded-full" />
                )}
                <div>
                  <span className="block text-xs font-black text-gray-400 uppercase tracking-widest">
                    Visitante
                  </span>
                  <h2 className="text-xl font-bold text-gray-800">
                    {matchData.awayTeam?.name}
                  </h2>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 items-center">
                  <label className="text-sm font-bold text-gray-600 uppercase">
                    Tries (5 pts)
                  </label>
                  <input
                    type="number"
                    min="0"
                    {...register("awayTries")}
                    className="w-full px-4 py-2 bg-white border border-gray-200 rounded-xl text-center font-black text-lg focus:border-nyg-blue outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 items-center">
                  <label className="text-sm font-bold text-gray-600 uppercase">
                    Conv. (2 pts)
                  </label>
                  <input
                    type="number"
                    min="0"
                    {...register("awayConversions")}
                    className="w-full px-4 py-2 bg-white border border-gray-200 rounded-xl text-center font-black text-lg focus:border-nyg-blue outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 items-center">
                  <label className="text-sm font-bold text-gray-600 uppercase">
                    Penales (3 pts)
                  </label>
                  <input
                    type="number"
                    min="0"
                    {...register("awayPenalties")}
                    className="w-full px-4 py-2 bg-white border border-gray-200 rounded-xl text-center font-black text-lg focus:border-nyg-blue outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 items-center">
                  <label className="text-sm font-bold text-gray-600 uppercase">
                    Drops (3 pts)
                  </label>
                  <input
                    type="number"
                    min="0"
                    {...register("awayDrops")}
                    className="w-full px-4 py-2 bg-white border border-gray-200 rounded-xl text-center font-black text-lg focus:border-nyg-blue outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 items-center">
                  <label className="text-sm font-bold text-gray-600 uppercase">
                    Tries Penal (7 pts)
                  </label>
                  <input
                    type="number"
                    min="0"
                    {...register("awayPenaltyTries")}
                    className="w-full px-4 py-2 bg-white border border-gray-200 rounded-xl text-center font-black text-lg focus:border-nyg-blue outline-none"
                  />
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-black text-gray-400 uppercase tracking-widest">
                    Total Puntos
                  </span>
                  <span className="text-4xl font-black text-gray-800">
                    {watch("awayScore")}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 p-6 bg-blue-50 rounded-3xl border border-blue-100">
            <label className="block text-xs font-bold text-nyg-blue uppercase tracking-wider mb-2">
              Estado Final del Partido
            </label>
            <select
              {...register("status")}
              className="block w-full max-w-xs px-6 py-3 bg-white border-2 border-transparent rounded-full text-gray-800 font-bold focus:outline-none focus:border-nyg-blue transition-all cursor-pointer"
            >
              <option value="Finalizado">Finalizado</option>
              <option value="En Curso">En Curso</option>
              <option value="Walkover">Walkover</option>
            </select>
          </div>
        </div>

        {/* Botonera Flotante/Fija Abajo */}
        <div className="flex items-center justify-end gap-4 bg-white border border-gray-100 shadow-sm rounded-full p-4 px-6 mt-8">
          <Link
            to="/admin/partidos"
            className="px-6 py-3 text-gray-500 font-bold uppercase tracking-widest text-sm hover:text-nyg-blue transition-colors"
          >
            Cancelar
          </Link>
          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center gap-2 px-8 py-3 bg-nyg-blue hover:bg-blue-800 text-white rounded-full font-black uppercase tracking-widest text-sm shadow-md hover:shadow-xl hover:-translate-y-1 transition-all disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isLoading ? (
              <Loader2 className="animate-spin w-5 h-5" />
            ) : (
              <Save className="w-5 h-5" />
            )}
            Guardar Resultado
          </button>
        </div>
      </form>
    </div>
  );
};

export default MatchResultForm;
