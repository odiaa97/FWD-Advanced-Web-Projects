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
const CartStore_1 = require("../stores/CartStore/CartStore");
const getCurrentUser_1 = require("../services/JWT/getCurrentUser");
const OrderStore_1 = require("../stores/OrderStore/OrderStore");
class CartController {
    constructor() {
        this.cartStore = new CartStore_1.CartStore();
        this.orderStore = new OrderStore_1.OrderStore();
        this.index = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                (0, getCurrentUser_1.getCurrentUser)(req, res).then((user) => __awaiter(this, void 0, void 0, function* () {
                    const order = req.body;
                    if ((user.id && user.id == order.user_id) || user.role == 'Admin') {
                        const orderProducts = yield this.cartStore.getOrderProducts();
                        return res.status(200).json(orderProducts);
                    }
                    else
                        return res.status(403).json("Forbidden");
                })).catch(e => {
                    throw new Error(`${e}`);
                });
            }
            catch (err) {
                throw new Error(`${err}`);
            }
        });
        this.getMyCartProducts = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                (0, getCurrentUser_1.getCurrentUser)(req, res).then((user) => __awaiter(this, void 0, void 0, function* () {
                    const order = yield this.orderStore.getOrder(parseInt(req.params.id));
                    console.log(order);
                    if (user.id && user.id == order.user_id) {
                        console.log(user.id);
                        const products = yield this.cartStore.getCartProductsInOrder(user.id, order);
                        return res.status(200).json(products);
                    }
                    else
                        return res.status(403).json("Forbidden");
                })).catch(e => {
                    throw new Error(`${e}`);
                });
            }
            catch (err) {
                throw new Error(`${err}`);
            }
        });
        this.changeQty = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const url = req.originalUrl;
                const sign = url.includes('increment') ? true : false;
                const orderProduct = req.body;
                const orderUpdated = yield this.cartStore.changeProductQty(orderProduct, sign);
                return res.status(200).json(orderUpdated);
            }
            catch (e) {
                throw new Error(`${e}`);
            }
        });
        this.getOrderProduct = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                (0, getCurrentUser_1.getCurrentUser)(req, res).then((user) => __awaiter(this, void 0, void 0, function* () {
                    const orderProduct = yield this.cartStore.getOrderProduct(req.body.id);
                    console.log(orderProduct);
                    const order = yield this.orderStore.getOrder(orderProduct.order_id);
                    console.log(order);
                    if ((user.id == order.user_id) || user.role == 'Admin') {
                        const orderProductId = req.body.id;
                        const orderProduct = yield this.cartStore.getOrderProduct(orderProductId);
                        return res.status(200).json(orderProduct);
                    }
                    else
                        return res.status(403).json("Forbidden");
                }))
                    .catch((e) => {
                    throw new Error(`${e}`);
                });
            }
            catch (e) {
                throw new Error(`${e}`);
            }
        });
        this.addProductInCart = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const orderProduct = req.body;
                const newOrderProduct = yield this.cartStore.addProductInCart(orderProduct);
                return res.status(200).json(newOrderProduct);
            }
            catch (e) {
                throw new Error(`${e}`);
            }
        });
        this.deleteOrderProduct = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const orderProduct = yield this.cartStore.getOrderProduct(req.body.id);
                const orderProductDeleted = yield this.cartStore.deleteOrderProduct(orderProduct);
                if (orderProductDeleted)
                    return res.status(200).json(orderProductDeleted);
                else
                    return res.status(400).json("Something went wrong in deleteOrderProduct");
            }
            catch (e) {
                throw new Error(`${e}`);
            }
        });
        this.deleteProductInAllCarts = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const productId = req.body.productId;
            const allRowsDeleted = yield this.cartStore.deleteProductInAllCarts(productId);
            if (allRowsDeleted)
                return res.status(204).json();
            else
                return res.status(400).json("Something went wrong in deleteProductInAllCarts");
        });
    }
}
exports.default = CartController;
