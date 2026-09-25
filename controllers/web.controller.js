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

export async function crearPelicula(req, res) {
  const director = await directoresService.getById(req.body.directorId);

  await peliculasService.create({
    ...req.body,
    generos: req.body.generos
      ? req.body.generos.split(",").map((g) => g.trim())
      : [],
    directorNombre: director?.nombre,
  });

  res.redirect("/");
}

export async function editar(req, res) {
  try {
    const pelicula = await peliculasService.getById(req.params.id);
    const directores = await directoresService.getAll();

    if (!pelicula) {
      return res.status(404).render("404");
    }

    res.render("editar", { pelicula, directores, secciones: SECCIONES });
  } catch (error) {
    res.status(404).render("404");
  }
}

export async function actualizar(req, res) {
  try {
    const director = req.body.directorId
      ? await directoresService.getById(req.body.directorId)
      : null;

    await peliculasService.update(req.params.id, {
      ...req.body,
      anio: Number(req.body.anio),
      duracion: Number(req.body.duracion),
      generos: req.body.generos
        ? req.body.generos.split(",").map((g) => g.trim())
        : [],
      directorNombre: director?.nombre,
    });

    res.redirect("/");
  } catch (error) {
    res.status(404).render("404");
  }
}

export async function eliminar(req, res) {
  try {
    await peliculasService.remove(req.params.id);
    res.redirect("/");
  } catch (error) {
    res.status(404).render("404");
  }
}

export async function directores(req, res) {
  const directores = await directoresService.getAll();

  res.render("directores", {
    directores,
    secciones: SECCIONES,
  });
}

export function agregarDirector(req, res) {
  res.render("agregar-director");
}

export async function crearDirector(req, res) {
  await directoresService.create(req.body);

  res.redirect("/directores");
}

export async function editarDirector(req, res) {
  try {
    const director = await directoresService.getById(req.params.id);

    if (!director) {
      return res.status(404).render("404");
    }

    res.render("editar-director", { director });
  } catch (error) {
    res.status(404).render("404");
  }
}

export async function actualizarDirector(req, res) {
  try {
    await directoresService.update(req.params.id, req.body);
    res.redirect("/directores");
  } catch (error) {
    res.status(404).render("404");
  }
}

export async function eliminarDirector(req, res) {
  try {
    await directoresService.remove(req.params.id);
    res.redirect("/directores");
  } catch (error) {
    res.status(404).render("404");
  }
}