import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BackgroundContentModel } from '../models/backgoundcontent.model';
import { DataServiceService } from '../services/data-service.service';
import { LanguageService } from '../services/language.service';
import { ProductSwitcherService } from '../services/product-switcher.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  constructor(private productService: ProductSwitcherService, private translate: TranslateService, private languageService: LanguageService, private router: Router ){
      this.router.events.subscribe(event => console.log(event));
    }
  
    private dataService = inject(DataServiceService);
  
  
    colorAndCoversProducts: BackgroundContentModel[] = [];
  
    ngOnInit(): void {
      this.languageService.language$.subscribe(language => {
        this.colorAndCoversProducts = this.languageService.getColorsAndCoversTranslation(language);
      });
    }
}
