/**
 * Diccionario centralizado para escudos de clubes.
 * Evita colisiones (ej: Universitario de Tucumán vs Universitario de Salta).
 */

export const getShield = (teamName, shieldUrl) => {
  // 1. Si viene la URL desde la BD (Cloudinary, etc.) y es válida, la priorizamos.
  if (shieldUrl && shieldUrl !== "/escudos/default.png" && shieldUrl !== "") {
    return shieldUrl;
  }

  if (!teamName) {
    return "https://ui-avatars.com/api/?name=NA&background=F3F4F6&color=9CA3AF&size=150";
  }

  const name = teamName.toLowerCase().trim();

  // 2. Mapeo estricto para casos problemáticos (ej: multiples Universitarios)
  if (name.includes("universitario de tucumán") || name === "universitario" || name === "club universitario" || name.includes("uni de tucuman") || name.includes("uni tucuman")) {
    return "/escudos/universitario-tuc.png";
  }
  if (name.includes("universitario de salta") || name.includes("uni salta") || name === "universitario rc (salta)") {
    return "/escudos/uni-salta.png";
  }
  if (name.includes("universitario de cordoba") || name.includes("universitario de córdoba") || name.includes("uni cordoba")) {
    return "/escudos/universitario-cordoba.png";
  }
  if (name.includes("universitario de santa fe") || name.includes("uni santa fe")) {
    return "/escudos/universitario-santa-fe.png";
  }
  if (name.includes("universitario de mendoza") || name.includes("uni mendoza")) {
    return "/escudos/universitario-mendoza.png";
  }
  if (name.includes("universitario de san juan") || name.includes("uni san juan")) {
    return "/escudos/universitario-san-juan.png";
  }
  if (name.includes("rugby del nordeste") || name.includes("curne")) {
    return "/escudos/curne.png";
  }

  if (name.includes("jockey club de tucumán") || name === "jockey club tucuman" || name.includes("jockey de tucuman") || name.includes("jockey club tucumán")) {
    return "/escudos/jockey-tucuman.png";
  }
  if (name.includes("jockey club de salta") || name.includes("jockey de salta")) {
    return "/escudos/jockey-salta.png";
  }
  if (name.includes("jockey club de rosario") || name.includes("jockey de rosario")) {
    return "/escudos/jockey-rosario.png";
  }
  if (name.includes("jockey club de cordoba") || name.includes("jockey de córdoba") || name.includes("jockey de cordoba")) {
    return "/escudos/jockey-cordoba.png";
  }
  if (name.includes("jockey club de villa maria") || name.includes("jockey villa maria")) {
    return "/escudos/jockey-villa-maria.png";
  }
  if (name.includes("jockey club de venado tuerto") || name.includes("jockey venado tuerto")) {
    return "/escudos/jockey-venado-tuerto.png";
  }

  if (name.includes("tucumán lawn tennis") || name.includes("lawn tennis") || name.includes("tucuman lawn tenis") || name.includes("lawn tenis")) {
    // Si no es el de Santiago
    if (!name.includes("santiago")) {
      return "/escudos/tuc-lawn-tenis.png";
    }
  }

  // 3. Mapeo general
  if (name.includes("nataci") || name.includes("gimnasia") || name === "nyg") return "/escudos/nyg.png";
  if (name.includes("tucumán rugby") || name.includes("tucuman rugby")) return "/escudos/tuc-rugby.png";
  if (name.includes("huirapuca")) return "/escudos/huirapuca.png";
  if (name.includes("tarcos")) return "/escudos/tarcos.png";
  if (name.includes("cardenales")) return "/escudos/cardenales.png";
  if (name.includes("corsarios") || name.includes("corsario")) return "/escudos/corsario.png";
  if (name.includes("lince") || name.includes("linses")) return "/escudos/lince.png";
  if (name.includes("old lions")) return "/escudos/old-lions.png";
  if (name.includes("santiago lawn tennis")) return "/escudos/santiago-lawn-tennis.png";
  if (name.includes("tigres")) return "/escudos/tigres.png";
  if (name.includes("tiro federal")) return "/escudos/tiro-federal.png";
  if (name.includes("crai")) return "/escudos/crai-santa-fe.png";
  if (name.includes("duendes")) return "/escudos/duendes.png";
  if (name.includes("la tablada")) return "/escudos/la-tablada.png";
  if (name.includes("liceo")) return "/escudos/liceo-rugby.png";
  if (name.includes("mar del plata")) return "/escudos/mar-del-plata.png";
  if (name.includes("marista")) return "/escudos/marista.png";
  if (name.includes("neuquén") || name.includes("neuquen")) return "/escudos/neuquen-rugby.png";
  if (name.includes("palermo bajo")) return "/escudos/palermo-bajo.png";
  if (name.includes("rowing")) return "/escudos/rowing-parana.png";
  if (name.includes("santa fe rugby")) return "/escudos/santa-fe-rugby.png";
  if (name.includes("sociedad sportiva")) return "/escudos/sociedad-sportiva.png";
  if (name.includes("sporting")) return "/escudos/sporting-rugby.png";
  if (name.includes("tala")) return "/escudos/tala.png";
  if (name.includes("taraguy")) return "/escudos/taraguy-corrientes.png";
  if (name.includes("uru cure") || name.includes("urú curé")) return "/escudos/uru-cure.png";
  if (name.includes("los tordos")) return "/escudos/los-tordos.png";
  if (name.includes("estudiantes") && name.includes("parana")) return "/escudos/parana-atletico-estudiantes.png";
  if (name.includes("ger") || name.includes("gimnasia y esgrima de rosario")) return "/escudos/ger.png";
  if (name.includes("athletic") && name.includes("cordoba")) return "/escudos/athletic-cordoba.png";

  // 4. Fallback
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(teamName)}&background=F3F4F6&color=9CA3AF&size=150`;
};
