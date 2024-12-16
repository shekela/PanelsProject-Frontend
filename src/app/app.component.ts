import { Component, inject } from '@angular/core';
import { ProductSwitcherService } from './services/product-switcher.service';
import { DataServiceService } from './services/data-service.service';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from './services/language.service';
import { BackgroundContentModel } from './models/backgoundcontent.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private productService: ProductSwitcherService, private translate: TranslateService, private languageService: LanguageService ){}

  private dataService = inject(DataServiceService);


  colorAndCoversProducts: BackgroundContentModel[] = [];

  ngOnInit(): void {
    this.languageService.language$.subscribe(language => {
      this.colorAndCoversProducts = this.languageService.getColorsAndCoversTranslation(language);
    });
  }

}
