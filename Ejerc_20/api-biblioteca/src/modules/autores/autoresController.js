import * as Autor from './autoresModel.js';
import { getLibrosPorAutor } from '../libros/librosModel.js';

export async function getAll(req, res) {
  try {
    const filtro = req.query.nacionalidad
      ? { nacionalidad: req.query.nacionalidad }
      : {};

    const autores = await Autor.getAutores(filtro);

    res.json(autores);
  } catch (e) {
    res.status(500).json({ error: 'Error interno' });
  }
}

export async function getById(req, res) {
  const autor = await Autor.getAutorPorId(req.params.id);

  if (!autor) return res.status(404).json({ error: 'No encontrado' });

  res.json(autor);
}

export async function create(req, res) {
  await Autor.crearAutor(req.body);
  res.status(201).json(req.body);
}

export async function update(req, res) {
  await Autor.actualizarAutor(req.params.id, req.body);
  res.json({ mensaje: 'Actualizado' });
}

export async function remove(req, res) {
  await Autor.eliminarAutor(req.params.id);
  res.status(204).send();
}

export async function getLibros(req, res) {
  const libros = await getLibrosPorAutor(req.params.id);
  res.json(libros);
}