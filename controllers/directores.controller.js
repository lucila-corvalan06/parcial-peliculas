import * as directoresService from "../services/directores.service.js";
import * as peliculasService from "../services/peliculas.service.js";

export async function getAll(req, res) {
  try {
    const directores = await directoresService.getAll();
    res.status(200).json(directores);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los directores" });
  }
}

export async function getById(req, res) {
  try {
    const director = await directoresService.getById(req.params.id);
    if (!director) {
      return res.status(404).json({ error: "Director no encontrado" });
    }
    res.status(200).json(director);
  } catch (error) {
    res.status(400).json({ error: "ID inválido" });
  }
}

export async function create(req, res) {
  try {
    const { nombre, foto, descripcion } = req.body;
    if (!nombre || !foto || !descripcion) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }
    const nuevoDirector = await directoresService.create(req.body);
    res.status(201).json(nuevoDirector);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el director" });
  }
}

export async function update(req, res) {
  try {
    const actualizado = await directoresService.update(req.params.id, req.body);
    if (!actualizado) {
      return res.status(404).json({ error: "Director no encontrado" });
    }
    res.status(200).json(actualizado);
  } catch (error) {
    res.status(400).json({ error: "ID inválido" });
  }
}

export async function remove(req, res) {
  try {
    const eliminado = await directoresService.remove(req.params.id);
    if (!eliminado) {
      return res.status(404).json({ error: "Director no encontrado" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: "ID inválido" });
  }
}

export async function getPeliculas(req, res) {
  try {
    const director = await directoresService.getById(req.params.id);
    if (!director) {
      return res.status(404).json({ error: "Director no encontrado" });
    }
    const peliculas = await peliculasService.getByDirector(req.params.id);
    res.status(200).json(peliculas);
  } catch (error) {
    res.status(400).json({ error: "ID inválido" });
  }
}