import { map } from 'rxjs/operators';
import { Product } from './../../models/product';
import { ProductService } from './../../product.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnDestroy {

  products: Product[];
  filterdProducts: Product[];
  subscription: Subscription;

  constructor(private productService: ProductService) {
    this.subscription = this.productService.getAll()
      .snapshotChanges()
      .pipe(map(actions => actions.map(action => {
        const $key = action.payload.key;
        const data: Product = { $key, ...(action.payload.val() as object) } as Product;
        return data;
      }))).subscribe(pr => this.products = this.filterdProducts = pr);
  }

  filter(query: string) {
    this.filterdProducts = (query) ?
      this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
      this.products;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
