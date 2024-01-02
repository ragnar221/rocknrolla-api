"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
const express_validator_1 = require("express-validator");
const validacionesDB_1 = require("../helpers/validacionesDB");
const recolectarErrores_1 = require("../middlewares/recolectarErrores");
const router = (0, express_1.Router)();
router.post('/register', [
    (0, express_validator_1.check)("nombre", "el nombre es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("email", "el email es obligatorio").isEmail(),
    (0, express_validator_1.check)("password", "el password debe tener 6 caracteres como minimo").isLength({ min: 6 }),
    //validacion custom
    (0, express_validator_1.check)("email").custom(validacionesDB_1.existeEmail),
    //middleware custom
    recolectarErrores_1.recolectarErrores,
], auth_1.register);
router.post('/login', [
    (0, express_validator_1.check)("email", "se necesita completar el campo email").not().isEmpty(),
    (0, express_validator_1.check)("password", "el password necesita 6 caracteres como minimo").isLength({ min: 6 }),
    recolectarErrores_1.recolectarErrores,
], auth_1.login);
router.patch("/verify", [
    (0, express_validator_1.check)("email", "El email es requerido").not().isEmpty(),
    (0, express_validator_1.check)("code", "El codigo de verificación es requerido").not().isEmpty(),
    recolectarErrores_1.recolectarErrores
], auth_1.verifyUser);
exports.default = router;
