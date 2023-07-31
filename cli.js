#!/usr/bin/env node
// shebang para pode instalar la librería en cualquier sistema operativo

const { mdLinks } = require('./index.js');

const filePath = process.argv[2];
const statsOption = process.argv.includes("--stats");
const validateOption = process.argv.includes("--validate");

mdLinks(filePath, { stats: statsOption, validate: validateOption })
  .then((result) => console.log(result))
  .catch((error) => console.log(error));