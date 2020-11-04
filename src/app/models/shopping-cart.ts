import { Product } from './product';
import { ShoppingCartItem } from './shopping-cart-item';

export class ShoppingCart {

  items: ShoppingCartItem[] = [];
    constructor(public itemsMap: { [productId: string] : ShoppingCartItem}){
      for( let productId in itemsMap){
        let item = itemsMap[productId];
        this.items.push(new ShoppingCartItem(item.product, item.quantity));
      }
      console.log(itemsMap);
    }

    getQuantity(product: Product){
      console.log(this.itemsMap);
      const item = this.itemsMap[product.key$];
      console.log(item);
      return 0;//item ? item.quantity : 0;
    }

    get totalItemsCount() {
        let count = 0; 
        for (let productId in this.itemsMap) {
          count += this.itemsMap[productId].quantity;
        }
        return count;
    };

    get totalPrice(){
      let sum = 0;
      for(let productId in this.items){
        sum+= this.items[productId].quantity * this.items[productId].product.price;
      }
      return sum;
    }
}
