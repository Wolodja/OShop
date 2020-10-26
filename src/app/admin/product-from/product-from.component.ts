import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from './../../product.service';
import { CategoryService } from './../../category.service';
import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { snapshotChanges } from 'angularfire2/database';

@Component({
  selector: 'app-product-from',
  templateUrl: './product-from.component.html',
  styleUrls: ['./product-from.component.css']
})
export class ProductFromComponent implements OnInit {

  categories$;
  product: any;

  constructor(private categoryService: CategoryService,
              private productService: ProductService,
              private router: Router,
              private route: ActivatedRoute) {
    this.product = {};
    this.categories$ = categoryService.getCategories().snapshotChanges();

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productService.getById(id).valueChanges().pipe(take(1)).subscribe(p => this.product = p);
    }
    console.log(this.product);
  }

  save(product) {
    this.productService.create(product);
    this.router.navigate(['/admin/products']);
  }

  ngOnInit(): void {
  }

}
