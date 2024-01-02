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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrder = exports.getOrdenes = void 0;
const orders_1 = require("../models/orders");
const getOrdenes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usuarioId = req.body.usuarioConfirmado._id;
    const consulta = { user: usuarioId };
    const orders = yield orders_1.Order.find(consulta);
    res.json({
        data: [...orders]
    });
});
exports.getOrdenes = getOrdenes;
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usuario = req.body.usuarioConfirmado._id;
    const orderData = req.body;
    const data = Object.assign(Object.assign({}, orderData), { user: usuario, createdAt: new Date(), status: "pending" });
    const order = new orders_1.Order(data);
    yield order.save();
    res.status(201).json({
        order
    });
});
exports.createOrder = createOrder;
