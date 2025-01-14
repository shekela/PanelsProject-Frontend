import { Component, Input, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { BackgroundContentModel } from 'src/app/models/backgoundcontent.model';
import { MainProductsInterface } from 'src/app/models/mainproducts.model';
import { LanguageService } from 'src/app/services/language.service';
import { SeparationService } from 'src/app/services/separation.service';

@Component({
  selector: 'app-main-products',
  templateUrl: './main-products.component.html',
  styleUrls: ['./main-products.component.css']
})
export class MainProductsComponent {
  private languageSubscription: Subscription | undefined;
  private subscription: Subscription | null = null;

  @Input() showTitle: boolean = true;
  @Input() products!: MainProductsInterface;
  @Input() productsInput?: BackgroundContentModel[];

  constructor(private languageService: LanguageService, private separationService: SeparationService) {}

  ngOnInit(): void {
    if (!this.productsInput) {
        this.subscription = this.languageService.language$.subscribe((language) => {
            this.products =
              this.separationService.translations.mainProducts[language] ||
              this.separationService.translations.mainProducts['GEO'];

            if (this.products && this.products.products) {
                this.products.products.forEach(product => {
                    if (product.backgroundUrl && !product.backgroundUrl.startsWith('https://panelsprojectbackend-dvhuaffabfd2ejbs.southeastasia-01.azurewebsites.net/')) {
                        product.backgroundUrl = `https://panelsprojectbackend-dvhuaffabfd2ejbs.southeastasia-01.azurewebsites.net${product.backgroundUrl}`;
                        console.log(`Product URL: ${product.backgroundUrl}`);  // Log the URL for debugging
                    }
                });
            }
        });

        this.subscription.add(
            this.separationService.translations$.subscribe(() => {
                const currentLanguage = this.languageService.getCurrentLanguage();
                this.products =
                  this.separationService.translations.mainProducts[currentLanguage] ||
                  this.separationService.translations.mainProducts['GEO'];

                if (this.products && this.products.products) {
                    this.products.products.forEach(product => {
                        if (product.backgroundUrl && !product.backgroundUrl.startsWith('https://panelsprojectbackend-dvhuaffabfd2ejbs.southeastasia-01.azurewebsites.net/')) {
                            product.backgroundUrl = `https://panelsprojectbackend-dvhuaffabfd2ejbs.southeastasia-01.azurewebsites.net${product.backgroundUrl}`;
                            console.log(`Product URL: ${product.backgroundUrl}`);  // Log the URL for debugging
                        }
                    });
                }
            })
        );
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

