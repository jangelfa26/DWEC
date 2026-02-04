const model = require('./model');
const albumModel = require('../album/model');
const view = require('./view');

exports.list = (req, res) => {
  res.send(view.list(model.getAll()));
};

exports.detail = (req, res) => {
  const artista = model.getById(req.params.id);
  if (!artista) {
    return res.send(view.notFound());
  }
  const albumes = albumModel.getByArtist(req.params.id);
  res.send(view.detail(artista, albumes));
};

// MISMA FUNCIÓN PARA NUEVO Y EDITAR
exports.form = (req, res) => {
  const id = req.params.id;
  const artista = id ? model.getById(id) : null;
  res.send(view.form(artista));                  
};

exports.save = (req, res) => {
  const body = req.body || {};
  const { id, nombre, pais, genero, fecha_formacion, foto } = body;

  if (!nombre || nombre.trim() === '') {
    const artista = id ? model.getById(id) : null;
    return res.send(view.form(artista, 'El nombre es obligatorio'));
  }

  const artistaData = {
    id: id ? parseInt(id) : Date.now(),
    nombre: nombre.trim(),
    pais: pais || '',
    genero: genero || '',
    fecha_formacion: parseInt(fecha_formacion) || 1900,
    foto: foto || ''
  };

  if (id) {
    model.update(artistaData);
  } else {
    model.add(artistaData);
  }
  res.redirect('/artistas');
};

exports.delete = (req, res) => {
  model.delete(req.params.id);
  res.redirect('/artistas');
};
