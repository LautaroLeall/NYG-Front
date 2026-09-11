import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, Save, Loader2, Upload, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";
import axios from "../../../api/axiosConfig";
import dayjs from "dayjs";

// Validaciones estrictas con Zod
const newsSchema = z.object({
  title: z
    .string()
    .min(5, "El título debe tener al menos 5 caracteres")
    .max(120, "El título no puede superar los 120 caracteres"),
  subtitle: z
    .string()
    .min(5, "El subtítulo debe tener al menos 5 caracteres")
    .max(250, "El subtítulo no puede superar los 250 caracteres"),
  content: z
    .string()
    .min(
      50,
      "El contenido de la noticia debe tener al menos 50 caracteres (redacta algo más extenso).",
    ),
  category: z.enum(["Institucional", "Rugby", "Hockey", "Infantiles", "Club"], {
    errorMap: () => ({ message: "Selecciona una categoría válida" }),
  }),
  discipline: z.enum(["Rugby", "Hockey", ""]).optional().nullable(),
  author: z.string().min(2, "El nombre del autor es obligatorio"),
  isPublished: z.boolean(),
  isFeatured: z.boolean(),
  publishDate: z.string().refine(
    (date) => {
      // Validar que no sea mayor a 1 año en el futuro
      const maxDate = dayjs().add(1, "year");
      return dayjs(date).isBefore(maxDate);
    },
    { message: "La fecha de publicación no puede ser tan lejana en el futuro" },
  ),
});

const CATEGORIES = ["Institucional", "Rugby", "Hockey", "Infantiles", "Club"];
const DISCIPLINES = ["Rugby", "Hockey"];

const NewsForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(newsSchema),
    defaultValues: {
      title: "",
      subtitle: "",
      content: "",
      category: "Institucional",
      discipline: "",
      author: "Prensa NYG",
      isPublished: false,
      isFeatured: false,
      publishDate: dayjs().format("YYYY-MM-DD"),
    },
  });

  useEffect(() => {
    if (isEditing) {
      const fetchNewsItem = async () => {
        try {
          setIsLoading(true);
          const res = await axios.get(`/api/news/admin/${id}`);
          const item = res.data.data;
          
          if (item) {
            setValue("title", item.title);
            setValue("subtitle", item.subtitle);
            setValue("content", item.content);
            setValue("category", item.category);
            setValue("discipline", item.discipline || "");
            setValue("author", item.author);
            setValue("isPublished", item.isPublished);
            setValue("isFeatured", item.isFeatured);
            setValue("publishDate", dayjs(item.publishDate).format("YYYY-MM-DD"));
            setImageUrl(item.imageUrl || "");
          }
        } catch (error) {
          toast.error("Error al cargar la noticia");
          navigate("/admin/noticias");
        } finally {
          setIsLoading(false);
        }
      };
      fetchNewsItem();
    }
  }, [id, isEditing, setValue, navigate]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      return toast.error("Solo se permiten archivos de imagen");
    }

    if (file.size > 5 * 1024 * 1024) {
      return toast.error("La imagen no puede pesar más de 5MB");
    }

    const formData = new FormData();
    formData.append("image", file);
    formData.append("folder", "news");

    setIsUploading(true);
    toast.loading("Subiendo portada...", { id: "upload-toast" });

    try {
      const res = await axios.post("/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setImageUrl(res.data.imageUrl);
      toast.success("Portada subida con éxito", { id: "upload-toast" });
    } catch (error) {
      console.error(error);
      toast.error("Error al subir la imagen", { id: "upload-toast" });
    } finally {
      setIsUploading(false);
    }
  };

  const onSubmit = async (data) => {
    if (!imageUrl) {
      toast.error("Debes subir una imagen de portada obligatoriamente");
      return;
    }

    const payload = {
      ...data,
      imageUrl,
      discipline: data.discipline === "" ? null : data.discipline,
    };

    try {
      setIsLoading(true);
      if (isEditing) {
        await axios.put(`/api/news/${id}`, payload);
        toast.success("Noticia actualizada con éxito");
      } else {
        await axios.post("/api/news", payload);
        toast.success("Noticia creada con éxito");
      }
      navigate("/admin/noticias");
    } catch (error) {
      const errorData = error.response?.data?.error;
      const errorMessage = typeof errorData === 'object' && errorData !== null 
        ? errorData.message 
        : errorData;
      toast.error(errorMessage || "Error al guardar la noticia");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20">
      {/* Header */}
      <div className="flex items-center gap-4 bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-gray-100">
        <Link
          to="/admin/noticias"
          className="p-2 text-gray-400 hover:text-nyg-blue hover:bg-gray-50 rounded-xl transition-colors"
        >
          <ArrowLeft size={24} />
        </Link>
        <div>
          <h1 className="text-2xl font-black text-gray-800">
            {isEditing ? "Editar Noticia" : "Redactar Nueva Noticia"}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {isEditing
              ? "Modifica los datos de la nota existente."
              : "Completa los campos para publicar un nuevo artículo en la web."}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Columna Principal (Formulario) */}
          <div className="md:col-span-2 space-y-6 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            {/* Título */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Título de la Noticia <span className="text-nyg-red">*</span>
              </label>
              <input
                type="text"
                {...register("title")}
                className={`w-full px-4 py-3 rounded-xl border ${
                  errors.title ? "border-red-300 bg-red-50" : "border-gray-200"
                } focus:ring-2 focus:ring-nyg-blue focus:border-transparent transition-all outline-hidden`}
                placeholder="Ej: NYG se consagra campeón..."
              />
              {errors.title && (
                <p className="mt-1.5 text-sm text-red-500 font-medium flex items-center gap-1">
                  <AlertCircle size={14} /> {errors.title.message}
                </p>
              )}
            </div>

            {/* Subtítulo */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Bajada / Subtítulo <span className="text-nyg-red">*</span>
              </label>
              <textarea
                {...register("subtitle")}
                rows="2"
                className={`w-full px-4 py-3 rounded-xl border ${
                  errors.subtitle
                    ? "border-red-300 bg-red-50"
                    : "border-gray-200"
                } focus:ring-2 focus:ring-nyg-blue focus:border-transparent transition-all outline-hidden resize-none`}
                placeholder="Breve resumen para atraer al lector..."
              />
              {errors.subtitle && (
                <p className="mt-1.5 text-sm text-red-500 font-medium flex items-center gap-1">
                  <AlertCircle size={14} /> {errors.subtitle.message}
                </p>
              )}
            </div>

            {/* Contenido */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Cuerpo de la Noticia <span className="text-nyg-red">*</span>
              </label>
              <textarea
                {...register("content")}
                rows="15"
                className={`w-full px-4 py-3 rounded-xl border ${
                  errors.content
                    ? "border-red-300 bg-red-50"
                    : "border-gray-200"
                } focus:ring-2 focus:ring-nyg-blue focus:border-transparent transition-all outline-hidden resize-y`}
                placeholder="Escribe el artículo aquí... (Puedes usar separaciones de párrafos)"
              />
              {errors.content && (
                <p className="mt-1.5 text-sm text-red-500 font-medium flex items-center gap-1">
                  <AlertCircle size={14} /> {errors.content.message}
                </p>
              )}
              <p className="text-xs text-gray-400 mt-2">
                Los saltos de línea se respetarán al mostrar la noticia en la
                web pública.
              </p>
            </div>
          </div>

          {/* Columna Secundaria (Metadatos y Portada) */}
          <div className="space-y-6">
            {/* Foto de Portada */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <label className="block text-sm font-bold text-gray-700 mb-4">
                Foto de Portada <span className="text-nyg-red">*</span>
              </label>

              <div className="relative aspect-video bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center overflow-hidden group hover:border-nyg-blue transition-colors">
                {imageUrl ? (
                  <>
                    <img
                      src={imageUrl}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-white font-medium flex items-center gap-2">
                        <Upload size={18} /> Cambiar Foto
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="text-center p-4">
                    <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500 font-medium">
                      Click para subir
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      JPG, PNG (Max. 5MB)
                    </p>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/jpeg, image/png, image/webp"
                  onChange={handleImageUpload}
                  disabled={isUploading}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                />
              </div>
            </div>

            {/* Configuraciones */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-5">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Categoría
                </label>
                <select
                  {...register("category")}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-nyg-blue focus:border-transparent bg-white outline-hidden"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Disciplina Relacionada
                </label>
                <select
                  {...register("discipline")}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-nyg-blue focus:border-transparent bg-white outline-hidden"
                >
                  <option value="">General (Ambas / Ninguna)</option>
                  {DISCIPLINES.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Autor
                </label>
                <input
                  type="text"
                  {...register("author")}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-nyg-blue outline-hidden"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Fecha de Publicación
                </label>
                <input
                  type="date"
                  {...register("publishDate")}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    errors.publishDate ? "border-red-300" : "border-gray-200"
                  } focus:ring-2 focus:ring-nyg-blue outline-hidden`}
                />
                {errors.publishDate && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.publishDate.message}
                  </p>
                )}
              </div>

              <div className="pt-4 border-t border-gray-100 space-y-3">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative">
                    <input
                      type="checkbox"
                      {...register("isPublished")}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-nyg-blue transition-colors"></div>
                    <div className="absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform peer-checked:translate-x-5 shadow-sm"></div>
                  </div>
                  <span className="text-sm font-bold text-gray-700 group-hover:text-nyg-blue transition-colors">
                    Publicar Inmediatamente
                  </span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative">
                    <input
                      type="checkbox"
                      {...register("isFeatured")}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-yellow-500 transition-colors"></div>
                    <div className="absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform peer-checked:translate-x-5 shadow-sm"></div>
                  </div>
                  <span className="text-sm font-bold text-gray-700 group-hover:text-yellow-600 transition-colors">
                    Marcar como Destacada
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Action Bar */}
        <div className="fixed bottom-0 left-0 right-0 md:left-64 bg-white/80 backdrop-blur-md border-t border-gray-200 p-4 shadow-[0_-10px_30px_rgba(0,0,0,0.05)] z-40">
          <div className="max-w-4xl mx-auto flex items-center justify-end gap-4">
            <Link
              to="/admin/noticias"
              className="px-6 py-2.5 text-gray-600 font-bold hover:bg-gray-100 rounded-xl transition-colors"
            >
              Cancelar
            </Link>
            <button
              type="submit"
              disabled={isLoading || isUploading}
              className="flex items-center gap-2 bg-nyg-blue hover:bg-blue-900 text-white px-8 py-2.5 rounded-xl font-bold transition-all shadow-md shadow-blue-200 hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Guardando...
                </>
              ) : (
                <>
                  <Save size={20} />
                  {isEditing ? "Actualizar Noticia" : "Guardar Noticia"}
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewsForm;
