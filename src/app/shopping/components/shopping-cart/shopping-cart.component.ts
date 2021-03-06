import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  cart$;

  constructor(private shoppingCartService: ShoppingCartService) { }

  async ngOnInit() {
    this.cart$ = (await this.shoppingCartService.getCart())
      .valueChanges()
      .pipe(map(x => new ShoppingCart(x.items) ));
  }

    clearCart() {
      this.shoppingCartService.clearCart();
    }

}
