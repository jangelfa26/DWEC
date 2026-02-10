const pool = require('../config/db');

const Libro = {
  obtenerTodos: async () => {
    const [filas] = await pool.query('SELECT * FROM libros');
    return filas;
  },
  obtenerPorId: async (id) => {
    const [filas] = await pool.query('SELECT * FROM libros WHERE id = ?', [id]);
    return filas[0];
  },
  actualizarEstado: async (id, estado) => {
    await pool.query('UPDATE libros SET estado = ? WHERE id = ?', [estado, id]);
  }
};

module.exports = Libro;
