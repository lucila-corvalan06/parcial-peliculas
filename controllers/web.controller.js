import * as peliculasService from "../services/peliculas.service.js";
import * as directoresService from "../services/directores.service.js";

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

export async function agregar(req, res) {
  const directores = await directoresService.getAll();

  res.render("agregar", {
    directores,
    secciones: SECCIONES,
  });
}

export async function editar(req, res) {
  const pelicula = await peliculasService.getById(req.params.id);
  const directores = await directoresService.getAll();

  if (!pelicula) {
    return res.status(404).render("404");
  }

  res.render("editar", {
    pelicula,
    directores,
    secciones: SECCIONES,
  });
}

export async function actualizar(req, res) {
  await peliculasService.update(req.params.id, req.body);

  res.redirect("/");
}

export async function eliminar(req, res) {
  await peliculasService.remove(req.params.id);

  res.redirect("/");
}