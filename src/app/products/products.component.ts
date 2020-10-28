import { CategoryService } from './../category.service';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  products$;
  categories$;

  constructor(productServie: ProductService, categoryService: CategoryService) {
    this.products$ = productServie.getAll().valueChanges();
    this.categories$ = categoryService.getAll().valueChanges();
   }

}
