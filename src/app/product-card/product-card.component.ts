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

  constructor(private cartService: ShoppingCartService) { }

  addToCart(product) {
    this.cartService.addToCart(product);
  }

}
