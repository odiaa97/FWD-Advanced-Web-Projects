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
const ProductStore_1 = require('../../stores/Product Store/ProductStore');
const productStore = new ProductStore_1.ProductStore();
const product = { name: 'Keyboard', price: 1000 };
const productToBeUpdated = { id: 1, name: 'Keyboard', price: 2000 };
describe('PRODUCT MODEL TEST', () => {
  it('Should create a new product', () =>
    __awaiter(void 0, void 0, void 0, function* () {
      expect(yield productStore.createProduct(product)).toEqual({
        id: 1,
        name: 'Keyboard',
        price: 1000
      });
    }));
  it('should get all products', () =>
    __awaiter(void 0, void 0, void 0, function* () {
      const products = yield productStore.getProducts();
      expect(products.length).toEqual(1);
    }));
  it('should update product', () =>
    __awaiter(void 0, void 0, void 0, function* () {
      const product = yield productStore.updateProduct(productToBeUpdated);
      expect(product).toEqual({ id: 1, name: 'Keyboard', price: 2000 });
    }));
  it('should delete products', () =>
    __awaiter(void 0, void 0, void 0, function* () {
      yield productStore.deleteProducts();
      expect((yield productStore.getProducts()).length).toEqual(0);
    }));
});
