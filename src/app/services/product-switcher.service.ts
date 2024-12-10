import { Injectable } from '@angular/core';
import { BackgroundContentModel } from '../backgoundcontent.model';
import { ProductsToChoose } from '../DUMMY_DATA/dummy-choose-product'; 

@Injectable({
  providedIn: 'root'
})
export class ProductSwitcherService {
  products: BackgroundContentModel[] = ProductsToChoose;
  currentProduct: BackgroundContentModel = this.products[0];

  updateCurrentProduct(product: BackgroundContentModel): void {
    this.currentProduct = product;
  }
  

}
