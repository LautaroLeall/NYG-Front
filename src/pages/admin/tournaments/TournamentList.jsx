import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../../../api/axiosConfig";
import toast from "react-hot-toast";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Loader2,
  AlertCircle,
  Trophy,
} from "lucide-react";

const TournamentList = () => {
  const [tournaments, setTournaments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSeason, setFilterSeason] = useState("");

  useEffect(() => {
    fetchTournaments();
  }, []);

  const fetchTournaments = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get("/api/tournaments");
      setTournaments(res.data);
    } catch (error) {
      console.error(error);
      toast.error("Error al cargar los torneos");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`¿Estás seguro de eliminar el torneo "${name}"?`)) {
      try {
        await axios.delete(`/api/tournaments/${id}`);
        toast.success("Torneo eliminado");
        fetchTournaments();
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Error al eliminar el torneo",
        );
      }
    }
  };

  const filteredTournaments = tournaments.filter((tournament) => {
    const matchSearch = tournament.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchSeason = filterSeason
      ? tournament.season.toString() === filterSeason
      : true;

    return matchSearch && matchSeason;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-nyg-blue uppercase tracking-widest flex items-center gap-3">
            <Trophy className="w-8 h-8" />
            Torneos
          </h1>
          <p className="text-sm font-bold text-gray-400 tracking-wider">
            Gestión de competencias oficiales y amistosas
          </p>
        </div>
        <Link
          to="/admin/torneos/nuevo"
          className="flex items-center justify-center gap-2 px-6 py-3 bg-nyg-blue hover:bg-blue-800 text-white rounded-full font-black uppercase tracking-widest text-sm shadow-md hover:shadow-xl transition-all"
        >
          <Plus size={18} />
          Nuevo Torneo
        </Link>
      </div>

      <div className="bg-white border border-gray-100 shadow-sm rounded-3xl p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar por nombre..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-transparent focus:border-nyg-blue focus:bg-white rounded-full text-sm font-bold text-gray-700 outline-none transition-all"
            />
          </div>
          <div className="w-full md:w-48">
            <select
              value={filterSeason}
              onChange={(e) => setFilterSeason(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent focus:border-nyg-blue focus:bg-white rounded-full text-sm font-bold text-gray-700 outline-none transition-all appearance-none cursor-pointer"
            >
              <option value="">Todas las Temporadas</option>
              <option value="2026">2026</option>
              <option value="2025">2025</option>
            </select>
          </div>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <Loader2 className="w-10 h-10 animate-spin mb-4 text-nyg-blue" />
            <p className="text-sm font-bold tracking-widest uppercase">
              Cargando torneos...
            </p>
          </div>
        ) : filteredTournaments.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400 text-center">
            <AlertCircle className="w-12 h-12 mb-4 opacity-20" />
            <p className="text-sm font-bold tracking-widest uppercase">
              No se encontraron torneos
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-100">
                  <th className="py-4 px-6 text-xs font-black text-gray-400 uppercase tracking-widest">
                    Torneo
                  </th>
                  <th className="py-4 px-6 text-xs font-black text-gray-400 uppercase tracking-widest text-center">
                    Categoría
                  </th>
                  <th className="py-4 px-6 text-xs font-black text-gray-400 uppercase tracking-widest text-center">
                    Temporada
                  </th>
                  <th className="py-4 px-6 text-xs font-black text-gray-400 uppercase tracking-widest text-center">
                    Estado
                  </th>
                  <th className="py-4 px-6 text-xs font-black text-gray-400 uppercase tracking-widest text-right">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredTournaments.map((t) => (
                  <tr
                    key={t._id}
                    className="border-b border-gray-50 hover:bg-gray-50 transition-colors group"
                  >
                    <td className="py-4 px-6">
                      <div className="flex flex-col">
                        <span className="font-bold text-gray-800 uppercase tracking-wide text-sm">
                          {t.name}
                        </span>
                        <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">
                          Nivel: {t.level}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span className="inline-block px-3 py-1 bg-gray-100 text-gray-500 rounded-full text-xs font-bold uppercase tracking-wider">
                        {t.category}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center font-black text-gray-700">
                      {t.season}
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                          t.isArchived
                            ? "bg-red-50 text-nyg-red"
                            : "bg-green-50 text-green-600"
                        }`}
                      >
                        {t.isArchived ? "Archivado" : "Activo"}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link
                          to={`/admin/torneos/editar/${t._id}`}
                          className="p-2 text-gray-400 hover:text-nyg-blue bg-white hover:bg-blue-50 rounded-full transition-colors shadow-sm"
                          title="Editar"
                        >
                          <Edit2 size={16} />
                        </Link>
                        <button
                          onClick={() => handleDelete(t._id, t.name)}
                          className="p-2 text-gray-400 hover:text-nyg-red bg-white hover:bg-red-50 rounded-full transition-colors shadow-sm"
                          title="Eliminar"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default TournamentList;
