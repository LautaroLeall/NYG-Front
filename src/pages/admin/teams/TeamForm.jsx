import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "../../../api/axiosConfig";
import toast from "react-hot-toast";
import { Save, Loader2, Camera, ChevronDown, ArrowLeft } from "lucide-react";

const teamSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  shortName: z.string().min(1, "El nombre corto es obligatorio"),
  club: z.string().min(2, "El nombre del club es obligatorio"),
  category: z.string().min(1, "Debe seleccionar una categoría"),
  discipline: z.string().min(1, "Debe seleccionar una disciplina"),
  isOwnTeam: z.boolean(),
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

const DISCIPLINAS = ["Rugby", "Hockey"];

const TeamForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [isLoading, setIsLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [logoPreview, setLogoPreview] = useState("/escudos/default.png");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(teamSchema),
    defaultValues: {
      isOwnTeam: false,
      discipline: "Rugby",
      category: "Primera",
    },
  });

  const isOwnTeam = watch("isOwnTeam");

  useEffect(() => {
    if (isEditing) {
      fetchTeam();
    }
  }, [id]);

  const fetchTeam = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`/api/teams/${id}`);
      const team = res.data;

      setValue("name", team.name);
      setValue("shortName", team.shortName);
      setValue("club", team.club);
      setValue("category", team.category);
      setValue("discipline", team.discipline);
      setValue("isOwnTeam", team.isOwnTeam);

      if (team.logo && team.logo !== "/escudos/default.png") {
        setLogoPreview(team.logo);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error al cargar los datos del equipo");
      navigate("/admin/equipos");
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      toast.error("La imagen no puede pesar más de 10MB");
      return;
    }

    try {
      setUploadingImage(true);
      const formData = new FormData();
      formData.append("image", file);
      // Podemos usar el mismo endpoint de upload que usamos para jugadores,
      // asumiendo que no está fuertemente acoplado (generalmente sube a cloudinary y devuelve URL)
      const res = await axios.post("/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setLogoPreview(res.data.imageUrl);
      toast.success("Escudo subido correctamente");
    } catch (error) {
      console.error(error);
      toast.error("Error al subir el escudo");
    } finally {
      setUploadingImage(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const payload = {
        ...data,
        logo: logoPreview,
      };

      if (isEditing) {
        await axios.put(`/api/teams/${id}`, payload);
        toast.success("Equipo actualizado con éxito");
      } else {
        await axios.post("/api/teams", payload);
        toast.success("Equipo creado con éxito");
      }
      navigate("/admin/equipos");
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Error al guardar el equipo",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4 border-b border-gray-100 pb-6">
        <Link
          to="/admin/equipos"
          className="w-10 h-10 flex items-center justify-center bg-white border border-gray-100 shadow-sm rounded-full text-gray-400 hover:text-nyg-blue hover:shadow-md transition-all"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-3xl font-black text-nyg-blue uppercase tracking-tight">
            {isEditing ? "Editar Equipo" : "Nuevo Equipo"}
          </h1>
          <p className="text-gray-500 font-medium mt-1">
            Completá los datos del plantel o club rival
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Columna Izquierda (Foto y Estado) */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white border border-gray-100 shadow-sm rounded-3xl p-6 flex flex-col items-center text-center space-y-6">
              <div className="relative group cursor-pointer">
                <div className="w-40 h-40 rounded-full overflow-hidden bg-gray-50 border-4 border-white shadow-lg flex items-center justify-center p-2">
                  <img
                    src={logoPreview}
                    alt="Preview"
                    className="w-full h-full object-contain"
                  />
                  {uploadingImage && (
                    <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center">
                      <Loader2 className="w-8 h-8 text-white animate-spin mb-2" />
                      <span className="text-white text-xs font-bold uppercase tracking-wider">
                        Subiendo...
                      </span>
                    </div>
                  )}
                </div>
                <label className="absolute bottom-2 right-2 w-12 h-12 bg-nyg-blue text-white rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:bg-blue-800 transition-colors group-hover:scale-110">
                  <Camera size={20} />
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </label>
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-lg uppercase tracking-widest">
                  Escudo / Logo
                </h3>
                <p className="text-xs text-gray-400 mt-1">
                  JPG, PNG o WEBP. Max 10MB. Transparente recomendado.
                </p>
              </div>
            </div>

            <div className="bg-white border border-gray-100 shadow-sm rounded-3xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-gray-800 uppercase tracking-widest text-sm">
                    {isOwnTeam ? "Equipo Propio" : "Club Rival"}
                  </h4>
                  <p className="text-xs text-gray-400 mt-1">
                    {isOwnTeam ? "Pertenece a NYG" : "Es un oponente"}
                  </p>
                </div>
                <label className="flex items-center cursor-pointer">
                  <div className="relative">
                    <input
                      type="checkbox"
                      className="sr-only"
                      {...register("isOwnTeam")}
                    />
                    <div
                      className={`block w-14 h-8 rounded-full transition-colors ${isOwnTeam ? "bg-nyg-blue" : "bg-gray-300"}`}
                    ></div>
                    <div
                      className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${isOwnTeam ? "transform translate-x-6" : ""}`}
                    ></div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Columna Derecha (Datos Principales) */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white border border-gray-100 shadow-sm rounded-3xl p-6 md:p-8 space-y-6">
              <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-2">
                Datos del Equipo
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 ml-2">
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    {...register("name")}
                    className={`block w-full px-6 py-3 bg-gray-50 border-2 ${errors.name ? "border-nyg-red" : "border-transparent"} rounded-full text-gray-800 focus:outline-none focus:bg-white focus:border-nyg-blue transition-all font-medium`}
                    placeholder="Ej: Lince RC Primera"
                  />
                  {errors.name && (
                    <p className="text-xs font-bold text-nyg-red mt-1 ml-2">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 ml-2">
                    Nombre Corto *
                  </label>
                  <input
                    type="text"
                    {...register("shortName")}
                    className={`block w-full px-6 py-3 bg-gray-50 border-2 ${errors.shortName ? "border-nyg-red" : "border-transparent"} rounded-full text-gray-800 focus:outline-none focus:bg-white focus:border-nyg-blue transition-all font-medium`}
                    placeholder="Ej: Lince"
                  />
                  {errors.shortName && (
                    <p className="text-xs font-bold text-nyg-red mt-1 ml-2">
                      {errors.shortName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 ml-2">
                    Club al que pertenece *
                  </label>
                  <input
                    type="text"
                    {...register("club")}
                    className={`block w-full px-6 py-3 bg-gray-50 border-2 ${errors.club ? "border-nyg-red" : "border-transparent"} rounded-full text-gray-800 focus:outline-none focus:bg-white focus:border-nyg-blue transition-all font-medium`}
                    placeholder="Ej: Lince RC"
                  />
                  {errors.club && (
                    <p className="text-xs font-bold text-nyg-red mt-1 ml-2">
                      {errors.club.message}
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
                      <option value="">Seleccione Categoría</option>
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
                      {DISCIPLINAS.map((disc) => (
                        <option key={disc} value={disc}>
                          {disc}
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
            </div>
          </div>
        </div>

        {/* Botonera */}
        <div className="flex items-center justify-end gap-4 bg-white border border-gray-100 shadow-sm rounded-full p-4 px-6 mt-8">
          <Link
            to="/admin/equipos"
            className="px-6 py-3 text-gray-500 font-bold uppercase tracking-widest text-sm hover:text-nyg-blue transition-colors"
          >
            Cancelar
          </Link>
          <button
            type="submit"
            disabled={isLoading || uploadingImage}
            className="flex items-center gap-2 px-8 py-3 bg-nyg-blue hover:bg-blue-800 text-white rounded-full font-black uppercase tracking-widest text-sm shadow-md hover:shadow-xl hover:-translate-y-1 transition-all disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isLoading ? (
              <Loader2 className="animate-spin w-5 h-5" />
            ) : (
              <Save className="w-5 h-5" />
            )}
            {isEditing ? "Actualizar Equipo" : "Guardar Equipo"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TeamForm;
