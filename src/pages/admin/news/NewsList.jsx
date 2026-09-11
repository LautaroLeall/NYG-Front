import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  XCircle,
  Newspaper,
  ExternalLink,
} from "lucide-react";
import toast from "react-hot-toast";
import axios from "../../../api/axiosConfig";
import dayjs from "dayjs";
import "dayjs/locale/es";
dayjs.locale("es");

const NewsList = () => {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchNews = async () => {
    try {
      setIsLoading(true);
      // Fetch news with allStatus=true para que el admin vea también los borradores
      const res = await axios.get("/api/news?allStatus=true&limit=100");
      setNews(res.data.data || []);
    } catch (error) {
      toast.error("Error al cargar las noticias");
      setNews([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleDelete = async (id) => {
    if (
      window.confirm(
        "¿Estás seguro de eliminar esta noticia? Esta acción no se puede deshacer.",
      )
    ) {
      try {
        await axios.delete(`/api/news/${id}`);
        toast.success("Noticia eliminada correctamente");
        fetchNews();
      } catch (error) {
        toast.error("Error al eliminar la noticia");
      }
    }
  };

  const handleTogglePublish = async (id, currentStatus) => {
    try {
      await axios.put(`/api/news/${id}`, { isPublished: !currentStatus });
      toast.success(
        currentStatus ? "Noticia ocultada" : "Noticia publicada con éxito",
      );
      fetchNews();
    } catch (error) {
      toast.error("Error al cambiar estado de publicación");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-black text-gray-800 flex items-center gap-3">
            <Newspaper className="text-nyg-red" />
            Gestión de Noticias
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Crea, edita y publica las notas del club.
          </p>
        </div>
        <Link
          to="/admin/noticias/nueva"
          className="flex items-center gap-2 bg-nyg-red hover:bg-red-700 text-white px-5 py-2.5 rounded-xl font-bold transition-colors shadow-md shadow-red-200"
        >
          <Plus size={20} />
          Redactar Nota
        </Link>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 text-xs uppercase tracking-wider">
                <th className="p-4 font-bold">Portada</th>
                <th className="p-4 font-bold">Título</th>
                <th className="p-4 font-bold">Categoría</th>
                <th className="p-4 font-bold text-center">Estado</th>
                <th className="p-4 font-bold text-center">Destacada</th>
                <th className="p-4 font-bold">Fecha</th>
                <th className="p-4 font-bold text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {isLoading ? (
                <tr>
                  <td colSpan="7" className="text-center py-10 text-gray-500">
                    <div className="flex justify-center">
                      <div className="w-8 h-8 border-4 border-nyg-red border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  </td>
                </tr>
              ) : news.length === 0 ? (
                <tr>
                  <td
                    colSpan="7"
                    className="text-center py-10 text-gray-500 font-medium"
                  >
                    No hay noticias cargadas.
                  </td>
                </tr>
              ) : (
                news.map((item) => (
                  <tr
                    key={item._id}
                    className="hover:bg-gray-50/50 transition-colors group"
                  >
                    <td className="p-4">
                      <div className="w-16 h-12 bg-gray-100 rounded-lg overflow-hidden shadow-sm">
                        {item.imageUrl ? (
                          <img
                            src={item.imageUrl}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <Newspaper size={20} />
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <div
                        className="font-bold text-gray-800 line-clamp-1"
                        title={item.title}
                      >
                        {item.title}
                      </div>
                      <div className="text-xs text-gray-400">
                        Por {item.author}
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
                        {item.category}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() =>
                          handleTogglePublish(item._id, item.isPublished)
                        }
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold transition-colors ${
                          item.isPublished
                            ? "bg-green-50 text-green-700 hover:bg-green-100 border border-green-200"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-200"
                        }`}
                      >
                        {item.isPublished ? (
                          <>
                            <CheckCircle2 size={14} /> Publicada
                          </>
                        ) : (
                          <>
                            <XCircle size={14} /> Borrador
                          </>
                        )}
                      </button>
                    </td>
                    <td className="p-4 text-center">
                      {item.isFeatured ? (
                        <span
                          className="text-yellow-500 text-xl"
                          title="Noticia Destacada"
                        >
                          ★
                        </span>
                      ) : (
                        <span className="text-gray-300 text-xl">☆</span>
                      )}
                    </td>
                    <td className="p-4 text-gray-600">
                      {dayjs(item.publishDate).format("DD MMM YYYY")}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link
                          to={`/noticias/${item.slug}`}
                          target="_blank"
                          title="Ver en la web"
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <ExternalLink size={18} />
                        </Link>
                        <Link
                          to={`/admin/noticias/editar/${item._id}`}
                          title="Editar"
                          className="p-2 text-gray-400 hover:text-nyg-blue hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Edit2 size={18} />
                        </Link>
                        <button
                          onClick={() => handleDelete(item._id)}
                          title="Eliminar"
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default NewsList;
