/**
 * Diccionario centralizado para escudos de clubes.
 * Evita colisiones (ej: Universitario de Tucumán vs Universitario de Salta).
 */

// Helper para remover acentos y simplificar la búsqueda
const normalize = (str) => {
  if (!str) return "";
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
};

export const getShield = (teamName, shieldUrl) => {
  // 1. Si viene la URL desde la BD (Cloudinary, etc.) y es válida, la priorizamos.
  if (shieldUrl && shieldUrl !== "/escudos/default.png" && shieldUrl !== "") {
    return shieldUrl;
  }

  if (!teamName) {
    return "https://ui-avatars.com/api/?name=NA&background=F3F4F6&color=9CA3AF&size=150";
  }

  const name = normalize(teamName);

  // 2. Mapeo estricto para casos problemáticos (multiples Universitarios, Jockeys, Gimnasia)

  // -- NATACIÓN Y GIMNASIA --
  if (name.includes("natacion y gimnasia") || name.includes("natacion") || name === "nyg") {
    return "/escudos/nyg.png";
  }

  // -- GIMNASIA (OTROS) --
  if (name.includes("gimnasia y esgrima") || name === "ger" || name.includes("gimnasia y esgrima de rosario")) {
    return "/escudos/ger.png";
  }
  // No hay escudo de Gimnasia y Tiro de Salta por ahora, se irá al fallback.

  // -- UNIVERSITARIO --
  if (name.includes("universitario")) {
    if (name.includes("salta")) return "/escudos/uni-salta.png";
    if (name.includes("cordoba")) return "/escudos/universitario-cordoba.png";
    if (name.includes("santa fe")) return "/escudos/universitario-santa-fe.png";
    if (name.includes("mendoza")) return "/escudos/universitario-mendoza.png";
    if (name.includes("san juan")) return "/escudos/universitario-san-juan.png";
    // Si dice Tucumán o no especifica y solo dice Universitario, asumimos Tucumán
    return "/escudos/universitario-tuc.png";
  }
  if (name.includes("uni de tucuman") || name.includes("uni tucuman")) return "/escudos/universitario-tuc.png";
  if (name.includes("uni salta")) return "/escudos/uni-salta.png";
  if (name.includes("uni cordoba")) return "/escudos/universitario-cordoba.png";

  // -- JOCKEY CLUB --
  if (name.includes("jockey")) {
    if (name.includes("salta")) return "/escudos/jockey-salta.png";
    if (name.includes("rosario")) return "/escudos/jockey-rosario.png";
    if (name.includes("cordoba")) return "/escudos/jockey-cordoba.png";
    if (name.includes("villa maria")) return "/escudos/jockey-villa-maria.png";
    if (name.includes("venado tuerto")) return "/escudos/jockey-venado-tuerto.png";
    // Si dice Tucumán o solo dice Jockey, asumimos Tucumán por la liga local
    return "/escudos/jockey-tucuman.png";
  }

  // -- LAWN TENNIS --
  if (name.includes("lawn tennis") || name.includes("lawn tenis")) {
    if (name.includes("santiago")) return "/escudos/santiago-lawn-tennis.png";
    return "/escudos/tuc-lawn-tenis.png"; // Asumimos Tucumán
  }

  // -- OTROS CLUBES EXACTOS --
  if (name.includes("curne") || name.includes("rugby del nordeste")) return "/escudos/curne.png";
  if (name.includes("tucuman rugby")) return "/escudos/tuc-rugby.png";
  if (name.includes("huirapuca")) return "/escudos/huirapuca.png";
  if (name.includes("tarcos")) return "/escudos/tarcos.png";
  if (name.includes("cardenales")) return "/escudos/cardenales.png";
  if (name.includes("corsarios") || name.includes("corsario")) return "/escudos/corsario.png";
  if (name.includes("lince") || name.includes("linses")) return "/escudos/lince.png";
  if (name.includes("old lions")) return "/escudos/old-lions.png";
  if (name.includes("tigres")) return "/escudos/tigres.png";
  if (name.includes("tiro federal")) return "/escudos/tiro-federal.png";
  if (name.includes("crai")) return "/escudos/crai-santa-fe.png";
  if (name.includes("duendes")) return "/escudos/duendes.png";
  if (name.includes("la tablada")) return "/escudos/la-tablada.png";
  if (name.includes("liceo")) return "/escudos/liceo-rugby.png";
  if (name.includes("mar del plata")) return "/escudos/mar-del-plata.png";
  if (name.includes("marista")) return "/escudos/marista.png";
  if (name.includes("neuquen")) return "/escudos/neuquen-rugby.png";
  if (name.includes("palermo bajo")) return "/escudos/palermo-bajo.png";
  if (name.includes("rowing")) return "/escudos/rowing-parana.png";
  if (name.includes("santa fe rugby")) return "/escudos/santa-fe-rugby.png";
  if (name.includes("sociedad sportiva")) return "/escudos/sociedad-sportiva.png";
  if (name.includes("sporting")) return "/escudos/sporting-rugby.png";
  if (name.includes("tala")) return "/escudos/tala.png";
  if (name.includes("taraguy")) return "/escudos/taraguy-corrientes.png";
  if (name.includes("uru cure")) return "/escudos/uru-cure.png";
  if (name.includes("los tordos")) return "/escudos/los-tordos.png";
  if (name.includes("estudiantes") && name.includes("parana")) return "/escudos/parana-atletico-estudiantes.png";
  if (name.includes("athletic") && name.includes("cordoba")) return "/escudos/athletic-cordoba.png";

  // 4. Fallback: Si no hay escudo en public/escudos, usa uno por defecto con las iniciales
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(teamName)}&background=F3F4F6&color=9CA3AF&size=150`;
};
