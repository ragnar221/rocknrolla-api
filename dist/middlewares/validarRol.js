"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = void 0;
const constants_1 = require("../helpers/constants");
const isAdmin = (req, res, next) => {
    const { rol } = req.body.usuarioConfirmado;
    if (rol == !constants_1.ROLES.admin) {
        res.status(401).json({
            msj: "El usuario no es administrador"
        });
        return;
    }
    next();
};
exports.isAdmin = isAdmin;
