const { mdLinks } = require("../index.js");
const path = require("path");

describe("mdLinks", () => {
 
  // funcion anonima que llama a la función mdLinks
  it("debería rechazar cuando el path no existe", () => {
    mdLinks("./noexiste.md").catch((error) =>
      expect(error).toBe("El archivo no existe"),
    );
  });
  it("debería rechazar cuando el archivo no es .md", () => {
    mdLinks("./package.json").catch((error) =>
      expect(error).toBe("El archivo no es .md"),
    );
  });
  it("retorna la cantidad de links", () => {
    mdLinks("./readme.md").then((result) =>
      expect(result.linksFound.length).toBe(8),
    );
  });

  it("retorna la cantidad de links cuando se pasa una ruta absoluta", () => {
    absolutePath = path.resolve("./readme.md");
    mdLinks(absolutePath).then((result) =>
      expect(result.linksFound.length).toBe(8),
    );
  });

  it("retorna stats", () => {
    mdLinks("./readme.md", { stats: true }).then((result) =>
      expect(result.stats).toEqual({ Total: 8, Unique: 1, }),
    );
  });
  it("retorna formato correcto cuando validate es true", () => {
    mdLinks("./readme.md", { validate: true }).then((result) =>
      expect(result.linksFound[0]).toEqual({
        text: "Markdown",
        url: "https://es.wikipedia.org/wiki/Markdown",
        file: "/home/laptop/Documentos/laboratoria/DEV007-md-links/readme.md",
        status: 200,
        ok: "ok",
      }),
    );
  });

  it("retorna arreglo links sin options o validate false", () => {
    mdLinks("./readme.md", { validate: false}).then((result) =>
      expect(result.linksFound[0]).toEqual({
        text: "Markdown",
        url: "https://es.wikipedia.org/wiki/Markdown",
        file: "/home/laptop/Documentos/laboratoria/DEV007-md-links/readme.md"
      }),
    );
  });

  it("validate y stats con valor true", () => {
    mdLinks("./readme.md", { stats: true, validate: true}).then((result) =>
      expect(result.stats).toEqual({ Total: 8, Unique: 1, Broken: 5}),
    );
  });

});
