import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { ShoppingCart } from '../models/shopping-cart';
import { OrderService } from '../order.service';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy {
  shipping: any = {};
  cart: ShoppingCart;
  subscription: Subscription;

  constructor(private shoppingCartService: ShoppingCartService, private orderService: OrderService) { }


  async ngOnInit() {
    this.subscription = (await this.shoppingCartService.getCart())
      .valueChanges()
      .pipe(map(x => new ShoppingCart(x.items)))
      .subscribe(cart => this.cart = cart);
  }

  placeOrder() {
    const order = {
      datePlace: new Date().getTime(),
      shipping: this.shipping,
      items: this.cart.items.map(i => {
        return {
          product: {
            title: i.title,
            imageUrl: i.imageUrl,
            price: i.price
          },
          quantity: i.quantity,
          totalPrice: i.totalPrice
        }
      })
    };
    this.orderService.storeOrder(order);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
