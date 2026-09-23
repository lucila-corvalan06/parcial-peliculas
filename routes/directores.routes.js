import { Router } from "express";
import * as directoresController from "../controllers/directores.controller.js";

const router = Router();

router.get("/", directoresController.getAll);
router.get("/:id", directoresController.getById);
router.post("/", directoresController.create);
router.put("/:id", directoresController.update);
router.delete("/:id", directoresController.remove);
router.get("/:id/peliculas", directoresController.getPeliculas);

export default router;