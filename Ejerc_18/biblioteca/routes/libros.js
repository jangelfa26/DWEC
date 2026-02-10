const { mostrarPrestados, mostrarDetalleLibro } = require('../controllers/librosController');
const router = require('express').Router();
router.get('/prestados', mostrarPrestados);
router.get('/libro/:id', mostrarDetalleLibro);
module.exports = router;
