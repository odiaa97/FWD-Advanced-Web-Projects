'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const product_controller_1 = __importDefault(
  require('../controllers/product.controller')
);
const tokenVerification_1 = require('../middlewares/tokenVerification');
const productController = new product_controller_1.default();
const productRoutes = (app) => {
  app.get('/products', productController.index);
  app.get('/products/:id', productController.getProduct);
  app.post(
    '/products',
    tokenVerification_1.verifyAuthentication,
    productController.createProduct
  );
  app.delete(
    '/products/:id',
    tokenVerification_1.verifyAuthentication,
    productController.deleteProduct
  );
  app.put(
    '/products/:id',
    tokenVerification_1.verifyAuthentication,
    productController.updateProduct
  );
};
exports.default = productRoutes;
