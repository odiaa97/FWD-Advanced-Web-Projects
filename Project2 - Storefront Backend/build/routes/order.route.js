"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_controller_1 = __importDefault(require("../controllers/order.controller"));
const tokenVerification_1 = require("../middlewares/tokenVerification");
const orderController = new order_controller_1.default();
const orderRoutes = (app) => {
    app.get('/orders', orderController.index);
    app.get('/orders/:id', orderController.getOrder);
    app.post('/orders', tokenVerification_1.verifyAuthentication, orderController.createOrder);
    app.delete('/orders/:id', tokenVerification_1.verifyAuthentication, orderController.deleteOder);
    app.put('/orders/:id', tokenVerification_1.verifyAuthentication, orderController.updateOrder);
};
exports.default = orderRoutes;
