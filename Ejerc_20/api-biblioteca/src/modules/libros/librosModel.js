import { conectarDB } from '../../config/db.js';

export async function getLibros(sort) {
  const db = await conectarDB();

  let query = db.collection('libros').find();

  if (sort === 'titulo') {
    query = query.sort({ titulo: 1 });
  }

  return query.toArray();
}

export async function getLibro(id) {
  const db = await conectarDB();
  return db.collection('libros').findOne({ referencia: id });
}

export async function crearLibro(data) {
  const db = await conectarDB();
  return db.collection('libros').insertOne(data);
}

export async function actualizarLibro(id, data) {
  const db = await conectarDB();
  return db.collection('libros')
    .updateOne({ referencia: id }, { $set: data });
}

export async function eliminarLibro(id) {
  const db = await conectarDB();
  return db.collection('libros')
    .deleteOne({ referencia: id });
}

export async function getLibrosPorAutor(autorId) {
  const db = await conectarDB();
  return db.collection('libros')
    .find({ autor: autorId })
    .toArray();
}