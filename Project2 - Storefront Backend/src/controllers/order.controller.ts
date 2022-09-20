import { Request, Response } from 'express';
import { Order } from '../models/order';
import { OrderStore } from '../stores/OrderStore/OrderStore';
import { getCurrentUser } from '../services/JWT/getCurrentUser';

const orderStore = new OrderStore();

class OrderController {
  index = async (req: Request, res: Response) => {
    try {
      getCurrentUser(req, res)
        .then(async (user) => {
          if (user.id) {
            const orders = await orderStore.getOrders(user.id);
            res.status(200).json(orders);
          }
        })
        .catch((e) => {
          throw new Error(`${e}`);
        });
    } catch (err) {
      throw new Error(`${err}`);
    }
  };

  getOrder = async (req: Request, res: Response) => {
    try {
      const orderId: number = parseInt(req.params.id);
      const order: Order = await orderStore.getOrder(orderId);
      if (order) return res.status(200).json(order);
      return res.status(404).json('Order not found');
    } catch (e) {
      throw new Error(`${e}`);
    }
  };

  createOrder = async (req: Request, res: Response) => {
    try {
      getCurrentUser(req, res)
        .then(async (user) => {
          const newOrder: Order = { status: req.body.status, user_id: user.id };
          const orderAdded = await orderStore.createOrder(newOrder);
          return res.status(200).json(orderAdded);
        })
        .catch((e) => {
          throw new Error(
            'You must be logged in to create a new order: ' + e.message
          );
        });
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

  deleteOder = async (req: Request, res: Response) => {
    try {
      const orderId: number = parseInt(req.params.id);
      const order: Order = await orderStore.getOrder(orderId);
      getCurrentUser(req, res)
        .then((user) => {
          if (user.id == order.user_id) {
            orderStore
              .deleteOrder(orderId)
              .then(() => {
                return res.status(200).end('Successfully deleted order');
              })
              .catch((error) => {
                return res.status(400).json(`${error.message}`);
              });
          } else return res.status(400).json('You cannot delete this order');
        })
        .catch((e) => {
          res.status(400).json(`Cannot delete order ${e}`);
        });
    } catch (e) {
      throw new Error(`Order not Found: ${e}`);
    }
  };

  updateOrder = async (req: Request, res: Response) => {
    try {
      const updatedOrder: Order = req.body;
      const result = await orderStore.updateOrder(updatedOrder);
      if (result) return res.status(200).json(result);
      return res.status(400).json('Order not found');
    } catch (e) {
      throw new Error(`${e}`);
    }
  };
}

export default OrderController;
