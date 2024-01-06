"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const mongoose_1 = require("mongoose");
const orderSchema = new mongoose_1.Schema({
    createdAt: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Usuario",
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    shippingCost: {
        type: Number,
        required: true
    },
    items: {
        type: [{
                img: {
                    type: String,
                    required: true
                },
                id: {
                    type: Number,
                    required: true
                },
                price: {
                    type: Number,
                    required: true
                },
                quantity: {
                    type: Number,
                    required: true
                },
                name: {
                    type: String,
                    required: true
                },
            }],
        required: true
    },
    shippingDetails: {
        name: {
            type: String,
            required: true
        },
        cellphone: {
            type: String,
            required: true
        },
        location: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        }
    },
    status: {
        type: String,
        required: true
    },
    total: {
        type: Number,
        required: true
    }
});
exports.Order = (mongoose_1.Model) = (0, mongoose_1.model)("Order", orderSchema);
exports.default = exports.Order;
