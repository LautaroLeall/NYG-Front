import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  Loader2,
  AlertCircle,
} from "lucide-react";
import axios from "../../../api/axiosConfig";

const PlayerList = () => {
  const [players, setPlayers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  const fetchPlayers = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get("/api/players", {
        params: { search: searchTerm, category: filterCategory },
      });
      setPlayers(res.data.data || []);
    } catch (error) {
      console.error("Error fetching players:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Debounce manual simple para la búsqueda
    const delayDebounceFn = setTimeout(() => {
      fetchPlayers();
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, filterCategory]);

  const handleDelete = async (id) => {
    if (
      window.confirm(
        "¿Estás seguro de que deseas eliminar este jugador? Esta acción no se puede deshacer.",
      )
    ) {
      try {
        await axios.delete(`/api/players/${id}`);
        setPlayers(players.filter((p) => p._id !== id));
      } catch (error) {
        alert("Error al eliminar el jugador");
      }
    }
  };

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-nyg-blue uppercase tracking-wider">
            Planteles
          </h1>
          <p className="text-gray-400 font-bold uppercase tracking-widest text-sm mt-1">
            Gestión de Jugadores
          </p>
        </div>
        <Link
          to="/admin/planteles/nuevo"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-nyg-blue hover:bg-blue-800 text-white rounded-full font-black uppercase tracking-widest text-sm transition-all shadow-md hover:shadow-xl hover:-translate-y-1"
        >
          <Plus size={18} /> Nuevo Jugador
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
            placeholder="Buscar por nombre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-transparent rounded-full text-gray-800 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-nyg-blue transition-all font-medium"
          />
        </div>

        {/* Filtro Categoría */}
        <div className="md:w-64">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="block w-full px-6 py-3 bg-gray-50 border-2 border-transparent rounded-full text-gray-800 font-bold uppercase tracking-wider text-sm focus:outline-none focus:bg-white focus:border-nyg-blue transition-all cursor-pointer appearance-none"
          >
            <option value="">Todas las Categorías</option>
            <option value="Primera">Primera</option>
            <option value="Intermedia">Intermedia</option>
            <option value="Pre-Intermedia">Pre-Intermedia</option>
            <option value="M19">M19</option>
          </select>
        </div>
      </div>

      {/* Tabla de Jugadores */}
      <div className="bg-white border border-gray-100 shadow-sm rounded-3xl overflow-hidden">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <Loader2 className="w-10 h-10 animate-spin text-nyg-blue mb-4" />
            <p className="font-bold uppercase tracking-widest text-sm">
              Cargando jugadores...
            </p>
          </div>
        ) : players.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <AlertCircle className="w-12 h-12 mb-4 text-gray-300" />
            <p className="font-bold uppercase tracking-widest text-sm">
              No se encontraron jugadores.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">
                    Jugador
                  </th>
                  <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest hidden md:table-cell">
                    Categoría
                  </th>
                  <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest hidden lg:table-cell">
                    Posición
                  </th>
                  <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">
                    Estado
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-black text-gray-400 uppercase tracking-widest">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {players.map((player) => (
                  <tr
                    key={player._id}
                    className="hover:bg-gray-50/50 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 border-2 border-white shadow-sm shrink-0">
                          <img
                            src={
                              player.imageUrl ||
                              `https://ui-avatars.com/api/?name=${encodeURIComponent(player.name)}&background=1E3A8A&color=fff`
                            }
                            alt={player.name}
                            className="w-full h-full object-cover object-top"
                          />
                        </div>
                        <div>
                          <div className="font-black text-gray-900 text-lg group-hover:text-nyg-blue transition-colors">
                            {player.name}
                          </div>
                          {/* Visible solo en mobile */}
                          <div className="md:hidden text-xs font-bold text-gray-500 uppercase tracking-wider mt-1">
                            {player.category}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-600 font-bold text-xs uppercase tracking-wider">
                        {player.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 hidden lg:table-cell">
                      <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">
                        {player.position}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {player.isActive ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 font-bold text-xs uppercase tracking-wider shadow-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>{" "}
                          Activo
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 text-gray-500 font-bold text-xs uppercase tracking-wider shadow-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>{" "}
                          Inactivo
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Link
                          to={`/admin/planteles/editar/${player._id}`}
                          className="p-2 text-gray-400 hover:text-nyg-blue hover:bg-blue-50 rounded-full transition-colors"
                          title="Editar"
                        >
                          <Edit2 size={18} />
                        </Link>
                        <button
                          onClick={() => handleDelete(player._id)}
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

export default PlayerList;
