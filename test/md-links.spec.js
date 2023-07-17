const { mdLinks } = require('../index.js');


describe('mdLinks', () => {

  it('should...', () => {
    console.log('FIX ME!');
  });

  it('debería ser una funcion' , () => {
    expect(mdLinks()).toHaveBeenCalled();
  })
  it('debería rechazar cuando el path no existe' , () => {
    return mdLinks('/estepath/noexiste.md').cath((error) => {
      expect(error).toBe(('la ruta no existe'));
    });
  })
});
