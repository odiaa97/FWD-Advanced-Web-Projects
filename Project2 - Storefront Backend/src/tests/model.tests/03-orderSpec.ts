import { OrderStore } from '../../stores/OrderStore/OrderStore';
import { Order } from '../../models/order';

const orderStore = new OrderStore();
const order: Order = { id: 1, status: 'New', user_id: 1 };
const orderToBeUpdated: Order = { id: 1, status: 'Submitted', user_id: 1 };

describe('ORDER MODEL TEST', () => {
  it('Should create a new order', async () => {
    expect(await orderStore.createOrder(order)).toEqual({
      id: 1,
      status: 'New',
      user_id: 1
    });
  });

  it('should get all orders', async () => {
    const orders = await orderStore.getOrders(1);
    expect(orders.length).toEqual(1);
  });

  it('should update order', async () => {
    const order = await orderStore.updateOrder(orderToBeUpdated);
    expect(order).toEqual({ id: 1, status: 'Submitted', user_id: 1 });
  });

  it('should delete orders', async () => {
    await orderStore.deleteOrders();
    const orders = await orderStore.getOrders(1);
    expect(orders.length).toEqual(0);
  });
});
