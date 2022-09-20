import express from 'express';
import OrderController from '../controllers/order.controller';
import { verifyAuthentication, verifyAuthorization } from '../middlewares/tokenVerification';

const orderController = new OrderController();

const orderRoutes = (app: express.Application) => {
    app.get('/orders', orderController.index)
    app.get('/orders/:id', orderController.getOrder)
    app.post('/orders', verifyAuthentication, orderController.createOrder)
    app.delete('/orders/:id', verifyAuthentication, orderController.deleteOder)
    app.put('/orders/:id', verifyAuthentication, orderController.updateOrder)
}

export default orderRoutes