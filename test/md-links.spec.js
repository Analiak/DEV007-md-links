const { mdLinks } = require('../index.js');


describe('mdLinks', () => {

  it('should...', () => {
    console.log('FIX ME!');
  });

  it('Debería ser una función', () => {
    expect(typeof mdLinks).toBe('function');
  });
  it('debería rechazar cuando el path no existe' , () => {
    return mdLinks('./noexiste.md').cath((error) => {
      expect(error).toBe(('la ruta no existe'));
    });
  }) 
});
