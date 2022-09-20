import client from '../../db_config';
import { Product } from '../../models/product';
import { CartStore } from '../CartStore/CartStore';

export class ProductStore {
  cartStore = new CartStore();

  async getProduct(id: number): Promise<Product> {
    try {
      const conn = await client.connect();
      const sql = `SELECT * FROM products WHERE id=$1;`;
      const result = await conn.query(sql, [id]);
      const user = result.rows[0];
      conn.release();
      return user;
    } catch (error) {
      throw new Error(`Cannot fetch data from database: ${error}`);
    }
  }

  async getProducts(): Promise<Product[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM products ORDER BY id ASC;';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Cannot fetch data from database: ${error}`);
    }
  }

  async createProduct(product: Product): Promise<Product> {
    try {
      const sql =
        'INSERT INTO products (name, price) VALUES($1, $2) RETURNING *';
      const conn = await client.connect();
      const result = await conn.query(sql, [product.name, product.price]);
      const productAdded = result.rows[0];
      conn.release();
      return productAdded;
    } catch (err) {
      throw new Error(`Cannot create product: ${err}`);
    }
  }

  async updateProduct(product: Product): Promise<Product> {
    try {
      const updateQuery = `UPDATE products SET name='${product.name}', price='${product.price}' WHERE id=${product.id} RETURNING *`;
      const conn = await client.connect();
      const result = await conn.query(updateQuery);
      const productUpdated =
        result.rows.length > 0 ? result.rows[0] : new Error('rows.length < 0');
      conn.release();
      return productUpdated;
    } catch (err) {
      throw new Error(`Error in updateUser: ${err}`);
    }
  }

  async deleteProduct(productId: number): Promise<Product> {
    try {
      const conn = await client.connect();
      const deleteQuery = `DELETE FROM products WHERE id=${productId}`;
      const result = await conn.query(deleteQuery);
      return result.rows[0];
    } catch (e) {
      throw new Error(`${e}`);
    }
  }

  async deleteProducts(): Promise<Product> {
    try {
      const conn = await client.connect();
      const deleteQuery = `DELETE FROM products;`;
      const result = await conn.query(deleteQuery);
      return result.rows[0];
    } catch (e) {
      throw new Error(`${e}`);
    }
  }

  async checkIfProductExists(id: number): Promise<boolean> {
    const connection = await client.connect();
    const checkIfExistsSql = `SELECT * FROM products WHERE id=$1`;
    const result = await connection.query(checkIfExistsSql, [id]);
    if (result.rowCount > 0) return true;
    else return false;
  }
}
