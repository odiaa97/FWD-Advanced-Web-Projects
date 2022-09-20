"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserStore = void 0;
const db_config_1 = __importDefault(require("../../db_config"));
class UserStore {
    getMaxId() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield db_config_1.default.connect();
                const getIdSql = "SELECT * FROM users_test ORDER BY Id DESC LIMIT 1;";
                const result = yield conn.query(getIdSql);
                if (result.rowCount > 0) {
                    const maxId = result.rows[0].id;
                    conn.release();
                    return maxId;
                }
                else
                    return 0;
            }
            catch (err) {
                throw new Error(`Error in getMaxId: ${err}`);
            }
        });
    }
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield db_config_1.default.connect();
                const sql = 'SELECT * FROM users;';
                const result = yield conn.query(sql);
                conn.release();
                return result.rows;
            }
            catch (error) {
                throw new Error(`Cannot fetch data from database: ${error}`);
            }
        });
    }
    getUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield db_config_1.default.connect();
                const sql = `SELECT * FROM users WHERE id=$1;`;
                const result = yield conn.query(sql, [id]);
                const user = result.rows[0];
                conn.release();
                return user;
            }
            catch (error) {
                throw new Error(`Cannot fetch data from database: ${error}`);
            }
        });
    }
    fetchAllUsersPromise() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                try {
                    const conn = db_config_1.default.connect()
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
                    reject(`Cannot get data from users_test table: ${error}`);
                }
            });
        });
    }
    updateUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //const insertSql = `UPDATE users SET username='${user.username}', email='${user.email}' WHERE id=${user.id}`;
                const insertSql = `UPDATE users SET username='${user.username}', email='${user.email}' where id=${user.id} RETURNING *`;
                const conn = yield db_config_1.default.connect();
                const result = yield conn.query(insertSql);
                const userUpdated = result.rows[0];
                conn.release();
                return userUpdated;
            }
            catch (err) {
                throw new Error(`Error in updateUser: ${err}`);
            }
        });
    }
    createUser(u) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'INSERT INTO users (username, password, email) VALUES($1, $2, $3) RETURNING *';
                const conn = yield db_config_1.default.connect();
                const result = yield conn.query(sql, [u.username, u.password, u.email]);
                const user_added = result.rows[0];
                conn.release();
                return user_added;
            }
            catch (err) {
                throw new Error(`Could not add user ${u.username}.\nError: ${err}`);
            }
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield db_config_1.default.connect();
                const fetchUser = `SELECT * FROM users_test WHERE id = ${id};`;
                const user = yield conn.query(fetchUser);
                if (user.rowCount > 0) {
                    const sql = `DELETE FROM users WHERE id = ${id} RETURNING *;`;
                    const result = yield conn.query(sql);
                    const deleted = result.rows[0];
                    conn.release();
                    return deleted;
                }
                else {
                    throw new Error(`User with id ${id} doesn't exist.`);
                }
            }
            catch (error) {
                throw new Error(`Error deleting a user: ${error}`);
            }
        });
    }
    deleteAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield db_config_1.default.connect();
                const deleteAllSql = 'DELETE FROM users_test;';
                const result = yield conn.query(deleteAllSql);
                conn.release();
            }
            catch (error) {
                console.error(`Error deleting all users_test: ${error}`);
            }
        });
    }
    checkIfExists(username) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield db_config_1.default.connect();
                const checkIfExistsSql = `SELECT username FROM users WHERE username=$1`;
                const result = yield connection.query(checkIfExistsSql, [username]);
                if (result.rowCount > 0)
                    return true;
                return false;
            }
            catch (err) {
                throw new Error(`Error in userStore checkIfExists ${err}`);
            }
        });
    }
}
exports.UserStore = UserStore;
