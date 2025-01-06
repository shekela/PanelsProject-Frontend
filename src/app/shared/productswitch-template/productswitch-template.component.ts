import { Component, ElementRef, ViewEncapsulation } from '@angular/core';
import { BackgroundContentModel } from 'src/app/models/backgoundcontent.model';
import { LanguageService } from 'src/app/services/language.service';
import { SeparationService } from 'src/app/services/separation.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-productswitch-template',
  templateUrl: './productswitch-template.component.html',
  styleUrls: ['./productswitch-template.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ProductswitchTemplateComponent {
  private subscription: Subscription | null = null;
  
  products: BackgroundContentModel[] = []; // Initialize as an empty array
  currentProduct: BackgroundContentModel | null = null; // Initialize as null

  selectProduct(product: BackgroundContentModel): void {
    this.currentProduct = product; // Update the current product
  }

  constructor(
    private elRef: ElementRef,
    private languageService: LanguageService,
    private separationService: SeparationService
  ) {}

  ngOnInit(): void {
    this.subscription = this.languageService.language$.subscribe((language) => {
      this.loadProducts(language);
    });

    this.subscription.add(
      this.separationService.translations$.subscribe(() => {
        const currentLanguage = this.languageService.getCurrentLanguage();
        this.loadProducts(currentLanguage);
      })
    );
  }

  private loadProducts(language: string): void {
    this.products =
      this.separationService.translations.productsToChoose[language] ||
      this.separationService.translations.productsToChoose['GEO'];
  
    // Prepend 'localhost:7001' to the backgroundUrl of each product if not already included
    this.products = this.products.map(product => {
      if (!product.backgroundUrl.startsWith('https://localhost:7001')) {
        product.backgroundUrl = `https://localhost:7001${product.backgroundUrl}`;
      }
      return product;
    });
  
    // Set the first product as the current product
    if (this.products.length > 0) {
      this.currentProduct = this.products[0];
    } else {
      this.currentProduct = null; // Handle empty products
    }
  }
  

  ngAfterViewInit() {
    const switcherContainer = this.elRef.nativeElement.querySelector('.switcher-container');
    const hasVerticalScrollbar = switcherContainer.scrollHeight > switcherContainer.clientHeight;

    if (hasVerticalScrollbar) {
      switcherContainer.style.paddingBottom = '10px'; // Adjust to avoid clipping
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe(); // Cleanup subscriptions
  }
}
