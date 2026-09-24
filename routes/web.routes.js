import { Router } from "express";
import * as webController from "../controllers/web.controller.js";

const router = Router();

router.get("/", webController.index);
router.get("/peliculas/agregar", webController.agregar);
router.get("/peliculas/:id/editar", webController.editar);
router.post("/peliculas/:id/editar", webController.actualizar);
router.post("/peliculas/:id/eliminar", webController.eliminar);
router.get("/secciones/:slug", webController.seccion);

export default router;