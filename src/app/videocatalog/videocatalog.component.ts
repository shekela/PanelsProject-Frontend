import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { LanguageService } from '../services/language.service';
import { SeparationService } from '../services/separation.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-videocatalog',
  templateUrl: './videocatalog.component.html',
  styleUrls: ['./videocatalog.component.css']
})
export class VideocatalogComponent implements OnInit, OnDestroy {
  @Input() videoCatalogData: any;  // Use the correct type based on your data model
  private subscription: Subscription | null = null;

  constructor(
    private languageService: LanguageService,
    private separationService: SeparationService
  ) {}

  ngOnInit(): void {
    this.subscription = this.languageService.language$.subscribe((language) => {
      this.videoCatalogData =
        this.separationService.translations.videoCatalog[language] ||
        this.separationService.translations.videoCatalog['GEO'];
    });

    this.subscription.add(
      this.separationService.translations$.subscribe(() => {
        const currentLanguage = this.languageService.getCurrentLanguage();
        this.videoCatalogData =
          this.separationService.translations.videoCatalog[currentLanguage] ||
          this.separationService.translations.videoCatalog['GEO'];

        console.log('Translations updated:', this.videoCatalogData);
      })
    );
  }

  ngOnDestroy(): void {
    // Unsubscribe to prevent memory leaks
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
