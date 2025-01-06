import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { BackgroundContentModel } from 'src/app/models/backgoundcontent.model';
import { LanguageService } from 'src/app/services/language.service';
import { SeparationService } from 'src/app/services/separation.service';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})

export class InformationComponent {
  infoBannerContent!: BackgroundContentModel[];
  private subscription: Subscription | null = null;

  private languageSubscription: Subscription | null = null; // Initialize as null
  
    constructor(private languageService: LanguageService, private separationService: SeparationService) {}
  
    ngOnInit(): void {
      this.subscription = this.languageService.language$.subscribe((language) => {
        this.infoBannerContent =
          this.separationService.translations.infoBanners[language] ||
          this.separationService.translations.infoBanners['GEO'];
      });
    
      this.subscription.add(
        this.separationService.translations$.subscribe(() => {
          const currentLanguage = this.languageService.getCurrentLanguage();
          this.infoBannerContent =
            this.separationService.translations.infoBanners[currentLanguage] ||
            this.separationService.translations.infoBanners['GEO'];
        })
      );
    }
  
    ngOnDestroy(): void {
      // Unsubscribe to prevent memory leaks
      if (this.languageSubscription) {
        this.languageSubscription.unsubscribe();
      }
    }
}
