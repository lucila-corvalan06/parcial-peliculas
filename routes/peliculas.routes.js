import { Router } from "express";
import * as peliculasController from "../controllers/peliculas.controller.js";

const router = Router();

router.get("/", peliculasController.getAll);
router.get("/:id", peliculasController.getById);
router.post("/", peliculasController.create);
router.put("/:id", peliculasController.update);
router.delete("/:id", peliculasController.remove);

export default router;