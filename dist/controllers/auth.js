"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyUser = exports.login = exports.register = void 0;
const usuario_1 = __importDefault(require("../models/usuario"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const constants_1 = require("../helpers/constants");
const randomstring_1 = __importDefault(require("randomstring"));
const mailer_1 = require("../mailer/mailer");
const generarJWT_1 = __importDefault(require("../helpers/generarJWT"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, email, password, rol } = req.body;
    const usuario = new usuario_1.default({ nombre, email, password, rol });
    const salt = bcryptjs_1.default.genSaltSync();
    usuario.password = bcryptjs_1.default.hashSync(password, salt);
    const adminKey = req.headers["admin-key"];
    if (adminKey === process.env.KEYFORADMIN) {
        usuario.rol = constants_1.ROLES.admin;
    }
    const newCode = randomstring_1.default.generate(6);
    usuario.code = newCode;
    yield usuario.save();
    yield (0, mailer_1.sendEmail)(email, newCode);
    res.status(201).json([
        usuario
    ]);
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const usuario = yield usuario_1.default.findOne({ email });
        if (!usuario) {
            res.status(400).json({
                msj: "la direccion de email no se encuentra en la base de datos"
            });
            return;
        }
        const validarPassword = bcryptjs_1.default.compareSync(password, usuario.password);
        if (!validarPassword) {
            res.status(400).json({
                msj: "La contraseña introducida es incorrecta"
            });
            return;
        }
        const token = yield (0, generarJWT_1.default)(usuario.id);
        res.json({
            usuario,
            token
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msj: "error en el servidor"
        });
    }
});
exports.login = login;
const verifyUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, code } = req.body;
    try {
        const usuario = yield usuario_1.default.findOne({ email });
        if (!usuario) {
            res.status(400).json({
                msj: "la direccion de email no se encuentra en la base de datos"
            });
            return;
        }
        if (usuario.verified) {
            res.status(400).json({
                msj: "El usuario ya esta correctamente verificado"
            });
            return;
        }
        if (usuario.code !== code) {
            res.status(401).json({
                msj: "El codigo ingresado es incorrecto"
            });
            return;
        }
        const usuarioActualizado = yield usuario_1.default.findOneAndUpdate({ email }, { verified: true });
        res.status(400).json({
            msj: "Usuario verificado con éxito"
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msj: "Error en el servidor"
        });
    }
});
exports.verifyUser = verifyUser;
