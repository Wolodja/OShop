import { ActivatedRoute } from '@angular/router';
import { ProductService } from './../product.service';
import { Component } from '@angular/core';
import { Product } from '../models/product';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  products: any[] = [];
  filteredProducts: Product[];

  category: string;

  constructor(productServie: ProductService, route: ActivatedRoute) {
    productServie.getAll()
    .snapshotChanges()
    .pipe(map(actions => actions.map(action => {
      const key$ = action.payload.key;
      const data: Product = { key$, ...(action.payload.val() as object) } as Product;
      return data;
    })))
    .subscribe(products => {
      this.products = products;

      route.queryParamMap.subscribe(params => {
        this.category = params.get('category');

        this.filteredProducts = (this.category) ?
          this.products.filter(p => p.category === this.category) :
          this.products;
      });
    });

  }

}
