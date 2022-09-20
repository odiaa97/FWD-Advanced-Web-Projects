import { CartStore } from '../../stores/CartStore/CartStore';
import { Order_Product } from '../../models/order_product';
import { ProductStore } from '../../stores/Product Store/ProductStore';
import { Product } from '../../models/product';
import { OrderStore } from '../../stores/OrderStore/OrderStore';
import { Order } from '../../models/order';

const orderStore = new OrderStore();
const order: Order = { id: 2, status: 'New', user_id: 1 };
const productStore = new ProductStore();
const product: Product = { id: 2, name: 'Keyboard', price: 1000 };
const cartStore = new CartStore();
const orderProduct: Order_Product = {
  id: 1,
  order_id: 2,
  product_id: 2,
  quantity: 1
};

describe('ORDER_PRODUCT MODEL TEST', () => {
  it('Should create a new product', async () => {
    expect(await productStore.createProduct(product)).toEqual(product);
  });

  it('Should create a new order', async () => {
    expect(await orderStore.createOrder(order)).toEqual(order);
  });

  it('Should add product in order', async () => {
    expect(await cartStore.addProductInCart(orderProduct)).toEqual(
      orderProduct
    );
  });

  it('Should increment quantity', async () => {
    const updatedOrderProduct = await cartStore.changeProductQty(
      orderProduct,
      true
    );
    orderProduct.quantity++;
    expect(updatedOrderProduct.quantity).toEqual(orderProduct.quantity);
  });

  it('Should decrement quantity', async () => {
    const updatedOrderProduct = await cartStore.changeProductQty(
      orderProduct,
      false
    );
    orderProduct.quantity--;
    expect(updatedOrderProduct.quantity).toEqual(orderProduct.quantity);
  });
});
