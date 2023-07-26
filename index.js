// aqui van todas las funciones
// importo la libreria path por el require
const path = require("path");
// importo la libreria fs con el requiere
const fs = require("fs");

// funcion mdLinks
const mdLinks =  (
  parameterPath,
  options = { stats: false, validate: false },
) => {
  return new Promise((resolve, reject) => {
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
    if (!fs.existsSync(absolutPath)) {
      // si la ruta no existe da error
      console.log("la ruta no existe");
      return reject("El archivo no existe");
    }

    console.log("la ruta SI existe");

    const extensionArray = absolutPath.split(".");
    const extension = extensionArray[extensionArray.length - 1];
    console.log("Extensión:", extension);

    if (extension !== "md") {
      return reject("El archivo no es .md");
    }

    //console.log(fileContent);
    const linksFound = extractLinksFromMd(absolutPath);

    if (options.validate) {
      for (let i = 0; i < linksFound.length; i++) {
        linksFound[i] = validateLinks(linksFound[i]);
      }
    }

    Promise.all(linksFound).then((linksFound) => {
      if (options.stats) {
        // resuelve un objeto con dos propiedades linksfound y stats
        if (options.validate) {
          return resolve({ linksFound, stats: statsValidateLinks(linksFound) });
        } else {
          return resolve({ linksFound, stats: statsLinks(linksFound) });
        }
      }

      return resolve({ linksFound });
    });
  });
};

// funcion para extraer los links
const extractLinksFromMd = (absolutPath) => {
  //esta expresión regular se utiliza para buscar y capturar el texto del enlace y la URL
  // dentro de un texto que siga el formato de los enlaces en Markdown,
  // donde el texto del enlace está entre corchetes [ ] y la URL está entre paréntesis ( )
  // /g: es un modificador global que indica que la búsqueda debe ser global y
  //no se detiene después de encontrar la primera coincidencia. Esto permite encontrar múltiples enlaces en el texto.

  const fileContent = fs.readFileSync(absolutPath, "utf-8");

  const linkRegex = /\[([^\]]+)\]\(([^\)]+)\)/g;
  const links = [];

  let match;
  while ((match = linkRegex.exec(fileContent)) !== null) {
    const text = match[1].slice(0, 49);
    const url = match[2];

    links.push({ text, url, file: absolutPath });
  }

  return links;
};

// funcion validate
const validateLinks = (link) => {
  return fetch(link.url)
    .then((response) => {
      if (response.status >= 200 && response.status < 400) {
        link.status = response.status;
        link.ok = "ok";
        return link;
      } else {
        link.status = response.status;
        link.ok = "fail";
        return link;
      }
    })
    .catch((error) => {
      link.status = "Error";
      link.ok = "fail";
      return link;
    });
};

// funcion stats
const statsLinks = (links) => {
  return {
    Total: links.length,
    Unique: new Set(links.map((link) => link.href)).size,
  };
};

// funcion validate y stats
const statsValidateLinks = (links) => {
  const brokenLinks = links.filter((link) => link.ok !== "ok").length;
  return {
    Total: links.length,
    Unique: new Set(links.map((link) => link.href)).size,
    Broken: brokenLinks,
  };
};

module.exports = {
  mdLinks,
};
