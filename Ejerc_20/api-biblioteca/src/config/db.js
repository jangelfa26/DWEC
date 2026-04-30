import dotenv from 'dotenv';
dotenv.config();

import { MongoClient } from 'mongodb';

const uri = process.env.MONGO_URI;

let db = null;

export async function conectarDB() {
  if (db) return db;

  const client = new MongoClient(uri);
  await client.connect();

  db = client.db('libreria');

  return db;
}