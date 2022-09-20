import { CartStore } from "../stores/CartStore/CartStore";
import { Request, Response } from 'express';
import { getCurrentUser } from '../services/JWT/getCurrentUser'
import { OrderStore } from '../stores/OrderStore/OrderStore'

class CartController {

    cartStore = new CartStore();
    orderStore = new OrderStore();

    index = async (req: Request, res: Response) => {
        try {
            getCurrentUser(req, res).then(async (user) => {
                const order = req.body;
                if ((user.id && user.id == order.user_id) || user.role == 'Admin') {
                    const orderProducts = await this.cartStore.getOrderProducts();
                    return res.status(200).json(orderProducts);
                }
                else return res.status(403).json("Forbidden");
            }).catch(e => {
                throw new Error(`${e}`);
            });

        }
        catch (err) {
            throw new Error(`${err}`);
        }
    }

    getMyCartProducts = async (req: Request, res: Response) => {
        try {
            getCurrentUser(req, res).then(async (user) => {
                const order = await this.orderStore.getOrder(parseInt(req.params.id));
                console.log(order)
                if (user.id && user.id == order.user_id) {
                    console.log(user.id)
                    const products = await this.cartStore.getCartProductsInOrder(user.id, order);
                    return res.status(200).json(products);
                }
                else return res.status(403).json("Forbidden");
            }).catch(e => {
                throw new Error(`${e}`);
            });

        }
        catch (err) {
            throw new Error(`${err}`);
        }
    }

    changeQty = async (req: Request, res: Response) => {
        try {
            const url: string = req.originalUrl;
            const sign: boolean = url.includes('increment') ? true : false;
            const orderProduct = req.body;
            const orderUpdated = await this.cartStore.changeProductQty(orderProduct, sign);
            return res.status(200).json(orderUpdated);
        }
        catch (e) {
            throw new Error(`${e}`);
        }
    }

    getOrderProduct = async (req: Request, res: Response) => {
        try {
            getCurrentUser(req, res).then(async (user) => {
                const orderProduct = await this.cartStore.getOrderProduct(req.body.id);
                console.log(orderProduct);
                const order = await this.orderStore.getOrder(orderProduct.order_id);
                console.log(order);
                if ((user.id == order.user_id) || user.role == 'Admin') {
                    const orderProductId = req.body.id;
                    const orderProduct = await this.cartStore.getOrderProduct(orderProductId);
                    return res.status(200).json(orderProduct);
                }
                else return res.status(403).json("Forbidden");
            })
                .catch((e) => {
                    throw new Error(`${e}`)
                })

        }

        catch (e) {
            throw new Error(`${e}`);
        }

    }

    addProductInCart = async (req: Request, res: Response) => {
        try {
            const orderProduct = req.body;
            const newOrderProduct = await this.cartStore.addProductInCart(orderProduct);
            return res.status(200).json(newOrderProduct);
        }

        catch (e) {
            throw new Error(`${e}`);
        }

    }

    deleteOrderProduct = async (req: Request, res: Response) => {
        try {
            const orderProduct = await this.cartStore.getOrderProduct(req.body.id);
            const orderProductDeleted = await this.cartStore.deleteOrderProduct(orderProduct);
            if (orderProductDeleted) return res.status(200).json(orderProductDeleted);
            else return res.status(400).json("Something went wrong in deleteOrderProduct");
        }
        catch (e) {
            throw new Error(`${e}`);
        }
    }

    deleteProductInAllCarts = async (req: Request, res: Response) => {
        const productId = req.body.productId;
        const allRowsDeleted = await this.cartStore.deleteProductInAllCarts(productId);
        if (allRowsDeleted) return res.status(204).json();
        else return res.status(400).json("Something went wrong in deleteProductInAllCarts");
    }

}

export default CartController;