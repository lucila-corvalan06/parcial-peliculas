import { Router } from "express";
import * as webController from "../controllers/web.controller.js";

const router = Router();

router.get("/", webController.index);
router.get("/secciones/:slug", webController.seccion);

export default router;