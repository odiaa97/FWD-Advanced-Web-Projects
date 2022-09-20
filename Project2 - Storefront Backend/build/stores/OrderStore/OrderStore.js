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
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.OrderStore = void 0;
const db_config_1 = __importDefault(require('../../db_config'));
class OrderStore {
  getOrder(id) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const conn = yield db_config_1.default.connect();
        const sql = `SELECT * FROM orders WHERE id=$1;`;
        const result = yield conn.query(sql, [id]);
        const user = result.rows[0];
        conn.release();
        return user;
      } catch (error) {
        throw new Error(`Cannot fetch data from database: ${error}`);
      }
    });
  }
  getOrders(userId) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const conn = yield db_config_1.default.connect();
        const sql = `SELECT * FROM orders WHERE user_id=${userId};`;
        const result = yield conn.query(sql);
        conn.release();
        return result.rows;
      } catch (error) {
        throw new Error(`Cannot fetch data from database: ${error}`);
      }
    });
  }
  createOrder(order) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const sql =
          'INSERT INTO orders (status, user_id) VALUES($1, $2) RETURNING *';
        const conn = yield db_config_1.default.connect();
        const result = yield conn.query(sql, [order.status, order.user_id]);
        const orderAdded = result.rows[0];
        conn.release();
        return orderAdded;
      } catch (err) {
        throw new Error(`Cannot create order: ${err}`);
      }
    });
  }
  updateOrder(order) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const updateQuery = `UPDATE orders SET status='${order.status}' WHERE id=${order.id} RETURNING *`;
        const conn = yield db_config_1.default.connect();
        const result = yield conn.query(updateQuery);
        const orderUpdated =
          result.rows.length > 0
            ? result.rows[0]
            : new Error('rows.length < 0');
        conn.release();
        return orderUpdated;
      } catch (err) {
        throw new Error(`Error in updateUser: ${err}`);
      }
    });
  }
  deleteOrder(orderId) {
    return __awaiter(this, void 0, void 0, function* () {
      return this.checkIfExists(orderId)
        .then(() =>
          __awaiter(this, void 0, void 0, function* () {
            const conn = yield db_config_1.default.connect();
            const deleteQuery = `DELETE FROM orders WHERE id=${orderId}`;
            const result = yield conn.query(deleteQuery);
            if (result.rows.length) return true;
            return false;
          })
        )
        .catch((err) => {
          throw new Error(`Error in deleteOrder: ${err}`);
        });
    });
  }
  deleteOrders() {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const conn = yield db_config_1.default.connect();
        const deleteQuery = `DELETE FROM orders;`;
        const result = yield conn.query(deleteQuery);
        if (result.rows.length) return true;
        return false;
      } catch (error) {
        throw new Error(`Error in deleteOrders: ${error}`);
      }
    });
  }
  checkIfExists(id) {
    return __awaiter(this, void 0, void 0, function* () {
      return new Promise((resolve, reject) =>
        __awaiter(this, void 0, void 0, function* () {
          const connection = yield db_config_1.default.connect();
          const checkIfExistsSql = `SELECT * FROM orders WHERE id=$1`;
          const result = yield connection.query(checkIfExistsSql, [id]);
          if (result.rowCount > 0) resolve(true);
          reject(false);
        })
      );
    });
  }
}
exports.OrderStore = OrderStore;
