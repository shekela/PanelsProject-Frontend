import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { LanguageService } from '../services/language.service';
import { SeparationService } from '../services/separation.service';
import { AboutUsPageInterface } from '../models/aboutus-page.model';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent {
  aboutUsPageData!: AboutUsPageInterface;
  private subscription: Subscription | null = null;
  
  
  constructor(
    private languageService: LanguageService,
    private separationService: SeparationService
  ) {}
  
  ngOnInit(): void {
    this.subscription = this.languageService.language$.subscribe((language) => {
      this.aboutUsPageData =
        this.separationService.translations.aboutUsPage[language] ||
        this.separationService.translations.aboutUsPage['GEO'];
    });

    this.subscription.add(
      this.separationService.translations$.subscribe(() => {
        const currentLanguage = this.languageService.getCurrentLanguage();
        this.aboutUsPageData =
          this.separationService.translations.aboutUsPage[currentLanguage] ||
          this.separationService.translations.aboutUsPage['GEO'];
      })
    );
  }
  
}
