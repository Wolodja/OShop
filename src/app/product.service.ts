import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(porduct){
    this.db.list('products').push(porduct);
  }

  getAll(){
    return this.db.list('/products');
  }
}
