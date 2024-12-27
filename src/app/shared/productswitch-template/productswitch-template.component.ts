import { Component, ElementRef, ViewEncapsulation } from '@angular/core';
import { BackgroundContentModel } from 'src/app/models/backgoundcontent.model';
import { ProductsToChoose } from 'src/app/DUMMY_DATA/PRODUCTSTOCHOOSE-DATA/eng';
import { LanguageService } from 'src/app/services/language.service';

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
  }

  constructor(private elRef: ElementRef, private languageService: LanguageService) {}
     
  ngOnInit(): void {
    this.languageService.language$.subscribe(language => {
      this.products = this.languageService.getProductsToChooseTranslation(language);
    });
  }

  ngAfterViewInit() {
    const switcherContainer = this.elRef.nativeElement.querySelector('.switcher-container');
    const hasVerticalScrollbar = switcherContainer.scrollHeight > switcherContainer.clientHeight;

    if (hasVerticalScrollbar) {
      switcherContainer.style.paddingBottom = '10px'; // Adjust to avoid clipping
    }
  }

}