import { take } from 'rxjs/operators';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Product } from './models/product';
import { number } from 'ngx-custom-validators/src/app/number/validator';
import { ShoppingCart } from './models/shopping-cart';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  async getCart(): Promise<AngularFireObject<ShoppingCart>> {
    const cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-cart/' + cartId);
  }

  create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object('shopping-cart/' + cartId + '/items/' + productId);
  }

  private async getOrCreateCartId(): Promise<string> {
    const cartId = localStorage.getItem('cartId');
    if (cartId) { return cartId; }

    const result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  async addToCart(product: Product) {
    this.changeProductQuantity(product, 1);
  }

  async removeFromCart(product: Product) {
    this.changeProductQuantity(product, -1);
  }

  private async changeProductQuantity(product: Product, number: Number) {
    const cartId = await this.getOrCreateCartId();
    const item$ = this.getItem(cartId, product.key$);

    item$.snapshotChanges().pipe(take(1)).subscribe((item: any) => {
      const tempKey = product.key$;
      delete product.key$;
      item$.update({ product, quantity: (item.payload.val() ? item.payload.val().quantity : 0) + number });
      product.key$ = tempKey;
    });
  }
}
