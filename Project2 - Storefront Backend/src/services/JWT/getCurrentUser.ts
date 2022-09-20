import { Request, Response } from 'express';
import { User } from '../../models/user'
import jwt from 'jsonwebtoken';
import { UserStore } from '../../stores/UserStore/UserStore'

const userStore = new UserStore();

export async function getCurrentUser(req: Request, res: Response): Promise<User> {

    return new Promise<User>((resolve, reject) => {
        const authorizationHeader = req.headers.authorization as string
        if (!authorizationHeader) res.status(401).send("You must provide token")

        else {
            const token = authorizationHeader.split(' ')[1] as string;
            jwt.verify(token, process.env.TOKEN_SECRET as string, async (err, result) => {

                if (err) reject(res.status(400).send(`Invalid token: ${err.message}`));
                else {
                    let tokenObj = JSON.parse(JSON.stringify(result));
                    const user = await userStore.getUser(tokenObj.user.id);
                    console.log(user);
                    resolve(user);
                }

            })
        }
    })

}

export async function getUserRole(req: Request): Promise<string> {

    return new Promise<string>((resolve, reject) => {
        const authorizationHeader = req.headers.authorization as string
        if (!authorizationHeader) reject("You must provide token")

        else {
            const token = authorizationHeader.split(' ')[1] as string;
            jwt.verify(token, process.env.TOKEN_SECRET as string, async (err, result) => {

                if (err) reject(`Invalid token: ${err.message}`);
                else {
                    let tokenObj = JSON.parse(JSON.stringify(result));
                    const user = await userStore.getUser(tokenObj.user.id);
                    if (user) resolve(user.role || "No role found");
                    else reject("User must be logged in");
                }

            })
        }
    })

}
