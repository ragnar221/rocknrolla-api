import { Router } from "express";
import { login, register, verifyUser } from "../controllers/auth";
import { check } from "express-validator";
import { existeEmail } from "../helpers/validacionesDB";

import { recolectarErrores } from "../middlewares/recolectarErrores";

const router= Router();

router.post('/register', [
    check("nombre","el nombre es obligatorio").not().isEmpty(),
    check("email", "el email es obligatorio").isEmail(),
    check("password", "el password debe tener 6 caracteres como minimo").isLength({min:6}),
    //validacion custom
    check("email").custom(existeEmail),
    //middleware custom
    recolectarErrores,
] , register )

router.post('/login', [
    check("email", "se necesita completar el campo email").not().isEmpty(),
    check("password", "el password necesita 6 caracteres como minimo").isLength({min:6}),
    recolectarErrores,
] , login )

router.patch(
    "/verify",
    [
        check("email", "El email es requerido").not().isEmpty(),
        check("code", "El codigo de verificación es requerido").not().isEmpty(),
        recolectarErrores
    ], verifyUser
)

export default router