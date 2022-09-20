import { ProductStore } from '../../stores/Product Store/ProductStore'
import { Product } from '../../models/product'

const productStore = new ProductStore();
const product: Product = { name: 'Keyboard', price: 1000, };
const productToBeUpdated: Product = { id: 1, name: 'Keyboard', price: 2000, };

describe('PRODUCT MODEL TEST', () => {

    it('Should create a new product', async () => {
        expect(await productStore.createProduct(product)).toEqual({ id: 1, name: 'Keyboard', price: 1000 });
    });

    it('should get all products', async () => {
        const products = await productStore.getProducts();
        expect(products.length).toEqual(1);
    });

    it('should update product', async () => {
        const product = await productStore.updateProduct(productToBeUpdated);
        expect(product).toEqual({ id: 1, name: 'Keyboard', price: 2000 });
    });

    it('should delete products', async () => {
        await productStore.deleteProducts();
        expect((await productStore.getProducts()).length).toEqual(0);
    });

});