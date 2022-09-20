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
exports.ProductStore = void 0;
const db_config_1 = __importDefault(require("../../db_config"));
const CartStore_1 = require("../CartStore/CartStore");
class ProductStore {
    constructor() {
        this.cartStore = new CartStore_1.CartStore();
    }
    getProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield db_config_1.default.connect();
                const sql = `SELECT * FROM products WHERE id=$1;`;
                const result = yield conn.query(sql, [id]);
                const user = result.rows[0];
                conn.release();
                return user;
            }
            catch (error) {
                throw new Error(`Cannot fetch data from database: ${error}`);
            }
        });
    }
    getProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield db_config_1.default.connect();
                const sql = 'SELECT * FROM products ORDER BY id ASC;';
                const result = yield conn.query(sql);
                conn.release();
                return result.rows;
            }
            catch (error) {
                throw new Error(`Cannot fetch data from database: ${error}`);
            }
        });
    }
    createProduct(product) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'INSERT INTO products (name, price) VALUES($1, $2) RETURNING *';
                const conn = yield db_config_1.default.connect();
                const result = yield conn.query(sql, [product.name, product.price]);
                const productAdded = result.rows[0];
                conn.release();
                return productAdded;
            }
            catch (err) {
                throw new Error(`Cannot create product: ${err}`);
            }
        });
    }
    updateProduct(product) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updateQuery = `UPDATE products SET name='${product.name}', price='${product.price}' WHERE id=${product.id} RETURNING *`;
                const conn = yield db_config_1.default.connect();
                const result = yield conn.query(updateQuery);
                const productUpdated = result.rows.length > 0 ? result.rows[0] : new Error('rows.length < 0');
                conn.release();
                return productUpdated;
            }
            catch (err) {
                throw new Error(`Error in updateUser: ${err}`);
            }
        });
    }
    deleteProduct(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield db_config_1.default.connect();
                const deleteQuery = `DELETE FROM products WHERE id=${productId}`;
                const result = yield conn.query(deleteQuery);
                return result.rows[0];
            }
            catch (e) {
                throw new Error(`${e}`);
            }
        });
    }
    deleteProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield db_config_1.default.connect();
                const deleteQuery = `DELETE FROM products;`;
                const result = yield conn.query(deleteQuery);
                return result.rows[0];
            }
            catch (e) {
                throw new Error(`${e}`);
            }
        });
    }
    checkIfProductExists(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield db_config_1.default.connect();
            const checkIfExistsSql = `SELECT * FROM products WHERE id=$1`;
            const result = yield connection.query(checkIfExistsSql, [id]);
            if (result.rowCount > 0)
                return true;
            else
                return false;
        });
    }
}
exports.ProductStore = ProductStore;
