import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BackgroundContentModel } from '../models/backgoundcontent.model';
import { DataServiceService } from '../services/data-service.service';
import { LanguageService } from '../services/language.service';
import { ProductSwitcherService } from '../services/product-switcher.service';
import { SeparationService } from '../services/separation.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  private subscription: Subscription | null = null;
  
  constructor(
    private productService: ProductSwitcherService, 
    private translate: TranslateService, 
    private languageService: LanguageService, 
    private router: Router, 
    private separationService: SeparationService){
      this.router.events.subscribe(event => event);
    }
  
    private dataService = inject(DataServiceService);
  
  
    colorAndCoversProducts: BackgroundContentModel[] = [];
  
    ngOnInit(): void {
      this.subscription = this.languageService.language$.subscribe((language) => {
        this.colorAndCoversProducts =
          this.separationService.translations.colorsAndCovers[language] ||
          this.separationService.translations.colorsAndCovers['GEO'];
    
        // Ensure backgroundUrl is prefixed with 'https://localhost:7001'
        this.colorAndCoversProducts = this.colorAndCoversProducts.map(product => {
          if (product.backgroundUrl && !product.backgroundUrl.startsWith('https://localhost:7001')) {
            product.backgroundUrl = 'https://localhost:7001' + product.backgroundUrl;
          }
          return product;
        });
      });
    
      this.subscription.add(
        this.separationService.translations$.subscribe(() => {
          const currentLanguage = this.languageService.getCurrentLanguage();
          this.colorAndCoversProducts =
            this.separationService.translations.colorsAndCovers[currentLanguage] ||
            this.separationService.translations.colorsAndCovers['GEO'];
    
          // Ensure backgroundUrl is prefixed with 'https://localhost:7001'
          this.colorAndCoversProducts = this.colorAndCoversProducts.map(product => {
            if (product.backgroundUrl && !product.backgroundUrl.startsWith('https://localhost:7001')) {
              product.backgroundUrl = 'https://localhost:7001' + product.backgroundUrl;
            }
            return product;
          });
        })
      );
    }
}
