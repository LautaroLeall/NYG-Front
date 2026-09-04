import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "../../../api/axiosConfig";
import toast from "react-hot-toast";
import { Loader2, Save, ChevronDown, Trophy } from "lucide-react";

const tournamentSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  season: z
    .number({
      invalid_type_error: "La temporada debe ser un número",
    })
    .min(2000, "Temporada inválida"),
  level: z.string().min(1, "Debe seleccionar un nivel"),
  category: z.string().min(1, "Debe seleccionar una categoría"),
  discipline: z.string().min(1, "Debe seleccionar una disciplina"),
  pointsRule: z.string().min(1, "Debe seleccionar las reglas de puntuación"),
  tiebreakRule: z.string().min(1, "Debe seleccionar las reglas de desempate"),
  isArchived: z.boolean(),
});

const CATEGORIAS = [
  "Primera",
  "Intermedia",
  "Pre-Intermedia",
  "M19",
  "M17",
  "M16",
  "M15",
  "Infantiles",
];

const NIVELES = ["Regional", "Local", "Nacional", "Amistoso"];
const DISCIPLINAS = ["Rugby", "Hockey"];

const TournamentForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;

  const [isLoading, setIsLoading] = useState(false);
  const [pointsRules, setPointsRules] = useState([]);
  const [tiebreakRules, setTiebreakRules] = useState([]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(tournamentSchema),
    defaultValues: {
      name: "",
      season: new Date().getFullYear(),
      level: "Local",
      category: "Primera",
      discipline: "Rugby",
      pointsRule: "",
      tiebreakRule: "",
      isArchived: false,
    },
  });

  const watchIsArchived = watch("isArchived");

  useEffect(() => {
    fetchRules();
    if (isEditing) {
      fetchTournament();
    }
  }, [id]);

  const fetchRules = async () => {
    try {
      const [pointsRes, tiebreakRes] = await Promise.all([
        axios.get("/api/tournaments/rules/points"),
        axios.get("/api/tournaments/rules/tiebreak"),
      ]);
      setPointsRules(pointsRes.data);
      setTiebreakRules(tiebreakRes.data);
    } catch (error) {
      toast.error("Error al cargar las reglas oficiales");
    }
  };

  const fetchTournament = async () => {
    try {
      const res = await axios.get(`/api/tournaments/${id}`);
      const data = res.data;
      setValue("name", data.name);
      setValue("season", data.season);
      setValue("level", data.level);
      setValue("category", data.category);
      setValue("discipline", data.discipline);
      setValue("pointsRule", data.pointsRule?._id || data.pointsRule);
      setValue("tiebreakRule", data.tiebreakRule?._id || data.tiebreakRule);
      setValue("isArchived", data.isArchived);
    } catch (error) {
      toast.error("Error al cargar el torneo");
      navigate("/admin/torneos");
    }
  };

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const payload = {
        ...data,
      };

      if (isEditing) {
        await axios.put(`/api/tournaments/${id}`, payload);
        toast.success("Torneo actualizado con éxito");
      } else {
        await axios.post("/api/tournaments", payload);
        toast.success("Torneo creado con éxito");
      }
      navigate("/admin/torneos");
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Error al guardar el torneo",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-black text-nyg-blue uppercase tracking-widest flex items-center gap-3">
          <Trophy className="w-8 h-8" />
          {isEditing ? "Editar Torneo" : "Nuevo Torneo"}
        </h1>
        <p className="text-sm font-bold text-gray-400 tracking-wider">
          Configura las reglas de puntuación y desempate oficiales
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-white border border-gray-100 shadow-sm rounded-3xl p-6 md:p-8 space-y-6">
          <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-2 mb-4">
            Datos Generales
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 ml-2">
                Nombre del Torneo *
              </label>
              <input
                type="text"
                {...register("name")}
                className={`block w-full px-6 py-3 bg-gray-50 border-2 ${errors.name ? "border-nyg-red" : "border-transparent"} rounded-full text-gray-800 focus:outline-none focus:bg-white focus:border-nyg-blue transition-all font-medium`}
                placeholder="Ej: Torneo Regional del NOA"
              />
              {errors.name && (
                <p className="text-xs font-bold text-nyg-red mt-1 ml-2">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 ml-2">
                Temporada (Año) *
              </label>
              <input
                type="number"
                {...register("season", { valueAsNumber: true })}
                className={`block w-full px-6 py-3 bg-gray-50 border-2 ${errors.season ? "border-nyg-red" : "border-transparent"} rounded-full text-gray-800 focus:outline-none focus:bg-white focus:border-nyg-blue transition-all font-medium`}
              />
              {errors.season && (
                <p className="text-xs font-bold text-nyg-red mt-1 ml-2">
                  {errors.season.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 ml-2">
                Nivel *
              </label>
              <div className="relative">
                <select
                  {...register("level")}
                  className={`block w-full pl-6 pr-12 py-3 bg-gray-50 border-2 ${errors.level ? "border-nyg-red" : "border-transparent"} rounded-full text-gray-800 focus:outline-none focus:bg-white focus:border-nyg-blue transition-all font-medium appearance-none cursor-pointer`}
                >
                  <option value="">Seleccionar</option>
                  {NIVELES.map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                </div>
              </div>
              {errors.level && (
                <p className="text-xs font-bold text-nyg-red mt-1 ml-2">
                  {errors.level.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 ml-2">
                Categoría *
              </label>
              <div className="relative">
                <select
                  {...register("category")}
                  className={`block w-full pl-6 pr-12 py-3 bg-gray-50 border-2 ${errors.category ? "border-nyg-red" : "border-transparent"} rounded-full text-gray-800 focus:outline-none focus:bg-white focus:border-nyg-blue transition-all font-medium appearance-none cursor-pointer`}
                >
                  <option value="">Seleccionar</option>
                  {CATEGORIAS.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                </div>
              </div>
              {errors.category && (
                <p className="text-xs font-bold text-nyg-red mt-1 ml-2">
                  {errors.category.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 ml-2">
                Disciplina *
              </label>
              <div className="relative">
                <select
                  {...register("discipline")}
                  className={`block w-full pl-6 pr-12 py-3 bg-gray-50 border-2 ${errors.discipline ? "border-nyg-red" : "border-transparent"} rounded-full text-gray-800 focus:outline-none focus:bg-white focus:border-nyg-blue transition-all font-medium appearance-none cursor-pointer`}
                >
                  <option value="">Seleccionar</option>
                  {DISCIPLINAS.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                </div>
              </div>
              {errors.discipline && (
                <p className="text-xs font-bold text-nyg-red mt-1 ml-2">
                  {errors.discipline.message}
                </p>
              )}
            </div>
          </div>

          <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-2 mt-8 mb-4">
            Reglas de Competencia
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 ml-2">
                Reglas de Puntuación *
              </label>
              <div className="relative">
                <select
                  {...register("pointsRule")}
                  className={`block w-full pl-6 pr-12 py-3 bg-gray-50 border-2 ${errors.pointsRule ? "border-nyg-red" : "border-transparent"} rounded-full text-gray-800 focus:outline-none focus:bg-white focus:border-nyg-blue transition-all font-medium appearance-none cursor-pointer`}
                >
                  <option value="">Seleccionar Regla</option>
                  {pointsRules.map((r) => (
                    <option key={r._id} value={r._id}>
                      {r.name}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                </div>
              </div>
              {errors.pointsRule && (
                <p className="text-xs font-bold text-nyg-red mt-1 ml-2">
                  {errors.pointsRule.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 ml-2">
                Reglas de Desempate *
              </label>
              <div className="relative">
                <select
                  {...register("tiebreakRule")}
                  className={`block w-full pl-6 pr-12 py-3 bg-gray-50 border-2 ${errors.tiebreakRule ? "border-nyg-red" : "border-transparent"} rounded-full text-gray-800 focus:outline-none focus:bg-white focus:border-nyg-blue transition-all font-medium appearance-none cursor-pointer`}
                >
                  <option value="">Seleccionar Regla</option>
                  {tiebreakRules.map((r) => (
                    <option key={r._id} value={r._id}>
                      {r.name}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                </div>
              </div>
              {errors.tiebreakRule && (
                <p className="text-xs font-bold text-nyg-red mt-1 ml-2">
                  {errors.tiebreakRule.message}
                </p>
              )}
            </div>
          </div>

          <div className="mt-8 p-6 bg-gray-50 rounded-3xl border border-gray-100 flex items-center justify-between">
            <div>
              <h4 className="text-sm font-bold text-gray-800 uppercase tracking-wider">
                Torneo Archivado
              </h4>
              <p className="text-xs text-gray-500 font-medium mt-1">
                Al archivar, no aparecerá en las tablas principales del sitio
                público.
              </p>
            </div>
            <label className="relative inline-block w-12 h-6 cursor-pointer">
              <input
                type="checkbox"
                className="peer sr-only"
                {...register("isArchived")}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-nyg-blue"></div>
            </label>
          </div>
        </div>

        {/* Botonera Flotante/Fija Abajo */}
        <div className="flex items-center justify-end gap-4 bg-white border border-gray-100 shadow-sm rounded-full p-4 px-6 mt-8">
          <Link
            to="/admin/torneos"
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
            {isEditing ? "Actualizar Torneo" : "Guardar Torneo"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TournamentForm;
