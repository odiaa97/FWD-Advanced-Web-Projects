import { Product } from "../../models/product";
import { Order_Product } from "../../models/order_product";
import { Order } from "../../models/order";
import client from "../../db_config";
import { OrderStore } from "../OrderStore/OrderStore";

export class CartStore {
    orderStore = new OrderStore();

    getOrderProduct = async (orderProductId: number): Promise<Order_Product> => {
        try {
            // Validations are in controller
            const sql = `SELECT * FROM order_products WHERE id = ${orderProductId};`
            const conn = await client.connect();
            const result = await conn.query(sql);
            const product = result.rows[0];
            conn.release()
            return product;
        }
        catch (err) {
            throw new Error(`Cannot create order: ${err}`)
        }
    };

    getOrderProducts = async () => {
        try {
            // Validations are in controller
            const sql = `SELECT * FROM order_products;`
            const conn = await client.connect();
            const result = await conn.query(sql);
            const product = result.rows;
            conn.release()
            return product;
        }
        catch (err) {
            throw new Error(`Cannot create order: ${err}`)
        }
    };

    getCartProductsInOrder = async (userId: number, order: Order): Promise<Product[]> => {
        try {
            const sql = `SELECT products.id, products.name, products.price FROM order_products
                        JOIN products on products.id = order_products.product_id
                        JOIN orders on orders.id = order_products.order_id
                        WHERE order_products.order_id = orders.id
                        AND orders.user_id = ${userId}`;

            const conn = await client.connect()
            const result = await conn.query(sql);
            const products = result.rows;
            conn.release()
            return products;
        }
        catch (err) {
            throw new Error(`Cannot create order: ${err}`)
        }
    }

    addProductInCart = async (order_product: Order_Product): Promise<Order_Product> => {
        try {
            // Validations are in controller
            const sql = 'INSERT INTO order_products (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING *'
            const conn = await client.connect()
            const result = await conn.query(sql, [order_product.order_id, order_product.product_id, order_product.quantity]);
            const orderAdded = result.rows[0];
            conn.release()
            return orderAdded;
        }
        catch (err) {
            throw new Error(`Cannot create order: ${err}`)
        }
    };

    deleteOrderProduct = async (order_product: Order_Product): Promise<boolean> => {
        try {
            // Validations are in controller
            const sql = `DELETE FROM order_products WHERE id = ${order_product.id}`
            const conn = await client.connect()
            const result = await conn.query(sql);
            const productRemoved = result.rows[0];
            conn.release()
            if (productRemoved.length) return true;
            return false;
        }
        catch (err) {
            throw new Error(`Cannot create order: ${err}`)
        }
    };

    changeProductQty = async (orderProduct: Order_Product, sign: boolean) => {
        try {
            // get old product
            const oldOrderProduct = await this.getOrderProduct(orderProduct.id || 0);

            // Calculate new product quantity based on [sign] parameter if true: increment, false: decrement
            const newQuantity = sign ? (orderProduct.quantity + 1) : (orderProduct.quantity - 1);

            // Update product quantity
            const sql = `UPDATE order_products SET quantity = ${newQuantity} WHERE id = ${oldOrderProduct.id} RETURNING *;`
            const conn = await client.connect();
            const result = await conn.query(sql);

            // Return
            const updatedProduct = result.rows[0];
            conn.release()
            return updatedProduct;
        }
        catch (err) {
            throw new Error(`Cannot create order: ${err}`)
        }
    };

    deleteProductInAllCarts = async (productId: number): Promise<Product[]> => {
        try {
            // Validations are in controller
            const sql = `DELETE FROM order_products WHERE product_id = ${productId}`; // Delete all rows that have [productId]
            const conn = await client.connect()
            const result = await conn.query(sql);
            const productsRemoved = result.rows;
            conn.release()
            return productsRemoved;
        }
        catch (err) {
            throw new Error(`Cannot create order: ${err}`)
        }
    }
}