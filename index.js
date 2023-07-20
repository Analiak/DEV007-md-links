// aqui van todas las funciones
// importo la libreria path por el require
const path = require("path");
// importo la libreria fs con el requiere
const fs = require("fs");

// funcion mdLinks
const mdLinks = (parameterPath, Options) => {
  console.log("Ruta recibida por parámetro:", parameterPath);

  // creo la variable donde guardo la ruta absoluta
  let absolutPath = "";

  if (path.isAbsolute(parameterPath)) {
    absolutPath = parameterPath;
  } else {
    // con el resolve convierte la ruta en absoluta
    absolutPath = path.resolve(parameterPath);
  }
  console.log("Ruta absoluta:", absolutPath);

  // verificar si la ruta existe
  if (fs.existsSync(absolutPath)) {
    console.log("la ruta SI existe");

    const extensionArray = absolutPath.split(".");
    const extension = extensionArray[extensionArray.length - 1];
    console.log("Extensión:", extension);

    if (extension !== "md") {
      throw new Error("El archivo no es .md");
    }

    const fileContent = fs.readFileSync(absolutPath, "utf-8");

    //console.log(fileContent);
    const linksFound = extractLinksFromMd(fileContent);
    console.log("links encontrados", linksFound);

    return linksFound;
  } else {
    // si la ruta no existe da error
    console.log("la ruta no existe");

    throw new Error("El archivo no existe");
    //return false;
  }
};

const extractLinksFromMd = (fileContent) => {
  //esta expresión regular se utiliza para buscar y capturar el texto del enlace y la URL 
  // dentro de un texto que siga el formato de los enlaces en Markdown, 
  // donde el texto del enlace está entre corchetes [ ] y la URL está entre paréntesis ( )
  // /g: es un modificador global que indica que la búsqueda debe ser global y 
  //no se detiene después de encontrar la primera coincidencia. Esto permite encontrar múltiples enlaces en el texto.

  const linkRegex = /\[([^\]]+)\]\(([^\)]+)\)/g;
  const links = [];

  let match;
  while ((match = linkRegex.exec(fileContent)) !== null) {
    const text = match[1];
    const url = match[2];

    links.push({ text, url });
  }

  return links;
};



module.exports = {
  mdLinks,
};

//mdLinks(process.argv[2]);
