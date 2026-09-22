import dns from "node:dns";
import { MongoClient } from "mongodb";
import "dotenv/config";


dns.setServers(["8.8.8.8", "1.1.1.1"]);

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

let db;

export async function connectDB() {
  if (db) return db;
  await client.connect();
  db = client.db();
  console.log("Conectado a MongoDB:", db.databaseName);
  return db;
}

export function getDB() {
  if (!db) {
    throw new Error("La base todavía no está conectada. Llamá a connectDB() primero.");
  }
  return db;
}