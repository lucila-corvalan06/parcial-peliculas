import express from "express";
import { connectDB } from "./config/db.js";

const app = express();
const PORT = process.env.PORT || 3333;

app.use(express.json());

await connectDB();

app.listen(PORT, () => {
  console.log(`Server corriendo en http://localhost:${PORT}`);
});