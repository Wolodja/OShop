import { Product } from './product';

export class ShoppingCartItem {
    

    get totalPrice(){
        return this.product.price * this.quantity;
    }

    constructor(public product: Product, public quantity: number ){}
}