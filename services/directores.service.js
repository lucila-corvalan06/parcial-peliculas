import { getDB } from "../config/db.js";
import { ObjectId } from "mongodb";

function coleccion() {
  return getDB().collection("Directores");
}

export async function getAll() {
  return coleccion().find({ activo: true }).toArray();
}

export async function getById(id) {
  return coleccion().findOne({ _id: new ObjectId(id), activo: true });
}

export async function create(data) {
  const nuevoDirector = {
    nombre: data.nombre,
    foto: data.foto,
    descripcion: data.descripcion,
    activo: true,
  };
  const resultado = await coleccion().insertOne(nuevoDirector);
  return { _id: resultado.insertedId, ...nuevoDirector };
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