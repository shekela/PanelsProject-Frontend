import { Component, OnInit, OnDestroy } from '@angular/core';
import { LanguageService } from '../services/language.service';
import { SeparationService } from '../services/separation.service';
import { Subscription } from 'rxjs';
import { MarketingBannerData } from '../models/marketingdata.model';

@Component({
  selector: 'app-marketing-header',
  templateUrl: './marketing-header.component.html',
  styleUrls: ['./marketing-header.component.css'],
})
export class MarketingHeaderComponent implements OnInit, OnDestroy {
  marketingBannerData!: MarketingBannerData;

  
  private subscription: Subscription | null = null;

  constructor(
    private languageService: LanguageService,
    private separationService: SeparationService
  ) {}

  ngOnInit(): void {
    this.subscription = this.languageService.language$.subscribe((language) => {
      this.marketingBannerData =
        this.separationService.translations.marketingBanner[language] ||
        this.separationService.translations.marketingBanner['GEO'];
    });
  
    this.subscription.add(
      this.separationService.translations$.subscribe(() => {
        const currentLanguage = this.languageService.getCurrentLanguage();
        this.marketingBannerData =
          this.separationService.translations.marketingBanner[currentLanguage] ||
          this.separationService.translations.marketingBanner['GEO'];
      })
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
