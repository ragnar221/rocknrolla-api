import { Router } from "express";
import validarJWT from "../middlewares/validarJWT";
import { isAdmin } from "../middlewares/validarRol";
import { check } from "express-validator";
import { recolectarErrores } from "../middlewares/recolectarErrores";
import { postNewIssue } from "../controllers/issues";

const router = Router()

router.post("/",[
    validarJWT,
    isAdmin,
    check("title", "el titulo es obligatorio").not().isEmpty(),
    check("description", "la descripcion es obligatoria").not().isEmpty,
    check("priority", "la prioridad es obligatoria").not().isEmpty,
    recolectarErrores
], postNewIssue)

export default router