import { Component, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import { BackgroundContentModel } from 'src/app/models/backgoundcontent.model';
import { ProductsToChoose } from 'src/app/DUMMY_DATA/dummy-choose-product';
import { ProductSwitcherService } from 'src/app/services/product-switcher.service';

@Component({
  selector: 'app-productswitch-template',
  templateUrl: './productswitch-template.component.html',
  styleUrls: ['./productswitch-template.component.css'],
  encapsulation: ViewEncapsulation.None,
})

export class ProductswitchTemplateComponent {
  products: BackgroundContentModel[] = ProductsToChoose; // Products array
  currentProduct: BackgroundContentModel = this.products[0];

  selectProduct(product: BackgroundContentModel): void {
    this.currentProduct = product; // Update the current product
    console.log('Selected product:', this.currentProduct);
  }

  constructor(private elRef: ElementRef) {}

  ngAfterViewInit() {
    const switcherContainer = this.elRef.nativeElement.querySelector('.switcher-container');
    const hasVerticalScrollbar = switcherContainer.scrollHeight > switcherContainer.clientHeight;
    console.log('Has vertical scrollbar:', hasVerticalScrollbar);

    if (hasVerticalScrollbar) {
      switcherContainer.style.paddingBottom = '10px'; // Adjust to avoid clipping
    }
  }

}