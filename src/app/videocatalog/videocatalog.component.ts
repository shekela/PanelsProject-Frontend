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
  @Input() videoCatalogData: any; // Use the correct type based on your data model
  @Input() muted: boolean = true; // Default muted to true
  @Input() autoplay: boolean = true; // Default autoplay to true
  @Input() loop: boolean = true; // Default loop to true
  @Input() showButton: boolean = true; // Control whether to show the button

  private subscription: Subscription | null = null;

  @ViewChild('videoRef') videoRef: any; // Reference to video element

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

  ngAfterViewInit(): void {
    const videoElement = this.videoRef?.nativeElement;

    if (videoElement) {
      videoElement.autoplay = this.autoplay;
      videoElement.muted = this.muted;
      videoElement.loop = this.loop;

      videoElement.play().catch((error: any) => {
        setTimeout(() => {
          videoElement.play().catch((error: any) => {
            console.log('Error while trying to play the video after retry:', error);
          });
        }, 500); // Retry after 500ms
      });
    }
  }

  ngOnDestroy(): void {
    // Unsubscribe to prevent memory leaks
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
