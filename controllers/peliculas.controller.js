import * as peliculasService from "../services/peliculas.service.js";
import * as directoresService from "../services/directores.service.js";

export async function getAll(req, res) {
  try {
    const filtros = {
      seccion: req.query.seccion,
      anio: req.query.anio,
       titulo: req.query.titulo,
    };
    const peliculas = await peliculasService.getAll(filtros);
    res.status(200).json(peliculas);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las películas" });
  }
}

export async function getById(req, res) {
  try {
    const pelicula = await peliculasService.getById(req.params.id);
    if (!pelicula) {
      return res.status(404).json({ error: "Película no encontrada" });
    }
    res.status(200).json(pelicula);
  } catch (error) {
    res.status(400).json({ error: "ID inválido" });
  }
}


export async function create(req, res) {
  try {
    const { titulo, sinopsis, trailer, poster, seccion, directorId } = req.body;
    if (!titulo || !sinopsis || !trailer || !poster || !seccion || !directorId) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    const director = await directoresService.getById(directorId);
    if (!director) {
      return res.status(404).json({ error: "El director indicado no existe" });
    }

    const nuevaPelicula = await peliculasService.create({
      ...req.body,
      directorNombre: director.nombre,
    });
    res.status(201).json(nuevaPelicula);
  } catch (error) {
    res.status(400).json({ error: "Error al crear la película (revisá el directorId)" });
  }
}

export async function update(req, res) {
  try {
    const actualizada = await peliculasService.update(req.params.id, req.body);
    if (!actualizada) {
      return res.status(404).json({ error: "Película no encontrada" });
    }
    res.status(200).json(actualizada);
  } catch (error) {
    res.status(400).json({ error: "ID inválido" });
  }
}

export async function remove(req, res) {
  try {
    const eliminada = await peliculasService.remove(req.params.id);
    if (!eliminada) {
      return res.status(404).json({ error: "Película no encontrada" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: "ID inválido" });
  }
}