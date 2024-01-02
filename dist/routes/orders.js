"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const orders_1 = require("../controllers/orders");
const validarJWT_1 = __importDefault(require("../middlewares/validarJWT"));
const recolectarErrores_1 = require("../middlewares/recolectarErrores");
const validarVerificado_1 = require("../middlewares/validarVerificado");
const express_validator_1 = require("express-validator");
const router = (0, express_1.Router)();
router.get("/", [validarJWT_1.default, recolectarErrores_1.recolectarErrores], orders_1.getOrdenes);
router.post("/", [
    validarJWT_1.default,
    validarVerificado_1.isVerified,
    (0, express_validator_1.check)("price", "el precio es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("shippingCost", "el costo de envio es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("total", "el total es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("shippingDetails", "los detalles del envio son obligatorios").not().isEmpty(),
    (0, express_validator_1.check)("items", "el array de productos es obligatorio").not().isEmpty(),
    recolectarErrores_1.recolectarErrores
], orders_1.createOrder);
exports.default = router;
