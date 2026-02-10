const Libro = require('../models/Libro');
const Prestamo = require('../models/Prestamo');

const mostrarCatalogo = async (req, res) => {
  const libros = await Libro.obtenerTodos();
  res.send(`
    <!DOCTYPE html>
    <html><head><title>Catálogo</title><link rel="stylesheet" href="/estilos.css"></head><body>
    <h1>Biblioteca</h1>
    <nav><a href="/">Catálogo</a> | <a href="/prestados">Prestados</a> | <a href="/vencidos">Vencidos</a></nav>
    <h2>Catálogo de libros</h2>
    <table>
      <tr><th>Título</th><th>Autor</th><th>Estado</th></tr>
      ${libros.map(l => `<tr><td><a href="/libro/${l.id}">${l.titulo}</a></td><td>${l.autor}</td><td>${l.estado}</td></tr>`).join('')}
    </table>
    </body></html>
  `);
};

const mostrarPrestados = async (req, res) => {
  const prestamos = await Prestamo.obtenerPrestamosPrestadosConUsuario();
  res.send(`
    <!DOCTYPE html>
    <html><head><title>Prestados</title><link rel="stylesheet" href="/estilos.css"></head><body>
    <h1>Libros prestados</h1><a href="/">Volver</a>
    <table>
      <tr><th>Título</th><th>Autor</th><th>Prestatario</th><th>Devolución</th></tr>
      ${prestamos.map(p => `<tr><td>${p.titulo}</td><td>${p.autor}</td><td><a href="/prestamos/usuario?nombre=${encodeURIComponent(p.nombre_prestatario)}">${p.nombre_prestatario}</a></td><td>${p.fecha_devolucion}</td></tr>`).join('')}
    </table>
    </body></html>
  `);
};

const mostrarDetalleLibro = async (req, res) => {
  const libro = await Libro.obtenerPorId(req.params.id);
  const historial = await Prestamo.obtenerPrestamosPorLibro(req.params.id);
  const prestamoActivo = await Prestamo.obtenerPrestamoActivoPorLibro(req.params.id);
  
  const disponible = libro.estado === 'Disponible';
  res.send(`
    <!DOCTYPE html>
    <html><head><title>${libro.titulo}</title><link rel="stylesheet" href="/estilos.css"></head><body>
    <a href="/">Volver</a>
    <h1>${libro.titulo}</h1>
    <p>Autor: ${libro.autor} | ISBN: ${libro.isbn} | Estado: ${libro.estado}</p>
    ${disponible ? 
      `<a href="/prestamo/formulario/${libro.id}" class="btn">Prestar Libro</a>` :
      `<div>Prestatario: ${prestamoActivo?.nombre_prestatario} | Vence: ${prestamoActivo?.fecha_devolucion}</div>
       <form method="POST" action="/prestamo/devolver/${libro.id}"><button class="btn danger">Registrar Devolución</button></form>`
    }
    <h2>Historial préstamos</h2>
    <table>
      <tr><th>Prestatario</th><th>Préstamo</th><th>Devolución</th><th>Entrega</th></tr>
      ${historial.map(h => `<tr><td>${h.nombre_prestatario}</td><td>${h.fecha_prestamo}</td><td>${h.fecha_devolucion}</td><td>${h.fecha_entrega||''}</td></tr>`).join('')}
    </table>
    </body></html>
  `);
};

module.exports = { mostrarCatalogo, mostrarPrestados, mostrarDetalleLibro };
