import bcrypt, { compare } from 'bcrypt';
import client from '../../db_config';
import { User } from '../../models/user';
import jwt from 'jsonwebtoken'

const pepper = process.env.BCRYPT_PASSWORD as string;
const saltRounds = process.env.SALT_ROUNDS as string;
const tokenSecret = process.env.TOKEN_SECRET as string;

export class Auth {
  async register(user: User): Promise<User> {
    try {
      const conn = await client.connect();
      const sql = "INSERT INTO users (username, password, email, role) VALUES ($1, $2, $3, $4) RETURNING *;"
      const hash = bcrypt.hashSync(`${user.password}${pepper}`, Number(saltRounds));
      const result = await conn.query(sql, [user.username, hash, user.email, user.role]);
      const returnUser = { id: result.rows[0].id, username: result.rows[0].username, email: result.rows[0].email, role: result.rows[0].role }
      conn.release();
      return returnUser;
    }
    catch (err) {
      throw new Error(`unable create user (${user.username}): ${err}`)
    }
  }

  async login(username: string, password: string): Promise<string> {
    try {
      const getUserQuery = `SELECT * FROM users WHERE username='${username}';`;
      const conn = await client.connect();
      const result = await conn.query(getUserQuery);
      if (result.rows.length) {
        const user = result.rows[0];
        if (bcrypt.compareSync(`${password}${pepper}`, user.password)) {
          const token = jwt.sign({ user: result.rows[0] }, tokenSecret);
          return token;
        }
        else {
          return "Invalid username or password"
        }
      }
      conn.release();
      return "User not found";
    }
    catch (error) {
      throw new Error(`invalid password: ${error}`);
    }
  }

  async checkIfUserExists(username: string): Promise<boolean> {
    const checkIfUserExitsSql = `SELECT * FROM users WHERE username = '${username}'`
    const conn = await client.connect();
    const userExist = await conn.query(checkIfUserExitsSql);
    if (userExist.rowCount > 0) return false;
    else return true;
  }
}