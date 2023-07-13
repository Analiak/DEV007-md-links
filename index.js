// aqui van todas las funciones
// importo la libreria path por el require
const path = require('path');

// la ruta al archivo que se recibe por parametro y procces.argv son los argu que se le pasan al node cuando corre
const parameterPath = process.argv[1];

// creo la variable donde guardo la ruta absoluta
let absolutPath = '';

if(path.isAbsolute(parameterPath)) {
  absolutPath = parameterPath;
} else {
  // con el resolve convierte la ruta en absoluta
  absolutPath = path.resolve(parameterPath);
}

console.log(absolutPath);