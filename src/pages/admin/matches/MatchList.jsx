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
  Calendar,
  Activity,
  CheckCircle2,
  Clock,
} from "lucide-react";
import dayjs from "dayjs";
import "dayjs/locale/es";
dayjs.locale("es");

const MatchList = () => {
  const [matches, setMatches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get("/api/matches");
      setMatches(res.data.data);
    } catch (error) {
      console.error(error);
      toast.error("Error al cargar los partidos");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id, homeName, awayName) => {
    if (
      window.confirm(
        `¿Estás seguro de eliminar el partido ${homeName} vs ${awayName}?`,
      )
    ) {
      try {
        await axios.delete(`/api/matches/${id}`);
        toast.success("Partido eliminado");
        fetchMatches();
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Error al eliminar el partido",
        );
      }
    }
  };

  const filteredMatches = matches.filter((match) => {
    const matchSearch =
      match.homeTeam?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      match.awayTeam?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      match.tournament?.name.toLowerCase().includes(searchTerm.toLowerCase());

    const statusMatch = filterStatus ? match.status === filterStatus : true;

    return matchSearch && statusMatch;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case "Finalizado":
        return (
          <span className="flex items-center gap-1 text-green-600 bg-green-50 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <CheckCircle2 size={14} /> Finalizado
          </span>
        );
      case "Programado":
        return (
          <span className="flex items-center gap-1 text-nyg-blue bg-blue-50 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Calendar size={14} /> Programado
          </span>
        );
      case "En Curso":
        return (
          <span className="flex items-center gap-1 text-amber-600 bg-amber-50 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Activity size={14} /> En Curso
          </span>
        );
      case "Postergado":
      case "Walkover":
        return (
          <span className="flex items-center gap-1 text-red-600 bg-red-50 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <AlertCircle size={14} /> {status}
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-nyg-blue uppercase tracking-widest flex items-center gap-3">
            <Calendar className="w-8 h-8" />
            Partidos
          </h1>
          <p className="text-sm font-bold text-gray-400 tracking-wider">
            Gestión del fixture y carga de resultados
          </p>
        </div>
        <Link
          to="/admin/partidos/nuevo"
          className="flex items-center justify-center gap-2 px-6 py-3 bg-nyg-blue hover:bg-blue-800 text-white rounded-full font-black uppercase tracking-widest text-sm shadow-md hover:shadow-xl transition-all"
        >
          <Plus size={18} />
          Nuevo Partido
        </Link>
      </div>

      <div className="bg-white border border-gray-100 shadow-sm rounded-3xl p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar por equipo o torneo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-transparent focus:border-nyg-blue focus:bg-white rounded-full text-sm font-bold text-gray-700 outline-none transition-all"
            />
          </div>
          <div className="w-full md:w-48">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent focus:border-nyg-blue focus:bg-white rounded-full text-sm font-bold text-gray-700 outline-none transition-all appearance-none cursor-pointer"
            >
              <option value="">Todos los Estados</option>
              <option value="Programado">Programados</option>
              <option value="Finalizado">Finalizados</option>
              <option value="Postergado">Postergados</option>
              <option value="Walkover">Walkovers</option>
            </select>
          </div>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <Loader2 className="w-10 h-10 animate-spin mb-4 text-nyg-blue" />
            <p className="text-sm font-bold tracking-widest uppercase">
              Cargando partidos...
            </p>
          </div>
        ) : filteredMatches.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400 text-center">
            <AlertCircle className="w-12 h-12 mb-4 opacity-20" />
            <p className="text-sm font-bold tracking-widest uppercase">
              No se encontraron partidos
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMatches.map((match) => (
              <div
                key={match._id}
                className="group relative bg-white border border-gray-100 rounded-3xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col"
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest bg-gray-50 px-2 py-1 rounded-md">
                    {match.tournament?.name || "Sin torneo"}
                  </span>
                  {getStatusBadge(match.status)}
                </div>

                <div className="flex flex-col flex-1 justify-center gap-4 py-2">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 w-full">
                      {match.homeTeam?.logo ? (
                        <img
                          src={match.homeTeam.logo}
                          alt={match.homeTeam.name}
                          className="w-8 h-8 object-contain"
                        />
                      ) : (
                        <div className="w-8 h-8 bg-gray-100 rounded-full shrink-0" />
                      )}
                      <span className="font-bold text-gray-800 text-sm truncate flex-1">
                        {match.homeTeam?.name}
                      </span>
                    </div>
                    {match.status === "Finalizado" && (
                      <span className="font-black text-xl text-nyg-blue">
                        {match.homeScore}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 w-full">
                      {match.awayTeam?.logo ? (
                        <img
                          src={match.awayTeam.logo}
                          alt={match.awayTeam.name}
                          className="w-8 h-8 object-contain"
                        />
                      ) : (
                        <div className="w-8 h-8 bg-gray-100 rounded-full shrink-0" />
                      )}
                      <span className="font-bold text-gray-800 text-sm truncate flex-1">
                        {match.awayTeam?.name}
                      </span>
                    </div>
                    {match.status === "Finalizado" && (
                      <span className="font-black text-xl text-gray-500">
                        {match.awayScore}
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
                    <Clock size={14} />
                    {dayjs(match.date).format("D MMM, HH:mm")}
                  </div>

                  <div className="flex gap-2">
                    {match.status === "Programado" ? (
                      <Link
                        to={`/admin/partidos/resultado/${match._id}`}
                        className="px-3 py-1 bg-nyg-blue text-white rounded-full text-xs font-bold uppercase tracking-wider hover:bg-blue-800 transition-colors"
                      >
                        Cargar Rdo
                      </Link>
                    ) : (
                      <Link
                        to={`/admin/partidos/resultado/${match._id}`}
                        className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-gray-200 transition-colors"
                      >
                        Editar Rdo
                      </Link>
                    )}

                    <Link
                      to={`/admin/partidos/editar/${match._id}`}
                      className="p-1.5 text-gray-400 hover:text-nyg-blue bg-white hover:bg-blue-50 rounded-full transition-colors border border-gray-100"
                      title="Editar Info"
                    >
                      <Edit2 size={14} />
                    </Link>
                    <button
                      onClick={() =>
                        handleDelete(
                          match._id,
                          match.homeTeam?.name,
                          match.awayTeam?.name,
                        )
                      }
                      className="p-1.5 text-gray-400 hover:text-nyg-red bg-white hover:bg-red-50 rounded-full transition-colors border border-gray-100"
                      title="Eliminar"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchList;
