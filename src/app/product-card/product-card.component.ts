import { ShoppingCartService } from './../shopping-cart.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {

  @Input() product;
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart;

  constructor(private cartService: ShoppingCartService) { }

  addToCart() {
    this.cartService.addToCart(this.product);
  }

  removeFromCart(){
    this.cartService.removeFromCart(this.product);
  }

  getQuantity(){
    if (!this.shoppingCart) { return 0; }
    const item = this.shoppingCart.payload.val().items[this.product.key$];
    return item ? item.quantity : 0;
  }

}
