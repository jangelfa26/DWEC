const model = require('./model');
const artistaModel = require('../artista/model');
const view = require('./view');

exports.list = (req, res) => {
  const albumes = model.getAll().map(a => ({
    ...a,
    artista: artistaModel.getById(a.artistaId)?.nombre || 'Sin artista'
  }));
  res.send(view.list(albumes));
};

exports.form = (req, res) => {
  const album = req.params.id
    ? model.getById(req.params.id)
    : null;

  res.send(view.form(album, artistaModel.getAll()));
};

exports.save = (req, res) => {
  const { id, titulo, anio, artistaId, foto } = req.body;

  if (!titulo || !anio) {
    return res.send(
      view.form(
        { id, titulo, anio, artistaId, foto },
        artistaModel.getAll(),
        'El título y el año son obligatorios'
      )
    );
  }

  if (id) {
    model.update({ id, titulo, anio, artistaId, foto });
  } else {
    model.add({
      id: Date.now(),
      titulo,
      anio,
      artistaId,
      foto
    });
  }

  res.redirect('/albumes');
};

exports.delete = (req, res) => {
  model.delete(req.params.id);
  res.redirect('/albumes');
};
