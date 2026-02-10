const pool = require('../config/db');

const Prestamo = {
  obtenerPrestamosActivosPorUsuario: async (nombre) => {
    const [filas] = await pool.query(
      `SELECT p.*, l.titulo, l.autor FROM prestamos p
       JOIN libros l ON p.libro_id = l.id
       WHERE p.nombre_prestatario = ? AND p.fecha_entrega IS NULL`,
      [nombre]
    );
    return filas;
  },
  obtenerPrestamosPorLibro: async (libroId) => {
    const [filas] = await pool.query('SELECT * FROM prestamos WHERE libro_id = ? ORDER BY fecha_prestamo DESC', [libroId]);
    return filas;
  },
  obtenerPrestamosPrestadosConUsuario: async () => {
    const [filas] = await pool.query(
      `SELECT l.titulo, l.autor, p.nombre_prestatario, p.fecha_devolucion, p.libro_id
       FROM prestamos p JOIN libros l ON p.libro_id = l.id WHERE p.fecha_entrega IS NULL`
    );
    return filas;
  },
  obtenerPrestamoActivoPorLibro: async (libroId) => {
    const [filas] = await pool.query('SELECT * FROM prestamos WHERE libro_id = ? AND fecha_entrega IS NULL LIMIT 1', [libroId]);
    return filas[0];
  },
  crearPrestamo: async (libroId, nombrePrestatario, fechaPrestamo, fechaDevolucion) => {
    await pool.query(
      'INSERT INTO prestamos (libro_id, nombre_prestatario, fecha_prestamo, fecha_devolucion) VALUES (?, ?, ?, ?)',
      [libroId, nombrePrestatario, fechaPrestamo, fechaDevolucion]
    );
  },
  registrarDevolucion: async (libroId) => {
    const hoy = new Date().toISOString().slice(0, 10);
    await pool.query('UPDATE prestamos SET fecha_entrega = ? WHERE libro_id = ? AND fecha_entrega IS NULL', [hoy, libroId]);
  },
  obtenerVencidos: async () => {
    const [filas] = await pool.query(
      `SELECT l.titulo, l.autor, p.nombre_prestatario, p.fecha_devolucion
       FROM prestamos p JOIN libros l ON p.libro_id = l.id
       WHERE p.fecha_entrega IS NULL AND p.fecha_devolucion < CURDATE()`
    );
    return filas;
  }
};

module.exports = Prestamo;
