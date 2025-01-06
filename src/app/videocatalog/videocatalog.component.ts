import { Component, Input, OnInit, OnDestroy, ViewChild } from '@angular/core';
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

  @ViewChild('videoRef') videoRef: any;  // Reference to video element

  constructor(
    private languageService: LanguageService,
    private separationService: SeparationService
  ) {}

  ngOnInit(): void {
    this.subscription = this.languageService.language$.subscribe((language) => {
      this.videoCatalogData =
        this.separationService.translations.videoCatalog[language] ||
        this.separationService.translations.videoCatalog['GEO'];

      // Ensure video URL is correct
      if (this.videoCatalogData.backgroundUrl && !this.videoCatalogData.backgroundUrl.startsWith('https://localhost:7001')) {
        this.videoCatalogData.backgroundUrl = 'https://localhost:7001' + this.videoCatalogData.backgroundUrl;
      }
    });

    this.subscription.add(
      this.separationService.translations$.subscribe(() => {
        const currentLanguage = this.languageService.getCurrentLanguage();
        this.videoCatalogData =
          this.separationService.translations.videoCatalog[currentLanguage] ||
          this.separationService.translations.videoCatalog['GEO'];

        // Ensure video URL is correct
        if (this.videoCatalogData.backgroundUrl && !this.videoCatalogData.backgroundUrl.startsWith('https://localhost:7001')) {
          this.videoCatalogData.backgroundUrl = 'https://localhost:7001' + this.videoCatalogData.backgroundUrl;
        }
      })
    );
  }

  ngOnDestroy(): void {
    // Unsubscribe to prevent memory leaks
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  ngAfterViewInit(): void {
    const videoElement = this.videoRef?.nativeElement;

    if (videoElement) {
      // Explicitly set autoplay, muted, and loop properties
      videoElement.autoplay = true;
      videoElement.muted = true;
      videoElement.loop = true;
      videoElement.play().catch((error: any) => {
        setTimeout(() => {
          videoElement.play().catch((error: any) => {
            console.log('Error while trying to play the video after retry:', error);
          });
        }, 500);  // Retry after 500ms
      });
    }
  }
}
