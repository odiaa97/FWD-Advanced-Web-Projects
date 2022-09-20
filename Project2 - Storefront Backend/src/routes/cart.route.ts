import express from 'express';
import CartController from '../controllers/cart.controller';
import { verifyAuthentication } from '../middlewares/tokenVerification';

const cartController = new CartController();

const cartRoutes = (app: express.Application) => {
    app.get('/cart/orders', verifyAuthentication, cartController.index)
    app.get('/cart/orders/:id/products', verifyAuthentication, cartController.getMyCartProducts);
    app.get('/cart/order', verifyAuthentication, cartController.getOrderProduct);
    app.post('/cart/products', verifyAuthentication, cartController.addProductInCart);
    app.put('/cart/product/increment', verifyAuthentication, cartController.changeQty);
    app.put('/cart/product/decrement', verifyAuthentication, cartController.changeQty);
    app.delete('/cart/products', verifyAuthentication, cartController.deleteProductInAllCarts);
    app.delete('/cart/product', verifyAuthentication, cartController.deleteOrderProduct);
}

export default cartRoutes;