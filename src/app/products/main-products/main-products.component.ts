import { Component, inject, Input, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
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
  private languageSubscription: Subscription | undefined;

  @Input() showTitle: boolean = true;
  @Input() products!: MainProductsInterface;
  @Input() productsInput?: BackgroundContentModel[];

  constructor(private languageService: LanguageService) {}

  ngOnInit(): void {
    // Subscribe to language changes if no productsInput is provided
    if (!this.productsInput) {
      this.languageSubscription = this.languageService.language$.subscribe(language => {
        this.products = this.languageService.getMainProductsTranslation(language);
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Update products when productsInput changes
    if (changes['productsInput'] && this.productsInput) {
      this.products = {
        title: '',
        titleText: '',
        products: this.productsInput
      };
    }
  }

  ngOnDestroy(): void {
    // Cleanup subscription
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }
  }
}

