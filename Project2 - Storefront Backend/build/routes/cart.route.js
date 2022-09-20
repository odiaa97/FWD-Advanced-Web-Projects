"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cart_controller_1 = __importDefault(require("../controllers/cart.controller"));
const tokenVerification_1 = require("../middlewares/tokenVerification");
const cartController = new cart_controller_1.default();
const cartRoutes = (app) => {
    app.get('/cart/orders', tokenVerification_1.verifyAuthentication, cartController.index);
    app.get('/cart/orders/:id/products', tokenVerification_1.verifyAuthentication, cartController.getMyCartProducts);
    app.get('/cart/order', tokenVerification_1.verifyAuthentication, cartController.getOrderProduct);
    app.post('/cart/products', tokenVerification_1.verifyAuthentication, cartController.addProductInCart);
    app.put('/cart/product/increment', tokenVerification_1.verifyAuthentication, cartController.changeQty);
    app.put('/cart/product/decrement', tokenVerification_1.verifyAuthentication, cartController.changeQty);
    app.delete('/cart/products', tokenVerification_1.verifyAuthentication, cartController.deleteProductInAllCarts);
    app.delete('/cart/product', tokenVerification_1.verifyAuthentication, cartController.deleteOrderProduct);
};
exports.default = cartRoutes;
