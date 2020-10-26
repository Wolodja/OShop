import { Router } from '@angular/router';
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

  constructor(categoryService: CategoryService, private productService: ProductService, private router: Router) {
    this.categories$ = categoryService.getCategories().snapshotChanges();
   }

   save(product){
     this.productService.create(product);
     this.router.navigate(['/admin/products']);
   }

  ngOnInit(): void {
  }

}
