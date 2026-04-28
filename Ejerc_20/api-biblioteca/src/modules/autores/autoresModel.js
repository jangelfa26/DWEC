import { conectarDB } from '../../config/db.js';

export async function getAutores(filtro = {}) {
  const db = await conectarDB();
  return db.collection('autores').find(filtro).toArray();
}

export async function getAutorPorId(id) {
  const db = await conectarDB();
  return db.collection('autores').findOne({ referencia: id });
}

export async function crearAutor(data) {
  const db = await conectarDB();
  return db.collection('autores').insertOne(data);
}

export async function actualizarAutor(id, data) {
  const db = await conectarDB();
  return db.collection('autores')
    .updateOne({ referencia: id }, { $set: data });
}

export async function eliminarAutor(id) {
  const db = await conectarDB();
  return db.collection('autores')
    .deleteOne({ referencia: id });
}