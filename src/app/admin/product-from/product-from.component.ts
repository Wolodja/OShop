import { ProductService } from './../../product.service';
import { CategoryService } from './../../category.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-from',
  templateUrl: './product-from.component.html',
  styleUrls: ['./product-from.component.css']
})
export class ProductFromComponent implements OnInit {

  categories$;

  constructor(categoryService: CategoryService, private productService: ProductService) {
    this.categories$ = categoryService.getCategories().snapshotChanges();
   }

   save(product){
     this.productService.create(product);
   }

  ngOnInit(): void {
  }

}
