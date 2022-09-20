import { Order } from '../models/order'

export interface IOrderInterface {
    getOrders(): Promise<Order[]>;
    getOrder(order: Order): Promise<Order>;
    addOrder(order: Order): Promise<Order>;
    updateOrder(order: Order): Promise<Order>;
    deleteOrder(order: Order): Promise<Order>;
}