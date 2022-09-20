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
const ProductStore_1 = require("../stores/Product Store/ProductStore");
const getCurrentUser_1 = require("../services/JWT/getCurrentUser");
const CartStore_1 = require("../stores/CartStore/CartStore");
class ProductController {
    constructor() {
        this.productStore = new ProductStore_1.ProductStore();
        this.cartStore = new CartStore_1.CartStore();
        this.index = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield this.productStore.getProducts();
                res.status(200).json(products);
            }
            catch (err) {
                throw new Error(`${err}`);
            }
        });
        this.getProduct = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let productId = parseInt(req.params.id);
                let product = yield this.productStore.getProduct(productId);
                if (product)
                    return res.status(200).json(product);
                return res.status(404).json('Product not found');
            }
            catch (e) {
                throw new Error(`${e}`);
            }
        });
        this.createProduct = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let newProduct = { name: req.body.name, price: req.body.price };
                let productAdded = yield this.productStore.createProduct(newProduct);
                return res.status(200).json(productAdded);
            }
            catch (error) {
                throw new Error(`${error}`);
            }
        });
        this.deleteProduct = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let productId = parseInt(req.params.id);
                const productExists = yield this.productStore.checkIfProductExists(productId);
                if (productExists) {
                    (0, getCurrentUser_1.getUserRole)(req)
                        .then((role) => __awaiter(this, void 0, void 0, function* () {
                        if (role == 'Admin') {
                            yield this.cartStore.deleteProductInAllCarts(productId);
                            yield this.productStore.deleteProduct(productId);
                            return res.status(200).json("Product successfully deleted");
                        }
                    }))
                        .catch(e => {
                        return res.status(401).json(`Cannot delete product: ${e.message}`);
                    });
                }
                else {
                    return res.status(404).json("Product not found");
                }
            }
            catch (e) {
                throw new Error(`Product not Found: ${e}`);
            }
        });
        this.updateProduct = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let productToBeUpdated = req.body;
                if (productToBeUpdated.id) {
                    const product = yield this.productStore.getProduct(productToBeUpdated.id);
                    if (product) {
                        const result = yield this.productStore.updateProduct(productToBeUpdated);
                        if (result)
                            return res.status(200).json(result);
                    }
                }
                return res.status(404).json('Product not found');
            }
            catch (e) {
                throw new Error(`${e}`);
            }
        });
    }
}
exports.default = ProductController;
