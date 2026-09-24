import * as peliculasService from "../services/peliculas.service.js";

const SECCIONES = [
  { nombre: "Acción", slug: "accion" },
  { nombre: "Comedia", slug: "comedia" },
  { nombre: "Terror", slug: "terror" },
  { nombre: "Ciencia Ficción", slug: "scifi" },
  { nombre: "Animación", slug: "animacion" },
  { nombre: "Drama", slug: "drama" },
];

export async function index(req, res) {
  const peliculas = await peliculasService.getAll({
    titulo: req.query.titulo,
  });

  res.render("index", {
    secciones: SECCIONES,
    peliculas,
    busqueda: req.query.titulo || "",
  });
}

export async function seccion(req, res) {
  const slug = req.params.slug;
  const seccionActual = SECCIONES.find((s) => s.slug === slug);

  if (!seccionActual) {
    return res.status(404).render("404");
  }

  const peliculas = await peliculasService.getAll({ seccion: slug });
    res.render("seccion", {
        seccion: seccionActual,
        peliculas,
        secciones: SECCIONES,
    });
}