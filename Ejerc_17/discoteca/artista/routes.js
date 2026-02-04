const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.get('/artistas', controller.list);
router.get('/artista/form', controller.form);
router.get('/artista/edit/:id', controller.form);
router.get('/artista/:id', controller.detail);
router.post('/artista/form', controller.save);
router.post('/artista/edit/:id', controller.save);
router.get('/artista/delete/:id', controller.delete);

module.exports = router;
