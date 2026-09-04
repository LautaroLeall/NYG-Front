import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "../../../api/axiosConfig";
import toast from "react-hot-toast";
import {
  Loader2,
  Save,
  ChevronDown,
  Calendar,
  AlertCircle,
} from "lucide-react";
import dayjs from "dayjs";

const matchSchema = z
  .object({
    tournament: z.string().min(1, "Debe seleccionar un torneo"),
    homeTeam: z.string().min(1, "Debe seleccionar el equipo local"),
    awayTeam: z.string().min(1, "Debe seleccionar el equipo visitante"),
    date: z.string().min(1, "La fecha es obligatoria"),
    isHomeMatch: z.boolean(),
    status: z.string(),
  })
  .refine((data) => data.homeTeam !== data.awayTeam, {
    message: "El equipo local y visitante no pueden ser el mismo",
    path: ["awayTeam"],
  });

const MatchForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;

  const [isLoading, setIsLoading] = useState(false);
  const [tournaments, setTournaments] = useState([]);
  const [teams, setTeams] = useState([]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(matchSchema),
    defaultValues: {
      tournament: "",
      homeTeam: "",
      awayTeam: "",
      date: "",
      isHomeMatch: true,
      status: "Programado",
    },
  });

  const selectedTournamentId = watch("tournament");
  const selectedTournament = tournaments.find(
    (t) => t._id === selectedTournamentId,
  );

  const filteredTeams = selectedTournament
    ? teams.filter((t) => t.category === selectedTournament.category)
    : teams;

  useEffect(() => {
    fetchData();
    if (isEditing) {
      fetchMatch();
    }
  }, [id]);

  const fetchData = async () => {
    try {
      const [tournamentsRes, teamsRes] = await Promise.all([
        axios.get("/api/tournaments"),
        axios.get("/api/teams"),
      ]);
      setTournaments(tournamentsRes.data.filter((t) => !t.isArchived));
      setTeams(teamsRes.data);
    } catch (error) {
      toast.error("Error al cargar torneos y equipos");
    }
  };

  const fetchMatch = async () => {
    try {
      const res = await axios.get(`/api/matches/${id}`);
      const data = res.data.data;
      setValue("tournament", data.tournament?._id || data.tournament);
      setValue("homeTeam", data.homeTeam?._id || data.homeTeam);
      setValue("awayTeam", data.awayTeam?._id || data.awayTeam);
      setValue("date", dayjs(data.date).format("YYYY-MM-DDTHH:mm"));
      setValue("isHomeMatch", data.isHomeMatch);
      setValue("status", data.status);
    } catch (error) {
      toast.error("Error al cargar el partido");
      navigate("/admin/partidos");
    }
  };

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const payload = {
        ...data,
      };

      if (isEditing) {
        await axios.put(`/api/matches/${id}`, payload);
        toast.success("Partido actualizado con éxito");
      } else {
        await axios.post("/api/matches", payload);
        toast.success("Partido programado con éxito");
      }
      navigate("/admin/partidos");
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Error al guardar el partido",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-black text-nyg-blue uppercase tracking-widest flex items-center gap-3">
          <Calendar className="w-8 h-8" />
          {isEditing ? "Editar Partido" : "Programar Partido"}
        </h1>
        <p className="text-sm font-bold text-gray-400 tracking-wider">
          Configura los detalles previos al encuentro
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-white border border-gray-100 shadow-sm rounded-3xl p-6 md:p-8 space-y-6">
          <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-2 mb-4">
            Datos del Partido
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 ml-2">
                Torneo *
              </label>
              <div className="relative">
                <select
                  {...register("tournament")}
                  className={`block w-full pl-6 pr-12 py-3 bg-gray-50 border-2 ${errors.tournament ? "border-nyg-red" : "border-transparent"} rounded-full text-gray-800 focus:outline-none focus:bg-white focus:border-nyg-blue transition-all font-medium appearance-none cursor-pointer`}
                >
                  <option value="">Seleccionar Torneo</option>
                  {tournaments.map((t) => (
                    <option key={t._id} value={t._id}>
                      {t.name} ({t.category})
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                </div>
              </div>
              {errors.tournament && (
                <p className="text-xs font-bold text-nyg-red mt-1 ml-2">
                  {errors.tournament.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 ml-2">
                Equipo Local *
              </label>
              <div className="relative">
                <select
                  {...register("homeTeam")}
                  className={`block w-full pl-6 pr-12 py-3 bg-gray-50 border-2 ${errors.homeTeam ? "border-nyg-red" : "border-transparent"} rounded-full text-gray-800 focus:outline-none focus:bg-white focus:border-nyg-blue transition-all font-medium appearance-none cursor-pointer`}
                >
                  <option value="">Seleccionar Local</option>
                  {filteredTeams.map((t) => (
                    <option key={t._id} value={t._id}>
                      {t.name}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                </div>
              </div>
              {errors.homeTeam && (
                <p className="text-xs font-bold text-nyg-red mt-1 ml-2">
                  {errors.homeTeam.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 ml-2">
                Equipo Visitante *
              </label>
              <div className="relative">
                <select
                  {...register("awayTeam")}
                  className={`block w-full pl-6 pr-12 py-3 bg-gray-50 border-2 ${errors.awayTeam ? "border-nyg-red" : "border-transparent"} rounded-full text-gray-800 focus:outline-none focus:bg-white focus:border-nyg-blue transition-all font-medium appearance-none cursor-pointer`}
                >
                  <option value="">Seleccionar Visitante</option>
                  {filteredTeams.map((t) => (
                    <option key={t._id} value={t._id}>
                      {t.name}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                </div>
              </div>
              {errors.awayTeam && (
                <p className="text-xs font-bold text-nyg-red mt-1 ml-2">
                  {errors.awayTeam.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 ml-2">
                Fecha y Hora *
              </label>
              <input
                type="datetime-local"
                {...register("date")}
                className={`block w-full px-6 py-3 bg-gray-50 border-2 ${errors.date ? "border-nyg-red" : "border-transparent"} rounded-full text-gray-800 focus:outline-none focus:bg-white focus:border-nyg-blue transition-all font-medium`}
              />
              {errors.date && (
                <p className="text-xs font-bold text-nyg-red mt-1 ml-2">
                  {errors.date.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 ml-2">
                Estado del Partido
              </label>
              <div className="relative">
                <select
                  {...register("status")}
                  className="block w-full pl-6 pr-12 py-3 bg-gray-50 border-2 border-transparent rounded-full text-gray-800 focus:outline-none focus:bg-white focus:border-nyg-blue transition-all font-medium appearance-none cursor-pointer"
                >
                  <option value="Programado">Programado</option>
                  <option value="En Curso">En Curso</option>
                  <option value="Finalizado">Finalizado</option>
                  <option value="Postergado">Postergado</option>
                  <option value="Walkover">Walkover</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>
          </div>

          {Object.keys(errors).length > 0 &&
            errors.awayTeam?.type === "custom" && (
              <div className="mt-4 p-4 bg-red-50 text-nyg-red rounded-2xl flex items-center gap-3">
                <AlertCircle size={20} />
                <p className="text-sm font-bold">{errors.awayTeam.message}</p>
              </div>
            )}

          <div className="mt-8 p-6 bg-gray-50 rounded-3xl border border-gray-100 flex items-center justify-between">
            <div>
              <h4 className="text-sm font-bold text-gray-800 uppercase tracking-wider">
                Natación y Gimnasia Juega de Local
              </h4>
              <p className="text-xs text-gray-500 font-medium mt-1">
                Activa esto si el club actúa como anfitrión oficial.
              </p>
            </div>
            <label className="relative inline-block w-12 h-6 cursor-pointer">
              <input
                type="checkbox"
                className="peer sr-only"
                {...register("isHomeMatch")}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-nyg-blue"></div>
            </label>
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
            {isEditing ? "Actualizar Partido" : "Programar Partido"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MatchForm;
