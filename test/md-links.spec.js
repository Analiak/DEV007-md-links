const { mdLinks } = require('../index.js');


describe('mdLinks', () => {

  it('should...', () => {
    console.log('FIX ME!');
  });

  it('Debería ser una función', () => {
    expect(typeof mdLinks).toBe('function');
  });
  // funcion anonima que llama a la función mdLinks
  it('debería rechazar cuando el path no existe', () => {
      expect(() => mdLinks('./noexiste.md')).toThrow("El archivo no existe");
  });
  it('debería rechazar cuando el archivo no es .md', () => {
    expect(() => mdLinks('./package.json')).toThrow("El archivo no es .md");
});
it('retorna la cantidad de links' , () => {
    expect(mdLinks('./README.md').length).toBe(80);
});
});
