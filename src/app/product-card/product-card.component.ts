import { ShoppingCartService } from './../shopping-cart.service';
import { Component, Input, OnInit } from '@angular/core';
import { ShoppingCart } from '../models/shopping-cart';

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
  
  getQuantity(){
    if (!this.shoppingCart ) { return 0; }
    const item = this.shoppingCart.itemsMap[this.product.$key];
    return item ? item.quantity : 0;
  }

}
