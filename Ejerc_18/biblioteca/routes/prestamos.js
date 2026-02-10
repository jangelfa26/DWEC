const { mostrarPrestamosUsuario, mostrarFormularioPrestamo, crearPrestamo, registrarDevolucion, mostrarVencidos } = require('../controllers/prestamosController');
const router = require('express').Router();
router.get('/prestamos/usuario', mostrarPrestamosUsuario);
router.get('/prestamo/formulario/:libro_id', mostrarFormularioPrestamo);
router.post('/prestamo/nuevo', crearPrestamo);
router.post('/prestamo/devolver/:libro_id', registrarDevolucion);
router.get('/vencidos', mostrarVencidos);
module.exports = router;
