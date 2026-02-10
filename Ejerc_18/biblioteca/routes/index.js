const { mostrarCatalogo } = require('../controllers/librosController');
const router = require('express').Router();
router.get('/', mostrarCatalogo);
module.exports = router;
