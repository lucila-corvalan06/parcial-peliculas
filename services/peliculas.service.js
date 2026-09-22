import { getDB } from "../config/db.js";
import { ObjectId } from "mongodb";

function coleccion() {
  return getDB().collection("Peliculas");
}

export async function getAll(filtros = {}) {
  const query = { activo: true };

  if (filtros.seccion) query.seccion = filtros.seccion;
  if (filtros.anio) query.anio = Number(filtros.anio);

  return coleccion().find(query).toArray();
}

export async function getById(id) {
  return coleccion().findOne({ _id: new ObjectId(id), activo: true });
}

export async function create(data) {
  const nuevaPelicula = {
    titulo: data.titulo,
    sinopsis: data.sinopsis,
    trailer: data.trailer,
    poster: data.poster,
    anio: Number(data.anio),
    duracion: Number(data.duracion),
    generos: data.generos,
    seccion: data.seccion,
    activo: true,
  };
  const resultado = await coleccion().insertOne(nuevaPelicula);
  return { _id: resultado.insertedId, ...nuevaPelicula };
}

export async function update(id, data) {
  return coleccion().findOneAndUpdate(
    { _id: new ObjectId(id), activo: true },
    { $set: data },
    { returnDocument: "after" }
  );
}

export async function remove(id) {
  const resultado = await coleccion().updateOne(
    { _id: new ObjectId(id) },
    { $set: { activo: false } }
  );
  return resultado.modifiedCount > 0;
}