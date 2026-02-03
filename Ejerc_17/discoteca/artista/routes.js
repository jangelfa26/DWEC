const express = require('express');
const router = express.Router();
const controller = require('./controller');

// LISTA
router.get('/artistas', controller.list);

// FORM NUEVO (SIN :id) → TIENE QUE IR ANTES QUE /artista/:id
router.get('/artista/form', controller.form);

// FORM EDITAR (CON :id)
router.get('/artista/edit/:id', controller.form);

// DETALLE (DESPUÉS DE /form y /edit)
router.get('/artista/:id', controller.detail);

// GUARDAR NUEVO
router.post('/artista/form', controller.save);

// GUARDAR EDICIÓN
router.post('/artista/edit/:id', controller.save);

// BORRAR
router.get('/artista/delete/:id', controller.delete);

module.exports = router;
