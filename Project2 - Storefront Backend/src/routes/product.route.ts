import express from 'express';
import ProductController from '../controllers/product.controller';
import { verifyAuthentication } from '../middlewares/tokenVerification';

const productController = new ProductController();

const productRoutes = (app: express.Application) => {
  app.get('/products', productController.index);
  app.get('/products/:id', productController.getProduct);
  app.post('/products', verifyAuthentication, productController.createProduct);
  app.delete(
    '/products/:id',
    verifyAuthentication,
    productController.deleteProduct
  );
  app.put(
    '/products/:id',
    verifyAuthentication,
    productController.updateProduct
  );
};

export default productRoutes;
