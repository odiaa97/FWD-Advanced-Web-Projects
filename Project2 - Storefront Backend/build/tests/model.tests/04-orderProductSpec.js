'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, '__esModule', { value: true });
const CartStore_1 = require('../../stores/CartStore/CartStore');
const ProductStore_1 = require('../../stores/Product Store/ProductStore');
const OrderStore_1 = require('../../stores/OrderStore/OrderStore');
const orderStore = new OrderStore_1.OrderStore();
const order = { id: 2, status: 'New', user_id: 1 };
const productStore = new ProductStore_1.ProductStore();
const product = { id: 2, name: 'Keyboard', price: 1000 };
const cartStore = new CartStore_1.CartStore();
const orderProduct = { id: 1, order_id: 2, product_id: 2, quantity: 1 };
describe('ORDER_PRODUCT MODEL TEST', () => {
  it('Should create a new product', () =>
    __awaiter(void 0, void 0, void 0, function* () {
      expect(yield productStore.createProduct(product)).toEqual(product);
    }));
  it('Should create a new order', () =>
    __awaiter(void 0, void 0, void 0, function* () {
      expect(yield orderStore.createOrder(order)).toEqual(order);
    }));
  it('Should add product in order', () =>
    __awaiter(void 0, void 0, void 0, function* () {
      expect(yield cartStore.addProductInCart(orderProduct)).toEqual(
        orderProduct
      );
    }));
  it('Should increment quantity', () =>
    __awaiter(void 0, void 0, void 0, function* () {
      const updatedOrderProduct = yield cartStore.changeProductQty(
        orderProduct,
        true
      );
      orderProduct.quantity++;
      expect(updatedOrderProduct.quantity).toEqual(orderProduct.quantity);
    }));
  it('Should decrement quantity', () =>
    __awaiter(void 0, void 0, void 0, function* () {
      const updatedOrderProduct = yield cartStore.changeProductQty(
        orderProduct,
        false
      );
      orderProduct.quantity--;
      expect(updatedOrderProduct.quantity).toEqual(orderProduct.quantity);
    }));
});
