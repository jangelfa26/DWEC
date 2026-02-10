const Libro = require('../models/Libro');
const Prestamo = require('../models/Prestamo');

const mostrarPrestamosUsuario = async (req, res) => {
  const prestamos = await Prestamo.obtenerPrestamosActivosPorUsuario(req.query.nombre);
  res.send(`
    <!DOCTYPE html>
    <html><head><title>Préstamos ${req.query.nombre}</title><link rel="stylesheet" href="/estilos.css"></head><body>
    <h1>Libros prestados a: ${req.query.nombre}</h1><a href="/prestados">Volver</a>
    <table>
      <tr><th>Título</th><th>Autor</th><th>Devolución</th></tr>
      ${prestamos.map(p => `<tr><td>${p.titulo}</td><td>${p.autor}</td><td>${p.fecha_devolucion}</td></tr>`).join('')}
    </table>
    </body></html>
  `);
};

const mostrarFormularioPrestamo = async (req, res) => {
  const libro = await Libro.obtenerPorId(req.params.libro_id);
  res.send(`
    <!DOCTYPE html>
    <html><head><title>Nuevo préstamo</title><link rel="stylesheet" href="/estilos.css"></head><body>
    <a href="/libro/${libro.id}">Volver</a>
    <h1>Prestar: ${libro.titulo}</h1>
    <form method="POST" action="/prestamo/nuevo">
      <input type="hidden" name="libro_id" value="${libro.id}">
      <p><label>Prestatario: <input type="text" name="nombre_prestatario" required></label></p>
      <p><label>Fecha préstamo: <input type="date" name="fecha_prestamo" value="${new Date().toISOString().slice(0,10)}" required></label></p>
      <p><label>Fecha devolución: <input type="date" name="fecha_devolucion" required></label></p>
      <button>Guardar préstamo</button>
    </form>
    </body></html>
  `);
};

const crearPrestamo = async (req, res) => {
  const { libro_id, nombre_prestatario, fecha_prestamo, fecha_devolucion } = req.body;
  await Prestamo.crearPrestamo(libro_id, nombre_prestatario, fecha_prestamo, fecha_devolucion);
  await Libro.actualizarEstado(libro_id, 'Prestado');
  res.redirect(`/libro/${libro_id}`);
};

const registrarDevolucion = async (req, res) => {
  await Prestamo.registrarDevolucion(req.params.libro_id);
  await Libro.actualizarEstado(req.params.libro_id, 'Disponible');
  res.redirect(`/libro/${req.params.libro_id}`);
};

const mostrarVencidos = async (req, res) => {
  const vencidos = await Prestamo.obtenerVencidos();
  res.send(`
    <!DOCTYPE html>
    <html><head><title>Vencidos</title><link rel="stylesheet" href="/estilos.css"></head><body>
    <h1>Libros vencidos</h1><a href="/">Volver</a>
    <table>
      <tr><th>Título</th><th>Autor</th><th>Prestatario</th><th>Devolución</th></tr>
      ${vencidos.map(v => `<tr><td>${v.titulo}</td><td>${v.autor}</td><td>${v.nombre_prestatario}</td><td>${v.fecha_devolucion}</td></tr>`).join('')}
    </table>
    </body></html>
  `);
};

module.exports = { mostrarPrestamosUsuario, mostrarFormularioPrestamo, crearPrestamo, registrarDevolucion, mostrarVencidos };
