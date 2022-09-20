import client from '../../db_config';
import { User } from '../../models/user'

export class UserStore {
    async getMaxId(): Promise<number> {
        try {
            const conn = await client.connect();
            const getIdSql = "SELECT * FROM users_test ORDER BY Id DESC LIMIT 1;"
            const result = await conn.query(getIdSql);
            if (result.rowCount > 0) {
                const maxId = result.rows[0].id;
                conn.release();
                return maxId;
            }
            else return 0;

        }
        catch (err) {
            throw new Error(`Error in getMaxId: ${err}`);
        }
    }

    async getUsers(): Promise<User[]> {
        try {
            const conn = await client.connect();
            const sql = 'SELECT * FROM users;';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (error) {
            throw new Error(`Cannot fetch data from database: ${error}`);
        }
    }

    async getUser(id: number): Promise<User> {
        try {
            const conn = await client.connect();
            const sql = `SELECT * FROM users WHERE id=$1;`;
            const result = await conn.query(sql, [id]);
            const user = result.rows[0];
            conn.release();
            return user;
        }
        catch (error) {
            throw new Error(`Cannot fetch data from database: ${error}`);
        }
    }

    async fetchAllUsersPromise(): Promise<User[]> { // Ftech all users from database
        return new Promise<User[]>((resolve, reject) => {
            try {
                const conn = client.connect()
                    .then((res) => {
                        const sql = 'SELECT * FROM users_test;';
                        const result = res.query(sql)
                            .then((res2) => {
                                resolve(res2.rows);
                            });
                        res.release();
                    });
            }
            catch (error) {
                reject(`Cannot get data from users_test table: ${error}`)
            }
        })
    }

    async updateUser(user: User): Promise<User> { //Update user
        try {

            //const insertSql = `UPDATE users SET username='${user.username}', email='${user.email}' WHERE id=${user.id}`;
            const insertSql = `UPDATE users SET username='${user.username}', email='${user.email}' where id=${user.id} RETURNING *`;
            const conn = await client.connect();
            const result = await conn.query(insertSql);
            const userUpdated = result.rows[0];
            conn.release();
            return userUpdated;
        }
        catch (err) {
            throw new Error(`Error in updateUser: ${err}`);
        }
    }

    async createUser(u: User): Promise<User> {
        try {
            const sql = 'INSERT INTO users (username, password, email) VALUES($1, $2, $3) RETURNING *'
            const conn = await client.connect()
            const result = await conn.query(sql, [u.username, u.password, u.email])
            const user_added = result.rows[0];
            conn.release()
            return user_added;
        }
        catch (err) {
            throw new Error(`Could not add user ${u.username}.\nError: ${err}`)
        }
    }


    async deleteUser(id: number): Promise<User> { // Delete user
        try {
            const conn = await client.connect();
            const fetchUser = `SELECT * FROM users_test WHERE id = ${id};`;
            const user = await conn.query(fetchUser);
            if (user.rowCount > 0) {
                const sql = `DELETE FROM users WHERE id = ${id} RETURNING *;`;
                const result = await conn.query(sql);
                const deleted = result.rows[0];
                conn.release();
                return deleted;
            }
            else {
                throw new Error(`User with id ${id} doesn't exist.`)
            }
        }
        catch (error) {
            throw new Error(`Error deleting a user: ${error}`);
        }
    }

    async deleteAllUsers(): Promise<void> { // Delete all users
        try {
            const conn = await client.connect();
            const deleteAllSql = 'DELETE FROM users_test;';
            const result = await conn.query(deleteAllSql);
            conn.release();
        }
        catch (error) {
            console.error(`Error deleting all users_test: ${error}`)
        }
    }

    async checkIfExists(username: string): Promise<boolean> {
        try {
            const connection = await client.connect();
            const checkIfExistsSql = `SELECT username FROM users WHERE username=$1`;
            const result = await connection.query(checkIfExistsSql, [username]);
            if (result.rowCount > 0) return true
            return false;
        }
        catch (err) {
            throw new Error(`Error in userStore checkIfExists ${err}`);
        }
    }
}