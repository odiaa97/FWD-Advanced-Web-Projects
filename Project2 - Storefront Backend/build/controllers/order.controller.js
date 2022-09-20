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
const OrderStore_1 = require("../stores/OrderStore/OrderStore");
const getCurrentUser_1 = require("../services/JWT/getCurrentUser");
const orderStore = new OrderStore_1.OrderStore();
class OrderController {
    constructor() {
        this.index = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                (0, getCurrentUser_1.getCurrentUser)(req, res).then((user) => __awaiter(this, void 0, void 0, function* () {
                    if (user.id) {
                        let orders = yield orderStore.getOrders(user.id);
                        res.status(200).json(orders);
                    }
                })).catch(e => {
                    throw new Error(`${e}`);
                });
            }
            catch (err) {
                throw new Error(`${err}`);
            }
        });
        this.getOrder = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let orderId = parseInt(req.params.id);
                let order = yield orderStore.getOrder(orderId);
                if (order)
                    return res.status(200).json(order);
                return res.status(404).json('Order not found');
            }
            catch (e) {
                throw new Error(`${e}`);
            }
        });
        this.createOrder = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                (0, getCurrentUser_1.getCurrentUser)(req, res)
                    .then((user) => __awaiter(this, void 0, void 0, function* () {
                    let newOrder = { status: req.body.status, user_id: user.id };
                    let orderAdded = yield orderStore.createOrder(newOrder);
                    return res.status(200).json(orderAdded);
                }))
                    .catch(e => {
                    throw new Error("You must be logged in to create a new order: " + e.message);
                });
            }
            catch (error) {
                throw new Error(`${error}`);
            }
        });
        this.deleteOder = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let orderId = parseInt(req.params.id);
                let order = yield orderStore.getOrder(orderId);
                (0, getCurrentUser_1.getCurrentUser)(req, res)
                    .then((user) => {
                    if (user.id == order.user_id) {
                        orderStore.deleteOrder(orderId)
                            .then(() => {
                            return res.status(200).end('Successfully deleted order');
                        })
                            .catch((error) => { return res.status(400).json(`${error.message}`); });
                    }
                    else
                        return res.status(400).json('You cannot delete this order');
                })
                    .catch(e => {
                    res.status(400).json(`Cannot delete order ${e}`);
                });
            }
            catch (e) {
                throw new Error(`Order not Found: ${e}`);
            }
        });
        this.updateOrder = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let updatedOrder = req.body;
                const result = yield orderStore.updateOrder(updatedOrder);
                if (result)
                    return res.status(200).json(result);
                return res.status(400).json('Order not found');
            }
            catch (e) {
                throw new Error(`${e}`);
            }
        });
    }
}
exports.default = OrderController;
