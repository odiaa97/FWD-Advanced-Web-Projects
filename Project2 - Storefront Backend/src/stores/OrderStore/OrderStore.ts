import client from '../../db_config';
import { Order } from '../../models/order'


export class OrderStore {

    async getOrder(id: number): Promise<Order> {
        try {
            const conn = await client.connect();
            const sql = `SELECT * FROM orders WHERE id=$1;`;
            const result = await conn.query(sql, [id]);
            const user = result.rows[0];
            conn.release();
            return user;
        }
        catch (error) {
            throw new Error(`Cannot fetch data from database: ${error}`);
        }
    }


    async getOrders(userId: number): Promise<Order[]> {
        try {
            const conn = await client.connect();
            const sql = `SELECT * FROM orders WHERE user_id=${userId};`;
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (error) {
            throw new Error(`Cannot fetch data from database: ${error}`);
        }
    }


    async createOrder(order: Order): Promise<Order> {
        try {
            const sql = 'INSERT INTO orders (status, user_id) VALUES($1, $2) RETURNING *'
            const conn = await client.connect()
            const result = await conn.query(sql, [order.status, order.user_id]);
            const orderAdded = result.rows[0];
            conn.release()
            return orderAdded;
        }
        catch (err) {
            throw new Error(`Cannot create order: ${err}`)
        }
    }


    async updateOrder(order: Order): Promise<Order> {
        try {
            const updateQuery = `UPDATE orders SET status='${order.status}' WHERE id=${order.id} RETURNING *`;
            const conn = await client.connect();
            const result = await conn.query(updateQuery);
            const orderUpdated = result.rows.length > 0 ? result.rows[0] : new Error('rows.length < 0');
            conn.release();
            return orderUpdated;
        }
        catch (err) {
            throw new Error(`Error in updateUser: ${err}`);
        }
    }


    async deleteOrder(orderId: number): Promise<Boolean> {

        return this.checkIfExists(orderId)
            .then(async () => {
                const conn = await client.connect();
                const deleteQuery = `DELETE FROM orders WHERE id=${orderId}`;
                const result = await conn.query(deleteQuery);
                if (result.rows.length) return true;
                return false;
            })
            .catch(err => {
                throw new Error(`Error in deleteOrder: ${err}`);
            });
    }

    async deleteOrders(): Promise<Boolean> {
        try {
            const conn = await client.connect();
            const deleteQuery = `DELETE FROM orders;`;
            const result = await conn.query(deleteQuery);
            if (result.rows.length) return true;
            return false;
        }
        catch (error) {
            throw new Error(`Error in deleteOrders: ${error}`);
        }
    }

    async checkIfExists(id: number): Promise<Boolean> {
        return new Promise<Boolean>(async (resolve, reject) => {
            const connection = await client.connect();
            const checkIfExistsSql = `SELECT * FROM orders WHERE id=$1`;
            const result = await connection.query(checkIfExistsSql, [id]);
            if (result.rowCount > 0) resolve(true);
            reject(false)
        })
    }
}