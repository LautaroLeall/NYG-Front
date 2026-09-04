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
} from "lucide-react";

const TeamList = () => {
  const [teams, setTeams] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterType, setFilterType] = useState(""); // "own", "rival", o ""

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get("/api/teams");
      setTeams(res.data);
    } catch (error) {
      console.error(error);
      toast.error("Error al cargar equipos");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar este equipo?")) return;
    try {
      await axios.delete(`/api/teams/${id}`);
      toast.success("Equipo eliminado correctamente");
      fetchTeams();
    } catch (error) {
      console.error(error);
      toast.error("Error al eliminar el equipo");
    }
  };

  // Filtrado
  const filteredTeams = teams.filter((team) => {
    const matchesSearch =
      team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      team.club.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory
      ? team.category === filterCategory
      : true;
    const matchesType =
      filterType === "own"
        ? team.isOwnTeam === true
        : filterType === "rival"
          ? team.isOwnTeam === false
          : true;

    return matchesSearch && matchesCategory && matchesType;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-nyg-blue uppercase tracking-tight">
            Equipos y Clubes
          </h1>
          <p className="text-gray-500 font-medium mt-1">
            Gestión de planteles propios y clubes rivales
          </p>
        </div>
        <Link
          to="/admin/equipos/nuevo"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-nyg-blue hover:bg-blue-800 text-white rounded-full font-black uppercase tracking-widest text-sm transition-all shadow-md hover:shadow-xl hover:-translate-y-1"
        >
          <Plus size={18} /> Nuevo Equipo
        </Link>
      </div>

      {/* Controles de Búsqueda */}
      <div className="bg-white border border-gray-100 shadow-sm rounded-3xl p-6 flex flex-col md:flex-row gap-4">
        {/* Buscador */}
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Buscar por nombre o club..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-transparent rounded-full text-gray-800 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-nyg-blue transition-all font-medium"
          />
        </div>

        {/* Filtro Tipo */}
        <div className="md:w-48">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="block w-full px-6 py-3 bg-gray-50 border-2 border-transparent rounded-full text-gray-800 font-bold uppercase tracking-wider text-sm focus:outline-none focus:bg-white focus:border-nyg-blue transition-all cursor-pointer appearance-none"
          >
            <option value="">Todos (Propios y Rivales)</option>
            <option value="own">Equipos NYG</option>
            <option value="rival">Clubes Rivales</option>
          </select>
        </div>

        {/* Filtro Categoría */}
        <div className="md:w-48">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="block w-full px-6 py-3 bg-gray-50 border-2 border-transparent rounded-full text-gray-800 font-bold uppercase tracking-wider text-sm focus:outline-none focus:bg-white focus:border-nyg-blue transition-all cursor-pointer appearance-none"
          >
            <option value="">Categoría</option>
            <option value="Primera">Primera</option>
            <option value="Intermedia">Intermedia</option>
            <option value="Pre-Intermedia">Pre-Intermedia</option>
            <option value="M19">M19</option>
          </select>
        </div>
      </div>

      {/* Tabla de Equipos */}
      <div className="bg-white border border-gray-100 shadow-sm rounded-3xl overflow-hidden">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <Loader2 className="w-10 h-10 animate-spin text-nyg-blue mb-4" />
            <p className="font-bold uppercase tracking-widest text-sm">
              Cargando equipos...
            </p>
          </div>
        ) : filteredTeams.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <AlertCircle className="w-12 h-12 mb-4 text-gray-300" />
            <p className="font-bold uppercase tracking-widest text-sm">
              No se encontraron equipos.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">
                    Equipo / Club
                  </th>
                  <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest hidden md:table-cell">
                    Categoría
                  </th>
                  <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest hidden lg:table-cell">
                    Disciplina
                  </th>
                  <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">
                    Tipo
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-black text-gray-400 uppercase tracking-widest">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredTeams.map((team) => (
                  <tr
                    key={team._id}
                    className="hover:bg-gray-50/50 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 border-2 border-white shadow-sm shrink-0 flex items-center justify-center p-1">
                          <img
                            src={
                              team.logo && team.logo !== "/escudos/default.png"
                                ? team.logo
                                : `https://ui-avatars.com/api/?name=${encodeURIComponent(team.name)}&background=1E3A8A&color=fff`
                            }
                            alt={team.name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div>
                          <div className="font-black text-gray-900 text-lg group-hover:text-nyg-blue transition-colors">
                            {team.name}
                          </div>
                          <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mt-1">
                            {team.club}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-600 font-bold text-xs uppercase tracking-wider">
                        {team.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 hidden lg:table-cell">
                      <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">
                        {team.discipline}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {team.isOwnTeam ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-nyg-blue/10 text-nyg-blue font-bold text-xs uppercase tracking-wider shadow-sm">
                          Equipo Propio
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 text-orange-600 font-bold text-xs uppercase tracking-wider shadow-sm">
                          Rival
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Link
                          to={`/admin/equipos/editar/${team._id}`}
                          className="p-2 text-gray-400 hover:text-nyg-blue hover:bg-blue-50 rounded-full transition-colors"
                          title="Editar"
                        >
                          <Edit2 size={18} />
                        </Link>
                        <button
                          onClick={() => handleDelete(team._id)}
                          className="p-2 text-gray-400 hover:text-nyg-red hover:bg-red-50 rounded-full transition-colors"
                          title="Eliminar"
                        >
                          <Trash2 size={18} />
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

export default TeamList;
