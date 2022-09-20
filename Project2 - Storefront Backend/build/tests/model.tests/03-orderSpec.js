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
const OrderStore_1 = require("../../stores/OrderStore/OrderStore");
const orderStore = new OrderStore_1.OrderStore();
const order = { id: 1, status: 'New', user_id: 1 };
const orderToBeUpdated = { id: 1, status: 'Submitted', user_id: 1 };
describe('ORDER MODEL TEST', () => {
    it('Should create a new order', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(yield orderStore.createOrder(order)).toEqual({ id: 1, status: 'New', user_id: 1 });
    }));
    it('should get all orders', () => __awaiter(void 0, void 0, void 0, function* () {
        const orders = yield orderStore.getOrders(1);
        expect(orders.length).toEqual(1);
    }));
    it('should update order', () => __awaiter(void 0, void 0, void 0, function* () {
        const order = yield orderStore.updateOrder(orderToBeUpdated);
        expect(order).toEqual({ id: 1, status: 'Submitted', user_id: 1 });
    }));
    it('should delete orders', () => __awaiter(void 0, void 0, void 0, function* () {
        yield orderStore.deleteOrders();
        const orders = yield orderStore.getOrders(1);
        expect(orders.length).toEqual(0);
    }));
});
