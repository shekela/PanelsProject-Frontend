import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { InfoBannerContent } from 'src/app/DUMMY_DATA/INFO-BANNER-COMPONENT/eng';
import { InfoBannerContentInterface } from 'src/app/models/infor-banner.model';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent {
  infoBannerContent!: InfoBannerContentInterface[];

  private languageSubscription: Subscription | null = null; // Initialize as null
  
    constructor(private languageService: LanguageService) {}
  
    ngOnInit(): void {
      this.languageSubscription = this.languageService.language$.subscribe((language) => {
        this.infoBannerContent = this.languageService.getInfoBannersTranslation(language);
      });
    }
  
    ngOnDestroy(): void {
      // Unsubscribe to prevent memory leaks
      if (this.languageSubscription) {
        this.languageSubscription.unsubscribe();
      }
    }
}
