import { CategoryService } from './../../category.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-from',
  templateUrl: './product-from.component.html',
  styleUrls: ['./product-from.component.css']
})
export class ProductFromComponent implements OnInit {

  categories$;

  constructor(categoryService: CategoryService) {
    this.categories$ = categoryService.getCategories().valueChanges();
    console.log(this.categories$);
   }

  ngOnInit(): void {
  }

}
