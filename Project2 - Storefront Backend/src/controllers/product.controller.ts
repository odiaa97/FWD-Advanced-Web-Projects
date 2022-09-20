import { Request, Response } from 'express';
import { Product } from '../models/product';
import { ProductStore } from '../stores/Product Store/ProductStore';
import { getUserRole } from '../services/JWT/getCurrentUser'
import { CartStore } from '../stores/CartStore/CartStore';
import { request } from 'http';


class ProductController {
    productStore = new ProductStore();
    cartStore = new CartStore();

    index = async (req: Request, res: Response) => {
        try {
            const products = await this.productStore.getProducts();
            res.status(200).json(products);
        }
        catch (err) {
            throw new Error(`${err}`);
        }
    }

    getProduct = async (req: Request, res: Response) => {
        try {
            let productId: number = parseInt(req.params.id);
            let product: Product = await this.productStore.getProduct(productId);
            if (product) return res.status(200).json(product);
            return res.status(404).json('Product not found');
        }
        catch (e) {
            throw new Error(`${e}`);
        }
    }

    createProduct = async (req: Request, res: Response) => {
        try {

            let newProduct: Product = { name: req.body.name, price: req.body.price };
            let productAdded = await this.productStore.createProduct(newProduct);
            return res.status(200).json(productAdded);
        }
        catch (error) {
            throw new Error(`${error}`);
        }
    }

    deleteProduct = async (req: Request, res: Response) => {
        try {
            let productId: number = parseInt(req.params.id);
            const productExists = await this.productStore.checkIfProductExists(productId);
            if (productExists) {
                getUserRole(req)
                    .then(async (role) => {
                        if (role == 'Admin') {
                            await this.cartStore.deleteProductInAllCarts(productId);
                            await this.productStore.deleteProduct(productId);
                            return res.status(200).json("Product successfully deleted");
                        }
                    })
                    .catch(e => {
                        return res.status(401).json(`Cannot delete product: ${e.message}`);
                    });
            }
            else {
                return res.status(404).json("Product not found");
            }

        }
        catch (e) {
            throw new Error(`Product not Found: ${e}`);
        }
    }

    updateProduct = async (req: Request, res: Response) => {
        try {
            let productToBeUpdated: Product = req.body;
            if (productToBeUpdated.id) {
                const product = await this.productStore.getProduct(productToBeUpdated.id);
                if (product) {
                    const result = await this.productStore.updateProduct(productToBeUpdated);
                    if (result) return res.status(200).json(result);
                }
            }
            return res.status(404).json('Product not found');
        }
        catch (e) {
            throw new Error(`${e}`);
        }
    }
}

export default ProductController;