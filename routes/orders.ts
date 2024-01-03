import { Router } from "express";
import { getOrdenes ,createOrder } from "../controllers/orders";
import validarJWT from "../middlewares/validarJWT";
import { recolectarErrores } from "../middlewares/recolectarErrores";
import { isVerified } from "../middlewares/validarVerificado";
import { check } from "express-validator";

const router = Router();

router.get("/",[validarJWT, recolectarErrores], getOrdenes)

router.post("/", [
    validarJWT,
    //isVerified,
    check("price", "el precio es obligatorio").not().isEmpty(),
    check("shippingCost", "el costo de envio es obligatorio").not().isEmpty(),
    check("total", "el total es obligatorio").not().isEmpty(),
    check("shippingDetails", "los detalles del envio son obligatorios").not().isEmpty(),
    check("items", "el array de productos es obligatorio").not().isEmpty(),
    recolectarErrores
], createOrder
)

export default router;