import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BackgroundContentModel } from '../models/backgoundcontent.model';
import { LanguageService } from '../services/language.service';
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
    private languageService: LanguageService, 
    private router: Router, 
    private separationService: SeparationService){
      this.router.events.subscribe(event => event);
    }
  
  
    colorAndCoversProducts: BackgroundContentModel[] = [];
  
    ngOnInit(): void {
      this.subscription = this.languageService.language$.subscribe((language) => {
        this.colorAndCoversProducts =
          this.separationService.translations.colorsAndCovers[language] ||
          this.separationService.translations.colorsAndCovers['GEO'];
    
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
