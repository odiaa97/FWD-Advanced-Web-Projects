import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { UserStore } from '../stores/UserStore/UserStore'

const userStore = new UserStore();

export const verifyAuthentication = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorizationHeader = req.headers.authorization as string

        if (!authorizationHeader) res.status(401).send("You must provide token")

        else {
            const token = authorizationHeader.split(' ')[1] as string; // Bearer ey.....
            const decoded = jwt.verify(token, process.env.TOKEN_SECRET as string) //invalid malformed
            next()
        }
    }
    catch (error) {
        res.status(401).send("Something went wrong in validating token" + error);
    }
}

export const verifyAuthorization = (role: string) => {
    return async function (req: Request, res: Response, next: NextFunction) {
        try {
            const authorizationHeader = req.headers.authorization as string
            if (!authorizationHeader) res.status(401).send("You must provide token")

            else {
                const token = authorizationHeader.split(' ')[1] as string;
                jwt.verify(token, process.env.TOKEN_SECRET as string, (err, result) => {

                    if (err) return res.status(401).send(err.message);
                    else {
                        let tokenObj = JSON.parse(JSON.stringify(result));
                        userStore.getUser(req.body.id)
                            .then(userResult => {
                                if (userResult.username === tokenObj.username || role === tokenObj.role) {
                                    next();
                                }
                                else {
                                    res.status(403).send("Authorization error");
                                }
                            })
                            .catch(err => {
                                res.status(403).send(err.message);
                                throw new Error(err.message);
                            });
                    }
                })
            }

        } catch (error) {
            res.status(401).send("Something went wrong in validating token" + error);
        }
    }
}