import { take } from 'rxjs/operators';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Product } from './models/product';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  private getCart(cartId: string) {
    return this.db.object('/shoping-cart/' + cartId).valueChanges();
  }


  private async getOrCreateCartId() {
    const cartId = localStorage.getItem('cartId');
    if (cartId) { return cartId; }

    const result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  async addToCart(product: Product) {
    console.log(product);
    const cartId = await this.getOrCreateCartId();
    const item$ = this.db.object('shopping-cart/' + cartId + '/items/' + product.key$);

    item$.snapshotChanges().pipe(take(1)).subscribe((item: any) => {
      if (item.payload.val()) {
        item$.update({quantity: item.payload.val().quantity + 1});
      }
      else {
        const tempKey = product.key$;
        delete product.key$ ;
        item$.set( {product, quantity: 1 });
        product.key$ = tempKey;
      }
    });
  }
}
