import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "../../../api/axiosConfig";
import {
  ArrowLeft,
  Save,
  Loader2,
  UploadCloud,
  AlertCircle,
  ChevronDown,
  Calendar,
} from "lucide-react";

const playerSchema = z.object({
  name: z.string().min(2, { message: "El nombre es obligatorio" }),
  birthDate: z.string().optional(),
  position: z.string().min(1, { message: "Seleccione una posición" }),
  category: z.string().min(1, { message: "Seleccione una categoría" }),
  weight: z.string().optional(),
  height: z.string().optional(),
  isActive: z.boolean().default(true),
});

const POSICIONES = [
  "Pilar",
  "Hooker",
  "Segunda Línea",
  "Ala",
  "Octavo",
  "Medio Scrum",
  "Apertura",
  "Centro",
  "Wing",
  "Fullback",
];

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

const PlayerForm = () => {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(isEditing);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(playerSchema),
    defaultValues: { isActive: true },
  });

  useEffect(() => {
    if (isEditing) {
      const fetchPlayer = async () => {
        try {
          const res = await axios.get(`/api/players/${id}`);
          const player = res.data.data;
          // Formatear fecha para el input type="date" (YYYY-MM-DD)
          const formattedDate = player.dateOfBirth
            ? new Date(player.dateOfBirth).toISOString().split("T")[0]
            : "";

          reset({
            name: player.name,
            birthDate: formattedDate,
            position: player.position,
            category: player.category,
            weight: player.weight ? player.weight.toString() : "",
            height: player.height ? player.height.toString() : "",
            isActive: player.isActive,
          });
          setImageUrl(player.imageUrl || "");
        } catch (error) {
          setErrorMsg("Error al cargar los datos del jugador.");
        } finally {
          setIsFetching(false);
        }
      };
      fetchPlayer();
    }
  }, [id, isEditing, reset]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    setUploadingImage(true);
    setErrorMsg("");

    try {
      const res = await axios.post("/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setImageUrl(res.data.imageUrl);
    } catch (error) {
      console.error(error);
      setErrorMsg("Error al subir la imagen. Verifica el peso y el formato.");
    } finally {
      setUploadingImage(false);
    }
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    setErrorMsg("");

    const payload = {
      ...data,
      dateOfBirth: data.birthDate ? data.birthDate : undefined,
      imageUrl: imageUrl,
      weight: data.weight ? parseFloat(data.weight) : undefined,
      height: data.height ? parseFloat(data.height) : undefined,
    };
    delete payload.birthDate;

    try {
      if (isEditing) {
        await axios.put(`/api/players/${id}`, payload);
      } else {
        await axios.post("/api/players", payload);
      }
      navigate("/admin/planteles");
    } catch (error) {
      console.error(error);
      setErrorMsg("Error al guardar el jugador. Intenta nuevamente.");
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="flex justify-center items-center h-64 text-nyg-blue">
        <Loader2 className="animate-spin w-10 h-10" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 md:space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            to="/admin/planteles"
            className="p-3 bg-white border border-gray-100 rounded-full text-gray-400 hover:text-nyg-blue hover:shadow-md transition-all"
          >
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-nyg-blue uppercase tracking-wider">
              {isEditing ? "Editar Jugador" : "Nuevo Jugador"}
            </h1>
          </div>
        </div>
      </div>

      {errorMsg && (
        <div className="bg-red-50 border-l-4 border-nyg-red p-4 rounded-2xl flex items-start gap-3 shadow-sm">
          <AlertCircle className="w-5 h-5 text-nyg-red shrink-0" />
          <p className="text-sm font-bold text-nyg-red">{errorMsg}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        
        {/* Contenedor Principal divido en Foto + Datos */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 md:gap-8">
          
          {/* Columna Izquierda (Foto y Estado) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white border border-gray-100 shadow-sm rounded-3xl p-6 md:p-8 flex flex-col items-center">
              
              <div className="relative w-40 h-40 mb-6 group cursor-pointer">
                <div className="w-full h-full rounded-full border-4 border-gray-50 overflow-hidden bg-gray-100 shadow-inner flex items-center justify-center">
                  {imageUrl ? (
                    <img src={imageUrl} alt="Perfil" className="w-full h-full object-cover object-top" />
                  ) : (
                    <span className="text-4xl font-black text-gray-300">NYG</span>
                  )}
                </div>
                
                {/* Overlay de Carga */}
                <label className="absolute inset-0 bg-nyg-blue/80 rounded-full flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  {uploadingImage ? (
                    <Loader2 className="animate-spin w-8 h-8" />
                  ) : (
                    <>
                      <UploadCloud className="w-8 h-8 mb-1" />
                      <span className="text-xs font-bold uppercase tracking-widest">Subir Foto</span>
                    </>
                  )}
                  <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={uploadingImage} />
                </label>
              </div>

              <div className="w-full">
                <label className="flex items-center justify-between p-4 px-5 rounded-2xl border-2 border-gray-50 bg-gray-50/50 cursor-pointer hover:bg-gray-50 transition-colors">
                  <span className="text-sm font-bold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                    Jugador Activo
                  </span>
                  <div className="relative inline-block w-12 shrink-0 align-middle select-none transition duration-200 ease-in ml-2">
                    <input
                      type="checkbox"
                      {...register("isActive")}
                      className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                      style={{ right: 0 }}
                    />
                    <label className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Columna Derecha (Datos Personales y Deportivos) */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white border border-gray-100 shadow-sm rounded-3xl p-6 md:p-8 space-y-6">
              <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-2">
                Datos Principales
              </h3>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 ml-2">
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  {...register("name")}
                  className={`block w-full px-6 py-3 bg-gray-50 border-2 ${errors.name ? "border-nyg-red" : "border-transparent"} rounded-full text-gray-800 focus:outline-none focus:bg-white focus:border-nyg-blue transition-all font-medium`}
                  placeholder="Ej: Gabriel Ascárate"
                />
                {errors.name && (
                  <p className="text-xs font-bold text-nyg-red mt-1 ml-2">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    Posición *
                  </label>
                  <div className="relative">
                    <select
                      {...register("position")}
                      className={`block w-full pl-6 pr-12 py-3 bg-gray-50 border-2 ${errors.position ? "border-nyg-red" : "border-transparent"} rounded-full text-gray-800 focus:outline-none focus:bg-white focus:border-nyg-blue transition-all font-medium appearance-none cursor-pointer`}
                    >
                      <option value="">Seleccione Posición</option>
                      {POSICIONES.map((pos) => (
                        <option key={pos} value={pos}>
                          {pos}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                  {errors.position && (
                    <p className="text-xs font-bold text-nyg-red mt-1 ml-2">
                      {errors.position.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-100 shadow-sm rounded-3xl p-6 md:p-8 space-y-6">
              <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-2">
                Datos Físicos (Opcional)
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 ml-2">
                    Nacimiento
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      {...register("birthDate")}
                      className="block w-full pl-12 pr-6 py-3 bg-gray-50 border-2 border-transparent rounded-full text-gray-800 focus:outline-none focus:bg-white focus:border-nyg-blue transition-all font-bold text-sm uppercase tracking-wider"
                    />
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Calendar className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 ml-2">
                    Peso (KG)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    {...register("weight")}
                    className="block w-full px-6 py-3 bg-gray-50 border-2 border-transparent rounded-full text-gray-800 focus:outline-none focus:bg-white focus:border-nyg-blue transition-all font-medium text-center"
                    placeholder="Ej: 95.5"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 ml-2">
                    Altura (CM)
                  </label>
                  <input
                    type="number"
                    {...register("height")}
                    className="block w-full px-6 py-3 bg-gray-50 border-2 border-transparent rounded-full text-gray-800 focus:outline-none focus:bg-white focus:border-nyg-blue transition-all font-medium text-center"
                    placeholder="Ej: 185"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Botonera Flotante/Fija Abajo */}
        <div className="flex items-center justify-end gap-4 bg-white border border-gray-100 shadow-sm rounded-full p-4 px-6 mt-8">
          <Link
            to="/admin/planteles"
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
            {isEditing ? "Actualizar Jugador" : "Guardar Jugador"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PlayerForm;
