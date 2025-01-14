import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductsPageInterface } from 'src/app/models/products-page.model';
import { LanguageService } from 'src/app/services/language.service';
import { RequestsService } from 'src/app/services/requests.service';
import { SeparationService } from 'src/app/services/separation.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  productWidth = '395px'; // or dynamically calculated
  productHeight = '395px';

  pageData!: ProductsPageInterface;

  private languageSubscription: Subscription | null = null; // Initialize as null
  private subscription: Subscription | null = null;
  
  constructor(private languageService: LanguageService, private separationService: SeparationService) {}
  
  ngOnInit(): void {
    this.languageSubscription = this.languageService.language$.subscribe((language) => {
      this.pageData = this.languageService.getSaleItemsTranslation(language);
      this.updatePictureUrls(); // Update picture URLs with the prefix
    });
  
    this.subscription = this.languageService.language$.subscribe((language) => {
      this.pageData = this.separationService.translations.saleItems[language] ||
        this.separationService.translations.saleItems['GEO'];
      this.updatePictureUrls(); // Update picture URLs with the prefix
    });
  
    this.subscription.add(
      this.separationService.translations$.subscribe(() => {
        const currentLanguage = this.languageService.getCurrentLanguage();
        this.pageData = this.separationService.translations.saleItems[currentLanguage] ||
          this.separationService.translations.saleItems['GEO'];
        this.updatePictureUrls(); // Update picture URLs with the prefix
      })
    );
  }
  
  private updatePictureUrls(): void {
    if (this.pageData && this.pageData.saleItems) {
      this.pageData.saleItems.forEach((item) => {
        if (item.picture) {
          if (!item.picture.startsWith('https://panelsprojectbackend-dvhuaffabfd2ejbs.southeastasia-01.azurewebsites.net')) {
            item.picture = `https://panelsprojectbackend-dvhuaffabfd2ejbs.southeastasia-01.azurewebsites.net${item.picture}`;
          }
        }
      });
    }
  }
  
  ngOnDestroy(): void {
    // Unsubscribe to prevent memory leaks
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }
  }
}
