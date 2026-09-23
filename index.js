import express from "express";
import { connectDB } from "./config/db.js";
import peliculasRoutes from "./routes/peliculas.routes.js"; 
import directoresRoutes from "./routes/directores.routes.js";

const app = express();
const PORT = process.env.PORT || 3333;

app.use(express.json());
app.use("/api/peliculas", peliculasRoutes); 
app.use("/api/directores", directoresRoutes);

await connectDB();

app.listen(PORT, () => {
  console.log(`Server corriendo en http://localhost:${PORT}`);
});