import { Component, Input } from '@angular/core';
import { BackgroundContentModel } from 'src/app/models/backgoundcontent.model';
import { ProductsToChoose } from 'src/app/DUMMY_DATA/dummy-choose-product';
import { ProductSwitcherService } from 'src/app/services/product-switcher.service';

@Component({
  selector: 'app-productswitch-template',
  templateUrl: './productswitch-template.component.html',
  styleUrls: ['./productswitch-template.component.css']
})

export class ProductswitchTemplateComponent {
  products: BackgroundContentModel[] = ProductsToChoose; // Products array
  currentProduct: BackgroundContentModel = this.products[0];

  selectProduct(product: BackgroundContentModel): void {
    this.currentProduct = product; // Update the current product
    console.log('Selected product:', this.currentProduct);
  }

}