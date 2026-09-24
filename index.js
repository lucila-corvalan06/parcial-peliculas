import express from "express";
import { connectDB } from "./config/db.js";
import peliculasRoutes from "./routes/peliculas.routes.js"; 
import directoresRoutes from "./routes/directores.routes.js";
import webRoutes from "./routes/web.routes.js";

const app = express();
const PORT = process.env.PORT || 3333;

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.json());

app.use(express.static("css"));

app.use("/api/peliculas", peliculasRoutes); 
app.use("/api/directores", directoresRoutes);
app.use("/", webRoutes); 


await connectDB();

app.listen(PORT, () => {
  console.log(`Server corriendo en http://localhost:${PORT}`);
});