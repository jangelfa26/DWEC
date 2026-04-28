import * as Libro from './librosModel.js';

export async function getAll(req, res) {
  const libros = await Libro.getLibros(req.query.sort);
  res.json(libros);
}

export async function getById(req, res) {
  const libro = await Libro.getLibro(req.params.id);

  if (!libro) return res.status(404).json({ error: 'No encontrado' });

  res.json(libro);
}

export async function create(req, res) {
  await Libro.crearLibro(req.body);
  res.status(201).json(req.body);
}

export async function update(req, res) {
  await Libro.actualizarLibro(req.params.id, req.body);
  res.json({ mensaje: 'Actualizado' });
}

export async function remove(req, res) {
  await Libro.eliminarLibro(req.params.id);
  res.status(204).send();
}