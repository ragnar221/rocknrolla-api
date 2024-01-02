"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validarJWT_1 = __importDefault(require("../middlewares/validarJWT"));
const validarRol_1 = require("../middlewares/validarRol");
const express_validator_1 = require("express-validator");
const recolectarErrores_1 = require("../middlewares/recolectarErrores");
const issues_1 = require("../controllers/issues");
const router = (0, express_1.Router)();
router.post("/", [
    validarJWT_1.default,
    validarRol_1.isAdmin,
    (0, express_validator_1.check)("title", "el titulo es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("description", "la descripcion es obligatoria").not().isEmpty,
    (0, express_validator_1.check)("priority", "la prioridad es obligatoria").not().isEmpty,
    recolectarErrores_1.recolectarErrores
], issues_1.postNewIssue);
exports.default = router;
