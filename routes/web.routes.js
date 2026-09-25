import { Router } from "express";
import * as webController from "../controllers/web.controller.js";

const router = Router();

router.get("/", webController.index);
router.get("/directores", webController.directores);
router.get("/directores/agregar", webController.agregarDirector);
router.post("/directores/agregar", webController.crearDirector);
router.get("/directores/:id/editar", webController.editarDirector);
router.post("/directores/:id/editar", webController.actualizarDirector);
router.post("/directores/:id/eliminar", webController.eliminarDirector);
router.get("/peliculas/agregar", webController.agregar);
router.post("/peliculas/agregar", webController.crearPelicula);
router.get("/peliculas/:id/editar", webController.editar);
router.post("/peliculas/:id/editar", webController.actualizar);
router.post("/peliculas/:id/eliminar", webController.eliminar);
router.get("/secciones/:slug", webController.seccion);

export default router;