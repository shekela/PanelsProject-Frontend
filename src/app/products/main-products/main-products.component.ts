import { Component, inject, Input } from '@angular/core';
import { BackgroundContentModel } from 'src/app/models/backgoundcontent.model';
import { MainProductsInterface } from 'src/app/models/mainproducts.model';
import { DataServiceService } from 'src/app/services/data-service.service';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-main-products',
  templateUrl: './main-products.component.html',
  styleUrls: ['./main-products.component.css']
})
export class MainProductsComponent {
  private dataService = inject(DataServiceService);

  @Input() showTitle: boolean = true;
  products!: MainProductsInterface;
  @Input() productsInput?: BackgroundContentModel[];

  constructor(private languageService: LanguageService) {}

  ngOnInit(): void {
    this.languageService.language$.subscribe(language => {
      this.products = this.languageService.getMainProductsTranslation(language);
    });
  }

}
