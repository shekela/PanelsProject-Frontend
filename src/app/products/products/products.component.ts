import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { SaleItems } from 'src/app/DUMMY_DATA/SALE-ITEMS/geo';
import { SaleItemInterface } from 'src/app/models/sale-item.model';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  productWidth = '395px'; // or dynamically calculated
  productHeight = '395px';

  pageData = SaleItems;

  private languageSubscription: Subscription | null = null; // Initialize as null
  
    constructor(private languageService: LanguageService) {}
  
    ngOnInit(): void {
      this.languageSubscription = this.languageService.language$.subscribe((language) => {
        this.pageData = this.languageService.getSaleItemsTranslation(language);
      });
    }
  
    ngOnDestroy(): void {
      // Unsubscribe to prevent memory leaks
      if (this.languageSubscription) {
        this.languageSubscription.unsubscribe();
      }
    }
}
