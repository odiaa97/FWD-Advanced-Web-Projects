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
exports.CartStore = void 0;
const db_config_1 = __importDefault(require("../../db_config"));
const OrderStore_1 = require("../OrderStore/OrderStore");
class CartStore {
    constructor() {
        this.orderStore = new OrderStore_1.OrderStore();
        this.getOrderProduct = (orderProductId) => __awaiter(this, void 0, void 0, function* () {
            try {
                // Validations are in controller
                const sql = `SELECT * FROM order_products WHERE id = ${orderProductId};`;
                const conn = yield db_config_1.default.connect();
                const result = yield conn.query(sql);
                const product = result.rows[0];
                conn.release();
                return product;
            }
            catch (err) {
                throw new Error(`Cannot create order: ${err}`);
            }
        });
        this.getOrderProducts = () => __awaiter(this, void 0, void 0, function* () {
            try {
                // Validations are in controller
                const sql = `SELECT * FROM order_products;`;
                const conn = yield db_config_1.default.connect();
                const result = yield conn.query(sql);
                const product = result.rows;
                conn.release();
                return product;
            }
            catch (err) {
                throw new Error(`Cannot create order: ${err}`);
            }
        });
        this.getCartProductsInOrder = (userId, order) => __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = `SELECT products.id, products.name, products.price FROM order_products
                        JOIN products on products.id = order_products.product_id
                        JOIN orders on orders.id = order_products.order_id
                        WHERE order_products.order_id = orders.id
                        AND orders.user_id = ${userId}`;
                const conn = yield db_config_1.default.connect();
                const result = yield conn.query(sql);
                const products = result.rows;
                conn.release();
                return products;
            }
            catch (err) {
                throw new Error(`Cannot create order: ${err}`);
            }
        });
        this.addProductInCart = (order_product) => __awaiter(this, void 0, void 0, function* () {
            try {
                // Validations are in controller
                const sql = 'INSERT INTO order_products (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING *';
                const conn = yield db_config_1.default.connect();
                const result = yield conn.query(sql, [order_product.order_id, order_product.product_id, order_product.quantity]);
                const orderAdded = result.rows[0];
                conn.release();
                return orderAdded;
            }
            catch (err) {
                throw new Error(`Cannot create order: ${err}`);
            }
        });
        this.deleteOrderProduct = (order_product) => __awaiter(this, void 0, void 0, function* () {
            try {
                // Validations are in controller
                const sql = `DELETE FROM order_products WHERE id = ${order_product.id}`;
                const conn = yield db_config_1.default.connect();
                const result = yield conn.query(sql);
                const productRemoved = result.rows[0];
                conn.release();
                if (productRemoved.length)
                    return true;
                return false;
            }
            catch (err) {
                throw new Error(`Cannot create order: ${err}`);
            }
        });
        this.changeProductQty = (orderProductId, sign) => __awaiter(this, void 0, void 0, function* () {
            try {
                // get old product
                const orderProduct = yield this.getOrderProduct(orderProductId);
                // Calculate new product quantity based on [sign] parameter if true: increment, false: decrement
                const newQuantity = sign ? (orderProduct.quantity + 1) : (orderProduct.quantity - 1);
                // Update product quantity
                const sql = `UPDATE order_products SET quantity = ${newQuantity} WHERE id = ${orderProductId} RETURNING *;`;
                const conn = yield db_config_1.default.connect();
                const result = yield conn.query(sql);
                // Return
                const updatedProduct = result.rows[0];
                conn.release();
                return updatedProduct;
            }
            catch (err) {
                throw new Error(`Cannot create order: ${err}`);
            }
        });
        this.deleteProductInAllCarts = (productId) => __awaiter(this, void 0, void 0, function* () {
            try {
                // Validations are in controller
                const sql = `DELETE FROM order_products WHERE product_id = ${productId}`; // Delete all rows that have [productId]
                const conn = yield db_config_1.default.connect();
                const result = yield conn.query(sql);
                const productsRemoved = result.rows;
                conn.release();
                return productsRemoved;
            }
            catch (err) {
                throw new Error(`Cannot create order: ${err}`);
            }
        });
    }
}
exports.CartStore = CartStore;
