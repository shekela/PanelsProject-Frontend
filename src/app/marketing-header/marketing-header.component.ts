import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { LanguageService } from '../services/language.service';
import { Subscription } from 'rxjs';
import { MarketingBannerData } from '../models/marketingdata.model';

@Component({
  selector: 'app-marketing-header',
  templateUrl: './marketing-header.component.html',
  styleUrls: ['./marketing-header.component.css']
})
export class MarketingHeaderComponent implements OnInit, OnDestroy {
  marketingBannerData!: MarketingBannerData;
  private languageSubscription: Subscription | null = null; // Initialize as null

  constructor(private languageService: LanguageService) {}

  ngOnInit(): void {
    this.languageSubscription = this.languageService.language$.subscribe((language) => {
      this.marketingBannerData = this.languageService.getMarketingBannerTranslation(language);
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe to prevent memory leaks
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }
  }
}
