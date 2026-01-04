import { makeAutoObservable } from "mobx";
import {ICartProduct} from "../../../entities/Products/model/types/product";

class Cart {
    constructor() {
        makeAutoObservable(this);
    }
    cartProductsCount: number = 0;
    cartProducts: ICartProduct[] = [];

    addProductToCart = (newProduct: ICartProduct) => {
        this.cartProducts.push(newProduct);
        this.cartProductsCount += 1;
    };
    removeProductFromCart = (id: string) => {
        this.cartProducts = this.cartProducts.filter((i) => i.id !== id);
        this.cartProductsCount -= 1;
    };

    removeLastProductFromCart = () => {
        this.cartProducts.pop()
        this.cartProductsCount -= 1;
    };
}

const cartStore = new Cart();

export default cartStore;
